"use client";

import { ArrowUpRight, Search, Sparkles } from "lucide-react";

const topics = ["Order status", "Measurements", "Shipping", "Returns"];

export default function SupportHero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden border-b border-line-subtle">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
        <div className="mb-12 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
            Personal Fashion Platform
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-faint sm:block">
            Support / 01
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Customer support
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[.92] tracking-[-.055em] text-ink sm:text-6xl lg:text-[78px]">
              We&rsquo;re here to
              <br />
              <span className="text-primary">make it easy.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-6 text-muted sm:text-[15px]">
              Questions about your order, measurements, delivery, tailoring or
              account? Find a quick answer or talk directly with our team.
            </p>

            <div className="mt-8 max-w-xl rounded-xl border border-line bg-card p-1.5 shadow-panel">
              <div className="flex items-center">
                <Search className="ml-3 h-4 w-4 shrink-0 text-faint" />
                <input
                  aria-label="Search support"
                  placeholder="What can we help you with?"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") scrollTo("support-faq");
                  }}
                  className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-faint"
                />
                <button
                  onClick={() => scrollTo("support-faq")}
                  className="hidden rounded-lg bg-primary px-5 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--primary-contrast)] transition hover:bg-primary-hover sm:block"
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
                  className="rounded-full border border-line px-3 py-1.5 text-[10px] text-faint transition hover:border-primary/40 hover:text-ink"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-3 shadow-float">
              <div className="aspect-[1.05/1] rounded-xl border border-line-subtle bg-[radial-gradient(circle_at_65%_30%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_28%),linear-gradient(135deg,var(--surface-strong),var(--card))] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[.18em] text-faint">
                    Support desk
                  </span>
                  <span className="rounded-full border border-line px-2 py-1 text-[8px] text-faint">
                    LIVE
                  </span>
                </div>

                <div className="flex h-full flex-col justify-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_80px_color-mix(in_srgb,var(--primary)_12%,transparent)]">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-7 text-center font-semibold tracking-tight text-ink">
                    Your questions.
                    <br />
                    <span className="text-faint">Our answers.</span>
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-2 left-5 rounded-lg border border-line bg-card-elevated px-3 py-2 shadow-panel">
                <p className="text-[8px] uppercase tracking-wider text-faint">
                  Response time
                </p>
                <p className="mt-1 text-xs font-semibold text-ink">
                  Usually <span className="text-primary">&lt; 1 hour</span>
                </p>
              </div>

              <div className="absolute right-5 top-16 rounded-lg border border-line bg-card-elevated px-3 py-2 shadow-panel">
                <p className="text-[8px] uppercase tracking-wider text-faint">
                  Customer care
                </p>
                <p className="mt-1 text-xs font-semibold text-ink">Always personal.</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Orders", "Tailoring", "Delivery"].map((x, i) => (
                <button
                  key={x}
                  onClick={() => scrollTo("support-categories")}
                  className="rounded-lg border border-line-subtle bg-card px-3 py-3 text-left transition hover:border-primary/30"
                >
                  <span className="block text-[8px] text-faint">0{i + 1}</span>
                  <span className="mt-1 block text-[10px] text-muted">{x}</span>
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
            <div key={n} className="rounded-xl border border-line-subtle bg-card p-4">
              <div className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line text-[8px] text-faint">
                  {n}
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-[10px] leading-4 text-faint">{copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollTo("support-categories")}
          className="mx-auto mt-8 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-faint transition hover:text-ink"
        >
          Explore support
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}
