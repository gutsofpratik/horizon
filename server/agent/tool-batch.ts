// Only immutable workspace reads can overlap. Interactive observations, writes,
// subprocesses, discovery and approvals keep their original ordering.
const independent=new Set(['files_read','files_list','files_search','files_hash','code_search','symbol_search']);
export async function* executeToolBatch(calls:any[],ctx:{signal:AbortSignal},execute:(call:any)=>Promise<any>){

 for(let offset=0;offset<calls.length;){
  ctx.signal.throwIfAborted();
  const batch=[calls[offset++]];
  if(independent.has(batch[0].name))while(offset<calls.length&&batch.length<4&&independent.has(calls[offset].name))batch.push(calls[offset++]);
  for(const result of await Promise.all(batch.map(async call=>({call,result:await execute(call)}))))yield result;
 }

}
