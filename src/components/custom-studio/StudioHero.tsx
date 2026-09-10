"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Ruler,
  Sparkles,
  Users,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export default function StudioHero() {
  const recentDesigns = [
    {
      name: "Classic Kurta",
      customer: "Ahmed",
      status: "Ready",
    },
    {
      name: "Formal Shirt",
      customer: "Hassan",
      status: "Stitching",
    },
    {
      name: "Premium Waistcoat",
      customer: "Umar",
      status: "Cutting",
    },
  ];

  const quickActions = [
    "New Customer",
    "New Measurement",
    "New Design",
    "New Order",
  ];

  return (
    <section className="relative overflow-hidden">
      <Container>
        <div className="relative py-[7vw] pb-[5vw] sm:py-[8vw] sm:pb-[6vw] lg:py-[5vw] lg:pb-[3vw]">

          {/* =====================================================
              TOP META
          ====================================================== */}
          <div className="mb-[6vw] flex items-center justify-between sm:mb-[4vw] lg:mb-[2.5vw]">

            <div className="flex items-center gap-[1.2vw] sm:gap-[0.7vw] lg:gap-[0.45vw]">
              <span className="h-[1.7vw] w-[1.7vw] max-h-[7px] max-w-[7px] rounded-full bg-[#ED1B2F] shadow-[0_0_12px_rgba(237,27,47,0.8)]" />

              <span className="text-[2.2vw] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-[1.5vw] lg:text-[0.6vw]">
                Custom Studio
              </span>
            </div>

            <div className="flex items-center gap-[1vw] text-[2vw] uppercase tracking-[0.14em] text-white/25 sm:text-[1.4vw] lg:gap-[0.5vw] lg:text-[0.55vw]">
              <span>01</span>
              <span className="h-px w-[4vw] bg-white/15 lg:w-[2vw]" />
              <span>Studio</span>
            </div>

          </div>


          {/* =====================================================
              CENTERED HERO CONTENT
          ====================================================== */}
          <div className="mx-auto max-w-[1050px] text-center">

            {/* Heading */}
            <h1 className="mx-auto max-w-[950px] text-[10.5vw] font-medium leading-[0.88] tracking-[-0.065em] text-white sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw]">

              <span className="block">
                Design. Measure. Deliver.
              </span>

              <span className="block text-[#ED1B2F]">
                All in one studio.
              </span>

            </h1>


            {/* Description */}
            <p className="mx-auto mt-[4vw] max-w-[650px] text-[3.4vw] leading-[1.45] tracking-[-0.01em] text-white/50 sm:mt-[2.5vw] sm:text-[2.1vw] md:max-w-[620px] lg:mt-[1.6vw] lg:text-[0.9vw] lg:leading-[1.55]">
              A dedicated workspace for modern tailoring. Manage customers,
              measurements, designs, fabrics and orders — with complete
              clarity and control.
            </p>


            {/* Buttons */}
            <div className="mt-[5vw] flex items-center justify-center gap-[2vw] sm:mt-[3vw] sm:gap-[1.2vw] lg:mt-[2vw] lg:gap-[0.6vw]">

              <Button
                asChild
                className="group h-auto rounded-[7px] bg-[#ED1B2F] px-[5vw] py-[3.2vw] text-[3vw] font-medium text-white transition-all duration-300 hover:bg-[#ff263b] sm:px-[3.5vw] sm:py-[2vw] sm:text-[1.8vw] lg:px-[1.4vw] lg:py-[0.75vw] lg:text-[0.72vw]"
              >
                <Link href="/contact" className="flex items-center gap-[0.5vw]">
                  <span>Start Creating</span>

                  <ArrowRight className="ml-[1.5vw] h-[3.5vw] w-[3.5vw] transition-transform duration-300 group-hover:translate-x-[0.2vw] sm:ml-[0.8vw] sm:h-[2.5vw] sm:w-[2.5vw] lg:ml-[0.45vw] lg:h-[0.8vw] lg:w-[0.8vw]" />
                </Link>
              </Button>


              <Link
                href="#studio-workspace"
                className="group inline-flex items-center justify-center rounded-[7px] border border-white/10 bg-white/[0.025] px-[5vw] py-[3.2vw] text-[3vw] font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:px-[3.5vw] sm:py-[2vw] sm:text-[1.8vw] lg:px-[1.4vw] lg:py-[0.75vw] lg:text-[0.72vw]"
              >
                <span>Explore Studio</span>

                <ArrowUpRight className="ml-[1.5vw] h-[3.5vw] w-[3.5vw] transition-transform duration-300 group-hover:-translate-y-[0.15vw] group-hover:translate-x-[0.15vw] sm:ml-[0.8vw] sm:h-[2.5vw] sm:w-[2.5vw] lg:ml-[0.45vw] lg:h-[0.8vw] lg:w-[0.8vw]" />
              </Link>

            </div>

          </div>


          {/* =====================================================
              DASHBOARD / PRODUCT PREVIEW
          ====================================================== */}
          <div
            id="studio-workspace"
            className="relative mx-auto mt-[8vw] max-w-[1180px] sm:mt-[6vw] lg:mt-[4.5vw]"
          >

            {/* =================================================
                FLOATING LEFT CARD
            ================================================== */}
            <div className="absolute -left-[1.5vw] top-[18%] z-20 hidden lg:block">

              <div className="flex items-center gap-[0.7vw] rounded-[8px] border border-white/10 bg-[#111111] px-[0.8vw] py-[0.65vw] shadow-[0_15px_40px_rgba(0,0,0,0.45)]">

                <div className="flex h-[2vw] w-[2vw] items-center justify-center rounded-[5px] bg-[#ED1B2F]/15">
                  <Ruler className="h-[0.8vw] w-[0.8vw] text-[#ED1B2F]" />
                </div>

                <div>
                  <span className="block text-[0.55vw] font-medium text-white/75">
                    Precise measurements
                  </span>

                  <span className="block text-[0.42vw] text-white/30">
                    For the perfect fit
                  </span>
                </div>

              </div>

            </div>


            {/* =================================================
                FLOATING RIGHT CARD
            ================================================== */}
            <div className="absolute -right-[1.5vw] top-[48%] z-20 hidden lg:block">

              <div className="flex items-center gap-[0.7vw] rounded-[8px] border border-white/10 bg-[#111111] px-[0.8vw] py-[0.65vw] shadow-[0_15px_40px_rgba(0,0,0,0.45)]">

                <div>
                  <span className="block text-right text-[0.55vw] font-medium text-white/75">
                    Premium fabrics
                  </span>

                  <span className="block text-right text-[0.42vw] text-white/30">
                    Organized with ease
                  </span>
                </div>

                <div className="flex h-[2vw] w-[2vw] items-center justify-center rounded-[5px] bg-[#ED1B2F]/15">
                  <Sparkles className="h-[0.8vw] w-[0.8vw] text-[#ED1B2F]" />
                </div>

              </div>

            </div>


            {/* =================================================
                MAIN BROWSER WINDOW
            ================================================== */}
            <div className="overflow-hidden rounded-[11px] border border-white/[0.1] bg-[#0c0c0c] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

              {/* Browser top bar */}
              <div className="flex h-[7vw] max-h-[48px] items-center justify-between border-b border-white/[0.07] px-[2vw] lg:h-[2.8vw] lg:px-[1vw]">

                <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                  <div className="flex gap-[0.4vw]">
                    <span className="h-[1.3vw] w-[1.3vw] max-h-[7px] max-w-[7px] rounded-full bg-white/10" />
                    <span className="h-[1.3vw] w-[1.3vw] max-h-[7px] max-w-[7px] rounded-full bg-white/10" />
                    <span className="h-[1.3vw] w-[1.3vw] max-h-[7px] max-w-[7px] rounded-full bg-white/10" />
                  </div>

                  <span className="ml-[1vw] text-[1.8vw] text-white/35 lg:ml-[0.5vw] lg:text-[0.45vw]">
                    custom-studio
                  </span>

                </div>

                <div className="flex items-center gap-[1vw] lg:gap-[0.45vw]">

                  <span className="h-[1.4vw] w-[1.4vw] max-h-[7px] max-w-[7px] rounded-full bg-[#ED1B2F] shadow-[0_0_8px_rgba(237,27,47,0.7)]" />

                  <span className="text-[1.7vw] text-white/30 lg:text-[0.45vw]">
                    Live workspace
                  </span>

                </div>

              </div>


              {/* Dashboard */}
              <div className="grid grid-cols-[20%_80%]">

                {/* Sidebar */}
                <aside className="border-r border-white/[0.07] p-[2vw] lg:p-[1vw]">

                  <div className="mb-[3vw] flex items-center gap-[1vw] lg:mb-[1.5vw] lg:gap-[0.5vw]">

                    <span className="flex h-[5vw] w-[5vw] items-center justify-center rounded-[5px] bg-[#ED1B2F] text-[1.5vw] font-bold text-white lg:h-[1.8vw] lg:w-[1.8vw] lg:text-[0.5vw]">
                      SG
                    </span>

                    <div>
                      <span className="block text-[1.7vw] text-white/70 lg:text-[0.5vw]">
                        Custom Studio
                      </span>

                      <span className="hidden text-[0.4vw] text-white/25 lg:block">
                        Soul&apos;s Glory Cloth
                      </span>
                    </div>

                  </div>


                  <div className="space-y-[1vw] lg:space-y-[0.35vw]">

                    {[
                      "Overview",
                      "Customers",
                      "Measurements",
                      "Designs",
                      "Fabrics",
                      "Orders",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-[5px] px-[1.3vw] py-[1.4vw] text-[1.7vw] lg:px-[0.65vw] lg:py-[0.5vw] lg:text-[0.45vw] ${
                          index === 0
                            ? "bg-white/[0.07] text-white"
                            : "text-white/30"
                        }`}
                      >
                        {item}
                      </div>
                    ))}

                  </div>

                </aside>


                {/* Workspace */}
                <div className="p-[2.5vw] lg:p-[1.3vw]">

                  {/* Workspace heading */}
                  <div className="flex items-end justify-between">

                    <div>
                      <span className="text-[1.5vw] uppercase tracking-[0.14em] text-white/25 lg:text-[0.4vw]">
                        Custom workspace
                      </span>

                      <h2 className="mt-[0.6vw] text-[3.8vw] font-medium tracking-[-0.045em] text-white lg:text-[1.35vw]">
                        Good morning, Ahmed.
                      </h2>

                      <p className="mt-[0.4vw] text-[1.6vw] text-white/25 lg:text-[0.45vw]">
                        Here&apos;s what&apos;s happening in your studio today.
                      </p>
                    </div>

                    <span className="rounded-full border border-[#ED1B2F]/20 bg-[#ED1B2F]/10 px-[1.3vw] py-[0.7vw] text-[1.3vw] text-[#ED1B2F] lg:px-[0.6vw] lg:py-[0.3vw] lg:text-[0.4vw]">
                      24 active orders
                    </span>

                  </div>


                  {/* Stats */}
                  <div className="mt-[2.3vw] grid grid-cols-4 gap-[0.8vw] lg:mt-[1.2vw]">

                    {[
                      ["Customers", "148", "+12%"],
                      ["Designs", "36", "+8%"],
                      ["Active Orders", "24", "-4%"],
                      ["Ready This Week", "08", "+25%"],
                    ].map(([label, value, change]) => (
                      <div
                        key={label}
                        className="rounded-[6px] border border-white/[0.07] bg-white/[0.025] p-[1.7vw] lg:p-[0.8vw]"
                      >

                        <div className="flex items-center justify-between">

                          <span className="text-[1.3vw] text-white/30 lg:text-[0.38vw]">
                            {label}
                          </span>

                          <span
                            className={`hidden text-[1.1vw] lg:block lg:text-[0.35vw] ${
                              change.startsWith("-")
                                ? "text-[#ED1B2F]"
                                : "text-emerald-400"
                            }`}
                          >
                            {change}
                          </span>

                        </div>

                        <strong className="mt-[1vw] block text-[4.5vw] font-medium tracking-[-0.05em] text-white lg:mt-[0.5vw] lg:text-[1.45vw]">
                          {value}
                        </strong>

                      </div>
                    ))}

                  </div>


                  {/* Lower cards */}
                  <div className="mt-[0.8vw] grid gap-[0.8vw] lg:grid-cols-[1.25fr_0.75fr]">

                    {/* Recent Designs */}
                    <div className="rounded-[6px] border border-white/[0.07] bg-white/[0.025] p-[1.8vw] lg:p-[0.9vw]">

                      <div className="flex items-center justify-between">

                        <div>
                          <span className="text-[1.3vw] uppercase tracking-[0.12em] text-white/20 lg:text-[0.38vw]">
                            Recent work
                          </span>

                          <h3 className="mt-[0.4vw] text-[2.3vw] font-medium text-white/80 lg:text-[0.7vw]">
                            Recent Designs
                          </h3>
                        </div>

                        <span className="text-[1.2vw] text-white/25 lg:text-[0.38vw]">
                          View all →
                        </span>

                      </div>


                      <div className="mt-[1.4vw] space-y-[0.6vw] lg:mt-[0.7vw]">

                        {recentDesigns.map((design, index) => (
                          <div
                            key={design.name}
                            className="flex items-center gap-[1vw] rounded-[5px] border border-white/[0.05] bg-black/20 p-[1vw] lg:gap-[0.55vw] lg:p-[0.45vw]"
                          >

                            <div className="flex h-[5vw] w-[5vw] shrink-0 items-center justify-center rounded-[4px] bg-white/[0.05] lg:h-[1.8vw] lg:w-[1.8vw]">
                              <span className="text-[1.4vw] text-white/25 lg:text-[0.4vw]">
                                0{index + 1}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">

                              <strong className="block truncate text-[1.7vw] font-medium text-white/65 lg:text-[0.48vw]">
                                {design.name}
                              </strong>

                              <span className="text-[1.2vw] text-white/20 lg:text-[0.35vw]">
                                {design.customer} · Custom order
                              </span>

                            </div>

                            <span className="text-[1.2vw] text-[#ED1B2F] lg:text-[0.38vw]">
                              {design.status}
                            </span>

                          </div>
                        ))}

                      </div>

                    </div>


                    {/* Quick Actions */}
                    <div className="rounded-[6px] border border-white/[0.07] bg-white/[0.025] p-[1.8vw] lg:p-[0.9vw]">

                      <span className="text-[1.3vw] uppercase tracking-[0.12em] text-white/20 lg:text-[0.38vw]">
                        Quick actions
                      </span>

                      <h3 className="mt-[0.4vw] text-[2.3vw] font-medium text-white/80 lg:text-[0.7vw]">
                        Create something new.
                      </h3>


                      <div className="mt-[1.4vw] space-y-[0.6vw] lg:mt-[0.7vw]">

                        {quickActions.map((action) => (
                          <div
                            key={action}
                            className="flex items-center gap-[0.8vw] rounded-[5px] border border-white/[0.05] px-[1vw] py-[1vw] lg:gap-[0.45vw] lg:px-[0.5vw] lg:py-[0.42vw]"
                          >

                            <span className="text-[2vw] leading-none text-[#ED1B2F] lg:text-[0.6vw]">
                              +
                            </span>

                            <span className="text-[1.4vw] text-white/40 lg:text-[0.42vw]">
                              {action}
                            </span>

                          </div>
                        ))}

                      </div>

                    </div>

                  </div>


                  {/* Bottom banner */}
                  <div className="mt-[0.8vw] flex items-center justify-between rounded-[6px] border border-[#ED1B2F]/20 bg-[#ED1B2F]/[0.06] px-[1.5vw] py-[1.2vw] lg:px-[0.8vw] lg:py-[0.55vw]">

                    <div className="flex items-center gap-[1vw] lg:gap-[0.5vw]">

                      <span className="flex h-[4vw] w-[4vw] items-center justify-center rounded-full bg-[#ED1B2F] lg:h-[1.5vw] lg:w-[1.5vw]">
                        <Sparkles className="h-[1.7vw] w-[1.7vw] text-white lg:h-[0.55vw] lg:w-[0.55vw]" />
                      </span>

                      <div>
                        <span className="block text-[1.4vw] font-medium text-white/70 lg:text-[0.42vw]">
                          Everything connected.
                        </span>

                        <span className="text-[1.15vw] text-white/25 lg:text-[0.34vw]">
                          From the first measurement to the final stitch.
                        </span>
                      </div>

                    </div>


                    <Button
                      type="button"
                      className="h-auto rounded-[5px] bg-[#ED1B2F] px-[1.5vw] py-[0.9vw] text-[1.3vw] text-white lg:px-[0.7vw] lg:py-[0.4vw] lg:text-[0.4vw]"
                    >
                      Create New Order
                      <ArrowRight className="ml-[0.5vw] h-[1.5vw] w-[1.5vw] lg:h-[0.5vw] lg:w-[0.5vw]" />
                    </Button>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                BOTTOM CAPTION
            ================================================== */}
            <div className="mt-[2vw] flex items-center justify-between lg:mt-[1vw]">

              <span className="text-[1.8vw] uppercase tracking-[0.14em] text-white/25 lg:text-[0.5vw]">
                Your workspace / 01
              </span>

              <div className="flex items-center gap-[1vw] text-[1.8vw] text-white/25 lg:gap-[0.4vw] lg:text-[0.5vw]">
                Scroll to explore

                <ArrowDown className="h-[2vw] w-[2vw] lg:h-[0.65vw] lg:w-[0.65vw]" />
              </div>

            </div>

          </div>


          {/* =====================================================
              TRUST / STATS STRIP
          ====================================================== */}
          


        </div>
      </Container>
    </section>
  );
}