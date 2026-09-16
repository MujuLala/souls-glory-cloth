"use client";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";

/* =========================================================
   STYLIZED DOTTED WORLD MAP

   A hand-built approximation, not a geographic dataset: each
   landmass is a small union of ellipses, filled with a dot
   grid. Deterministic (no Math.random) so server and client
   render identically. Hub is Pakistan, radiating out to a
   handful of destinations with animated, looping connection
   paths.
========================================================= */

const VIEW_W = 1000;
const VIEW_H = 460;
const DOT_SPACING = 15;
const DOT_R = 1.6;

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

/** Rough, stylized continent placements — not surveyed data. */
const LANDMASSES: Ellipse[] = [
  { cx: 195, cy: 130, rx: 145, ry: 92 }, // North America
  { cx: 222, cy: 205, rx: 55, ry: 38 }, // Central America
  { cx: 330, cy: 300, rx: 62, ry: 118 }, // South America
  { cx: 540, cy: 108, rx: 68, ry: 52 }, // Europe
  { cx: 538, cy: 245, rx: 82, ry: 140 }, // Africa
  { cx: 748, cy: 118, rx: 165, ry: 100 }, // Asia (main)
  { cx: 718, cy: 205, rx: 34, ry: 52 }, // India
  { cx: 815, cy: 232, rx: 58, ry: 50 }, // SE Asia
  { cx: 866, cy: 312, rx: 52, ry: 48 }, // Australia
];

function insideAnyLandmass(x: number, y: number): boolean {
  return LANDMASSES.some((land) => {
    const dx = (x - land.cx) / land.rx;
    const dy = (y - land.cy) / land.ry;
    return dx * dx + dy * dy <= 1;
  });
}

const DOTS: { x: number; y: number }[] = [];

for (let y = DOT_SPACING; y < VIEW_H; y += DOT_SPACING) {
  for (let x = DOT_SPACING; x < VIEW_W; x += DOT_SPACING) {
    if (insideAnyLandmass(x, y)) {
      DOTS.push({ x, y });
    }
  }
}

const HUB = { x: 700, y: 168, label: "Pakistan" };

const DESTINATIONS = [
  { x: 236, y: 62, label: "Canada" },
  { x: 545, y: 108, label: "UK" },
  { x: 224, y: 152, label: "USA" },
  { x: 655, y: 195, label: "UAE" },
  { x: 866, y: 312, label: "Australia" },
];

/** A gentle upward arc from the hub to a destination. */
function arcPath(to: { x: number; y: number }) {
  const midX = (HUB.x + to.x) / 2;
  const lift = Math.min(70, Math.abs(HUB.x - to.x) * 0.35);
  const midY = Math.min(HUB.y, to.y) - lift;

  return `M ${HUB.x} ${HUB.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

export default function WorldMapV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    const paths = gsap.utils.toArray<SVGPathElement>(
      scope.querySelectorAll("[data-route]"),
    );
    const pulses = gsap.utils.toArray<SVGCircleElement>(
      scope.querySelectorAll("[data-pulse]"),
    );
    const cards = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-notify]"),
    );

    /* Draw every route in on first view. */
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      ScrollTrigger.create({
        trigger: scope,
        start: "top 75%",
        once: true,
        onEnter: () =>
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.1,
            delay: index * 0.15,
            ease: "power2.inOut",
          }),
      });

      /* A little pulse of light continuously travels each
         route once it's drawn, like traffic on the line. */
      const traveler = scope.querySelector<SVGCircleElement>(
        `[data-traveler="${index}"]`,
      );

      if (traveler) {
        gsap.set(traveler, { opacity: 0 });

        gsap.to(traveler, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          opacity: 1,
          duration: 2.2,
          delay: 1.2 + index * 0.5,
          repeat: -1,
          repeatDelay: 1.4,
          ease: "power1.inOut",
        });
      }
    });

    /* Pulsing dots at the hub and every destination. */
    pulses.forEach((dot, index) => {
      gsap.to(dot, {
        scale: 1.9,
        opacity: 0,
        duration: 1.8,
        ease: "power1.out",
        repeat: -1,
        delay: index * 0.3,
        transformOrigin: "center",
      });
    });

    /* Order notification cards fade in and out on a loop. */
    cards.forEach((card, index) => {
      gsap
        .timeline({ repeat: -1, delay: 1.5 + index * 2.4, repeatDelay: 3.2 })
        .fromTo(
          card,
          { opacity: 0, y: 10, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
        )
        .to(card, { opacity: 0, y: -6, duration: 0.4, delay: 1.8 });
    });

    /* Whole map breathes very slightly. */
    gsap.to(scope.querySelector("[data-map-float]"), {
      y: -6,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={scopeRef} className="relative w-full">
      <div data-map-float className="relative w-full">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Stylized world map showing Soul's Glory Cloth's delivery network"
        >
          {DOTS.map((dot, index) => (
            <circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={DOT_R}
              fill="var(--v2-primary)"
              opacity={0.16}
            />
          ))}

          {DESTINATIONS.map((destination, index) => (
            <g key={destination.label}>
              <path
                data-route
                d={arcPath(destination)}
                fill="none"
                stroke="var(--v2-primary)"
                strokeWidth={1.6}
                strokeLinecap="round"
                opacity={0.55}
              />
              <circle
                data-traveler={index}
                r={3.5}
                fill="var(--v2-primary)"
                filter="drop-shadow(0 0 4px var(--v2-primary))"
              />
            </g>
          ))}

          {/* Destination markers */}
          {DESTINATIONS.map((destination) => (
            <g key={`${destination.label}-marker`}>
              <circle
                data-pulse
                cx={destination.x}
                cy={destination.y}
                r={6}
                fill="var(--v2-primary)"
                opacity={0.3}
              />
              <circle
                cx={destination.x}
                cy={destination.y}
                r={4}
                fill="#ffffff"
                stroke="var(--v2-primary)"
                strokeWidth={2}
              />
            </g>
          ))}

          {/* Hub marker */}
          <circle
            data-pulse
            cx={HUB.x}
            cy={HUB.y}
            r={9}
            fill="var(--v2-primary)"
            opacity={0.3}
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={6}
            fill="var(--v2-primary)"
            stroke="#ffffff"
            strokeWidth={2.5}
          />
        </svg>

        {/* Notification card, positioned near the hub */}
        <div
          data-notify
          className="absolute left-[58%] top-[18%] w-[150px] -translate-x-1/2 rounded-2xl border border-[var(--v2-border)] bg-white p-2.5 shadow-[var(--v2-shadow-md)]"
          style={{ opacity: 0 }}
        >
          <p className="text-[8.5px] font-bold uppercase tracking-wide text-[var(--v2-primary)]">
            New Order
          </p>
          <p className="mt-0.5 text-[10.5px] font-semibold text-[var(--v2-text)]">
            Toronto, Canada
          </p>
          <p className="text-[8.5px] text-[var(--v2-text-faint)]">2m ago</p>
        </div>

        <div
          data-notify
          className="absolute left-[80%] top-[52%] w-[140px] -translate-x-1/2 rounded-2xl border border-[var(--v2-border)] bg-white p-2.5 shadow-[var(--v2-shadow-md)]"
          style={{ opacity: 0 }}
        >
          <p className="text-[8.5px] font-bold uppercase tracking-wide text-[var(--v2-primary)]">
            New Order
          </p>
          <p className="mt-0.5 text-[10.5px] font-semibold text-[var(--v2-text)]">
            Dubai, UAE
          </p>
          <p className="text-[8.5px] text-[var(--v2-text-faint)]">Just now</p>
        </div>
      </div>
    </div>
  );
}
