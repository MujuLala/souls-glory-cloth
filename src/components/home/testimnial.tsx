
"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Quote,
  Star,
  ArrowUpRight,
  Sparkles,
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="
        group
        relative
        w-[340px]
        shrink-0
        overflow-hidden
        rounded-[1.2vw]
        border
        border-[var(--border)]
        bg-[var(--dropdown-bg)]
        p-[1.15vw]
        shadow-[0_1.5vw_4vw_rgba(0,0,0,0.04)]
        transition-all
        duration-500
        hover:border-[var(--primary)]
        hover:shadow-[0_1.8vw_5vw_rgba(0,0,0,0.08)]
        sm:w-[390px]
        md:p-[1.35vw]
      "
    >
      {/* Decorative quote */}
      <div
        className="
          absolute
          right-[1vw]
          top-[0.8vw]
          opacity-[0.035]
          transition-opacity
          duration-500
          group-hover:opacity-[0.08]
        "
      >
        <Quote className="h-16 w-16" strokeWidth={1} />
      </div>

      {/* Top */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-sm
              font-semibold
              text-[var(--foreground)]
            "
          >
            {testimonial.initials}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold tracking-[-0.01em] text-[var(--foreground)]">
                {testimonial.name}
              </h3>

              <BadgeCheck
                className="h-4 w-4 text-[var(--primary)]"
                strokeWidth={2.2}
              />
            </div>

            <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star
              key={index}
              className="h-3 w-3 fill-current text-[var(--primary)]"
              strokeWidth={1.5}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-[var(--border)]" />

      {/* Review */}
      <div className="relative z-10 min-h-[112px]">
        <Quote
          className="mb-3 h-5 w-5 text-[var(--primary)]"
          strokeWidth={1.8}
        />

        <p className="text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--foreground)]/80">
          “{testimonial.text}”
        </p>
      </div>

      {/* Product */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Ordered
          </p>

          <p className="mt-1 text-[11px] font-medium text-[var(--foreground)]">
            {testimonial.product}
          </p>
        </div>

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--surface)]
            transition-all
            duration-300
            group-hover:border-[var(--primary)]
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
    Duplicate the cards so the animation can loop seamlessly.
    The group itself pauses when the user hovers anywhere over the row.
  */
  const duplicated = [...items, ...items, ...items];

  return (
    <div
      className="
        group/marquee
        relative
        overflow-hidden
        py-3
      "
    >
      {/* Left fade */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          h-full
          w-[8vw]
          bg-gradient-to-r
          from-[var(--background)]
          to-transparent
        "
      />

      {/* Right fade */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-20
          h-full
          w-[8vw]
          bg-gradient-to-l
          from-[var(--background)]
          to-transparent
        "
      />

      <motion.div
        className="
          flex
          w-max
          gap-4
          group-hover/marquee:[animation-play-state:paused]
        "
        animate={{
          x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"],
        }}
        transition={{
          duration: 38,
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
        bg-[var(--background)]
        py-[8vw]
        sm:py-[7vw]
        md:py-[6vw]
      "
    >
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-[4vw] max-w-[760px] text-center">
          {/* Eyebrow */}
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-3.5
              py-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[var(--muted-foreground)]
            "
          >
            <Sparkles
              className="h-3.5 w-3.5 text-[var(--primary)]"
              strokeWidth={1.8}
            />
            Loved by our customers
          </div>

          <h2
            className="
              text-[clamp(2.4rem,5vw,5.5rem)]
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]
              text-[var(--foreground)]
            "
          >
            Made with care.
            <br />
            <span className="text-[var(--muted-foreground)]">
              Worn with confidence.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-[560px]
              text-sm
              leading-7
              text-[var(--muted-foreground)]
              md:text-base
            "
          >
            Every piece is made around the person wearing it. Here is what our
            customers have to say about their Soul&apos;s Glory Cloth
            experience.
          </p>
        </div>
      </Container>

      {/* Marquees intentionally extend outside the Container */}
      <div className="space-y-2">
        <MarqueeRow items={firstRow} />
        <MarqueeRow items={secondRow} reverse />
      </div>

      <Container>
        {/* Bottom trust stats */}
        <div
          className="
            mx-auto
            mt-[4vw]
            flex
            max-w-[850px]
            flex-col
            items-center
            justify-center
            gap-5
            border-t
            border-[var(--border)]
            pt-7
            sm:flex-row
            sm:gap-10
          "
        >
          <div className="text-center">
            <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              4.9/5
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
              Average Rating
            </p>
          </div>

          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />

          <div className="text-center">
            <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              1,200+
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
              Happy Customers
            </p>
          </div>

          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />

          <div className="text-center">
            <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              100%
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
              Handcrafted
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
