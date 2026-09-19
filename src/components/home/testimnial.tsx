"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

import Container from "@/components/ui/container";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  text: string;
  product: string;
  rating: number;
};

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

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
    text: "Excellent quality, clean stitching and great communication throughout the process.",
    product: "Custom Men's Wear",
    rating: 5,
  },
];

/* -------------------------------------------------------------------------- */
/* TESTIMONIAL CARD                                                           */
/* -------------------------------------------------------------------------- */

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        hover-animate-stitching
        group
        relative
        flex
        w-[24vw]
        min-w-[300px]
        max-w-[380px]
        shrink-0
        flex-col
        overflow-hidden
        rounded-[1vw]
        bg-surface
        p-[1.2vw]

        transition-colors
        duration-300

        hover:bg-surface-hover

        max-xl:w-[28vw]
        max-lg:w-[38vw]
        max-lg:min-w-[290px]
        max-lg:rounded-[14px]
        max-lg:p-4

        max-md:w-[72vw]

        max-sm:w-[84vw]
        max-sm:min-w-[270px]
      "
    >
      {/* ================================================================
          TOP
      ================================================================= */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-[1vw]
        "
      >
        {/* Customer */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-[0.65vw]

            max-lg:gap-2.5
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-[2.65vw]
              w-[2.65vw]
              min-h-[40px]
              min-w-[40px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--bg-secondary)]
              text-[0.62vw]
              font-semibold
              tracking-[-0.02em]
              text-[var(--text)]

              max-lg:h-10
              max-lg:w-10
              max-lg:text-[11px]
            "
          >
            {testimonial.initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-[0.25vw]">
              <h3
                className="
                  truncate
                  text-[0.68vw]
                  font-semibold
                  tracking-[-0.02em]
                  text-[var(--text)]

                  max-lg:text-[12px]
                "
              >
                {testimonial.name}
              </h3>

              <BadgeCheck
                className="
                  h-[0.7vw]
                  w-[0.7vw]
                  shrink-0
                  text-primary

                  max-lg:h-3.5
                  max-lg:w-3.5
                "
                strokeWidth={2}
              />
            </div>

            <p
              className="
                mt-[0.15vw]
                text-[0.42vw]
                text-[var(--text-secondary)]

                max-lg:mt-0.5
                max-lg:text-[8px]
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
            gap-[0.18vw]
            rounded-full
            bg-[var(--bg-secondary)]
            px-[0.5vw]
            py-[0.3vw]

            max-lg:gap-0.5
            max-lg:px-2
            max-lg:py-1
          "
        >
          {Array.from({
            length: testimonial.rating,
          }).map((_, index) => (
            <Star
              key={index}
              className="
                h-[0.48vw]
                w-[0.48vw]
                fill-current
                text-primary

                max-lg:h-2.5
                max-lg:w-2.5
              "
              strokeWidth={1.4}
            />
          ))}
        </div>
      </div>

      {/* ================================================================
          REVIEW
      ================================================================= */}

      <div
        className="
          relative
          z-10
          mt-[1.25vw]
          min-h-[8.8vw]
          flex-1

          max-lg:mt-4
          max-lg:min-h-[120px]
        "
      >
        {/* Quote */}

        <div
          className="
            mb-[0.7vw]
            flex
            h-[1.65vw]
            w-[1.65vw]
            min-h-[24px]
            min-w-[24px]
            items-center
            justify-center
            rounded-full
            bg-primary
            text-[var(--primary-contrast)]

            max-lg:mb-2.5
            max-lg:h-6
            max-lg:w-6
          "
        >
          <Quote
            className="
              h-[0.68vw]
              w-[0.68vw]

              max-lg:h-3
              max-lg:w-3
            "
            strokeWidth={1.8}
          />
        </div>

        <p
          className="
            max-w-[21vw]
            text-[0.7vw]
            leading-[1.65]
            tracking-[-0.008em]
            text-[var(--text-secondary)]

            max-xl:max-w-[24vw]
            max-lg:max-w-[330px]
            max-lg:text-[13px]

            max-sm:text-[12px]
          "
        >
          “{testimonial.text}”
        </p>
      </div>

      {/* ================================================================
          PRODUCT
      ================================================================= */}

      <div
        className="
          relative
          z-10
          mt-[1vw]
          flex
          items-end
          justify-between
          gap-[1vw]

          max-lg:mt-4
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[0.4vw]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[var(--text-secondary)]

              max-lg:text-[7px]
            "
          >
            Ordered
          </p>

          <p
            className="
              mt-[0.25vw]
              truncate
              text-[0.54vw]
              font-semibold
              text-[var(--text)]

              max-lg:mt-1
              max-lg:text-[10px]
            "
          >
            {testimonial.product}
          </p>
        </div>

        <div
          className="
            flex
            h-[2vw]
            w-[2vw]
            min-h-[31px]
            min-w-[31px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--bg-secondary)]
            text-[var(--text-secondary)]
            transition-colors
            duration-300

            group-hover:bg-primary
            group-hover:text-[var(--primary-contrast)]

            max-lg:h-8
            max-lg:w-8
          "
        >
          <ArrowUpRight
            className="
              h-[0.7vw]
              w-[0.7vw]

              max-lg:h-3.5
              max-lg:w-3.5
            "
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Decorative quote */}

      <Quote
        className="
          pointer-events-none
          absolute
          right-[1vw]
          top-[0.8vw]
          h-[4vw]
          w-[4vw]
          text-primary
          opacity-[0.035]
          transition-opacity
          duration-300

          group-hover:opacity-[0.07]

          max-lg:right-3
          max-lg:top-3
          max-lg:h-14
          max-lg:w-14
        "
        strokeWidth={1}
      />
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* MARQUEE                                                                    */
/* -------------------------------------------------------------------------- */

function TestimonialsMarquee() {
  /*
   * Duplicate the complete set so the row can
   * continuously loop without an empty gap.
   */

  const duplicated = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        py-[0.5vw]

        max-lg:py-1.5
      "
    >
      {/* Left fade */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          top-0
          z-20
          w-[7vw]
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
          bottom-0
          right-0
          top-0
          z-20
          w-[7vw]
          bg-gradient-to-l
          from-[var(--background)]
          to-transparent
        "
      />

      <motion.div
        className="
          flex
          w-max
          gap-[0.9vw]

          max-lg:gap-3
        "
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          duration: 48,
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

/* -------------------------------------------------------------------------- */
/* MAIN                                                                       */
/* -------------------------------------------------------------------------- */

export default function Testimonials() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-[6vw]

        max-xl:py-[7vw]
        max-lg:py-16
        max-md:py-14
        max-sm:py-12
      "
    >
      {/* ================================================================
          HEADER
      ================================================================= */}

      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-[3.5vw]
            grid
            grid-cols-[1.2fr_0.8fr]
            items-end
            gap-[5vw]

            max-xl:gap-[4vw]

            max-lg:mb-10
            max-lg:grid-cols-[1fr_1fr]
            max-lg:gap-8

            max-md:grid-cols-1
            max-md:gap-6
          "
        >
          {/* ==============================================================
              LEFT — HEADING
          ============================================================== */}

          <div className="min-w-0">
            <h2
              className="
                max-w-[52vw]

                text-[3.2vw]
                font-semibold
                capitalize
                leading-[0.96]
                tracking-[-0.045em]
                text-hero-heading

                max-[1200px]:text-[40px]

                max-lg:max-w-[650px]
                max-lg:text-[38px]

                max-md:text-[35px]

                max-sm:text-[29px]
              "
            >
              Made with care.
              <br />
              Worn with confidence.
            </h2>
          </div>

          {/* ==============================================================
              RIGHT — EYEBROW + PARAGRAPH
          ============================================================== */}

          <div
            className="
              max-w-[30vw]
              justify-self-end

              max-xl:max-w-[380px]

              max-lg:max-w-[420px]

              max-md:max-w-[600px]
              max-md:justify-self-start
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
                Loved by our customers
              </span>
            </div>

            {/* Paragraph */}

            <p
              className="
                max-w-[28vw]
                text-[0.72vw]
                leading-[1.7]
                text-[var(--text-secondary)]

                max-xl:max-w-[380px]
                max-xl:text-[12px]

                max-lg:max-w-[420px]
                max-lg:text-[13px]

                max-md:max-w-[600px]
              "
            >
              Every piece is made around the person wearing it.
              Here is what our customers have to say about their
              Soul&apos;s Glory Cloth experience.
            </p>
          </div>
        </motion.div>
      </Container>

      {/* ================================================================
          ONE ROW OF REVIEW CARDS
      ================================================================= */}

      <TestimonialsMarquee />

      {/* ================================================================
          TRUST METRICS
      ================================================================= */}

      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            mx-auto
            mt-[3.5vw]
            flex
            max-w-[58vw]
            items-center
            justify-center
            gap-[3.5vw]

            max-lg:mt-10
            max-lg:max-w-[700px]
            max-lg:gap-10

            max-md:flex-wrap
            max-md:gap-7

            max-sm:gap-5
          "
        >
          {/* Rating */}

          <div className="min-w-[90px] text-center">
            <div
              className="
                flex
                items-center
                justify-center
                gap-[0.35vw]

                max-lg:gap-1
              "
            >
              <Star
                className="
                  h-[0.85vw]
                  w-[0.85vw]
                  fill-current
                  text-primary

                  max-lg:h-3.5
                  max-lg:w-3.5
                "
              />

              <p
                className="
                  text-[1.15vw]
                  font-semibold
                  tracking-[-0.04em]
                  text-[var(--text)]

                  max-lg:text-[18px]
                "
              >
                4.9/5
              </p>
            </div>

            <p
              className="
                mt-[0.35vw]
                text-[0.42vw]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[var(--text-secondary)]

                max-lg:mt-1
                max-lg:text-[8px]
              "
            >
              Average Rating
            </p>
          </div>

          {/* Divider */}

          <div
            className="
              h-[2vw]
              w-px
              bg-[var(--border)]

              max-lg:h-8
            "
          />

          {/* Customers */}

          <div className="min-w-[90px] text-center">
            <p
              className="
                text-[1.15vw]
                font-semibold
                tracking-[-0.04em]
                text-[var(--text)]

                max-lg:text-[18px]
              "
            >
              1,200+
            </p>

            <p
              className="
                mt-[0.35vw]
                text-[0.42vw]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[var(--text-secondary)]

                max-lg:mt-1
                max-lg:text-[8px]
              "
            >
              Happy Customers
            </p>
          </div>

          {/* Divider */}

          <div
            className="
              h-[2vw]
              w-px
              bg-[var(--border)]

              max-lg:h-8
            "
          />

          {/* Handcrafted */}

          <div className="min-w-[90px] text-center">
            <div
              className="
                flex
                items-center
                justify-center
                gap-[0.35vw]

                max-lg:gap-1
              "
            >
              <span
                className="
                  h-[0.42vw]
                  w-[0.42vw]
                  min-h-[6px]
                  min-w-[6px]
                  rounded-full
                  bg-primary
                "
              />

              <p
                className="
                  text-[1.15vw]
                  font-semibold
                  tracking-[-0.04em]
                  text-[var(--text)]

                  max-lg:text-[18px]
                "
              >
                100%
              </p>
            </div>

            <p
              className="
                mt-[0.35vw]
                text-[0.42vw]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[var(--text-secondary)]

                max-lg:mt-1
                max-lg:text-[8px]
              "
            >
              Handcrafted
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}