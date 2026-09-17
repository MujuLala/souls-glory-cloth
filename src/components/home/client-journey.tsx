"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

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
    <section className="relative pb-16 sm:pb-20 lg:pb-24">
      <Container>
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <p
              className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[var(--primary)]
              "
            >
              Your Client Journey
            </p>

            <h2
              className="
                whitespace-nowrap
                text-[3.2vw]
                font-[100]
                uppercase
                leading-[0.92]
                tracking-[-0.055em]
                text-[var(--text)]

                max-[1100px]:text-[42px]
                max-lg:text-[38px]
                max-md:whitespace-normal
                max-md:text-[36px]
                max-sm:text-[30px]
              "
            >
              From sign up to your door.
            </h2>
          </div>

          <p
            className="
              max-w-[440px]
              text-[13px]
              leading-[1.7]
              text-[var(--text-secondary)]
              md:text-right
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
          className="mt-12 sm:mt-14 lg:mt-16"
          onMouseLeave={() => setHoveredStep(null)}
        >
          {/* -------------------------------------------------
              DESKTOP STITCH PATH
          -------------------------------------------------- */}

          <div className="hidden xl:block">
            <div className="relative grid grid-cols-6">
              {/* Base path */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[8.333%]
                  right-[8.333%]
                  top-[27px]
                  h-px
                  bg-[var(--border)]
                "
              />

              {/* Active path */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[8.333%]
                  top-[27px]
                  h-px
                  bg-[var(--primary)]
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
                    className="relative px-2"
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    {/* Number */}

                    <div className="relative z-10 flex justify-center">
                      <div
                        className={`
                          flex
                          size-[54px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[var(--bg)]
                          transition-all
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
                            size-[42px]
                            items-center
                            justify-center
                            rounded-full
                            text-[11px]
                            font-semibold
                            tracking-[0.08em]
                            transition-all
                            duration-300
                            ${
                              active
                                ? "bg-[var(--primary)] text-white"
                                : "bg-[var(--surface)] text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          {active ? (
                            <Check size={15} strokeWidth={2.2} />
                          ) : (
                            step.number
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card */}

                    <div
                      className={`
                        mt-7
                        flex
                        min-h-[215px]
                        flex-col
                        rounded-[18px]
                        bg-[var(--surface)]
                        p-5
                        transition-all
                        duration-300
                        ${
                          selected
                            ? "bg-[var(--surface-hover)]"
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`
                            text-[10px]
                            font-semibold
                            tracking-[0.16em]
                            transition-colors
                            duration-300
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
                          size={14}
                          className={`
                            transition-all
                            duration-300
                            ${
                              selected
                                ? "translate-x-0 text-[var(--primary)] opacity-100"
                                : "-translate-x-1 text-[var(--text-secondary)] opacity-0"
                            }
                          `}
                        />
                      </div>

                      <div className="mt-auto">
                        <h3
                          className="
                            max-w-[170px]
                            text-[17px]
                            font-medium
                            leading-[1.1]
                            tracking-[-0.035em]
                            text-[var(--text)]
                          "
                        >
                          {step.title}
                        </h3>

                        <p
                          className="
                            mt-3
                            text-[12px]
                            leading-[1.65]
                            text-[var(--text-secondary)]
                          "
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* Bottom active indicator */}

                      <div
                        className={`
                          mt-5
                          h-[2px]
                          origin-left
                          rounded-full
                          bg-[var(--primary)]
                          transition-transform
                          duration-500
                          ${
                            selected
                              ? "scale-x-100"
                              : "scale-x-0"
                          }
                        `}
                      />
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
              {/* Vertical path */}

              <div
                className="
                  absolute
                  bottom-[48px]
                  left-[27px]
                  top-[27px]
                  w-px
                  bg-[var(--border)]
                  sm:left-[31px]
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
                      gap-5
                      pb-5
                      last:pb-0

                      sm:gap-6
                    "
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    {/* Node */}

                    <div className="relative z-10 shrink-0">
                      <div
                        className={`
                          flex
                          size-[54px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[var(--bg)]
                          sm:size-[62px]
                        `}
                      >
                        <div
                          className={`
                            flex
                            size-[42px]
                            items-center
                            justify-center
                            rounded-full
                            text-[10px]
                            font-semibold
                            tracking-[0.08em]
                            transition-all
                            duration-300

                            sm:size-[48px]
                            sm:text-[11px]

                            ${
                              active
                                ? "bg-[var(--primary)] text-white"
                                : "bg-[var(--surface)] text-[var(--text-secondary)]"
                            }
                          `}
                        >
                          {active ? (
                            <Check size={15} />
                          ) : (
                            step.number
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card */}

                    <div
                      className={`
                        min-h-[160px]
                        flex-1
                        rounded-[16px]
                        bg-[var(--surface)]
                        p-5
                        transition-colors
                        duration-300

                        sm:min-h-[175px]
                        sm:p-6

                        ${
                          selected
                            ? "bg-[var(--surface-hover)]"
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`
                            text-[10px]
                            font-semibold
                            tracking-[0.16em]
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
                          size={15}
                          className={`
                            transition-all
                            duration-300
                            ${
                              selected
                                ? "translate-x-0 text-[var(--primary)] opacity-100"
                                : "text-[var(--text-secondary)] opacity-60"
                            }
                          `}
                        />
                      </div>

                      <h3
                        className="
                          mt-7
                          text-[18px]
                          font-medium
                          leading-[1.05]
                          tracking-[-0.035em]
                          text-[var(--text)]

                          sm:text-[20px]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          max-w-[520px]
                          text-[12px]
                          leading-[1.65]
                          text-[var(--text-secondary)]
                        "
                      >
                        {step.description}
                      </p>

                      <div
                        className={`
                          mt-5
                          h-[2px]
                          origin-left
                          rounded-full
                          bg-[var(--primary)]
                          transition-transform
                          duration-500
                          ${
                            selected
                              ? "scale-x-100"
                              : "scale-x-0"
                          }
                        `}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-5

            sm:mt-12
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[500px]
              text-[12px]
              leading-[1.6]
              text-[var(--text-secondary)]
            "
          >
            One account. One place. A simpler way to manage every
            custom garment from consultation to delivery.
          </p>

          <Button
            href="/sign-up"
            variant="secondary"
            className="group h-11 w-fit px-5 text-[13px]"
          >
            Start Your Journey

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}