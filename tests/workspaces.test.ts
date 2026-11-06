import test from 'node:test';
import assert from 'node:assert/strict';
import {workspaceMode,workspaceProfiles,workspacePrompt} from '../src/workspaces/profiles.ts';
import {Agent} from '../server/agent/orchestrator.ts';
import {Store} from '../server/storage/database.ts';
import {ToolRegistry} from '../server/tools/registry.ts';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('workspace prompts have distinct execution and tutoring contracts',()=>{
 assert.match(workspacePrompt('code'),/git state/);assert.match(workspacePrompt('cowork'),/recalculation/);assert.match(workspacePrompt('chat','socratic'),/one useful question/);
 assert.equal(workspaceMode('legacy'),'chat');assert.deepEqual(Object.keys(workspaceProfiles),['chat','cowork','code']);
});
test('actual agent runs retain their workspace across turns and supply its prompt',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'horizon-workspaces-'));const store=new Store(':memory:');
 const app:any={root:process.cwd(),dataDirectory:directory,store,ephemeral:new Map()};
 store.put('settings',{id:'main',providerId:'fixture',model:'fixture',memoryEnabled:false});store.put('providers',{id:'fixture',type:'openai',name:'Fixture',baseUrl:'http://127.0.0.1:1/v1'});
 const prompts:string[]=[];
 const infer=async function*(_provider:any,request:any){prompts.push(request.messages[0].content);yield {type:'content',text:'Hello.'};yield {type:'done',reason:'stop'};};
 const agent=new Agent(app,new ToolRegistry(app),infer as any);
 try{
  for(const mode of ['chat','cowork','code']){
   const run=await agent.start({content:'Hello',mode,tutoringMode:'socratic'});await agent.tasks.get(run.id);
   assert.equal(agent.getRun(run.id).status,'completed',agent.getRun(run.id).error);
   const chat=agent.conversation(run.conversationId);assert.equal(chat.mode,mode);assert.equal(chat.tutoringMode,'socratic');
   assert.ok(prompts.at(-1)!.includes(workspacePrompt(mode,'socratic')));
   const next=await agent.start({conversationId:run.conversationId,content:'Thanks'});await agent.tasks.get(next.id);assert.equal(agent.conversation(run.conversationId).mode,mode);
  }
 }finally{store.close();await rm(directory,{recursive:true,force:true});}
});

test('project checks choose ecosystem-specific commands without installing dependencies',async()=>{
 const {projectCheckCommand}=await import('../server/tools/project-check.ts');const {writeFile}=await import('node:fs/promises');
 const directory=await mkdtemp(join(tmpdir(),'horizon-check-runner-'));
 try{await writeFile(join(directory,'Cargo.toml'),'');assert.equal(await projectCheckCommand(directory,'test'),'cargo test');assert.equal(await projectCheckCommand(directory,'lint'),'cargo clippy');await rm(join(directory,'Cargo.toml'));await writeFile(join(directory,'go.mod'),'');assert.equal(await projectCheckCommand(directory,'test'),'go test ./...');}
 finally{await rm(directory,{recursive:true,force:true});}
});

test('Code executes a two-file task and validates its result using a real Node test process',async()=>{
 const {registerFileTools,workspaceRoot}=await import('../server/tools/files.ts');const {z}=await import('zod');const {execFile}=await import('node:child_process');const {promisify}=await import('node:util');const {mkdir,writeFile,readFile}=await import('node:fs/promises');
 const directory=await mkdtemp(join(tmpdir(),'horizon-code-task-'));const store=new Store(':memory:');const app:any={root:process.cwd(),dataDirectory:directory,store,ephemeral:new Map()};
 store.put('settings',{id:'main',providerId:'fixture',model:'fixture',toolsEnabled:true,approvalMode:'full',memoryEnabled:false});store.put('providers',{id:'fixture',name:'Fixture',type:'openai',baseUrl:'http://127.0.0.1:1/v1'});
 const registry=new ToolRegistry(app);registerFileTools(registry);let exitCode:number|undefined;
 registry.register({name:'terminal_run',capability:'terminal',description:'Run the isolated task test.',input:z.object({command:z.string()}),handler:async(_args,ctx)=>{
  const root=workspaceRoot(ctx);await writeFile(join(root,'task.test.cjs'),"const {test}=require('node:test');const assert=require('node:assert/strict');test('both modules work together',()=>assert.equal(require('./client/app.cjs').value+require('./server/app.cjs').value,3));");
  const {stdout}=await promisify(execFile)(process.execPath,['--test','task.test.cjs'],{cwd:root});exitCode=0;return {status:'completed',exit_code:0,output:stdout};
 }});
 let round=0;
 const infer=async function*(){
  if(round++===0){yield {type:'tool_call',id:'client',name:'files_write',arguments:{path:'client/app.cjs',text:'exports.value=1;'}};yield {type:'tool_call',id:'server',name:'files_write',arguments:{path:'server/app.cjs',text:'exports.value=2;'}};yield {type:'done',reason:'tool_calls'};}
  else if(round===2){yield {type:'tool_call',id:'test',name:'terminal_run',arguments:{command:'node --test task.test.cjs'}};yield {type:'done',reason:'tool_calls'};}
  else{yield {type:'content',text:'Both modules were created and their integration test passed.'};yield {type:'done',reason:'stop'};}
 };
 const agent=new Agent(app,registry,infer as any);
 try{
  const run=await agent.start({mode:'code',edition:'desktop',content:'Create client/app.cjs and server/app.cjs, then run tests.'});await agent.tasks.get(run.id);
  assert.equal(agent.getRun(run.id).status,'completed',agent.getRun(run.id).error);assert.equal(exitCode,0);
  const root=workspaceRoot({app,conversationId:run.conversationId});assert.equal(await readFile(join(root,'client/app.cjs'),'utf8'),'exports.value=1;');assert.equal(await readFile(join(root,'server/app.cjs'),'utf8'),'exports.value=2;');
 }finally{store.close();await rm(directory,{recursive:true,force:true});}
});
