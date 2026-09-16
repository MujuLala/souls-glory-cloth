"use client";

import Link from "next/link";
import { ArrowRight, Banknote, Clock3, Globe2, Users } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import AnimatedNumber from "./AnimatedNumber";
import { Eyebrow, V2Card, V2Shell } from "./v2-parts";
import WorldMapV2 from "./WorldMapV2";

const stats = [
  { icon: <Globe2 size={16} />, value: 200, suffix: "+", label: "Countries" },
  { icon: <Users size={16} />, value: 50, suffix: "K+", label: "Happy Customers" },
];

export default function GlobalReachV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-reach-in]"), {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });
  }, []);

  return (
    <section id="reach" className="py-16 sm:py-24">
      <V2Shell>
        <div
          ref={scopeRef}
          className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10"
        >
          <div data-reach-in>
            <Eyebrow>Global Reach</Eyebrow>

            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--v2-text)] sm:text-[40px]">
              Stitching Dreams
              <br />
              Across Borders
            </h2>

            <p className="mt-4 max-w-[440px] text-[14.5px] leading-7 text-[var(--v2-text-secondary)]">
              No matter where you are, we connect you with skilled tailors,
              premium fabrics, and personalized designs — delivered to your
              doorstep.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--v2-text)] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--v2-primary)]"
            >
              Explore Global Coverage
              <ArrowRight size={16} />
            </Link>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--v2-border)] bg-white p-4"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]">
                    {stat.icon}
                  </span>
                  <p className="mt-2 text-[19px] font-extrabold text-[var(--v2-text)]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] text-[var(--v2-text-faint)]">
                    {stat.label}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl border border-[var(--v2-border)] bg-white p-4">
                <span className="grid size-8 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]">
                  <Banknote size={16} />
                </span>
                <p className="mt-2 text-[13.5px] font-bold text-[var(--v2-text)]">
                  Multiple Currencies
                </p>
                <p className="text-[11px] text-[var(--v2-text-faint)]">
                  Shop in your local currency
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--v2-border)] bg-white p-4">
                <span className="grid size-8 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]">
                  <Clock3 size={16} />
                </span>
                <p className="mt-2 text-[13.5px] font-bold text-[var(--v2-text)]">
                  24/7 Support
                </p>
                <p className="text-[11px] text-[var(--v2-text-faint)]">
                  We&rsquo;re here for you
                </p>
              </div>
            </div>
          </div>

          <div data-reach-in>
            <V2Card className="overflow-hidden p-3 sm:p-6">
              <WorldMapV2 />
            </V2Card>
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
