import {useState} from 'react';
export function PromptHandoff(){
  const [copied,setCopied]=useState(false);
  const [prompt]=useState(()=>{const query=new URLSearchParams(location.search).get('prompt');if(query)return query;try{return sessionStorage.getItem('horizon:starter-prompt')??''}catch{return ''}});
  if(!prompt)return null;
  return <aside className="prompt-handoff"><div><span>Your starting task</span><p>{prompt}</p></div><button onClick={()=>{void navigator.clipboard.writeText(prompt).then(()=>setCopied(true)).catch(()=>setCopied(false))}}>{copied?'Copied':'Copy prompt'}</button><small>Keep this prompt for your first conversation in the desktop beta.</small></aside>;
}
