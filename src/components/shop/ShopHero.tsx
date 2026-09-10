"use client";

import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/container";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function ShopHero({
  eyebrow = "Explore Our Collection",
  title = "Find your perfect style.",
  description = "Explore every collection from Soul's Glory Cloth. Discover tailored essentials, signature pieces, wedding wear and everyday styles — all in one place.",
}: Props) {
  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="relative flex min-h-[70vh] overflow-hidden border-b border-[var(--border)]">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      {/* Subtle Center Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.035] blur-[120px]" />

      <Container className="relative flex w-full items-center justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center px-4 pb-20 text-center">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)] sm:text-[11px]">
              {eyebrow}
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[var(--text)] sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Paragraph */}
          <p className="mt-7 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            {description}
          </p>
        </div>
      </Container>

      {/* Scroll Down */}
      <button
        type="button"
        onClick={scrollToProducts}
        aria-label="Scroll to products"
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--primary)]">
          Explore
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/50 text-[var(--text-secondary)] backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]">
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="animate-[scrollArrow_1.6s_ease-in-out_infinite]"
          />
        </span>
      </button>

      {/* Arrow Animation */}
      <style jsx>{`
        @keyframes scrollArrow {
          0%,
          100% {
            transform: translateY(-3px);
            opacity: 0.5;
          }

          50% {
            transform: translateY(4px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}