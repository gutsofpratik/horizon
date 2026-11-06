import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
const exec=promisify(execFile);
test('web exports preserve shared model UI, host inference and environment tools',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'horizon-export-'));const root=join(temp,'source'),target=join(temp,'web');
 const preserved=['packages/contracts/src/index.ts','packages/contracts/package.json','src/settings/ModelLibrary.tsx','src/settings/ManagedModels.tsx','src/styles/model-library.css','src/app/OnboardingModels.tsx','server/index.ts','server/web.ts','server/models/runtime.ts','runtime/models/cuda_libraries.py','runtime/models/native_worker.py','runtime/worker/terminal.mjs','runtime/worker/desktop.mjs','skills/catalog.json','scripts/runtime-up.ts','scripts/runtime-health.ts','index.html','tsconfig.json','vite.config.ts'];
 try{
  for(const file of [...preserved,'server/app.ts','src/desktop/ui.tsx','server/desktop.ts','server/runtime/native-broker.ts','runtime/.local/secret.txt']){
   await mkdir(dirname(join(root,file)),{recursive:true});await writeFile(join(root,file),'original '+file);
  }
  await writeFile(join(root,'package.json'),JSON.stringify({dependencies:{'@tauri-apps/api':'2'},devDependencies:{'@tauri-apps/cli':'2'},scripts:{dev:'dev',build:'build',start:'start','runtime:up':'up','runtime:health':'health'}}));
  await exec(process.execPath,[fileURLToPath(new URL('../scripts/export-web.mjs',import.meta.url))],{cwd:root,env:{...process.env,HORIZON_WEB_EXPORT_DIR:target}});
  for(const file of [...preserved,'server/app.ts'])assert.equal(await readFile(join(target,file),'utf8'),'original '+file,file);
  for(const file of ['src/desktop/ui.tsx','server/desktop.ts','server/runtime/native-broker.ts','runtime/.local/secret.txt'])await assert.rejects(access(join(target,file)));
  const pkg=JSON.parse(await readFile(join(target,'package.json'),'utf8'));
  assert.equal(pkg.dependencies['@tauri-apps/api'],'2','shared file picker must remain compilable');
 }finally{await rm(temp,{recursive:true,force:true});}
});
