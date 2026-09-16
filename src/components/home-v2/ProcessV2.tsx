"use client";

import {
  ClipboardList,
  PackageCheck,
  Palette,
  Sparkles,
  UserPlus,
} from "lucide-react";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";
import { Eyebrow, V2Shell } from "./v2-parts";

const steps = [
  { icon: <UserPlus size={20} />, title: "Create Account", body: "Sign up in seconds" },
  { icon: <ClipboardList size={20} />, title: "Add Measurements", body: "Enter or get help from our guide" },
  { icon: <Palette size={20} />, title: "Choose Design", body: "Browse or share your idea" },
  { icon: <Sparkles size={20} />, title: "We Stitch", body: "Our expert tailors craft it" },
  { icon: <PackageCheck size={20} />, title: "Delivered", body: "To your doorstep, anywhere" },
];

export default function ProcessV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    const line = scope.querySelector<SVGLineElement>("[data-process-line]");
    const nodes = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-process-node]"),
    );

    if (line) {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

      ScrollTrigger.create({
        trigger: scope,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" });

          nodes.forEach((node, index) => {
            gsap.fromTo(
              node,
              { opacity: 0, y: 22, scale: 0.85 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(2)",
                delay: 0.15 + index * 0.22,
              },
            );
          });
        },
      });
    }
  }, []);

  return (
    <section id="process" className="py-16 sm:py-24">
      <V2Shell>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Simple Process</Eyebrow>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.02em] text-[var(--v2-text)] sm:text-[38px]">
              From Idea to Your Outfit
            </h2>
          </div>

          <a
            href="#process"
            className="hidden items-center gap-1.5 text-[13.5px] font-semibold text-[var(--v2-primary)] sm:inline-flex"
          >
            See How It Works →
          </a>
        </div>

        <div ref={scopeRef} className="relative">
          {/* Connecting line — desktop only */}
          <svg
            className="pointer-events-none absolute left-0 top-6 hidden w-full lg:block"
            height="4"
            preserveAspectRatio="none"
          >
            <line
              data-process-line
              x1="10%"
              y1="2"
              x2="90%"
              y2="2"
              stroke="var(--v2-primary)"
              strokeWidth="2"
              strokeDasharray="1 8"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-process-node
                className="flex flex-col items-center text-center"
              >
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full border-4 border-[var(--v2-bg)] bg-[var(--v2-primary-soft)] text-[var(--v2-primary)] shadow-[var(--v2-shadow-sm)]">
                  {step.icon}
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[var(--v2-text)] text-[9px] font-bold text-white">
                    {index + 1}
                  </span>
                </span>

                <p className="mt-3 text-[13px] font-bold text-[var(--v2-text)]">
                  {step.title}
                </p>
                <p className="mt-1 max-w-[120px] text-[11px] leading-4 text-[var(--v2-text-faint)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
