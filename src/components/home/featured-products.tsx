"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";


const products = [
  {
    name: "Classic Ivory Shalwar Kameez",
    category: "Men / Shalwar Kameez",
    price: "$89",
    oldPrice: "",
    rating: "4.9",
    reviews: "124",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
    href: "/product/classic-ivory-shalwar-kameez",
    tag: "Best Seller",
    sold: "124 sold",
  },
  {
    name: "Midnight Formal Kurta",
    category: "Men / Kurta",
    price: "$79",
    oldPrice: "$95",
    rating: "4.8",
    reviews: "86",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85",
    href: "/product/midnight-formal-kurta",
    tag: "Popular",
    sold: "86 sold",
  },
  {
    name: "Pearl Wedding Ensemble",
    category: "Women / Wedding Wear",
    price: "$149",
    oldPrice: "",
    rating: "5.0",
    reviews: "67",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85",
    href: "/product/pearl-wedding-ensemble",
    tag: "Premium",
    sold: "67 sold",
  },
  {
    name: "Premium Sand Waistcoat",
    category: "Men / Waistcoat",
    price: "$69",
    oldPrice: "$82",
    rating: "4.9",
    reviews: "91",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
    href: "/product/premium-sand-waistcoat",
    tag: "New",
    sold: "91 sold",
  },
  {
    name: "Classic Black Kurta",
    category: "Men / Kurta",
    price: "$74",
    oldPrice: "",
    rating: "4.8",
    reviews: "52",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    href: "/product/classic-black-kurta",
    tag: "Classic",
    sold: "52 sold",
  },
  {
    name: "Ivory Premium Suit",
    category: "Men / Suit",
    price: "$129",
    oldPrice: "$149",
    rating: "4.9",
    reviews: "74",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    href: "/product/ivory-premium-suit",
    tag: "Premium",
    sold: "74 sold",
  },
];

export default function FeaturedProducts() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.78;

    carouselRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-[6vw] max-lg:py-20 max-sm:py-14">
      {/* =====================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container className="relative z-10">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-[2.5vw] flex items-end justify-between gap-8 max-lg:mb-8 max-sm:flex-col max-sm:items-start">
          {/* Left */}

          <div className="max-w-[680px]">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_0_20px_rgba(229,30,50,0.2)]">
                <Sparkles size={10} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                Glory's Cloth — Featured
              </span>
            </div>

            <h2
              className="
                text-[3vw]
                font-bold
                leading-[0.96]
                tracking-[-0.06em]
                text-[var(--text)]

                max-lg:text-[40px]
                max-md:text-[35px]
                max-sm:text-[31px]
              "
            >
              Signature pieces
              <br />
              <span className="text-[var(--primary)]">
                made around you.
              </span>
            </h2>

            <p className="mt-4 max-w-[520px] text-[13px] leading-[1.6] text-[var(--text-secondary)]">
              Explore refined essentials and signature tailoring, available ready-to-wear
              or crafted to your measurements.
            </p>
          </div>

          {/* Right controls */}

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href="/shop"
              variant="secondary"
              className="h-[42px] px-4 text-[11px]"
            >
              View All
              <ArrowRight size={13} />
            </Button>

            {/* Carousel arrows */}

            <div className="ml-2 flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollCarousel("prev")}
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--text-secondary)]
                  transition-all
                  duration-300
                  hover:border-[var(--primary)]
                  hover:bg-[var(--surface-hover)]
                  hover:text-[var(--text)]
                "
              >
                <ArrowLeft size={15} />
              </button>

              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollCarousel("next")}
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                  shadow-[0_10px_30px_rgba(229,30,50,0.16)]
                  transition-all
                  duration-300
                  hover:bg-[var(--primary-hover)]
                "
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            CAROUSEL
        ====================================================== */}

        <div
          ref={carouselRef}
          className="
            -mx-[0.5vw]
            flex
            snap-x
            snap-mandatory
            gap-[1vw]
            overflow-x-auto
            px-[0.5vw]
            pb-2

            scrollbar-none

            max-lg:gap-3
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </div>

        {/* =====================================================
            CAROUSEL PROGRESS
        ====================================================== */}

        <div className="mt-[1.8vw] flex items-center gap-4 max-lg:mt-6">
          <div className="h-px flex-1 bg-[var(--border)]" />

          <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            Scroll to explore
          </span>

          <div className="h-px w-[8vw] bg-[var(--border)] max-sm:w-[15vw]" />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <article
      className="
        group
        w-[calc(25%-0.75vw)]
        min-w-[calc(25%-0.75vw)]
        snap-start

        max-lg:w-[calc(50%-0.375rem)]
        max-lg:min-w-[calc(50%-0.375rem)]

        max-sm:w-[82vw]
        max-sm:min-w-[82vw]
      "
    >
      {/* ===================================================
          IMAGE
      ==================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[1.1vw]
          border
          border-[var(--border)]
          bg-[var(--surface)]

          max-lg:rounded-[14px]
        "
      >
        <Link
          href={product.href}
          className="relative block aspect-[0.86] overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* Image overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              via-transparent
              to-black/10
            "
          />

          {/* =================================================
              TAG
          ================================================== */}

          <div className="absolute left-3 top-3">
            <span
              className="
                inline-flex
                rounded-full
                border
                border-white/15
                bg-black/30
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white
                backdrop-blur-xl
              "
            >
              {product.tag}
            </span>
          </div>
        </Link>

        {/* =================================================
            WISHLIST
        ================================================== */}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(event) => event.preventDefault()}
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/30
            text-white
            backdrop-blur-xl
            transition-all
            duration-300

            hover:bg-white
            hover:text-black

            sm:opacity-0
            sm:group-hover:opacity-100
          "
        >
          <Heart size={13} />
        </button>

        {/* =================================================
            QUICK VIEW
        ================================================== */}

        <Link
          href={product.href}
          className="
            absolute
            bottom-3
            left-3
            right-3
            flex
            translate-y-2
            items-center
            justify-center
            gap-2
            rounded-[8px]
            bg-white
            py-2.5
            text-[9px]
            font-bold
            !text-[var(--primary)]
            opacity-0
            shadow-xl
            transition-all
            duration-300
            bg-[var(--primary)]
            group-hover:translate-y-0
            group-hover:opacity-100

            max-sm:hidden
          "
        >
          View Product
          <ArrowRight size={11} />
        </Link>
      </div>

      {/* ===================================================
          PRODUCT INFO
      ==================================================== */}

      <div className="border-b border-[var(--border)] pb-4 pt-3">
        {/* Category */}

        <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          {product.category}
        </p>

        {/* Product name */}

        <Link
          href={product.href}
          className="
            block
            truncate
            text-[0.95vw]
            font-semibold
            leading-[1.2]
            tracking-[-0.025em]
            text-[var(--text)]
            transition-colors
            hover:text-[var(--primary)]

            max-lg:text-[14px]
          "
        >
          {product.name}
        </Link>

        {/* Price + Rating */}

        <div className="mt-2.5 flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-[15px] font-bold tracking-[-0.03em] text-[var(--text)]">
              {product.price}
            </span>

            {product.oldPrice && (
              <span className="text-[9px] font-medium text-[var(--text-tertiary)] line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
            <Star
              size={9}
              fill="currentColor"
              className="text-[var(--primary)]"
            />
            <span className="text-[9px] font-bold text-[var(--text)]">
              {product.rating}
            </span>
            <span className="text-[8px] text-[var(--text-tertiary)]">
              ({product.reviews})
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          <span>{product.sold}</span>
          <span>Made to measure</span>
        </div>
      </div>
    </article>
  );
}