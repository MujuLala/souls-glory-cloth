import Container from "@/components/ui/container";

export default function ShopCategoryCards({ items, title = "Shop by Category" }: { items: readonly string[]; title?: string }) {
  return (
    <section className="border-b border-[var(--border)] py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">Explore</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-3xl">{title}</h2></div></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => <a key={item} href="#products" className="group rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[var(--primary)]"><div className="mb-12 aspect-[1.15] rounded-[10px] border border-dashed border-[var(--border)] bg-[var(--surface-hover)]" /><div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--text)]"><span>{item}</span><span className="text-[var(--primary)] transition group-hover:translate-x-1">↗</span></div></a>)}
        </div>
      </Container>
    </section>
  );
}
