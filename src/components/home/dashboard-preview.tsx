"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
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
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-[6vw]">
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
            mb-9
            grid
            gap-5

            sm:mb-11

            lg:mb-[3vw]
            lg:grid-cols-[1.4fr_0.6fr]
            lg:items-end
            lg:gap-[3vw]
          "
        >
          {/* ==============================================================
              HEADING
          ============================================================== */}

          <div>
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
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
                Your account
              </span>
            </div>

            <h2
              className="
                max-w-[850px]
                text-[3vw]
                font-bold
                leading-[0.96]
                tracking-[-0.06em]
                text-[var(--text)]

                max-lg:text-[40px]
                max-md:text-[35px]
                max-sm:text-[31px]
              "
            >
              Your entire experience.
              <br />

              <span className="text-[var(--primary)]">
                One simple dashboard.
              </span>
            </h2>
          </div>

          {/* ==============================================================
              DESCRIPTION
          ============================================================== */}

          <p
            className="
              max-w-[420px]
              text-[13px]
              leading-[1.65]
              text-[var(--muted-foreground)]

              sm:text-[14px]

              lg:pb-[0.25vw]
            "
          >
            Manage your orders, measurements, payments and
            conversations from one elegant client space.
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
          className="
            relative
            mx-auto
            max-w-[1120px]
          "
        >
          {/* ==============================================================
              SOFT BACKGROUND GLOW
          ============================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[55%]
              w-[65%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[var(--primary)]
              opacity-[0.035]
              blur-[100px]
            "
          />

          {/* ==============================================================
              DASHBOARD FRAME
          ============================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              shadow-[0_25px_75px_rgba(0,0,0,0.14)]

              sm:rounded-[20px]

              lg:rounded-[22px]
            "
          >
            {/* ============================================================
                TOP BAR
            ============================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-3.5
                py-3

                sm:px-5
                sm:py-3.5

                lg:px-6
              "
            >
              {/* Client */}

              <div className="flex items-center gap-2.5">
                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-white

                    sm:h-9
                    sm:w-9
                  "
                >
                  <UserRound className="h-3.5 w-3.5" />

                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-2
                      w-2
                      rounded-full
                      border-2
                      border-[var(--surface)]
                      bg-green-500
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      text-[var(--foreground)]

                      sm:text-[12px]
                    "
                  >
                    Good morning, Ahmed
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      text-[var(--muted-foreground)]

                      sm:text-[9px]
                    "
                  >
                    Welcome back to your account.
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-2">
                <span
                  className="
                    hidden
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    px-3
                    py-1.5
                    text-[8px]
                    font-medium
                    text-[var(--muted-foreground)]

                    sm:block
                  "
                >
                  Client dashboard
                </span>

                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                  "
                >
                  <Bell className="h-3.5 w-3.5" />

                  <span
                    className="
                      absolute
                      right-[6px]
                      top-[5px]
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--primary)]
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
                gap-3
                p-3

                sm:gap-4
                sm:p-4

                lg:grid-cols-2
                lg:items-stretch
                lg:gap-4
                lg:p-5
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
                  gap-3

                  sm:gap-4

                  lg:h-full
                "
              >
                {/* ========================================================
                    STATS
                ========================================================= */}

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
                          min-h-[112px]
                          flex-col
                          justify-between
                          rounded-[12px]
                          border
                          border-[var(--border)]
                          bg-[var(--dropdown-bg)]
                          p-3
                          transition-all
                          duration-300
                          hover:border-[var(--primary)]/30

                          sm:min-h-[125px]
                          sm:rounded-[14px]
                          sm:p-3.5
                        "
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-lg
                              bg-[var(--surface)]
                            "
                          >
                            <Icon
                              className="
                                h-3.5
                                w-3.5
                                text-[var(--muted-foreground)]
                                transition-colors
                                duration-300
                                group-hover:text-[var(--primary)]
                              "
                            />
                          </div>

                          {index === 0 && (
                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-green-500
                              "
                            />
                          )}
                        </div>

                        <div>
                          <p
                            className="
                              text-[8px]
                              font-medium
                              text-[var(--muted-foreground)]

                              sm:text-[9px]
                            "
                          >
                            {stat.label}
                          </p>

                          <p
                            className="
                              mt-1
                              text-[23px]
                              font-semibold
                              leading-none
                              tracking-[-0.05em]
                              text-[var(--foreground)]

                              sm:text-[27px]
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
                    min-h-[245px]
                    flex-col
                    rounded-[12px]
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    p-3

                    sm:min-h-[265px]
                    sm:rounded-[14px]
                    sm:p-4
                  "
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3
                          className="
                            text-[13px]
                            font-semibold
                            text-[var(--foreground)]

                            sm:text-[14px]
                          "
                        >
                          Recent orders
                        </h3>

                        <span
                          className="
                            rounded-full
                            bg-[var(--surface)]
                            px-1.5
                            py-0.5
                            text-[6px]
                            font-medium
                            text-[var(--muted-foreground)]
                          "
                        >
                          2 active
                        </span>
                      </div>

                      <p
                        className="
                          mt-0.5
                          text-[8px]
                          text-[var(--muted-foreground)]

                          sm:text-[9px]
                        "
                      >
                        Track your latest pieces.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        items-center
                        gap-1
                        text-[8px]
                        font-medium
                        text-[var(--muted-foreground)]
                        transition-colors
                        hover:text-[var(--primary)]
                      "
                    >
                      View all
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col justify-center gap-2">
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
                          gap-2.5
                          rounded-[10px]
                          border
                          border-[var(--border)]
                          p-2
                          transition-all
                          duration-300
                          hover:border-[var(--primary)]/30
                          hover:bg-[var(--surface)]

                          sm:gap-3
                          sm:p-2.5
                        "
                      >
                        {/* PRODUCT */}

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-[8px]
                            bg-[var(--surface)]

                            sm:h-12
                            sm:w-12
                          "
                        >
                          <Shirt
                            className="
                              h-4
                              w-4
                              text-[var(--muted-foreground)]
                              transition-transform
                              duration-500
                              group-hover:scale-110
                            "
                          />
                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4
                              className="
                                truncate
                                text-[10px]
                                font-semibold
                                text-[var(--foreground)]

                                sm:text-[11px]
                              "
                            >
                              {order.title}
                            </h4>

                            <span
                              className="
                                hidden
                                shrink-0
                                rounded-full
                                bg-[var(--primary)]/10
                                px-1.5
                                py-0.5
                                text-[6px]
                                font-semibold
                                text-[var(--primary)]

                                sm:inline-flex
                              "
                            >
                              {order.status}
                            </span>
                          </div>

                          <p
                            className="
                              mt-0.5
                              text-[7px]
                              text-[var(--muted-foreground)]

                              sm:text-[8px]
                            "
                          >
                            {order.id} · {order.type}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
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
                                  bg-[var(--primary)]
                                "
                              />
                            </div>

                            <span
                              className="
                                text-[7px]
                                font-medium
                                text-[var(--muted-foreground)]
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
                    min-h-[92px]
                    items-center
                    justify-between
                    gap-3
                    rounded-[12px]
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    p-3

                    sm:min-h-[105px]
                    sm:rounded-[14px]
                    sm:p-4
                  "
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[var(--surface)]
                      "
                    >
                      <CalendarDays
                        className="
                          h-4
                          w-4
                          text-[var(--primary)]
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[7px]
                          uppercase
                          tracking-[0.12em]
                          text-[var(--muted-foreground)]
                        "
                      >
                        Next appointment
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[10px]
                          font-semibold
                          text-[var(--foreground)]

                          sm:text-[11px]
                        "
                      >
                        Final fitting session
                      </p>

                      <p
                        className="
                          mt-1
                          flex
                          items-center
                          gap-1
                          text-[7px]
                          text-[var(--muted-foreground)]
                        "
                      >
                        <Clock3 className="h-2.5 w-2.5" />
                        Tomorrow · 04:30 PM
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-[var(--border)]
                      px-2
                      py-1
                      text-[7px]
                      font-medium
                      text-[var(--primary)]
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
                  gap-3

                  sm:gap-4

                  lg:h-full
                "
              >
                {/* ========================================================
                    PROFILE
                ========================================================= */}

                <div
                  className="
                    flex
                    min-h-[112px]
                    flex-col
                    justify-between
                    rounded-[12px]
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    p-3.5

                    sm:min-h-[125px]
                    sm:rounded-[14px]
                    sm:p-4
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="
                          text-[7px]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[var(--primary)]
                        "
                      >
                        Personal profile
                      </p>

                      <h3
                        className="
                          mt-1.5
                          text-[16px]
                          font-semibold
                          leading-tight
                          tracking-[-0.04em]
                          text-[var(--foreground)]

                          sm:text-[18px]
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
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--surface)]
                      "
                    >
                      <Sparkles
                        className="
                          h-3.5
                          w-3.5
                          text-[var(--primary)]
                        "
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span
                        className="
                          text-[8px]
                          text-[var(--muted-foreground)]
                        "
                      >
                        Profile completion
                      </span>

                      <span
                        className="
                          text-[8px]
                          font-semibold
                          text-[var(--foreground)]
                        "
                      >
                        92%
                      </span>
                    </div>

                    <div
                      className="
                        h-[4px]
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
                          bg-[var(--primary)]
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
                    min-h-[245px]
                    flex-col
                    rounded-[12px]
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    p-3

                    sm:min-h-[265px]
                    sm:rounded-[14px]
                    sm:p-4
                  "
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3
                        className="
                          text-[13px]
                          font-semibold
                          text-[var(--foreground)]

                          sm:text-[14px]
                        "
                      >
                        Account
                      </h3>

                      <p
                        className="
                          mt-0.5
                          text-[8px]
                          text-[var(--muted-foreground)]
                        "
                      >
                        Manage your personal details.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--surface)]
                      "
                    >
                      <UserRound className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center gap-1.5">
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
                            rounded-[9px]
                            border
                            border-[var(--border)]
                            px-2.5
                            py-2.5
                            text-left
                            transition-all
                            duration-300
                            hover:border-[var(--primary)]/30
                            hover:bg-[var(--surface)]
                          "
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div
                              className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                bg-[var(--surface)]
                              "
                            >
                              <Icon
                                className="
                                  h-3.5
                                  w-3.5
                                  text-[var(--muted-foreground)]
                                  transition-colors
                                  duration-300
                                  group-hover:text-[var(--primary)]
                                "
                              />
                            </div>

                            <span
                              className="
                                truncate
                                text-[9px]
                                font-medium
                                text-[var(--foreground)]

                                sm:text-[10px]
                              "
                            >
                              {item.label}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            <span
                              className="
                                text-[7px]
                                text-[var(--muted-foreground)]
                              "
                            >
                              {item.value}
                            </span>

                            <ChevronRight
                              className="
                                h-2.5
                                w-2.5
                                text-[var(--muted-foreground)]
                                transition-transform
                                group-hover:translate-x-0.5
                              "
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ========================================================
                    NEED HELP — HIGHLIGHT
                ========================================================= */}

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    group
                    relative
                    min-h-[92px]
                    overflow-hidden
                    rounded-[12px]
                    border
                    border-[var(--primary)]/25
                    bg-[var(--primary)]
                    p-3.5
                    text-white
                    shadow-[0_16px_45px_rgba(229,30,50,0.16)]

                    sm:min-h-[105px]
                    sm:rounded-[14px]
                    sm:p-4
                  "
                >
                  {/* Decorative glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-white/10
                      blur-2xl
                      transition-transform
                      duration-700
                      group-hover:scale-125
                    "
                  />

                  {/* Decorative ring */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-10
                      right-8
                      h-24
                      w-24
                      rounded-full
                      border
                      border-white/10
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    {/* Help content */}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white/15
                            backdrop-blur-sm
                          "
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3
                              className="
                                text-[11px]
                                font-semibold
                                text-white

                                sm:text-[12px]
                              "
                            >
                              Need help?
                            </h3>

                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-green-300
                              "
                            />
                          </div>

                          <p
                            className="
                              mt-0.5
                              text-[7px]
                              text-white/60
                            "
                          >
                            Your tailor is online
                          </p>
                        </div>
                      </div>

                      <p
                        className="
                          mt-3
                          max-w-[260px]
                          text-[8px]
                          leading-[1.5]
                          text-white/75
                        "
                      >
                        Questions about your fitting, order or
                        delivery? We&apos;re here to help.
                      </p>
                    </div>

                    {/* CTA */}

                    <button
                      type="button"
                      className="
                        flex
                        h-9
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-full
                        bg-white
                        px-3
                        text-[8px]
                        font-semibold
                        text-[var(--primary)]
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        hover:shadow-[0_8px_25px_rgba(0,0,0,0.14)]
                      "
                    >
                      Chat now
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
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
              -right-2
              top-[12%]
              z-20
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--dropdown-bg)]
              px-3
              py-2
              shadow-[0_15px_45px_rgba(0,0,0,0.15)]
              backdrop-blur-xl

              lg:flex

              xl:-right-5
            "
          >
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                text-white
              "
            >
              <CheckCircle2 className="h-3 w-3" />
            </div>

            <div>
              <p
                className="
                  text-[8px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Order updated
              </p>

              <p
                className="
                  mt-0.5
                  text-[6px]
                  text-[var(--muted-foreground)]
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