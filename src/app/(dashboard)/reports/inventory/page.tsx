import { Boxes, PackageX, TrendingDown, Wallet } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { BarList } from "@/components/ui/bar-chart";
import { getInventoryReport } from "@/data/reports";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Inventory report" };

export default async function InventoryReportPage() {
  const report = await getInventoryReport();

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Inventory" },
        ]}
      />

      <PageHeader
        title="Inventory report"
        description="Where your stock value sits, and what needs attention."
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Total stock value",
            value: formatMoney(report.totalValue, { compact: true }),
            icon: <Wallet size={15} />,
          },
          { label: "In stock", value: report.lowStock, icon: <Boxes size={15} /> },
          {
            label: "Out of stock",
            value: report.outOfStock,
            icon: <PackageX size={15} />,
          },
        ]}
      />

      <Card>
        <CardHeader
          title="Value by category"
          icon={<TrendingDown size={15} />}
        />

        <CardBody>
          <BarList
            data={report.byCategory.map((row) => ({
              label: row.name,
              value: row.value,
            }))}
            formatValue={(value) => formatMoney(value, { compact: true })}
          />
        </CardBody>
      </Card>
    </PageShell>
  );
}
