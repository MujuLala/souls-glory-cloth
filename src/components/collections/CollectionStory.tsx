import Container from "@/components/ui/container";

export default function CollectionStory() {
  return (
    <section className="relative border-y border-[var(--border)] py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                Our Philosophy
              </span>
            </div>

            <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--text)] sm:text-5xl">
              Designed with intention.
              <br />
              Made to feel yours.
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              Every Soul's Glory collection brings together thoughtful
              design, carefully selected fabrics, and details that make
              each piece feel personal.
            </p>

            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              From everyday essentials to statement occasion wear,
              our collections are designed to move with your lifestyle
              while keeping the character of traditional craftsmanship.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}