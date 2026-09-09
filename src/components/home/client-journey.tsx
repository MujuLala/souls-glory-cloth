"use client";

import {
  ArrowRight,
  Check,
  MessageCircle,
  Package,
  Ruler,
  Scissors,
  ShoppingBag,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

const journeySteps = [
  {
    number: "01",
    title: "Become a Client",
    description:
      "Create your account in seconds and unlock your personal dashboard.",
    icon: Check,
  },
  {
    number: "02",
    title: "Explore & Choose",
    description:
      "Browse collections, select ready-to-wear or start a custom piece.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Chat & Consult",
    description:
      "Talk to our team about fit, fabric, design and measurements.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Order & Pay",
    description:
      "Confirm details, address and secure payment from checkout.",
    icon: Package,
  },
  {
    number: "05",
    title: "We Craft It",
    description:
      "Follow measurement review, cutting, stitching and quality checks.",
    icon: Scissors,
  },
  {
    number: "06",
    title: "Track Delivery",
    description:
      "Get shipment updates until your finished piece arrives.",
    icon: Ruler,
  },
];

export default function ClientJourney() {
  return (
    <section className="relative ">
      <Container>
        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-[2.1vw]
            py-[2.2vw]
            backdrop-blur-2xl
          "
        >
          {/* =================================================
              LIGHT / DARK AMBIENT GLOW
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-[-10%]
              top-[-35%]
              h-[70%]
              w-[45%]
              rounded-full
              bg-[var(--primary)]
              opacity-[0.045]
              blur-[90px]
              dark:opacity-[0.08]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[-10%]
              top-[10%]
              h-[55%]
              w-[35%]
              rounded-full
              bg-[var(--primary)]
              opacity-[0.02]
              blur-[100px]
              dark:opacity-[0.045]
            "
          />

          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              relative
              z-10
              flex
              items-end
              justify-between
              gap-8
              max-md:flex-col
              max-md:items-start
            "
          >
            <div>
              <div
                className="
                  mb-[0.7vw]
                  flex
                  items-center
                  gap-[8px]
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--primary)]
                "
              >
                <span
                  className="
                    h-[6px]
                    w-[6px]
                    rounded-full
                    bg-[var(--primary)]
                  "
                />

                Your Client Journey
              </div>

              <h2
                className="
                  text-[clamp(32px,3vw,48px)]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.045em]
                  text-[var(--text)]
                "
              >
                From sign up to your door.
              </h2>
            </div>

            <p
              className="
                max-w-[400px]
                text-[12px]
                leading-[1.55]
                text-[var(--text-secondary)]
                max-md:max-w-[520px]
              "
            >
              Everything happens inside your account. Save your
              preferences once, chat with our team, track your
              order and manage every order from one place.
            </p>
          </div>

          {/* =================================================
              JOURNEY
          ================================================== */}

          <div className="relative z-10 mt-[2.8vw]">
            {/* Journey Line */}

            <div
              className="
                pointer-events-none
                absolute
                left-[2.1%]
                right-[2.1%]
                top-[28px]
                h-px
                bg-[var(--border)]
                max-md:hidden
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                left-[2.1%]
                top-[28px]
                h-px
                w-[16%]
                bg-[var(--primary)]
                max-md:hidden
              "
            />

            {/* Steps */}

            <div
              className="
                grid
                grid-cols-6
                gap-[1.2vw]
                max-lg:grid-cols-3
                max-md:grid-cols-1
              "
            >
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === 0;

                return (
                  <div
                    key={step.number}
                    className="
                      group
                      relative
                      min-w-0
                    "
                  >
                    {/* Step Number */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-[56px]
                        w-[56px]
                        items-center
                        justify-center
                        rounded-[14px]
                        border-[3px]
                        text-[11px]
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              border-[var(--text)]
                              bg-[var(--primary)]
                              text-white
                              shadow-[0_8px_25px_rgba(229,30,50,0.22)]
                            `
                            : `
                              border-[var(--border)]
                              bg-[var(--bg-secondary)]
                              text-[var(--text-tertiary)]
                              group-hover:border-[var(--primary)]
                              group-hover:text-[var(--primary)]
                            `
                        }
                      `}
                    >
                      {step.number}
                    </div>

                    {/* Content */}

                    <div className="mt-[10px]">
                      <div
                        className="
                          mb-[5px]
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-[var(--primary)]
                        "
                      >
                        {step.number}
                      </div>

                      <h3
                        className="
                          text-[12px]
                          font-semibold
                          leading-[1.2]
                          text-[var(--text)]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-[8px]
                          max-w-[180px]
                          text-[10px]
                          leading-[1.45]
                          text-[var(--text-secondary)]
                        "
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Icon */}

                    <div
                      className="
                        absolute
                        right-[4px]
                        top-[8px]
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-50
                        max-md:hidden
                      "
                    >
                      <Icon size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              BOTTOM CTA
          ================================================== */}

          <div
            className="
              relative
              z-10
              mt-[2.4vw]
              flex
              items-center
              justify-between
              gap-6
              border-t
              border-[var(--border)]
              pt-[1.5vw]
              max-md:flex-col
              max-md:items-start
            "
          >
            <p
              className="
                text-[11px]
                leading-[1.4]
                text-[var(--text-secondary)]
              "
            >
              Already a client? Sign in to continue to your
              orders, measurements and conversations.
            </p>

            <div className="flex shrink-0 items-center gap-[8px]">
              <Button
                href="/sign-in"
                variant="secondary"
                className="
                  h-[42px]
                  rounded-[9px]
                  px-[18px]
                  text-[11px]
                "
              >
                Log in
              </Button>

              <Button
                href="/sign-up"
                variant="primary"
                className="
                  h-[42px]
                  rounded-[9px]
                  px-[18px]
                  text-[11px]
                "
              >
                Become a Client
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}