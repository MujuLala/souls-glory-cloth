"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import AmbientBackground from "@/components/ui/ambient-background";

const collections = [
  {
    title: "New Arrivals",
    description: "Fresh silhouettes and refined everyday pieces.",
    image: "/images/collections/new-arrivals.jpg",
    href: "/collections/new-arrivals",
    tag: "New",
    size: "large",
  },
  {
    title: "Wedding Edit",
    description: "Made for celebrations and unforgettable moments.",
    image: "/images/collections/wedding.jpg",
    href: "/collections/wedding",
    tag: "Featured",
    size: "small",
  },
  {
    title: "Premium Essentials",
    description: "Timeless pieces designed for everyday confidence.",
    image: "/images/collections/premium.jpg",
    href: "/collections/premium",
    tag: "Premium",
    size: "small",
  },
];

export default function Collections() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-[6vw] max-lg:py-20 max-sm:py-14">
      {/* =====================================================
          SAME AMBIENT BACKGROUND AS HERO
      ====================================================== */}

      <AmbientBackground />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container className="relative z-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-[2.5vw] flex items-end justify-between gap-6 max-lg:mb-8 max-sm:flex-col max-sm:items-start">
          <div className="max-w-[650px]">
            {/* Eyebrow */}

            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_0_20px_rgba(229,30,50,0.2)]">
                <Sparkles size={10} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                Explore our world
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-[3vw] font-bold leading-[0.98] tracking-[-0.055em] text-[var(--text)] max-lg:text-[40px] max-sm:text-[32px]">
              Collections made
              <br />
              <span className="text-[var(--primary)]">
                for every moment.
              </span>
            </h2>

            {/* Description */}

            <p className="mt-4 max-w-[540px] text-[13px] leading-[1.65] text-[var(--text-secondary)]">
              Discover curated collections designed around modern style,
              traditional craftsmanship and your personal way of dressing.
            </p>
          </div>

          {/* View All */}

          <Button
            href="/collections"
            variant="secondary"
            className="h-[42px] px-4 text-[11px]"
          >
            View All Collections
            <ArrowRight size={13} />
          </Button>
        </div>

        {/* =====================================================
            COLLECTION GRID
        ====================================================== */}

        <div className="grid grid-cols-12 gap-[1vw] max-lg:gap-3">
          {/* =================================================
              LARGE COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[0]}
            className="col-span-7 row-span-2 min-h-[38vw] max-lg:col-span-12 max-lg:min-h-[500px] max-sm:min-h-[390px]"
          />

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[1]}
            className="col-span-5 min-h-[18.5vw] max-lg:col-span-6 max-lg:min-h-[300px] max-sm:col-span-12 max-sm:min-h-[260px]"
          />

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[2]}
            className="col-span-5 min-h-[18.5vw] max-lg:col-span-6 max-lg:min-h-[300px] max-sm:col-span-12 max-sm:min-h-[260px]"
          />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   COLLECTION CARD
========================================================= */

function CollectionCard({
  collection,
  className = "",
}: {
  collection: (typeof collections)[number];
  className?: string;
}) {
  return (
    <Link
      href={collection.href}
      className={`
        group
        relative
        overflow-hidden
        rounded-[1.1vw]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        ${className}
      `}
    >
      {/* ===================================================
          IMAGE
      ==================================================== */}

      <Image
        src={collection.image}
        alt={collection.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.045]
        "
      />

      {/* ===================================================
          IMAGE OVERLAY
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/85
          via-black/25
          to-black/5
        "
      />

      {/* ===================================================
          HOVER GLOW
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_100%,rgba(229,30,50,0.18),transparent_55%)]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* ===================================================
          TOP TAG
      ==================================================== */}

      <div className="absolute left-[1vw] top-[1vw] max-lg:left-4 max-lg:top-4">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-white/15
            bg-black/30
            px-[0.7vw]
            py-[0.35vw]
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-white
            backdrop-blur-xl
            max-lg:px-3
            max-lg:py-1.5
          "
        >
          {collection.tag}
        </span>
      </div>

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <div className="absolute bottom-0 left-0 right-0 p-[1.25vw] max-lg:p-5">
        <div className="flex items-end justify-between gap-5">
          {/* Text */}

          <div className="max-w-[430px]">
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white/55">
              Soul&apos;s Glory
            </p>

            <h3 className="text-[1.65vw] font-bold leading-[1] tracking-[-0.045em] text-white max-lg:text-[25px] max-sm:text-[22px]">
              {collection.title}
            </h3>

            <p className="mt-2 max-w-[380px] text-[11px] leading-[1.5] text-white/65">
              {collection.description}
            </p>
          </div>

          {/* Arrow */}

          <div
            className="
              flex
              h-[3vw]
              w-[3vw]
              min-h-[42px]
              min-w-[42px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:scale-105
              max-lg:h-11
              max-lg:w-11
              max-sm:h-10
              max-sm:w-10
            "
          >
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}