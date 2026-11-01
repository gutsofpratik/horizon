import { ArrowUpRight } from "./LabIcons";
import { LabFeature } from "./LabFeature";
import {useRef,useState} from 'react';
import { MissionReveal } from "./MissionReveal";
const projects = [
  {
    title: "Introducing Horizon",
    label: "Desktop workspace",
    copy: "A local-first workspace for conversations, files, artifacts, tools, and agents. Choose a local model or connect a provider.",
    detail: "Horizon",
    href: "/news/introducing-horizon",
    action: "Explore the product",
  },
  {
    title: "A guide to local intelligence",
    label: "Model exploration",
    copy: "Practical model choices, format and runtime notes, and hardware planning. Explore what might work for your own workload.",
    detail: "Horizon Models",
    href: "/models",
    action: "Read the guide",
  },
  {
    title: "More ways to put AI to work",
    label: "Reusable capabilities",
    copy: "Discover reusable instructions for engineering, research, and model-development workflows, with sources and license notices.",
    detail: "Horizon Skills",
    href: "/skills",
    action: "Explore the library",
  },
];
const topics = [
  {
    label: "Model training",
    title: "How intelligence learns",
    image: "learn-00.jpg",
    href: "/research/model-training",
  },
  {
    label: "Efficient inference",
    title: "Bringing models closer",
    image: "learn-01.jpg",
    href: "/research/inference",
  },
  {
    label: "Agents & tools",
    title: "From capability to useful work",
    image: "learn-02.jpg",
    href: "/research/agents",
  },
  {
    label: "The lab",
    title: "A shared sense of possibility",
    image: "learn-03.jpg",
    href: "/about",
  },
];
export function LabHome() {
  const resources=useRef<HTMLDivElement>(null);
  const [resourcePosition,setResourcePosition]=useState(0);
  const moveResources=(direction:number)=>{const el=resources.current;if(el)el.scrollBy({left:direction*(el.firstElementChild?.getBoundingClientRect().width??300),behavior:'smooth'})};
  return (
    <>
      <MissionReveal />
      <LabFeature />
      <section
        className="reference-news"
        id="news"
        aria-label="From Horizons Lab"
      >
        <div className="reference-news-grid">
          {projects.map((project) => (
            <article className="reference-news-card" key={project.title}>
              <div className="reference-card-meta">
                <span className="reference-more" aria-hidden="true">
                  •••
                </span>
                <span>Open source</span>
                <span>{project.label}</span>
              </div>
              <h2>
                <a href={project.href}>{project.title}</a>
              </h2>
              <p>{project.copy}</p>
              <div className="reference-card-links">
                <div>
                  <span>Project</span>
                  <a href={project.href}>
                    {project.detail}
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div><span>Access</span><a href="/waitlist">Join Waitlist<ArrowUpRight size={12}/></a></div>
              </div>
              <a className="reference-card-action" href={project.href}>
                {project.action}
                <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="reference-learn" id="ecosystem">
        <div className="reference-learn-top">
          <h2>Learn more</h2>
          <a href="/research">
            Explore the lab
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="reference-learn-grid" ref={resources} onScroll={()=>{const el=resources.current;if(el)setResourcePosition(el.scrollLeft/Math.max(1,el.scrollWidth-el.clientWidth))}}>
          {topics.map((topic) => (
            <a
              className="reference-learn-card"
              href={topic.href}
              key={topic.label}
            >
              <img
                src={`/reference/${topic.image}`}
                alt=""
                loading="lazy"
                width="642"
                height="803"
              />
              <div>
                <span>{topic.label}</span>
                <h3>{topic.title}</h3>
                <ArrowUpRight size={20} />
              </div>
            </a>
          ))}
        </div>
        <div className="lab-resource-controls"><span>Explore the lab</span><div><button aria-label="Previous resources" disabled={resourcePosition<=0} onClick={()=>moveResources(-1)}>←</button><button aria-label="Next resources" disabled={resourcePosition>=.99} onClick={()=>moveResources(1)}>→</button></div></div>
      </section>
    </>
  );
}
