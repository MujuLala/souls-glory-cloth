import Link from "next/link";
import Container from "@/components/ui/container";

const collections = [
  {
    title: "Men's Collection",
    description: "Tailored essentials and timeless traditional wear.",
    href: "/shop/men",
    count: "MEN",
  },
  {
    title: "Women's Collection",
    description: "Elegant silhouettes designed around your style.",
    href: "/shop/women",
    count: "WOMEN",
  },
  {
    title: "Kids Collection",
    description: "Comfortable styles made for little moments.",
    href: "/shop/kids",
    count: "KIDS",
  },
  {
    title: "Ready to Wear",
    description: "Effortless pieces, ready when you are.",
    href: "/shop/ready-to-wear",
    count: "READY",
  },
  {
    title: "Wedding Edit",
    description: "Refined looks for your most memorable occasions.",
    href: "/collections/wedding",
    count: "01",
  },
  {
    title: "Eid Edit",
    description: "Celebrate in beautifully crafted festive styles.",
    href: "/collections/eid",
    count: "02",
  },
  {
    title: "Formal Edit",
    description: "Sharp, sophisticated pieces for every occasion.",
    href: "/collections/formal",
    count: "03",
  },
  {
    title: "Casual Edit",
    description: "Everyday comfort with a refined finish.",
    href: "/collections/casual",
    count: "04",
  },
];

export default function CollectionsGrid() {
  return (
    <section
      id="collections"
      className="relative py-16 sm:py-20 lg:py-24"
    >
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
          {collections.map((collection) => (
            <Link
              key={collection.title}
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