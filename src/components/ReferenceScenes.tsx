import { useEffect, useRef } from "react";

const positions = [
  [-0.02, 0.05],
  [0.08, 0.08],
  [0.175, 0.24],
  [0.255, 0.07],
  [0.372, 0],
  [0.54, 0.105],
  [0.67, 0.075],
  [0.815, 0.065],
  [0.91, 0.12],
  [0.975, 0.32],
  [-0.025, 0.3],
  [0.075, 0.28],
  [0.175, 0.6],
  [0.015, 0.59],
  [0.09, 0.62],
  [0.2, 0.59],
  [0.48, 0.77],
  [0.59, 0.84],
  [0.69, 0.82],
  [0.82, 0.65],
  [0.94, 0.66],
  [0.28, 0.81],
  [0.13, 0.8],
  [0.96, 0.77],
];
export function ReferenceCollage() {
  const canvas = useRef<HTMLCanvasElement>(null);

  const paused = false;
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      disposed = false;
    let visible = true;


    const images = positions.map((_, i) => {
      const image = new Image();
      image.src = `/reference/mosaic-${String(i).padStart(2, "0")}.jpg`;
      image.onload = () => draw(performance.now());
      return image;
    });
    const draw = (time: number) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);
      const size = Math.max(58, Math.min(103, width * 0.072));
      const reveal = reduced.matches ? 1 : Math.max(0, Math.min(1, (innerHeight-element.getBoundingClientRect().top)/(innerHeight*.8)));
      element.parentElement?.style.setProperty("--feature-opacity",String(Math.max(0,Math.min(1,(reveal-.15)/.4))));
      images.forEach((image, i) => {
        if (!image.complete || !image.naturalWidth) return;
        if (width < 760 && i >= 14) return;
        const point =
          width < 760
            ? [
                (i % 7) / 6 - 0.08,
                i < 7 ? (i % 3) * 0.065 : 0.81 + (i % 3) * 0.05,
              ]
            : positions[i];
        const drift =
          paused || reduced.matches
            ? 0
            : Math.sin(time * 0.00025 + i * 1.7) * 6;
        const entered =
          paused || reduced.matches
            ? 1
            : 1 - Math.pow(1 - Math.max(0,Math.min(1, (innerHeight - element.getBoundingClientRect().top) / (innerHeight * .8))), 3);
        const x =
            (width - size) / 2 +
            (point[0] * width - (width - size) / 2) * entered,
          y =
            (height - size) / 2 +
            (point[1] * height - (height - size) / 2) * entered +
            drift;
        context.drawImage(image, x, y, size, size);
      });
    };
    const tick = (time: number) => {
      draw(time);
      if (!paused && !reduced.matches && !document.hidden && visible)
        frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const box = element.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const ratio = Math.min(devicePixelRatio, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      draw(performance.now());
      if (!paused && !reduced.matches && !document.hidden && visible)
        frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    visibility.observe(element);
    reduced.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    resize();
    restart();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      reduced.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
      images.forEach((image) => (image.onload = null));
    };
  }, [paused]);
  return (
    <>
      <canvas ref={canvas} className="reference-collage" aria-hidden="true" />

    </>
  );
}
const labels = [
  "Build a prototype",
  "Write a brief",
  "Explore a dataset",
  "Review a document",
  "Plan a project",
  "Understand a paper",
  "Create a diagram",
  "Organize ideas",
  "Inspect a codebase",
  "Draft a presentation",
  "Explore a model",
  "Work with files",
  "Research a question",
  "Develop a tool",
];
export function ProductConstellation() {
  const root = useRef<HTMLDivElement>(null);
  const paused = false;
  const elapsed = useRef(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let lastTime = performance.now();
    const tiles = [
      ...element.querySelectorAll<HTMLElement>(".constellation-tile"),
    ];
    const update = (time: number) => {
      if (!paused && visible && !document.hidden)
        elapsed.current += time - lastTime;
      lastTime = time;
      const scale = Math.max(0.48, Math.min(innerWidth / 1440, 1.25));
      tiles.forEach((tile, index) => {
        const inner = index >= 14;
        const count = inner ? 12 : 14;
        const local = inner ? index - 14 : index;
        const drift = reduced.matches
          ? 0
          : elapsed.current * 0.000008 * (inner ? -1 : 1);
        const angle =
          (local / count) * Math.PI * 2 -
          Math.PI / 2 +
          (inner ? 0.18 : 0) +
          drift;
        const radius = (inner ? 475 : 700) * scale;
        const y =
          (innerWidth <= 760 ? 400 : 430) + Math.sin(angle) * radius * 0.96;
        const x = Math.cos(angle) * radius;
        tile.style.opacity =
          innerWidth <= 760 && y > 275 && y < 650 ? "0" : "1";
        tile.style.left = `calc(50% + ${x}px)`;
        tile.style.top = `${y}px`;
        tile.style.setProperty(
          "--tile-size",
          `${(index % 3 === 0 ? 123 : index % 3 === 1 ? 114 : 103.5) * Math.max(0.65, scale)}px`,
        );
      });
      if (!paused && !reduced.matches && !document.hidden && visible)
        frame = requestAnimationFrame(update);
    };
    const restart = () => {
      element.querySelectorAll("video").forEach(video => {if(reduced.matches || document.hidden || !visible) video.pause(); else void video.play().catch(()=>{});});
      cancelAnimationFrame(frame);
      update(performance.now());
    };
    restart();
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    visibility.observe(element);
    addEventListener("resize", restart);
    reduced.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      removeEventListener("resize", restart);
      reduced.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [paused]);
  return (
    <>
      <div
        className={`product-constellation ${paused ? "is-paused" : ""}`}
        ref={root}
        aria-hidden="true"
      >
        {Array.from({ length: 26 }, (_, i) => (
          <div className="constellation-tile" key={i}>
            <div>
              {i % 2 === 0 ? (
                <img
                  src={`/reference/task-${String(Math.floor(i / 2) % 12).padStart(2, "0")}.jpg`}
                  alt=""
                />
              ) : (
                <video muted loop playsInline preload="metadata" poster={["https://assets.claude.com/a2113b58785939b1928fe6c21bd44497bf45add0.jpg?fm=webp&w=480","https://assets.claude.com/ecc7fdab5f73275fe815c099a822959ffb4b0aff.jpg?fm=webp&w=480","https://assets.claude.com/9b592c27d3ab8a1d7bf823b51cd3c5ba270280f3.jpg?fm=webp&fit=max&w=480","https://assets.claude.com/089bf117acd2c695fef361227cc4d0a9f30255e6.jpg?fm=webp&w=480"][Math.floor(i/2)%4]} src={["https://assets.claude.com/45fb4539045677c1b8c02defae09c5ded307e30d.mp4","https://assets.claude.com/4cabad7efa1f4cd99f489320f5a15861a95e5deb.mp4","https://assets.claude.com/4b2ba814e1b0ae7999e50b0480a77e9f937c49a3.mp4","https://assets.claude.com/d7c29ad3ece555428b01caed7e84dba3c484e104.mp4"][Math.floor(i/2)%4]} />
              )}
            </div>
            <p>{labels[i % labels.length]}</p>
          </div>
        ))}
      </div>

    </>
  );
}
