"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

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
    <section
      className="
        relative
        bg-transparent
        py-[6vw]

        max-xl:py-[7vw]
        max-lg:py-20
        max-md:py-16
        max-sm:py-14
      "
    >
      <Container>
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            items-end
            justify-between
            gap-[4vw]

            max-lg:gap-8

            max-md:flex-col
            max-md:items-start
            max-md:gap-6
          "
        >
          {/* ===================================================
              HEADER CONTENT
          =================================================== */}

          <div
            className="
              min-w-0
              max-w-[58vw]

              max-lg:max-w-[700px]
              max-md:max-w-full
            "
          >
            {/* =================================================
                EYEBROW
            ================================================== */}

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
                Your Client Journey
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <h2
              className="
                max-w-[55vw]

                text-[3.2vw]
                font-semibold
                capitalize
                leading-[1]
                tracking-[-0.045em]
                text-hero-heading

                max-[1100px]:text-[42px]

                max-lg:max-w-[700px]
                max-lg:text-[38px]

                max-md:max-w-full
                max-md:text-[36px]

                max-sm:text-[30px]
              "
            >
              From Sign Up To Your Door.
            </h2>
          </div>

          {/* ===================================================
              DESCRIPTION
          =================================================== */}

          <p
            className="
              max-w-[30vw]

              text-[0.82vw]
              leading-[1.7]
              text-[var(--text-secondary)]

              max-xl:max-w-[400px]
              max-xl:text-[12px]

              max-lg:max-w-[440px]
              max-lg:text-[13px]

              max-md:max-w-[650px]
              max-md:text-[13px]
            "
          >
            Everything happens inside your account. Save your preferences,
            communicate with your tailor, follow your order and manage
            everything from one place.
          </p>
        </div>

        {/* =====================================================
            JOURNEY
        ====================================================== */}

        <div
          className="
            mt-[3.8vw]

            max-xl:mt-12
            max-lg:mt-10
            max-md:mt-8
          "
          onMouseLeave={() => setHoveredStep(null)}
        >
          {/* =================================================
              DESKTOP
          ================================================== */}

          <div className="hidden xl:block">
            <div className="relative grid grid-cols-6 gap-[0.7vw]">
              {/* =================================================
                  BASE PATH
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute

                  left-[8.333%]
                  right-[8.333%]
                  top-[1.8vw]

                  h-px

                  bg-[var(--border)]
                "
              />

              {/* =================================================
                  ACTIVE PATH
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute

                  left-[8.333%]
                  top-[1.8vw]

                  h-px

                  bg-primary

                  transition-all
                  duration-500
                  ease-out
                "
                style={{
                  width:
                    hoveredStep === null
                      ? "0%"
                      : `${(hoveredStep / 5) * 83.333}%`,
                }}
              />

              {journeySteps.map((step, index) => {
                const active =
                  hoveredStep !== null && index <= hoveredStep;

                const selected = hoveredStep === index;

                return (
                  <div
                    key={step.number}
                    className="
                      relative
                      px-[0.35vw]
                    "
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    {/* =================================================
                        NUMBER
                    ================================================== */}

                    <div className="relative z-10 flex justify-center">
                      <div
                        className={`
                          flex
                          h-[3.4vw]
                          w-[3.4vw]

                          min-h-[48px]
                          min-w-[48px]

                          items-center
                          justify-center

                          rounded-full
                          bg-[var(--bg)]

                          transition-transform
                          duration-300

                          ${
                            selected
                              ? "scale-110"
                              : "scale-100"
                          }
                        `}
                      >
                        <div
                          className={`
                            flex
                            h-[2.65vw]
                            w-[2.65vw]

                            min-h-[38px]
                            min-w-[38px]

                            items-center
                            justify-center

                            rounded-full

                            text-[0.68vw]
                            font-semibold
                            tracking-[0.08em]

                            transition-all
                            duration-300

                            max-[1280px]:text-[10px]

                            ${
                              active
                                ? "bg-primary text-[var(--primary-contrast)]"
                                : "bg-[var(--surface)] text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          {active ? (
                            <Check
                              className="
                                h-[0.85vw]
                                w-[0.85vw]

                                max-[1280px]:h-3.5
                                max-[1280px]:w-3.5
                              "
                              strokeWidth={2.2}
                            />
                          ) : (
                            step.number
                          )}
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        CARD
                    ================================================== */}

                    <div
                      className={`
                        mt-[1.45vw]

                        flex
                        min-h-[15vw]
                        flex-col

                        rounded-[1vw]

                        bg-[var(--surface)]

                        p-[1.25vw]

                        hover-animate-stitching

                        transition-colors
                        duration-300

                        max-[1280px]:rounded-[16px]
                        max-[1280px]:p-5

                        ${
                          selected
                            ? "bg-[var(--surface-hover)]"
                            : ""
                        }
                      `}
                    >
                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-[1vw]
                        "
                      >
                        <span
                          className={`
                            text-[0.62vw]
                            font-semibold
                            tracking-[0.16em]

                            max-[1280px]:text-[10px]

                            ${
                              selected
                                ? "text-[var(--primary)]"
                                : "text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          STEP {step.number}
                        </span>

                        <ArrowRight
                          className={`
                            h-[0.85vw]
                            w-[0.85vw]

                            transition-all
                            duration-300

                            max-[1280px]:h-3.5
                            max-[1280px]:w-3.5

                            ${
                              selected
                                ? "translate-x-0 text-[var(--primary)] opacity-100"
                                : "-translate-x-1 text-[var(--text-secondary)] opacity-0"
                            }
                          `}
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="mt-auto">
                        <h3
                          className="
                            max-w-[12vw]

                            text-[1.05vw]
                            font-semibold
                            leading-[1.1]
                            tracking-[-0.035em]

                            text-[var(--text)]

                            max-[1280px]:max-w-[170px]
                            max-[1280px]:text-[17px]
                          "
                        >
                          {step.title}
                        </h3>

                        <p
                          className="
                            mt-[0.75vw]

                            text-[0.68vw]
                            leading-[1.65]

                            text-[var(--text-secondary)]

                            max-[1280px]:mt-3
                            max-[1280px]:text-[12px]
                          "
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              TABLET / MOBILE
          ================================================== */}

          <div className="xl:hidden">
            <div className="relative">
              {/* VERTICAL PATH */}

              <div
                className="
                  absolute

                  bottom-[3vw]
                  left-[1.7vw]
                  top-[1.7vw]

                  w-px

                  bg-[var(--border)]

                  max-lg:bottom-[48px]
                  max-lg:left-[27px]
                  max-lg:top-[27px]
                "
              />

              {journeySteps.map((step, index) => {
                const active =
                  hoveredStep !== null && index <= hoveredStep;

                const selected = hoveredStep === index;

                return (
                  <div
                    key={step.number}
                    className="
                      group
                      relative

                      flex
                      gap-[1.4vw]
                      pb-[1.4vw]

                      last:pb-0

                      max-lg:gap-5
                      max-lg:pb-5

                      max-sm:gap-4
                    "
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    {/* =================================================
                        NODE
                    ================================================== */}

                    <div className="relative z-10 shrink-0">
                      <div
                        className="
                          flex

                          h-[3.4vw]
                          w-[3.4vw]

                          min-h-[48px]
                          min-w-[48px]

                          items-center
                          justify-center

                          rounded-full
                          bg-[var(--bg)]

                          max-lg:h-[54px]
                          max-lg:w-[54px]

                          max-sm:h-[48px]
                          max-sm:w-[48px]
                        "
                      >
                        <div
                          className={`
                            flex

                            h-[2.65vw]
                            w-[2.65vw]

                            min-h-[38px]
                            min-w-[38px]

                            items-center
                            justify-center

                            rounded-full

                            text-[0.65vw]
                            font-semibold
                            tracking-[0.08em]

                            transition-all
                            duration-300

                            max-lg:h-[42px]
                            max-lg:w-[42px]
                            max-lg:text-[10px]

                            max-sm:h-[36px]
                            max-sm:w-[36px]
                            max-sm:text-[9px]

                            ${
                              active
                                ? "bg-primary text-[var(--primary-contrast)]"
                                : "bg-[var(--surface)] text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          {active ? (
                            <Check
                              className="
                                h-[0.85vw]
                                w-[0.85vw]

                                max-lg:h-3.5
                                max-lg:w-3.5

                                max-sm:h-3
                                max-sm:w-3
                              "
                            />
                          ) : (
                            step.number
                          )}
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        MOBILE CARD
                    ================================================== */}

                    <div
                      className={`
                        min-h-[11vw]

                        flex-1

                        rounded-[1vw]

                        bg-[var(--surface)]

                        p-[1.4vw]

                        hover-animate-stitching

                        transition-colors
                        duration-300

                        max-lg:min-h-[160px]
                        max-lg:rounded-[16px]
                        max-lg:p-5

                        max-sm:min-h-[150px]
                        max-sm:p-4

                        ${
                          selected
                            ? "bg-[var(--surface-hover)]"
                            : ""
                        }
                      `}
                    >
                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <span
                          className={`
                            text-[0.62vw]
                            font-semibold
                            tracking-[0.16em]

                            max-lg:text-[10px]

                            ${
                              selected
                                ? "text-[var(--primary)]"
                                : "text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          STEP {step.number}
                        </span>

                        <ArrowRight
                          className={`
                            h-[0.85vw]
                            w-[0.85vw]

                            transition-all
                            duration-300

                            max-lg:h-3.5
                            max-lg:w-3.5

                            ${
                              selected
                                ? "translate-x-0 text-[var(--primary)] opacity-100"
                                : "text-[var(--text-secondary)] opacity-60"
                            }
                          `}
                        />
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                          mt-[1.5vw]

                          text-[1.15vw]
                          font-semibold
                          leading-[1.05]
                          tracking-[-0.035em]

                          text-[var(--text)]

                          max-lg:mt-7
                          max-lg:text-[18px]

                          max-sm:mt-5
                          max-sm:text-[17px]
                        "
                      >
                        {step.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-[0.7vw]

                          max-w-[520px]

                          text-[0.7vw]
                          leading-[1.65]

                          text-[var(--text-secondary)]

                          max-lg:mt-3
                          max-lg:text-[12px]

                          max-sm:text-[11px]
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
        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-[3vw]

            flex
            items-center
            justify-between
            gap-[2vw]

            max-xl:mt-10
            max-lg:mt-10

            max-md:flex-col
            max-md:items-start
            max-md:gap-5
          "
        >
          <p
            className="
              max-w-[34vw]

              text-[0.72vw]
              leading-[1.6]

              text-[var(--text-secondary)]

              max-xl:max-w-[500px]
              max-xl:text-[12px]

              max-lg:text-[13px]
            "
          >
            One account. One place. A simpler way to manage every
            custom garment from consultation to delivery.
          </p>

          <Button
            href="/sign-up"
            variant="primary"
            size="md"
            className="
              hover-animate-stitching
              group
              whitespace-nowrap
              !shadow-none

              px-[1.35vw]
              text-[0.72vw]

              max-xl:px-5
              max-xl:text-[10px]

              max-lg:px-5
              max-lg:text-[11px]

              max-sm:px-4
              max-sm:text-[10px]
            "
          >
            <span className="whitespace-nowrap">
              Start Your Journey
            </span>

            <ArrowRight
              className="
                h-[0.85vw]
                w-[0.85vw]

                transition-transform
                duration-300

                group-hover:translate-x-[0.2vw]

                max-lg:h-3.5
                max-lg:w-3.5
              "
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}