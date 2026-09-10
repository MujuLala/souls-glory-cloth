"use client";

import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import Container from "@/components/ui/container";

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#ed1c2e]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#ed1c2e]/[0.04] blur-[120px]" />

      <Container>
        <div className="relative">
          {/* Breadcrumb / Top Line */}
          <div className="flex items-center justify-between border-b border-white/[0.06] py-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
              <Link
                href="/"
                className="text-white/35 transition-colors hover:text-white/70"
              >
                Home
              </Link>

              <span className="text-white/15">/</span>

              <span className="text-white/70">Shop</span>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.15em] text-white/25 sm:block">
              All Collections
            </span>
          </div>

          {/* Main Hero */}
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-20 lg:py-24">
            {/* Left */}
            <div>
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c2e] shadow-[0_0_10px_rgba(237,28,46,.7)]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
                  Explore the collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-4xl text-[48px] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-[64px] lg:text-[82px]">
                Find your
                <br />
                <span className="text-[#ed1c2e]">perfect style.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-xl text-[13px] leading-6 text-white/45 sm:text-sm">
                Explore every collection from Soul's Glory Cloth. Discover
                tailored essentials, signature pieces, wedding wear and
                everyday styles — all in one place.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Link
                  href="#products"
                  className="group inline-flex h-10 items-center gap-3 rounded-md bg-[#ed1c2e] px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#ff2639]"
                >
                  Shop Collection

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                    <ArrowRight
                      size={11}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>

                <Link
                  href="#filters"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-white/[0.1] bg-white/[0.025] px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  <SlidersHorizontal size={12} />

                  Filter Products
                </Link>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="relative">
              <div className="rounded-xl border border-white/[0.08] bg-[#0b0b0b]/90 p-4 backdrop-blur-xl">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">
                    Collection overview
                  </span>

                  <span className="flex items-center gap-1.5 text-[9px] text-white/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c2e]" />
                    Live
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.05] bg-white/[0.05]">
                  <div className="bg-[#0b0b0b] p-4">
                    <span className="block text-2xl font-semibold tracking-tight text-white">
                      100+
                    </span>

                    <span className="mt-1 block text-[8px] uppercase tracking-[0.15em] text-white/30">
                      Products
                    </span>
                  </div>

                  <div className="bg-[#0b0b0b] p-4">
                    <span className="block text-2xl font-semibold tracking-tight text-white">
                      08
                    </span>

                    <span className="mt-1 block text-[8px] uppercase tracking-[0.15em] text-white/30">
                      Collections
                    </span>
                  </div>

                  <div className="bg-[#0b0b0b] p-4">
                    <span className="block text-2xl font-semibold tracking-tight text-[#ed1c2e]">
                      24/7
                    </span>

                    <span className="mt-1 block text-[8px] uppercase tracking-[0.15em] text-white/30">
                      Ordering
                    </span>
                  </div>

                  <div className="bg-[#0b0b0b] p-4">
                    <span className="block text-2xl font-semibold tracking-tight text-white">
                      100%
                    </span>

                    <span className="mt-1 block text-[8px] uppercase tracking-[0.15em] text-white/30">
                      Tailored
                    </span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-3 flex items-center justify-between rounded-lg border border-[#ed1c2e]/10 bg-[#ed1c2e]/[0.04] px-3 py-2.5">
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.14em] text-[#ed1c2e]/70">
                      Current selection
                    </span>

                    <span className="mt-0.5 block text-[10px] font-medium text-white/70">
                      All products
                    </span>
                  </div>

                  <span className="text-[9px] text-white/30">
                    Browse ↓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Quick Links */}
          <div className="border-t border-white/[0.06]">
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Browse
                </span>

                <span className="h-px w-6 bg-white/10" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  "All",
                  "New Arrivals",
                  "Men",
                  "Women",
                  "Wedding",
                  "Sale",
                ].map((category, index) => (
                  <Link
                    key={category}
                    href={
                      index === 0
                        ? "/shop"
                        : `/shop?category=${encodeURIComponent(category)}`
                    }
                    className={`rounded-md border px-3 py-1.5 text-[9px] font-medium transition-all duration-300 ${
                      index === 0
                        ? "border-[#ed1c2e]/30 bg-[#ed1c2e]/10 text-[#ed1c2e]"
                        : "border-white/[0.07] bg-white/[0.02] text-white/40 hover:border-white/15 hover:bg-white/[0.05] hover:text-white/80"
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}