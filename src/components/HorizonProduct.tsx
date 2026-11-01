import {useEffect} from 'react';
import {ProductOrbit} from './ProductOrbit';
import {ProductPreview} from './ProductPreview';
import {WorkdayShowcase,ArtifactLibrary} from './WorkdayShowcase';
import {CapabilityExperience} from './CapabilityExperience';
import {HorizonPrompt} from './HorizonPrompt';
import {ProductTestimonials} from './ProductTestimonials';
const faq=[
  ['What is Horizon?','Horizon is a desktop workspace for conversations, files, editable artifacts, models, and tools. Run a compatible local model or connect a supported provider.'],
  ['What kind of work can I bring to it?','Start with writing, code, documents, research, or a project you want to understand. The results and available workflows depend on your selected model, enabled tools, and the context you provide.'],
  ['Does Horizon work with my apps?','Compatible tools can be connected through MCP. The examples on this page illustrate possible workflows; they do not mean every pictured service has a built-in integration. Review tool requirements and permissions before enabling a connection.'],
  ['Can I use a local model?','Compatible models can run through a local runtime. Model format, architecture, available memory, and context length affect what will work on your machine. Model weights and their licenses are separate from Horizon.'],
  ['What is the difference between the beta and waitlist?','Try Horizon takes you to the available desktop beta and setup information. Join Waitlist lets you register your interest in future access and updates.'],
  ['Does it cost anything to use a provider?','A connected provider uses your own account and configuration. Provider charges, limits, and terms are separate. Check them before starting a workflow.'],
];
export function HorizonProduct(){
  useEffect(()=>{document.title='Horizon — A workspace for what’s possible'},[]);
  return <div className="audited-product">
    <section className="audited-product-intro" aria-labelledby="horizon-title"><div className="audited-hero-stage"><ProductOrbit/><div className="audited-hero-copy"><h1 id="horizon-title"><span>Give</span> <span>Horizon</span> <span>more</span></h1><p>Bring a task, not just a question.<br/>Work through ideas, files, code, and bigger projects.</p><div className="intro-actions"><a className="reference-primary-button" href="/download">Try Horizon</a><a className="reference-primary-button reference-source-button" href="/waitlist">Join Waitlist</a></div></div></div><ProductPreview/></section>
    <section className="audited-benefits" aria-label="Work with Horizon"><article><span>01</span><h2>Take tasks off your desk</h2><p>Bring the files, context, and unfinished work. Go from a question to a draft you can review.</p></article><article><span>02</span><h2>Turn ideas into something real</h2><p>Work toward an editable document, a prototype, or a change in your code. Keep refining it in context.</p></article><article><span>03</span><h2>Extend what you can do</h2><p>Choose your model and connect compatible tools. Keep the process visible and the final say yours.</p></article></section>
    <WorkdayShowcase/>
    <ProductTestimonials/>
    <CapabilityExperience/>
    <ArtifactLibrary/>
    <section className="audited-faq" id="questions"><h2>FAQ</h2><div>{faq.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span className="question-toggle" aria-hidden="true"/></summary><p>{a}</p></details>)}</div></section>
    <section className="audited-ask"><h2>Don’t know where to start?<br/>Ask Horizon.</h2><p>Bring the next thing you want to understand, build, or finish.</p><HorizonPrompt/><div className="ask-access-links"><a href="/download">Try Horizon</a><a href="/waitlist">Join Waitlist</a></div></section>
  </div>;
}
