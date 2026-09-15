"use client";

import { RotateCcw, Search } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { formatMoney } from "@/lib/format";
import type { ShopFacets } from "@/data/storefront";

/* =========================================================
   FILTER STATE
========================================================= */

export type ShopFiltersState = {
  search: string;
  category: string;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  availability: "all" | "in-stock" | "on-sale";
};

export function defaultFilters(facets: ShopFacets): ShopFiltersState {
  return {
    search: "",
    category: "All",
    maxPrice: facets.maxPrice,
    sizes: [],
    colors: [],
    tags: [],
    availability: "all",
  };
}

/* =========================================================
   SHOP FILTERS
========================================================= */

export default function ShopFilters({
  value,
  onChange,
  facets,
}: {
  value: ShopFiltersState;
  onChange: (next: ShopFiltersState) => void;
  facets: ShopFacets;
}) {
  const update = (patch: Partial<ShopFiltersState>) =>
    onChange({ ...value, ...patch });

  const toggle = (key: "sizes" | "colors" | "tags", entry: string) =>
    update({
      [key]: value[key].includes(entry)
        ? value[key].filter((item) => item !== entry)
        : [...value[key], entry],
    } as Partial<ShopFiltersState>);

  const isDirty =
    value.search !== "" ||
    value.category !== "All" ||
    value.availability !== "all" ||
    value.sizes.length > 0 ||
    value.colors.length > 0 ||
    value.tags.length > 0 ||
    value.maxPrice !== facets.maxPrice;

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-ink">Filters</h2>

        {isDirty && (
          <button
            type="button"
            onClick={() => onChange(defaultFilters(facets))}
            className="flex items-center gap-1 text-[11px] text-faint transition-colors hover:text-primary"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative mt-3">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
        />

        <input
          value={value.search}
          onChange={(event) => update({ search: event.target.value })}
          placeholder="Search pieces…"
          aria-label="Search products"
          className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
        />
      </div>

      {/* AVAILABILITY */}
      <FilterGroup title="Show">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { key: "all", label: "Everything" },
              { key: "in-stock", label: "In stock" },
              { key: "on-sale", label: "On sale" },
            ] as const
          ).map((option) => (
            <Chip
              key={option.key}
              label={option.label}
              active={value.availability === option.key}
              onClick={() => update({ availability: option.key })}
            />
          ))}
        </div>
      </FilterGroup>

      {/* CATEGORY */}
      {facets.categories.length > 0 && (
        <FilterGroup title="Category">
          <div className="flex flex-wrap gap-1.5">
            <Chip
              label="All"
              active={value.category === "All"}
              onClick={() => update({ category: "All" })}
            />

            {facets.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                active={value.category === category}
                onClick={() => update({ category })}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {/* PRICE */}
      <FilterGroup title="Maximum price">
        <input
          type="range"
          min={0}
          max={facets.maxPrice}
          step={500}
          value={value.maxPrice}
          onChange={(event) => update({ maxPrice: Number(event.target.value) })}
          aria-label="Maximum price"
          className="w-full accent-[var(--primary)]"
        />

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-faint">
          <span>{formatMoney(0)}</span>
          <span className="font-semibold text-ink">
            {formatMoney(value.maxPrice)}
          </span>
        </div>
      </FilterGroup>

      {/* SIZES */}
      {facets.sizes.length > 0 && (
        <FilterGroup title="Size">
          <div className="flex flex-wrap gap-1.5">
            {facets.sizes.map((size) => (
              <Chip
                key={size}
                label={size}
                active={value.sizes.includes(size)}
                onClick={() => toggle("sizes", size)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {/* COLOURS */}
      {facets.colors.length > 0 && (
        <FilterGroup title="Colour">
          <div className="flex flex-wrap gap-1.5">
            {facets.colors.map((color) => (
              <Chip
                key={color}
                label={color}
                active={value.colors.includes(color)}
                onClick={() => toggle("colors", color)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {/* TAGS */}
      {facets.tags.length > 0 && (
        <FilterGroup title="Tags">
          <div className="flex flex-wrap gap-1.5">
            {facets.tags.slice(0, 14).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                active={value.tags.includes(tag)}
                onClick={() => toggle("tags", tag)}
              />
            ))}
          </div>
        </FilterGroup>
      )}
    </div>
  );
}

/* =========================================================
   PARTS
========================================================= */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-line-subtle pt-4 first-of-type:border-0">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-faint">
        {title}
      </p>

      {children}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[11px] transition-colors",
        active
          ? "border-primary bg-primary/12 font-semibold text-primary"
          : "border-line bg-surface text-muted hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
