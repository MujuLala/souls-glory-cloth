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
  },
  {
    label: "Saved profiles",
    value: "03",
    icon: UserRound,
  },
  {
    label: "Wishlist",
    value: "08",
    icon: Heart,
  },
  {
    label: "Pending reviews",
    value: "04",
    icon: Star,
  },
];

const orders = [
  {
    id: "#SG-1048",
    title: "Midnight Signature Kurta",
    type: "Custom Made",
    status: "Stitching",
    progress: 72,
    image: "/images/dashboard/kurta-placeholder.jpg",
  },
  {
    id: "#SG-1039",
    title: "Classic Formal Suit",
    type: "Ready to Wear",
    status: "In Transit",
    progress: 88,
    image: "/images/dashboard/suit-placeholder.jpg",
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
  },
];

const activities = [
  {
    icon: CheckCircle2,
    title: "Measurement profile updated",
    time: "2 hours ago",
  },
  {
    icon: Shirt,
    title: "Order moved to stitching",
    time: "Yesterday",
  },
  {
    icon: Star,
    title: "New review reminder",
    time: "2 days ago",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden ">
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND GLOW                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[15%] h-[30vw] w-[30vw] rounded-full bg-[var(--primary)]/10 blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[28vw] w-[28vw] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
      </div>

      <Container className="relative">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-[3vw] grid gap-[2vw] lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <span className="mb-[0.7vw] block text-[clamp(10px,0.72vw,13px)] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              Your account
            </span>

            <h2 className="max-w-[850px] text-[clamp(40px,4.1vw,72px)] font-semibold leading-[0.97] tracking-[-0.055em] text-[var(--foreground)]">
              A dashboard built
              <br />
              for every client.
            </h2>
          </div>

          <p className="max-w-[430px] text-[clamp(14px,0.95vw,17px)] leading-[1.55] text-[var(--muted-foreground)] lg:pb-[0.35vw]">
            Your personal space for orders, measurements, appointments,
            payments, saved styles and everything in between.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* DASHBOARD WRAPPER                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="overflow-hidden rounded-[1.35vw] border border-[var(--border)] bg-[var(--surface)] shadow-[0_25px_100px_rgba(0,0,0,0.2)] max-lg:rounded-[20px]">
          {/* -------------------------------------------------------------- */}
          {/* DASHBOARD TOP BAR                                               */}
          {/* -------------------------------------------------------------- */}

          <div className="flex items-center justify-between border-b border-[var(--border)] px-[1.35vw] py-[1vw] max-lg:px-5 max-lg:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dropdown-bg)]">
                <UserRound className="h-4 w-4 text-[var(--foreground)]" />
              </div>

              <div>
                <p className="text-[clamp(13px,0.85vw,16px)] font-semibold text-[var(--foreground)]">
                  Good morning, Ahmed
                </p>

                <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
                  Here&apos;s what&apos;s happening with your account.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              {/* Notification */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)]">
                <Bell className="h-4 w-4 text-[var(--foreground)]" />

                <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              </div>

              {/* Dashboard label */}
              <span className="rounded-full border border-[var(--border)] bg-[var(--dropdown-bg)] px-3 py-2 text-[10px] font-medium text-[var(--muted-foreground)]">
                Client dashboard
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* DASHBOARD CONTENT                                               */}
          {/* -------------------------------------------------------------- */}

          <div className="grid items-stretch gap-[1vw] p-[1vw] max-lg:p-4 xl:grid-cols-[1.65fr_1fr]">
            {/* ============================================================ */}
            {/* LEFT COLUMN                                                    */}
            {/* ============================================================ */}

            <div className="flex h-full flex-col gap-[1vw] max-lg:gap-4">
              {/* ---------------------------------------------------------- */}
              {/* STAT CARDS                                                   */}
              {/* ---------------------------------------------------------- */}

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="group rounded-[0.8vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 max-lg:rounded-[14px] max-lg:p-4"
                    >
                      <div className="mb-[1vw] flex items-center justify-between max-lg:mb-4">
                        <span className="text-[clamp(10px,0.65vw,13px)] font-medium text-[var(--muted-foreground)]">
                          {stat.label}
                        </span>

                        <Icon className="h-[0.9vw] w-[0.9vw] text-[var(--muted-foreground)] max-lg:h-4 max-lg:w-4" />
                      </div>

                      <div className="text-[clamp(27px,1.9vw,38px)] font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)]">
                        {stat.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------------------------------------------------------- */}
              {/* RECENT ORDERS                                                */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[15px] max-lg:p-4">
                <div className="mb-[1vw] flex items-center justify-between max-lg:mb-4">
                  <div>
                    <h3 className="text-[clamp(16px,1vw,20px)] font-semibold text-[var(--foreground)]">
                      Recent orders
                    </h3>

                    <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
                      Track your latest pieces.
                    </p>
                  </div>

                  <button className="flex items-center gap-1 text-[11px] font-medium text-[var(--foreground)] transition-opacity hover:opacity-70">
                    View all
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="group grid grid-cols-[clamp(56px,4.8vw,78px)_minmax(0,1fr)_auto] items-center gap-3 rounded-[0.7vw] border border-[var(--border)] p-[0.65vw] transition-all duration-300 hover:bg-[var(--surface)] max-lg:rounded-[12px] max-lg:p-2.5"
                    >
                      {/* Product Image */}
                      <div className="h-[4.8vw] w-[4.8vw] min-h-[56px] min-w-[56px] max-h-[78px] max-w-[78px] overflow-hidden rounded-[0.55vw] bg-[var(--surface)] max-lg:rounded-lg">
                        <img
                          src={order.image}
                          alt={order.title}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h4 className="truncate text-[clamp(12px,0.78vw,15px)] font-semibold text-[var(--foreground)]">
                            {order.title}
                          </h4>

                          <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[9px] font-medium text-[var(--primary)]">
                            {order.status}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                          Order {order.id} · {order.type}
                        </p>

                        {/* Progress */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1 max-w-[260px] flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                            <div
                              className="h-full rounded-full bg-[var(--primary)] transition-all duration-700"
                              style={{
                                width: `${order.progress}%`,
                              }}
                            />
                          </div>

                          <span className="text-[9px] font-medium text-[var(--muted-foreground)]">
                            {order.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Desktop Status */}
                      <div className="hidden text-right sm:block">
                        <span className="text-[10px] text-[var(--muted-foreground)]">
                          {order.progress}%
                        </span>

                        <p className="mt-1 text-[9px] text-[var(--muted-foreground)]">
                          Complete
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BOTTOM CARDS                                                 */}
              {/* ---------------------------------------------------------- */}

              <div className="grid flex-1 items-stretch gap-2.5 sm:grid-cols-2">
                {/* Appointment */}
                <div className="h-full rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[15px] max-lg:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)]">
                      <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
                    </div>

                    <span className="flex items-center gap-1 text-[9px] font-medium text-[var(--primary)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                      Upcoming
                    </span>
                  </div>

                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Next appointment
                  </p>

                  <h4 className="mt-1 text-[clamp(15px,0.95vw,18px)] font-semibold text-[var(--foreground)]">
                    Final fitting session
                  </h4>

                  <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--muted-foreground)]">
                    <Clock3 className="h-3.5 w-3.5" />
                    Tomorrow · 04:30 PM
                  </div>
                </div>

                {/* Style Profile */}
                <div className="h-full rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[15px] max-lg:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)]">
                      <Shirt className="h-4 w-4 text-[var(--foreground)]" />
                    </div>

                    <span className="text-[10px] text-[var(--muted-foreground)]">
                      92% complete
                    </span>
                  </div>

                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Style profile
                  </p>

                  <h4 className="mt-1 text-[clamp(15px,0.95vw,18px)] font-semibold text-[var(--foreground)]">
                    Classic & Contemporary
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Formal", "Minimal", "Tailored"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] px-2 py-1 text-[8px] text-[var(--muted-foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN                                                   */}
            {/* ============================================================ */}

            <div className="flex h-full flex-col gap-[1vw] max-lg:gap-4">
              {/* ---------------------------------------------------------- */}
              {/* EVERYTHING IN ONE PLACE                                     */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1.2vw] max-lg:rounded-[15px] max-lg:p-4">
                <div className="mb-[1vw] max-lg:mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[clamp(19px,1.35vw,26px)] font-semibold tracking-[-0.035em] text-[var(--foreground)]">
                      Everything in one place.
                    </h3>

                    <div className="hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] sm:flex">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <p className="mt-1.5 max-w-[400px] text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                    Keep your fashion profile, measurements and communication
                    organized from one simple dashboard.
                  </p>
                </div>

                <div className="space-y-2">
                  {accountItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        className="group flex w-full items-center justify-between rounded-[0.65vw] border border-[var(--border)] px-[0.85vw] py-[0.75vw] text-left transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--surface)] max-lg:rounded-[11px] max-lg:px-3 max-lg:py-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--primary)]" />

                          <span className="text-[clamp(11px,0.7vw,14px)] font-medium text-[var(--foreground)]">
                            {item.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[9px] text-[var(--muted-foreground)]">
                          {item.value}

                          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* SUPPORT CHAT                                                 */}
              {/* ---------------------------------------------------------- */}

              <div className="rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[15px] max-lg:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)]">
                      <MessageCircle className="h-4 w-4 text-[var(--primary)]" />
                    </div>

                    <div>
                      <h3 className="text-[clamp(15px,0.9vw,18px)] font-semibold text-[var(--foreground)]">
                        Chat with your tailor
                      </h3>

                      <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted-foreground)]">
                        Questions about your order? Your tailor is online.
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 flex items-center gap-1.5 text-[9px] text-[var(--primary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    Online
                  </span>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2.5 text-[10px] font-semibold text-[var(--background)] transition-opacity hover:opacity-85">
                  Open conversation
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* RECENT ACTIVITY                                              */}
              {/* ---------------------------------------------------------- */}

              <div className="flex-1 rounded-[0.9vw] border border-[var(--border)] bg-[var(--dropdown-bg)] p-[1vw] max-lg:rounded-[15px] max-lg:p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[clamp(15px,0.9vw,18px)] font-semibold text-[var(--foreground)]">
                      Recent activity
                    </h3>

                    <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                      Your latest account updates.
                    </p>
                  </div>

                  <Bell className="h-4 w-4 text-[var(--muted-foreground)]" />
                </div>

                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <ActivityItem
                        key={activity.title}
                        icon={<Icon />}
                        title={activity.title}
                        time={activity.time}
                      />
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

/* -------------------------------------------------------------------------- */
/* ACTIVITY ITEM                                                              */
/* -------------------------------------------------------------------------- */

function ActivityItem({
  icon,
  title,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted-foreground)]">
        <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-[var(--foreground)]">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] text-[var(--muted-foreground)]">
          {time}
        </p>
      </div>
    </div>
  );
}