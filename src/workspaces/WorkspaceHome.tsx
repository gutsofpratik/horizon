import {MessageCircle,Briefcase,Code2,Folder,Terminal,BookOpen} from 'lucide-react';
import {workspaceProfiles,workspaceMode} from './profiles';
export function WorkspaceSwitcher({mode,onChange,disabled=false}:any){return <div className="workspace-switcher" role="tablist" aria-label="Workspaces">{([['chat',MessageCircle],['cowork',Briefcase],['code',Code2]] as const).map(([id,Icon])=><button key={id} role="tab" aria-selected={workspaceMode(mode)===id} disabled={disabled} onClick={()=>onChange(id)}><Icon size={15}/>{workspaceProfiles[id].label}</button>)}</div>;}
export function WorkspaceHome({mode,tutoring='adaptive',onTutoring,onChoose,onEnvironment,projectName}:any){
 const profile=workspaceProfiles[workspaceMode(mode)];
 return <div className="workspace-home"><p className="workspace-description">{profile.description}</p>
 <div className="workspace-context"><span><Folder size={14}/>{projectName??'Conversation workspace'}</span>{mode!=='chat'&&<button onClick={onEnvironment}><Terminal size={14}/>Open {mode==='code'?'terminal & files':'work files'}</button>}<label><BookOpen size={14}/><span className="sr-only">Tutoring style</span><select aria-label="Tutoring style" value={tutoring} onChange={event=>onTutoring(event.target.value)}><option value="adaptive">Adaptive guidance</option><option value="direct">Direct answers</option><option value="socratic">Learn step by step</option></select></label></div>
 <div className="workspace-starters">{profile.examples.map(prompt=><button key={prompt} onClick={()=>onChoose(prompt)}>{prompt}<span aria-hidden="true">↗</span></button>)}</div></div>;
}
