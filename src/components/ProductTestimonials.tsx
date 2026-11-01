import {useEffect,useRef,useState} from 'react';
export type HorizonTestimonial={id:string;quote:string;name:string;role:string;company?:string;logo?:string;media?:{type:'video'|'audio';src:string;poster?:string}};
// Publish only first-party, approved customer statements. Reference customers
// are not Horizon customers and are deliberately not relabeled here.
export const approvedTestimonials:HorizonTestimonial[]=[];
export function ProductTestimonials({items=approvedTestimonials}:{items?:HorizonTestimonial[]}){
  const [active,setActive]=useState(0),media=useRef<HTMLMediaElement|null>(null);
  useEffect(()=>{media.current?.pause()},[active]);
  if(!items.length)return null;
  const item=items[active];
  return <section className="product-testimonials" aria-label="Working with Horizon"><div className="testimonial-proof" key={item.id}>{item.media?.type==='video'?<video ref={node=>{media.current=node}} src={item.media.src} poster={item.media.poster} controls preload="none"/>:item.media?.type==='audio'?<div className="testimonial-voice-note"><span>A note from {item.name}</span><audio ref={node=>{media.current=node}} src={item.media.src} controls preload="none"/></div>:item.logo?<img src={item.logo} alt={item.company??''}/>:null}<figure><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}{item.company?' · '+item.company:''}</span></figcaption></figure></div><nav aria-label="Choose a story">{items.map((entry,i)=><button key={entry.id} aria-label={'Story '+(i+1)} aria-pressed={i===active} onClick={()=>setActive(i)}/>)}<button aria-label="Previous story" onClick={()=>setActive((active+items.length-1)%items.length)}>←</button><button aria-label="Next story" onClick={()=>setActive((active+1)%items.length)}>→</button></nav></section>;
}
