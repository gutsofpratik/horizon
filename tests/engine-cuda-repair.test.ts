import test from 'node:test';
import assert from 'node:assert/strict';
import {EngineEnvironment} from '../server/models/engines.ts';
test('an existing broken CUDA wheel repairs both private NVIDIA dependencies before reinstalling llama.cpp',async()=>{
 const environment=new EngineEnvironment('/unused');
 Object.defineProperty(environment,'python',{value:process.execPath});
 const calls:string[][]=[];
 (environment as any).run=async(_command:string,args:string[])=>{calls.push(args);};
 const executable=await environment.ensure('llama.cpp','cuda');
 assert.equal(executable,process.execPath);
 assert.equal(environment.status,'ready');
 assert.ok(calls[0].includes('nvidia-cuda-runtime==13.2.86'));
 assert.ok(calls[0].includes('nvidia-cublas==13.2.2.2'));
 assert.equal(calls[1][0],'-c');
 assert.equal(calls.length,2,'repair must probe the existing wheel instead of reinstalling it');
});
