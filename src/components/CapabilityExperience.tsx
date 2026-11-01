import {useEffect,useRef,useState} from 'react';
import graph from '../data/capabilityGraph.json';
import cases from '../data/referenceCases.json';
import {useDialogLock} from './ReferenceMotion';

const content:Record<string,{title?:string;copy:string;href:string;example?:string}>={
  whatyouget:{copy:'Move from a question to work you can inspect, edit, and keep.',href:'/product/artifacts'},
  howreaches:{copy:'Bring files and compatible tools into the conversation.',href:'/product/tools'},
  makeyours:{copy:'Shape the workspace around your models, instructions, and skills.',href:'/developers/skills'},
  staycontrol:{copy:'Keep track of what is running and review the result.',href:'/responsible-development'},
  wherelives:{copy:'A desktop workspace with your choice of local runtime or connected provider.',href:'/download'},
  itknows:{copy:'Keep related conversations and files together in a project.',href:'/product/projects'},
  quick:{copy:'Work through a short question or build context for a longer project.',href:'/product/projects'},
  parallel:{title:'Agents and tasks',copy:'Explore agent workflows and the tools they need.',href:'/research/agents'},
  intelligence:{title:'Model choice',copy:'Choose a compatible model for the task and hardware you have.',href:'/product/models'},
  routines:{title:'Reusable workflows',copy:'Return to useful instructions with a focused skill.',href:'/developers/skills'},
  voice:{copy:'Explore voice features and runtime requirements in the beta.',href:'/product/beta'},
  finished:{copy:'Keep the result in an editable artifact instead of losing it in a conversation.',href:'/product/artifacts',example:'campaign-readout'},
  artifacts:{copy:'Work with documents, prototypes, code, and visual outputs.',href:'/product/artifacts',example:'asset-creation'},
  interactive:{copy:'Explore interactive results and refine them in context.',href:'/product/artifacts',example:'metrics-dashboard'},
  theweb:{copy:'Use an enabled compatible tool when the task needs external context.',href:'/developers/tools'},
  connectors:{title:'Tool connections',copy:'Connect tools through MCP and check what access each one needs.',href:'/developers/tools'},
  filesfolders:{copy:'Bring the relevant files into a project and keep the scope clear.',href:'/guides/project-context'},
  browseruse:{title:'Browser tools',copy:'Browser workflows require a compatible tool and the right permissions.',href:'/developers/tools'},
  computeruse:{title:'Desktop tools',copy:'Understand the capabilities and limits of enabled desktop tools.',href:'/product/tools'},
  skills:{copy:'Turn an approach you use often into reusable instructions.',href:'/skills'},
  plugins:{title:'Extensions',copy:'Extend a workflow with compatible tools and instructions.',href:'/developers/tools'},
  customconn:{copy:'Connect a compatible MCP server and inspect its tools before enabling it.',href:'/developers/tools'},
  permissions:{copy:'Review access to files, processes, and external services.',href:'/responsible-development'},
  accessctl:{title:'Tool access',copy:'Enable only the capabilities you need for your current task.',href:'/security'},
  admin:{title:'Tool activity and review',copy:'Follow tool activity and inspect changes before using the result.',href:'/product/tools'},
  runswhere:{title:'Provider connections',copy:'Use a supported provider with your own account and configuration.',href:'/product/models'},
  webdesktop:{title:'Desktop workspace',copy:'Try the beta for your operating system.',href:'/download'},
  chrome:{title:'Local runtimes',copy:'Run a compatible model locally when your hardware supports it.',href:'/models'},
  m365:{title:'Documents and spreadsheets',copy:'Bring files into a workflow and inspect the output.',href:'/product/artifacts',example:'h2-reforecast'},
  claudetag:{title:'Your tools',copy:'Build a setup that fits the work you want to do.',href:'/developers/getting-started'},
  memory:{title:'Conversation context',copy:'Continue from previous messages within the available model context.',href:'/product/projects'},
  projects:{copy:'Keep conversations, instructions, and files organized around the same work.',href:'/product/projects'},
  globalinstr:{title:'Instructions for Horizon',copy:'Set useful context and make your expectations explicit.',href:'/developers/skills'},
};
const groups=graph.nodes.filter(n=>n.tier==='p');
export function CapabilityExperience(){
  const root=useRef<HTMLDivElement>(null),[hover,setHover]=useState<string|null>(null),[open,setOpen]=useState(false),[selected,setSelected]=useState('whatyouget');
  const hoverRef=useRef(hover);hoverRef.current=hover;
  useDialogLock(open,()=>setOpen(false));
  useEffect(()=>{if(!open)return;const frame=requestAnimationFrame(()=>document.getElementById('capability-item-'+selected)?.scrollIntoView({block:'start',behavior:'instant'}));return()=>cancelAnimationFrame(frame)},[open,selected]);
  useEffect(()=>{
    const el=root.current;if(!el)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,visible=true,width=el.clientWidth;
    const buttons=Array.from(el.querySelectorAll<HTMLElement>('[data-map-node]')),lines=Array.from(el.querySelectorAll<SVGLineElement>('line'));
    const render=(time:number)=>{
      const mobile=width<600,tablet=width<1000&&!mobile,planeW=mobile?360:tablet?780:1456,planeH=mobile?900:tablet?780:695;
      el.style.aspectRatio=`${planeW}/${planeH}`;
      const locations=new Map(graph.nodes.map((node,i)=>{
        const dx=reduced.matches?0:Math.sin(time*.00035+i*1.7)*2.2,dy=reduced.matches?0:Math.cos(time*.00028+i*.9)*2.2;
        return [node.id,{x:(mobile?node.mx:tablet?node.tx:node.x)+dx,y:(mobile?node.my:tablet?node.ty:node.y)+dy}];
      }));
      buttons.forEach(button=>{const node=graph.nodes.find(n=>n.id===button.dataset.mapNode)!,position=locations.get(node.id)!;button.style.left=`${position.x/planeW*100}%`;button.style.top=`${position.y/planeH*100}%`;button.style.maxWidth=(mobile?node.mWrapWidth:tablet?node.tWrapWidth:node.wrapWidth)?`${(mobile?node.mWrapWidth:tablet?node.tWrapWidth:node.wrapWidth)!/planeW*width}px`:''});
      lines.forEach((line,i)=>{const edge=graph.edges[i],a=locations.get(edge.a)!,b=locations.get(edge.b)!;line.setAttribute('x1',String(a.x/planeW*1456));line.setAttribute('y1',String(a.y/planeH*695));line.setAttribute('x2',String(b.x/planeW*1456));line.setAttribute('y2',String(b.y/planeH*695));line.classList.toggle('is-highlighted',!!hoverRef.current&&(edge.a===hoverRef.current||edge.b===hoverRef.current))});
      if(visible&&!document.hidden&&!reduced.matches)raf=requestAnimationFrame(render);
    };
    const restart=()=>{cancelAnimationFrame(raf);render(performance.now())};
    const resize=new ResizeObserver(()=>{width=el.clientWidth;restart()});resize.observe(el);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;restart()});observer.observe(el);
    document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);restart();
    return()=>{cancelAnimationFrame(raf);resize.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',restart);reduced.removeEventListener('change',restart)};
  },[]);
  const detail=(id:string)=>{setSelected(id);setOpen(true)};
  const hovered=hover&&content[hover],example=hovered&&cases.find(c=>c.slug===hovered.example);
  return <section className="audited-capabilities" id="capabilities"><h2 className="capabilities-change-title">Change the way you work</h2><div className="capabilities-benefits">
    <article><h3>You don’t need the right words</h3><p>Start with a question, a rough idea, or the files you have. Add context and refine the work together.</p></article>
    <article><h3>You have control and the final say</h3><p>Keep the process visible. Review the tools, inspect the artifacts, and decide what comes next.</p></article>
    <article><h3>You don’t need to start over</h3><p>Keep related work in a project, with useful instructions and the context that makes it yours.</p></article>
  </div><div className="capabilities-map-heading"><h2>See what Horizon can do</h2><button className="reference-primary-button reference-source-button" onClick={()=>setOpen(true)}>See all capabilities <span aria-hidden="true">⇥</span></button></div>
    <div className="audited-capability-map" ref={root} aria-label="Explore Horizon capabilities"><svg viewBox="0 0 1456 695" preserveAspectRatio="none" aria-hidden="true">{graph.edges.map(edge=><line key={edge.a+'-'+edge.b}/>)}</svg>{graph.nodes.map(node=>node.id==='claude'?<span key={node.id} data-map-node={node.id} className="map-horizon-word">Horizon</span>:<button key={node.id} data-map-node={node.id} className={'audited-map-node tier-'+node.tier} onPointerEnter={()=>setHover(node.id)} onPointerLeave={()=>setHover(null)} onFocus={()=>setHover(node.id)} onBlur={()=>setHover(null)} onClick={()=>detail(node.id)}>{content[node.id]?.title??String(node.label)}</button>)}
      {hovered&&example&&<div className="map-hover-preview"><img src={example.image} alt=""/><span>{example.title}</span></div>}
    </div>
    {open&&<div className="capability-drawer-backdrop" onClick={()=>setOpen(false)}><aside className="capability-drawer" role="dialog" aria-modal="true" aria-labelledby="capability-drawer-title" onClick={e=>e.stopPropagation()}><div className="capability-drawer-top"><h2 id="capability-drawer-title">Horizon capabilities</h2><button aria-label="Close capabilities" onClick={()=>setOpen(false)}>×</button></div><nav aria-label="Capability categories">{groups.map(group=><button key={group.id} aria-pressed={selected===group.id||graph.nodes.find(n=>n.id===selected)?.parents?.includes(group.id)} onClick={()=>{setSelected(group.id);document.getElementById('capability-detail-'+group.id)?.scrollIntoView({block:'start',behavior:'smooth'})}}>{String(group.label)}</button>)}</nav><div className="capability-drawer-content">{groups.map(group=><section id={'capability-detail-'+group.id} key={group.id}><h3>{String(group.label)}</h3><p>{content[group.id].copy}</p>{graph.nodes.filter(node=>node.parents?.includes(group.id)).map(node=>{
      const item=content[node.id],artifact=cases.find(c=>c.slug===item?.example);return <article id={'capability-item-'+node.id} key={node.id} className={selected===node.id?'is-selected':''}><h4>{item?.title??String(node.label)}</h4><p>{item?.copy}</p>{artifact&&<img src={artifact.image} alt={artifact.title+' example'}/>}<a href={item?.href??'/product'}>Explore {item?.title??String(node.label).toLowerCase()}</a></article>
    })}</section>)}</div><div className="capability-drawer-bottom"><a className="reference-primary-button" href="/download">Try Horizon</a><a href="/waitlist">Join Waitlist</a></div></aside></div>}
  </section>;
}
