import {appendFileSync} from 'node:fs';
import {evaluationPassed} from '../server/models/evaluation-score.ts';
import {checkToolScenarios,scenarioSchemaHash} from '../server/tools/scenario-coverage.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,mkdir,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Store} from '../server/storage/database.ts';
import {ToolRegistry} from '../server/tools/registry.ts';
import {registerFileTools,workspaceRoot,digest} from '../server/tools/files.ts';
import {registerCodeAdvancedTools} from '../server/tools/code-advanced.ts';
import {makeTaskScope,scopeAllows} from '../server/tools/task-routing.ts';
import {CodingCompletion} from '../server/agent/coding-completion.ts';
import {buildContext} from '../server/agent/context.ts';
import {normalizeEvents} from '../server/providers/streams.ts';
import {executeToolBatch} from '../server/agent/tool-batch.ts';
import {contextCharacters} from '../server/agent/token-budget.ts';
import {ModelBalancer} from '../server/models/balancer.ts';
import {EngineEnvironment} from '../server/models/engines.ts';

async function fixture(fn:(registry:ToolRegistry,ctx:any,root:string)=>Promise<void>){
 const directory=await mkdtemp(join(tmpdir(),'horizon-reliability-'));const store=new Store(':memory:');
 const app:any={dataDirectory:directory,store,ephemeral:new Map(),root:process.cwd()};
 store.put('settings',{id:'main',toolsEnabled:true,approvalMode:'full'});
 const ctx:any={app,conversationId:'fixture',runId:'test',mode:'code',edition:'desktop',approvalMode:'full',signal:new AbortController().signal,loadedSkills:new Map(),emit:()=>{}};
 const registry=new ToolRegistry(app);registerFileTools(registry);registerCodeAdvancedTools(registry);for(const tool of registry.tools.values()){const handler=tool.handler;tool.handler=async(args,ctx)=>{const result=await handler(args,ctx);if(process.env.HORIZON_TEST_EVIDENCE)appendFileSync(process.env.HORIZON_TEST_EVIDENCE,JSON.stringify({event:'handler_returned',name:tool.name,status:'succeeded',fixture:'/tests/agent-reliability.test.ts'})+'\n');return result;};}
 try{await mkdir(workspaceRoot(ctx),{recursive:true});await fn(registry,ctx,workspaceRoot(ctx));}finally{store.close();await rm(directory,{recursive:true,force:true});}
}
test('inferred wording cannot deny coding tools; explicit selection stays restricted',()=>{
 for(const request of ['Fix validation errors','Investigate why checkout fails','修复登录错误']){
  const ctx:any={taskScope:makeTaskScope(request,'chat')};assert.ok(scopeAllows('files_read',ctx));assert.ok(scopeAllows('terminal_run',ctx));
 }
 assert.equal(scopeAllows('terminal_run',{taskScope:makeTaskScope('','browser')} as any),false);
});
test('completion distinguishes identical basenames and invalidates tests after shell changes',()=>{
 const tracker=new CodingCompletion('Create client/app.ts and server/app.ts then run tests',true);
 tracker.observe('files_write',{path:'client/app.ts'},{status:'succeeded',data:{path:'client/app.ts'},files:[{name:'app.ts'}]});
 assert.deepEqual(tracker.missingFiles(),['server/app.ts']);
 tracker.observe('terminal_run',{command:'npm test'},{status:'succeeded',data:{status:'completed',exit_code:0}});assert.equal(tracker.needsTests(),false);
 tracker.observe('terminal_run',{command:'node rewrite-source.js'},{status:'succeeded',data:{status:'completed',exit_code:0}});assert.equal(tracker.needsTests(),true);
});
test('oversized mandatory guidance is retained or explicitly rejected',()=>{
 const store=new Store(':memory:');store.put('settings',{id:'main',systemPrompt:'x'.repeat(20000)});
 try{const instruction='MANDATORY '+('required '.repeat(1000));
  try{const messages=buildContext({store,ephemeral:new Map()} as any,{id:'c',messages:[]},'',8192,0,instruction);assert.ok(messages[0].content.includes(instruction));}
  catch(error){assert.match(String(error),/Required instructions exceed/);}
 }finally{store.close();}
});
test('OpenAI finish then usage then DONE preserves usage exactly once',async()=>{
 async function* records(){yield {choices:[{delta:{},finish_reason:'stop'}]};yield {choices:[],usage:{prompt_tokens:123,completion_tokens:5}};yield {__done:true};}
 const events=[];for await(const event of normalizeEvents(records(),'openai'))events.push(event);
 assert.deepEqual(events,[{type:'done',reason:'stop',usage:{prompt_tokens:123,completion_tokens:5}}]);
});
test('repository search exposes pagination and finds files beyond the first 300',async()=>fixture(async(registry,ctx,root)=>{
 for(let i=0;i<305;i++)await writeFile(join(root,String(i).padStart(4,'0')+'.txt'),i===304?'needle':'ordinary');
 const handler=registry.tools.get('files_search')!.handler;
 const first=await handler({path:'.',query:'needle',offset:0},ctx);assert.equal(first.truncated,true);assert.equal(first.nextOffset,300);
 const next=await handler({path:'.',query:'needle',offset:first.nextOffset},ctx);assert.equal(next.matches.length,1);
 const code=await registry.tools.get('code_search')!.handler({path:'.',query:'needle',max_results:100,case_sensitive:false},ctx);assert.equal(code.truncated,true);
}));
test('two conflicting edits cannot both succeed; writes emit one file event',async()=>fixture(async(registry,ctx,root)=>{
 let notifications=0;ctx.emit=(type:string)=>{if(type==='file.created')notifications++;};
 const created=await registry.execute({id:'create',name:'files_write',arguments:{path:'file.txt',text:'original'}},ctx);assert.equal(created.status,'succeeded');assert.equal(notifications,1);
 const calls=['first','second'].map((text,index)=>registry.execute({id:'edit-'+index,name:'files_patch',arguments:{path:'file.txt',find:'original',replace:text,expected_hash:digest('original')}},ctx));
 const results=await Promise.all(calls);assert.equal(results.filter(result=>result.status==='succeeded').length,1);assert.equal(results.find(result=>result.status==='failed')?.error.code,'FILE_CONFLICT');
 assert.ok(['first','second'].includes(await readFile(join(root,'file.txt'),'utf8')));
}));
test('immutable reads overlap; mutations are ordered and observed before the next batch',async()=>{
 let active=0,peak=0;const completed:string[]=[];let observed=false;
 const calls=['files_read','code_search','files_write','files_read'].map((name,id)=>({name,id}));
 for await(const {call} of executeToolBatch(calls,{signal:new AbortController().signal},async call=>{
  if(call.id===3)assert.equal(observed,true);active++;peak=Math.max(peak,active);await new Promise(resolve=>setImmediate(resolve));active--;completed.push(call.name);return {};
 })){if(call.name==='files_write')observed=true;}
 assert.equal(peak,2);assert.deepEqual(completed,['files_read','code_search','files_write','files_read']);
});
test('image budget is independent of base64 payload size',()=>{
 const tiny=contextCharacters([{role:'user',content:'inspect',images:['a']}]);
 const large=contextCharacters([{role:'user',content:'inspect',images:['a'.repeat(1000000)]}]);assert.equal(tiny,large);
});
test('cancelling a queued model activation aborts the actual loader signal',async()=>{
 const controller=new AbortController();let aborted=false;
 const balancer=new ModelBalancer({ready:()=>false,capacity:()=>1,activate:(_entry,signal)=>new Promise((_resolve,reject)=>{signal!.addEventListener('abort',()=>{aborted=true;reject(new Error('cancelled'));},{once:true});})});
 const job=balancer.run({id:'model'},async()=>{},controller.signal);controller.abort();await assert.rejects(job,/cancelled/);assert.equal(aborted,true);balancer.close();
});
test('runtime setup cancellation terminates its owned setup process',async()=>{
 const environment=new EngineEnvironment('/unused');const controller=new AbortController();(environment as any).signal=controller.signal;
 const setup=(environment as any).run(process.execPath,['-e','setInterval(()=>{},1000)']);controller.abort();await assert.rejects(setup,/cancelled/);
});

test('pagination retains matches within one file',async()=>fixture(async(registry,ctx,root)=>{
 await writeFile(join(root,'many.txt'),Array.from({length:205},(_,index)=>'needle '+index).join('\n'));
 const run=registry.tools.get('files_search')!.handler;
 const one=await run({query:'needle',path:'.',offset:0,line_offset:0},ctx);
 const two=await run({query:'needle',path:'.',offset:one.nextOffset,line_offset:one.nextLineOffset},ctx);
 const three=await run({query:'needle',path:'.',offset:two.nextOffset,line_offset:two.nextLineOffset},ctx);
 assert.equal(one.matches.length+two.matches.length+three.matches.length,205);
 assert.equal(new Set([...one.matches,...two.matches,...three.matches].map(item=>item.line)).size,205);
}));

test('empty or zero-success evaluation cannot pass',()=>{
 assert.equal(evaluationPassed(0,0,0,0,0),false);assert.equal(evaluationPassed(10,0,0,0,0),false);assert.equal(evaluationPassed(10,7,8,3,4),true);
});
test('scenario inventory cannot certify nonexistent fixtures or metadata alone',()=>{
 const schema={type:'object'};const entries:any=[{name:'sample',schema_hash:scenarioSchemaHash(schema),disposition:'code-case',evidence_kind:'code-contract',fixtures:['missing.test.ts']}];
 const catalog=[{name:'sample',schema}];
 assert.equal(checkToolScenarios(catalog,entries).certified,false);
 const result=checkToolScenarios(catalog,entries,[{name:'sample',event:'handler_returned',fixture:'/tests/missing.test.ts'}],new Set());
 assert.equal(result.certified,false);assert.equal(result.warnings.length,1);
});

test('explicit search-only selection does not permit writes',()=>{
 assert.equal(scopeAllows('files_write',{taskScope:makeTaskScope('Only use web search')} as any),false);
});
test('file reads include nested repository instructions',async()=>fixture(async(registry,ctx,root)=>{
 await mkdir(join(root,'src'),{recursive:true});await writeFile(join(root,'src','AGENTS.md'),'Use the project test helpers.');await writeFile(join(root,'src','app.ts'),'export const value=1;');
 const result=await registry.tools.get('files_read')!.handler({path:'src/app.ts',offset:0,limit:100},ctx);
 assert.ok(result.instructions.some((source:any)=>source.path==='src/AGENTS.md'&&source.text.includes('test helpers')));
}));
test('writing an existing file without an observed hash is rejected',async()=>fixture(async(registry,ctx,root)=>{
 await writeFile(join(root,'existing.txt'),'preserve');
 const result=await registry.execute({id:'overwrite',name:'files_write',arguments:{path:'existing.txt',text:'replace'}},ctx);
 assert.equal(result.error?.code,'FILE_CONFLICT');assert.equal(await readFile(join(root,'existing.txt'),'utf8'),'preserve');
}));
