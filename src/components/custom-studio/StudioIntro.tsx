"use client";

import {
  Layers3,
  Ruler,
  Scissors,
  Shirt,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/container";

const capabilities = [
  {
    number: "01",
    icon: UserRound,
    title: "Customers",
    description: "Profiles, history & preferences",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Measurements",
    description: "Precise fits, always ready",
  },
  {
    number: "03",
    icon: Shirt,
    title: "Designs",
    description: "Create every custom detail",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Fabrics",
    description: "Keep your collection organized",
  },
  {
    number: "05",
    icon: Scissors,
    title: "Orders",
    description: "Track every garment",
  },
];

export default function StudioIntro() {
  return (
    <section className="relative overflow-hidden">
      <Container>
        <div className="py-[8vw] sm:py-[7vw] lg:py-[4.5vw]">

          {/* =====================================================
              HEADER
          ====================================================== */}
          <div className="flex flex-col gap-[4vw] lg:flex-row lg:items-end lg:justify-between lg:gap-[5vw]">

            {/* Heading */}
            <div className="max-w-[950px]">

              <div className="mb-[2.5vw] flex items-center gap-[1vw] lg:mb-[1vw] lg:gap-[0.5vw]">

                <span className="h-[1.8vw] w-[1.8vw] max-h-[7px] max-w-[7px] rounded-full bg-[var(--primary)] shadow-[0_0_12px_rgba(237,27,47,0.75)]" />

                <span className="text-[2.4vw] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-[1.5vw] lg:text-[0.58vw]">
                  Inside the Studio
                </span>

              </div>

              <h2 className="whitespace-nowrap text-[8.2vw] font-medium leading-[0.9] tracking-[-0.065em] text-white sm:text-[7vw] md:text-[6vw] lg:text-[3.9vw]">

                Everything your studio needs{" "}

                <span className="text-[var(--primary)]">
                  in one place.
                </span>

              </h2>

            </div>


            {/* Description */}
            <div className="max-w-[460px] lg:pb-[0.2vw]">

              <p className="text-[3.2vw] leading-[1.5] tracking-[-0.01em] text-white/45 sm:text-[1.9vw] lg:text-[0.8vw] lg:leading-[1.55]">
                Keep customers, measurements, designs, fabrics and orders
                connected in one simple workspace built around your workflow.
              </p>

            </div>

          </div>


          {/* =====================================================
              FEATURE CARDS
          ====================================================== */}
          <div className="mt-[6vw] grid gap-[2.5vw] sm:grid-cols-2 lg:mt-[3.5vw] lg:grid-cols-5 lg:gap-[1vw]">

            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group relative"
                >

                  {/* =================================================
                      CARD
                  ================================================== */}
                  <div
                    className="
                      relative
                      min-h-[185px]
                      overflow-hidden
                      rounded-[12px]
                      border
                      border-[var(--border)]
                      bg-[var(--dropdown-bg)]
                      p-[4vw]
                      shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                      backdrop-blur-2xl
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      sm:min-h-[195px]
                      sm:p-[3vw]
                      lg:min-h-[10.5vw]
                      lg:p-[1vw]
                    "
                  >

                    {/* =================================================
                        BORDER DRAW - TOP
                    ================================================== */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        h-px
                        w-0
                        bg-[var(--primary)]
                        transition-all
                        duration-300
                        group-hover:w-full
                      "
                    />

                    {/* =================================================
                        BORDER DRAW - RIGHT
                    ================================================== */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        right-0
                        top-0
                        h-0
                        w-px
                        bg-[var(--primary)]
                        transition-all
                        delay-300
                        duration-300
                        group-hover:h-full
                      "
                    />

                    {/* =================================================
                        BORDER DRAW - BOTTOM
                    ================================================== */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        right-0
                        h-px
                        w-0
                        bg-[var(--primary)]
                        transition-all
                        delay-[600ms]
                        duration-300
                        group-hover:w-full
                      "
                    />

                    {/* =================================================
                        BORDER DRAW - LEFT
                    ================================================== */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        h-0
                        w-px
                        bg-[var(--primary)]
                        transition-all
                        delay-[900ms]
                        duration-300
                        group-hover:h-full
                      "
                    />


                    {/* =================================================
                        TOP ROW
                    ================================================== */}
                    <div className="relative z-10 flex items-center justify-between">

                      {/* Number */}
                      <div
                        className="
                          flex
                          h-[10vw]
                          w-[10vw]
                          min-h-[42px]
                          min-w-[42px]
                          items-center
                          justify-center
                          rounded-[8px]
                          border
                          border-[var(--border)]
                          bg-[var(--dropdown-bg)]
                          sm:h-[7vw]
                          sm:w-[7vw]
                          lg:h-[2.2vw]
                          lg:w-[2.2vw]
                        "
                      >

                        <span className="text-[3vw] font-medium tracking-[-0.03em] text-white/55 sm:text-[1.8vw] lg:text-[0.62vw]">
                          {item.number}
                        </span>

                      </div>


                      {/* Icon */}
                      <div
                        className="
                          flex
                          h-[9vw]
                          w-[9vw]
                          min-h-[36px]
                          min-w-[36px]
                          items-center
                          justify-center
                          rounded-[8px]
                          border
                          border-[var(--border)]
                          bg-[var(--dropdown-bg)]
                          transition-all
                          duration-500
                          group-hover:border-[var(--primary)]/30
                          group-hover:bg-[var(--primary)]/[0.05]
                          sm:h-[6vw]
                          sm:w-[6vw]
                          lg:h-[2vw]
                          lg:w-[2vw]
                        "
                      >

                        <Icon
                          className="
                            h-[4vw]
                            w-[4vw]
                            text-white/35
                            transition-all
                            duration-500
                            group-hover:text-[var(--primary)]
                            sm:h-[2.5vw]
                            sm:w-[2.5vw]
                            lg:h-[0.7vw]
                            lg:w-[0.7vw]
                          "
                        />

                      </div>

                    </div>


                    {/* =================================================
                        CONTENT
                    ================================================== */}
                    <div className="relative z-10 mt-[7vw] sm:mt-[5vw] lg:mt-[2.8vw]">

                      <h3 className="text-[4.2vw] font-medium leading-none tracking-[-0.035em] text-white/90 sm:text-[2.5vw] lg:text-[0.78vw]">
                        {item.title}
                      </h3>

                      <p className="mt-[1.2vw] max-w-[240px] text-[2.6vw] leading-[1.4] text-white/35 sm:text-[1.5vw] lg:mt-[0.45vw] lg:text-[0.46vw]">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </Container>
    </section>
  );
}