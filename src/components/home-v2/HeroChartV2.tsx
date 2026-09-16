"use client";

import { Globe2, Ruler, Star } from "lucide-react";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";
import AnimatedNumber from "./AnimatedNumber";

/* =========================================================
   HERO STATS CARD

   "Growing Globally" line chart that draws itself in on
   first view and replays if the visitor scrolls away and
   back — plus a couple of small floating accents so the card
   doesn't feel static once the draw finishes.
========================================================= */

const YEARS = ["2022", "2023", "2024", "2025", "2026"];
const VALUES = [8, 19, 29, 38, 50]; // thousands of customers, matches the "50K+" headline

const CHART_W = 320;
const CHART_H = 130;
const PAD_X = 8;
const PAD_Y = 14;

function pointFor(index: number) {
  const x = PAD_X + (index / (VALUES.length - 1)) * (CHART_W - PAD_X * 2);
  const max = Math.max(...VALUES);
  const y =
    CHART_H -
    PAD_Y -
    (VALUES[index] / max) * (CHART_H - PAD_Y * 2);
  return { x, y };
}

const points = VALUES.map((_, index) => pointFor(index));
const linePath = points
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");
const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_H} L ${points[0].x} ${CHART_H} Z`;

export default function HeroChartV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    const line = scope.querySelector<SVGPathElement>("[data-chart-line]");
    const area = scope.querySelector<SVGPathElement>("[data-chart-area]");
    const dots = gsap.utils.toArray<SVGCircleElement>(
      scope.querySelectorAll("[data-chart-dot]"),
    );
    const badge = scope.querySelector("[data-chart-badge]");
    const floaters = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-float]"),
    );

    if (!line || !area) {
      return;
    }

    const length = line.getTotalLength();

    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(area, { opacity: 0 });
    gsap.set(dots, { scale: 0, transformOrigin: "center" });
    gsap.set(badge, { opacity: 0, y: 10, scale: 0.9 });

    const play = () => {
      const tl = gsap.timeline();

      tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" })
        .to(area, { opacity: 1, duration: 0.6 }, "-=0.6")
        .to(
          dots,
          { scale: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.12 },
          "-=1",
        )
        .to(
          badge,
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" },
          "-=0.2",
        );

      return tl;
    };

    ScrollTrigger.create({
      trigger: scope,
      start: "top 75%",
      onEnter: play,
      onEnterBack: play,
      onLeaveBack: () => {
        gsap.set(line, { strokeDashoffset: length });
        gsap.set(area, { opacity: 0 });
        gsap.set(dots, { scale: 0 });
        gsap.set(badge, { opacity: 0, y: 10, scale: 0.9 });
      },
    });

    /* Idle floats — subtle, continuous, independent of scroll. */
    floaters.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? -8 : 8,
        duration: 2.6 + index * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  return (
    <div
      ref={scopeRef}
      className="relative w-full max-w-[420px] rounded-[28px] border border-[var(--v2-border)] bg-white p-6 shadow-[var(--v2-shadow-lg)]"
    >
      {/* Floating accent chips */}
      <span
        data-float
        className="absolute -left-4 top-10 hidden size-10 place-items-center rounded-2xl bg-white shadow-[var(--v2-shadow-md)] sm:grid"
      >
        <Globe2 size={16} className="text-[var(--v2-primary)]" />
      </span>

      <span
        data-float
        className="absolute -right-3 bottom-16 hidden size-9 place-items-center rounded-2xl bg-[var(--v2-primary)] text-white shadow-[var(--v2-shadow-md)] sm:grid"
      >
        <Star size={14} fill="currentColor" />
      </span>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--v2-primary)]">
            Growing Globally
          </p>
          <p className="mt-2 text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[var(--v2-text)]">
            <AnimatedNumber value={50} suffix=",000+" />
          </p>
          <p className="mt-1 text-[12px] text-[var(--v2-text-faint)]">
            Happy Customers
          </p>
        </div>
      </div>

      <p className="mt-3 max-w-[220px] text-[11.5px] leading-5 text-[var(--v2-text-faint)]">
        From local shops to global fashion — we&rsquo;re stitching a better
        tomorrow.
      </p>

      {/* CHART */}
      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="v2-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--v2-primary)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--v2-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path data-chart-area d={areaPath} fill="url(#v2-area)" />

          <path
            data-chart-line
            d={linePath}
            fill="none"
            stroke="var(--v2-primary)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <circle
              key={YEARS[index]}
              data-chart-dot
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 5 : 3.5}
              fill={index === points.length - 1 ? "var(--v2-primary)" : "#ffffff"}
              stroke="var(--v2-primary)"
              strokeWidth={2}
            />
          ))}
        </svg>

        <span
          data-chart-badge
          className="absolute -top-2 right-0 rounded-full bg-[var(--v2-primary)] px-2.5 py-1 text-[10px] font-bold text-white shadow-[var(--v2-shadow-md)]"
        >
          50K+
        </span>

        <div className="mt-1.5 flex justify-between text-[9.5px] font-medium text-[var(--v2-text-faint)]">
          {YEARS.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div>

      {/* MINI STATS */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--v2-border)] pt-4">
        <MiniStat
          icon={<Globe2 size={14} />}
          value={<AnimatedNumber value={200} suffix="+" />}
          label="Countries"
        />
        <MiniStat
          icon={<Ruler size={14} />}
          value={<AnimatedNumber value={1} suffix="M+" />}
          label="Outfits Stitched"
        />
        <MiniStat
          icon={<Star size={14} />}
          value={<AnimatedNumber value={4.8} decimals={1} suffix="/5" />}
          label="Customer Rating"
        />
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="min-w-0">
      <span className="grid size-7 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]">
        {icon}
      </span>
      <p className="mt-1.5 truncate text-[13px] font-bold text-[var(--v2-text)]">
        {value}
      </p>
      <p className="truncate text-[9.5px] text-[var(--v2-text-faint)]">
        {label}
      </p>
    </div>
  );
}
