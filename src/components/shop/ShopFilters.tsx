"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

export type ShopFiltersState = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  sizes: string[];
  colors: string[];
  availability: string;
};

type ShopFiltersProps = {
  value?: ShopFiltersState;
  onChange?: (filters: ShopFiltersState) => void;
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

const categories = [
  "All",
  "New Arrivals",
  "Men",
  "Women",
  "Wedding",
  "Formal",
  "Casual",
  "Accessories",
  "Sale",
];

const tags = [
  "Bestseller",
  "Featured",
  "Premium",
  "Wedding",
  "Eid",
  "Formal",
  "Casual",
  "Limited Edition",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];

const colors = [
  { name: "Black", value: "#111111" },
  { name: "White", value: "#f5f5f5" },
  { name: "Navy", value: "#18243a" },
  { name: "Grey", value: "#777777" },
  { name: "Beige", value: "#c8b89e" },
  { name: "Brown", value: "#654735" },
  { name: "Maroon", value: "#641d2b" },
  { name: "Green", value: "#234b3b" },
];

const MAX_PRICE = 25000;

export default function ShopFilters({
  value = DEFAULT_FILTERS,
  onChange,
}: ShopFiltersProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    tags: true,
    size: true,
    color: true,
    availability: true,
  });

  const filters = value;

  const updateFilters = (updates: Partial<ShopFiltersState>) => {
    onChange?.({
      ...filters,
      ...updates,
    });
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleArrayValue = (
    key: "tags" | "sizes" | "colors",
    item: string
  ) => {
    const current = filters[key];

    updateFilters({
      [key]: current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search.trim()) count++;
    if (filters.category !== "All") count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice < MAX_PRICE) count++;
    count += filters.tags.length;
    count += filters.sizes.length;
    count += filters.colors.length;
    if (filters.availability !== "all") count++;

    return count;
  }, [filters]);

  const clearAll = () => {
    updateFilters({
      ...DEFAULT_FILTERS,
    });
  };

  return (
    <aside
      id="filters"
      className="w-full rounded-xl border border-white/[0.07] bg-[#0a0a0a]"
    >
      {/* Header */}
      <div className="border-b border-white/[0.06] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c2e] shadow-[0_0_8px_rgba(237,28,46,.6)]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
                Refine
              </span>
            </div>

            <h2 className="mt-1 text-sm font-semibold tracking-tight text-white">
              Filter Products
            </h2>
          </div>

          {activeFilterCount > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ed1c2e]/10 px-2 text-[9px] font-semibold text-[#ed1c2e]">
              {activeFilterCount}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
          />

          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              updateFilters({
                search: e.target.value,
              })
            }
            placeholder="Search products..."
            className="h-10 w-full rounded-md border border-white/[0.07] bg-white/[0.025] pl-9 pr-9 text-xs text-white outline-none placeholder:text-white/25 transition-all focus:border-[#ed1c2e]/40 focus:bg-white/[0.04]"
          />

          {filters.search && (
            <button
              type="button"
              onClick={() =>
                updateFilters({
                  search: "",
                })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Clear */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white/35 transition-colors hover:text-[#ed1c2e]"
          >
            <RotateCcw size={11} />
            Clear all filters
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection
        title="Categories"
        count={filters.category !== "All" ? 1 : 0}
        open={openSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-1">
          {categories.map((category) => {
            const active = filters.category === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  updateFilters({
                    category,
                  })
                }
                className={`group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[11px] transition-all ${
                  active
                    ? "bg-[#ed1c2e]/10 text-white"
                    : "text-white/45 hover:bg-white/[0.035] hover:text-white/80"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1 w-1 rounded-full transition-all ${
                      active
                        ? "bg-[#ed1c2e] shadow-[0_0_7px_rgba(237,28,46,.7)]"
                        : "bg-white/15 group-hover:bg-white/40"
                    }`}
                  />

                  {category}
                </span>

                {active && (
                  <span className="text-[8px] uppercase tracking-wider text-[#ed1c2e]">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection
        title="Price Range"
        count={
          filters.minPrice > 0 || filters.maxPrice < MAX_PRICE ? 1 : 0
        }
        open={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-4">
          {/* Values */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[8px] uppercase tracking-[0.12em] text-white/25">
                Minimum
              </span>

              <span className="mt-1 block text-xs font-medium text-white/75">
                Rs. {filters.minPrice.toLocaleString()}
              </span>
            </div>

            <span className="h-px w-5 bg-white/10" />

            <div className="text-right">
              <span className="block text-[8px] uppercase tracking-[0.12em] text-white/25">
                Maximum
              </span>

              <span className="mt-1 block text-xs font-medium text-white/75">
                Rs. {filters.maxPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Min */}
          <div>
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={500}
              value={filters.minPrice}
              onChange={(e) => {
                const newValue = Number(e.target.value);

                updateFilters({
                  minPrice: Math.min(newValue, filters.maxPrice - 500),
                });
              }}
              className="shop-range"
            />

            <div className="mt-1 flex justify-between text-[8px] text-white/20">
              <span>Rs. 0</span>
              <span>Rs. 25,000+</span>
            </div>
          </div>

          {/* Manual Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0}
              max={filters.maxPrice - 500}
              value={filters.minPrice}
              onChange={(e) => {
                const newValue = Math.max(0, Number(e.target.value));

                updateFilters({
                  minPrice: Math.min(newValue, filters.maxPrice - 500),
                });
              }}
              className="h-9 rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 text-[10px] text-white outline-none focus:border-[#ed1c2e]/40"
              placeholder="Min"
            />

            <input
              type="number"
              min={filters.minPrice + 500}
              max={MAX_PRICE}
              value={filters.maxPrice}
              onChange={(e) => {
                const newValue = Number(e.target.value);

                updateFilters({
                  maxPrice: Math.max(
                    filters.minPrice + 500,
                    Math.min(MAX_PRICE, newValue)
                  ),
                });
              }}
              className="h-9 rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 text-[10px] text-white outline-none focus:border-[#ed1c2e]/40"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Tags */}
      <FilterSection
        title="Tags"
        count={filters.tags.length}
        open={openSections.tags}
        onToggle={() => toggleSection("tags")}
      >
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const active = filters.tags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleArrayValue("tags", tag)}
                className={`rounded-md border px-2.5 py-1.5 text-[9px] transition-all ${
                  active
                    ? "border-[#ed1c2e]/35 bg-[#ed1c2e]/10 text-[#ed1c2e]"
                    : "border-white/[0.07] bg-white/[0.02] text-white/35 hover:border-white/15 hover:text-white/70"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection
        title="Size"
        count={filters.sizes.length}
        open={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {sizes.map((size) => {
            const active = filters.sizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleArrayValue("sizes", size)}
                className={`h-8 rounded-md border text-[9px] font-medium transition-all ${
                  active
                    ? "border-[#ed1c2e]/40 bg-[#ed1c2e]/10 text-[#ed1c2e]"
                    : "border-white/[0.07] bg-white/[0.02] text-white/35 hover:border-white/15 hover:text-white"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection
        title="Color"
        count={filters.colors.length}
        open={openSections.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => {
            const active = filters.colors.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleArrayValue("colors", color.name)}
                className="group flex flex-col items-center gap-1.5"
                title={color.name}
              >
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    active
                      ? "border-[#ed1c2e] ring-2 ring-[#ed1c2e]/20"
                      : "border-white/10 group-hover:border-white/30"
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-black/10"
                    style={{
                      backgroundColor: color.value,
                    }}
                  />

                  {active && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#ed1c2e]" />
                  )}
                </span>

                <span
                  className={`text-[7px] transition-colors ${
                    active ? "text-white/70" : "text-white/25"
                  }`}
                >
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        count={filters.availability !== "all" ? 1 : 0}
        open={openSections.availability}
        onToggle={() => toggleSection("availability")}
        last
      >
        <div className="space-y-1">
          {[
            {
              value: "all",
              label: "All Products",
            },
            {
              value: "in-stock",
              label: "In Stock",
            },
            {
              value: "out-of-stock",
              label: "Out of Stock",
            },
          ].map((option) => {
            const active = filters.availability === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  updateFilters({
                    availability: option.value,
                  })
                }
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left"
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                    active
                      ? "border-[#ed1c2e]"
                      : "border-white/15"
                  }`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c2e]" />
                  )}
                </span>

                <span
                  className={`text-[10px] ${
                    active ? "text-white/75" : "text-white/35"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Custom Range Styles */}
      <style jsx>{`
        .shop-range {
          width: 100%;
          height: 3px;
          appearance: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          cursor: pointer;
        }

        .shop-range::-webkit-slider-thumb {
          appearance: none;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #ed1c2e;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 0 1px rgba(237, 28, 46, 0.45);
          cursor: pointer;
        }

        .shop-range::-moz-range-thumb {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #ed1c2e;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 0 1px rgba(237, 28, 46, 0.45);
          cursor: pointer;
        }
      `}</style>
    </aside>
  );
}

/* --------------------------------
   Filter Section
-------------------------------- */

type FilterSectionProps = {
  title: string;
  count?: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  last?: boolean;
};

function FilterSection({
  title,
  count = 0,
  open,
  onToggle,
  children,
  last = false,
}: FilterSectionProps) {
  return (
    <div
      className={`${!last ? "border-b border-white/[0.06]" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5"
      >
        <span className="flex items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">
            {title}
          </span>

          {count > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ed1c2e]/10 px-1 text-[7px] font-semibold text-[#ed1c2e]">
              {count}
            </span>
          )}
        </span>

        {open ? (
          <ChevronUp
            size={13}
            className="text-white/25"
          />
        ) : (
          <ChevronDown
            size={13}
            className="text-white/25"
          />
        )}
      </button>

      {open && (
        <div className="px-4 pb-5 sm:px-5">
          {children}
        </div>
      )}
    </div>
  );
}