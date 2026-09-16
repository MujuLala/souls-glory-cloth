import { ShoppingBag, TrendingUp, Wallet } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import BarChart, { BarList } from "@/components/ui/bar-chart";
import { getSalesReport } from "@/data/reports";
import { formatDate, formatMoney } from "@/lib/format";

export const metadata = { title: "Sales report" };

export default async function SalesReportPage() {
  const report = await getSalesReport(30);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Sales" },
        ]}
      />

      <PageHeader
        title="Sales report"
        description="Revenue over the last 30 days across every channel."
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Revenue (30 days)",
            value: formatMoney(report.totalRevenue, { compact: true }),
            icon: <Wallet size={15} />,
          },
          {
            label: "Orders",
            value: report.orderCount,
            icon: <ShoppingBag size={15} />,
          },
          {
            label: "Average order value",
            value: formatMoney(report.averageOrderValue),
            icon: <TrendingUp size={15} />,
          },
        ]}
      />

      <Card className="mb-4">
        <CardHeader
          title="Daily revenue"
          description="Last 30 days, cancelled orders excluded."
        />

        <CardBody>
          <BarChart
            data={report.days.map((day) => ({
              label: formatDate(day.date),
              value: day.revenue,
            }))}
            formatValue={(value) => formatMoney(value)}
            height={180}
          />
        </CardBody>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader title="Orders by channel" />
          <CardBody>
            <BarList
              data={report.byChannel.map((row) => ({
                label: row.channel,
                value: row.count,
              }))}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Orders by type" />
          <CardBody>
            <BarList
              data={report.byType.map((row) => ({
                label: row.type,
                value: row.count,
              }))}
            />
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
