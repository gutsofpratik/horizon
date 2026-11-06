const tails=new Map<string,Promise<void>>();
/** Serialize the complete read/check/write transaction, including batch rollback. */
export async function withWorkspaceWriteLock<T>(key:string,signal:AbortSignal,operation:()=>Promise<T>):Promise<T>{
 const previous=tails.get(key)??Promise.resolve();let release!:()=>void;
 const current=new Promise<void>(resolve=>{release=resolve;});const tail=previous.then(()=>current);tails.set(key,tail);
 try{await previous;signal.throwIfAborted();return await operation();}
 finally{release();if(tails.get(key)===tail)tails.delete(key);}
}
export const mutatesWorkspace=(name:string)=>/^(files_(write|patch|append|copy|move|delete|batch_edit)|directory_(create|copy|move|delete)|archive_(extract|create))$/.test(name);
