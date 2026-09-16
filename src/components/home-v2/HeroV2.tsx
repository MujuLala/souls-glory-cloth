"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import { Avatar, Eyebrow, V2Shell } from "./v2-parts";
import HeroChartV2 from "./HeroChartV2";

const AVATAR_NAMES = ["Ayesha K", "Bilal R", "Fatima N", "Omar S"];

export default function HeroV2() {
  const scopeRef = useGsapScope<HTMLDivElement>(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.5 })
      .from(
        "[data-hero-heading]",
        { opacity: 0, y: 24, duration: 0.7 },
        "-=0.25",
      )
      .from(
        "[data-hero-copy]",
        { opacity: 0, y: 18, duration: 0.6 },
        "-=0.35",
      )
      .from(
        "[data-hero-actions]",
        { opacity: 0, y: 16, duration: 0.5 },
        "-=0.3",
      )
      .from(
        "[data-hero-social]",
        { opacity: 0, y: 12, duration: 0.5 },
        "-=0.3",
      )
      .from(
        "[data-hero-chart]",
        { opacity: 0, y: 24, scale: 0.97, duration: 0.7 },
        "-=0.6",
      );
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="home-v2-glow" />

      <V2Shell className="relative z-10">
        <div ref={scopeRef} className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <div data-hero-eyebrow>
              <Eyebrow>Online Stitching, Worldwide</Eyebrow>
            </div>

            <h1
              data-hero-heading
              className="mt-5 text-[42px] font-extrabold leading-[1.04] tracking-[-0.03em] text-[var(--v2-text)] sm:text-[54px] lg:text-[58px]"
            >
              Custom Clothing
              <br />
              Made Simple.
            </h1>

            <p
              data-hero-copy
              className="mt-5 max-w-[480px] text-[15px] leading-7 text-[var(--v2-text-secondary)]"
            >
              Design, share measurements, chat with expert tailors, and get
              perfectly stitched outfits — delivered to your doorstep,
              anywhere in the world.
            </p>

            <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/custom-studio"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--v2-text)] px-6 text-[14px] font-semibold text-white shadow-[var(--v2-shadow-md)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--v2-primary)]"
              >
                Start Your Order
                <ArrowRight size={16} />
              </Link>

              <a
                href="#process"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-[var(--v2-border-strong)] bg-white px-6 text-[14px] font-semibold text-[var(--v2-text)] transition-colors hover:border-[var(--v2-primary)]/40 hover:text-[var(--v2-primary)]"
              >
                <PlayCircle size={17} />
                Watch How It Works
              </a>
            </div>

            <div data-hero-social className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                {AVATAR_NAMES.map((name) => (
                  <Avatar key={name} label={name} size={38} />
                ))}
              </div>

              <p className="text-[13px] font-semibold text-[var(--v2-text)]">
                50K+{" "}
                <span className="font-normal text-[var(--v2-text-faint)]">
                  Happy Customers Worldwide
                </span>
              </p>
            </div>
          </div>

          <div data-hero-chart className="flex justify-center lg:justify-end">
            <HeroChartV2 />
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
