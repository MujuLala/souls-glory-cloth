"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  ImageIcon,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;

  // Optional — currently NOT used for rendering
  image?: string;
  hoverImage?: string;

  rating?: number;
  reviews?: number;

  tags?: string[];
  sizes?: string[];
  colors?: string[];

  availability?: "in-stock" | "out-of-stock";

  badge?: "New" | "Featured" | "Bestseller" | "Sale" | "Premium";
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  const isOutOfStock =
    product.availability === "out-of-stock";

  const discount =
    product.compareAtPrice &&
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) /
            product.compareAtPrice) *
            100
        )
      : null;

  return (
    <article className="group flex min-w-0 flex-col">
      {/* ================================================================
          IMAGE / PLACEHOLDER
      ================================================================= */}
      <div className="relative aspect-[0.82] overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b0b0b]">
        {/* Subtle placeholder background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_58%)]" />

          {/* Very subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* ================================================================
            PLACEHOLDER
        ================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Icon Box */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] transition-all duration-500 group-hover:border-[#ed1c2e]/25 group-hover:bg-[#ed1c2e]/[0.04]">
              <ImageIcon
                size={20}
                strokeWidth={1.2}
                className="text-white/20 transition-colors duration-500 group-hover:text-[#ed1c2e]/60"
              />
            </div>

            {/* Text */}
            <span className="mt-3 text-[8px] font-medium uppercase tracking-[0.16em] text-white/20 transition-colors duration-500 group-hover:text-white/35">
              Place image here
            </span>

            <span className="mt-1 text-[7px] text-white/10">
              Product image
            </span>
          </div>
        </div>

        {/* ================================================================
            TOP BADGE
        ================================================================= */}
        {product.badge && (
          <div className="absolute left-3 top-3 z-20">
            <span
              className={`inline-flex rounded-md border px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.12em] ${
                product.badge === "Sale"
                  ? "border-[#ed1c2e]/30 bg-[#ed1c2e] text-white"
                  : "border-white/[0.08] bg-[#090909]/90 text-white/60"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* ================================================================
            WISHLIST
        ================================================================= */}
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
            liked
              ? "border-[#ed1c2e]/40 bg-[#ed1c2e]/10 text-[#ed1c2e]"
              : "border-white/[0.1] bg-[#090909]/70 text-white/40 hover:border-[#ed1c2e]/30 hover:text-[#ed1c2e]"
          }`}
        >
          <Heart
            size={13}
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        {/* ================================================================
            CATEGORY + ARROW
        ================================================================= */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between">
          <span className="rounded-md border border-white/[0.07] bg-black/50 px-2 py-1 text-[7px] uppercase tracking-[0.14em] text-white/40 backdrop-blur-md">
            {product.category}
          </span>

          {/* DARK ARROW - NOT WHITE */}
          <Link
            href={`/shop/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#0a0a0a]/90 text-white/55 backdrop-blur-md transition-all duration-300 hover:border-[#ed1c2e]/50 hover:bg-[#ed1c2e] hover:text-white"
          >
            <ArrowUpRight
              size={14}
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>

      {/* ================================================================
          PRODUCT INFORMATION
      ================================================================= */}
      <div className="flex min-h-[145px] flex-col px-0.5 pt-3">
        {/* Product Name + Price */}
        <div className="flex min-h-[40px] items-start justify-between gap-3">
          {/* Name */}
          <div className="min-w-0">
            <Link
              href={`/shop/${product.slug}`}
              className="line-clamp-2 text-[11px] font-semibold leading-4 text-white transition-colors hover:text-[#ed1c2e] sm:text-xs"
            >
              {product.name}
            </Link>

            <span className="mt-1 block text-[8px] text-white/25">
              {product.category}
            </span>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            <span className="block text-[11px] font-semibold text-white sm:text-xs">
              Rs. {product.price.toLocaleString()}
            </span>

            {product.compareAtPrice && (
              <span className="mt-0.5 block text-[8px] text-white/25 line-through">
                Rs.{" "}
                {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* ================================================================
            RATING
        ================================================================= */}
        <div className="mt-2.5 flex min-h-[18px] items-center justify-between border-t border-white/[0.05] pt-2.5">
          <div className="flex items-center gap-1.5">
            {product.rating !== undefined ? (
              <>
                <div className="flex items-center gap-1 text-[#ed1c2e]">
                  <Star
                    size={9}
                    fill="currentColor"
                  />

                  <span className="text-[8px] text-white/45">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {product.reviews !== undefined && (
                  <span className="text-[8px] text-white/20">
                    ({product.reviews})
                  </span>
                )}
              </>
            ) : (
              <span className="text-[8px] text-white/15">
                No reviews yet
              </span>
            )}
          </div>

          {discount && (
            <span className="text-[8px] font-medium text-[#ed1c2e]">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* ================================================================
            QUICK ADD
        ================================================================= */}
        <div className="mt-auto pt-3">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => {
              if (isOutOfStock) return;

              console.log(
                "Add to cart:",
                product.id
              );
            }}
            className={`flex h-9 w-full items-center justify-center gap-2 rounded-md border text-[8px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
              isOutOfStock
                ? "cursor-not-allowed border-white/[0.05] bg-white/[0.02] text-white/20"
                : "border-[#ed1c2e]/20 bg-[#ed1c2e]/[0.06] text-[#ed1c2e] hover:border-[#ed1c2e]/50 hover:bg-[#ed1c2e] hover:text-white"
            }`}
          >
            <ShoppingBag
              size={11}
              strokeWidth={1.7}
            />

            {isOutOfStock
              ? "Out of Stock"
              : "Quick Add"}
          </button>
        </div>
      </div>
    </article>
  );
}