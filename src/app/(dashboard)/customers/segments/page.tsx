import Link from "next/link";
import { ArrowRight, Ruler, Sparkles, TrendingUp, UserX } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { prisma } from "@/lib/prisma";
import { formatMoney, toNumber } from "@/lib/format";

export const metadata = { title: "Customer segments" };

/* =========================================================
   SEGMENTS

   Live counts computed from the customer table — each one
   links straight to the matching filter on the list.
========================================================= */

export default async function SegmentsPage() {
  const now = Date.now();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  const [
    newCustomers,
    repeat,
    lapsed,
    noMeasurements,
    highValue,
    totals,
  ] = await Promise.all([
    prisma.customer.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.customer.count({ where: { totalOrders: { gte: 2 } } }),
    prisma.customer.count({
      where: {
        totalOrders: { gte: 1 },
        lastOrderAt: { lt: ninetyDaysAgo },
      },
    }),
    prisma.customer.count({ where: { measurements: { none: {} } } }),
    prisma.customer.count({ where: { totalSpent: { gte: 50000 } } }),
    prisma.customer.aggregate({
      _count: true,
      _sum: { totalSpent: true },
      _avg: { totalSpent: true },
    }),
  ]);

  const segments = [
    {
      title: "New this month",
      description: "Signed up or first ordered in the last 30 days.",
      count: newCustomers,
      icon: <Sparkles size={17} />,
      href: "/customers?segment=new",
    },
    {
      title: "Repeat buyers",
      description: "Two or more orders — your most reliable revenue.",
      count: repeat,
      icon: <TrendingUp size={17} />,
      href: "/customers",
    },
    {
      title: "Lapsed",
      description: "Ordered before, but nothing in the last 90 days.",
      count: lapsed,
      icon: <UserX size={17} />,
      href: "/customers",
    },
    {
      title: "Missing measurements",
      description: "Can't be offered made-to-measure until you have a set.",
      count: noMeasurements,
      icon: <Ruler size={17} />,
      href: "/customers?segment=no-measurements",
    },
    {
      title: "High value",
      description: `Lifetime spend above ${formatMoney(50000)}.`,
      count: highValue,
      icon: <TrendingUp size={17} />,
      href: "/customers",
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: "Segments" },
        ]}
      />

      <PageHeader
        title="Segments"
        description="Live slices of your customer base. Use them to decide who to message, and who to chase for measurements."
      />

      <Card className="mb-4">
        <div className="grid divide-y divide-line-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "Total customers", value: totals._count },
            {
              label: "Lifetime revenue",
              value: formatMoney(toNumber(totals._sum.totalSpent)),
            },
            {
              label: "Average spend",
              value: formatMoney(toNumber(totals._avg.totalSpent)),
            },
          ].map((stat) => (
            <div key={stat.label} className="p-4">
              <p className="text-[11px] text-faint">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-ink">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment) => (
          <Link
            key={segment.title}
            href={segment.href}
            className="group rounded-2xl border border-line bg-card p-4 shadow-card transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                {segment.icon}
              </span>

              <span className="text-2xl font-bold text-ink">
                {segment.count}
              </span>
            </div>

            <p className="mt-3 text-[13px] font-semibold text-ink">
              {segment.title}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-faint">
              {segment.description}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
              View customers
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
