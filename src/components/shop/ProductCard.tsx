"use client";

import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "./ShopData";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group relative min-w-0">
      {/* ============================================================
          PRODUCT IMAGE / PLACEHOLDER
      ============================================================ */}
      <div className="relative aspect-square overflow-hidden rounded-[16px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] shadow-[0_20px_70px_rgba(0,0,0,.14)] backdrop-blur-xl transition-all duration-500 group-hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))] group-hover:shadow-[0_25px_80px_rgba(0,0,0,.24)]">
        {/* Background Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Soft center glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.035] blur-3xl transition-all duration-700 group-hover:bg-[var(--primary)]/[0.07]" />

        {/* ============================================================
            PLACEHOLDER
        ============================================================ */}
        <div className="absolute inset-5 flex items-center justify-center rounded-[12px] border border-dashed border-[var(--border)]">
          <div className="flex flex-col items-center text-center">
            {/* Placeholder Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 group-hover:border-[var(--primary)]/30 group-hover:bg-[var(--primary)]/[0.05]">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--text-secondary)] transition-colors duration-500 group-hover:text-[var(--primary)]"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M21 15L16 10L5 21"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Product Image
            </span>

            <span className="mt-1 text-[8px] text-[var(--text-secondary)]/50">
              Place image here
            </span>
          </div>
        </div>

        {/* ============================================================
            BADGE
        ============================================================ */}
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--text)] backdrop-blur-md">
            {product.badge}
          </span>
        )}

        {/* ============================================================
            WISHLIST
        ============================================================ */}
        <button
          type="button"
          aria-label={`Wishlist ${product.name}`}
          onClick={() => setLiked(!liked)}
          className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            liked
              ? "border-[var(--primary)]/40 bg-[var(--primary)] text-white"
              : "border-[var(--border)] bg-[var(--surface)]/90 text-[var(--text-secondary)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
          }`}
        >
          <Heart
            size={14}
            strokeWidth={1.6}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        {/* ============================================================
            HOVER QUICK ADD
        ============================================================ */}
        <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="group/button flex h-11 w-full items-center justify-between rounded-[10px] bg-[var(--primary)] px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:brightness-110"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={13} strokeWidth={1.7} />
              Quick Add
            </span>

            {/* Homepage-style arrow */}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover/button:bg-white group-hover/button:text-[var(--primary)]">
              <ArrowUpRight
                size={13}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </span>
          </button>
        </div>

        {/* Bottom subtle gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/[0.18] to-transparent" />
      </div>

      {/* ============================================================
          PRODUCT DETAILS
      ============================================================ */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {product.category}
            </p>

            <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 tracking-[-0.02em] text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--primary)]">
              {product.name}
            </h3>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold tracking-[-0.02em] text-[var(--text)]">
              {product.price}
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <span className="text-[9px] text-[var(--text-secondary)]">
            Made for you
          </span>

          <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--primary)] opacity-0 transition-all duration-300 group-hover:opacity-100">
            View
            <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </article>
  );
}