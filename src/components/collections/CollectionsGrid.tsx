import Link from "next/link";
import Container from "@/components/ui/container";

export type CollectionsGridItem = {
  title: string;
  description: string;
  href: string;
  count: string;
};

export default function CollectionsGrid({
  items,
}: {
  items: CollectionsGridItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="collections" className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Explore
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-4xl lg:text-5xl">
            Every style, one place
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((collection) => (
            <Link
              key={collection.href}
              href={collection.href}
              className="group relative min-h-[240px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40"
            >
              <div className="absolute right-5 top-5 text-[9px] tracking-[0.15em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--primary)]">
                {collection.count}
              </div>

              <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(var(--text)_1px,transparent_1px),linear-gradient(90deg,var(--text)_1px,transparent_1px)] [background-size:40px_40px]" />

              <div className="relative flex h-full flex-col justify-end">
                <div className="mb-5 h-8 w-8 rounded-full border border-[var(--border)] transition-colors group-hover:border-[var(--primary)]" />

                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text)]">
                  {collection.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                  {collection.description}
                </p>

                <span className="mt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--primary)]">
                  View Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
