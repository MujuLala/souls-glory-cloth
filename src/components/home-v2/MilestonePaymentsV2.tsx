"use client";

import { CheckCircle2, Hammer, ShieldCheck, Wallet } from "lucide-react";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";
import { Eyebrow, V2Shell } from "./v2-parts";

const milestones = [
  {
    icon: <Wallet size={20} />,
    title: "Initial Payment",
    body: "Secure your order",
  },
  {
    icon: <Hammer size={20} />,
    title: "In Progress",
    body: "Pay as work proceeds",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Final Payment",
    body: "Release after delivery",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Safe & Secure",
    body: "Your funds are protected until you're satisfied",
  },
];

export default function MilestonePaymentsV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    const line = scope.querySelector<SVGLineElement>("[data-milestone-line]");
    const nodes = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-milestone-node]"),
    );

    if (line) {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

      ScrollTrigger.create({
        trigger: scope,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(line, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" });

          nodes.forEach((node, index) => {
            gsap.fromTo(
              node,
              { opacity: 0, y: 18, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.9)",
                delay: 0.2 + index * 0.18,
              },
            );
          });
        },
      });
    }

    /* The shield on the final card floats/pulses continuously. */
    gsap.to("[data-shield]", {
      scale: 1.1,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <section id="milestones" className="py-16 sm:py-24">
      <V2Shell>
        <div className="mb-12 text-center">
          <Eyebrow>Pay With Confidence</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[420px] text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--v2-text)] sm:text-[38px]">
            Milestone Payments
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-6 text-[var(--v2-text-secondary)]">
            Your money is safe. Payments are released step by step, so
            you&rsquo;re always in control.
          </p>
        </div>

        <div ref={scopeRef} className="relative">
          <svg
            className="pointer-events-none absolute left-0 top-9 hidden w-full lg:block"
            height="4"
            preserveAspectRatio="none"
          >
            <line
              data-milestone-line
              x1="12%"
              y1="2"
              x2="88%"
              y2="2"
              stroke="var(--v2-primary)"
              strokeWidth="2"
              strokeDasharray="1 8"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {milestones.map((milestone, index) => {
              const isLast = index === milestones.length - 1;

              return (
                <div
                  key={milestone.title}
                  data-milestone-node
                  className="rounded-3xl border border-[var(--v2-border)] bg-white p-5 text-center shadow-[var(--v2-shadow-sm)]"
                >
                  <span
                    data-shield={isLast ? true : undefined}
                    className={`mx-auto grid size-16 place-items-center rounded-full border-4 border-[var(--v2-bg)] ${
                      isLast
                        ? "bg-[var(--v2-primary)] text-white"
                        : "bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]"
                    }`}
                  >
                    {milestone.icon}
                  </span>

                  <p className="mt-3 text-[13.5px] font-bold text-[var(--v2-text)]">
                    {milestone.title}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-4 text-[var(--v2-text-faint)]">
                    {milestone.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
