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
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-[6vw]

        max-xl:py-[7vw]
        max-lg:py-20
        max-md:py-16
        max-sm:py-14
      "
    >
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
            gap-[3vw]

            max-xl:mb-[3.5vw]

            max-lg:mb-8
            max-lg:gap-8

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

            <div
              className="
                mb-[1vw]
                flex
                items-center
                gap-[0.65vw]

                max-lg:mb-3
                max-lg:gap-2.5
              "
            >
              <span
                className="
                  flex
                  h-[1.35vw]
                  w-[1.35vw]
                  min-h-5
                  min-w-5
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
                  className="
                    h-[0.65vw]
                    w-[0.65vw]

                    max-lg:h-2.5
                    max-lg:w-2.5
                  "
                />
              </span>

              <span
                className="
                  text-[0.62vw]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]

                  max-xl:text-[9px]
                  max-lg:text-[10px]
                "
              >
                Explore our world
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <h2
              className="
                max-w-[58vw]

                text-[3.2vw]
                font-semibold
                capitalize
                leading-[1]
                tracking-[-0.045em]

                text-hero-heading

                max-[1100px]:text-[42px]

                max-lg:max-w-[700px]
                max-lg:text-[38px]

                max-md:max-w-full
                max-md:text-[36px]

                max-sm:text-[30px]
              "
            >
              Collections Made For Every Moment.
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-[1.1vw]
                max-w-[42vw]

                text-[0.9vw]
                leading-[1.7]

                text-[var(--text-secondary)]

                max-xl:max-w-[560px]
                max-xl:text-[13px]

                max-lg:mt-4
                max-lg:max-w-[650px]
                max-lg:text-[14px]

                max-sm:text-[13px]
              "
            >
              Discover curated collections designed around modern style,
              traditional craftsmanship and your personal way of dressing.
            </p>
          </div>

          {/* =================================================
              VIEW ALL COLLECTIONS
          ================================================== */}

          <div className="shrink-0 max-md:self-start">
            <Button
              href="/collections"
              variant="primary"
              size="md"
              className="
                group
                rounded-full

                px-[1.35vw]

                text-[0.72vw]

                hover-animate-stitching

                max-xl:px-5
                max-xl:text-[10px]

                max-lg:px-5
                max-lg:text-[11px]

                max-sm:px-4
                max-sm:text-[10px]
              "
            >
              <span>View All Collections</span>

              <ArrowRight
                className="
                  h-[0.85vw]
                  w-[0.85vw]

                  transition-transform
                  duration-300
                  ease-out

                  group-hover:translate-x-[0.2vw]

                  max-lg:h-3.5
                  max-lg:w-3.5
                "
              />
            </Button>
          </div>
        </div>

        {/* =====================================================
            COLLECTION GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-12
            gap-[1vw]

            max-xl:gap-[1.2vw]

            max-lg:gap-3
          "
        >
          {/* =================================================
              LARGE COLLECTION
          ================================================== */}

          <CollectionCard
            collection={collections[0]}
            className="
              col-span-7
              row-span-2
              min-h-[38vw]

              max-xl:min-h-[40vw]

              max-lg:col-span-12
              max-lg:min-h-[500px]

              max-md:min-h-[440px]

              max-sm:min-h-[390px]
            "
          />

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          {collections[1] && (
            <CollectionCard
              collection={collections[1]}
              className="
                col-span-5
                min-h-[18.5vw]

                max-xl:min-h-[19vw]

                max-lg:col-span-6
                max-lg:min-h-[300px]

                max-md:min-h-[280px]

                max-sm:col-span-12
                max-sm:min-h-[260px]
              "
            />
          )}

          {/* =================================================
              SMALL COLLECTION
          ================================================== */}

          {collections[2] && (
            <CollectionCard
              collection={collections[2]}
              className="
                col-span-5
                min-h-[18.5vw]

                max-xl:min-h-[19vw]

                max-lg:col-span-6
                max-lg:min-h-[300px]

                max-md:min-h-[280px]

                max-sm:col-span-12
                max-sm:min-h-[260px]
              "
            />
          )}
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

        
    

        bg-[var(--surface)]

        transition-colors
        duration-500

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
          duration-[900ms]
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
          SUBTLE HOVER OVERLAY
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-black/0

          transition-colors
          duration-500

          group-hover:bg-black/[0.08]
        "
      />

      {/* ===================================================
          TOP TAG
      ==================================================== */}

      <div
        className="
          absolute
          left-[1vw]
          top-[1vw]

          max-lg:left-4
          max-lg:top-4
        "
      >
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

            text-[0.58vw]
            font-semibold
            uppercase
            tracking-[0.1em]

            text-white

            backdrop-blur-xl

            max-xl:text-[8px]

            max-lg:px-3
            max-lg:py-1.5
            max-lg:text-[9px]
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

          max-xl:p-[1.5vw]

          max-lg:p-5

          max-sm:p-4
        "
      >
        <div
          className="
            flex
            items-end
            justify-between

            gap-[2vw]

            max-lg:gap-5
          "
        >
          {/* =================================================
              TEXT
          ================================================== */}

          <div
            className="
              max-w-[30vw]

              max-lg:max-w-[430px]
            "
          >
            <p
              className="
                mb-[0.35vw]

                text-[0.58vw]
                font-medium
                uppercase
                tracking-[0.12em]

                text-white/55

                max-xl:text-[8px]

                max-lg:mb-1
                max-lg:text-[9px]
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

                max-xl:text-[25px]

                max-lg:text-[25px]

                max-sm:text-[22px]
              "
            >
              {collection.title}
            </h3>

            <p
              className="
                mt-[0.6vw]

                max-w-[26vw]

                text-[0.68vw]
                leading-[1.5]

                text-white/65

                max-xl:max-w-[380px]
                max-xl:text-[10px]

                max-lg:mt-2
                max-lg:text-[11px]

                max-sm:text-[10px]
              "
            >
              {collection.description}
            </p>
          </div>

          {/* =================================================
              ARROW BUTTON
          ================================================== */}

          <div
            className="
              flex

              h-[3vw]
              w-[3vw]

              min-h-10
              min-w-10

              shrink-0

              items-center
              justify-center

              rounded-full

              bg-primary
              text-[var(--primary-contrast)]

              transition-all
              duration-300
              ease-out

              group-hover:translate-x-[0.25vw]
              group-hover:scale-105

              max-xl:h-11
              max-xl:w-11

              max-sm:h-10
              max-sm:w-10
            "
          >
            <ArrowRight
              className="
                h-[0.9vw]
                w-[0.9vw]

                max-xl:h-3.5
                max-xl:w-3.5

                max-sm:h-3
                max-sm:w-3
              "
            />
          </div>
        </div>
      </div>
    </Link>
  );
}