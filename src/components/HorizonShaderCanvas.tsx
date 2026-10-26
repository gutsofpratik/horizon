import React, { useEffect, useRef } from 'react';

export const HorizonShaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
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

    // Minimalist ambient horizon particles
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.15
    }));

    const render = () => {
      time += 0.008;
      // Smooth lerp mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic mouse-glow spotlight shader
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, width * 0.45);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
      glowGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Delicate floating horizon particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Elegant Minimal Horizon Wave Lines (The generative horizon)
      const horizonY = height * 0.52;
      const waveCount = 3;

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveOffset = w * 0.6;
        const opacity = 0.05 + w * 0.035;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += 15) {
          const distX = Math.abs(x - mouseX) / width;
          const mouseInfluence = Math.max(0, 1 - distX * 2) * 22;

          const y =
            horizonY +
            Math.sin(x * 0.0025 + time + waveOffset) * 18 +
            Math.cos(x * 0.005 - time * 0.5) * 10 -
            mouseInfluence * Math.sin(time + waveOffset);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
};
