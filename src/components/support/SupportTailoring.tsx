import { ArrowUpRight, Ruler, Check } from "lucide-react";

const points = [
  "Measurement guidance",
  "Fit recommendations",
  "Size assistance",
  "Tailoring questions",
];

export default function SupportTailoring() {
  return (
    <section className="border-y border-line-subtle bg-bg-secondary">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-line-subtle bg-card p-5">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line-subtle bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_25%),linear-gradient(145deg,var(--surface-strong),var(--card))]">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/30">
                <div className="absolute inset-3 rounded-full border border-line" />
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-7 text-center text-sm font-semibold text-ink">
                Your fit,
                <br />
                <span className="text-faint">your way.</span>
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[.18em] text-faint">
            <span>Personal tailoring</span>
            <span>01 — 04</span>
          </div>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-primary">
            Measurements & tailoring
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-none tracking-[-.05em] text-ink sm:text-5xl lg:text-6xl">
            Not sure about your
            <br />
            <span className="text-primary">measurements?</span>
          </h2>
          <p className="mt-6 max-w-xl text-xs leading-6 text-faint sm:text-sm">
            A great garment starts with accurate measurements. We can guide you
            through the process, help you understand the right measurements,
            and make sure your tailored experience stays simple.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 rounded-lg border border-line-subtle bg-card px-3 py-3"
              >
                <Check className="h-3 w-3 text-primary" />
                <span className="text-[10px] text-muted">{point}</span>
              </div>
            ))}
          </div>

          <a
            href="#support-contact"
            className="mt-7 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-[9px] font-bold uppercase tracking-[.14em] text-ink transition hover:border-primary/40 hover:text-primary"
          >
            Get measurement help
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
