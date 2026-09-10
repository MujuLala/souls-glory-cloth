"use client";

import { ArrowRight, PackageSearch } from "lucide-react";

export default function SupportOrderHelp() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ed1b2f]/10 blur-[100px]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
              <PackageSearch className="h-4 w-4 text-[#ed1b2f]" />
            </div>
            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[.2em] text-[#ed1b2f]">
              Order assistance
            </p>
            <h2 className="mt-2 max-w-xl text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl">
              Something about your
              <br />
              order <span className="text-[#ed1b2f]">not right?</span>
            </h2>
            <p className="mt-5 max-w-md text-xs leading-6 text-white/30">
              Enter your order details and tell us what you need. We will help
              you find the right next step.
            </p>
          </div>

          <form className="rounded-xl border border-white/[0.08] bg-[#050505] p-4">
            <label className="mb-2 block text-[9px] uppercase tracking-[.16em] text-white/25">
              Order number
            </label>
            <input
              placeholder="SGC-10245"
              className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b0b] px-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#ed1b2f]/50"
            />
            <label className="mb-2 mt-4 block text-[9px] uppercase tracking-[.16em] text-white/25">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b0b] px-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#ed1b2f]/50"
            />
            <button
              type="submit"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#ed1b2f] text-[9px] font-bold uppercase tracking-[.14em] text-white transition hover:bg-[#ff3043]"
            >
              Get order help
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
