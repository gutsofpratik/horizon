import {useEffect,useRef,useState} from 'react';
import {createLabCanvas} from '../lib/labCanvas.js';
export function LabFeature(){
  const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),copy=useRef<HTMLDivElement>(null),[ready,setReady]=useState(false);
  useEffect(()=>{
    if(!canvas.current||!copy.current||!root.current)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let disposed=false,visible=false,started=false,controller:Awaited<ReturnType<typeof createLabCanvas>>|undefined;
    const play=()=>{if(!controller)return;if(reduced.matches){controller.seek(11.6);controller.pause();setReady(true)}else if(visible&&!document.hidden)controller.resume();else controller.pause()};
    const start=()=>{if(started)return;started=true;void createLabCanvas(canvas.current!,copy.current!,()=>setReady(true)).then(c=>{if(disposed){c.destroy();return}controller=c;play()}).catch(()=>setReady(true))};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();play()},{threshold:.08});observer.observe(root.current);
    const stall=setTimeout(()=>{if(started&&!controller)setReady(true)},4000);
    document.addEventListener('visibilitychange',play);reduced.addEventListener('change',play);
    return()=>{disposed=true;clearTimeout(stall);controller?.destroy();observer.disconnect();document.removeEventListener('visibilitychange',play);reduced.removeEventListener('change',play)};
  },[]);
  return <section className="reference-feature audited-lab-feature" ref={root} aria-labelledby="feature-title"><canvas ref={canvas} aria-hidden="true"/><div className="reference-feature-copy" ref={copy} data-copy-ready={ready}><h2 id="feature-title">Introducing<br/>Horizon</h2><p>A workspace for creating files, building software, and getting work done. Run a compatible local model or connect a provider you choose, with conversations, tools, and artifacts together in one place.</p><a className="reference-primary-button" href="/horizon" tabIndex={ready?0:-1}>Meet Horizon</a></div></section>;
}
