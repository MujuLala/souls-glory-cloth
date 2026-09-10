import Link from "next/link";
import Container from "@/components/ui/container";

export default function CollectionsCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.04] blur-[100px]" />

      <Container className="relative">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center sm:px-10 lg:px-16">

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Find Your Style
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            Your next favorite piece is waiting.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            Explore the complete collection and discover something
            made for you.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center rounded-full bg-[var(--primary)] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(237,28,46,.2)]"
          >
            Explore All Products
          </Link>

        </div>
      </Container>
    </section>
  );
}