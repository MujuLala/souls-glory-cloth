
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

const journeySteps = [
  {
    number: "01",
    title: "Become a Client",
    description:
      "Create your account in seconds and unlock your personal dashboard.",
  },
  {
    number: "02",
    title: "Explore & Choose",
    description:
      "Browse collections, select ready-to-wear or start a custom piece.",
  },
  {
    number: "03",
    title: "Chat & Consult",
    description:
      "Talk to our team about fit, fabric, design and measurements.",
  },
  {
    number: "04",
    title: "Order & Pay",
    description:
      "Confirm details, address and secure payment from checkout.",
  },
  {
    number: "05",
    title: "We Craft It",
    description:
      "Follow measurement review, cutting, stitching and quality checks.",
  },
  {
    number: "06",
    title: "Track Delivery",
    description:
      "Get shipment updates until your finished piece arrives.",
  },
];

export default function ClientJourney() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative">
      <Container>
        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-4
            py-6
            backdrop-blur-2xl

            sm:rounded-[22px]
            sm:px-6
            sm:py-8

            lg:rounded-[24px]
            lg:px-8
            lg:py-9

            xl:px-10
          "
        >
          {/* =================================================
              AMBIENT GLOW
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -left-[10%]
              -top-[35%]
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
              -right-[10%]
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
              flex-col
              gap-5

              md:flex-row
              md:items-end
              md:justify-between
              md:gap-8
            "
          >
            <div className="max-w-[700px]">
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--primary)]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[var(--primary)]
                  "
                />

                Your Client Journey
              </div>

              <h2
                className="
                  text-[clamp(30px,4vw,48px)]
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
                max-w-[520px]
                text-[13px]
                leading-[1.6]
                text-[var(--text-secondary)]

                md:max-w-[400px]
                md:text-[12px]
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

          <div
            className="relative z-10 mt-8 sm:mt-10 lg:mt-11"
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div
              className="
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-2
                sm:gap-4

                lg:grid-cols-3
                lg:gap-x-6
                lg:gap-y-10

                xl:grid-cols-6
                xl:gap-5
              "
            >
              {journeySteps.map((step, index) => {
                /*
                 * Current step + all previous steps
                 * become active.
                 */
                const isActive =
                  hoveredStep !== null && index <= hoveredStep;

                /*
                 * The divider after this step becomes active
                 * when this step has been reached.
                 *
                 * Example:
                 * Hover 03 → lines after 01, 02 and 03 active.
                 *
                 * There is no line after 06 because the
                 * connector is only rendered when index < 5.
                 */
                const isLineActive =
                  hoveredStep !== null && index <= hoveredStep;

                return (
                  <div
                    key={step.number}
                    className="
                      group
                      relative
                      min-w-0

                      rounded-[12px]
                      border
                      border-[var(--border)]
                      bg-[var(--bg)]
                      p-4

                      transition-all
                      duration-300

                      sm:p-5

                      lg:border-0
                      lg:bg-transparent
                      lg:p-0
                    "
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    {/* =================================================
                        DESKTOP CONNECTOR
                        No connector after 06
                    ================================================== */}

                    {index < journeySteps.length - 1 && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-[56px]
                          right-[-20px]
                          top-[28px]
                          z-0
                          hidden
                          h-[2px]
                          overflow-hidden
                          rounded-full
                          bg-[var(--border)]

                          xl:block
                        "
                      >
                        <span
                          className={`
                            block
                            h-full
                            origin-left
                            rounded-full
                            bg-[var(--primary)]
                            transition-[width]
                            duration-500
                            ease-out

                            ${
                              isLineActive
                                ? "w-full"
                                : "w-0"
                            }
                          `}
                        />
                      </div>
                    )}

                    {/* =================================================
                        MOBILE CONNECTOR
                    ================================================== */}

                    {index < journeySteps.length - 1 && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          bottom-[-13px]
                          left-[27px]
                          z-0
                          h-3
                          w-px
                          bg-[var(--border)]

                          sm:left-[27px]

                          lg:hidden
                        "
                      />
                    )}

                    {/* =================================================
                        NUMBER
                    ================================================== */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-[14px]
                        border-[2px]
                        text-[11px]
                        font-semibold
                        leading-none

                        transition-all
                        duration-300
                        ease-out

                        ${
                          isActive
                            ? `
                              border-white
                              bg-[var(--primary)]
                              text-white
                              shadow-[0_8px_25px_rgba(229,30,50,0.22)]
                            `
                            : `
                              border-[var(--border)]
                              bg-[var(--bg-secondary)]
                              text-[var(--text-tertiary)]
                            `
                        }
                      `}
                    >
                      {step.number}
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================== */}

                    <div className="mt-3">
                      <div
                        className="
                          mb-1.5
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-[var(--primary)]
                        "
                      >
                        Step {step.number}
                      </div>

                      <h3
                        className="
                          text-[13px]
                          font-semibold
                          leading-[1.25]
                          text-[var(--text)]

                          sm:text-[14px]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-[230px]
                          text-[11px]
                          leading-[1.5]
                          text-[var(--text-secondary)]

                          sm:text-[12px]
                        "
                      >
                        {step.description}
                      </p>
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
              mt-8
              flex
              flex-col
              gap-5
              border-t
              border-[var(--border)]
              pt-5

              sm:mt-10
              sm:pt-6

              md:flex-row
              md:items-center
              md:justify-between
              md:gap-6
            "
          >
            <p
              className="
                max-w-[620px]
                text-[11px]
                leading-[1.5]
                text-[var(--text-secondary)]

                sm:text-[12px]
              "
            >
              Already a client? Sign in to continue to your
              orders, measurements and conversations.
            </p>

            <div
              className="
                grid
                w-full
                grid-cols-2
                gap-2

                md:flex
                md:w-auto
                md:shrink-0
              "
            >
              <Button
                href="/sign-in"
                variant="secondary"
                className="
                  h-11
                  w-full
                  rounded-[9px]
                  px-4
                  text-[13px]

                  md:w-auto
                  md:px-[18px]
                "
              >
                Log in
              </Button>

              <Button
                href="/sign-up"
                variant="primary"
                className="
                  h-11
                  w-full
                  rounded-[9px]
                  px-4
                  text-[13px]

                  md:w-auto
                  md:px-[18px]
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

