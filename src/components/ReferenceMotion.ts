import {useEffect, useRef, useState} from 'react';
export function useReducedMotion() {
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(query.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change)},[]);
  return reduced;
}
/** Advance the deck while the outgoing sheet finishes above the new stack. */
export function useReferenceDeck(initial=0) {
  const [front,setFront]=useState(initial),[outgoing,setOutgoing]=useState<number|null>(null),[direction,setDirection]=useState(1);
  const current=useRef(initial),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const reduced=useReducedMotion();
  const select=(next:number)=>{
    if(current.current===next)return;
    clearTimeout(timer.current);setOutgoing(reduced?null:current.current);setDirection(next>current.current?1:-1);
    current.current=next;setFront(next);timer.current=setTimeout(()=>setOutgoing(null),450);
  };
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  return {front,outgoing,direction,select};
}
export function useDialogLock(open:boolean, close:()=>void) {
  const closeRef=useRef(close);closeRef.current=close;
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null,overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape')closeRef.current();
      if(e.key==='Tab'){
        const dialog=document.querySelector('[aria-modal="true"]');
        const items=Array.from(dialog?.querySelectorAll<HTMLElement>('button,a[href],input,textarea,[tabindex="0"]')??[]).filter(el=>!el.hasAttribute('disabled')&&el.getClientRects().length>0);
        const first=items[0],last=items.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
      }
    };
    document.addEventListener('keydown',onKey);
    const frame=requestAnimationFrame(()=>document.querySelector<HTMLElement>('[aria-modal="true"] button')?.focus());
    return()=>{cancelAnimationFrame(frame);document.body.style.overflow=overflow;document.removeEventListener('keydown',onKey);previous?.focus()};
  },[open]);
}
