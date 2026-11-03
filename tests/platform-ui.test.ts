import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFile} from 'node:fs/promises';
import {SettingsNavigation} from '../src/settings/SettingsNavigation.tsx';
test('all editions expose the same settings destinations',()=>{
 const html=renderToStaticMarkup(createElement(SettingsNavigation,{tab:'general',onSelect:()=>{}}));
 for(const label of ['Model library','Inference sessions','API endpoints','Teams','Automations','Connectors','Environments'])assert.ok(html.includes(label),label+' must remain discoverable');
});
test('web and native adapters share model screens instead of null implementations',async()=>{
 for(const path of ['src/platform/web-ui.tsx','src/desktop/ui.tsx']){
  const source=await readFile(new URL('../'+path,import.meta.url),'utf8');
  assert.match(source,/ModelLibrary,ManagedModels,RuntimePacks,openExternal/);
  assert.doesNotMatch(source,/export const (?:ModelLibrary|ManagedModels|RuntimePacks|ComputerControl|NativeTerminal)=.*=>null/);
 }
});
test('web host provides model services without registering a native desktop broker',async()=>{
 const source=await readFile(new URL('../server/web.ts',import.meta.url),'utf8');
 assert.match(source,/registerModelRuntime/);
 assert.doesNotMatch(source,/registerNativeBroker|OPENCLAUDE_DESKTOP_OWNED\s*=/);
});
