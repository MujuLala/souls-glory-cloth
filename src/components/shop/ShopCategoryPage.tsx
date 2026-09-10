"use client";

import { usePathname } from "next/navigation";

import Container from "@/components/ui/container";
import ShopHero from "./ShopHero";
import ProductCard from "./ProductCard";
import { categoryData } from "./ShopData";

type CategoryType = keyof typeof categoryData;

type ShopCategoryPageProps = {
  type: CategoryType;
};

export default function ShopCategoryPage({
  type,
}: ShopCategoryPageProps) {
  const pathname = usePathname();
  const data = categoryData[type];

  return (
    <main>
      <ShopHero
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
      />

      <section
  id="category-products"
  className="relative py-16 sm:py-20 lg:py-24"
>
  {/* Background grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.025]"
    style={{
      backgroundImage:
        "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
      backgroundSize: "56px 56px",
    }}
  />

  <Container className="relative">

    {/* Section Header */}
    <div className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              Collection
            </p>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>

          <p className="mt-3 max-w-xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
            {data.description}
          </p>
        </div>

        {/* Product Count */}
        <div className="shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-right">
          <span className="block text-lg font-semibold tracking-tight text-[var(--text)]">
            {data.products.length}
          </span>

          <span className="block text-[8px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Products
          </span>
        </div>

      </div>
    </div>

    {/* Category Tags */}
    <div className="mb-8 flex flex-wrap gap-2">
      {data.categories.map((category) => (
        <span
          key={category}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.08em] text-[var(--text-secondary)]"
        >
          {category}
        </span>
      ))}
    </div>

    {/* 4 Products Per Row */}
    {data.products.length > 0 ? (
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 xl:grid-cols-4">
        {data.products.map((product, index) => (
          <ProductCard
            key={
              product.id ||
              product.slug ||
              `${product.name}-${index}`
            }
            product={product}
          />
        ))}
      </div>
    ) : (
      <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)]">
        <p className="text-sm text-[var(--text-secondary)]">
          No products available.
        </p>
      </div>
    )}

  </Container>
</section> 
    </main>
  );
}