import {mkdir,cp,readFile,writeFile,readdir,stat,unlink} from 'node:fs/promises';
import {resolve,join,relative,isAbsolute,sep} from 'node:path';
const root=process.cwd();
const target=process.env.HORIZON_WEB_EXPORT_DIR?resolve(process.env.HORIZON_WEB_EXPORT_DIR):resolve('public-release','web');
const inside=rel=>!isAbsolute(rel)&&rel!=='..'&&!rel.startsWith('..'+sep);
if(inside(relative(root,target))&&!inside(relative(resolve(root,'public-release'),target)))throw new Error('Web export target must be outside the checkout or inside public-release');
await mkdir(target,{recursive:true});
// Keep shared UI, inference, skills and environment tools. Native OS control
// remains behind the desktop host entry point and the authenticated broker.
const excluded=['src/desktop','server/desktop.ts','server/runtime/native-broker.ts','skills/source-packs'];
const allowed=['src','server','runtime','skills','packages/contracts','index.html','tsconfig.json','vite.config.ts','scripts/runtime-up.ts','scripts/runtime-health.ts'];
const privatePart=/^(?:\.local|\.git|node_modules|__pycache__|\.env(?:\..*)?)$/i;
const files=[];
let previous;try{previous=JSON.parse(await readFile(join(target,'PUBLIC-EXPORT.json'),'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
for(const file of previous?.files??[]){
 if(!excluded.some(path=>file===path||file.startsWith(path+'/')))continue;
 if(!inside(relative(target,resolve(target,file))))throw new Error('Export path escaped its target');
 await unlink(resolve(target,file)).catch(error=>{if(error.code!=='ENOENT')throw error;});
}
async function copy(source){
 const item=relative(root,source).split(sep).join('/');
 if(item.split('/').some(part=>privatePart.test(part))||excluded.some(path=>item===path||item.startsWith(path+'/'))||/\.(?:pyc|gguf|safetensors|sqlite(?:-wal|-shm)?|pem|pfx|p12)$/i.test(item))return;
 const info=await stat(source);
 if(info.isDirectory()){for(const name of await readdir(source))await copy(join(source,name));}
 else{const destination=join(target,item);await mkdir(resolve(destination,'..'),{recursive:true});await cp(source,destination);files.push(item);}
}
for(const path of allowed)await copy(join(root,path));
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8'));
pkg.workspaces=['packages/contracts'];
pkg.name='horizon-web';pkg.description='Horizon shared workspace UI with host inference and connected execution environments';
pkg.scripts=Object.fromEntries(['dev','build','start','runtime:up','runtime:health'].map(name=>[name,pkg.scripts[name]]));
delete pkg.devDependencies['@tauri-apps/cli'];
await writeFile(join(target,'package.json'),JSON.stringify(pkg,null,2)+'\n');
await writeFile(join(target,'.gitignore'),'node_modules/\ndist/\n.local/\n.env\n*.sqlite*\n*.log\n');
await writeFile(join(target,'PUBLIC-EXPORT.json'),JSON.stringify({edition:'web',createdAt:new Date().toISOString(),files:files.sort(),excluded},null,2));
console.log('Web source exported with shared UI and inference at '+target);
