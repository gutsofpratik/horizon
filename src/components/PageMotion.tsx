import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      document.documentElement.style.setProperty(
        "--hero-scroll",
        String(
          Math.min(
            1,
            Math.max(0, window.scrollY / (window.innerHeight * 0.85)),
          ),
        ),
      );
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(available > 0 ? window.scrollY / available : 0),
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      observer?.disconnect();
      document.documentElement.classList.remove("motion-ready");
      if (!preference.matches) {
        observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            }),
          { threshold: 0.08 },
        );
        document
          .querySelectorAll(".reveal")
          .forEach((element) => observer?.observe(element));
        document.documentElement.classList.add("motion-ready");
      }
    };
    configure();
    update();
    preference.addEventListener("change", configure);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", configure);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return null;
}
