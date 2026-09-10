"use client";

import { ArrowUpRight, Search, Sparkles } from "lucide-react";

const topics = ["Order status", "Measurements", "Shipping", "Returns"];

export default function SupportHero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden border-b border-white/[0.07]">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#ed1b2f]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
        <div className="mb-12 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ed1b2f] shadow-[0_0_10px_#ed1b2f]" />
            Personal Fashion Platform
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/25 sm:block">
            Support / 01
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ed1b2f]">
              Customer support
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-6xl lg:text-[78px]">
              We’re here to
              <br />
              <span className="text-[#ed1b2f]">make it easy.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-6 text-white/45 sm:text-[15px]">
              Questions about your order, measurements, delivery, tailoring or
              account? Find a quick answer or talk directly with our team.
            </p>

            <div className="mt-8 max-w-xl rounded-xl border border-white/10 bg-[#0b0b0b] p-1.5 shadow-[0_20px_80px_rgba(0,0,0,.35)]">
              <div className="flex items-center">
                <Search className="ml-3 h-4 w-4 shrink-0 text-white/25" />
                <input
                  aria-label="Search support"
                  placeholder="What can we help you with?"
                  className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25"
                />
                <button
                  onClick={() => scrollTo("support-faq")}
                  className="hidden rounded-lg bg-[#ed1b2f] px-5 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-white transition hover:bg-[#ff3043] sm:block"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => scrollTo("support-faq")}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/40 transition hover:border-[#ed1b2f]/40 hover:text-white/75"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-3 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
              <div className="aspect-[1.05/1] rounded-xl border border-white/[0.07] bg-[radial-gradient(circle_at_65%_30%,rgba(237,27,47,.18),transparent_28%),linear-gradient(135deg,#111,#070707)] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[.18em] text-white/35">
                    Support desk
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[8px] text-white/35">
                    LIVE
                  </span>
                </div>

                <div className="flex h-full flex-col justify-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#ed1b2f]/30 bg-[#ed1b2f]/10 shadow-[0_0_80px_rgba(237,27,47,.12)]">
                    <Sparkles className="h-8 w-8 text-[#ed1b2f]" />
                  </div>
                  <p className="mt-7 text-center font-semibold tracking-tight">
                    Your questions.
                    <br />
                    <span className="text-white/35">Our answers.</span>
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-2 left-5 rounded-lg border border-white/10 bg-[#111] px-3 py-2 shadow-xl">
                <p className="text-[8px] uppercase tracking-wider text-white/30">
                  Response time
                </p>
                <p className="mt-1 text-xs font-semibold">
                  Usually <span className="text-[#ed1b2f]">&lt; 1 hour</span>
                </p>
              </div>

              <div className="absolute right-5 top-16 rounded-lg border border-white/10 bg-[#111] px-3 py-2 shadow-xl">
                <p className="text-[8px] uppercase tracking-wider text-white/30">
                  Customer care
                </p>
                <p className="mt-1 text-xs font-semibold">Always personal.</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Orders", "Tailoring", "Delivery"].map((x, i) => (
                <button
                  key={x}
                  onClick={() => scrollTo("support-categories")}
                  className="rounded-lg border border-white/[0.08] bg-[#0b0b0b] px-3 py-3 text-left transition hover:border-[#ed1b2f]/30"
                >
                  <span className="block text-[8px] text-white/20">0{i + 1}</span>
                  <span className="mt-1 block text-[10px] text-white/60">{x}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-2 sm:grid-cols-3">
          {[
            ["01", "Find your answer", "Browse common questions and helpful guides."],
            ["02", "Get order help", "Check an order or ask our team for assistance."],
            ["03", "Talk to a person", "Reach us directly when you need a human touch."],
          ].map(([n, title, copy]) => (
            <div key={n} className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-4">
              <div className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-[8px] text-white/35">
                  {n}
                </span>
                <div>
                  <h3 className="text-xs font-semibold">{title}</h3>
                  <p className="mt-1 text-[10px] leading-4 text-white/30">{copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollTo("support-categories")}
          className="mx-auto mt-8 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-white/25 transition hover:text-white/60"
        >
          Explore support
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}
