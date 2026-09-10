"use client";

import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/container";

export default function CollectionsHero() {
  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-[var(--border)]">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />

      {/* Center Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.035] blur-[130px]" />

      {/* Decorative Lines */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-transparent lg:block" />

      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-transparent lg:block" />

      <Container className="relative w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-24 text-center sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">

          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--primary)] sm:text-[10px]">
              THE SOUL'S GLORY EDIT
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text)] sm:text-6xl md:text-7xl lg:text-[88px]">
            Our
            <span className="text-[var(--primary)]"> Collections</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            Discover thoughtfully curated collections designed for every
            occasion, season, and expression of your personal style.
          </p>

          {/* Small Meta */}
          <div className="mt-8 flex items-center gap-4 text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            <span>Crafted With Purpose</span>

            <span className="h-1 w-1 rounded-full bg-[var(--primary)]" />

            <span>Made For You</span>
          </div>
        </div>
      </Container>

      {/* Explore Button */}
      <button
        type="button"
        onClick={scrollToCollections}
        aria-label="Explore collections"
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--primary)]">
          Explore
        </span>

        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/60 text-[var(--text-secondary)] backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]">
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="animate-collection-arrow"
          />
        </span>
      </button>

      <style jsx>{`
        @keyframes collectionArrow {
          0%,
          100% {
            transform: translateY(-3px);
            opacity: 0.45;
          }

          50% {
            transform: translateY(4px);
            opacity: 1;
          }
        }

        .animate-collection-arrow {
          animation: collectionArrow 1.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}