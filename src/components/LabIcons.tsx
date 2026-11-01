import type { CSSProperties } from "react";

type IconProps = { size?: number; className?: string; style?: CSSProperties };
type IconName =
  | "arrowUp"
  | "arrowRight"
  | "arrowDown"
  | "menu"
  | "close"
  | "download"
  | "compute"
  | "layers"
  | "monitor"
  | "check"
  | "code"
  | "workflow"
  | "spark"
  | "training"
  | "research"
  | "mail";
const paths: Record<IconName, string[]> = {
  arrowUp: ["M6 18 18 6M6 6h12v12"],
  arrowRight: ["M4 12h15M13 6l6 6-6 6"],
  arrowDown: ["M12 4v15M6 13l6 6 6-6"],
  menu: ["M4 7h16M4 12h16M4 17h11"],
  close: ["m6 6 12 12M18 6 6 18"],
  download: ["M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"],
  compute: [
    "M6 6h12v12H6zM9 9h6v6H9zM9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3",
  ],
  layers: ["m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5"],
  monitor: ["M3 4h18v13H3zM8 21h8m-4-4v4M7 8h5m-5 4h9"],
  check: ["m5 12 4 4L19 6"],
  code: ["m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"],
  workflow: ["M4 4h6v6H4zM14 14h6v6h-6zM10 7h7v7M7 10v7h7"],
  spark: ["M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z"],
  training: ["M4 5h16M6 12h12M9 19h6M7 5l3 7m7-7-3 7m-4 0 2 7 2-7"],
  research: [
    "M8 3h8m-6 0v6l-6 10a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3M7 15h10",
  ],
  mail: ["M3 5h18v14H3zM3 6l9 7 9-7"],
};
export function LabIcon({
  name,
  size = 20,
  className = "",
  style,
}: IconProps & { name: IconName }) {
  return (
    <svg
      className={`lab-icon icon-${name} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
export const ArrowUpRight = (p: IconProps) => <LabIcon name="arrowUp" {...p} />;
export const ArrowRight = (p: IconProps) => (
  <LabIcon name="arrowRight" {...p} />
);
export const ArrowDown = (p: IconProps) => <LabIcon name="arrowDown" {...p} />;
export const Menu = (p: IconProps) => <LabIcon name="menu" {...p} />;
export const X = (p: IconProps) => <LabIcon name="close" {...p} />;
export const Download = (p: IconProps) => <LabIcon name="download" {...p} />;
export const Cpu = (p: IconProps) => <LabIcon name="compute" {...p} />;
export const Layers = (p: IconProps) => <LabIcon name="layers" {...p} />;
export const Monitor = (p: IconProps) => <LabIcon name="monitor" {...p} />;
export const Check = (p: IconProps) => <LabIcon name="check" {...p} />;
export const Code2 = (p: IconProps) => <LabIcon name="code" {...p} />;
export const Workflow = (p: IconProps) => <LabIcon name="workflow" {...p} />;
export const Sparkles = (p: IconProps) => <LabIcon name="spark" {...p} />;
