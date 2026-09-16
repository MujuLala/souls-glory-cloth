"use client";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";

/* =========================================================
   MEASUREMENT FIGURE

   A custom vector illustration — no photo/stock asset exists
   in the project to reuse. Built as layered flat shapes with
   gradient shading and a soft ground shadow for a dimensional
   "2.5D" look, in the page's blue theme (dress) plus natural
   skin/hair tones (so it reads as a person, not a blueprint).
   Animated with GSAP: natural blinking, a very subtle
   breathing rise/fall, gentle hair sway, a soft shimmer across
   the dress, and the measurement guide lines drawing in with
   their labels once the section scrolls into view.
========================================================= */

const guides = [
  { key: "shoulder", label: "Shoulder", y: 132, x2: 275, side: "right" as const },
  { key: "bust", label: "Bust", y: 182, x2: 275, side: "right" as const },
  { key: "waist", label: "Waist", y: 232, x2: 275, side: "right" as const },
  { key: "hips", label: "Hips", y: 272, x2: 275, side: "right" as const },
  { key: "sleeve", label: "Sleeve Length", y: 210, x2: 25, side: "left" as const },
  { key: "arm", label: "Arm", y: 165, x2: 25, side: "left" as const },
];

export default function MeasurementFigureV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    /* Natural, irregular blinking — not a metronome. */
    const eyes = scope.querySelector<SVGGElement>("[data-eyes]");

    const blink = () => {
      gsap.to(eyes, {
        scaleY: 0.08,
        duration: 0.09,
        transformOrigin: "center",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(2.4 + Math.random() * 3.2, blink);
        },
      });
    };

    gsap.delayedCall(1.6, blink);

    /* Subtle breathing — the whole upper body rises a touch. */
    gsap.to("[data-torso]", {
      y: -2.5,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    /* Hair strands sway independently, very slightly. */
    gsap.utils
      .toArray<SVGPathElement>(scope.querySelectorAll("[data-hair]"))
      .forEach((strand, index) => {
        gsap.to(strand, {
          rotation: index % 2 === 0 ? 1.4 : -1.4,
          transformOrigin: "top center",
          duration: 2.8 + index * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    /* A soft light sweeps across the dress on a loop, like a
       glossy fabric catching the light — sells the "3D" feel
       without any actual 3D rendering. */
    gsap.fromTo(
      "[data-shimmer]",
      { xPercent: -140 },
      {
        xPercent: 140,
        duration: 3.2,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 2.2,
      },
    );

    /* Ground shadow breathes with the body for a grounded,
       dimensional feel rather than a flat cutout. */
    gsap.to("[data-ground-shadow]", {
      scaleX: 1.06,
      opacity: 0.85,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "center",
    });

    /* Measurement guides draw in, staggered, once visible. */
    const lines = gsap.utils.toArray<SVGLineElement>(
      scope.querySelectorAll("[data-guide-line]"),
    );
    const labels = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-guide-label]"),
    );

    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap.set(labels, { opacity: 0, x: 0 });

    ScrollTrigger.create({
      trigger: scope,
      start: "top 70%",
      once: true,
      onEnter: () => {
        lines.forEach((line, index) => {
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power2.out",
          });
        });

        labels.forEach((label, index) => {
          const fromRight = label.dataset.side === "left";

          gsap.fromTo(
            label,
            { opacity: 0, x: fromRight ? -10 : 10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.25 + index * 0.12,
              ease: "power2.out",
            },
          );
        });
      },
    });
  }, []);

  return (
    <div ref={scopeRef} className="relative mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 300 520" className="w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="v2fig-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fce3cc" />
            <stop offset="100%" stopColor="#e8b98e" />
          </linearGradient>

          <linearGradient id="v2fig-hair" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#4a3527" />
            <stop offset="100%" stopColor="#231710" />
          </linearGradient>

          <linearGradient id="v2fig-bodice" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--v2-primary-light)" />
            <stop offset="100%" stopColor="var(--v2-primary-dark)" />
          </linearGradient>

          <linearGradient id="v2fig-skirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--v2-primary)" />
            <stop offset="100%" stopColor="var(--v2-primary-dark)" />
          </linearGradient>

          <radialGradient id="v2fig-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--v2-text)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--v2-text)" stopOpacity="0" />
          </radialGradient>

          <clipPath id="v2fig-skirt-clip">
            <path d="M96 230 Q150 246 204 230 L236 428 Q150 452 64 428 Z" />
          </clipPath>
        </defs>

        {/* Measurement guide lines, drawn behind the figure */}
        {guides.map((guide) => (
          <line
            key={guide.key}
            data-guide-line
            x1={guide.side === "right" ? 212 : 88}
            y1={guide.y}
            x2={guide.x2}
            y2={guide.y}
            stroke="var(--v2-primary)"
            strokeWidth={1}
            strokeDasharray="3 4"
            opacity={0.5}
          />
        ))}

        {/* Ground shadow — grounds the figure, reads as depth */}
        <ellipse
          data-ground-shadow
          cx="150"
          cy="506"
          rx="58"
          ry="10"
          fill="url(#v2fig-shadow)"
        />

        {/* ================= FIGURE ================= */}

        {/* Hair — back layer, behind shoulders */}
        <path
          data-hair
          d="M104 60 Q94 14 150 10 Q206 14 196 60 Q204 96 186 132 Q182 100 176 88 Q150 100 124 88 Q118 100 114 132 Q96 96 104 60 Z"
          fill="url(#v2fig-hair)"
        />

        {/* Bun with a small highlight for shine */}
        <circle cx="150" cy="16" r="14" fill="url(#v2fig-hair)" />
        <circle cx="145" cy="11" r="4" fill="#6b4d38" opacity={0.6} />

        {/* Neck (behind head) */}
        <path
          d="M136 96 Q150 108 164 96 L166 122 Q150 132 134 122 Z"
          fill="url(#v2fig-skin)"
        />

        <g data-torso>
          {/* Arms */}
          <path
            d="M110 140 Q80 152 70 208 Q66 234 76 258"
            stroke="url(#v2fig-bodice)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M190 140 Q220 152 230 208 Q234 234 224 258"
            stroke="url(#v2fig-bodice)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />

          {/* Wrist cuffs — a small polish detail */}
          <circle cx="76" cy="252" r="7" fill="var(--v2-primary-dark)" opacity={0.5} />
          <circle cx="224" cy="252" r="7" fill="var(--v2-primary-dark)" opacity={0.5} />

          {/* Hands */}
          <circle cx="76" cy="264" r="9.5" fill="url(#v2fig-skin)" />
          <circle cx="224" cy="264" r="9.5" fill="url(#v2fig-skin)" />

          {/* Bodice */}
          <path
            d="M112 128 Q150 140 188 128 L200 234 Q150 248 100 234 Z"
            fill="url(#v2fig-bodice)"
          />

          {/* Waist sash — a bit of definition at the waist */}
          <path
            d="M104 222 Q150 234 196 222 L200 234 Q150 248 100 234 Z"
            fill="var(--v2-primary-dark)"
            opacity={0.4}
          />

          {/* Head (drawn after neck/bodice so it sits on top) */}
          <ellipse cx="150" cy="66" rx="32" ry="36" fill="url(#v2fig-skin)" />

          {/* Ears */}
          <ellipse cx="118" cy="68" rx="4.5" ry="7" fill="url(#v2fig-skin)" />
          <ellipse cx="182" cy="68" rx="4.5" ry="7" fill="url(#v2fig-skin)" />

          {/* Front hair — bangs, drawn over the forehead */}
          <path
            data-hair
            d="M118 52 Q150 30 182 52 Q180 40 150 36 Q120 40 118 52 Z"
            fill="url(#v2fig-hair)"
          />

          {/* Brows */}
          <path d="M129 60 Q137 56 145 59" stroke="#5b4230" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M155 59 Q163 56 171 60" stroke="#5b4230" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <g data-eyes>
            <ellipse cx="137" cy="68" rx="4" ry="5" fill="#2b1c14" />
            <ellipse cx="163" cy="68" rx="4" ry="5" fill="#2b1c14" />
            <circle cx="138.5" cy="66.5" r="1.2" fill="#ffffff" />
            <circle cx="164.5" cy="66.5" r="1.2" fill="#ffffff" />
          </g>

          {/* Blush */}
          <ellipse cx="128" cy="80" rx="6" ry="3.5" fill="#f2a488" opacity={0.45} />
          <ellipse cx="172" cy="80" rx="6" ry="3.5" fill="#f2a488" opacity={0.45} />

          {/* Nose + smile */}
          <path d="M150 70 L148 78 Q150 80 152 78" stroke="#c98a63" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M141 87 Q150 92 159 87" stroke="#8a4a3a" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Skirt, with a soft light sweep for shine */}
          <g clipPath="url(#v2fig-skirt-clip)">
            <path
              d="M96 230 Q150 246 204 230 L236 428 Q150 452 64 428 Z"
              fill="url(#v2fig-skirt)"
            />
            {/* fold shading */}
            <path d="M150 236 L134 428" stroke="var(--v2-text)" strokeOpacity="0.08" strokeWidth="10" />
            <path d="M150 236 L168 428" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="10" />
            <rect
              data-shimmer
              x="-40"
              y="220"
              width="60"
              height="240"
              fill="#ffffff"
              opacity={0.22}
              transform="skewX(-16)"
            />
          </g>
        </g>

        {/* Legs */}
        <rect x="130" y="428" width="13" height="70" rx="6" fill="url(#v2fig-skin)" />
        <rect x="157" y="428" width="13" height="70" rx="6" fill="url(#v2fig-skin)" />

        {/* Shoes */}
        <path d="M124 496 Q135 490 148 496 L148 502 L122 502 Z" fill="var(--v2-text)" />
        <path d="M152 496 Q163 490 176 496 L176 502 L152 502 Z" fill="var(--v2-text)" />
      </svg>

      {/* Labels, positioned to match each guide line */}
      {guides.map((guide) => (
        <span
          key={guide.key}
          data-guide-label
          data-side={guide.side}
          className={`absolute whitespace-nowrap text-[10.5px] font-semibold text-[var(--v2-primary-dark)] ${
            guide.side === "right" ? "left-[92%]" : "right-[92%] text-right"
          }`}
          style={{ top: `${(guide.y / 520) * 100}%`, transform: "translateY(-50%)" }}
        >
          {guide.label}
        </span>
      ))}
    </div>
  );
}
