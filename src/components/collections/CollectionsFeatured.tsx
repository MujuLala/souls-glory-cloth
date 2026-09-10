import Link from "next/link";
import Container from "@/components/ui/container";

const featured = [
  {
    eyebrow: "SIGNATURE",
    title: "The Heritage Edit",
    description:
      "Classic silhouettes, refined fabrics, and timeless Pakistani craftsmanship.",
    href: "/collections/heritage",
  },
  {
    eyebrow: "SEASONAL",
    title: "Festive Collection",
    description:
      "Statement pieces created for celebrations, gatherings, and unforgettable moments.",
    href: "/collections/festive",
  },
];

export default function CollectionsFeatured() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Featured
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-4xl lg:text-5xl">
            Collections worth exploring
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--text)_1px,transparent_1px),linear-gradient(90deg,var(--text)_1px,transparent_1px)] [background-size:44px_44px]" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--primary)]">
                  {item.eyebrow}
                </span>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-md text-xs leading-6 text-white/50">
                  {item.description}
                </p>

                <span className="mt-6 inline-flex text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors group-hover:text-[var(--primary)]">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}