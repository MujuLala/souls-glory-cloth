"use client";

import { CreditCard, Globe2, Scissors, Sparkles } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import { V2Shell } from "./v2-parts";

const features = [
  {
    icon: <Sparkles size={20} />,
    title: "Premium Fabrics",
    body: "Trusted quality",
  },
  {
    icon: <Scissors size={20} />,
    title: "Custom Stitching",
    body: "Made for you",
  },
  {
    icon: <Globe2 size={20} />,
    title: "Worldwide Delivery",
    body: "To 200+ countries",
  },
  {
    icon: <CreditCard size={20} />,
    title: "Secure Payments",
    body: "Shop with confidence",
  },
];

export default function FeatureStripV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-feature-item]"), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 85%" },
    });
  }, []);

  return (
    <section className="border-y border-[var(--v2-border)] bg-white/60 py-10">
      <V2Shell>
        <div
          ref={scopeRef}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              data-feature-item
              className="group flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-3.5 sm:text-left"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--v2-primary)] group-hover:text-white">
                {feature.icon}
              </span>

              <div>
                <p className="text-[13.5px] font-bold text-[var(--v2-text)]">
                  {feature.title}
                </p>
                <p className="text-[11.5px] text-[var(--v2-text-faint)]">
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </V2Shell>
    </section>
  );
}
