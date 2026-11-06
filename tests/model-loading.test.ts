import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement,act} from 'react';
import {createRoot} from 'react-dom/client';
import {renderToStaticMarkup} from 'react-dom/server';
import {parseHTML} from 'linkedom';
import {ModelLoadingStatus} from '../src/chat/ModelLoadingStatus.tsx';

test('loading shows a real percentage before the label and an adjacent details arrow',()=>{
 const {document}=parseHTML(renderToStaticMarkup(createElement(ModelLoadingStatus,{progress:{percent:37,stage:'Loading model weights'}})));
 const status=document.querySelector('[role="status"]')!;
 assert.equal(status.textContent,'37% Model loading');
 assert.equal(status.nextElementSibling?.getAttribute('aria-label'),'Model loading details');
 for(const percent of [undefined,null,NaN]){
  const html=renderToStaticMarkup(createElement(ModelLoadingStatus,{progress:{percent}}));
  assert.ok(!html.includes('%'),'unknown progress must not invent a percentage');
 }
 assert.match(renderToStaticMarkup(createElement(ModelLoadingStatus,{progress:{percent:0}})),/>0% /);
});
test('expanding loading details shows the actual stage without repeating the heading',async()=>{
 const {window}=parseHTML('<html><body><div id="root"></div></body></html>');
 const saved={window:globalThis.window,document:globalThis.document,IS_REACT_ACT_ENVIRONMENT:(globalThis as any).IS_REACT_ACT_ENVIRONMENT};
 Object.assign(globalThis,{window,document:window.document,IS_REACT_ACT_ENVIRONMENT:true});
 const root=createRoot(window.document.getElementById('root')!);
 try{
  await act(async()=>root.render(createElement(ModelLoadingStatus,{progress:{percent:82,stage:'Preparing context'}})));
  await act(async()=>window.document.querySelector<HTMLButtonElement>('button')!.click());
  assert.equal(window.document.querySelector('button')?.getAttribute('aria-expanded'),'true');
  assert.match(window.document.querySelector('.model-loading-detail')!.textContent!,/Preparing context/);
  assert.equal((window.document.body.textContent!.match(/Model loading/g)??[]).length,1);
 }finally{await act(async()=>root.unmount());Object.assign(globalThis,saved);}
});
