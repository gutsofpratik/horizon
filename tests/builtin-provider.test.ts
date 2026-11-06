import test from 'node:test';
import assert from 'node:assert/strict';
import {ensureBuiltinProvider} from '../server/models/builtin-provider.ts';
import {resolveProvider} from '../server/providers/credentials.ts';

test('restart repairs a stale owned endpoint and preserves model settings',()=>{
 let saved:any={id:'builtin',name:'My local models',type:'openai',baseUrl:'http://127.0.0.1:3013/api/builtin/v1',modelOptions:{chosen:{vision:true}}};let writes=0;
 const store:any={get:()=>saved,put:(_bucket:string,value:any)=>{writes++;saved=value;}};
 ensureBuiltinProvider(store,'3001');
 assert.equal(saved.baseUrl,'http://127.0.0.1:3001/api/builtin/v1');
 assert.deepEqual(saved.modelOptions,{chosen:{vision:true}});
 const prior=process.env.PORT;process.env.PORT='3001';
 try{assert.equal(resolveProvider({ephemeral:new Map([['hostAccess',{inferenceToken:()=> 'test-token'}]])} as any,saved).apiKey,'test-token');}finally{if(prior===undefined)delete process.env.PORT;else process.env.PORT=prior;}
 ensureBuiltinProvider(store,'3001');assert.equal(writes,1);
});
test('new profiles receive the current host endpoint',()=>{
 let saved:any;const store:any={get:()=>saved,put:(_bucket:string,value:any)=>{saved=value;}};
 ensureBuiltinProvider(store,'3017');assert.equal(saved.baseUrl,'http://127.0.0.1:3017/api/builtin/v1');assert.equal(saved.id,'builtin');
});
