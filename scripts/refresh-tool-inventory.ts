import {FileRevisions} from '../server/files/revisions.ts';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {Store} from '../server/storage/database.ts';
import {createTools} from '../server/tools/index.ts';
import {scenarioSchemaHash} from '../server/tools/scenario-coverage.ts';
import {isToolGroup,groupForLeaf} from '../server/tools/groups.ts';
const path='packages/contracts/tool-scenarios.json';const manifest=JSON.parse(await readFile(path,'utf8'));
const store=new Store(':memory:');const app:any={root:process.cwd(),dataDirectory:'.local/inventory',store,ephemeral:new Map(),runtime:{ready:false}};
app.ephemeral.set('fileRevisions',new FileRevisions(app));
try{
 const tools=createTools(app);const fixtures=new Set((await readdir('tests',{recursive:true})).map(name=>name.split(/[\\/]/).at(-1)));
 const exercised=new Set(['files_search','files_write','files_patch','code_search']);
 manifest.tools=[...tools.tools.values()].map(tool=>{
  const old=manifest.tools.find((entry:any)=>entry.name===tool.name)??{name:tool.name};
  const entry={...old,schema_hash:scenarioSchemaHash(tool.inputSchema)};
  if(isToolGroup(tool.name)){entry.disposition='category';entry.members=[...tools.tools.keys()].filter(name=>groupForLeaf(name)===tool.name);}
  else if(exercised.has(tool.name)){entry.disposition='code-case';entry.evidence_kind='controlled-transport';entry.fixtures=['agent-reliability.test.ts'];}
  else if(entry.disposition==='code-case'&&(!entry.fixtures?.length||entry.fixtures.some((file:string)=>!fixtures.has(file))))entry.disposition='unverified';
  if(!entry.disposition)entry.disposition='unverified';
  return entry;
 });
 manifest.scope='Tool schema inventory. Unverified entries retain historical fixture references for provenance; missing fixtures are not execution coverage. Certification requires existing fixtures and actual successful execution evidence. Model-level task quality is evaluated separately.';
 await writeFile(path,JSON.stringify(manifest,null,2)+'\n');
}finally{await app.ephemeral.get('fileRevisions').close();store.close();}
