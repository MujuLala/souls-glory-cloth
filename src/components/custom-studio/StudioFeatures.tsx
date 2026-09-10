"use client";

import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  Check,
  Clock3,
  Database,
  FileText,
  Layers3,
  PackageCheck,
  Ruler,
  Search,
  Settings2,
  Sparkles,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/container";

const featureItems = [
  {
    number: "01",
    label: "Customer Management",
    title: "Know every customer.",
    description:
      "Keep profiles, preferences, order history and important details together.",
  },
  {
    number: "02",
    label: "Smart Measurements",
    title: "Measure once. Reuse anytime.",
    description:
      "Store accurate measurements and bring them back whenever a customer returns.",
  },
  {
    number: "03",
    label: "Order Management",
    title: "Nothing gets missed.",
    description:
      "Track every garment through cutting, stitching, finishing and delivery.",
  },
];

export default function StudioFeatures() {
  return (
    <section className="relative overflow-hidden">
      <Container>
        <div className="py-[9vw] sm:py-[7vw] lg:py-[5vw]">

          {/* =====================================================
              HEADER
          ====================================================== */}
          <div className="flex flex-col gap-[4vw] lg:flex-row lg:items-end lg:justify-between lg:gap-[6vw]">

            <div className="max-w-[900px]">

              <div className="mb-[2vw] flex items-center gap-[0.8vw] lg:mb-[1vw] lg:gap-[0.45vw]">

                <span className="h-[1.7vw] w-[1.7vw] max-h-[7px] max-w-[7px] rounded-full bg-[var(--primary)] shadow-[0_0_12px_rgba(237,27,47,0.7)]" />

                <span className="text-[2.1vw] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-[1.4vw] lg:text-[0.55vw]">
                  Built for your workflow
                </span>

              </div>

              <h2 className="whitespace-nowrap text-[8vw] font-medium leading-[0.9] tracking-[-0.065em] text-white sm:text-[6.5vw] md:text-[5.8vw] lg:text-[3.9vw]">
                Powerful tools.
                <span className="text-[var(--primary)]"> Simple workflow.</span>
              </h2>

            </div>


            <p className="max-w-[450px] text-[3vw] leading-[1.5] text-white/40 sm:text-[1.8vw] lg:text-[0.78vw] lg:leading-[1.55]">
              Everything you need to run a modern custom tailoring
              business without jumping between different tools.
            </p>

          </div>


          {/* =====================================================
              FEATURE 01 — CUSTOMER MANAGEMENT
          ====================================================== */}
          <div className="mt-[7vw] grid gap-[4vw] lg:mt-[4vw] lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-[5vw]">

            {/* Text */}
            <div>

              <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                <span className="flex h-[8vw] w-[8vw] items-center justify-center rounded-[9px] border border-[var(--border)] bg-[var(--dropdown-bg)] text-[2.5vw] font-medium text-white/50 sm:h-[5vw] sm:w-[5vw] sm:text-[1.6vw] lg:h-[2.2vw] lg:w-[2.2vw] lg:text-[0.55vw]">
                  01
                </span>

                <span className="text-[2vw] uppercase tracking-[0.13em] text-[var(--primary)] sm:text-[1.3vw] lg:text-[0.48vw]">
                  Customer Management
                </span>

              </div>


              <h3 className="mt-[3vw] text-[7vw] font-medium leading-[0.92] tracking-[-0.055em] text-white sm:text-[5.5vw] lg:mt-[1.5vw] lg:text-[2.8vw]">
                Know
                <br />
                every customer.
              </h3>


              <p className="mt-[2.5vw] max-w-[480px] text-[2.8vw] leading-[1.5] text-white/40 sm:text-[1.7vw] lg:mt-[1.2vw] lg:text-[0.75vw]">
                Keep customer profiles, preferences, previous orders and
                important notes in one place. When they come back, their
                complete history is already there.
              </p>


              <div className="mt-[3vw] flex items-center gap-[1vw] sm:mt-[2vw] lg:mt-[1.5vw] lg:gap-[0.5vw]">

                <div className="flex h-[6vw] w-[6vw] items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/[0.06] sm:h-[4vw] sm:w-[4vw] lg:h-[1.7vw] lg:w-[1.7vw]">

                  <Check className="h-[2.5vw] w-[2.5vw] text-[var(--primary)] sm:h-[1.7vw] sm:w-[1.7vw] lg:h-[0.65vw] lg:w-[0.65vw]" />

                </div>

                <span className="text-[2vw] text-white/35 sm:text-[1.3vw] lg:text-[0.48vw]">
                  Complete customer history
                </span>

              </div>

            </div>


            {/* UI Preview */}
            <div className="relative">

              <div className="overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--dropdown-bg)] shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl">

                {/* Top */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-[3vw] py-[2.5vw] lg:px-[1.1vw] lg:py-[0.7vw]">

                  <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                    <Search className="h-[3vw] w-[3vw] text-white/25 lg:h-[0.7vw] lg:w-[0.7vw]" />

                    <span className="text-[1.8vw] text-white/25 lg:text-[0.45vw]">
                      Search customers...
                    </span>

                  </div>

                  <button className="rounded-[6px] bg-[var(--primary)] px-[2vw] py-[1vw] text-[1.7vw] text-white lg:px-[0.7vw] lg:py-[0.35vw] lg:text-[0.4vw]">
                    + New Customer
                  </button>

                </div>


                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

                  {/* Customer list */}
                  <div className="border-b border-[var(--border)] p-[3vw] lg:border-b-0 lg:border-r lg:p-[1vw]">

                    <div className="mb-[2vw] flex items-center justify-between lg:mb-[0.8vw]">

                      <span className="text-[1.8vw] uppercase tracking-[0.12em] text-white/20 lg:text-[0.4vw]">
                        Customers
                      </span>

                      <span className="text-[1.7vw] text-white/20 lg:text-[0.4vw]">
                        148
                      </span>

                    </div>


                    {["Ahmed Khan", "Hassan Ali", "Umar Farooq", "Bilal Shah"].map(
                      (name, index) => (
                        <div
                          key={name}
                          className={`mb-[0.7vw] flex items-center gap-[1.2vw] rounded-[7px] p-[1.5vw] lg:gap-[0.5vw] lg:p-[0.55vw] ${
                            index === 0
                              ? "bg-[var(--primary)]/[0.07]"
                              : "bg-white/[0.02]"
                          }`}
                        >

                          <div className="flex h-[7vw] w-[7vw] shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.025] text-[1.7vw] text-white/40 lg:h-[1.9vw] lg:w-[1.9vw] lg:text-[0.45vw]">
                            {name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </div>

                          <div className="min-w-0">

                            <span className="block truncate text-[2vw] text-white/65 lg:text-[0.48vw]">
                              {name}
                            </span>

                            <span className="text-[1.5vw] text-white/20 lg:text-[0.35vw]">
                              {12 + index * 4} orders
                            </span>

                          </div>

                        </div>
                      ),
                    )}

                  </div>


                  {/* Customer details */}
                  <div className="p-[3vw] lg:p-[1.1vw]">

                    <div className="flex items-center gap-[1.2vw] lg:gap-[0.6vw]">

                      <div className="flex h-[10vw] w-[10vw] items-center justify-center rounded-full bg-[var(--primary)] text-[2.5vw] font-medium text-white lg:h-[3vw] lg:w-[3vw] lg:text-[0.7vw]">
                        AK
                      </div>

                      <div>

                        <h4 className="text-[3vw] font-medium text-white/80 lg:text-[0.75vw]">
                          Ahmed Khan
                        </h4>

                        <span className="text-[1.7vw] text-white/25 lg:text-[0.4vw]">
                          Customer since 2024
                        </span>

                      </div>

                    </div>


                    <div className="mt-[3vw] grid grid-cols-2 gap-[1vw] lg:mt-[1.2vw]">

                      <div className="rounded-[7px] border border-[var(--border)] bg-white/[0.02] p-[2vw] lg:p-[0.7vw]">

                        <span className="text-[1.5vw] text-white/25 lg:text-[0.38vw]">
                          Orders
                        </span>

                        <strong className="mt-[0.5vw] block text-[4vw] font-medium text-white lg:text-[1.1vw]">
                          24
                        </strong>

                      </div>

                      <div className="rounded-[7px] border border-[var(--border)] bg-white/[0.02] p-[2vw] lg:p-[0.7vw]">

                        <span className="text-[1.5vw] text-white/25 lg:text-[0.38vw]">
                          Designs
                        </span>

                        <strong className="mt-[0.5vw] block text-[4vw] font-medium text-white lg:text-[1.1vw]">
                          08
                        </strong>

                      </div>

                    </div>


                    <div className="mt-[1vw] rounded-[7px] border border-[var(--border)] bg-white/[0.02] p-[2vw] lg:p-[0.7vw]">

                      <span className="text-[1.5vw] uppercase tracking-[0.12em] text-white/20 lg:text-[0.35vw]">
                        Latest order
                      </span>

                      <div className="mt-[1vw] flex items-center justify-between lg:mt-[0.5vw]">

                        <span className="text-[1.8vw] text-white/60 lg:text-[0.45vw]">
                          Signature Kurta
                        </span>

                        <span className="rounded-full bg-emerald-400/[0.08] px-[1vw] py-[0.5vw] text-[1.3vw] text-emerald-400 lg:px-[0.5vw] lg:py-[0.2vw] lg:text-[0.35vw]">
                          Stitching
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              FEATURE 02 — MEASUREMENTS
          ====================================================== */}
          <div className="mt-[12vw] grid gap-[5vw] lg:mt-[8vw] lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-[5vw]">

            {/* Measurement UI */}
            <div className="order-2 lg:order-1">

              <div className="relative overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[3vw] shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:p-[1.2vw]">

                <div className="flex items-center justify-between border-b border-[var(--border)] pb-[2vw] lg:pb-[0.8vw]">

                  <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                    <div className="flex h-[7vw] w-[7vw] items-center justify-center rounded-[7px] bg-[var(--primary)]/[0.08] lg:h-[2vw] lg:w-[2vw]">

                      <Ruler className="h-[3vw] w-[3vw] text-[var(--primary)] lg:h-[0.7vw] lg:w-[0.7vw]" />

                    </div>

                    <div>

                      <span className="block text-[2.2vw] font-medium text-white/70 lg:text-[0.55vw]">
                        Ahmed&apos;s Measurements
                      </span>

                      <span className="text-[1.5vw] text-white/20 lg:text-[0.35vw]">
                        Updated 2 minutes ago
                      </span>

                    </div>

                  </div>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-[1.2vw] py-[0.6vw] text-[1.4vw] text-emerald-400 lg:px-[0.5vw] lg:py-[0.25vw] lg:text-[0.35vw]">
                    Saved
                  </span>

                </div>


                <div className="mt-[3vw] grid grid-cols-2 gap-[1vw] sm:grid-cols-4 lg:mt-[1vw]">

                  {[
                    ["Chest", "40", "in"],
                    ["Shoulder", "18", "in"],
                    ["Sleeve", "25", "in"],
                    ["Length", "42", "in"],
                    ["Waist", "36", "in"],
                    ["Neck", "15.5", "in"],
                    ["Hip", "40", "in"],
                    ["Trouser", "41", "in"],
                  ].map(([label, value, unit]) => (
                    <div
                      key={label}
                      className="rounded-[7px] border border-[var(--border)] bg-white/[0.02] p-[2.5vw] lg:p-[0.8vw]"
                    >

                      <span className="text-[1.6vw] text-white/25 lg:text-[0.38vw]">
                        {label}
                      </span>

                      <div className="mt-[1vw] flex items-end gap-[0.4vw] lg:mt-[0.4vw]">

                        <strong className="text-[4vw] font-medium tracking-[-0.04em] text-white lg:text-[1.15vw]">
                          {value}
                        </strong>

                        <span className="mb-[0.5vw] text-[1.5vw] text-white/25 lg:mb-[0.2vw] lg:text-[0.35vw]">
                          {unit}
                        </span>

                      </div>

                    </div>
                  ))}

                </div>


                {/* Measurement history */}
                <div className="mt-[1vw] rounded-[7px] border border-[var(--border)] bg-white/[0.02] p-[2vw] lg:p-[0.8vw]">

                  <div className="flex items-center justify-between">

                    <span className="text-[1.6vw] uppercase tracking-[0.12em] text-white/20 lg:text-[0.38vw]">
                      Measurement history
                    </span>

                    <span className="text-[1.5vw] text-[var(--primary)] lg:text-[0.35vw]">
                      View history
                    </span>

                  </div>

                  <div className="mt-[1.5vw] flex items-center gap-[1vw] lg:mt-[0.7vw]">

                    <div className="h-[0.3vw] flex-1 overflow-hidden rounded-full bg-white/[0.07] lg:h-[2px]">

                      <div className="h-full w-[78%] rounded-full bg-[var(--primary)]" />

                    </div>

                    <span className="text-[1.4vw] text-white/25 lg:text-[0.35vw]">
                      78%
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Text */}
            <div className="order-1 lg:order-2">

              <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                <span className="flex h-[8vw] w-[8vw] items-center justify-center rounded-[9px] border border-[var(--border)] bg-[var(--dropdown-bg)] text-[2.5vw] font-medium text-white/50 sm:h-[5vw] sm:w-[5vw] sm:text-[1.6vw] lg:h-[2.2vw] lg:w-[2.2vw] lg:text-[0.55vw]">
                  02
                </span>

                <span className="text-[2vw] uppercase tracking-[0.13em] text-[var(--primary)] sm:text-[1.3vw] lg:text-[0.48vw]">
                  Smart Measurements
                </span>

              </div>


              <h3 className="mt-[3vw] text-[7vw] font-medium leading-[0.92] tracking-[-0.055em] text-white sm:text-[5.5vw] lg:mt-[1.5vw] lg:text-[2.8vw]">
                Measure once.
                <br />
                Reuse anytime.
              </h3>


              <p className="mt-[2.5vw] max-w-[480px] text-[2.8vw] leading-[1.5] text-white/40 sm:text-[1.7vw] lg:mt-[1.2vw] lg:text-[0.75vw]">
                Store accurate measurements for every customer and access
                them instantly when creating a new garment.
              </p>

            </div>

          </div>


          {/* =====================================================
              FEATURE 03 — ORDERS
          ====================================================== */}
          <div className="mt-[12vw] grid gap-[4vw] lg:mt-[8vw] lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-[5vw]">

            {/* Text */}
            <div>

              <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                <span className="flex h-[8vw] w-[8vw] items-center justify-center rounded-[9px] border border-[var(--border)] bg-[var(--dropdown-bg)] text-[2.5vw] font-medium text-white/50 sm:h-[5vw] sm:w-[5vw] sm:text-[1.6vw] lg:h-[2.2vw] lg:w-[2.2vw] lg:text-[0.55vw]">
                  03
                </span>

                <span className="text-[2vw] uppercase tracking-[0.13em] text-[var(--primary)] sm:text-[1.3vw] lg:text-[0.48vw]">
                  Order Management
                </span>

              </div>


              <h3 className="mt-[3vw] text-[7vw] font-medium leading-[0.92] tracking-[-0.055em] text-white sm:text-[5.5vw] lg:mt-[1.5vw] lg:text-[2.8vw]">
                Nothing
                <br />
                gets missed.
              </h3>


              <p className="mt-[2.5vw] max-w-[480px] text-[2.8vw] leading-[1.5] text-white/40 sm:text-[1.7vw] lg:mt-[1.2vw] lg:text-[0.75vw]">
                Move every order through a clear production workflow and
                always know what needs attention next.
              </p>


              <div className="mt-[3vw] flex flex-wrap gap-[1vw] sm:mt-[2vw] lg:mt-[1.5vw]">

                {["Cutting", "Stitching", "Finishing"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)] px-[1.5vw] py-[0.8vw] text-[1.7vw] text-white/40 lg:px-[0.7vw] lg:py-[0.3vw] lg:text-[0.4vw]"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>


            {/* Order UI */}
            <div>

              <div className="overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--dropdown-bg)] shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl">

                <div className="flex items-center justify-between border-b border-[var(--border)] px-[3vw] py-[2.5vw] lg:px-[1.1vw] lg:py-[0.7vw]">

                  <div>

                    <span className="block text-[1.6vw] uppercase tracking-[0.13em] text-white/20 lg:text-[0.38vw]">
                      Production
                    </span>

                    <h4 className="mt-[0.5vw] text-[2.8vw] font-medium text-white/75 lg:text-[0.75vw]">
                      Today&apos;s orders
                    </h4>

                  </div>

                  <span className="text-[1.7vw] text-white/25 lg:text-[0.4vw]">
                    24 active
                  </span>

                </div>


                <div className="p-[3vw] lg:p-[1vw]">

                  {[
                    ["#SG-0248", "Signature Kurta", "Stitching", 72],
                    ["#SG-0247", "Premium Waistcoat", "Finishing", 88],
                    ["#SG-0246", "Formal Shirt", "Cutting", 38],
                    ["#SG-0245", "Classic Shalwar", "Ready", 100],
                  ].map(([id, name, status, progress]) => (
                    <div
                      key={id as string}
                      className="mb-[1vw] rounded-[8px] border border-[var(--border)] bg-white/[0.02] p-[2vw] last:mb-0 lg:p-[0.7vw]"
                    >

                      <div className="flex items-center justify-between">

                        <div className="min-w-0">

                          <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                            <span className="text-[1.5vw] text-white/20 lg:text-[0.35vw]">
                              {id as string}
                            </span>

                            <span className="h-[3px] w-[3px] rounded-full bg-white/15" />

                            <span className="truncate text-[1.8vw] text-white/65 lg:text-[0.45vw]">
                              {name as string}
                            </span>

                          </div>

                        </div>


                        <span
                          className={`rounded-full px-[1vw] py-[0.5vw] text-[1.3vw] lg:px-[0.5vw] lg:py-[0.2vw] lg:text-[0.33vw] ${
                            status === "Ready"
                              ? "bg-emerald-400/[0.07] text-emerald-400"
                              : "bg-[var(--primary)]/[0.07] text-[var(--primary)]"
                          }`}
                        >
                          {status as string}
                        </span>

                      </div>


                      <div className="mt-[1.5vw] flex items-center gap-[1vw] lg:mt-[0.6vw] lg:gap-[0.5vw]">

                        <div className="h-[1vw] flex-1 overflow-hidden rounded-full bg-white/[0.06] lg:h-[3px]">

                          <div
                            className="h-full rounded-full bg-[var(--primary)] transition-all"
                            style={{
                              width: `${progress as number}%`,
                            }}
                          />

                        </div>

                        <span className="text-[1.4vw] text-white/25 lg:text-[0.35vw]">
                          {progress}%
                        </span>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              FEATURE SUMMARY
          ====================================================== */}
          <div className="mt-[10vw] grid gap-[1.5vw] sm:grid-cols-2 lg:mt-[6vw] lg:grid-cols-4">

            {[
              {
                icon: BellRing,
                title: "Stay informed",
                text: "Know what needs attention.",
              },
              {
                icon: Database,
                title: "Everything saved",
                text: "Your data stays organized.",
              },
              {
                icon: BarChart3,
                title: "See the bigger picture",
                text: "Understand your studio.",
              },
              {
                icon: Settings2,
                title: "Built to adapt",
                text: "Shape it around your process.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    rounded-[12px]
                    border
                    border-[var(--border)]
                    bg-[var(--dropdown-bg)]
                    p-[3vw]
                    shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                    backdrop-blur-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-[var(--primary)]
                    sm:p-[2vw]
                    lg:p-[1vw]
                  "
                >

                  <Icon className="h-[5vw] w-[5vw] text-white/25 transition-colors duration-500 group-hover:text-[var(--primary)] sm:h-[3vw] sm:w-[3vw] lg:h-[1vw] lg:w-[1vw]" />

                  <h4 className="mt-[2vw] text-[2.8vw] font-medium text-white/75 sm:text-[1.7vw] lg:mt-[1vw] lg:text-[0.65vw]">
                    {item.title}
                  </h4>

                  <p className="mt-[0.7vw] text-[2vw] leading-[1.4] text-white/30 sm:text-[1.2vw] lg:text-[0.42vw]">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </Container>
    </section>
  );
}