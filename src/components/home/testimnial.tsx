"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Quote,
  Star,
  ArrowUpRight,
} from "lucide-react";

import Container from "@/components/ui/container";

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  text: string;
  product: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Verified Customer",
    initials: "AK",
    text: "The stitching quality is honestly exceptional. The fit was exactly how I wanted it and the finishing looked beautiful.",
    product: "Custom Embroidered Kurta",
    rating: 5,
  },
  {
    name: "Hamza Ahmed",
    role: "Verified Customer",
    initials: "HA",
    text: "I ordered a custom kurta for an event and everything from the measurements to delivery was handled perfectly.",
    product: "Premium Signature Kurta",
    rating: 5,
  },
  {
    name: "Sana Malik",
    role: "Verified Customer",
    initials: "SM",
    text: "Finally a tailoring experience that feels premium. The details, fabric and fitting were all exactly on point.",
    product: "Luxury Women's Collection",
    rating: 5,
  },
  {
    name: "Usman Raza",
    role: "Verified Customer",
    initials: "UR",
    text: "The team understood exactly what I wanted. My outfit looked even better than I imagined.",
    product: "Bespoke Men's Kurta",
    rating: 5,
  },
  {
    name: "Maham Ali",
    role: "Verified Customer",
    initials: "MA",
    text: "Beautiful craftsmanship and a very smooth ordering experience. I will definitely be ordering again.",
    product: "Festive Collection",
    rating: 5,
  },
  {
    name: "Bilal Hussain",
    role: "Verified Customer",
    initials: "BH",
    text: "The fitting was perfect without needing any alterations. The finishing really shows the attention to detail.",
    product: "Made-to-Measure Kurta",
    rating: 5,
  },
  {
    name: "Zoya Shah",
    role: "Verified Customer",
    initials: "ZS",
    text: "The whole experience feels different from ordinary tailoring. Everything feels thoughtful and premium.",
    product: "Signature Collection",
    rating: 5,
  },
  {
    name: "Fahad Mir",
    role: "Verified Customer",
    initials: "FM",
    text: "Excellent quality, clean stitching and great communication throughout the process. Highly recommended.",
    product: "Custom Men's Wear",
    rating: 5,
  },
];

const firstRow = testimonials.slice(0, 4);
const secondRow = testimonials.slice(4);

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        w-[285px]
        shrink-0
        overflow-hidden
        rounded-[18px]
        bg-[var(--surface)]
        p-4
        shadow-[0_12px_35px_rgba(0,0,0,0.045)]
        transition-all
        duration-500
        hover:bg-[var(--surface-hover)]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]

        sm:w-[320px]
        sm:rounded-[18px]
        sm:p-5

        lg:w-[340px]
        lg:rounded-[20px]
        lg:p-5
      "
    >
      {/* Decorative quote */}

      <div
        className="
          pointer-events-none
          absolute
          right-4
          top-3
          opacity-[0.035]
          transition-opacity
          duration-500
          group-hover:opacity-[0.08]
        "
      >
        <Quote
          className="h-14 w-14 sm:h-16 sm:w-16"
          strokeWidth={1}
        />
      </div>

      {/* =================================================
          TOP
      ================================================== */}

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {/* Avatar */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--bg-secondary)]
              text-[12px]
              font-semibold
              text-[var(--foreground)]

              sm:h-11
              sm:w-11
              sm:text-sm
            "
          >
            {testimonial.initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h3
                className="
                  truncate
                  text-[13px]
                  font-semibold
                  tracking-[-0.01em]
                  text-[var(--foreground)]

                  sm:text-sm
                "
              >
                {testimonial.name}
              </h3>

              <BadgeCheck
                className="
                  h-3.5
                  w-3.5
                  shrink-0
                  text-[var(--primary)]

                  sm:h-4
                  sm:w-4
                "
                strokeWidth={2.2}
              />
            </div>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[var(--muted-foreground)]

                sm:text-[11px]
              "
            >
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Rating */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-0.5
            rounded-full
            bg-[var(--bg-secondary)]
            px-1.5
            py-1

            sm:px-2
          "
        >
          {Array.from({
            length: testimonial.rating,
          }).map((_, index) => (
            <Star
              key={index}
              className="
                h-2.5
                w-2.5
                fill-current
                text-[var(--primary)]

                sm:h-3
                sm:w-3
              "
              strokeWidth={1.5}
            />
          ))}
        </div>
      </div>

      {/* =================================================
          DIVIDER
      ================================================== */}

      <div className="my-4 flex items-center gap-2 sm:my-5">
        <span className="h-px w-8 bg-[var(--primary)]/50" />
        <span className="h-px flex-1 bg-[var(--border)]/50" />
      </div>

      {/* =================================================
          REVIEW
      ================================================== */}

      <div className="relative z-10 min-h-[128px] sm:min-h-[118px]">
        <Quote
          className="
            mb-2.5
            h-4
            w-4
            text-[var(--primary)]

            sm:mb-3
            sm:h-5
            sm:w-5
          "
          strokeWidth={1.8}
        />

        <p
          className="
            text-[13px]
            leading-[1.65]
            tracking-[-0.01em]
            text-[var(--foreground)]/80

            sm:text-[14px]
            lg:text-[15px]
          "
        >
          “{testimonial.text}”
        </p>
      </div>

      {/* =================================================
          PRODUCT
      ================================================== */}

      <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
        <div className="min-w-0">
          <p
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[var(--muted-foreground)]

              sm:text-[9px]
            "
          >
            Ordered
          </p>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              font-medium
              text-[var(--foreground)]

              sm:text-[11px]
            "
          >
            {testimonial.product}
          </p>
        </div>

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--bg-secondary)]
            transition-all
            duration-300
            group-hover:bg-[var(--primary)]
            group-hover:text-white
          "
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  /*
   * Three copies create enough content for
   * a smooth infinite marquee.
   */
  const duplicated = [...items, ...items, ...items];

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        py-2

        sm:py-3
      "
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <motion.div
        className="
          flex
          w-max
          gap-3

          sm:gap-4
        "
        animate={{
          x: reverse
            ? ["-33.333%", "0%"]
            : ["0%", "-33.333%"],
        }}
        transition={{
          duration: reverse ? 42 : 38,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-16

        sm:py-20

        md:py-24

        lg:py-[6vw]
      "
    >
      {/* =================================================
          HEADING
      ================================================== */}

      <Container>
        <div
          className="
            mb-10
            grid
            gap-8

            sm:mb-12

            lg:mb-[4vw]
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
            lg:gap-[5vw]
          "
        >
          {/* =================================================
              LEFT — EYEBROW + DESCRIPTION
          ================================================== */}

          <div className="max-w-[460px]">
            {/* Shared eyebrow style */}

            <div className="mb-3 flex items-center gap-2">
              <span
                className="
                  h-[5px]
                  w-[5px]
                  shrink-0
                  rounded-full
                  bg-[var(--primary)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--primary)]
                "
              >
                Loved by our customers
              </span>
            </div>

            {/* Description */}

            <p
              className="
                max-w-[440px]
                text-left
                text-[13px]
                leading-[1.7]
                text-[var(--muted-foreground)]

                sm:text-[14px]

                md:text-[15px]
              "
            >
              Every piece is made around the person wearing it.
              Here is what our customers have to say about their
              Soul&apos;s Glory Cloth experience.
            </p>
          </div>

          {/* =================================================
              RIGHT — HEADING
          ================================================== */}

          <div className="lg:flex lg:justify-end">
            <h2
              className="
                max-w-[850px]
                text-left
                text-[3.2vw]
                font-[100]
                uppercase
                leading-[0.92]
                tracking-[-0.055em]
                text-[var(--text)]

                max-[1100px]:text-[42px]
                max-lg:text-[38px]
                max-md:text-[36px]
                max-sm:text-[30px]

                lg:text-right
              "
            >
              Made with care.
              <br />
              Worn with confidence.
            </h2>
          </div>
        </div>
      </Container>

      {/* =================================================
          MARQUEE ROWS
          Transparent left + right masks
      ================================================== */}

      <div className="space-y-1 sm:space-y-2">
        <MarqueeRow items={firstRow} />

        
      </div>

      {/* =================================================
          TRUST STATS
      ================================================== */}

      <Container>
        <div
          className="
            mx-auto
            mt-10
            flex
            max-w-[850px]
            flex-col
            items-center
            justify-center
            gap-6
            pt-7

            sm:mt-12
            sm:flex-row
            sm:gap-10
            sm:pt-8

            lg:mt-[4vw]
          "
        >
          {/* Rating */}

          <div className="text-center">
            <p
              className="
                text-xl
                font-semibold
                tracking-[-0.03em]
                text-[var(--foreground)]
              "
            >
              4.9/5
            </p>

            <p
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[var(--muted-foreground)]
              "
            >
              Average Rating
            </p>
          </div>

          <div
            className="
              hidden
              h-8
              w-px
              bg-[var(--border)]

              sm:block
            "
          />

          {/* Customers */}

          <div className="text-center">
            <p
              className="
                text-xl
                font-semibold
                tracking-[-0.03em]
                text-[var(--foreground)]
              "
            >
              1,200+
            </p>

            <p
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[var(--muted-foreground)]
              "
            >
              Happy Customers
            </p>
          </div>

          <div
            className="
              hidden
              h-8
              w-px
              bg-[var(--border)]

              sm:block
            "
          />

          {/* Handcrafted */}

          <div className="text-center">
            <p
              className="
                text-xl
                font-semibold
                tracking-[-0.03em]
                text-[var(--foreground)]
              "
            >
              100%
            </p>

            <p
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[var(--muted-foreground)]
              "
            >
              Handcrafted
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}