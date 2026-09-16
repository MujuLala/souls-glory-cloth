"use client";

import { Star } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import AnimatedNumber from "./AnimatedNumber";
import { Avatar, Eyebrow, V2Card, V2Shell } from "./v2-parts";

export type TestimonialV2 = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

/* Placeholder marketing copy matching the design reference —
   swap for `testimonial` (a real approved review) once the
   store has one; see the fallback below. */
const PLACEHOLDER: TestimonialV2 = {
  name: "Ayesha Khan",
  location: "Toronto, Canada",
  quote:
    "Absolutely loved the quality and fitting. The process was so easy and the team was very helpful.",
  rating: 5,
};

const ratingBars = [38, 52, 64, 78, 92];

export default function TestimonialsV2({
  testimonial,
}: {
  testimonial?: TestimonialV2 | null;
}) {
  const featured = testimonial ?? PLACEHOLDER;

  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-testimonial-in]"), {
      opacity: 0,
      y: 22,
      duration: 0.65,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });

    gsap.from(scope.querySelectorAll("[data-rating-star]"), {
      opacity: 0,
      scale: 0.4,
      duration: 0.35,
      ease: "back.out(2.5)",
      stagger: 0.08,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });

    const bars = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-rating-bar]"),
    );

    gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });

    gsap.to(bars, {
      scaleY: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });
  }, [featured.quote]);

  return (
    <section className="py-16 sm:py-24">
      <V2Shell>
        <div
          ref={scopeRef}
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* TESTIMONIAL CARD */}
          <div data-testimonial-in>
            <Eyebrow>What Our Customers Say</Eyebrow>

            <h2 className="mt-4 text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--v2-text)] sm:text-[30px]">
              Loved Around the World
            </h2>

            <V2Card className="mt-6 p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    data-rating-star
                    size={15}
                    className={
                      index < featured.rating
                        ? "fill-[var(--v2-star)] text-[var(--v2-star)]"
                        : "text-[var(--v2-border-strong)]"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 text-[14.5px] leading-6 text-[var(--v2-text)]">
                &ldquo;{featured.quote}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Avatar label={featured.name} size={40} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-[var(--v2-text)]">
                    {featured.name}
                  </p>
                  <p className="truncate text-[11.5px] text-[var(--v2-text-faint)]">
                    {featured.location}
                  </p>
                </div>
              </div>
            </V2Card>
          </div>

          {/* TRUST PANEL */}
          <div data-testimonial-in>
            <V2Card className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--v2-text)] sm:text-[26px]">
                    Trusted by Customers
                    <br />
                    Around the World
                  </h3>

                  <div className="mt-6 flex flex-wrap items-end gap-8">
                    <div>
                      <p className="text-[34px] font-extrabold leading-none text-[var(--v2-text)]">
                        <AnimatedNumber value={4.8} decimals={1} suffix="/5" />
                      </p>
                      <p className="mt-1.5 text-[11.5px] text-[var(--v2-text-faint)]">
                        Average Rating
                      </p>
                    </div>

                    <div>
                      <p className="text-[34px] font-extrabold leading-none text-[var(--v2-primary)]">
                        <AnimatedNumber value={50} suffix="K+" />
                      </p>
                      <p className="mt-1.5 text-[11.5px] text-[var(--v2-text-faint)]">
                        Happy Customers
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated bar visualization */}
                <div className="flex h-24 shrink-0 items-end gap-2">
                  {ratingBars.map((height, index) => (
                    <span
                      key={index}
                      data-rating-bar
                      className="w-4 rounded-full bg-[var(--v2-primary)]"
                      style={{
                        height: `${height}%`,
                        opacity: 0.35 + (index / ratingBars.length) * 0.65,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-[var(--v2-border)] pt-6">
                <div className="flex -space-x-3">
                  {["Sana T", "Hamza A", "Zara M", "Bilal K"].map((name) => (
                    <Avatar key={name} label={name} size={34} tone="neutral" />
                  ))}
                </div>
                <p className="text-[12.5px] text-[var(--v2-text-secondary)]">
                  Joined by <strong className="text-[var(--v2-text)]">50K+</strong>{" "}
                  happy customers this year.
                </p>
              </div>
            </V2Card>
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
