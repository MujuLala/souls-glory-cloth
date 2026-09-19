"use client";

import { useEffect, useRef } from "react";

type Thread = {
  x: number;
  y: number;

  length: number;
  angle: number;

  speed: number;
  drift: number;

  wave: number;
  waveSpeed: number;
  phase: number;

  thickness: number;
  opacity: number;
  colorIndex: number;

  // Smooth velocity
  vx: number;
  vy: number;
};

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let threads: Thread[] = [];

    // =====================================================
    // THEME
    // =====================================================

    const getTheme = () => {
      return document.documentElement.getAttribute(
        "data-theme"
      );
    };

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
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createThreads();
    };

    // =====================================================
    // MOUSE MOVE
    // =====================================================

    const handleMouseMove = (
      e: MouseEvent
    ) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // =====================================================
    // COLORS
    // =====================================================

    const getColors = () => {
      const isLight =
        getTheme() === "light";

      if (isLight) {
        return [
          "rgba(155, 125, 30, 0.20)",
          "rgba(17, 18, 20, 0.11)",
          "rgba(120, 92, 28, 0.15)",
          "rgba(150, 65, 65, 0.12)",
          "rgba(50, 105, 92, 0.10)",
          "rgba(95, 75, 110, 0.09)",
          "rgba(100, 80, 55, 0.13)",
        ];
      }

      return [
        "rgba(247, 229, 123, 0.24)",
        "rgba(255, 255, 255, 0.13)",
        "rgba(184, 148, 69, 0.19)",
        "rgba(174, 76, 76, 0.13)",
        "rgba(75, 135, 119, 0.11)",
        "rgba(130, 105, 150, 0.10)",
        "rgba(139, 104, 63, 0.16)",
      ];
    };

    // =====================================================
    // CREATE THREADS
    // =====================================================

    const createThreads = () => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      const area =
        width * height;

      /*
       * More threads.
       *
       * Desktop: 1400
       * Laptop: 1100
       * Mobile: 650
       */

      const density =
        area > 1800000
          ? 1400
          : area > 1000000
            ? 1100
            : 650;

      threads = [];

      for (
        let i = 0;
        i < density;
        i++
      ) {
        threads.push({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          // Small threads
          length:
            2.5 +
            Math.random() *
              Math.min(
                width,
                height
              ) *
              0.009,

          // Random direction
          angle:
            Math.random() *
            Math.PI *
            2,

          // Smooth visible movement
          speed:
            0.07 +
            Math.random() *
              0.16,

          // Gentle floating
          drift:
            0.06 +
            Math.random() *
              0.15,

          // Small curve
          wave:
            0.25 +
            Math.random() *
              1.1,

          // Slow wave
          waveSpeed:
            0.0009 +
            Math.random() *
              0.0015,

          phase:
            Math.random() *
            Math.PI *
            2,

          // Thin
          thickness:
            0.28 +
            Math.random() *
              0.42,

          // Subtle
          opacity:
            0.30 +
            Math.random() *
              0.40,

          colorIndex:
            Math.floor(
              Math.random() * 7
            ),

          vx: 0,
          vy: 0,
        });
      }
    };

    // =====================================================
    // THEME OBSERVER
    // =====================================================

    const observer =
      new MutationObserver(() => {
        render();
      });

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "data-theme",
        ],
      }
    );

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    resize();

    // =====================================================
    // RENDER
    // =====================================================

    const render = () => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      const time =
        performance.now();

      const colors =
        getColors();

      // ===================================================
      // VERY SMOOTH CURSOR
      // ===================================================

      mouse.x +=
        (mouse.targetX -
          mouse.x) *
        0.075;

      mouse.y +=
        (mouse.targetY -
          mouse.y) *
        0.075;

      // ===================================================
      // CLEAR
      // ===================================================

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // ===================================================
      // POINTER SETTINGS
      // ===================================================

      /*
       * Larger influence area.
       * Threads around cursor get pushed away.
       */

      const mouseRadius =
        Math.min(
          width,
          height
        ) * 0.20;

      /*
       * Stronger push.
       *
       * This is actual movement,
       * not only visual offset.
       */

      const mouseStrength =
        Math.min(
          width,
          height
        ) * 0.050;

      // ===================================================
      // THREADS
      // ===================================================

      for (
        const thread of threads
      ) {
        // =================================================
        // NATURAL MOVEMENT
        // =================================================

        const moveX =
          Math.cos(
            thread.angle
          ) *
          thread.speed;

        const moveY =
          Math.sin(
            thread.angle
          ) *
          thread.speed;

        thread.x += moveX;
        thread.y += moveY;

        // =================================================
        // NATURAL DRIFT
        // =================================================

        const driftTime =
          time *
            thread.waveSpeed +
          thread.phase;

        thread.x +=
          Math.cos(
            driftTime
          ) *
          thread.drift *
          0.32;

        thread.y +=
          Math.sin(
            driftTime * 0.8
          ) *
          thread.drift *
          0.32;

        // =================================================
        // SLOW ROTATION
        // =================================================

        thread.angle +=
          Math.sin(
            time * 0.0002 +
              thread.phase
          ) *
          0.00045;

        // =================================================
        // MOUSE REPULSION
        // =================================================

        const dx =
          thread.x -
          mouse.x;

        const dy =
          thread.y -
          mouse.y;

        const distance =
          Math.sqrt(
            dx * dx +
              dy * dy
          );

        if (
          distance <
          mouseRadius
        ) {
          /*
           * 0 at edge
           * 1 at cursor
           */
          const influence =
            1 -
            distance /
              mouseRadius;

          /*
           * Stronger near pointer.
           *
           * Higher exponent means
           * smoother falloff.
           */
          const force =
            Math.pow(
              influence,
              2.15
            ) *
            mouseStrength;

          const directionX =
            dx /
            (distance || 1);

          const directionY =
            dy /
            (distance || 1);

          /*
           * Add force to actual
           * thread velocity.
           */
          thread.vx +=
            directionX *
            force *
            0.045;

          thread.vy +=
            directionY *
            force *
            0.045;

          /*
           * Slightly rotate nearby
           * threads for organic movement.
           */
          thread.angle +=
            Math.sin(
              time * 0.002 +
                thread.phase
            ) *
            influence *
            0.0025;
        }

        // =================================================
        // APPLY POINTER VELOCITY
        // =================================================

        thread.x +=
          thread.vx;

        thread.y +=
          thread.vy;

        // =================================================
        // SMOOTHLY DAMP VELOCITY
        // =================================================

        thread.vx *=
          0.88;

        thread.vy *=
          0.88;

        // =================================================
        // WRAP
        // =================================================

        const margin =
          thread.length * 3;

        if (
          thread.x <
          -margin
        ) {
          thread.x =
            width + margin;
        }

        if (
          thread.x >
          width + margin
        ) {
          thread.x =
            -margin;
        }

        if (
          thread.y <
          -margin
        ) {
          thread.y =
            height + margin;
        }

        if (
          thread.y >
          height + margin
        ) {
          thread.y =
            -margin;
        }

        // =================================================
        // THREAD GEOMETRY
        // =================================================

        const cos =
          Math.cos(
            thread.angle
          );

        const sin =
          Math.sin(
            thread.angle
          );

        const startX =
          thread.x;

        const startY =
          thread.y;

        const endX =
          startX +
          cos *
            thread.length;

        const endY =
          startY +
          sin *
            thread.length;

        const perpendicularX =
          -sin;

        const perpendicularY =
          cos;

        // =================================================
        // THREAD WAVE
        // =================================================

        const wave =
          Math.sin(
            time * 0.002 +
              thread.phase
          ) *
          thread.wave;

        const controlX =
          startX +
          cos *
            thread.length *
            0.5 +
          perpendicularX *
            wave;

        const controlY =
          startY +
          sin *
            thread.length *
            0.5 +
          perpendicularY *
            wave;

        // =================================================
        // MOUSE BRIGHTNESS
        // =================================================

        const mouseBrightness =
          distance <
          mouseRadius
            ? Math.pow(
                1 -
                  distance /
                    mouseRadius,
                2.5
              )
            : 0;

        // =================================================
        // DRAW
        // =================================================

        ctx.beginPath();

        ctx.moveTo(
          startX,
          startY
        );

        ctx.quadraticCurveTo(
          controlX,
          controlY,
          endX,
          endY
        );

        // =================================================
        // COLOR
        // =================================================

        const color =
          colors[
            thread.colorIndex
          ];

        const rgbaMatch =
          color.match(
            /rgba?\(([^)]+)\)/
          );

        if (rgbaMatch) {
          const values =
            rgbaMatch[1]
              .split(",")
              .map(
                (value) =>
                  value.trim()
              );

          const r =
            values[0];

          const g =
            values[1];

          const b =
            values[2];

          const alpha =
            Math.min(
              0.30,
              thread.opacity *
                (
                  0.34 +
                  mouseBrightness *
                    0.25
                )
            );

          ctx.strokeStyle =
            `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          ctx.strokeStyle =
            color;
        }

        // =================================================
        // THICKNESS
        // =================================================

        ctx.lineWidth =
          thread.thickness +
          mouseBrightness *
            0.10;

        ctx.lineCap =
          "round";

        ctx.stroke();
      }

      // ===================================================
      // JELLY CURSOR
      // ===================================================

      if (
        mouse.x > -500 &&
        mouse.y > -500
      ) {
        const bubbleRadius =
          12;

        const points = 70;

        ctx.beginPath();

        for (
          let i = 0;
          i <= points;
          i++
        ) {
          const angle =
            (Math.PI * 2 * i) /
            points;

          const wave =
            Math.sin(
              angle * 3 +
                time * 0.0015
            ) *
              0.65 +
            Math.sin(
              angle * 5 -
                time * 0.001
            ) *
              0.3;

          const radius =
            bubbleRadius +
            wave;

          const x =
            mouse.x +
            Math.cos(
              angle
            ) *
              radius;

          const y =
            mouse.y +
            Math.sin(
              angle
            ) *
              radius;

          if (i === 0) {
            ctx.moveTo(
              x,
              y
            );
          } else {
            ctx.lineTo(
              x,
              y
            );
          }
        }

        ctx.closePath();

        const isLight =
          getTheme() ===
          "light";

        ctx.strokeStyle =
          isLight
            ? "rgba(17, 18, 20, 0.10)"
            : "rgba(247, 229, 123, 0.13)";

        ctx.lineWidth =
          0.8;

        ctx.stroke();
      }

      // ===================================================
      // LOOP
      // ===================================================

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    animationFrame =
      requestAnimationFrame(
        render
      );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      observer.disconnect();

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
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />
    </div>
  );
}