"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  PackageOpen,
  SlidersHorizontal,
} from "lucide-react";

import ProductCard, {
  Product,
} from "./ProductCard";

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

/*
|--------------------------------------------------------------------------
| Demo Products
|--------------------------------------------------------------------------
| Replace these with your actual database / Shopify / API products.
|
| Images are expected at:
| /images/products/...
|--------------------------------------------------------------------------
*/

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Navy Shalwar Kameez",
    slug: "classic-navy-shalwar-kameez",
    category: "Men",
    price: 8999,
    compareAtPrice: 10999,
    image: "/images/products/navy-shalwar-kameez.jpg",
    hoverImage: "/images/products/navy-shalwar-kameez-2.jpg",
    rating: 4.9,
    reviews: 42,
    tags: ["Bestseller", "Premium", "Formal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy"],
    availability: "in-stock",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Midnight Formal Kurta",
    slug: "midnight-formal-kurta",
    category: "Men",
    price: 7499,
    compareAtPrice: 8999,
    image: "/images/products/black-kurta.jpg",
    hoverImage: "/images/products/black-kurta-2.jpg",
    rating: 4.8,
    reviews: 31,
    tags: ["Featured", "Formal"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    availability: "in-stock",
    badge: "Featured",
  },
  {
    id: "3",
    name: "Classic Black Suit",
    slug: "classic-black-suit",
    category: "Formal",
    price: 15999,
    compareAtPrice: 18999,
    image: "/images/products/black-suit.jpg",
    hoverImage: "/images/products/black-suit-2.jpg",
    rating: 4.9,
    reviews: 27,
    tags: ["Premium", "Formal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    availability: "in-stock",
    badge: "Premium",
  },
  {
    id: "4",
    name: "Wedding Signature Suit",
    slug: "wedding-signature-suit",
    category: "Wedding",
    price: 24999,
    image: "/images/products/wedding-suit.jpg",
    hoverImage: "/images/products/wedding-suit-2.jpg",
    rating: 5,
    reviews: 18,
    tags: ["Wedding", "Premium", "Limited Edition"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Beige"],
    availability: "in-stock",
    badge: "New",
  },
  {
    id: "5",
    name: "Everyday Cotton Kurta",
    slug: "everyday-cotton-kurta",
    category: "Casual",
    price: 4999,
    compareAtPrice: 5999,
    image: "/images/products/cotton-kurta.jpg",
    hoverImage: "/images/products/cotton-kurta-2.jpg",
    rating: 4.7,
    reviews: 63,
    tags: ["Casual", "Bestseller"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Green", "Grey"],
    availability: "in-stock",
    badge: "Bestseller",
  },
  {
    id: "6",
    name: "Premium Wool Waistcoat",
    slug: "premium-wool-waistcoat",
    category: "Formal",
    price: 6999,
    image: "/images/products/waistcoat.jpg",
    hoverImage: "/images/products/waistcoat-2.jpg",
    rating: 4.8,
    reviews: 21,
    tags: ["Premium", "Formal"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Brown"],
    availability: "in-stock",
    badge: "Premium",
  },
  {
    id: "7",
    name: "Rose Wedding Ensemble",
    slug: "rose-wedding-ensemble",
    category: "Women",
    price: 13999,
    compareAtPrice: 16999,
    image: "/images/products/women-pink.jpg",
    hoverImage: "/images/products/women-pink-2.jpg",
    rating: 4.9,
    reviews: 36,
    tags: ["Wedding", "Featured"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Maroon"],
    availability: "in-stock",
    badge: "Sale",
  },
  {
    id: "8",
    name: "Signature White Kurta",
    slug: "signature-white-kurta",
    category: "New Arrivals",
    price: 5999,
    image: "/images/products/white-kurta.jpg",
    hoverImage: "/images/products/white-kurta-2.jpg",
    rating: 4.8,
    reviews: 14,
    tags: ["New Arrivals", "Premium"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    availability: "in-stock",
    badge: "New",
  },
  {
    id: "9",
    name: "Heritage Maroon Waistcoat",
    slug: "heritage-maroon-waistcoat",
    category: "Wedding",
    price: 7999,
    image: "/images/products/maroon-waistcoat.jpg",
    hoverImage: "/images/products/maroon-waistcoat-2.jpg",
    rating: 4.7,
    reviews: 16,
    tags: ["Wedding", "Featured"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Maroon"],
    availability: "in-stock",
    badge: "Featured",
  },
  {
    id: "10",
    name: "Relaxed Linen Set",
    slug: "relaxed-linen-set",
    category: "Casual",
    price: 8499,
    image: "/images/products/linen-set.jpg",
    hoverImage: "/images/products/linen-set-2.jpg",
    rating: 4.6,
    reviews: 12,
    tags: ["Casual", "New Arrivals"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White"],
    availability: "in-stock",
    badge: "New",
  },
  {
    id: "11",
    name: "Executive Charcoal Suit",
    slug: "executive-charcoal-suit",
    category: "Formal",
    price: 18999,
    compareAtPrice: 21999,
    image: "/images/products/charcoal-suit.jpg",
    hoverImage: "/images/products/charcoal-suit-2.jpg",
    rating: 4.9,
    reviews: 29,
    tags: ["Premium", "Formal", "Bestseller"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey"],
    availability: "in-stock",
    badge: "Bestseller",
  },
  {
    id: "12",
    name: "Minimal Black Essential",
    slug: "minimal-black-essential",
    category: "New Arrivals",
    price: 6499,
    image: "/images/products/black-essential.jpg",
    hoverImage: "/images/products/black-essential-2.jpg",
    rating: 4.8,
    reviews: 19,
    tags: ["New Arrivals", "Casual"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    availability: "out-of-stock",
    badge: "New",
  },
];

export default function ProductGrid({
  products = DEFAULT_PRODUCTS,
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

    const result = products.filter((product) => {
      /* Search */
      if (search) {
        const searchableText = [
          product.name,
          product.category,
          ...(product.tags || []),
          ...(product.colors || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(search)) {
          return false;
        }
      }

      /* Category */
      if (
        filters.category !== "All" &&
        product.category.toLowerCase() !==
          filters.category.toLowerCase()
      ) {
        return false;
      }

      /* Price */
      if (product.price < filters.minPrice) {
        return false;
      }

      if (product.price > filters.maxPrice) {
        return false;
      }

      /* Tags */
      if (filters.tags.length > 0) {
        const productTags = product.tags || [];

        const hasMatchingTag = filters.tags.some((tag) =>
          productTags
            .map((item) => item.toLowerCase())
            .includes(tag.toLowerCase())
        );

        if (!hasMatchingTag) {
          return false;
        }
      }

      /* Sizes */
      if (filters.sizes.length > 0) {
        const productSizes = product.sizes || [];

        const hasMatchingSize = filters.sizes.some((size) =>
          productSizes
            .map((item) => item.toLowerCase())
            .includes(size.toLowerCase())
        );

        if (!hasMatchingSize) {
          return false;
        }
      }

      /* Colors */
      if (filters.colors.length > 0) {
        const productColors = product.colors || [];

        const hasMatchingColor = filters.colors.some((color) =>
          productColors
            .map((item) => item.toLowerCase())
            .includes(color.toLowerCase())
        );

        if (!hasMatchingColor) {
          return false;
        }
      }

      /* Availability */
      if (
        filters.availability !== "all" &&
        product.availability !== filters.availability
      ) {
        return false;
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
          (a, b) => a.price - b.price
        );

      case "price-high":
        return [...result].sort(
          (a, b) => b.price - a.price
        );

      case "rating":
        return [...result].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
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
      {/* Toolbar */}
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
              onChange={(e) => setSort(e.target.value)}
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

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Bottom Count */}
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

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

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