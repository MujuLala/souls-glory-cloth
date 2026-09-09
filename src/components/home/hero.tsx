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
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <Container className="relative z-10">
        <div
          className="
            grid
            min-h-[calc(100vh-7vw)]
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

          <div className="relative z-10">
            {/* =================================================
                EYEBROW
            ================================================== */}

            <div
              className="
                mb-[1.2vw]
                inline-flex
                items-center
                gap-[0.45vw]
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-[0.75vw]
                py-[0.4vw]
                backdrop-blur-xl
              "
            >
              <span
                className="
                  flex
                  h-[1.15vw]
                  w-[1.15vw]
                  min-h-[10px]
                  min-w-[10px]
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
                  leading-none
                  text-[var(--text-secondary)]
                "
              >
                Personal fashion platform
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <h1
              className="
                text-[5.2vw]
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

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-[1.4vw]
                w-[38vw]
                text-[0.95vw]
                leading-[1.65]
                text-[var(--text-secondary)]
              "
            >
              Shop ready-to-wear pieces or create garments tailored
              to your measurements, style and preferences. Your
              profile, orders, payments, measurements and support —
              all in one place.
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
              "
            >
              <Button
                href="/sign-up"
                variant="primary"
                className="
                  h-[3.05vw]
                  px-[1.35vw]
                  text-[0.7vw]
                "
              >
                Become a Client

                <ArrowRight
                  size={14}
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
                  h-[3.05vw]
                  px-[1.35vw]
                  text-[0.7vw]
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
                  gap-[0.5vw]
                  text-[0.66vw]
                  font-semibold
                  leading-none
                  text-[var(--text-secondary)]
                  transition-colors
                  hover:text-[var(--text)]
                "
              >
                <span
                  className="
                    flex
                    h-[1.9vw]
                    w-[1.9vw]
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
                gap-[0.8vw]
              "
            >
              <div className="flex -space-x-[0.35vw]">
                <Avatar letter="M" />
                <Avatar letter="A" />
                <Avatar letter="S" />
                <Avatar letter="R" />
              </div>

              <div>
                <div className="flex items-center gap-[0.25vw]">
                  <span
                    className="
                      text-[0.72vw]
                      font-bold
                      leading-none
                      text-[var(--text)]
                    "
                  >
                    10K+
                  </span>

                  <span
                    className="
                      text-[0.6vw]
                      leading-none
                      text-[var(--text-secondary)]
                    "
                  >
                    clients
                  </span>
                </div>

                <p
                  className="
                    mt-[0.25vw]
                    text-[0.52vw]
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
              min-h-[38vw]
              items-center
              justify-center
            "
          >
            {/* =================================================
                MAIN IMAGE GLOW
            ================================================== */}

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
                overflow-hidden
                rounded-[1.45vw]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-[0.55vw]
                shadow-[0_2vw_6vw_rgba(0,0,0,0.38)]
                backdrop-blur-2xl
              "
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  aspect-[0.9]
                  overflow-hidden
                  rounded-[1.05vw]
                  bg-[#161616]
                "
              >
                <Image
                  src="/images/hero-fashion.jpg"
                  alt="Soul's Glory custom fashion"
                  fill
                  priority
                  sizes="36vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.035]
                  "
                />

                {/* =================================================
                    IMAGE OVERLAY
                ================================================== */}

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

                {/* =================================================
                    TOP LABEL
                ================================================== */}

                <div
                  className="
                    absolute
                    left-[1vw]
                    top-[1vw]
                    flex
                    items-center
                    gap-[0.45vw]
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
                    leading-none
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <span
                    className="
                      h-[0.35vw]
                      w-[0.35vw]
                      rounded-full
                      bg-[var(--primary)]
                    "
                  />

                  Custom Collection
                </div>

                {/* =================================================
                    BOTTOM CONTENT
                ================================================== */}

                <div
                  className="
                    absolute
                    bottom-[1vw]
                    left-[1vw]
                    right-[1vw]
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
                          leading-none
                          text-white/60
                        "
                      >
                        Made for you
                      </p>

                      <h2
                        className="
                          mt-[0.35vw]
                          text-[1.2vw]
                          font-semibold
                          leading-none
                          tracking-[-0.04em]
                          text-white
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
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black
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

              <div
                className="
                  grid
                  grid-cols-3
                  gap-[0.4vw]
                  p-[0.4vw]
                "
              >
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
                left-[-8.3vw]
                z-20
                w-[13vw]
                rounded-[0.8vw]
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                p-[0.8vw]
                shadow-[0_1.5vw_4.5vw_rgba(0,0,0,0.32)]
                backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-[0.6vw]">
                <div
                  className="
                    flex
                    h-[2vw]
                    w-[2vw]
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
                      text-[0.5vw]
                      font-medium
                      leading-none
                      text-[var(--text-tertiary)]
                    "
                  >
                    Client dashboard
                  </p>

                  <p
                    className="
                      mt-[0.25vw]
                      truncate
                      text-[0.62vw]
                      font-semibold
                      leading-none
                      text-[var(--text)]
                    "
                  >
                    Everything in one place
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-[0.8vw]
                  grid
                  grid-cols-3
                  gap-[0.2vw]
                "
              >
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
                gap-[0.45vw]
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--dropdown-bg)]
                px-[0.7vw]
                py-[0.5vw]
                shadow-[0_1.2vw_3.5vw_rgba(0,0,0,0.25)]
                backdrop-blur-2xl
              "
            >
              <span
                className="
                  flex
                  h-[1.5vw]
                  w-[1.5vw]
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
                  text-[0.52vw]
                  font-semibold
                  leading-none
                  text-[var(--text)]
                "
              >
                Chat with your tailor
              </span>

              <span
                className="
                  h-[0.35vw]
                  w-[0.35vw]
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
            border-t
            border-[var(--border)]
            py-[1.35vw]
            gap-[2.25vw]
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
    <div
      className="
        flex
        items-center
        gap-[0.4vw]
      "
    >
      <span
        className="
          flex
          h-[1.25vw]
          w-[1.25vw]
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
          text-[0.6vw]
          font-medium
          leading-none
          text-[var(--text-secondary)]
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
        rounded-[0.5vw]
        bg-[var(--surface)]
        px-[0.6vw]
        py-[0.55vw]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[0.3vw]
          text-[var(--text-tertiary)]
        "
      >
        {icon}

        <p
          className="
            text-[0.48vw]
            uppercase
            tracking-[0.08em]
            leading-none
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          mt-[0.3vw]
          text-[0.65vw]
          font-semibold
          leading-none
          text-[var(--text)]
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
        rounded-[0.4vw]
        bg-[var(--surface)]
        p-[0.4vw]
        text-center
      "
    >
      <p
        className="
          text-[0.72vw]
          font-bold
          leading-none
          text-[var(--text)]
        "
      >
        {value}
      </p>

      <p
        className="
          mt-[0.15vw]
          text-[0.4vw]
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
    <div
      className="
        group
        relative
        flex
        items-left
        justify-left
       
      "
    >
      {/* CARD */}

      <div
        className="
          relative
          flex
          w-full
          max-w-[100%]
          items-center
          gap-[0.7vw]
          rounded-[0.8vw]
          border
          border-[var(--border)]
          bg-[var(--dropdown-bg)]
          p-[0.8vw]
          shadow-[0_1.5vw_4.5vw_rgba(0,0,0,0.32)]
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-[0.2vw]
          hover:border-[var(--primary)]
          
        "
      >
        {/* NUMBER */}

        <div
          className="
            relative
            flex
            h-[2.6vw]
            w-[2.6vw]
            shrink-0
            items-center
            justify-center
            rounded-[0.55vw]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            shadow-[0_0.5vw_1.5vw_rgba(0,0,0,0.18)]
          "
        >
          {/* Small decorative dot */}

          <span
            className="
              absolute
              right-[0.35vw]
              top-[0.35vw]
              h-[0.22vw]
              w-[0.22vw]
              rounded-full
              bg-[var(--primary)]
              opacity-70
            "
          />

          <span
            className="
              text-[0.85vw]
              font-bold
              leading-none
              tracking-[-0.04em]
              text-[var(--text)]
            "
          >
            {number}
          </span>
        </div>

        {/* CONTENT */}

        <div className="min-w-0">
          <p
            className="
              text-[0.69vw]
              font-semibold
              leading-none
              tracking-[-0.01em]
              text-[var(--text)]
            "
          >
            {title}
          </p>

          <p
            className="
              mt-[0.32vw]
              text-[0.69vw]
              leading-[1.3]
              text-[var(--text-tertiary)]
            "
          >
            {description}
          </p>
        </div>

        {/* ACTIVE INDICATOR */}

        <span
          className="
            absolute
            bottom-[-0.18vw]
            left-1/2
            h-[0.35vw]
            w-[0.35vw]
            -translate-x-1/2
            rounded-full
            border
            border-[var(--bg)]
            bg-[var(--primary)]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      {/* VERTICAL DECORATIVE CONNECTOR */}

      
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
        h-[1.7vw]
        w-[1.7vw]
        items-center
        justify-center
        rounded-full
        border-[0.12vw]
        border-[var(--bg)]
        bg-[var(--surface-hover)]
        text-[0.56vw]
        font-bold
        leading-none
        text-[var(--text)]
      "
    >
      {letter}
    </div>
  );
}