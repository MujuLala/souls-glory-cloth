"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  CreditCard,
  MoreHorizontal,
  Package,
  Scissors,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "Rs. 1,284,500",
    change: "+12.5%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    value: "3,642",
    change: "+5.7%",
    positive: true,
    icon: Users,
  },
  {
    title: "Products",
    value: "286",
    change: "-2.4%",
    positive: false,
    icon: Package,
  },
];

const recentOrders = [
  {
    id: "#SGC-10248",
    customer: "Ahmed Khan",
    product: "Premium Shalwar Kameez",
    amount: "Rs. 18,500",
    status: "Completed",
    date: "14 Sep 2026",
  },
  {
    id: "#SGC-10247",
    customer: "Usman Ali",
    product: "Custom Kurta",
    amount: "Rs. 8,900",
    status: "Stitching",
    date: "14 Sep 2026",
  },
  {
    id: "#SGC-10246",
    customer: "Hassan Raza",
    product: "Wedding Suit",
    amount: "Rs. 32,000",
    status: "Processing",
    date: "13 Sep 2026",
  },
  {
    id: "#SGC-10245",
    customer: "Bilal Ahmed",
    product: "Classic Waistcoat",
    amount: "Rs. 12,500",
    status: "Pending",
    date: "13 Sep 2026",
  },
  {
    id: "#SGC-10244",
    customer: "Fahad Sheikh",
    product: "Premium Kurta",
    amount: "Rs. 7,800",
    status: "Completed",
    date: "12 Sep 2026",
  },
];

const topProducts = [
  {
    name: "Premium Shalwar Kameez",
    category: "Men's Collection",
    sales: "248 sold",
    revenue: "Rs. 4.58M",
  },
  {
    name: "Classic Kurta",
    category: "Men's Collection",
    sales: "186 sold",
    revenue: "Rs. 1.65M",
  },
  {
    name: "Wedding Suit",
    category: "Formal Wear",
    sales: "94 sold",
    revenue: "Rs. 3.01M",
  },
  {
    name: "Classic Waistcoat",
    category: "Waistcoats",
    sales: "81 sold",
    revenue: "Rs. 1.01M",
  },
];

const stitchingStats = [
  {
    title: "New Orders",
    value: "24",
    icon: Scissors,
  },
  {
    title: "In Stitching",
    value: "18",
    icon: Clock3,
  },
  {
    title: "Ready",
    value: "12",
    icon: Package,
  },
  {
    title: "Delivered",
    value: "46",
    icon: Truck,
  },
];

const chartData = [42, 58, 48, 72, 64, 81, 68, 92, 76, 88, 74, 96];

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-white">
      {/* IMPORTANT:
          Layout already adds md:ml-[260px] for the sidebar.
          This only handles content padding.
      */}
      <div className="w-full px-5 py-6 sm:px-6 md:px-8 lg:px-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-sm text-zinc-500">
              Sunday, September 14, 2026
            </p>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Good evening, Mujahid 👋
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06]"
          >
            <CalendarDays size={17} />

            <span>This Month</span>

            <ChevronDown size={15} />
          </button>
        </div>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32]">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.positive
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}

                    {stat.change}
                  </div>
                </div>

                <p className="text-sm text-zinc-500">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-zinc-600">
                  Compared with last month
                </p>
              </div>
            );
          })}
        </section>

        {/* Revenue + Stitching */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
          {/* Revenue Overview */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-zinc-500">
                  Revenue Overview
                </p>

                <div className="mt-1 flex items-end gap-3">
                  <h2 className="text-2xl font-semibold">
                    Rs. 1.28M
                  </h2>

                  <span className="mb-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <ArrowUpRight size={14} />
                    12.5%
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.04]"
              >
                Last 12 months
                <ChevronDown size={13} />
              </button>
            </div>

            {/* Chart */}
            <div className="relative h-[260px] w-full sm:h-[280px]">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 75, 50, 25, 0].map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3 border-b border-dashed border-white/[0.06]"
                  >
                    <span className="w-8 text-right text-[10px] text-zinc-700">
                      {value}%
                    </span>

                    <div className="h-px flex-1" />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-11 right-0 top-0 flex items-end justify-between gap-1 px-2 sm:gap-2">
                {chartData.map((height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end justify-center"
                  >
                    <div
                      className="w-full max-w-[34px] rounded-t-md bg-[#e51e32]/70 transition-all duration-300 group-hover:bg-[#e51e32]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-11 mt-3 flex justify-between text-[10px] text-zinc-600">
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>

          {/* Stitching Overview */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Stitching Overview
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Today&apos;s Work
                </h2>
              </div>

              <Scissors
                className="text-[#e51e32]"
                size={21}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stitchingStats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/[0.06] bg-black/10 p-4"
                  >
                    <Icon
                      size={18}
                      className="mb-4 text-zinc-500"
                    />

                    <p className="text-2xl font-semibold">
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-[#e51e32] text-sm font-medium text-white transition hover:bg-[#c9182b]"
            >
              View Stitching Orders
            </button>
          </div>
        </section>

        {/* Recent Orders + Top Products */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
          {/* Recent Orders */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex items-center justify-between border-b border-white/[0.07] p-5 sm:p-6">
              <div>
                <p className="text-sm text-zinc-500">
                  Orders
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Recent Orders
                </h2>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-[#e51e32] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left">
                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Order
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Product
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">
                          {order.id}
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-600">
                          {order.date}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {order.customer}
                      </td>

                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {order.product}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium">
                        {order.amount}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex items-center justify-between border-b border-white/[0.07] p-5 sm:p-6">
              <div>
                <p className="text-sm text-zinc-500">
                  Performance
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Top Products
                </h2>
              </div>

              <MoreHorizontal
                size={19}
                className="text-zinc-600"
              />
            </div>

            <div className="p-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-white/[0.03]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-sm font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {product.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {product.revenue}
                    </p>

                    <p className="mt-1 text-[10px] text-zinc-600">
                      {product.sales}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-5 grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 xl:grid-cols-3">
          <QuickAction
            icon={Package}
            title="Add New Product"
            description="Create a new product in your catalog"
          />

          <QuickAction
            icon={CreditCard}
            title="Check Payments"
            description="Review pending and completed payments"
          />

          <QuickAction
            icon={Truck}
            title="Track Shipments"
            description="Manage your active deliveries"
          />
        </section>
      </div>
    </main>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Completed:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",

    Stitching:
      "bg-purple-500/10 text-purple-400 border-purple-500/10",

    Processing:
      "bg-blue-500/10 text-blue-400 border-blue-500/10",

    Pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/10",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
        styles[status] ??
        "border-white/10 bg-white/5 text-zinc-400"
      }`}
    >
      {status}
    </span>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:border-[#e51e32]/30 hover:bg-[#e51e32]/[0.03]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32] transition group-hover:bg-[#e51e32] group-hover:text-white">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>
      </div>
    </button>
  );
}