import {useEffect,useMemo,useState} from 'react';
import {sitePages,pageIndexes} from '../data/sitePages';
import type {ContentPage} from '../data/sitePages';
import examples from '../data/referenceCases.json';
import {SourceFrame} from './WorkdayShowcase';
import {HorizonPrompt} from './HorizonPrompt';
import '../page-families.css';

const labels:Record<string,string>={horizon:'Horizon',research:'Research',about:'About the lab',waitlist:'Join Waitlist',download:'Try Horizon',privacy:'Privacy',cookies:'Cookies',terms:'Terms',security:'Security',accessibility:'Accessibility',sitemap:'All pages',contact:'Contact'};
const titleFor=(path:string)=>sitePages[path]?.title??pageIndexes[path]?.title??labels[path]??path;
const featureMedia:Record<string,{image:string;caption:string}>={
  'product':{image:'06-workspace-home.png',caption:'The Horizon desktop workspace'},
  'product/artifacts':{image:'06-workspace-home.png',caption:'Conversations and editable work, together'},
  'product/projects':{image:'08-teams-workspace.png',caption:'A workspace for related work'},
  'product/models':{image:'04-local-model.png',caption:'Local model setup in Horizon'},
  'product/tools':{image:'07-installed-skills.png',caption:'Installed skills in Horizon'},
  'product/beta':{image:'01-create-profile.png',caption:'Getting started with the desktop beta'},
  'models':{image:'04-local-model.png',caption:'Configure a compatible local model'},
  'skills':{image:'07-installed-skills.png',caption:'Inspect the instructions you enable'},
};
function Breadcrumb({category='Explore',parent='resources'}:{category?:string;parent?:string}){return <nav className="family-breadcrumb" aria-label="Breadcrumb"><a href="/">Horizons Lab</a><span>/</span><a href={'/'+parent}>{category}</a></nav>}
function AccessActions(){return <div className="family-access-actions"><a className="reference-primary-button" href="/download">Try Horizon</a><a className="reference-primary-button reference-source-button" href="/waitlist">Join Waitlist</a></div>}
function Related({links,title='Keep exploring'}:{links:string[];title?:string}){return links.length>0?<section className="family-related"><h2>{title}</h2><div>{links.map(path=><a href={'/'+path} key={path}><small>{sitePages[path]?.category??'Horizons Lab'}</small><h3>{titleFor(path)}</h3><p>{sitePages[path]?.intro??pageIndexes[path]?.intro}</p><span>Explore</span></a>)}</div></section>:null}
function PageHeader({article,category=true}:{article:ContentPage;category?:boolean}){return <header className="family-page-header">{category&&<span>{article.category}</span>}<h1>{article.title}</h1><p>{article.intro}</p></header>}

export function DesignedContentPage({page}:{page:string}){
  const article=sitePages[page],index=pageIndexes[page],title=article?.title??index?.title??'All pages';
  useEffect(()=>{document.title=title+' — Horizons Lab'},[title]);
  if(page==='sitemap')return <DirectoryPage page={page}/>;
  if(index)return <DirectoryPage page={page}/>;
  if(!article)return null;
  if(page.startsWith('use-cases/'))return <UseCasePage page={page} article={article}/>;
  if(featureMedia[page]||article.layout==='feature')return <FeaturePage page={page} article={article}/>;
  if(article.layout==='lesson')return <LearningChapter page={page} article={article}/>;
  if(article.layout==='manual'||page.startsWith('developers/'))return <ManualPage page={page} article={article}/>;
  if(page.startsWith('company/')||['company','careers','community','commitments'].includes(page))return <CompanyPage page={page} article={article}/>;
  return <EditorialPage page={page} article={article}/>;
}

function FeaturePage({page,article}:{page:string;article:ContentPage}){
  const media=featureMedia[page],isModels=page==='models'||page==='product/models',isSkills=page==='skills';
  return <div className={'family-page family-feature feature-'+page.replaceAll('/','-')}><Breadcrumb category="Horizon" parent="horizon"/><PageHeader article={article}/><AccessActions/>{media&&<figure className="family-feature-media"><img src={'/images/'+media.image} alt={media.caption}/><figcaption>{media.caption}</figcaption></figure>}
    {isModels&&<section className="model-choice-comparison"><h2>Choose how intelligence runs</h2><div><article><span>On your device</span><h3>Compatible local models</h3><p>Plan around memory, runtime support, model format, and the context your task needs.</p><a href="/research/inference">Understand local inference</a></article><article><span>With a provider</span><h3>A supported connection</h3><p>Use your own provider account. Check capabilities, privacy settings, limits, and charges separately.</p><a href="/developers/getting-started">Set up a connection</a></article></div></section>}
    {isSkills&&<SkillCollection/>}
    <div className="feature-chapters">{article.sections.map((section,i)=><section key={section.title} id={'section-'+i}><span className="feature-section-index">{String(i+1).padStart(2,'0')}</span><div><h2>{section.title}</h2><p>{section.copy}</p>{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</div></section>)}</div>
    <Related links={article.related}/><section className="family-end-cta"><h2>Bring your next idea.</h2><AccessActions/></section>
  </div>;
}
function SkillCollection(){
  const [query,setQuery]=useState('');
  const skills=[{title:'Build a reusable skill',copy:'Define a focused workflow, its expected inputs, and a result you can review.',href:'developers/skills',type:'Development'},{title:'Evaluate an agent',copy:'Check the process, tool use, and actual outcome of a workflow.',href:'guides/evaluating-an-agent',type:'Evaluation'},{title:'Prepare project context',copy:'Choose the files and instructions that help a model work on the right thing.',href:'guides/project-context',type:'Workspace'},{title:'Understand model learning',copy:'Explore representations, training, adaptation, and inference.',href:'learning',type:'Learning'}];
  return <section className="skill-collection"><div><h2>Find a place to begin</h2><label><span className="sr-only">Search workflow guides</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search workflow guides"/></label></div><div className="skill-collection-grid">{skills.filter(skill=>(skill.title+' '+skill.copy).toLowerCase().includes(query.toLowerCase())).map(skill=><a href={'/'+skill.href} key={skill.href}><small>{skill.type}</small><h3>{skill.title}</h3><p>{skill.copy}</p></a>)}</div></section>;
}

function UseCasePage({page,article}:{page:string;article:ContentPage}){
  const example=examples.find(c=>'use-cases/'+c.slug===page),[copied,setCopied]=useState(false);
  const prompt=example?.prompt.replaceAll('Claude','Horizon')??article.intro;
  return <div className="family-page family-use-case"><Breadcrumb category="Use cases" parent="use-cases"/><header className="use-case-header"><span>{example?.role??'Workflow'}</span><h1>{article.title}</h1><p>{article.intro}</p><a className="reference-primary-button reference-source-button" href={'/download?prompt='+encodeURIComponent(prompt)}>Try this task</a></header>
    {example&&<figure className="use-case-result" style={{backgroundColor:example.ground}}><SourceFrame src={example.artifact} width={example.width} height={example.height} title={example.title+' illustrative output'}/><figcaption>Illustrative workflow output. Your model, tools, and context determine the result.</figcaption></figure>}
    <div className="use-case-reading"><aside><h2>Start with a prompt</h2><p>{prompt}</p><button onClick={()=>{void navigator.clipboard.writeText(prompt).then(()=>setCopied(true)).catch(()=>setCopied(false))}}>{copied?'Copied':'Copy prompt'}</button><a href="/developers/tools">Understand tool connections</a></aside><article>{article.sections.map(section=><section key={section.title}><h2>{section.title}</h2><p>{section.copy}</p>{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}</article></div><Related links={article.related} title="More ways to work"/>
  </div>;
}

const learningDiagrams:Record<string,{a:string;b:string;c:string;detail:string}>={
  tokens:{a:'A sentence',b:'Token IDs',c:'Embeddings',detail:'Text is represented as a sequence the model can process.'},
  embeddings:{a:'Token IDs',b:'Vectors',c:'Relationships',detail:'Numerical representations can capture useful patterns.'},
  attention:{a:'Query',b:'Keys and weights',c:'Context',detail:'Each position can combine information from other positions.'},
  transformers:{a:'Input',b:'Attention + layers',c:'Predictions',detail:'Repeated transformations build a contextual representation.'},
  pretraining:{a:'Examples',b:'Prediction loss',c:'Updated weights',detail:'A training objective guides parameter updates.'},
  'instruction-tuning':{a:'Instruction',b:'Response examples',c:'Adaptation',detail:'Examples shape how a model responds to a request.'},
  'preference-learning':{a:'Two responses',b:'Comparison',c:'Learning signal',detail:'Preferences depend on the examples and judging criteria.'},
  evaluation:{a:'Held-out tasks',b:'Scoring + review',c:'Evidence',detail:'Measure a specified task under described conditions.'},
  quantization:{a:'Weight values',b:'Fewer bits',c:'Different trade-offs',detail:'Memory and quality depend on the method and workload.'},
  inference:{a:'Context',b:'Model + runtime',c:'Output tokens',detail:'Loading, prompt processing, and generation affect latency.'},
  'training-data':{a:'Collection',b:'Selection + labels',c:'Training examples',detail:'Provenance, coverage, and splits affect what a result means.'},
  optimization:{a:'Prediction',b:'Loss + gradient',c:'Parameter update',detail:'Optimization adjusts parameters according to a specified objective.'},
  'fine-tuning':{a:'Existing weights',b:'Task examples',c:'Adapted model',detail:'Adaptation should be compared on held-out examples.'},
  adapters:{a:'Base model',b:'Small learned modules',c:'Adapted behavior',detail:'Parameter-efficient methods update only part of a system.'},
  'context-windows':{a:'Instructions + files',b:'Available context',c:'Response',detail:'The context budget is shared by the information supplied to the model.'},
  retrieval:{a:'Question',b:'Relevant material',c:'Grounded context',detail:'Retrieval selects external material; its quality still needs review.'},
  distillation:{a:'Teacher signals',b:'Learning objective',c:'Student model',detail:'A smaller system can learn from the behavior of another model.'},
  overfitting:{a:'Development examples',b:'A narrow fit',c:'Held-out check',detail:'Performance on seen examples does not establish generalization.'},
  'tool-use':{a:'Model request',b:'Tool execution',c:'Observed result',detail:'The application interprets a structured request and returns the outcome.'},
  'multimodal-models':{a:'Text, image, audio',b:'Representations',c:'Model output',detail:'Different input types need compatible model and runtime support.'},
};
function LearningChapter({page,article}:{page:string;article:ContentPage}){
  const chapters=Object.keys(sitePages).filter(p=>p.startsWith('research/model-learning/')),position=chapters.indexOf(page),slug=page.split('/').at(-1)??'',diagram=learningDiagrams[slug];
  return <div className="family-page family-learning"><Breadcrumb category="Model learning" parent="learning"/><div className="learning-chapter-shell"><aside className="learning-chapter-nav"><a href="/learning">How intelligence learns</a><nav aria-label="Learning chapters">{chapters.map((path,i)=><a key={path} href={'/'+path} aria-current={page===path?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span>{titleFor(path)}</a>)}</nav></aside><div className="learning-chapter-body"><span className="learning-chapter-number">Chapter {String(position+1).padStart(2,'0')}</span><PageHeader article={article} category={false}/>{diagram&&<figure className="learning-concept"><div><span>{diagram.a}</span><i aria-hidden="true">→</i><span>{diagram.b}</span><i aria-hidden="true">→</i><span>{diagram.c}</span></div><figcaption>{diagram.detail}</figcaption></figure>}{article.sections.map((section,i)=><section className="learning-reading-section" key={section.title}><span>{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.copy}</p></section>)}<nav className="learning-pagination" aria-label="Chapter navigation">{position>0?<a href={'/'+chapters[position-1]}><small>Previous chapter</small>{titleFor(chapters[position-1])}</a>:<a href="/learning">Learning path</a>}{position<chapters.length-1&&<a href={'/'+chapters[position+1]}><small>Next chapter</small>{titleFor(chapters[position+1])}</a>}</nav></div></div></div>;
}

function ManualPage({page,article}:{page:string;article:ContentPage}){
  const [active,setActive]=useState(0);
  const guides=Object.keys(sitePages).filter(p=>p.startsWith('guides/')||p.startsWith('developers/'));
  return <div className="family-page family-manual"><Breadcrumb category="Developers and guides" parent="docs"/><div className="manual-shell"><aside className="manual-navigation"><a href="/docs">Horizon documentation</a>{guides.map(path=><a href={'/'+path} aria-current={page===path?'page':undefined} key={path}>{titleFor(path)}</a>)}</aside><div><PageHeader article={article}/><nav className="manual-section-nav" aria-label="In this guide">{article.sections.map((section,i)=><a key={section.title} href={'#manual-section-'+i} onClick={()=>setActive(i)} aria-current={active===i?'location':undefined}>{section.title}</a>)}</nav><article className="manual-steps">{article.sections.map((section,i)=><section id={'manual-section-'+i} key={section.title}><span className="manual-step-count">{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.copy}</p>{section.items&&<ol>{section.items.map(item=><li key={item}>{item}</li>)}</ol>}</section>)}</article><Related links={article.related} title="Next steps"/></div></div></div>;
}

function EditorialPage({page,article}:{page:string;article:ContentPage}){
  const research=page.startsWith('research/');
  return <div className={'family-page family-editorial '+(research?'family-research-detail':'')}><Breadcrumb category={research?'Research':'News and perspectives'} parent={research?'research':'news'}/><PageHeader article={article}/><div className="editorial-document-meta"><span>{article.category}</span><span>Horizons Lab</span><span>{Math.max(2,Math.ceil(article.sections.map(s=>s.copy).join(' ').split(/\s+/).length/200))} min read</span></div>{article.image&&<figure className="editorial-document-image"><img src={'/reference/'+article.image} alt=""/></figure>}<div className="editorial-reading-layout"><aside><span>In this article</span>{article.sections.map((section,i)=><a key={section.title} href={'#article-section-'+i}>{section.title}</a>)}</aside><article>{article.sections.map((section,i)=><section id={'article-section-'+i} key={section.title}><h2>{section.title}</h2><p>{section.copy}</p>{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}</article></div><Related links={article.related}/></div>;
}

function CompanyPage({page,article}:{page:string;article:ContentPage}){
  return <div className={'family-page family-company company-'+page.replaceAll('/','-')}><Breadcrumb category="The lab" parent="about"/><PageHeader article={article}/><div className="company-principles">{article.sections.map((section,i)=><section key={section.title}><span>{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.copy}</p></section>)}</div>{page==='careers'&&<div className="company-contact-panel"><h2>Start a conversation</h2><p>Tell us what you work on and the questions you want to explore.</p><a href="/contact" className="reference-primary-button">Contact the lab</a></div>}<Related links={article.related}/></div>;
}

function DirectoryPage({page}:{page:string}){
  const index=pageIndexes[page],title=index?.title??'All pages',intro=index?.intro??'Explore the lab, product, resources, and policies.';
  const [query,setQuery]=useState(''),[category,setCategory]=useState('All');
  const links=page==='sitemap'?[...new Set([...Object.keys(pageIndexes),...Object.keys(sitePages),...Object.keys(labels)])].filter(p=>p!=='sitemap'):index?.links??[];
  const categories=[...new Set(links.map(p=>sitePages[p]?.category).filter((x):x is string=>!!x))];
  const filtered=useMemo(()=>links.filter(path=>(category==='All'||sitePages[path]?.category===category)&&(titleFor(path)+' '+(sitePages[path]?.intro??'')).toLowerCase().includes(query.toLowerCase())),[links,category,query]);
  const isLearning=page==='learning',isCases=page==='use-cases',isNews=page==='news',isResearch=page==='research';
  const [role,setRole]=useState('All');
  if(isCases)return <div className="family-page family-case-directory"><Breadcrumb category="Horizon" parent="horizon"/><header className="family-page-header"><h1>{title}</h1><p>{intro}</p></header><div className="case-directory-role-tabs" role="group" aria-label="Filter by role">{['All',...new Set(examples.map(c=>c.role))].map(r=><button key={r} aria-pressed={role===r} onClick={()=>setRole(r)}>{r==='All'?'Everyone':r}</button>)}</div><div className="case-directory-grid">{examples.filter(c=>role==='All'||c.role===role).map(example=><a href={'/use-cases/'+example.slug} key={example.slug}><div style={{background:example.ground}}><img src={example.image} alt="" loading="lazy"/></div><small>{example.role}</small><h2>{example.title}</h2></a>)}</div><section className="family-end-cta"><h2>What will you work on?</h2><HorizonPrompt/></section></div>;
  return <div className={'family-page family-directory directory-'+page.replaceAll('/','-')}><Breadcrumb/><header className="family-page-header"><h1>{title}</h1><p>{intro}</p></header>{isResearch&&<div className="research-direction-intro"><p>Our questions span how models learn, how they run, and how people can work with them.</p><span>Research directions and perspectives</span></div>}
    {!isLearning&&<div className="directory-controls"><label><span className="sr-only">Search {title}</span><input type="search" placeholder={'Search '+title.toLowerCase()} value={query} onChange={e=>setQuery(e.target.value)}/></label>{categories.length>1&&<label><span className="sr-only">Category</span><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>}</div>}
    <div className={isLearning?'learning-path-list':isNews?'news-directory-list':isResearch?'research-directory-list':page==='sitemap'?'site-directory-list':'resource-directory-list'}>{filtered.map((path,i)=>{
      const p=sitePages[path];return <a href={'/'+path} key={path}>{isLearning&&<span className="learning-path-number">{String(i+1).padStart(2,'0')}</span>}{p?.image&&!isLearning&&<img src={'/reference/'+p.image} alt="" loading="lazy"/>}<div><small>{p?.category??'Explore'}</small><h2>{titleFor(path)}</h2><p>{p?.intro??pageIndexes[path]?.intro}</p></div><span className="directory-link-cue" aria-hidden="true">↗</span></a>
    })}</div>{filtered.length===0&&<p className="directory-empty">No pages match this search.</p>}</div>;
}

export function AboutLabPage(){
  return <div className="family-page family-about"><Breadcrumb category="Company" parent="company"/><header className="about-reference-statement"><h1><strong>We explore how intelligence can become useful.</strong> Horizons Lab brings together an interest in model learning, local inference, and the tools people use to build with AI.</h1></header><div className="about-reference-grid"><h2>From understanding<br/>to making.</h2><div><p>Horizon is the desktop workspace growing out of that work: conversations, projects, files, models, and tools in one place.</p><p>Our guides explain the choices around the software. Our research pages describe directions and questions, with the status of the work kept clear.</p><a href="/horizon">Meet Horizon</a></div></div><div className="company-principles">{[['Intelligence people can shape','Make model and tool choices understandable. Keep the output inspectable and the person in control.'],['Practical work, visible limits','Build around real tasks. Describe compatibility, failure cases, and the conditions behind a result.'],['Learning in the open','Share useful software and explanations. Give people enough context to understand and contribute to the work.']].map(([title,copy],i)=><section key={title}><span>{String(i+1).padStart(2,'0')}</span><h2>{title}</h2><p>{copy}</p></section>)}</div><Related links={['research','company/mission','responsible-development','community']}/><div className="company-contact-panel"><h2>Work on what comes next.</h2><a href="/contact" className="reference-primary-button">Contact the lab</a></div></div>;
}
