import {useState} from 'react';
export function HorizonPrompt({compact=false}:{compact?:boolean}){
  const [prompt,setPrompt]=useState('');
  return <form className={'horizon-start-prompt '+(compact?'is-compact':'')} action="/download" onSubmit={()=>{try{sessionStorage.setItem('horizon:starter-prompt',prompt)}catch{/* The query preserves the prompt when browser storage is unavailable. */}}}><label className="sr-only" htmlFor={compact?'footer-question':'starting-question'}>What would you like to work on?</label><input id={compact?'footer-question':'starting-question'} name="prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="What would you like to work on?" required/><button aria-label="Continue with this task" type="submit">↑</button></form>;
}
