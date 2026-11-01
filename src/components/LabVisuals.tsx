export function LabSculpture() {
  return (
    <div
      className="sculpture-stage"
      onPointerMove={(event) => {
        if (
          window.matchMedia(
            "(prefers-reduced-motion: reduce), (pointer: coarse)",
          ).matches
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--tilt-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}deg`,
        );
        event.currentTarget.style.setProperty(
          "--tilt-y",
          `${-((event.clientY - bounds.top) / bounds.height - 0.5) * 8}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <img
        className="lab-sculpture"
        src="/images/lab-sculpture.png"
        width="1440"
        height="1412"
        alt="A sculptural silver ring, an open horizon seen from a new perspective"
        fetchPriority="high"
      />
    </div>
  );
}
export function ModelDiagram() {
  return (
    <div className="model-diagram" aria-hidden="true">
      <div className="model-orbit orbit-one" />
      <div className="model-orbit orbit-two" />
      <div className="model-orbit orbit-three" />
      <div className="model-core">
        <div className="chip-dots">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <span className="diagram-chip chip-gguf">GGUF</span>
      <span className="diagram-chip chip-mlx">MLX</span>
      <span className="diagram-chip chip-api">API</span>
      <span className="model-diagram-label">
        A model for your way of working.
      </span>
    </div>
  );
}
export function SkillsDiagram() {
  return (
    <div className="skills-diagram" aria-hidden="true">
      <div className="skill-sheet sheet-back">
        <span>Research</span>
        <div />
        <div />
        <div />
      </div>
      <div className="skill-sheet sheet-middle">
        <span>Development</span>
        <div />
        <div />
        <div />
      </div>
      <div className="skill-sheet sheet-front">
        <span className="skill-file">
          <span>✳</span> SKILL.md
        </span>
        <strong>Ideas into capabilities.</strong>
        <p>Context. Instructions. Resources.</p>
        <div />
        <div />
        <div className="skill-sheet-short" />
        <span className="skill-sheet-footer">
          <span className="tiny-dot" /> Ready to build on
        </span>
      </div>
    </div>
  );
}
