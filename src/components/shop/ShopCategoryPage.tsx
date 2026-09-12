"use client";

import Container from "@/components/ui/container";
import ShopHero from "./ShopHero";
import ProductCard from "./ProductCard";

import { products } from "../products/data";

const categoryData = {
  men: {
    eyebrow: "THE MEN'S EDIT",
    title: "Men's Collection",
    description:
      "Timeless tailoring, refined details, and a fit made around you.",
    categories: [
      "Shalwar Kameez",
      "Kurta",
      "Waistcoat",
      "Suits",
      "Formal",
      "Casual",
    ],
  },

  women: {
    eyebrow: "THE WOMEN'S EDIT",
    title: "Women's Collection",
    description:
      "Elegant silhouettes, beautiful fabrics, and your perfect fit.",
    categories: [
      "Shalwar Kameez",
      "2 Piece",
      "3 Piece",
      "Kurtis",
      "Formal",
      "Casual",
    ],
  },

  kids: {
    eyebrow: "THE KIDS' EDIT",
    title: "Kids Collection",
    description:
      "Comfortable, stylish and made for every little moment.",
    categories: [
      "Boys",
      "Girls",
      "0–2 Years",
      "3–5 Years",
      "6–9 Years",
      "10–14 Years",
    ],
  },

  "ready-to-wear": {
    eyebrow: "READY WHEN YOU ARE",
    title: "Ready to Wear",
    description:
      "Your style, ready when you are. Discover pieces made for effortless dressing.",
    categories: [
      "Men's",
      "Women's",
      "Kids",
      "New Arrivals",
      "Best Sellers",
      "Limited Edition",
    ],
  },
} as const;

type CategoryType = keyof typeof categoryData;

type ShopCategoryPageProps = {
  type: CategoryType;
};

export default function ShopCategoryPage({
  type,
}: ShopCategoryPageProps) {
  const data = categoryData[type];

  /*
  |--------------------------------------------------------------------------
  | Get products from CMS data.ts
  |--------------------------------------------------------------------------
  */

  const categoryProducts = products.filter((product) => {
    const category = product.category.toLowerCase();

    switch (type) {
      case "men":
        return (
          category === "men" ||
          category === "men collection"
        );

      case "women":
        return (
          category === "women" ||
          category === "women collection"
        );

      case "kids":
        return (
          category === "kids" ||
          category === "kids collection"
        );

      case "ready-to-wear":
        return (
          category === "ready to wear" ||
          category === "ready-to-wear"
        );

      default:
        return false;
    }
  });

  return (
    <main>
      {/* ============================================================
          HERO
      ============================================================ */}

      <ShopHero
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
      />

      {/* ============================================================
          PRODUCTS SECTION
      ============================================================ */}

      <section
        id="category-products"
        className="relative py-16 sm:py-20 lg:py-24"
      >
        {/* Background Grid */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <Container className="relative">
          {/* ========================================================
              SECTION HEADER
          ======================================================== */}

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
                  {categoryProducts.length}
                </span>

                <span className="block text-[8px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  Products
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              CATEGORY TAGS
          ======================================================== */}

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

          {/* ========================================================
              PRODUCTS
          ======================================================== */}

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
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