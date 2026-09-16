import Link from "next/link";
import { ArrowRight, BarChart3, Boxes, Package, Users } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import BarChart from "@/components/ui/bar-chart";
import { getSalesReport } from "@/data/reports";
import { formatDate, formatMoney } from "@/lib/format";

export const metadata = { title: "Reports" };

export default async function ReportsPage() {
  const sales = await getSalesReport(14);

  const sections = [
    {
      title: "Sales",
      description: "Revenue trends, channels and order types.",
      icon: <BarChart3 size={17} />,
      href: "/reports/sales",
    },
    {
      title: "Products",
      description: "Best sellers and category breakdown.",
      icon: <Package size={17} />,
      href: "/reports/products",
    },
    {
      title: "Customers",
      description: "Who's buying, repeat rate, top spenders.",
      icon: <Users size={17} />,
      href: "/reports/customers",
    },
    {
      title: "Inventory",
      description: "Stock value and what needs restocking.",
      icon: <Boxes size={17} />,
      href: "/reports/inventory",
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reports" }]}
      />

      <PageHeader
        title="Reports"
        description="A closer look at how the business is performing."
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Revenue (14 days)",
            value: formatMoney(sales.totalRevenue, { compact: true }),
          },
          { label: "Orders (14 days)", value: sales.orderCount },
          {
            label: "Average order value",
            value: formatMoney(sales.averageOrderValue),
          },
        ]}
      />

      <Card className="mb-4">
        <CardHeader title="Revenue — last 14 days" />
        <CardBody>
          <BarChart
            data={sales.days.map((day) => ({
              label: formatDate(day.date),
              value: day.revenue,
            }))}
            formatValue={(value) => formatMoney(value)}
          />
        </CardBody>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group rounded-2xl border border-line bg-card p-4 shadow-card transition-colors hover:border-primary/40"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              {section.icon}
            </span>

            <p className="mt-3 text-[13px] font-semibold text-ink">{section.title}</p>

            <p className="mt-1 text-[11px] leading-5 text-faint">
              {section.description}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
              Open
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
