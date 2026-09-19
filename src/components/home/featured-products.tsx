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
import { formatMoney } from "@/lib/format";
import type { StorefrontProduct } from "@/types/catalog";

/* =========================================================
   FEATURED PRODUCT SHAPE
========================================================= */

type FeaturedProduct = {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  rating: string;
  reviews: string;
  image: string;
  href: string;
  tag: string;
  sold: string;
};

function toFeatured(product: StorefrontProduct): FeaturedProduct {
  return {
    name: product.name,

    category: product.category ?? "Atelier",

    price: formatMoney(product.salePrice ?? product.price),

    oldPrice:
      product.salePrice || product.compareAtPrice
        ? formatMoney(product.compareAtPrice ?? product.price)
        : "",

    rating: product.rating > 0 ? product.rating.toFixed(1) : "New",

    reviews: String(product.reviewCount),

    image: product.image ?? "",

    href: `/product/${product.slug}`,

    tag:
      product.badge ??
      (product.inStock ? "In Stock" : "Made to Order"),

    sold:
      product.reviewCount > 0
        ? `${product.reviewCount} review${
            product.reviewCount === 1 ? "" : "s"
          }`
        : "Made to measure",
  };
}

/* =========================================================
   FEATURED PRODUCTS
========================================================= */

export default function FeaturedProducts({
  products: sourceProducts,
}: {
  products: StorefrontProduct[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const products = sourceProducts.map(toFeatured);

  if (products.length === 0) {
    return null;
  }

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.78;

    carouselRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-[4.8vw]

        max-xl:py-[5.5vw]
        max-lg:py-16
        max-md:py-14
        max-sm:py-12
      "
    >
      <Container className="relative z-10">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-[2.8vw]
            flex
            items-center
            justify-between
            gap-[3vw]

            max-xl:mb-10
            max-lg:mb-8
            max-md:flex-col
            max-md:items-start
            max-md:gap-6
          "
        >
          {/* ===================================================
              HEADING
          =================================================== */}

          <div
            className="
              min-w-0
              max-w-[65vw]

              max-lg:max-w-[700px]
              max-md:max-w-full
            "
          >
            {/* Eyebrow */}

            <div
              className="
                mb-[0.8vw]
                flex
                items-center
                gap-[0.55vw]

                max-lg:mb-3
                max-lg:gap-2
              "
            >
              <span
                className="
                  flex
                  h-[1.45vw]
                  w-[1.45vw]
                  min-h-[20px]
                  min-w-[20px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[var(--primary-contrast)]

                  max-lg:h-5
                  max-lg:w-5
                "
              >
                <Sparkles
                  size={10}
                  strokeWidth={2}
                />
              </span>

              <span
                className="
                  whitespace-nowrap
                  text-[0.58vw]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]

                  max-lg:text-[10px]
                "
              >
                Glory&apos;s Cloth — Featured
              </span>
            </div>

            {/* Main Heading */}

            <h2
              className="
                whitespace-nowrap
                text-[3.05vw]
                font-semibold
                capitalize
                leading-[0.98]
                tracking-[-0.045em]
                text-hero-heading

                max-[1200px]:text-[40px]
                max-lg:text-[38px]
                max-md:whitespace-normal
                max-md:text-[35px]
                max-sm:text-[29px]
              "
            >
              Signature pieces made around you.
            </h2>
          </div>

          {/* ===================================================
              CONTROLS
          =================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-center
              gap-[0.7vw]

              max-lg:gap-2
              max-md:w-full
              max-md:justify-start
            "
          >
            {/* View All */}

            <Button
              href="/shop"
              variant="primary"
              size="md"
              className="
                hover-animate-stitching
                whitespace-nowrap
                !shadow-none

                h-[2.8vw]
                min-h-[40px]
                px-[1.15vw]
                text-[0.68vw]

                max-lg:h-[42px]
                max-lg:px-4
                max-lg:text-[11px]
              "
            >
              <span className="whitespace-nowrap">
                View All
              </span>

              <ArrowRight
                size={13}
                strokeWidth={2}
              />
            </Button>

            {/* Carousel Controls */}

            <div
              className="
                ml-[0.35vw]
                flex
                shrink-0
                items-center
                gap-[0.4vw]

                max-lg:ml-1
                max-lg:gap-1.5
              "
            >
              {/* Previous */}

              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollCarousel("prev")}
                className="
                  flex
                  h-[2.8vw]
                  w-[2.8vw]
                  min-h-[40px]
                  min-w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-surface
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-200

                  hover:bg-surface-hover
                  hover:text-[var(--text)]

                  max-lg:h-[42px]
                  max-lg:w-[42px]
                "
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.8}
                />
              </button>

              {/* Next */}

              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollCarousel("next")}
                className="
                  flex
                  h-[2.8vw]
                  w-[2.8vw]
                  min-h-[40px]
                  min-w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[var(--primary-contrast)]
                  transition-colors
                  duration-200

                  hover:bg-primary-hover

                  max-lg:h-[42px]
                  max-lg:w-[42px]
                "
              >
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            PRODUCT CAROUSEL
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
            pb-3
            scrollbar-none

            max-lg:gap-3
          "
        >
          {products.map((product) => (
            <ProductCard
              key={`${product.name}-${product.href}`}
              product={product}
            />
          ))}
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
  product: FeaturedProduct;
}) {
  return (
    <article
      className="
        group
        relative
        min-w-[calc(25%-0.75vw)]
        w-[calc(25%-0.75vw)]
        snap-start
        overflow-hidden
        rounded-[1.15vw]
        bg-surface
        transition-transform
        duration-500

        hover:-translate-y-[0.25vw]

        max-lg:min-w-[calc(50%-0.375rem)]
        max-lg:w-[calc(50%-0.375rem)]
        max-lg:rounded-[14px]

        max-sm:min-w-[82vw]
        max-sm:w-[82vw]
      "
    >
      {/* =====================================================
          IMAGE AREA
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[1.15vw]

          max-lg:rounded-[14px]
        "
      >
        <Link
          href={product.href}
          className="
            relative
            block
            aspect-[0.86]
            overflow-hidden
          "
        >
          {/* Product Image */}

          <img
            src={
              product.image ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'/%3E"
            }
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

              group-hover:scale-[1.055]
            "
          />

          {/* Image Overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-black/0
              to-black/5
              opacity-70
              transition-opacity
              duration-500

              group-hover:opacity-90
            "
          />

          {/* Product Tag */}

          <div
            className="
              absolute
              left-[0.9vw]
              top-[0.9vw]
              z-10

              max-lg:left-3
              max-lg:top-3
            "
          >
            <span
              className="
                inline-flex
                whitespace-nowrap
                rounded-full
                bg-black/45
                px-[0.7vw]
                py-[0.38vw]
                text-[0.5vw]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white
                backdrop-blur-xl

                max-lg:px-2.5
                max-lg:py-1.5
                max-lg:text-[8px]
              "
            >
              {product.tag}
            </span>
          </div>
        </Link>

        {/* =====================================================
            WISHLIST
        ====================================================== */}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(event) => event.preventDefault()}
          className="
            absolute
            right-[0.9vw]
            top-[0.9vw]
            z-20

            flex
            h-[2.2vw]
            w-[2.2vw]
            min-h-[32px]
            min-w-[32px]
            shrink-0
            items-center
            justify-center
            rounded-full

            bg-black/40
            text-white
            backdrop-blur-xl

            transition-all
            duration-300

            hover:scale-105
            hover:bg-white
            hover:text-black

            sm:translate-y-[-4px]
            sm:opacity-0
            sm:group-hover:translate-y-0
            sm:group-hover:opacity-100

            max-lg:right-3
            max-lg:top-3
          "
        >
          <Heart
            size={13}
            strokeWidth={1.8}
          />
        </button>

        {/* =====================================================
            VIEW PRODUCT BUTTON
        ====================================================== */}

        <Link
          href={product.href}
          className="
            hover-animate-stitching

            absolute
            bottom-[0.9vw]
            left-[0.9vw]
            z-20

            flex
            h-[2.7vw]
            w-[calc(100%-1.8vw)]
            translate-y-3
            items-center
            justify-center
            gap-2

            rounded-lg
            bg-primary

            whitespace-nowrap
            px-4

            text-[0.58vw]
            font-semibold
            !text-[var(--primary-contrast)]

            opacity-0
            !shadow-none

            transition-all
            duration-300

            group-hover:translate-y-0
            group-hover:opacity-100

            max-lg:bottom-3
            max-lg:left-3
            max-lg:h-[42px]
            max-lg:w-[calc(100%-24px)]
            max-lg:text-[9px]

            max-sm:hidden
          "
        >
          <span className="whitespace-nowrap">
            View Product
          </span>

          <ArrowRight
            size={11}
            strokeWidth={2}
          />
        </Link>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <div
        className="
          relative
          px-[1.15vw]
          pb-[1.2vw]
          pt-[0.95vw]

          max-lg:px-4
          max-lg:pb-5
          max-lg:pt-4
        "
      >
        {/* Category */}

        <div className="mb-[0.35vw] max-lg:mb-1">
          <span
            className="
              text-[0.48vw]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-primary

              max-lg:text-[8px]
            "
          >
            {product.category}
          </span>
        </div>

        {/* Product Name */}

        <Link
          href={product.href}
          className="
            block
            truncate
            whitespace-nowrap
            text-[0.95vw]
            font-semibold
            leading-[1.25]
            tracking-[-0.025em]
            text-[var(--text)]
            transition-colors
            duration-200

            hover:text-primary

            max-lg:text-[14px]
          "
        >
          {product.name}
        </Link>

        {/* =====================================================
            PRICE + RATING
        ====================================================== */}

        <div
          className="
            mt-[0.8vw]
            flex
            min-h-[1.6vw]
            items-center
            justify-between
            gap-3

            max-lg:mt-3
            max-lg:min-h-6
          "
        >
          {/* Price */}

          <div
            className="
              flex
              min-w-0
              items-baseline
              gap-[0.5vw]

              max-lg:gap-2
            "
          >
            <span
              className="
                whitespace-nowrap
                text-[1vw]
                font-bold
                tracking-[-0.03em]
                text-[var(--text)]

                max-lg:text-[15px]
              "
            >
              {product.price}
            </span>

            {product.oldPrice && (
              <span
                className="
                  whitespace-nowrap
                  text-[0.55vw]
                  font-medium
                  text-[var(--text-tertiary)]
                  line-through

                  max-lg:text-[9px]
                "
              >
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* Rating */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-[0.3vw]
              rounded-full
              bg-[var(--bg-secondary)]
              px-[0.55vw]
              py-[0.3vw]

              max-lg:gap-1.5
              max-lg:px-2
              max-lg:py-1
            "
          >
            <Star
              size={9}
              fill="currentColor"
              className="text-primary"
            />

            <span
              className="
                whitespace-nowrap
                text-[0.55vw]
                font-bold
                text-[var(--text)]

                max-lg:text-[9px]
              "
            >
              {product.rating}
            </span>

            <span
              className="
                whitespace-nowrap
                text-[0.5vw]
                text-[var(--text-tertiary)]

                max-lg:text-[8px]
              "
            >
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* =====================================================
            BOTTOM META
        ====================================================== */}

        <div
          className="
            mt-[0.7vw]
            flex
            items-center
            justify-between
            gap-3

            text-[0.47vw]
            font-medium
            uppercase
            tracking-[0.08em]
            text-[var(--text-tertiary)]

            max-lg:mt-2.5
            max-lg:text-[8px]
          "
        >
          <span className="truncate">
            {product.sold}
          </span>

          <span className="shrink-0">
            Made to measure
          </span>
        </div>
      </div>
    </article>
  );
}