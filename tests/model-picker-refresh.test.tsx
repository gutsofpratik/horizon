import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {createElement,act,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ModelPicker} from '../src/chat/ModelPicker.tsx';
import {ModelLibrary} from '../src/settings/ModelLibrary.tsx';

test('opening the picker discovers a newly downloaded model',async()=>{
 const {window}=parseHTML('<html><body><div id="root"></div></body></html>');
 const saved={window:globalThis.window,document:globalThis.document,IS_REACT_ACT_ENVIRONMENT:(globalThis as any).IS_REACT_ACT_ENVIRONMENT};
 Object.assign(globalThis,{window,document:window.document,IS_REACT_ACT_ENVIRONMENT:true});
 window.innerWidth=1024;window.innerHeight=768;
 const root=createRoot(window.document.getElementById('root')!);let refreshes=0;
 function App(){const [models,setModels]=useState<any[]>([]);return createElement(ModelPicker,{models,onRefresh:async()=>{refreshes++;setModels([{id:'new-model',name:'Downloaded model',providerId:'builtin',providerName:'Horizon built-in'}]);}});}
 try{
  await act(async()=>root.render(createElement(App)));
  await act(async()=>{window.document.querySelector<HTMLButtonElement>('[aria-label="Select model"]')!.click();});
  assert.equal(refreshes,1);
  assert.match(window.document.querySelector('[role="listbox"]')!.textContent!,/Downloaded model/);
 }finally{await act(async()=>root.unmount());Object.assign(globalThis,saved);}
});

test('completed downloads refresh the parent model list once per job',async()=>{
 const {window}=parseHTML('<html><body><div id="root"></div></body></html>');
 const saved={window:globalThis.window,document:globalThis.document,fetch:globalThis.fetch,setInterval:globalThis.setInterval,clearInterval:globalThis.clearInterval,IS_REACT_ACT_ENVIRONMENT:(globalThis as any).IS_REACT_ACT_ENVIRONMENT};
 let poll:()=>void=()=>{};let completed=false,refreshes=0;
 Object.assign(globalThis,{window,document:window.document,IS_REACT_ACT_ENVIRONMENT:true,fetch:async(path:string)=>new Response(JSON.stringify(path.endsWith('/hardware')?{gpus:[],tiers:[],ramGiB:16,cpu:'Test CPU'}:{downloads:[{id:'job',repo:'example/model',status:completed?'completed':'downloading'}]})),setInterval:(fn:()=>void)=>{poll=fn;return 1;},clearInterval:()=>{}});
 const root=createRoot(window.document.getElementById('root')!);
 try{
  await act(async()=>root.render(createElement(ModelLibrary,{onRefresh:()=>{refreshes++;},onError:()=>{}})));
  assert.equal(refreshes,0);
  completed=true;await act(async()=>{await poll();});
  assert.equal(refreshes,1);
  await act(async()=>{await poll();});assert.equal(refreshes,1);
 }finally{await act(async()=>root.unmount());Object.assign(globalThis,saved);}
});
