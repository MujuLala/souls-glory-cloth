"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock, Ruler } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import { Eyebrow, V2Card, V2Shell } from "./v2-parts";
import MeasurementFigureV2 from "./MeasurementFigureV2";

const inchValues: Record<string, number> = {
  Shoulder: 14,
  Bust: 36,
  Waist: 30,
  Hips: 38,
  Sleeve: 22,
  Length: 56,
};

export default function MeasurementsV2() {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-measure-in]"), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <V2Shell>
        <V2Card className="overflow-hidden p-6 sm:p-10 lg:p-14">
          <div
            ref={scopeRef}
            className="grid items-center gap-10 lg:grid-cols-[0.9fr_0.75fr_0.85fr] lg:gap-8"
          >
            <div data-measure-in>
              <Eyebrow>Measure With Confidence</Eyebrow>

              <h2 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--v2-text)] sm:text-[36px]">
                Perfect Fit
                <br />
                Every Time
              </h2>

              <p className="mt-4 max-w-[380px] text-[14px] leading-6 text-[var(--v2-text-secondary)]">
                Accurate measurements ensure a better fit and a more
                comfortable wearing experience.
              </p>

              <Link
                href="/account/measurements"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--v2-primary)] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--v2-primary-dark)]"
              >
                Add Measurements
                <ArrowRight size={16} />
              </Link>

              <p className="mt-5 flex items-center gap-2 text-[12px] font-medium text-[var(--v2-text-faint)]">
                <Lock size={13} />
                Secure &amp; Private — your data is always safe.
              </p>
            </div>

            <div data-measure-in className="flex justify-center">
              <MeasurementFigureV2 />
            </div>

            <div data-measure-in>
              <div className="rounded-3xl border border-[var(--v2-border)] bg-[var(--v2-bg-soft)] p-5">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-[var(--v2-text)]">
                    <Ruler size={15} className="text-[var(--v2-primary)]" />
                    Your Measurements
                  </p>

                  <div className="flex rounded-full border border-[var(--v2-border-strong)] bg-white p-0.5 text-[10.5px] font-semibold">
                    {(["in", "cm"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setUnit(option)}
                        aria-pressed={unit === option}
                        className={`rounded-full px-2.5 py-1 transition-colors ${
                          unit === option
                            ? "bg-[var(--v2-primary)] text-white"
                            : "text-[var(--v2-text-faint)]"
                        }`}
                      >
                        {option === "in" ? "Inches" : "CM"}
                      </button>
                    ))}
                  </div>
                </div>

                <dl className="mt-4 space-y-2.5">
                  {Object.entries(inchValues).map(([label, inches]) => {
                    const value = unit === "in" ? inches : Math.round(inches * 2.54);

                    return (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-[var(--v2-border)] pb-2 text-[12.5px] last:border-0 last:pb-0"
                      >
                        <dt className="text-[var(--v2-text-secondary)]">{label}</dt>
                        <dd className="font-bold text-[var(--v2-text)]">
                          {value}
                          <span className="ml-1 font-normal text-[var(--v2-text-faint)]">
                            {unit}
                          </span>
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <Link
                  href="/support#support-order-help"
                  className="mt-5 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[var(--v2-text)] text-[12.5px] font-semibold text-white transition-colors hover:bg-[var(--v2-primary)]"
                >
                  View Size Guide
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </V2Card>
      </V2Shell>
    </section>
  );
}
