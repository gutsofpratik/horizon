import { useId, useState } from "react";
import { ArrowUpRight, LabIcon } from "./LabIcons";
import "./ResearchExplorer.css";

const researchAreas = [
  {
    id: "training",
    icon: "training" as const,
    name: "Model training",
    title: "Intelligence is a starting point.",
    description:
      "Our ambition is to train and adapt models around useful tasks. We’re interested in data quality, focused fine-tuning, and evaluations that tell us what actually improved.",
    question: "How can smaller, focused models do more useful work?",
    tags: ["Data curation", "Fine-tuning", "Evaluation"],
    note: "A direction we’re exploring, not a published model release.",
  },
  {
    id: "inference",
    icon: "compute" as const,
    name: "Efficient inference",
    title: "More possibility. Less overhead.",
    description:
      "We want capable AI to be practical on everyday hardware. That means exploring quantization, runtime compatibility, memory use, and the trade-offs behind a responsive local experience.",
    question: "How much intelligence can we bring closer to the device?",
    tags: ["Quantization", "Local runtimes", "Memory efficiency"],
    note: "Our public model guide is a starting point for this work.",
  },
  {
    id: "systems",
    icon: "workflow" as const,
    name: "Agents & tools",
    title: "Capability becomes useful in context.",
    description:
      "We build environments where models can work with files, tools, and people. Our focus is on visible actions, reusable capabilities, and workflows that are easier to inspect and improve.",
    question: "What does an agent need to turn an intention into useful work?",
    tags: ["Agent workflows", "Tool development", "Human control"],
    note: "Horizon is our first public workspace for these ideas.",
  },
];
const columns = [3, 5, 5, 3];
const nodes = columns.flatMap((count, col) =>
  Array.from({ length: count }, (_, row) => ({
    x: 70 + col * 110,
    y: 145 + (row - (count - 1) / 2) * 43,
    col,
    row,
  })),
);
const edges = nodes.flatMap((node, i) =>
  nodes
    .filter((next) => next.col === node.col + 1)
    .map((next) => ({
      from: node,
      to: next,
      key: `${i}-${next.col}-${next.row}`,
    })),
);
export function NeuralField({ mode = 0 }: { mode?: number }) {
  const gradientId = useId();
  return (
    <div className={`neural-field neural-mode-${mode}`} aria-hidden="true">
      <svg viewBox="0 0 470 290" fill="none">
        <defs>
          <radialGradient id={gradientId}>
            <stop stopColor="#ddd" stopOpacity=".7" />
            <stop offset="1" stopColor="#fafafa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="235"
          cy="145"
          rx="215"
          ry="130"
          fill={`url(#${gradientId})`}
        />
        <g className="network-links">
          {edges.map((edge, i) => (
            <path
              key={edge.key}
              d={`M${edge.from.x} ${edge.from.y}C${edge.from.x + 55} ${edge.from.y},${edge.to.x - 55} ${edge.to.y},${edge.to.x} ${edge.to.y}`}
              className={i % 7 === mode ? "signal-path" : ""}
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </g>
        {nodes.map((node, i) => (
          <g
            key={i}
            className="network-node"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#fafafa"
              stroke="#c2c2c2"
            />
            <circle cx={node.x} cy={node.y} r="2.5" fill="#777" />
          </g>
        ))}
        <g className="network-labels">
          {["Context", "Adaptation", "Reasoning", "Action"].map((label, i) => (
            <text key={label} x={70 + i * 110} y="271" textAnchor="middle">
              {label}
            </text>
          ))}
        </g>
      </svg>
      <span className="field-caption">
        <span /> A connected system of possibilities
      </span>
    </div>
  );
}
export function ResearchExplorer({ expanded = false }: { expanded?: boolean }) {
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      researchAreas.findIndex(
        (area) =>
          area.id === new URLSearchParams(window.location.search).get("focus"),
      ),
    ),
  );
  const area = researchAreas[active];
  return (
    <div className={`research-explorer ${expanded ? "expanded-explorer" : ""}`}>
      <div
        className="research-selector"
        role="tablist"
        aria-label="Research focus"
      >
        {researchAreas.map((item, i) => (
          <button
            role="tab"
            id={`research-tab-${i}`}
            aria-selected={i === active}
            aria-controls="research-panel"
            tabIndex={i === active ? 0 : -1}
            key={item.id}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight" || e.key === "ArrowDown")
                next = (i + 1) % 3;
              else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
                next = (i + 2) % 3;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 2;
              else return;
              e.preventDefault();
              setActive(next);
              document.getElementById(`research-tab-${next}`)?.focus();
            }}
          >
            <LabIcon name={item.icon} size={19} />
            <span>{item.name}</span>
            <ArrowUpRight size={14} />
          </button>
        ))}
      </div>
      <div
        id="research-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`research-tab-${active}`}
        className="research-panel"
      >
        <div key={area.id} className="research-panel-copy">
          <span className="direction-tag">Research direction</span>
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <div className="research-tags">
            {area.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a className="text-link" href={expanded ? "/contact" : "/research"}>
            {expanded ? "Explore this with us" : "Inside our research"}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="research-panel-art">
          <NeuralField mode={active} />
          <p key={area.id} className="research-question">
            {area.question}
          </p>
        </div>
      </div>
      {expanded && (
        <p className="research-status" aria-live="polite">
          {area.note}
        </p>
      )}
    </div>
  );
}
