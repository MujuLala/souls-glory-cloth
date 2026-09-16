"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart, ImageIcon } from "lucide-react";

import { gsap, useGsapScope } from "./gsap-utils";
import { Eyebrow, V2Shell } from "./v2-parts";
import { formatMoney } from "@/lib/format";
import type { StorefrontProduct } from "@/types/catalog";

/* =========================================================
   POPULAR STYLES

   Sources the same StorefrontProduct data and formatMoney
   helper the real shop uses — no separate product system.
   Cards link to the real /product/[slug] route.
========================================================= */

export default function PopularStylesV2({
  products,
}: {
  products: StorefrontProduct[];
}) {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-style-card]"), {
      opacity: 0,
      y: 24,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: scope, start: "top 85%" },
    });
  }, [products.length]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24">
      <V2Shell>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Trending Now</Eyebrow>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.02em] text-[var(--v2-text)] sm:text-[36px]">
              Popular Styles
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-[var(--v2-primary)] sm:inline-flex"
          >
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>

        <div
          ref={scopeRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
        >
          {products.slice(0, 5).map((product) => (
            <StyleCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-6 flex items-center justify-center gap-1.5 text-[13.5px] font-semibold text-[var(--v2-primary)] sm:hidden"
        >
          View All Products
          <ArrowRight size={15} />
        </Link>
      </V2Shell>
    </section>
  );
}

function StyleCard({ product }: { product: StorefrontProduct }) {
  const [liked, setLiked] = useState(false);
  const price = product.salePrice ?? product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      data-style-card
      className="group w-[62vw] shrink-0 snap-start sm:w-auto"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--v2-border)] bg-white">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-[var(--v2-text-faint)]">
            <ImageIcon size={26} />
          </div>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setLiked((value) => !value);
          }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full backdrop-blur-md transition-colors ${
            liked ? "bg-[var(--v2-primary)] text-white" : "bg-white/85 text-[var(--v2-text)]"
          }`}
        >
          <Heart size={14} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-2.5 truncate text-[13px] font-semibold text-[var(--v2-text)]">
        {product.name}
      </p>
      <p className="text-[13px] font-bold text-[var(--v2-primary)]">
        {formatMoney(price)}
      </p>
    </Link>
  );
}
