"use client";

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
  Star,
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
    meta: "+1 this month",
  },
  {
    label: "Saved profiles",
    value: "03",
    icon: UserRound,
    meta: "2 complete",
  },
  {
    label: "Wishlist",
    value: "08",
    icon: Heart,
    meta: "3 new items",
  },
  {
    label: "Reviews",
    value: "04",
    icon: Star,
    meta: "Waiting for you",
  },
];

const orders = [
  {
    id: "#SG-1048",
    title: "Midnight Signature Kurta",
    type: "Custom Made",
    status: "Stitching",
    progress: 72,
    placeholder: "KURTA",
  },
  {
    id: "#SG-1039",
    title: "Classic Formal Suit",
    type: "Ready to Wear",
    status: "In Transit",
    progress: 88,
    placeholder: "SUIT",
  },
];

const accountItems = [
  {
    icon: Ruler,
    label: "Measurements",
    value: "3 profiles",
    accent: true,
  },
  {
    icon: MapPin,
    label: "Addresses",
    value: "2 saved",
  },
  {
    icon: CreditCard,
    label: "Payments & invoices",
    value: "View",
  },
  {
    icon: Star,
    label: "Reviews",
    value: "4 pending",
    accent: true,
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
  {
    icon: Star,
    title: "New review reminder",
    time: "2d ago",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[18%] h-[26vw] w-[26vw] rounded-full bg-[var(--primary)]/8 blur-[110px]" />

        <div className="absolute bottom-[-15%] right-[-8%] h-[24vw] w-[24vw] rounded-full bg-[var(--accent)]/5 blur-[110px]" />
      </div>

      <Container className="relative">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION INTRO                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-[2.5vw] grid gap-[2vw] lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
          <div>
            <div className="mb-[0.6vw] flex items-center gap-2">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--primary)]" />

              <span className="text-[clamp(10px,0.65vw,12px)] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Your account
              </span>
            </div>

            <h2 className="max-w-[850px] text-[clamp(38px,3.8vw,68px)] font-semibold leading-[0.97] tracking-[-0.055em] text-[var(--foreground)]">
              A dashboard built
              <br />
              for every client.
            </h2>
          </div>

          <p className="max-w-[400px] text-[clamp(13px,0.85vw,16px)] leading-[1.5] text-[var(--muted-foreground)] lg:pb-[0.2vw]">
            Orders, measurements, appointments, payments and support — all
            organized in one simple client space.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* DASHBOARD                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="overflow-hidden rounded-[1.2vw] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_90px_rgba(0,0,0,0.22)] max-lg:rounded-[18px]">
          {/* ================================================================ */}
          {/* TOP BAR                                                          */}
          {/* ================================================================ */}

          <div className="flex items-center justify-between border-b border-[var(--border)] px-[1.2vw] py-[0.8vw] max-lg:px-4 max-lg:py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)]">
                <UserRound className="h-3.5 w-3.5 text-[var(--foreground)]" />

                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[var(--surface)] bg-green-500" />
              </div>

              <div>
                <p className="text-[clamp(12px,0.75vw,15px)] font-semibold text-[var(--foreground)]">
                  Good morning, Ahmed
                </p>

                <p className="mt-0.5 text-[9px] text-[var(--muted-foreground)]">
                  Here&apos;s your latest account overview.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)]">
                <Bell className="h-3.5 w-3.5 text-[var(--foreground)]" />

                <span className="absolute right-[6px] top-[5px] h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              </div>

              <span className="hidden rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)] px-3 py-1.5 text-[9px] font-medium text-[var(--muted-foreground)] sm:block">
                Client dashboard
              </span>
            </div>
          </div>

          {/* ================================================================ */}
          {/* DASHBOARD GRID                                                   */}
          {/* ================================================================ */}

          <div className="grid items-stretch gap-[0.8vw] p-[0.8vw] max-lg:p-3 xl:grid-cols-[1.65fr_1fr]">
            {/* ============================================================ */}
            {/* LEFT COLUMN                                                    */}
            {/* ============================================================ */}

            <div className="flex min-w-0 flex-col gap-[0.8vw] max-lg:gap-3">
              {/* ---------------------------------------------------------- */}
              {/* STATS                                                        */}
              {/* ---------------------------------------------------------- */}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="group relative overflow-hidden rounded-[0.75vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.85vw] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/35 max-lg:rounded-[12px] max-lg:p-3"
                    >
                      {/* Decorative corner */}
                      <div className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full border border-[var(--border)] opacity-40 transition-transform duration-500 group-hover:scale-125" />

                      <div className="relative flex items-start justify-between">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface)]">
                          <Icon className="h-3.5 w-3.5 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--primary)]" />
                        </div>

                        {index === 0 && (
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                        )}
                      </div>

                      <div className="relative mt-[0.8vw] max-lg:mt-3">
                        <p className="text-[clamp(9px,0.6vw,12px)] font-medium text-[var(--muted-foreground)]">
                          {stat.label}
                        </p>

                        <div className="mt-1 flex items-end justify-between gap-2">
                          <span className="text-[clamp(24px,1.65vw,34px)] font-semibold leading-none tracking-[-0.05em] text-[var(--foreground)]">
                            {stat.value}
                          </span>

                          <span className="hidden text-right text-[8px] text-[var(--muted-foreground)] sm:block">
                            {stat.meta}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------------------------------------------------------- */}
              {/* RECENT ORDERS                                                */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.9vw] max-lg:rounded-[13px] max-lg:p-3.5">
                <div className="mb-[0.7vw] flex items-center justify-between max-lg:mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[clamp(15px,0.95vw,19px)] font-semibold text-[var(--foreground)]">
                        Recent orders
                      </h3>

                      <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-[8px] text-[var(--muted-foreground)]">
                        2 active
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] text-[var(--muted-foreground)]">
                      Track your latest pieces.
                    </p>
                  </div>

                  <button className="group flex items-center gap-1 text-[9px] font-medium text-[var(--foreground)]">
                    View all
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="group grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 rounded-[0.6vw] border border-[var(--border)] p-2 transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--surface)] max-lg:grid-cols-[52px_minmax(0,1fr)] max-lg:rounded-[10px]"
                    >
                      {/* ------------------------------------------------ */}
                      {/* PRODUCT PLACEHOLDER                              */}
                      {/* ------------------------------------------------ */}

                      <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-[var(--border)] bg-[var(--surface)]">
                        {/* Subtle tailoring pattern */}
                        <div className="pointer-events-none absolute inset-0 opacity-40">
                          <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--border)]" />
                          <div className="absolute left-0 top-1/2 h-px w-full bg-[var(--border)]" />
                        </div>

                        <div className="relative flex flex-col items-center">
                          <Shirt className="mb-1 h-4 w-4 text-[var(--muted-foreground)]" />

                          <span className="text-[6px] font-semibold tracking-[0.12em] text-[var(--muted-foreground)]">
                            {order.placeholder}
                          </span>
                        </div>
                      </div>

                      {/* ------------------------------------------------ */}
                      {/* ORDER INFORMATION                                */}
                      {/* ------------------------------------------------ */}

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h4 className="truncate text-[clamp(11px,0.72vw,14px)] font-semibold text-[var(--foreground)]">
                            {order.title}
                          </h4>

                          <span className="rounded-full bg-[var(--primary)]/10 px-1.5 py-0.5 text-[7px] font-semibold text-[var(--primary)]">
                            {order.status}
                          </span>
                        </div>

                        <p className="mt-1 text-[8px] text-[var(--muted-foreground)]">
                          {order.id} · {order.type}
                        </p>

                        <div className="mt-2 flex max-w-[360px] items-center gap-2">
                          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                            <div
                              className="h-full rounded-full bg-[var(--primary)]"
                              style={{
                                width: `${order.progress}%`,
                              }}
                            />
                          </div>

                          <span className="text-[8px] font-medium text-[var(--muted-foreground)]">
                            {order.progress}%
                          </span>
                        </div>
                      </div>

                      {/* ------------------------------------------------ */}
                      {/* ORDER STATUS                                      */}
                      {/* ------------------------------------------------ */}

                      <div className="hidden min-w-[55px] text-right sm:block">
                        <p className="text-[8px] text-[var(--muted-foreground)]">
                          Progress
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold text-[var(--foreground)]">
                          {order.progress}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* APPOINTMENT + STYLE                                         */}
              {/* ---------------------------------------------------------- */}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* Appointment */}
                <div className="group relative overflow-hidden rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.9vw] max-lg:rounded-[13px] max-lg:p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface)]">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--primary)]" />
                    </div>

                    <span className="flex items-center gap-1 text-[8px] font-medium text-[var(--primary)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                      Upcoming
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-[8px] text-[var(--muted-foreground)]">
                      Next appointment
                    </p>

                    <h4 className="mt-1 text-[clamp(13px,0.8vw,16px)] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                      Final fitting session
                    </h4>

                    <div className="mt-2 flex items-center gap-1.5 text-[8px] text-[var(--muted-foreground)]">
                      <Clock3 className="h-3 w-3" />
                      Tomorrow · 04:30 PM
                    </div>
                  </div>
                </div>

                {/* Style Profile */}
                <div className="group relative overflow-hidden rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.9vw] max-lg:rounded-[13px] max-lg:p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface)]">
                      <Sparkles className="h-3.5 w-3.5 text-[var(--foreground)]" />
                    </div>

                    <span className="text-[8px] text-[var(--muted-foreground)]">
                      92% complete
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-[8px] text-[var(--muted-foreground)]">
                      Style profile
                    </p>

                    <h4 className="mt-1 text-[clamp(13px,0.8vw,16px)] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                      Classic & Contemporary
                    </h4>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {["Formal", "Minimal", "Tailored"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[7px] text-[var(--muted-foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN                                                   */}
            {/* ============================================================ */}

            <div className="flex min-w-0 flex-col gap-[0.8vw] max-lg:gap-3">
              {/* ---------------------------------------------------------- */}
              {/* ACCOUNT HUB                                                  */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[13px] max-lg:p-3.5">
                <div className="mb-[0.8vw] max-lg:mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[clamp(17px,1.25vw,24px)] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                        Everything in one place.
                      </h3>

                      <p className="mt-1 text-[9px] leading-relaxed text-[var(--muted-foreground)]">
                        Your profile, preferences and account details.
                      </p>
                    </div>

                    <div className="hidden h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] sm:flex">
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {accountItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        className="group flex w-full items-center justify-between rounded-[9px] border border-[var(--border)] px-2.5 py-2 text-left transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--surface)]">
                            <Icon className="h-3 w-3 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--primary)]" />
                          </div>

                          <span className="truncate text-[clamp(10px,0.65vw,13px)] font-medium text-[var(--foreground)]">
                            {item.label}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <span
                            className={`text-[8px] ${
                              item.accent
                                ? "font-medium text-[var(--primary)]"
                                : "text-[var(--muted-foreground)]"
                            }`}
                          >
                            {item.value}
                          </span>

                          <ChevronRight className="h-3 w-3 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* SUPPORT CHAT                                                 */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.9vw] max-lg:rounded-[13px] max-lg:p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)]">
                      <MessageCircle className="h-3.5 w-3.5 text-[var(--primary)]" />

                      <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-[clamp(13px,0.8vw,16px)] font-semibold text-[var(--foreground)]">
                        Chat with your tailor
                      </h3>

                      <p className="mt-0.5 truncate text-[8px] text-[var(--muted-foreground)]">
                        Questions about your order?
                      </p>
                    </div>
                  </div>

                  {/* GREEN ONLINE */}
                  <span className="flex shrink-0 items-center gap-1.5 text-[8px] font-medium text-green-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Online
                  </span>
                </div>

                <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--foreground)] px-3 py-2 text-[8px] font-semibold text-[var(--background)] transition-all duration-300 hover:opacity-80">
                  Open conversation
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* RECENT ACTIVITY                                              */}
              {/* ---------------------------------------------------------- */}

              <div className="flex-1 rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[0.9vw] max-lg:rounded-[13px] max-lg:p-3.5">
                <div className="mb-[0.7vw] flex items-center justify-between max-lg:mb-3">
                  <div>
                    <h3 className="text-[clamp(13px,0.85vw,17px)] font-semibold text-[var(--foreground)]">
                      Recent activity
                    </h3>

                    <p className="mt-0.5 text-[8px] text-[var(--muted-foreground)]">
                      Latest account updates.
                    </p>
                  </div>

                  <Bell className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                </div>

                <div className="space-y-2.5">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={activity.title}
                        className="group flex items-center gap-2.5"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                          <Icon className="h-3 w-3 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--primary)]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[9px] font-medium text-[var(--foreground)]">
                            {activity.title}
                          </p>

                          <p className="mt-0.5 text-[7px] text-[var(--muted-foreground)]">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}