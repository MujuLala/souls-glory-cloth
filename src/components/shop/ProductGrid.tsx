"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  PackageOpen,
  SlidersHorizontal,
} from "lucide-react";

import ProductCard from "./ProductCard";

import type { Product } from "../products/types";
import { products as cmsProducts } from "../products/data";

import type { ShopFiltersState } from "./ShopFilters";

type ProductGridProps = {
  products?: Product[];
  filters?: ShopFiltersState;
  onMobileFilter?: () => void;
};

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

export default function ProductGrid({
  products = cmsProducts,
  filters = DEFAULT_FILTERS,
  onMobileFilter,
}: ProductGridProps) {
  const [sort, setSort] = useState("featured");

  /*
  |--------------------------------------------------------------------------
  | Filtering
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    const result = products.filter((product: Product) => {
      /* ============================================================
         SEARCH
      ============================================================ */

      if (search) {
        const searchableText = [
          product.name,
          product.sku,
          product.category,
          product.subcategory || "",
          ...(product.tags || []),
          ...(product.colors || []),
          ...(product.sizes || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(search)) {
          return false;
        }
      }

      /* ============================================================
         CATEGORY
      ============================================================ */

      if (filters.category !== "All") {
        const selectedCategory =
          filters.category.toLowerCase();

        const productCategory =
          product.category.toLowerCase();

        const productSubcategory =
          (product.subcategory || "").toLowerCase();

        /*
         * Supports both:
         *
         * Men
         * Men Collection
         *
         * Women
         * Women Collection
         *
         * Kids
         * Kids Collection
         *
         * And subcategories such as:
         * Kurta
         * Suits
         * Formal
         */

        const categoryMatches =
          productCategory === selectedCategory ||
          productCategory.replace(" collection", "") ===
            selectedCategory ||
          productSubcategory === selectedCategory;

        if (!categoryMatches) {
          return false;
        }
      }

      /* ============================================================
         PRICE
      ============================================================ */

      if (product.price < filters.minPrice) {
        return false;
      }

      if (product.price > filters.maxPrice) {
        return false;
      }

      /* ============================================================
         TAGS
      ============================================================ */

      if (filters.tags.length > 0) {
        const productTags = product.tags || [];

        const hasMatchingTag = filters.tags.some(
          (tag: string) =>
            productTags.some(
              (productTag: string) =>
                productTag.toLowerCase() ===
                tag.toLowerCase()
            )
        );

        if (!hasMatchingTag) {
          return false;
        }
      }

      /* ============================================================
         SIZES
      ============================================================ */

      if (filters.sizes.length > 0) {
        const productSizes = product.sizes || [];

        const hasMatchingSize = filters.sizes.some(
          (size: string) =>
            productSizes.some(
              (productSize: string) =>
                productSize.toLowerCase() ===
                size.toLowerCase()
            )
        );

        if (!hasMatchingSize) {
          return false;
        }
      }

      /* ============================================================
         COLORS
      ============================================================ */

      if (filters.colors.length > 0) {
        const productColors = product.colors || [];

        const hasMatchingColor = filters.colors.some(
          (color: string) =>
            productColors.some(
              (productColor: string) =>
                productColor.toLowerCase() ===
                color.toLowerCase()
            )
        );

        if (!hasMatchingColor) {
          return false;
        }
      }

      /* ============================================================
         AVAILABILITY
      ============================================================ */

      if (filters.availability !== "all") {
        const isInStock =
          product.stock > 0 &&
          product.status !== "Out of Stock";

        if (
          filters.availability === "in-stock" &&
          !isInStock
        ) {
          return false;
        }

        if (
          filters.availability === "out-of-stock" &&
          isInStock
        ) {
          return false;
        }
      }

      return true;
    });

    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    switch (sort) {
      case "price-low":
        return [...result].sort(
          (a: Product, b: Product) =>
            a.price - b.price
        );

      case "price-high":
        return [...result].sort(
          (a: Product, b: Product) =>
            b.price - a.price
        );

      case "rating":
        return [...result].sort(
          (a: Product, b: Product) =>
            (b.rating || 0) - (a.rating || 0)
        );

      case "newest":
        return [...result].reverse();

      case "featured":
      default:
        return result;
    }
  }, [products, filters, sort]);

  return (
    <div className="min-w-0">
      {/* ============================================================
          TOOLBAR
      ============================================================ */}

      <div className="mb-5 flex flex-col gap-3 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Result Info */}

        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c2e]" />

            <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">
              Collection
            </span>
          </div>

          <p className="mt-1 text-xs text-white/65">
            <span className="font-semibold text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Controls */}

        <div className="flex items-center gap-2">
          {/* Mobile Filters */}

          {onMobileFilter && (
            <button
              type="button"
              onClick={onMobileFilter}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.025] px-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/55 transition-colors hover:border-white/15 hover:text-white lg:hidden"
            >
              <SlidersHorizontal size={12} />

              Filters
            </button>
          )}

          {/* Sort */}

          <div className="relative">
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="h-9 appearance-none rounded-md border border-white/[0.08] bg-[#0a0a0a] pl-3 pr-8 text-[9px] font-medium uppercase tracking-[0.06em] text-white/55 outline-none transition-colors hover:border-white/15 focus:border-[#ed1c2e]/40"
            >
              <option value="featured">
                Featured
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>
            </select>

            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25"
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          PRODUCT GRID
      ============================================================ */}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(
            (product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* ============================================================
          BOTTOM COUNT
      ============================================================ */}

      {filteredProducts.length > 0 && (
        <div className="mt-12 border-t border-white/[0.06] pt-5 text-center">
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/20">
            Showing {filteredProducts.length} of{" "}
            {products.length} products
          </span>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   EMPTY STATE
============================================================================= */

function EmptyState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
        <PackageOpen
          size={18}
          className="text-white/25"
        />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-white/80">
        No products found
      </h3>

      <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/30">
        Try changing your search or removing some filters
        to discover more products.
      </p>
    </div>
  );
}