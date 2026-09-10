"use client";

import { useState } from "react";

import ShopHero from "@/components/shop/ShopHero";
import ShopFilters, {
  ShopFiltersState,
} from "@/components/shop/ShopFilters";
import ProductGrid from "@/components/shop/ProductGrid";

const DEFAULT_FILTERS: ShopFiltersState = {
  search: "",
  category: "All",
  minPrice: 0,
  maxPrice: 25000,
  tags: [],
  sizes: [],
  colors: [],
  availability: "all",
};

export default function ShopPage() {
  const [filters, setFilters] =
    useState<ShopFiltersState>(DEFAULT_FILTERS);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <ShopHero />

      <section
        id="products"
        className="border-t border-white/[0.06] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1400px] px-5">
          <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ShopFilters
                  value={filters}
                  onChange={setFilters}
                />
              </div>
            </div>

            {/* Products */}
            <ProductGrid
              filters={filters}
            />
          </div>
        </div>
      </section>
    </main>
  );
}