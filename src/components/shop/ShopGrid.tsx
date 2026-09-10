"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Container from "@/components/ui/container";
import ProductCard from "./ProductCard";
import ShopFilters, {
  type ShopFiltersState,
} from "./ShopFilters";
import type { Product } from "./ShopData";

type ShopGridProps = {
  products: readonly Product[];
  filters: readonly string[];
  title?: string;
};

const MAX_PRICE = 25000;

function getCategoryFromPath(pathname: string) {
  if (pathname === "/shop") return "All";
  if (pathname.startsWith("/shop/men")) return "Men";
  if (pathname.startsWith("/shop/women")) return "Women";
  if (pathname.startsWith("/shop/kids")) return "Kids";
  if (pathname.startsWith("/shop/ready-to-wear")) {
    return "Ready to Wear";
  }

  return "All";
}

export default function ShopGrid({
  products,
  filters,
  title = "Featured Products",
}: ShopGridProps) {
  const pathname = usePathname();

  const routeCategory = useMemo(
    () => getCategoryFromPath(pathname),
    [pathname]
  );

  const [filterState, setFilterState] =
    useState<ShopFiltersState>({
      search: "",
      category: routeCategory,
      minPrice: 0,
      maxPrice: MAX_PRICE,
      tags: [],
      sizes: [],
      colors: [],
      availability: "all",
    });

  /*
   * URL/category change hone par selected category sync karo.
   *
   * IMPORTANT:
   * Yahan router.push(), router.replace(), ya window.location
   * use nahi karna.
   *
   * Isliye filters change karne se slug/URL change nahi hoga.
   */
  useEffect(() => {
    setFilterState((prev) => ({
      ...prev,
      category: routeCategory,
    }));
  }, [routeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (filterState.search.trim()) {
        const search = filterState.search.toLowerCase().trim();

        const matchesSearch =
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search) ||
          product.subcategory.toLowerCase().includes(search) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(search)
          );

        if (!matchesSearch) return false;
      }

      // Category
      if (
        filterState.category !== "All" &&
        product.category !== filterState.category
      ) {
        return false;
      }

      // Price
      if (product.price < filterState.minPrice) {
        return false;
      }

      if (product.price > filterState.maxPrice) {
        return false;
      }

      // Tags
      if (filterState.tags.length > 0) {
        const matchesTags = filterState.tags.some((tag) =>
          product.tags.includes(tag)
        );

        if (!matchesTags) return false;
      }

      // Sizes
      if (filterState.sizes.length > 0) {
        const matchesSize = filterState.sizes.some((size) =>
          product.sizes.includes(size)
        );

        if (!matchesSize) return false;
      }

      // Colors
      if (filterState.colors.length > 0) {
        const matchesColor = filterState.colors.some((color) =>
          product.colors.includes(color)
        );

        if (!matchesColor) return false;
      }

      // Availability
      if (
        filterState.availability !== "all" &&
        product.availability !== filterState.availability
      ) {
        return false;
      }

      return true;
    });
  }, [products, filterState]);

  return (
    <section
      id="products"
      className="relative border-t border-[var(--border)] py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative">

        {/* Header */}
        <div className="mb-8 border-b border-[var(--border)] pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                  Collection
                </p>
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-4xl lg:text-5xl">
                {title}
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
                Browse our complete collection and discover pieces
                designed around your style, occasion, and everyday needs.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-right">
              <span className="block text-lg font-semibold tracking-tight text-[var(--text)]">
                {filteredProducts.length}
              </span>

              <span className="block text-[8px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                Products
              </span>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Browse products
          </span>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("filters")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
            className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--text)]"
          >
            <SlidersHorizontal size={12} />
            Filters
          </button>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">

          {/* Filters */}
          <aside className="lg:block">
            <div className="sticky top-24">
              <ShopFilters
                value={filterState}
                onChange={setFilterState}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0">

            <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  Showing
                </span>

                <span className="ml-2 text-[10px] font-semibold text-[var(--text)]">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                Sort:
                <span className="ml-1 text-[var(--text)]">
                  Featured
                </span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
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
              <EmptyProducts />
            )}

          </div>
        </div>
      </Container>
    </section>
  );
}

function EmptyProducts() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/30 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-[var(--text)]">
        No products found
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-6 text-[var(--text-secondary)]">
        Try changing your filters or exploring another collection.
      </p>
    </div>
  );
}