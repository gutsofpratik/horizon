import { useEffect, useRef } from "react";
import type {CSSProperties} from "react";
import { ArrowUpRight } from "./LabIcons";

const branches = [
  {
    title: "Get it done",
    x: 330,
    y: 210,
    items: [
      ["Editable files", 120, 80],
      ["Longer tasks", 150, 190],
      ["Artifacts", 120, 300],
    ],
  },
  {
    title: "Access tools",
    x: 880,
    y: 210,
    items: [
      ["MCP connections", 1040, 80],
      ["Terminal", 1080, 190],
      ["Skills", 1060, 300],
    ],
  },
  {
    title: "Make it yours",
    x: 985,
    y: 470,
    items: [
      ["Your instructions", 1110, 390],
      ["Your models", 1090, 520],
      ["Your workspace", 1060, 630],
    ],
  },
  {
    title: "Stay in control",
    x: 820,
    y: 650,
    items: [
      ["Review changes", 920, 740],
      ["Inspect tools", 770, 760],
    ],
  },
  {
    title: "Work where you want",
    x: 370,
    y: 650,
    items: [
      ["Local models", 200, 730],
      ["Provider connections", 420, 760],
    ],
  },
  {
    title: "Don’t start over",
    x: 210,
    y: 470,
    items: [
      ["Conversations", 100, 390],
      ["Project context", 100, 510],
      ["Reusable skills", 100, 620],
    ],
  },
];
export function ProductCapabilities() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(()=>{const element=root.current;if(!element)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)');let raf=0;const update=()=>{raf=0;const box=element.getBoundingClientRect();const progress=reduce.matches?1:Math.max(0,Math.min(1,(innerHeight*.82-box.top)/Math.max(1,box.height*.65)));element.style.setProperty('--map-progress',String(progress));};const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};update();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);reduce.removeEventListener('change',schedule)}},[]);
  return (
    <section className="product-capabilities">
      <h2 className="reference-change-heading">Change the way you work</h2>
      <div className="editorial-width capabilities-principles">
        <article>
          <span className="reference-principle-number">01</span>
          <h3>You don’t need the right words</h3>
          <p>
            Bring a question, a project, or an unfinished thought. Build up
            context as you work, with your files close at hand.
          </p>
        </article>
        <article>
          <span className="reference-principle-number">02</span>
          <h3>You have control and the final say</h3>
          <p>
            Inspect files, review editable artifacts, and follow tool activity
            in the same workspace as the conversation.
          </p>
        </article>
        <article>
          <span className="reference-principle-number">03</span>
          <h3>You don’t need to start over</h3>
          <p>
            Choose your model and enabled tools. Extend the workspace with
            skills and connections that fit your workflow.
          </p>
        </article>
      </div>
      <div className="capabilities-heading">
        <h2>See what Horizon can do</h2>
        <a
          className="reference-primary-button reference-download-button"
          href="/product/projects"
        >
          Explore the workspace
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div
        className="capability-map sequential-map"
        ref={root}
        aria-label="Horizon connects editable artifacts, tools, model choices, and project workspaces"
      >
        <svg viewBox="0 0 1200 780" aria-hidden="true">
          <g>
            {branches.map((branch,index) => (
              <g key={branch.title} style={{'--branch':index} as CSSProperties}>
                <path
                  className="capability-trunk"
                  pathLength="1"
                  d={`M600 390 L${branch.x} ${branch.y}`}
                />
                {branch.items.map(([label, x, y]) => (
                  <path pathLength="1" key={label} d={`M${branch.x} ${branch.y} L${x} ${y}`} />
                ))}
              </g>
            ))}
          </g>
        </svg>
        <div className="capability-center">
          <span>Horizon</span>
        </div>
        {branches.map((branch,index) => (
          <div className="map-branch" key={branch.title} style={{'--branch':index} as CSSProperties}>
            <h3
              className="capability-node"
              style={{ left: `${branch.x / 12}%`, top: `${branch.y / 7.8}%` }}
            >
              {branch.title}
            </h3>
            {branch.items.map(([label, x, y]) => (
              <span
                className="capability-leaf"
                key={label}
                style={{
                  left: `${Number(x) / 12}%`,
                  top: `${Number(y) / 7.8}%`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
