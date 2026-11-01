import {useEffect,useRef} from 'react';
import type {CSSProperties} from 'react';
import orbit from '../data/orbit.json';
import textures from '../data/referenceTextures.json';
const texturePositions=['8% 18%','32% 74%','56% 12%','78% 62%','18% 88%','64% 30%','90% 50%'];
export function ProductOrbit(){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current;if(!el)return;
    const tiles=Array.from(el.querySelectorAll<HTMLElement>('.orbit-tile')),reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0,visible=true,hovered=false,elapsed=0,last=performance.now(),width=el.clientWidth,height=el.clientHeight;
    const started=last;
    const render=(now:number)=>{
      const dt=Math.min(64,now-last)/1000;last=now;const age=(now-started)/1000;
      if(visible&&!document.hidden&&!hovered&&!reduced.matches)elapsed+=dt*(1+9*Math.pow(1-Math.min(1,age/2.4),2));
      const desktop=width>=900,progress=reduced.matches?1:Math.max(0,Math.min(1,(age-.2)/2)),spread=progress===1?1:1-Math.pow(2,-10*progress);
      const innerRatio=Math.max(.405+((650/1920)-.405)*Math.max(0,Math.min(1,(innerWidth-1200)/240)),375/width);
      tiles.forEach((tile,i)=>{
        const inner=i>=16,index=i%16,radius=width*innerRatio*(inner?1:1000/650);
        const angle=index/16*Math.PI*2-Math.PI/2+(inner?.18:0)+elapsed/(inner?9.36:7.8)*(inner?-1:1);
        let x=Math.cos(angle)*radius*spread,y=Math.sin(angle)*radius*spread;
        if(!desktop){x=Math.cos(angle)*Math.max(width*.8,350)*spread;y=Math.sin(angle)*Math.max(height*.53,330)*spread}
        const scale=reduced.matches?1:1-Math.pow(1-Math.min(1,Math.max(0,(age-.2)/1.6)),3);
        tile.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${scale})`;tile.style.opacity=String(Math.min(1,progress*5));
      });
      if(visible&&!document.hidden&&!reduced.matches)raf=requestAnimationFrame(render);
    };
    const restart=()=>{cancelAnimationFrame(raf);last=performance.now();render(last);el.querySelectorAll('video').forEach(v=>{if(!visible||document.hidden||reduced.matches)v.pause();else void v.play().catch(()=>{})})};
    const resize=new ResizeObserver(()=>{width=el.clientWidth;height=el.clientHeight;restart()});resize.observe(el);
    const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;restart()});observer.observe(el);
    const enter=()=>{hovered=true},leave=()=>{hovered=false};tiles.forEach(t=>{t.addEventListener('pointerenter',enter);t.addEventListener('pointerleave',leave)});
    reduced.addEventListener('change',restart);document.addEventListener('visibilitychange',restart);restart();
    return()=>{cancelAnimationFrame(raf);resize.disconnect();observer.disconnect();reduced.removeEventListener('change',restart);document.removeEventListener('visibilitychange',restart);tiles.forEach(t=>{t.removeEventListener('pointerenter',enter);t.removeEventListener('pointerleave',leave)})};
  },[]);
  return <div className="audited-orbit" ref={root} aria-hidden="true">{orbit.tiles.map((tile,i)=>{
    const {media,example}=tile,pattern=tile.pattern as keyof typeof textures;
    return <div className="orbit-tile" key={i} style={{width:`${tile.size/19.2}vw`}}><div className={'orbit-picture '+(media?'':'is-pattern')} style={media?undefined:{'--orbit-texture':`url("${textures[pattern]}")`,'--texture-position':texturePositions[(3*(i%16)+(i>=16?4:0))%7]} as CSSProperties}>{media&&(media.kind==='clip'?<video muted loop playsInline preload="none" poster={media.image} src={media.src}/>:<img src={media.image} alt=""/>)}</div><span>{example?.title}</span></div>
  })}</div>;
}
