import {useEffect,useRef,useState} from 'react';
import type {CSSProperties, ReactNode} from 'react';
import workday from '../data/workday.json';
import cases from '../data/referenceCases.json';
import {useReducedMotion,useReferenceDeck,useDialogLock} from './ReferenceMotion';

const dockByRole=[['gmail','calendar','drive','excel','word','slack','horizon'],['gmail','drive','powerpoint','word','slack','amplitude','bigquery','horizon'],['calendar','excel','powerpoint','word','slack','salesforce','gong','horizon'],['drive','excel','powerpoint','horizon'],['drive','excel','powerpoint','word','horizon'],['drive','excel','word','horizon'],['gmail','calendar','word','slack','bigquery','horizon']];
const names:Record<string,string>={gmail:'Gmail',calendar:'Google Calendar',drive:'Google Drive',excel:'Microsoft Excel',word:'Microsoft Word',powerpoint:'Microsoft PowerPoint',slack:'Slack',salesforce:'Salesforce',gong:'Gong',amplitude:'Amplitude',bigquery:'BigQuery',horizon:'Horizon'};
const marks:Record<string,string>={calendar:'google-calendar',drive:'google-drive'};
export function AppGlyph({app}:{app:string}){return app==='horizon'?<span className="horizon-app-word" aria-hidden="true">Horizon</span>:<img src={'/reference/marks/'+(marks[app]??app)+'.svg'} alt=""/>}

export function SourceFrame({src,width,height,title,active=true}:{src:string;width:number;height:number;title:string;active?:boolean}){
  const root=useRef<HTMLDivElement>(null),[scale,setScale]=useState(1);
  useEffect(()=>{if(!root.current)return;const observer=new ResizeObserver(([entry])=>setScale(entry.contentRect.width/width));observer.observe(root.current);return()=>observer.disconnect()},[width]);
  return <div className="source-frame" ref={root} style={{aspectRatio:`${width}/${height}`}}>{active&&<iframe src={src} title={title} sandbox="allow-scripts" loading="lazy" style={{width,height,transform:`scale(${scale})`}}/>}</div>;
}

type Sheet={slug:string;ground?:string;texture?:string;swatch?:string};
export function ReferenceStack<T extends Sheet>({items,deck,children,className=''}:{items:T[];deck:ReturnType<typeof useReferenceDeck>;children:(item:T,index:number,active:boolean)=>ReactNode;className?:string}){
  const {front,outgoing,direction}=deck;
  const visible=[front,(front+1)%items.length,(front+2)%items.length];
  if(outgoing!==null&&!visible.includes(outgoing))visible.push(outgoing);
  return <div className={'reference-sheet-stack '+className} style={{'--flip-direction':direction} as CSSProperties}>{visible.map(i=>{
    const position=(i-front+items.length)%items.length,item=items[i],exiting=outgoing===i;
    return <div key={item.slug+'-'+i} className={`reference-sheet swatch-${item.swatch??'cactus'} ${exiting?'is-exiting':''}`} data-position={Math.min(3,position)} aria-hidden={i!==front} inert={i!==front} style={{'--sheet-position':Math.min(3,position),backgroundColor:item.ground,backgroundImage:item.texture?`url("${item.texture}")`:undefined} as CSSProperties}>{children(item,i,i===front)}</div>
  })}</div>;
}

export function WorkdayShowcase(){
  const [role,setRole]=useState(0);
  return <section className="audited-workday" id="in-practice"><div className="workday-heading"><h2>Put Horizon to work</h2><p>Bring a task, add your context, and work toward something you can use.<br/>Explore the possibilities across your day.</p></div><WorkdayScene key={role} role={role} onRole={setRole}/></section>;
}
function WorkdayScene({role,onRole}:{role:number;onRole:(index:number)=>void}){
  const root=useRef<HTMLDivElement>(null),pointer=useRef(0),deck=useReferenceDeck();
  const [mode,setMode]=useState<'conversation'|'result'>('conversation'),[replay,setReplay]=useState(0),[promptOpen,setPromptOpen]=useState(false),[appsOpen,setAppsOpen]=useState(false);
  const current=workday[role],card=current.cards[deck.front],reduced=useReducedMotion();
  const changeRole=(next:number)=>{if(next===role)return;if(root.current&&!reduced&&innerWidth>=1000)scrollTo({top:scrollY+root.current.getBoundingClientRect().top-129,behavior:'instant'});onRole(next)};
  const selectRef=useRef(deck.select);selectRef.current=deck.select;
  useDialogLock(promptOpen||appsOpen,()=>{setPromptOpen(false);setAppsOpen(false)});
  useEffect(()=>{
    let raf=0,lastZone=root.current?Math.min(2,Math.max(0,Math.floor((129-root.current.getBoundingClientRect().top)/800))):-1;
    const update=()=>{raf=0;if(!root.current||reduced||innerWidth<1000)return;const b=root.current.getBoundingClientRect();if(b.top>129||b.bottom<innerHeight)return;const zone=Math.min(2,Math.max(0,Math.floor((129-b.top)/800)));if(zone!==lastZone){lastZone=zone;selectRef.current(zone)}};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',schedule);removeEventListener('resize',schedule)};
  },[reduced]);
  const select=(i:number)=>{
    deck.select(i);
    if(root.current&&!reduced&&innerWidth>=1000){const top=root.current.getBoundingClientRect().top+scrollY;scrollTo({top:top-129+i*800+30,behavior:'smooth'})}
  };
  return <div className="workday-scroll" ref={root}><div className="workday-pin">
    <div className="workday-role-list" role="tablist" aria-label="Choose your role">{workday.map((r,i)=><button id={'workday-role-'+i} key={r.slug} role="tab" aria-selected={role===i} aria-controls="workday-panel" onClick={()=>changeRole(i)} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(role+(e.key==='ArrowRight'?1:-1)+workday.length)%workday.length;changeRole(next);requestAnimationFrame(()=>document.getElementById('workday-role-'+next)?.focus())}}}>{r.name}</button>)}</div>
    <div className="workday-composition" id="workday-panel" role="tabpanel" aria-labelledby={'workday-role-'+role}>
      <nav className="workday-clock" aria-label="Choose a moment in the day"><span className="clock-track" aria-hidden="true"><i style={{top:`${deck.front*50}%`}}/></span>{current.cards.map((c,i)=><button key={c.time} aria-pressed={deck.front===i} aria-label={c.time} onClick={()=>select(i)}>{c.time.replace(':00','').replace(/:\d\d/,'').replace(' ','')}</button>)}</nav>
      <div className="workday-story" key={card.slug} aria-live="polite"><p className="workday-persona">For {current.name.toLowerCase()}</p><h3>{card.headline}</h3><p>{card.body}</p><a href={'/use-cases/'+card.slug}>Explore this workflow</a></div>
      <div className="workday-demonstration" onPointerDown={e=>{pointer.current=e.clientX}} onPointerUp={e=>{const distance=e.clientX-pointer.current;if(Math.abs(distance)>70)select((deck.front+(distance<0?1:2))%3)}}>
        <ReferenceStack items={current.cards} deck={deck}>{(item,i,active)=><div className="workday-sheet-content">
          <div className="demo-view-tabs" aria-label="Example view"><button aria-pressed={mode==='conversation'&&!!item.conversation} disabled={!item.conversation} onClick={()=>setMode('conversation')}>Conversation</button><button aria-pressed={mode==='result'||!item.conversation} onClick={()=>setMode('result')}>Result</button></div>
          {active&&(mode==='conversation'&&item.conversation?<SourceFrame key={item.slug+'-'+replay+'-conversation'} src={item.conversation.url} width={item.conversation.width} height={item.conversation.height} title={item.title+' conversation'}/>:<SourceFrame key={item.slug+'-'+replay+'-result'} src={item.artifact} width={item.width} height={item.height} title={item.title+' result'}/>)}
          {!active&&<span className="back-sheet-name">{current.cards[i].title}</span>}
        </div>}</ReferenceStack>
        <div className="workday-demo-controls"><button onClick={()=>setPromptOpen(true)}>Modify prompt <span aria-hidden="true">↗</span></button><button onClick={()=>{setReplay(n=>n+1);setMode('conversation')}}>Replay <span aria-hidden="true">↻</span></button></div>
        <div className="workday-app-dock" aria-label="Tools used in these examples">{dockByRole[role].map(app=>{
          const active=card.apps.includes(app);return <button key={app} aria-label={names[app]} aria-pressed={active} title={names[app]} onClick={()=>{if(active)return;const next=current.cards.findIndex(c=>c.apps.includes(app));if(next>=0)select(next)}}><AppGlyph app={app}/><i/></button>
        })}<button className="dock-information" aria-label="About these tools" onClick={()=>setAppsOpen(true)}>i</button></div>
      </div>
    </div><p className="workday-example-note">Illustrative workflows. Tool availability depends on your model and configured connections.</p>
  </div>{(promptOpen||appsOpen)&&<div className="reference-modal-backdrop" onClick={()=>{setPromptOpen(false);setAppsOpen(false)}}><section className="reference-prompt-dialog" role="dialog" aria-modal="true" aria-labelledby="workday-dialog-title" onClick={e=>e.stopPropagation()}><button className="dialog-close" aria-label="Close dialog" onClick={()=>{setPromptOpen(false);setAppsOpen(false)}}>×</button><h2 id="workday-dialog-title">{appsOpen?'Work with your tools':'Make the task your own'}</h2>{appsOpen?<><p>These examples show how connected tools can support a workflow. They are not a list of built-in Horizon integrations. Connect compatible tools through MCP and review their permissions before use.</p><a href="/developers/tools">Read the tools guide</a></>:<><label htmlFor="workflow-prompt">Your starting prompt</label><textarea id="workflow-prompt" defaultValue={card.prompt.replaceAll('Claude','Horizon')}/><button className="reference-primary-button" onClick={()=>{const value=(document.getElementById('workflow-prompt') as HTMLTextAreaElement).value;try{sessionStorage.setItem('horizon:starter-prompt',value)}catch{/* The query preserves the task. */}location.href='/download?prompt='+encodeURIComponent(value)}}>Try in Horizon</button></>}</section></div>}</div>;
}

const libraryRoles=[...new Set(cases.map(c=>c.role))];
export function ArtifactLibrary(){
  const deck=useReferenceDeck(),pointer=useRef(0),example=cases[deck.front];
  return <section className="audited-library" id="use-cases"><h2>I’m in <button onClick={()=>document.getElementById('library-role-'+example.role)?.focus()}>{example.role}</button> and I need to make the <button onClick={()=>document.getElementById('library-task-'+example.slug)?.focus()}>{example.title}</button>.</h2><div className="artifact-library-layout">
    <nav className="library-roles" aria-label="Choose a role"><h3>Role</h3>{libraryRoles.map(role=><button key={role} id={'library-role-'+role} aria-pressed={example.role===role} onClick={()=>deck.select(cases.findIndex(c=>c.role===role))}><span aria-hidden="true">—</span>{role}</button>)}</nav>
    <div className="library-stack-wrap" onPointerDown={e=>{pointer.current=e.clientX}} onPointerUp={e=>{if(Math.abs(e.clientX-pointer.current)>70)deck.select((deck.front+(e.clientX<pointer.current?1:cases.length-1))%cases.length)}}><ReferenceStack items={cases} deck={deck} className="library-stack">{(item,_i,active)=><><div className="library-artifact">{active?<SourceFrame src={item.artifact} width={item.width} height={item.height} title={item.title+' example'}/>:<img src={item.image} alt="" loading="lazy"/>}</div><a className="library-case-link" href={'/use-cases/'+item.slug}>View use case</a></>}</ReferenceStack></div>
    <nav className="library-tasks" aria-label="Choose a task"><h3>Task</h3>{cases.map((item,i)=><button id={'library-task-'+item.slug} key={item.slug} aria-pressed={i===deck.front} className={item.role===example.role?'is-related':''} onClick={()=>deck.select(i)}>{item.title}</button>)}</nav>
  </div></section>;
}
