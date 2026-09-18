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
            FULL HEIGHT
        ====================================================== */}

        <div
          className="
            flex
            min-h-[calc(100vh-72px)]
            items-center
            justify-center
            py-16

            sm:py-20

            lg:py-24
            xl:py-12
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
                mb-6
                inline-flex
                items-center
                gap-2
                backdrop-blur-xl
                transition-all
                duration-300

                sm:mb-7
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-[var(--primary-contrast)]
                "
              >
                <Sparkles size={10} />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.12em]
                  text-[var(--text-secondary)]

                  sm:text-[11px]
                "
              >
                Personal fashion platform
              </span>
            </div>

            {/* =============================================
                HEADING
            ============================================= */}

            <div className="relative mb-4">
              <h1
                className="
                  relative
                  mx-auto
                  w-fit
                  max-w-full
                  whitespace-nowrap
                  text-[55px]
                  font-[100]
                  uppercase
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-[var(--text)]

                  max-[1100px]:text-[60px]
                  max-[900px]:text-[50px]
                  max-[700px]:text-[38px]
                  max-[480px]:text-[30px]
                  
                  
                "
              >
                Clothing made around you.

                <svg
                  aria-hidden="true"
                  viewBox="0 0 1000 40"
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-8
                    left-1/2
                    h-8
                    w-[96%]
                    -translate-x-1/2
                    overflow-visible
stroke-[var(--primary-contrast)]
                    max-[700px]:-bottom-6
                    max-[700px]:h-6
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
                    opacity="0.08"
                  />

                  {/* STITCHING */}

                  <g clipPath="url(#stitchRevealClip)">
                    <line
                      x1="0"
                      y1="20"
                      x2="1000"
                      y2="20"
                      stroke="var(--primary)"
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
                        stroke="var(--primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M10 12 L25 20"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="6"
                        cy="8"
                        r="4"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                      />

                      <circle
                        cx="6"
                        cy="16"
                        r="4"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                      />

                      <circle
                        cx="10"
                        cy="12"
                        r="1.5"
                        fill="var(--primary)"
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
                mt-10
                max-w-[734px]
                text-[15px]
                leading-[1.7]
                text-[var(--text-secondary)]

                sm:mt-12
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
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3

                sm:mt-9
                sm:flex-row
                sm:flex-wrap
                sm:gap-2.5
              "
            >
              <Button
                href="/sign-up"
                variant="primary"
                className="
                  group
                  h-12
                  w-full
                  px-6
                  text-[14px]

                  sm:w-auto
                  sm:text-[15px]
                "
              >
                Become a Client

                <ArrowRight
                  size={15}
                  className="
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
                  h-12
                  w-full
                  px-6
                  text-[14px]
                  hover-animate-stitching
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
                mt-10
                flex
                max-w-[720px]
                flex-wrap
                items-center
                justify-center
                gap-x-7
                gap-y-4

                sm:mt-11
                sm:gap-x-9
                lg:gap-x-12
              "
            >
              <TrustItem
                icon={<Ruler size={15} />}
                label="Made to measure"
              />

              <TrustItem
                icon={<Globe2 size={15} />}
                label="Worldwide delivery"
              />

              <TrustItem
                icon={<MessageCircle size={15} />}
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
            gap-3
            pb-8

            sm:grid-cols-3
            sm:gap-4
            sm:pb-10

            lg:gap-5
            lg:pb-12
          "
        >
          <PlatformBenefit
            number="01"
            icon={<UserRound size={17} strokeWidth={1.7} />}
            title="Your perfect profile"
            description="Save measurements, preferences and fit details once."
          />

          <PlatformBenefit
            number="02"
            icon={<Shirt size={17} strokeWidth={1.7} />}
            title="Made your way"
            description="Choose ready-to-wear or create something custom."
          />

          <PlatformBenefit
            number="03"
            icon={<PackageCheck size={17} strokeWidth={1.7} />}
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
        gap-2.5
        transition-all
        duration-300
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[var(--surface)]
          text-[var(--text-secondary)]
          transition-all
          duration-300

          group-hover:bg-[var(--surface-hover)]
          group-hover:text-[var(--primary)]
        "
      >
        {icon}
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
          min-h-[132px]
          w-full
          flex-col
          justify-between
          overflow-hidden
          rounded-[16px]
          
          bg-[var(--dropdown-bg)]
          p-4

          transition-[background-color,box-shadow]
          duration-500
          ease-out

          hover:bg-[var(--surface)]
          hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]

          sm:p-5
        "
      >
        {/* TOP ROW */}
        <div className="relative flex items-center justify-between">
          {/* ICON */}
          <div
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-[10px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text-secondary)]

              transition-all
              duration-500
              ease-out

              group-hover:-translate-y-0.5
              group-hover:text-[var(--text)]
            "
          >
            {icon}
          </div>

          {/* NUMBER */}
          <span
            className="
              text-[9px]
              font-medium
              tracking-[0.16em]
              text-[var(--text-tertiary)]

              transition-colors
              duration-300

              group-hover:text-[var(--text-secondary)]
            "
          >
            {number}
          </span>
        </div>

        {/* CONTENT */}
        <div className="relative mt-5">
          <div className="flex items-center gap-3">
            <p
              className="
                text-[13px]
                font-semibold
                leading-[1.2]
                tracking-[-0.015em]
                text-[var(--text)]

                sm:text-[14px]
              "
            >
              {title}
            </p>

            {/* ARROW */}
            <span
              className="
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border)]
                text-[var(--text-tertiary)]
                opacity-0
                -translate-x-1

                transition-all
                duration-400
                ease-out

                group-hover:translate-x-0
                group-hover:border-[var(--text-tertiary)]
                group-hover:opacity-100
              "
            >
              <ArrowRight size={10} />
            </span>
          </div>

          <p
            className="
              mt-1.5
              max-w-[280px]
              text-[10.5px]
              leading-[1.5]
              text-[var(--text-tertiary)]

              sm:text-[11px]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}