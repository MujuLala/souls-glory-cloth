"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Heart,
  MapPin,
  MessageCircle,
  Ruler,
  Shirt,
  Sparkles,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const stats = [
  {
    label: "Active orders",
    value: "02",
    icon: Shirt,
  },
  {
    label: "Measurements",
    value: "03",
    icon: Ruler,
  },
  {
    label: "Wishlist",
    value: "08",
    icon: Heart,
  },
];

const orders = [
  {
    id: "#SG-1048",
    title: "Midnight Signature Kurta",
    type: "Custom Made",
    status: "Stitching",
    progress: 72,
  },
  {
    id: "#SG-1039",
    title: "Classic Formal Suit",
    type: "Ready to Wear",
    status: "In Transit",
    progress: 88,
  },
];

const accountItems = [
  {
    icon: Ruler,
    label: "Measurements",
    value: "3 profiles",
  },
  {
    icon: MapPin,
    label: "Saved addresses",
    value: "2 saved",
  },
  {
    icon: CreditCard,
    label: "Payments",
    value: "Up to date",
  },
];

const activities = [
  {
    icon: CheckCircle2,
    title: "Measurement profile updated",
    time: "2h ago",
  },
  {
    icon: Shirt,
    title: "Order moved to stitching",
    time: "Yesterday",
  },
];

/* -------------------------------------------------------------------------- */
/* ANIMATION                                                                  */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function DashboardPreview() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-[5.8vw]

        max-xl:py-[6.5vw]
        max-lg:py-16
        max-md:py-14
        max-sm:py-12
      "
    >
      <Container>
        {/* ================================================================
            SECTION INTRO
        ================================================================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          className="
            mb-[3vw]
            grid
            gap-[3vw]

            lg:grid-cols-[1.45fr_0.55fr]
            lg:items-end

            max-xl:mb-10
            max-lg:gap-7
            max-md:mb-8
            max-md:grid-cols-1
          "
        >
          {/* ==============================================================
              HEADING
          ============================================================== */}

          <div className="min-w-0">
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
                Your Account
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                max-w-[55vw]

                text-[3.15vw]
                font-semibold
                capitalize
                leading-[0.98]
                tracking-[-0.045em]
                text-hero-heading

                max-[1200px]:text-[40px]
                max-lg:max-w-[700px]
                max-lg:text-[38px]
                max-md:text-[35px]
                max-sm:text-[29px]
              "
            >
              Your entire experience.
              <br className="hidden sm:block" /> One simple dashboard.
            </h2>
          </div>

          {/* ==============================================================
              DESCRIPTION
          ============================================================== */}

          <p
            className="
              max-w-[28vw]
              text-[0.72vw]
              leading-[1.65]
              text-[var(--text-secondary)]

              max-xl:max-w-[380px]
              max-xl:text-[12px]

              max-lg:max-w-[520px]
              max-lg:text-[13px]

              max-md:max-w-[650px]
            "
          >
            Manage your orders, measurements, payments and conversations
            from one elegant client space.
          </p>
        </motion.div>

        {/* ================================================================
            DASHBOARD PREVIEW
        ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="relative w-full"
        >
          {/* ==============================================================
              DASHBOARD FRAME
          ============================================================== */}

          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[1.2vw]
              bg-surface

              max-lg:rounded-[16px]
              max-sm:rounded-[13px]
            "
          >
            {/* ============================================================
                TOP BAR
            ============================================================= */}

            <div
              className="
                flex
                min-h-[4.4vw]
                items-center
                justify-between
                gap-[2vw]
                px-[1.4vw]
                py-[0.9vw]

                max-lg:min-h-[62px]
                max-lg:px-5
                max-lg:py-3

                max-sm:min-h-[58px]
                max-sm:px-3.5
              "
            >
              {/* Client */}

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-[0.7vw]

                  max-lg:gap-2.5
                "
              >
                <div
                  className="
                    relative
                    flex
                    h-[2.35vw]
                    w-[2.35vw]
                    min-h-[34px]
                    min-w-[34px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-[var(--primary-contrast)]

                    max-lg:h-9
                    max-lg:w-9
                  "
                >
                  <UserRound
                    className="
                      h-[0.9vw]
                      w-[0.9vw]

                      max-lg:h-3.5
                      max-lg:w-3.5
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-[0.55vw]
                      w-[0.55vw]
                      min-h-[7px]
                      min-w-[7px]
                      rounded-full
                      border-2
                      border-surface
                      bg-green-500

                      max-lg:h-2
                      max-lg:w-2
                    "
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-[0.65vw]
                      font-semibold
                      text-[var(--text)]

                      max-lg:text-[12px]
                    "
                  >
                    Good morning, Ahmed
                  </p>

                  <p
                    className="
                      mt-[0.18vw]
                      truncate
                      text-[0.47vw]
                      text-[var(--text-secondary)]

                      max-lg:mt-0.5
                      max-lg:text-[9px]
                    "
                  >
                    Welcome back to your account.
                  </p>
                </div>
              </div>

              {/* Right */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-[0.55vw]

                  max-lg:gap-2
                "
              >
                <span
                  className="
                    hidden
                    rounded-full
                    bg-[var(--bg-secondary)]
                    px-[0.8vw]
                    py-[0.4vw]
                    text-[0.47vw]
                    font-medium
                    text-[var(--text-secondary)]

                    sm:block
                    max-lg:px-3
                    max-lg:py-1.5
                    max-lg:text-[8px]
                  "
                >
                  Client dashboard
                </span>

                <div
                  className="
                    relative
                    flex
                    h-[2.15vw]
                    w-[2.15vw]
                    min-h-[32px]
                    min-w-[32px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--bg-secondary)]

                    max-lg:h-8
                    max-lg:w-8
                  "
                >
                  <Bell
                    className="
                      h-[0.8vw]
                      w-[0.8vw]

                      max-lg:h-3.5
                      max-lg:w-3.5
                    "
                  />

                  <span
                    className="
                      absolute
                      right-[0.38vw]
                      top-[0.32vw]
                      h-[0.35vw]
                      w-[0.35vw]
                      min-h-[5px]
                      min-w-[5px]
                      rounded-full
                      bg-primary

                      max-lg:right-[6px]
                      max-lg:top-[5px]
                    "
                  />
                </div>
              </div>
            </div>

            {/* ============================================================
                DASHBOARD GRID
            ============================================================= */}

            <div
              className="
                grid
                gap-[1vw]
                p-[1vw]

                lg:grid-cols-2
                lg:items-stretch

                max-lg:gap-3
                max-lg:p-3
                max-md:grid-cols-1
              "
            >
              {/* ==========================================================
                  LEFT COLUMN
              =========================================================== */}

              <div
                className="
                  grid
                  min-w-0
                  grid-rows-[auto_auto_auto]
                  gap-[1vw]

                  max-lg:gap-3
                "
              >
                {/* ========================================================
                    STATS
                ========================================================= */}

                <div className="grid grid-cols-3 gap-[0.7vw] max-lg:gap-2">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                      <motion.div
                        key={stat.label}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.4,
                        }}
                        whileHover={{
                          y: -3,
                        }}
                        className="
                          group
                          flex
                          min-h-[7.7vw]
                          flex-col
                          justify-between
                          rounded-[0.8vw]
                          bg-[var(--bg-secondary)]
                          p-[0.9vw]
                          transition-colors
                          duration-300
                          hover:bg-surface-hover

                          max-lg:min-h-[112px]
                          max-lg:rounded-[12px]
                          max-lg:p-3
                        "
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="
                              flex
                              h-[2vw]
                              w-[2vw]
                              min-h-[28px]
                              min-w-[28px]
                              items-center
                              justify-center
                              rounded-[0.55vw]
                              bg-surface

                              max-lg:h-7
                              max-lg:w-7
                              max-lg:rounded-lg
                            "
                          >
                            <Icon
                              className="
                                h-[0.8vw]
                                w-[0.8vw]
                                text-[var(--text-secondary)]
                                transition-colors
                                duration-300
                                group-hover:text-primary

                                max-lg:h-3.5
                                max-lg:w-3.5
                              "
                            />
                          </div>

                          {index === 0 && (
                            <span
                              className="
                                h-[0.38vw]
                                w-[0.38vw]
                                min-h-[5px]
                                min-w-[5px]
                                rounded-full
                                bg-green-500

                                max-lg:h-1.5
                                max-lg:w-1.5
                              "
                            />
                          )}
                        </div>

                        <div>
                          <p
                            className="
                              text-[0.48vw]
                              font-medium
                              text-[var(--text-secondary)]

                              max-lg:text-[8px]
                            "
                          >
                            {stat.label}
                          </p>

                          <p
                            className="
                              mt-[0.3vw]
                              text-[1.55vw]
                              font-semibold
                              leading-none
                              tracking-[-0.05em]
                              text-[var(--text)]

                              max-lg:mt-1
                              max-lg:text-[23px]
                            "
                          >
                            {stat.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ========================================================
                    RECENT ORDERS
                ========================================================= */}

                <div
                  className="
                    flex
                    min-h-[17.5vw]
                    flex-col
                    rounded-[0.8vw]
                    bg-[var(--bg-secondary)]
                    p-[1vw]

                    max-lg:min-h-[245px]
                    max-lg:rounded-[12px]
                    max-lg:p-3.5
                  "
                >
                  <div
                    className="
                      mb-[0.8vw]
                      flex
                      items-center
                      justify-between
                      gap-3

                      max-lg:mb-3
                    "
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3
                          className="
                            text-[0.72vw]
                            font-semibold
                            text-[var(--text)]

                            max-lg:text-[13px]
                          "
                        >
                          Recent orders
                        </h3>

                        <span
                          className="
                            rounded-full
                            bg-surface
                            px-[0.4vw]
                            py-[0.15vw]
                            text-[0.38vw]
                            font-medium
                            text-[var(--text-secondary)]

                            max-lg:px-1.5
                            max-lg:py-0.5
                            max-lg:text-[6px]
                          "
                        >
                          2 active
                        </span>
                      </div>

                      <p
                        className="
                          mt-[0.15vw]
                          text-[0.45vw]
                          text-[var(--text-secondary)]

                          max-lg:mt-0.5
                          max-lg:text-[8px]
                        "
                      >
                        Track your latest pieces.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        text-[0.45vw]
                        font-medium
                        text-[var(--text-secondary)]
                        transition-colors
                        hover:text-primary

                        max-lg:text-[8px]
                      "
                    >
                      View all

                      <ArrowUpRight
                        className="
                          h-[0.7vw]
                          w-[0.7vw]

                          max-lg:h-3
                          max-lg:w-3
                        "
                      />
                    </button>
                  </div>

                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      justify-center
                      gap-[0.55vw]

                      max-lg:gap-2
                    "
                  >
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay: 0.15 + index * 0.1,
                          duration: 0.45,
                        }}
                        className="
                          group
                          flex
                          items-center
                          gap-[0.7vw]
                          rounded-[0.6vw]
                          bg-surface
                          p-[0.55vw]
                          transition-colors
                          duration-300
                          hover:bg-surface-hover

                          max-lg:gap-2.5
                          max-lg:rounded-[10px]
                          max-lg:p-2
                        "
                      >
                        {/* Product */}

                        <div
                          className="
                            flex
                            h-[3.1vw]
                            w-[3.1vw]
                            min-h-[44px]
                            min-w-[44px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-[0.5vw]
                            bg-[var(--bg-secondary)]

                            max-lg:h-11
                            max-lg:w-11
                            max-lg:rounded-lg
                          "
                        >
                          <Shirt
                            className="
                              h-[0.95vw]
                              w-[0.95vw]
                              text-[var(--text-secondary)]
                              transition-transform
                              duration-500
                              group-hover:scale-110

                              max-lg:h-4
                              max-lg:w-4
                            "
                          />
                        </div>

                        {/* Info */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4
                              className="
                                truncate
                                text-[0.55vw]
                                font-semibold
                                text-[var(--text)]

                                max-lg:text-[10px]
                              "
                            >
                              {order.title}
                            </h4>

                            <span
                              className="
                                hidden
                                shrink-0
                                rounded-full
                                bg-primary/10
                                px-[0.4vw]
                                py-[0.15vw]
                                text-[0.38vw]
                                font-semibold
                                text-primary

                                sm:inline-flex
                                max-lg:px-1.5
                                max-lg:py-0.5
                                max-lg:text-[6px]
                              "
                            >
                              {order.status}
                            </span>
                          </div>

                          <p
                            className="
                              mt-[0.12vw]
                              text-[0.4vw]
                              text-[var(--text-secondary)]

                              max-lg:mt-0.5
                              max-lg:text-[7px]
                            "
                          >
                            {order.id} · {order.type}
                          </p>

                          <div
                            className="
                              mt-[0.45vw]
                              flex
                              items-center
                              gap-[0.45vw]

                              max-lg:mt-2
                              max-lg:gap-2
                            "
                          >
                            <div
                              className="
                                h-[3px]
                                flex-1
                                overflow-hidden
                                rounded-full
                                bg-[var(--border)]
                              "
                            >
                              <motion.div
                                initial={{
                                  width: 0,
                                }}
                                whileInView={{
                                  width: `${order.progress}%`,
                                }}
                                viewport={{
                                  once: true,
                                }}
                                transition={{
                                  duration: 1,
                                  delay: 0.35 + index * 0.12,
                                  ease: [0.22, 1, 0.36, 1] as const,
                                }}
                                className="
                                  h-full
                                  rounded-full
                                  bg-primary
                                "
                              />
                            </div>

                            <span
                              className="
                                text-[0.4vw]
                                font-medium
                                text-[var(--text-secondary)]

                                max-lg:text-[7px]
                              "
                            >
                              {order.progress}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ========================================================
                    APPOINTMENT
                ========================================================= */}

                <div
                  className="
                    flex
                    min-h-[6.2vw]
                    items-center
                    justify-between
                    gap-[1vw]
                    rounded-[0.8vw]
                    bg-[var(--bg-secondary)]
                    p-[1vw]

                    max-lg:min-h-[92px]
                    max-lg:rounded-[12px]
                    max-lg:p-3
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-[0.7vw]

                      max-lg:gap-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-[2.35vw]
                        w-[2.35vw]
                        min-h-[36px]
                        min-w-[36px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[0.55vw]
                        bg-surface

                        max-lg:h-9
                        max-lg:w-9
                        max-lg:rounded-lg
                      "
                    >
                      <CalendarDays
                        className="
                          h-[0.9vw]
                          w-[0.9vw]
                          text-primary

                          max-lg:h-4
                          max-lg:w-4
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[0.4vw]
                          uppercase
                          tracking-[0.12em]
                          text-[var(--text-secondary)]

                          max-lg:text-[7px]
                        "
                      >
                        Next appointment
                      </p>

                      <p
                        className="
                          mt-[0.25vw]
                          truncate
                          text-[0.55vw]
                          font-semibold
                          text-[var(--text)]

                          max-lg:mt-1
                          max-lg:text-[10px]
                        "
                      >
                        Final fitting session
                      </p>

                      <p
                        className="
                          mt-[0.2vw]
                          flex
                          items-center
                          gap-1
                          text-[0.4vw]
                          text-[var(--text-secondary)]

                          max-lg:mt-1
                          max-lg:text-[7px]
                        "
                      >
                        <Clock3
                          className="
                            h-[0.6vw]
                            w-[0.6vw]

                            max-lg:h-2.5
                            max-lg:w-2.5
                          "
                        />

                        Tomorrow · 04:30 PM
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-[0.3vw]
                      rounded-full
                      bg-surface
                      px-[0.55vw]
                      py-[0.3vw]
                      text-[0.4vw]
                      font-medium
                      text-primary

                      max-lg:gap-1.5
                      max-lg:px-2
                      max-lg:py-1
                      max-lg:text-[7px]
                    "
                  >
                    <span
                      className="
                        h-[0.35vw]
                        w-[0.35vw]
                        min-h-[5px]
                        min-w-[5px]
                        rounded-full
                        bg-primary

                        max-lg:h-1.5
                        max-lg:w-1.5
                      "
                    />

                    Upcoming
                  </span>
                </div>
              </div>

              {/* ==========================================================
                  RIGHT COLUMN
              =========================================================== */}

              <div
                className="
                  grid
                  min-w-0
                  grid-rows-[auto_auto_auto]
                  gap-[1vw]

                  max-lg:gap-3
                "
              >
                {/* ========================================================
                    PROFILE
                ========================================================= */}

                <div
                  className="
                    flex
                    min-h-[7.7vw]
                    flex-col
                    justify-between
                    rounded-[0.8vw]
                    bg-[var(--bg-secondary)]
                    p-[1vw]

                    max-lg:min-h-[112px]
                    max-lg:rounded-[12px]
                    max-lg:p-3.5
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="
                          text-[0.4vw]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-primary

                          max-lg:text-[7px]
                        "
                      >
                        Personal profile
                      </p>

                      <h3
                        className="
                          mt-[0.35vw]
                          text-[1.05vw]
                          font-semibold
                          leading-[1.05]
                          tracking-[-0.04em]
                          text-[var(--text)]

                          max-lg:mt-1.5
                          max-lg:text-[16px]
                        "
                      >
                        Your style,
                        <br />
                        already saved.
                      </h3>
                    </div>

                    <div
                      className="
                        flex
                        h-[2vw]
                        w-[2vw]
                        min-h-[30px]
                        min-w-[30px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-surface

                        max-lg:h-8
                        max-lg:w-8
                      "
                    >
                      <Sparkles
                        className="
                          h-[0.8vw]
                          w-[0.8vw]
                          text-primary

                          max-lg:h-3.5
                          max-lg:w-3.5
                        "
                      />
                    </div>
                  </div>

                  <div className="mt-[0.9vw]">
                    <div className="mb-[0.35vw] flex items-center justify-between">
                      <span
                        className="
                          text-[0.4vw]
                          text-[var(--text-secondary)]

                          max-lg:text-[8px]
                        "
                      >
                        Profile completion
                      </span>

                      <span
                        className="
                          text-[0.4vw]
                          font-semibold
                          text-[var(--text)]

                          max-lg:text-[8px]
                        "
                      >
                        92%
                      </span>
                    </div>

                    <div
                      className="
                        h-[3px]
                        overflow-hidden
                        rounded-full
                        bg-[var(--border)]
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: "92%",
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="
                          h-full
                          rounded-full
                          bg-primary
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    ACCOUNT
                ========================================================= */}

                <div
                  className="
                    flex
                    min-h-[17.5vw]
                    flex-col
                    rounded-[0.8vw]
                    bg-[var(--bg-secondary)]
                    p-[1vw]

                    max-lg:min-h-[245px]
                    max-lg:rounded-[12px]
                    max-lg:p-3.5
                  "
                >
                  <div
                    className="
                      mb-[0.8vw]
                      flex
                      items-center
                      justify-between

                      max-lg:mb-3
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-[0.72vw]
                          font-semibold
                          text-[var(--text)]

                          max-lg:text-[13px]
                        "
                      >
                        Account
                      </h3>

                      <p
                        className="
                          mt-[0.15vw]
                          text-[0.45vw]
                          text-[var(--text-secondary)]

                          max-lg:mt-0.5
                          max-lg:text-[8px]
                        "
                      >
                        Manage your personal details.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-[2vw]
                        w-[2vw]
                        min-h-[28px]
                        min-w-[28px]
                        items-center
                        justify-center
                        rounded-full
                        bg-surface

                        max-lg:h-7
                        max-lg:w-7
                      "
                    >
                      <UserRound
                        className="
                          h-[0.7vw]
                          w-[0.7vw]

                          max-lg:h-3.5
                          max-lg:w-3.5
                        "
                      />
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      justify-center
                      gap-[0.35vw]

                      max-lg:gap-1.5
                    "
                  >
                    {accountItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.label}
                          type="button"
                          className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-3
                            rounded-[0.55vw]
                            bg-surface
                            px-[0.65vw]
                            py-[0.6vw]
                            text-left
                            transition-colors
                            duration-300
                            hover:bg-surface-hover

                            max-lg:rounded-[9px]
                            max-lg:px-2.5
                            max-lg:py-2.5
                          "
                        >
                          <div
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-[0.55vw]

                              max-lg:gap-2.5
                            "
                          >
                            <div
                              className="
                                flex
                                h-[1.8vw]
                                w-[1.8vw]
                                min-h-[26px]
                                min-w-[26px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[0.4vw]
                                bg-[var(--bg-secondary)]

                                max-lg:h-7
                                max-lg:w-7
                                max-lg:rounded-md
                              "
                            >
                              <Icon
                                className="
                                  h-[0.7vw]
                                  w-[0.7vw]
                                  text-[var(--text-secondary)]
                                  transition-colors
                                  duration-300
                                  group-hover:text-primary

                                  max-lg:h-3.5
                                  max-lg:w-3.5
                                "
                              />
                            </div>

                            <span
                              className="
                                truncate
                                text-[0.5vw]
                                font-medium
                                text-[var(--text)]

                                max-lg:text-[9px]
                              "
                            >
                              {item.label}
                            </span>
                          </div>

                          <div
                            className="
                              flex
                              shrink-0
                              items-center
                              gap-[0.3vw]

                              max-lg:gap-1
                            "
                          >
                            <span
                              className="
                                text-[0.4vw]
                                text-[var(--text-secondary)]

                                max-lg:text-[7px]
                              "
                            >
                              {item.value}
                            </span>

                            <ChevronRight
                              className="
                                h-[0.55vw]
                                w-[0.55vw]
                                text-[var(--text-secondary)]
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5

                                max-lg:h-2.5
                                max-lg:w-2.5
                              "
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ========================================================
                    NEED HELP
                ========================================================= */}

                <div
                  className="
                    group
                    relative
                    flex
                    min-h-[6.2vw]
                    items-center
                    justify-between
                    gap-[1vw]
                    overflow-hidden
                    rounded-[0.8vw]
                    bg-primary
                    p-[1vw]
                    text-[var(--primary-contrast)]
                    transition-transform
                    duration-300
                    hover:-translate-y-[2px]

                    max-lg:min-h-[92px]
                    max-lg:rounded-[12px]
                    max-lg:p-3.5
                  "
                >
                  <div
                    className="
                      relative
                      z-10
                      flex
                      min-w-0
                      items-center
                      gap-[0.7vw]

                      max-lg:gap-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-[2.2vw]
                        w-[2.2vw]
                        min-h-[32px]
                        min-w-[32px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--primary-contrast)]/10

                        max-lg:h-8
                        max-lg:w-8
                      "
                    >
                      <MessageCircle
                        className="
                          h-[0.8vw]
                          w-[0.8vw]

                          max-lg:h-3.5
                          max-lg:w-3.5
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3
                          className="
                            text-[0.58vw]
                            font-semibold

                            max-lg:text-[11px]
                          "
                        >
                          Need help?
                        </h3>

                        <span
                          className="
                            h-[0.35vw]
                            w-[0.35vw]
                            min-h-[5px]
                            min-w-[5px]
                            rounded-full
                            bg-green-400

                            max-lg:h-1.5
                            max-lg:w-1.5
                          "
                        />
                      </div>

                      <p
                        className="
                          mt-[0.12vw]
                          text-[0.4vw]
                          opacity-65

                          max-lg:mt-0.5
                          max-lg:text-[7px]
                        "
                      >
                        Your tailor is online
                      </p>

                      <p
                        className="
                          mt-[0.45vw]
                          max-w-[20vw]
                          text-[0.42vw]
                          leading-[1.5]
                          opacity-75

                          max-lg:mt-2
                          max-lg:max-w-[280px]
                          max-lg:text-[8px]
                        "
                      >
                        Questions about your fitting, order or delivery?
                        We&apos;re here to help.
                      </p>
                    </div>
                  </div>

                  {/* Chat CTA */}

                  <Button
                    href="/chat"
                    variant="secondary"
                    size="sm"
                    className="
                      relative
                      z-10
                      shrink-0
                      rounded-full
                      !border-0
                      bg-[var(--primary-contrast)]
                      !text-[var(--primary)]
                      !shadow-none
                      hover:bg-[var(--primary-contrast)]

                      max-lg:h-9
                      max-lg:px-3
                      max-lg:text-[8px]
                    "
                  >
                    Chat now

                    <ArrowUpRight
                      className="
                        h-[0.65vw]
                        w-[0.65vw]

                        max-lg:h-3
                        max-lg:w-3
                      "
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              FLOATING UPDATE
          ============================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.8,
              duration: 0.6,
            }}
            animate={{
              y: [0, -5, 0],
            }}
            className="
              absolute
              right-[-0.8vw]
              top-[12%]
              z-20
              hidden
              items-center
              gap-[0.55vw]
              rounded-full
              bg-surface
              px-[0.75vw]
              py-[0.5vw]

              lg:flex
              xl:right-[-1.2vw]
            "
          >
            <div
              className="
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

                max-lg:h-6
                max-lg:w-6
              "
            >
              <CheckCircle2
                className="
                  h-[0.65vw]
                  w-[0.65vw]

                  max-lg:h-3
                  max-lg:w-3
                "
              />
            </div>

            <div>
              <p
                className="
                  whitespace-nowrap
                  text-[0.42vw]
                  font-semibold
                  text-[var(--text)]

                  max-lg:text-[8px]
                "
              >
                Order updated
              </p>

              <p
                className="
                  mt-[0.08vw]
                  whitespace-nowrap
                  text-[0.35vw]
                  text-[var(--text-secondary)]

                  max-lg:text-[6px]
                "
              >
                SG-1048 is now stitching
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}