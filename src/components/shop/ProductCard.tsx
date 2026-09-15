"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, ImageIcon, ShoppingBag, Star } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { formatMoney } from "@/lib/format";
import type { StorefrontProduct } from "@/types/catalog";

export default function ProductCard({
  product,
}: {
  product: StorefrontProduct;
}) {
  const [liked, setLiked] = useState(false);

  const activePrice = product.salePrice ?? product.price;
  const wasPrice = product.salePrice ? product.price : product.compareAtPrice;

  return (
    <article className="group relative min-w-0">
      <Link
        href={`/product/${product.slug}`}
        className="block"
        aria-label={product.name}
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 group-hover:border-primary/35">
          {product.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={cn(
                  "size-full object-cover transition-all duration-500",
                  product.hoverImage
                    ? "group-hover:opacity-0"
                    : "group-hover:scale-[1.03]",
                )}
              />

              {product.hoverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.hoverImage}
                  alt=""
                  loading="lazy"
                  aria-hidden
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 text-faint">
              <ImageIcon size={22} strokeWidth={1.4} />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                No image yet
              </span>
            </div>
          )}

          {/* BADGES */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--primary-contrast)]">
                {product.badge}
              </span>
            )}

            {product.salePrice && (
              <span className="rounded-full border border-line bg-bg-secondary/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
                Sale
              </span>
            )}
          </div>

          {!product.inStock && (
            <span className="absolute bottom-3 left-3 rounded-full border border-line bg-bg-secondary/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted backdrop-blur">
              Sold out
            </span>
          )}
        </div>
      </Link>

      {/* WISHLIST */}
      <button
        type="button"
        aria-label={
          liked ? `Remove ${product.name} from wishlist` : `Save ${product.name}`
        }
        onClick={() => setLiked((value) => !value)}
        className={cn(
          "absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border backdrop-blur transition-colors",
          liked
            ? "border-primary bg-primary text-[var(--primary-contrast)]"
            : "border-line bg-bg-secondary/85 text-muted hover:text-primary",
        )}
      >
        <Heart size={14} fill={liked ? "currentColor" : "none"} />
      </button>

      {/* DETAILS */}
      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-faint">
              {product.category ?? "Atelier"}
            </p>

            <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-ink transition-colors group-hover:text-primary">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-ink">
              {formatMoney(activePrice)}
            </p>

            {wasPrice && wasPrice > activePrice && (
              <s className="text-[11px] text-faint">{formatMoney(wasPrice)}</s>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-line-subtle pt-2.5">
          {product.reviewCount > 0 ? (
            <span className="flex items-center gap-1 text-[10px] text-muted">
              <Star size={11} className="text-warning" fill="currentColor" />
              {product.rating.toFixed(1)}
              <span className="text-faint">({product.reviewCount})</span>
            </span>
          ) : (
            <span className="text-[10px] text-faint">
              {product.inStock ? "Made to order" : "Currently unavailable"}
            </span>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary"
          >
            {product.inStock ? (
              <>
                <ShoppingBag size={11} />
                View
              </>
            ) : (
              "Details"
            )}

            <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
