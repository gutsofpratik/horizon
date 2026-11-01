import { useId } from "react";
export function LabArtwork({
  variant = "landscape",
  className = "",
}: {
  variant?: "landscape" | "learning" | "inference" | "tools";
  className?: string;
}) {
  const clip = useId();
  return (
    <svg
      className={`lab-artwork artwork-${variant} ${className}`}
      viewBox="0 0 600 420"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <rect width="600" height="420" rx="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {variant === "landscape" && (
          <>
            {Array.from({ length: 36 }, (_, i) => (
              <path
                key={i}
                d={`M${-80 + i * 4} ${350 + i * 3} C ${70 + i * 4} ${30 + i * 4},${260 + i * 6} ${60 - i * 3},${330 + i * 7} ${220 + i * 4} S ${590 + i * 4} ${370 - i * 3},${750 + i * 4} ${60 + i * 2}`}
                style={{ animationDelay: `${i * 0.055}s` }}
              />
            ))}
            <circle className="artwork-sun" cx="410" cy="97" r="45" />
            <path className="artwork-horizon" d="M40 345h520" />
          </>
        )}
        {variant === "learning" && (
          <>
            {Array.from({ length: 13 }, (_, i) => (
              <ellipse
                key={i}
                cx={300}
                cy={225 - i * 4}
                rx={50 + i * 11}
                ry={25 + i * 7}
                transform={`rotate(${i * 7 - 45} 300 200)`}
              />
            ))}
            <circle cx="300" cy="195" r="10" />
          </>
        )}
        {variant === "inference" && (
          <>
            {Array.from({ length: 18 }, (_, i) => (
              <path
                key={i}
                d={`M${80 + i * 10} 330 L${280 + i * 5} 80 L${465 - i * 3} 330 Z`}
              />
            ))}
            <path d="M60 350h470" />
          </>
        )}
        {variant === "tools" && (
          <>
            {[0, 1, 2].map((i) => (
              <g
                key={i}
                transform={`translate(${130 + i * 80} ${70 + i * 50}) rotate(-12 100 90)`}
              >
                <rect width="180" height="150" rx="3" />
                <path d="M25 35h40M25 55h125M25 75h110M25 95h125M25 115h65" />
              </g>
            ))}
          </>
        )}
      </g>
    </svg>
  );
}
