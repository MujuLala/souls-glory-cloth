
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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <Container className="relative z-10">
        {/* =====================================================
            MAIN HERO
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            py-12

            sm:gap-14
            sm:py-16

            lg:min-h-[calc(100vh-72px)]
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-10
            lg:py-12

            xl:gap-14
            xl:py-14

            2xl:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative z-10 max-w-[680px]">
            {/* EYEBROW */}

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
                px-3
                py-2
                backdrop-blur-xl

                sm:mb-6
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
                  leading-none
                  tracking-[0.12em]
                  text-[var(--text-secondary)]

                  sm:text-[11px]
                "
              >
                Personal fashion platform
              </span>
            </div>

            {/* HEADING */}

            <h1
              className="
                max-w-[760px]
                text-[clamp(2.8rem,6vw,5.2rem)]
                font-bold
                leading-[0.94]
                tracking-[-0.065em]
                text-[var(--text)]
              "
            >
              Clothing made
              <br />

              <span className="text-[var(--primary)]">
                around you.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[620px]
                text-[15px]
                leading-[1.65]
                text-[var(--text-secondary)]

                sm:mt-7
                sm:text-[16px]

                lg:max-w-[570px]
                xl:text-[17px]
              "
            >
              Shop ready-to-wear pieces or create garments tailored
              to your measurements, style and preferences. Your
              profile, orders, payments, measurements and support —
              all in one place.
            </p>

            {/* ACTIONS */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
                sm:items-center
                sm:gap-2.5

                lg:mt-8
              "
            >
              <Button
                href="/sign-up"
                variant="primary"
                className="
                  h-12
                  w-full
                  px-5
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
                  px-5
                  text-[14px]

                  sm:w-auto
                  sm:text-[15px]
                "
              >
                Explore Collection
              </Button>

              <Link
                href="/custom-studio"
                className="
                  group
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  px-2
                  text-[13px]
                  font-semibold
                  leading-none
                  text-[var(--text-secondary)]
                  transition-colors
                  hover:text-[var(--text)]

                  sm:justify-start
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

            {/* TRUST FEATURES */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-x-5
                gap-y-3

                sm:mt-8
                sm:gap-x-6
              "
            >
              <TrustItem label="Made to measure" />
              <TrustItem label="Worldwide delivery" />
              <TrustItem label="Personal support" />
            </div>

            {/* MINI CLIENT STATUS */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
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
                  <span
                    className="
                      text-[14px]
                      font-bold
                      leading-none
                      text-[var(--text)]
                    "
                  >
                    10K+
                  </span>

                  <span
                    className="
                      text-[12px]
                      leading-none
                      text-[var(--text-secondary)]
                    "
                  >
                    clients
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-none
                    text-[var(--text-tertiary)]
                  "
                >
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
              min-h-[430px]
              items-center
              justify-center

              sm:min-h-[520px]

              lg:min-h-[560px]
              xl:min-h-[620px]
            "
          >
            {/* IMAGE GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                h-[280px]
                w-[280px]
                rounded-full
                bg-[var(--primary)]
                opacity-[0.11]
                blur-[90px]

                sm:h-[360px]
                sm:w-[360px]
                sm:blur-[110px]

                lg:h-[400px]
                lg:w-[400px]
              "
            />

            {/* MAIN IMAGE CARD */}

            <div
              className="
                relative
                z-10
                w-full
                max-w-[560px]
                overflow-hidden
                rounded-[22px]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-2
                shadow-[0_30px_90px_rgba(0,0,0,0.38)]
                backdrop-blur-2xl

                sm:rounded-[24px]
                sm:p-2.5

                lg:w-[520px]
                xl:w-[580px]
              "
            >
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[1.1]
                  overflow-hidden
                  rounded-[16px]
                  bg-[#161616]

                  sm:rounded-[18px]
                "
              >
                <Image
  src="/images/hero-fashion.jpg"
  alt="Soul's Glory custom fashion"
  fill
  priority
  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 580px"
  className="
    object-cover
    transition-transform
    duration-700
    hover:scale-[1.035]
  "
/>

                {/* OVERLAY */}

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

                {/* TOP LABEL */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/15
                    bg-black/35
                    px-3
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    leading-none
                    text-white
                    backdrop-blur-xl

                    sm:left-5
                    sm:top-5
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--primary)]
                    "
                  />

                  Custom Collection
                </div>

                {/* BOTTOM CONTENT */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    right-4

                    sm:bottom-5
                    sm:left-5
                    sm:right-5
                  "
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          leading-none
                          text-white/60
                        "
                      >
                        Made for you
                      </p>

                      <h2
                        className="
                          mt-1.5
                          text-[18px]
                          font-semibold
                          leading-none
                          tracking-[-0.04em]
                          text-white

                          sm:text-[21px]
                        "
                      >
                        Your fit. Your style.
                      </h2>
                    </div>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black

                        sm:h-11
                        sm:w-11
                      "
                    >
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT INFO */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-1.5
                  p-1.5
                "
              >
                <InfoItem
                  icon={<Ruler size={12} />}
                  label="Fit"
                  value="Personal"
                />

                <InfoItem
                  icon={<Sparkles size={12} />}
                  label="Fabric"
                  value="Premium"
                />

                <InfoItem
                  icon={<ShoppingBag size={12} />}
                  label="Delivery"
                  value="Worldwide"
                />
              </div>
            </div>

            {/* =================================================
                CLIENT DASHBOARD
            ================================================== */}

            <div
              className="
                absolute
                bottom-8
                left-0
                z-20
                hidden
                w-[205px]
                rounded-[14px]
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                p-3
                shadow-[0_20px_60px_rgba(0,0,0,0.32)]
                backdrop-blur-2xl

                sm:block
                sm:left-2

                lg:-left-8
                lg:bottom-14
                lg:w-[210px]

                xl:-left-12
              "
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-9
                    w-9
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
                  <p
                    className="
                      text-[9px]
                      font-medium
                      leading-none
                      text-[var(--text-tertiary)]
                    "
                  >
                    Client dashboard
                  </p>

                  <p
                    className="
                      mt-1.5
                      truncate
                      text-[11px]
                      font-semibold
                      leading-none
                      text-[var(--text)]
                    "
                  >
                    Everything in one place
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1">
                <DashboardStat value="03" label="Orders" />
                <DashboardStat value="02" label="Fits" />
                <DashboardStat value="01" label="Chat" />
              </div>
            </div>

            {/* =================================================
                CHAT CARD
            ================================================== */}

            <div
              className="
                absolute
                right-0
                top-10
                z-20
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                px-3
                py-2.5
                shadow-[0_20px_55px_rgba(0,0,0,0.25)]
                backdrop-blur-2xl

                sm:flex
                sm:right-0

                lg:right-[-8px]
                lg:top-20

                xl:right-[-18px]
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                "
              >
                <MessageCircle size={12} />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  leading-none
                  text-[var(--text)]
                "
              >
                Chat with your tailor
              </span>

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-500
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            PLATFORM BENEFITS
        ====================================================== */}

        <div
          className="
            grid
            gap-3
            border-t
            border-[var(--border)]
            py-5

            sm:grid-cols-3
            sm:gap-4
            sm:py-6

            lg:gap-6
            lg:py-7
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

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[var(--surface)]
          text-[var(--primary)]
        "
      >
        <Check size={11} />
      </span>

      <span
        className="
          text-[11px]
          font-medium
          leading-none
          text-[var(--text-secondary)]

          sm:text-[12px]
        "
      >
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
        px-2
        py-2

        sm:px-2.5
        sm:py-2.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-1
          text-[var(--text-tertiary)]
        "
      >
        {icon}

        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.08em]
            leading-none

            sm:text-[9px]
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          mt-1
          text-[10px]
          font-semibold
          leading-none
          text-[var(--text)]

          sm:text-[11px]
        "
      >
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
        p-2
        text-center
      "
    >
      <p
        className="
          text-[12px]
          font-bold
          leading-none
          text-[var(--text)]
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-[8px]
          leading-none
          text-[var(--text-tertiary)]
        "
      >
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
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative">
      <div
        className="
          relative
          flex
          min-h-[78px]
          w-full
          items-center
          gap-3
          rounded-[12px]
          border
          border-[var(--border)]
          bg-[var(--dropdown-bg)]
          p-3.5
          shadow-[0_12px_35px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[var(--primary)]

          sm:min-h-[84px]
          sm:p-4
        "
      >
        {/* NUMBER */}

        <div
          className="
            relative
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-[9px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            shadow-[0_6px_18px_rgba(0,0,0,0.18)]

            sm:h-11
            sm:w-11
          "
        >
          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--primary)]
              opacity-70
            "
          />

          <span
            className="
              text-[13px]
              font-bold
              leading-none
              tracking-[-0.04em]
              text-[var(--text)]

              sm:text-[14px]
            "
          >
            {number}
          </span>
        </div>

        {/* CONTENT */}

        <div className="min-w-0">
          <p
            className="
              text-[12px]
              font-semibold
              leading-[1.2]
              tracking-[-0.01em]
              text-[var(--text)]

              sm:text-[13px]
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-[10px]
              leading-[1.35]
              text-[var(--text-tertiary)]

              sm:text-[11px]
            "
          >
            {description}
          </p>
        </div>

        {/* ACTIVE INDICATOR */}

        <span
          className="
            absolute
            bottom-[-3px]
            left-1/2
            h-1
            w-1
            -translate-x-1/2
            rounded-full
            bg-[var(--primary)]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({ letter }: { letter: string }) {
  return (
    <div
      className="
        flex
        h-7
        w-7
        items-center
        justify-center
        rounded-full
        border-2
        border-[var(--bg)]
        bg-[var(--surface-hover)]
        text-[9px]
        font-bold
        leading-none
        text-[var(--text)]

        sm:h-8
        sm:w-8
      "
    >
      {letter}
    </div>
  );
}
