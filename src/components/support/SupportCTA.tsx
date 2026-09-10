"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function SupportCTA() {
  return (
    <section className="px-5 pb-8 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#E8E5DD] px-6 py-20 text-center sm:px-10 lg:py-28">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BB9563]/20" />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <Sparkles className="h-5 w-5 text-[#BB9563]" />
          </div>

          <span className="mt-6 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#BB9563]">
            Soul's Glory Cloth
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            We're here to make
            <br />
            <span className="italic text-[#BB9563]">every detail right.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#1D4338]/55">
            From choosing the right fabric to achieving the perfect fit, our
            team is here to make your experience exceptional.
          </p>

          <a
            href="#contact-support"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1D4338] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#16352d]"
          >
            Talk to Our Team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}