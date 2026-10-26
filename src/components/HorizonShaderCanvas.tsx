import React, { useEffect, useRef } from 'react';

export const HorizonShaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for living interactive network
    const count = 55;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.25,
      baseAlpha: Math.random() * 0.4 + 0.15
    }));

    const render = () => {
      time += 0.006;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Deep celestial black fill
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      // Ethereal subtle aurora ambient glow 1: Violet/Indigo
      const gradViolet = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 100,
        height * 0.25 + Math.cos(time * 0.8) * 80,
        0,
        width * 0.5,
        height * 0.25,
        width * 0.55
      );
      gradViolet.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
      gradViolet.addColorStop(0.4, 'rgba(99, 102, 241, 0.03)');
      gradViolet.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradViolet;
      ctx.fillRect(0, 0, width, height);

      // Ethereal subtle aurora ambient glow 2: Cyan/Teal
      const gradCyan = ctx.createRadialGradient(
        width * 0.75 + Math.cos(time * 0.7) * 90,
        height * 0.65 + Math.sin(time * 0.5) * 60,
        0,
        width * 0.75,
        height * 0.65,
        width * 0.45
      );
      gradCyan.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
      gradCyan.addColorStop(0.5, 'rgba(16, 185, 129, 0.02)');
      gradCyan.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradCyan;
      ctx.fillRect(0, 0, width, height);

      // Mouse interactive spotlight
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      mouseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
      mouseGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update particle nodes
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect near cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 160) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Connect neighbor particles
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 90) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist2 / 90) * 0.05})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
