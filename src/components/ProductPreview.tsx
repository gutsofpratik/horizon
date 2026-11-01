import {useEffect,useRef} from 'react';
export function ProductPreview(){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current;if(!el)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');let raf=0;
    const update=()=>{raf=0;const box=el.parentElement!.getBoundingClientRect();const p=reduced.matches?1:Math.max(0,Math.min(1,-box.top/(innerHeight*.8)));el.style.setProperty('--preview-progress',String(p))};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule)};
  },[]);
  return <div className="audited-preview" ref={root}><div className="preview-caption"><span>Inside the Horizon workspace</span><span>Desktop beta</span></div><div className="preview-artifact"><img src="/images/06-workspace-home.png" alt="The Horizon desktop workspace" width="1920" height="1080"/></div></div>;
}
