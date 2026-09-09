"use client";

import Image from "next/image";
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
    image: "/images/products/shalwar-kameez.jpg",
    href: "/product/classic-ivory-shalwar-kameez",
    tag: "Best Seller",
  },
  {
    name: "Midnight Formal Kurta",
    category: "Men / Kurta",
    price: "$79",
    oldPrice: "$95",
    rating: "4.8",
    reviews: "86",
    image: "/images/products/formal-kurta.jpg",
    href: "/product/midnight-formal-kurta",
    tag: "Popular",
  },
  {
    name: "Pearl Wedding Ensemble",
    category: "Women / Wedding Wear",
    price: "$149",
    oldPrice: "",
    rating: "5.0",
    reviews: "67",
    image: "/images/products/wedding-ensemble.jpg",
    href: "/product/pearl-wedding-ensemble",
    tag: "Premium",
  },
  {
    name: "Premium Sand Waistcoat",
    category: "Men / Waistcoat",
    price: "$69",
    oldPrice: "$82",
    rating: "4.9",
    reviews: "91",
    image: "/images/products/waistcoat.jpg",
    href: "/product/premium-sand-waistcoat",
    tag: "New",
  },
  {
    name: "Classic Black Kurta",
    category: "Men / Kurta",
    price: "$74",
    oldPrice: "",
    rating: "4.8",
    reviews: "52",
    image: "/images/products/black-kurta.jpg",
    href: "/product/classic-black-kurta",
    tag: "Classic",
  },
  {
    name: "Ivory Premium Suit",
    category: "Men / Suit",
    price: "$129",
    oldPrice: "$149",
    rating: "4.9",
    reviews: "74",
    image: "/images/products/ivory-suit.jpg",
    href: "/product/ivory-premium-suit",
    tag: "Premium",
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
                Featured products
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
              Discover pieces
              <br />
              <span className="text-[var(--primary)]">
                made to be yours.
              </span>
            </h2>

            <p className="mt-4 max-w-[520px] text-[13px] leading-[1.6] text-[var(--text-secondary)]">
              Explore our most loved styles, premium essentials and latest
              arrivals — available ready-to-wear or made to your measurements.
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
          rounded-[1vw]
          border
          border-[var(--border)]
          bg-[var(--surface)]

          max-lg:rounded-[14px]
        "
      >
        <Link
          href={product.href}
          className="relative block aspect-[0.82] overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw"
            className="
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
            text-black
            opacity-0
            shadow-xl
            transition-all
            duration-300

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

      <div className="pt-3">
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
            text-[0.9vw]
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

        {/* Rating + reviews */}

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star
              size={9}
              fill="currentColor"
              className="text-[var(--primary)]"
            />

            <span className="text-[9px] font-semibold text-[var(--text)]">
              {product.rating}
            </span>
          </div>

          <span className="text-[8px] text-[var(--text-tertiary)]">
            {product.reviews} reviews
          </span>
        </div>

        {/* Price */}

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[12px] font-bold text-[var(--text)]">
            {product.price}
          </span>

          {product.oldPrice && (
            <span className="text-[9px] text-[var(--text-tertiary)] line-through">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}