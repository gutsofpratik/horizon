import { useEffect, useRef, useState } from "react";
import { workspaceViews } from "../data/productContent";

export function ScrollWorkspace({
  role,
}: {
  role?: { name: string; intro: string; description: string };
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 901px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = root.current;
      if (!element || reduce.matches || !desktop.matches) return;
      const box = element.getBoundingClientRect();
      const distance = box.height - innerHeight + 145;
      const progress = Math.max(
        0,
        Math.min(1, (145 - box.top) / Math.max(1, distance)),
      );
      element.style.setProperty("--story-progress", String(progress));
      setActive((previous) => {
        const next = Math.min(3, Math.floor(progress * 4));
        return previous === next ? previous : next;
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    reduce.addEventListener("change", scroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      reduce.removeEventListener("change", scroll);
    };
  }, []);
  const select = (index: number) => {
    setActive(index);
    const element = root.current;
    if (
      !element ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      innerWidth <= 900
    )
      return;
    const box = element.getBoundingClientRect();
    const distance = box.height - innerHeight + 145;
    scrollTo({
      top: scrollY + box.top - 145 + distance * ((index + 0.2) / 4),
      behavior: "smooth",
    });
  };
  return (
    <section
      id="workspace"
      className="scroll-workspace"
      ref={root}
      aria-labelledby="workspace-heading"
    >
      <div className="story-sticky editorial-width">
        <div className="story-copy">
          <span className="editorial-eyebrow">
            {role?.name ?? "The workspace"}
          </span>
          <h2 id="workspace-heading">
            {role?.intro ?? "All the pieces. Room to move."}
          </h2>
          <p>
            {role?.description ??
              "Start a conversation, choose your model, and bring the right capabilities into the work."}
          </p>
          <div
            className="story-chapters"
            role="tablist"
            aria-label="Explore Horizon"
          >
            {workspaceViews.map((view, index) => (
              <button
                role="tab"
                key={view.name}
                id={`story-tab-${index}`}
                aria-selected={active === index}
                aria-controls="desktop-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight" || event.key === "ArrowDown")
                    next = (index + 1) % 4;
                  else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
                    next = (index + 3) % 4;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 3;
                  else return;
                  event.preventDefault();
                  select(next);
                  document.getElementById(`story-tab-${next}`)?.focus();
                }}
              >
                <span className="chapter-number">0{index + 1}</span>
                <span>{view.name}</span>
                <span className="chapter-indicator" aria-hidden="true" />
              </button>
            ))}
          </div>
          <span className="story-scroll-note">
            Scroll to explore, or choose a chapter.
          </span>
        </div>
        <div className="story-stage">
          <div
            id="desktop-panel"
            className="story-screens"
            role="tabpanel"
            aria-labelledby={`story-tab-${active}`}
            tabIndex={0}
          >
            {workspaceViews.map((view, index) => (
              <img
                key={view.name}
                src={`/images/${view.image}`}
                alt={
                  index === active ? `Actual Horizon desktop: ${view.name}` : ""
                }
                aria-hidden={index !== active}
                className={index === active ? "is-active" : ""}
                width="1282"
                height="932"
                loading="lazy"
              />
            ))}
          </div>
          <div className="story-caption">
            <p aria-live="polite">{workspaceViews[active].description}</p>
            <span>Actual desktop interface</span>
          </div>
          <div className="story-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
