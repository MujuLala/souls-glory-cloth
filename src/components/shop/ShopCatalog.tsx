"use client";

import { useMemo, useState } from "react";
import { PackageSearch, SlidersHorizontal, X } from "lucide-react";

import Button from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import EmptyState from "@/components/ui/empty-state";
import { Select } from "@/components/ui/field";
import ProductCard from "./ProductCard";
import ShopFilters, {
  defaultFilters,
  type ShopFiltersState,
} from "./ShopFilters";
import type { ShopFacets } from "@/data/storefront";
import type { StorefrontProduct } from "@/types/catalog";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Best rated" },
];

/* =========================================================
   SHOP CATALOGUE

   Filtering happens in the browser over the page's products,
   so changing a filter is instant and never re-fetches.
========================================================= */

export default function ShopCatalog({
  products,
  facets,
  title = "All pieces",
}: {
  products: StorefrontProduct[];
  facets: ShopFacets;
  title?: string;
}) {
  const [filters, setFilters] = useState<ShopFiltersState>(
    defaultFilters(facets),
  );
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (
        term &&
        !`${product.name} ${product.category ?? ""} ${product.tags.join(" ")}`
          .toLowerCase()
          .includes(term)
      ) {
        return false;
      }

      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      if ((product.salePrice ?? product.price) > filters.maxPrice) {
        return false;
      }

      if (filters.availability === "in-stock" && !product.inStock) {
        return false;
      }

      if (filters.availability === "on-sale" && !product.salePrice) {
        return false;
      }

      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      if (
        filters.colors.length > 0 &&
        !filters.colors.some((color) => product.colors.includes(color))
      ) {
        return false;
      }

      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => product.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });

    const priceOf = (product: StorefrontProduct) =>
      product.salePrice ?? product.price;

    switch (sort) {
      case "price-low":
        return [...filtered].sort((a, b) => priceOf(a) - priceOf(b));
      case "price-high":
        return [...filtered].sort((a, b) => priceOf(b) - priceOf(a));
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [products, filters, sort]);

  const activeCount =
    filters.sizes.length +
    filters.colors.length +
    filters.tags.length +
    (filters.category !== "All" ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
      {/* ===================================================
          DESKTOP FILTERS
      =================================================== */}

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <ShopFilters
            value={filters}
            onChange={setFilters}
            facets={facets}
          />
        </div>
      </aside>

      {/* ===================================================
          RESULTS
      =================================================== */}

      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>

            <p className="mt-0.5 text-[11px] text-faint">
              {visible.length} of {products.length} piece
              {products.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeCount > 0 && (
                <span className="grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-[var(--primary-contrast)]">
                  {activeCount}
                </span>
              )}
            </Button>

            <Select
              value={sort}
              onChange={setSort}
              className="h-9 w-[168px] text-xs"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card">
            <EmptyState
              icon={<PackageSearch size={20} />}
              title="Nothing matches those filters"
              description="Try widening the price range or clearing a filter."
              action={
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setFilters(defaultFilters(facets))}
                >
                  Reset filters
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ===================================================
          MOBILE FILTER SHEET
      =================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[140] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
          />

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto scrollbar-thin",
              "rounded-t-2xl border-t border-line bg-bg-secondary p-4",
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>

            <ShopFilters
              value={filters}
              onChange={setFilters}
              facets={facets}
            />

            <Button
              fullWidth
              className="mt-4"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Show {visible.length} result{visible.length === 1 ? "" : "s"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
