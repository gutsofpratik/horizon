import type {AppContext} from '../app.ts';

/** The owned inference endpoint belongs to this host, not a persisted old port. */
export function ensureBuiltinProvider(store:AppContext['store'],port=process.env.PORT??'3001'){
 const previous=store.get('providers','builtin');
 const provider={...previous,id:'builtin',name:previous?.name??'Horizon built-in',type:'openai',baseUrl:'http://127.0.0.1:'+port+'/api/builtin/v1'};
 if(!previous||previous.baseUrl!==provider.baseUrl||previous.type!==provider.type)store.put('providers',provider);
 return provider;
}
