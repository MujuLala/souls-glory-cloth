"use client";

import Link from "next/link";
import { ArrowRight, Shirt, Sparkles } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import { V2Shell } from "./v2-parts";

export default function FinalCtaV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-cta-in]"), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 82%" },
    });

    gsap.to(scope.querySelectorAll("[data-cta-float]"), {
      y: -12,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.4,
    });
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <V2Shell>
        <div
          ref={scopeRef}
          className="relative overflow-hidden rounded-[32px] bg-[var(--v2-primary)] px-6 py-14 text-center sm:px-14 sm:py-16"
        >
          <span
            data-cta-float
            className="absolute left-8 top-8 hidden text-white/25 sm:block"
          >
            <Sparkles size={34} />
          </span>
          <span
            data-cta-float
            className="absolute bottom-8 right-10 hidden text-white/25 sm:block"
          >
            <Shirt size={40} />
          </span>

          <h2
            data-cta-in
            className="relative mx-auto max-w-[560px] text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[38px]"
          >
            Ready to Create Your Perfect Outfit?
          </h2>

          <p
            data-cta-in
            className="relative mx-auto mt-4 max-w-[440px] text-[14.5px] leading-6 text-white/85"
          >
            Join thousands of happy customers and experience online stitching
            the right way.
          </p>

          <div data-cta-in className="relative mt-8">
            <Link
              href="/sign-up"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 text-[14.5px] font-bold text-[var(--v2-primary)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
