"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Sparkles,
  Check,
  MessageCircle,
  Ruler,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import AmbientBackground from "@/components/ui/ambient-background";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)]">
      {/* =====================================================
          GLOBAL AMBIENT BACKGROUND
      ====================================================== */}

      <AmbientBackground />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <Container className="relative z-10">
        <div
          className="
            grid
            min-h-[calc(100vh-102px)]
            grid-cols-1
            items-center
            gap-[7vw]
            py-[5vw]

            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-[3vw]
            lg:py-[3.8vw]
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative z-10 max-w-[650px]">
            {/* Eyebrow */}

            <div
              className="
                mb-[1.2vw]
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-[0.75vw]
                py-[0.4vw]
                backdrop-blur-xl

                max-lg:mb-4
                max-lg:px-3
                max-lg:py-1.5
              "
            >
              <span
                className="
                  flex
                  h-[18px]
                  w-[18px]
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
                  text-[0.62vw]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--text-secondary)]

                  max-lg:text-[9px]
                "
              >
                Personal fashion platform
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-[680px]
                text-[5.2vw]
                font-bold
                leading-[0.94]
                tracking-[-0.065em]
                text-[var(--text)]

                max-lg:text-[62px]
                max-md:text-[52px]
                max-sm:text-[43px]
              "
            >
              Clothing made
              <br />

              <span className="text-[var(--primary)]">
                around you.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-[1.4vw]
                max-w-[535px]
                text-[0.95vw]
                leading-[1.65]
                text-[var(--text-secondary)]

                max-lg:mt-5
                max-lg:text-[14px]
                max-sm:text-[13px]
              "
            >
              Shop ready-to-wear pieces or create garments tailored to your
              measurements, style and preferences. Your profile, orders,
              payments, measurements and support — all in one place.
            </p>

            {/* =================================================
                ACTIONS
            ================================================== */}

            <div
              className="
                mt-[1.8vw]
                flex
                flex-wrap
                items-center
                gap-[0.65vw]

                max-lg:mt-6
                max-lg:gap-2
              "
            >
              <Button
                href="/sign-up"
                variant="primary"
                className="
                  h-[3.05vw]
                  min-h-[45px]
                  px-[1.35vw]
                  text-[0.7vw]

                  max-lg:px-5
                  max-lg:text-[11px]
                "
              >
                Become a Client

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>

              <Button
                href="/shop"
                variant="secondary"
                className="
                  h-[3.05vw]
                  min-h-[45px]
                  px-[1.35vw]
                  text-[0.7vw]

                  max-lg:px-5
                  max-lg:text-[11px]
                "
              >
                Explore Collection
              </Button>

              <Link
                href="/custom-studio"
                className="
                  group
                  ml-[0.25vw]
                  inline-flex
                  items-center
                  gap-2
                  text-[0.66vw]
                  font-semibold
                  text-[var(--text-secondary)]
                  transition-colors
                  hover:text-[var(--text)]

                  max-lg:text-[10px]
                  max-sm:mt-2
                  max-sm:w-full
                "
              >
                <span
                  className="
                    flex
                    h-[30px]
                    w-[30px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    transition-all
                    group-hover:border-[var(--primary)]
                    group-hover:bg-[var(--surface-hover)]
                  "
                >
                  <Play
                    size={9}
                    fill="currentColor"
                  />
                </span>

                See Custom Studio
              </Link>
            </div>

            {/* =================================================
                TRUST FEATURES
            ================================================== */}

            <div
              className="
                mt-[1.8vw]
                flex
                flex-wrap
                gap-[1.25vw]

                max-lg:mt-6
                max-lg:gap-4
              "
            >
              <TrustItem label="Made to measure" />

              <TrustItem label="Worldwide delivery" />

              <TrustItem label="Personal support" />
            </div>

            {/* =================================================
                MINI CLIENT STATUS
            ================================================== */}

            <div
              className="
                mt-[2.2vw]
                flex
                items-center
                gap-3

                max-lg:mt-7
              "
            >
              <div className="flex -space-x-2">
                <Avatar letter="M" />
                <Avatar letter="A" />
                <Avatar letter="S" />
                <Avatar letter="R" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.72vw] font-bold text-[var(--text)] max-lg:text-[11px]">
                    10K+
                  </span>

                  <span className="text-[0.6vw] text-[var(--text-secondary)] max-lg:text-[9px]">
                    clients
                  </span>
                </div>

                <p className="text-[0.52vw] text-[var(--text-tertiary)] max-lg:text-[8px]">
                  Growing with Soul&apos;s Glory
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[38vw]
              items-center
              justify-center

              max-lg:min-h-[520px]
              max-md:min-h-[470px]
              max-sm:min-h-[420px]
            "
          >
            {/* Main image glow */}

            <div
              className="
                pointer-events-none
                absolute
                h-[25vw]
                w-[25vw]
                rounded-full
                bg-[var(--primary)]
                opacity-[0.11]
                blur-[7vw]

                max-lg:h-[330px]
                max-lg:w-[330px]
              "
            />

            {/* =================================================
                MAIN IMAGE CARD
            ================================================== */}

            <div
              className="
                relative
                z-10
                w-[36vw]
                max-w-[560px]
                overflow-hidden
                rounded-[1.45vw]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-[0.55vw]
                shadow-[0_30px_100px_rgba(0,0,0,0.38)]
                backdrop-blur-2xl

                max-lg:w-[500px]
                max-md:w-[430px]
                max-sm:w-[88vw]
              "
            >
              {/* Image */}

              <div
                className="
                  relative
                  aspect-[0.9]
                  overflow-hidden
                  rounded-[1.05vw]
                  bg-[#161616]

                  max-sm:rounded-[14px]
                "
              >
                <Image
                  src="/images/hero-fashion.jpg"
                  alt="Soul's Glory custom fashion"
                  fill
                  priority
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 500px, 560px"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.035]
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-black/5
                    to-black/10
                  "
                />

                {/* Top label */}

                <div
                  className="
                    absolute
                    left-[1vw]
                    top-[1vw]
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/15
                    bg-black/35
                    px-[0.7vw]
                    py-[0.35vw]
                    text-[0.52vw]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    backdrop-blur-xl

                    max-lg:left-4
                    max-lg:top-4
                    max-lg:px-3
                    max-lg:py-1.5
                    max-lg:text-[8px]
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />

                  Custom Collection
                </div>

                {/* Bottom content */}

                <div
                  className="
                    absolute
                    bottom-[1vw]
                    left-[1vw]
                    right-[1vw]

                    max-lg:bottom-4
                    max-lg:left-4
                    max-lg:right-4
                  "
                >
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className="
                          text-[0.52vw]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          text-white/60

                          max-lg:text-[8px]
                        "
                      >
                        Made for you
                      </p>

                      <h2
                        className="
                          mt-1
                          text-[1.2vw]
                          font-semibold
                          tracking-[-0.04em]
                          text-white

                          max-lg:text-[18px]
                        "
                      >
                        Your fit. Your style.
                      </h2>
                    </div>

                    <div
                      className="
                        flex
                        h-[2.5vw]
                        w-[2.5vw]
                        min-h-[38px]
                        min-w-[38px]
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black

                        max-lg:h-10
                        max-lg:w-10
                      "
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PRODUCT INFO
              ================================================== */}

              <div className="grid grid-cols-3 gap-[0.4vw] p-[0.4vw]">
                <InfoItem
                  icon={<Ruler size={11} />}
                  label="Fit"
                  value="Personal"
                />

                <InfoItem
                  icon={<Sparkles size={11} />}
                  label="Fabric"
                  value="Premium"
                />

                <InfoItem
                  icon={<ShoppingBag size={11} />}
                  label="Delivery"
                  value="Worldwide"
                />
              </div>
            </div>

            {/* =================================================
                CLIENT DASHBOARD CARD
            ================================================== */}

            <div
              className="
                absolute
                bottom-[3.5vw]
                left-[-1.3vw]
                z-20
                w-[13vw]
                min-w-[175px]
                rounded-[13px]
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                p-[0.8vw]
                shadow-[0_20px_60px_rgba(0,0,0,0.32)]
                backdrop-blur-2xl

                max-lg:bottom-8
                max-lg:left-0
                max-lg:p-3

                max-sm:left-[-5px]
              "
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-[31px]
                    w-[31px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                  "
                >
                  <UserRound size={14} />
                </div>

                <div className="min-w-0">
                  <p className="text-[0.5vw] font-medium text-[var(--text-tertiary)] max-lg:text-[8px]">
                    Client dashboard
                  </p>

                  <p className="truncate text-[0.62vw] font-semibold text-[var(--text)] max-lg:text-[10px]">
                    Everything in one place
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1">
                <DashboardStat
                  value="03"
                  label="Orders"
                />

                <DashboardStat
                  value="02"
                  label="Fits"
                />

                <DashboardStat
                  value="01"
                  label="Chat"
                />
              </div>
            </div>

            {/* =================================================
                CHAT CARD
            ================================================== */}

            <div
              className="
                absolute
                right-[-1vw]
                top-[6vw]
                z-20
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                px-[0.7vw]
                py-[0.5vw]
                shadow-[0_15px_45px_rgba(0,0,0,0.25)]
                backdrop-blur-2xl

                max-lg:right-0
                max-lg:top-10
                max-lg:px-3
                max-lg:py-2
              "
            >
              <span
                className="
                  flex
                  h-[24px]
                  w-[24px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                "
              >
                <MessageCircle size={12} />
              </span>

              <span className="text-[0.52vw] font-semibold text-[var(--text)] max-lg:text-[8px]">
                Chat with your tailor
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        {/* =====================================================
            PLATFORM BENEFITS
        ====================================================== */}

        <div
          className="
            grid
            border-t
            border-[var(--border)]
            py-[1.35vw]

            sm:grid-cols-3
          "
        >
          <PlatformBenefit
            number="01"
            title="Create your profile"
            description="Save your preferences & measurements"
          />

          <PlatformBenefit
            number="02"
            title="Choose your experience"
            description="Ready-to-wear or custom-made"
            bordered
          />

          <PlatformBenefit
            number="03"
            title="Follow everything"
            description="Orders, chat, payments & delivery"
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
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="
          flex
          h-[20px]
          w-[20px]
          items-center
          justify-center
          rounded-full
          bg-[var(--surface)]
          text-[var(--primary)]
        "
      >
        <Check size={11} />
      </span>

      <span className="text-[0.6vw] font-medium text-[var(--text-secondary)] max-lg:text-[10px]">
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[8px]
        bg-[var(--surface)]
        px-[0.6vw]
        py-[0.55vw]

        max-lg:px-2
        max-lg:py-2
      "
    >
      <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
        {icon}

        <p className="text-[0.48vw] uppercase tracking-[0.08em] max-lg:text-[7px]">
          {label}
        </p>
      </div>

      <p className="mt-1 text-[0.65vw] font-semibold text-[var(--text)] max-lg:text-[10px]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DASHBOARD STAT
========================================================= */

function DashboardStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        rounded-[6px]
        bg-[var(--surface)]
        p-[0.4vw]
        text-center
      "
    >
      <p className="text-[0.72vw] font-bold text-[var(--text)] max-lg:text-[11px]">
        {value}
      </p>

      <p className="text-[0.4vw] text-[var(--text-tertiary)] max-lg:text-[7px]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   PLATFORM BENEFIT
========================================================= */

function PlatformBenefit({
  number,
  title,
  description,
  bordered = false,
}: {
  number: string;
  title: string;
  description: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-[0.7vw]

        ${
          bordered
            ? "border-b border-[var(--border)] py-[1vw] sm:border-b-0 sm:border-r sm:border-l sm:px-[2vw] sm:py-0"
            : ""
        }

        max-sm:border-b
        max-sm:border-[var(--border)]
        max-sm:py-4
      `}
    >
      <span className="text-[1.2vw] font-bold tracking-[-0.05em] text-[var(--text)] max-lg:text-[18px]">
        {number}
      </span>

      <div>
        <p className="text-[0.58vw] font-semibold text-[var(--text)] max-lg:text-[9px]">
          {title}
        </p>

        <p className="mt-0.5 text-[0.5vw] text-[var(--text-tertiary)] max-lg:text-[8px]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({
  letter,
}: {
  letter: string;
}) {
  return (
    <div
      className="
        flex
        h-[27px]
        w-[27px]
        items-center
        justify-center
        rounded-full
        border-2
        border-[var(--bg)]
        bg-[var(--surface-hover)]
        text-[9px]
        font-bold
        text-[var(--text)]
      "
    >
      {letter}
    </div>
  );
}