"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export type HomeCollectionItem = {
  title: string;
  description: string;
  image: string;
  href: string;
  tag: string;
};

/* Local placeholder art used until a collection has its own
   cover image uploaded in the CMS. */
const fallbackImages = [
  "/images/collections/new-arrivals.jpg",
  "/images/collections/wedding.jpg",
  "/images/collections/premium.jpg",
];

export default function Collections({
  collections,
}: {
  collections: HomeCollectionItem[];
}) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-transparent py-[6vw] max-lg:py-20 max-sm:py-14">
      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container className="relative z-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div
          className="
            mb-[2.8vw]
            flex
            items-end
            justify-between
            gap-8

            max-lg:mb-8

            max-md:flex-col
            max-md:items-start
            max-md:gap-6
          "
        >
          {/* =================================================
              HEADER CONTENT
          ================================================== */}

          <div className="min-w-0">
            {/* EYEBROW */}

            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                "
              >
                <Sparkles size={10} />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                "
              >
                Explore our world
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                whitespace-nowrap
                text-[3.2vw]
                font-[100]
                uppercase
                leading-[0.95]
                tracking-[-0.055em]
                text-[var(--text)]

                max-[1100px]:text-[42px]
                max-lg:text-[38px]
                max-md:whitespace-normal
                max-md:text-[36px]
                max-sm:text-[30px]
              "
            >
              Collections made for every moment.
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-[650px]
                text-[13px]
                leading-[1.7]
                text-[var(--text-secondary)]

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              Discover curated collections designed around modern style,
              traditional craftsmanship and your personal way of dressing.
            </p>
          </div>

          {/* =================================================
              VIEW ALL BUTTON
          ================================================== */}

          <Button
            href="/collections"
            variant="secondary"
            className="
              group
              h-11
              shrink-0
              rounded-full
              border-[var(--border)]
              px-5
              text-[11px]
              font-medium
              transition-all
              duration-300

              hover:border-[var(--text-secondary)]
              hover:bg-[var(--surface-hover)]

              max-md:self-start
            "
          >
            View All Collections

            <ArrowRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
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
            className="
              col-span-7
              row-span-2
              min-h-[38vw]

              max-lg:col-span-12
              max-lg:min-h-[500px]

              max-sm:min-h-[390px]
            "
          />

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[1]}
            className="
              col-span-5
              min-h-[18.5vw]

              max-lg:col-span-6
              max-lg:min-h-[300px]

              max-sm:col-span-12
              max-sm:min-h-[260px]
            "
          />

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[2]}
            className="
              col-span-5
              min-h-[18.5vw]

              max-lg:col-span-6
              max-lg:min-h-[300px]

              max-sm:col-span-12
              max-sm:min-h-[260px]
            "
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
  collection: HomeCollectionItem;
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

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-[1.25vw]

          max-lg:p-5
        "
      >
        <div className="flex items-end justify-between gap-5">
          {/* TEXT */}

          <div className="max-w-[430px]">
            <p
              className="
                mb-1
                text-[9px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-white/55
              "
            >
              Soul&apos;s Glory
            </p>

            <h3
              className="
                text-[1.65vw]
                font-bold
                leading-[1]
                tracking-[-0.045em]
                text-white

                max-lg:text-[25px]
                max-sm:text-[22px]
              "
            >
              {collection.title}
            </h3>

            <p
              className="
                mt-2
                max-w-[380px]
                text-[11px]
                leading-[1.5]
                text-white/65
              "
            >
              {collection.description}
            </p>
          </div>

          {/* ARROW */}

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