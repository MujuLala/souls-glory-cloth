
"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;

    // =====================================================
    // MOUSE
    // =====================================================

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    // =====================================================
    // RESIZE
    // =====================================================

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // =====================================================
    // MOUSE MOVE
    // =====================================================

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();

    // =====================================================
    // ANIMATION
    // =====================================================

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // ===================================================
      // GRID SETTINGS
      // ===================================================

      const gridSize = Math.max(35, width * 0.04);

      // Mouse distortion area
      const distortionRadius = Math.min(width, height) * 0.2;

      // Distortion strength
      const distortionStrength =
        Math.min(width, height) * 0.055;

      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";

      // ===================================================
      // VERTICAL GRID LINES
      // ===================================================

      for (let x = 0; x <= width + gridSize; x += gridSize) {
        ctx.beginPath();

        for (let y = 0; y <= height + 8; y += 8) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          let offsetX = 0;

          if (distance < distortionRadius) {
            const influence =
              1 - distance / distortionRadius;

            const force = Math.pow(influence, 2.5);

            // Push grid away from cursor
            const direction = dx / (distance || 1);

            offsetX =
              direction *
              force *
              distortionStrength;
          }

          const finalX = x + offsetX;

          if (y === 0) {
            ctx.moveTo(finalX, y);
          } else {
            ctx.lineTo(finalX, y);
          }
        }

        ctx.stroke();
      }

      // ===================================================
      // HORIZONTAL GRID LINES
      // ===================================================

      for (let y = 0; y <= height + gridSize; y += gridSize) {
        ctx.beginPath();

        for (let x = 0; x <= width + 8; x += 8) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          let offsetY = 0;

          if (distance < distortionRadius) {
            const influence =
              1 - distance / distortionRadius;

            const force = Math.pow(influence, 2.5);

            // Push grid away from cursor
            const direction = dy / (distance || 1);

            offsetY =
              direction *
              force *
              distortionStrength;
          }

          const finalY = y + offsetY;

          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }

        ctx.stroke();
      }

      // ===================================================
      // SMALL JELLY / BUBBLE CURSOR
      // ===================================================

      const bubbleRadius = 24;

      ctx.beginPath();

      const points = 80;
      const time = performance.now();

      for (let i = 0; i <= points; i++) {
        const angle =
          (Math.PI * 2 * i) / points;

        // Subtle jelly movement
        const wave =
          Math.sin(
            angle * 3 + time * 0.002
          ) *
          1 +
          Math.sin(
            angle * 5 - time * 0.0015
          ) *
          0.7;

        const radius =
          bubbleRadius + wave;

        const x =
          mouse.x +
          Math.cos(angle) * radius;

        const y =
          mouse.y +
          Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Soft gold jelly border
      ctx.strokeStyle =
        "rgba(247, 229, 123, 0.45)";

      ctx.lineWidth = 1;

      ctx.shadowBlur = 7;

      ctx.shadowColor =
        "rgba(247, 229, 123, 0.2)";

      ctx.stroke();

      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(render);
    };

    render();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >
      {/* =====================================================
          RED AMBIENT GLOW — TOP LEFT
      ====================================================== */}

      <div
        className="
          absolute
          left-[-12vw]
          top-[-10vw]
          h-[38vw]
          w-[38vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.075]
          blur-[10vw]
        "
      />

      {/* =====================================================
          BURGUNDY GLOW — TOP RIGHT
      ====================================================== */}

      <div
        className="
          absolute
          right-[-12vw]
          top-[8vw]
          h-[34vw]
          w-[34vw]
          rounded-full
          bg-red-950
          opacity-[0.11]
          blur-[9vw]
        "
      />

      {/* =====================================================
          CENTER GLOW
      ====================================================== */}

      <div
        className="
          absolute
          left-[38%]
          top-[28%]
          h-[30vw]
          w-[30vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.025]
          blur-[10vw]
        "
      />

      {/* =====================================================
          BOTTOM GLOW
      ====================================================== */}

      <div
        className="
          absolute
          bottom-[-15vw]
          left-[15%]
          h-[35vw]
          w-[35vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.045]
          blur-[11vw]
        "
      />

      {/* =====================================================
          INTERACTIVE GLOBAL GRID
      ====================================================== */}

      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      {/* =====================================================
          VIGNETTE
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,var(--bg)_125%)]
          opacity-30
        "
      />
    </div>
  );
}
