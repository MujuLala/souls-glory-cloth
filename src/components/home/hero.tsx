"use client";

import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Ruler,
  Globe2,
  UserRound,
  Shirt,
  PackageCheck,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <Container className="relative z-10">
        {/* =====================================================
            MAIN HERO
        ====================================================== */}

        <div
          className="
            flex
            min-h-[calc(100vh-72px)]
            items-center
            justify-center

            py-[4vw]

            max-[700px]:min-h-0
            max-[700px]:py-[12vw]

            sm:py-[5vw]
            lg:py-[3.5vw]
            xl:py-[2.5vw]
          "
        >
          {/* =================================================
              CENTERED HERO CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              w-full
              max-w-[900px]
              text-center
            "
          >
            {/* =============================================
                EYEBROW
            ============================================= */}

            <div
              className="
                mb-[1.5vw]
                inline-flex
                items-center
                gap-[0.45vw]
                backdrop-blur-xl
                transition-all
                duration-300

                max-[700px]:mb-[4vw]
                max-[700px]:gap-[1.5vw]

                sm:mb-[1.3vw]
              "
            >
              <span
                className="
                  flex
                  h-[1.4vw]
                  w-[1.4vw]
                  min-h-[20px]
                  min-w-[20px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-[var(--primary-contrast)]

                  max-[700px]:h-[5vw]
                  max-[700px]:w-[5vw]
                  max-[700px]:min-h-0
                  max-[700px]:min-w-0
                "
              >
                <Sparkles
                  className="h-[0.7vw] w-[0.7vw] max-[700px]:h-[2.5vw] max-[700px]:w-[2.5vw]"
                />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.12em]
                  text-[var(--text-secondary)]

                  max-[700px]:text-[2.5vw]

                  sm:text-[11px]
                "
              >
                Personal fashion platform
              </span>
            </div>

            {/* =============================================
                HEADING
            ============================================= */}

            <div
              className="
                relative
                mb-[1vw]

                max-[700px]:mb-[2vw]
              "
            >
              <h1
                className="
                  relative
                  mx-auto
                  w-fit
                  max-w-full

                  text-[4.4vw]
                  font-semibold
                  capitalize
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-hero-heading

                  max-[1100px]:text-[5.8vw]
                  max-[900px]:text-[5.6vw]

                  max-[700px]:w-full
                  max-[700px]:px-[3vw]
                  max-[700px]:text-[8vw]
                  max-[700px]:leading-[1]
                  max-[700px]:tracking-[-0.045em]

                  max-[480px]:px-[2vw]
                  max-[480px]:text-[8.5vw]
                "
              >
                Clothing made around you.

                {/* =========================================
                    STITCHING UNDERLINE
                ========================================== */}

                <svg
                  aria-hidden="true"
                  viewBox="0 0 1000 40"
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-[2vw]
                    left-1/2
                    h-[2vw]
                    w-[96%]
                    -translate-x-1/2
                    overflow-visible

                    max-[700px]:-bottom-[4vw]
                    max-[700px]:h-[3vw]
                    max-[700px]:w-[88%]
                  "
                >
                  <defs>
                    <clipPath id="stitchRevealClip">
                      <rect
                        x="0"
                        y="0"
                        width="0"
                        height="40"
                      >
                        <animate
                          attributeName="width"
                          from="0"
                          to="1000"
                          dur="5s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    </clipPath>
                  </defs>

                  {/* SUBTLE BASE LINE */}

                  <line
                    x1="0"
                    y1="20"
                    x2="1000"
                    y2="20"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    opacity="0"
                  />

                  {/* STITCHING */}

                  <g clipPath="url(#stitchRevealClip)">
                    <line
                      x1="0"
                      y1="20"
                      x2="1000"
                      y2="20"
                      stroke="#f7e57b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="3 6"
                    />
                  </g>

                  {/* SCISSORS */}

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0 0"
                      to="1000 0"
                      dur="5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />

                    <animate
                      attributeName="opacity"
                      values="0;1;1;0;0"
                      keyTimes="0;0.04;0.90;0.96;1"
                      dur="5s"
                      repeatCount="indefinite"
                    />

                    <g transform="translate(-11 8)">
                      <path
                        d="M10 12 L25 4"
                        fill="none"
                        stroke="#f7e57b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M10 12 L25 20"
                        fill="none"
                        stroke="#f7e57b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="6"
                        cy="8"
                        r="4"
                        fill="none"
                        stroke="#f7e57b"
                        strokeWidth="2"
                      />

                      <circle
                        cx="6"
                        cy="16"
                        r="4"
                        fill="none"
                        stroke="#f7e57b"
                        strokeWidth="2"
                      />

                      <circle
                        cx="10"
                        cy="12"
                        r="1.5"
                        fill="#f7e57b"
                      />
                    </g>
                  </g>
                </svg>
              </h1>
            </div>

            {/* =============================================
                DESCRIPTION
            ============================================= */}

            <p
              className="
                mx-auto
                mt-[3.5vw]
                max-w-[734px]

                text-[15px]
                leading-[1.7]
                text-[var(--text-secondary)]

                max-[700px]:mt-[9vw]
                max-[700px]:max-w-[90vw]
                max-[700px]:text-[3.5vw]
                max-[700px]:leading-[1.65]

                max-[480px]:mt-[10vw]
                max-[480px]:text-[3.7vw]

                sm:mt-[3vw]
                sm:text-[16px]

                lg:text-[17px]
              "
            >
              Shop ready-to-wear pieces or create garments tailored
              to your measurements, style and preferences. Your
              profile, orders, payments, measurements and support —
              all in one place.
            </p>

            {/* =============================================
                ACTIONS
            ============================================= */}

            <div
              className="
                mt-[2.5vw]
                flex
                flex-col
                items-center
                justify-center
                gap-[0.65vw]

                max-[700px]:mt-[7vw]
                max-[700px]:gap-[2.5vw]

                sm:mt-[2.2vw]
                sm:flex-row
                sm:flex-wrap
                sm:gap-[0.55vw]
              "
            >
              <Button
                href="/sign-up"
                variant="primary"
                className="
                  group
                  h-[3.2vw]
                  min-h-[48px]
                  w-full
                  px-[1.5vw]
                  text-[14px]

                  max-[700px]:h-[12vw]
                  max-[700px]:min-h-0
                  max-[700px]:px-[5vw]
                  max-[700px]:text-[3.5vw]

                  sm:w-auto
                  sm:text-[15px]
                "
              >
                Become a Client

                <ArrowRight
                  className="
                    h-[1vw]
                    w-[1vw]

                    max-[700px]:h-[3.5vw]
                    max-[700px]:w-[3.5vw]

                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Button>

              <Button
                href="/shop"
                variant="secondary"
                className="
                  h-[3.2vw]
                  min-h-[48px]
                  w-full
                  px-[1.5vw]
                  text-[14px]
                  hover-animate-stitching

                  max-[700px]:h-[12vw]
                  max-[700px]:min-h-0
                  max-[700px]:px-[5vw]
                  max-[700px]:text-[3.5vw]

                  sm:w-auto
                  sm:text-[15px]
                "
              >
                Explore Collection
              </Button>
            </div>

            {/* =============================================
                FEATURE LIST
            ============================================= */}

            <div
              className="
                mx-auto
                mt-[3vw]
                flex
                max-w-[720px]
                flex-wrap
                items-center
                justify-center
                gap-x-[2.2vw]
                gap-y-[1.2vw]

                max-[700px]:mt-[7vw]
                max-[700px]:gap-x-[5vw]
                max-[700px]:gap-y-[4vw]

                sm:mt-[2.7vw]
                sm:gap-x-[2.5vw]

                lg:gap-x-[3vw]
              "
            >
              <TrustItem
                icon={<Ruler />}
                label="Made to measure"
              />

              <TrustItem
                icon={<Globe2 />}
                label="Worldwide delivery"
              />

              <TrustItem
                icon={<MessageCircle />}
                label="Personal support"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            PLATFORM BENEFITS
            PREMIUM SAAS FEATURE RAIL
        ====================================================== */}

        <div
          className="
            grid
            items-stretch

            grid-cols-1
            gap-[3vw]

            pb-[7vw]

            sm:grid-cols-3
            sm:gap-[1vw]
            sm:pb-[2.5vw]

            lg:gap-[1.2vw]
            lg:pb-[2vw]
          "
        >
          <PlatformBenefit
            number="01"
            icon={
              <UserRound
                strokeWidth={1.6}
              />
            }
            title="Your perfect profile"
            description="Save measurements, preferences and fit details once."
          />

          <PlatformBenefit
            number="02"
            icon={
              <Shirt
                strokeWidth={1.6}
              />
            }
            title="Made your way"
            description="Choose ready-to-wear or create something custom."
          />

          <PlatformBenefit
            number="03"
            icon={
              <PackageCheck
                strokeWidth={1.6}
              />
            }
            title="Everything tracked"
            description="Follow orders, payments, delivery and support."
          />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   TRUST ITEM
========================================================= */

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-[0.5vw]
        transition-all
        duration-300

        max-[700px]:gap-[1.8vw]
      "
    >
      <span
        className="
          flex
          h-[1.7vw]
          w-[1.7vw]
          min-h-[32px]
          min-w-[32px]
          shrink-0
          items-center
          justify-center
          rounded-[0.5vw]
          bg-[var(--surface)]
          text-[var(--text-secondary)]
          transition-all
          duration-300

          group-hover:bg-[var(--surface-hover)]
          group-hover:text-[#f7e57b]

          max-[700px]:h-[8vw]
          max-[700px]:w-[8vw]
          max-[700px]:min-h-0
          max-[700px]:min-w-0
          max-[700px]:rounded-[2vw]
        "
      >
        <span className="h-[1vw] w-[1vw] max-[700px]:h-[3.5vw] max-[700px]:w-[3.5vw]">
          {icon}
        </span>
      </span>

      <span
        className="
          text-[11px]
          font-medium
          leading-none
          text-[var(--text-secondary)]
          transition-colors
          duration-300

          group-hover:text-[var(--text)]

          max-[700px]:text-[3vw]

          sm:text-[12px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   PLATFORM BENEFIT
========================================================= */

/* =========================================================
   PLATFORM BENEFIT
========================================================= */

function PlatformBenefit({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-full">
      <div
        className="
          hover-animate-stitching
          relative
          flex
          h-full
          min-h-[8.2vw]
          w-full
          flex-col
          justify-between
          overflow-hidden
          rounded-[0.85vw]

          /* SOLID BACKGROUND */
          bg-[var(--dropdown-bg)]

          p-[1.1vw]

          transition-colors
          duration-500
          ease-out

          /* KEEP SOLID ON HOVER */
          hover:bg-[var(--dropdown-bg)]

          max-[700px]:min-h-[31vw]
          max-[700px]:rounded-[3vw]
          max-[700px]:p-[5vw]

          sm:min-h-[14vw]
          sm:p-[1.8vw]

          lg:min-h-[8.2vw]
          lg:p-[1.1vw]
        "
      >
        {/* =============================================
            TOP ROW
        ============================================= */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
          "
        >
          {/* ICON */}

          <div
            className="
              relative
              flex
              h-[2.2vw]
              w-[2.2vw]
              min-h-[36px]
              min-w-[36px]
              items-center
              justify-center
              rounded-[0.55vw]

              border
              border-[var(--border)]

              bg-[var(--surface)]

              text-[var(--text-secondary)]

              transition-all
              duration-500
              ease-out

              group-hover:-translate-y-[0.15vw]

              /* YELLOW HOVER */
              group-hover:border-[#f7e57b]
              group-hover:bg-[var(--dropdown-bg)]
              group-hover:text-[#f7e57b]

              max-[700px]:h-[11vw]
              max-[700px]:w-[11vw]
              max-[700px]:min-h-0
              max-[700px]:min-w-0
              max-[700px]:rounded-[2.5vw]

              sm:h-[3.5vw]
              sm:w-[3.5vw]

              lg:h-[2.2vw]
              lg:w-[2.2vw]
            "
          >
            <span
              className="
                transition-transform
                duration-500
                ease-out

                group-hover:scale-[1.08]
              "
            >
              {icon}
            </span>
          </div>

          {/* NUMBER */}

          <span
            className="
              text-[0.6vw]
              font-medium
              tracking-[0.16em]
              text-[var(--text-tertiary)]

              transition-colors
              duration-300

              group-hover:text-[#f7e57b]

              max-[1100px]:text-[0.75vw]
              max-[900px]:text-[0.85vw]
              max-[700px]:text-[2.5vw]

              sm:text-[0.7vw]
              lg:text-[0.6vw]
            "
          >
            {number}
          </span>
        </div>

        {/* =============================================
            CONTENT
        ============================================= */}

        <div
          className="
            relative
            mt-[1.1vw]

            max-[700px]:mt-[5vw]

            sm:mt-[2vw]
            lg:mt-[1.1vw]
          "
        >
          {/* SMALL DECORATIVE LINE */}

          <div
            className="
              mb-[0.65vw]
              h-[0.08vw]
              min-h-[1px]
              w-[1.8vw]

              bg-[var(--border)]

              transition-all
              duration-500

              group-hover:w-[3vw]
              group-hover:bg-[#f7e57b]

              max-[700px]:mb-[2.5vw]
              max-[700px]:w-[7vw]

              sm:mb-[1vw]
              sm:w-[3vw]

              lg:mb-[0.65vw]
              lg:w-[1.8vw]
            "
          />

          {/* TITLE */}

          <p
            className="
              text-[0.9vw]
              font-semibold
              leading-[1.2]
              tracking-[-0.015em]
              text-[var(--text)]

              transition-colors
              duration-300

              group-hover:text-[#f7e57b]

              max-[1100px]:text-[1vw]
              max-[900px]:text-[1.1vw]

              max-[700px]:text-[4vw]
              max-[700px]:leading-[1.2]

              sm:text-[1.15vw]
              lg:text-[0.9vw]
            "
          >
            {title}
          </p>

          {/* DESCRIPTION */}

          <p
            className="
              mt-[0.4vw]
              max-w-[18vw]

              text-[0.7vw]
              leading-[1.5]

              text-[var(--text-tertiary)]

              max-[1100px]:max-w-[24vw]
              max-[1100px]:text-[0.8vw]

              max-[900px]:text-[0.9vw]

              max-[700px]:mt-[2vw]
              max-[700px]:max-w-[85vw]
              max-[700px]:text-[3vw]
              max-[700px]:leading-[1.55]

              sm:mt-[0.7vw]
              sm:max-w-[30vw]
              sm:text-[0.85vw]

              lg:mt-[0.4vw]
              lg:max-w-[18vw]
              lg:text-[0.7vw]
            "
          >
            {description}
          </p>
        </div>

        {/* =============================================
            SUBTLE CORNER DETAIL
        ============================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[1vw]
            right-[1vw]

            h-[0.45vw]
            w-[0.45vw]
            rounded-full

            border
            border-[var(--border)]

            opacity-50

            transition-all
            duration-500

            group-hover:scale-[1.4]
            group-hover:border-[#f7e57b]
            group-hover:bg-[#f7e57b]
            group-hover:opacity-100

            max-[700px]:bottom-[4vw]
            max-[700px]:right-[4vw]
            max-[700px]:h-[1.5vw]
            max-[700px]:w-[1.5vw]
          "
        />
      </div>
    </div>
  );
}