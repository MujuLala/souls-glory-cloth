import Link from "next/link";
import { Package } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { BarList } from "@/components/ui/bar-chart";
import { getProductsReport } from "@/data/reports";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Products report" };

type TopProduct = Awaited<ReturnType<typeof getProductsReport>>["topProducts"][number];

export default async function ProductsReportPage() {
  const report = await getProductsReport();

  const columns: Column<TopProduct>[] = [
    {
      key: "name",
      header: "Product",
      render: (row) => (
        <Link href={`/products/${row.id}`} className="font-medium text-ink hover:text-primary">
          {row.name}
        </Link>
      ),
    },
    {
      key: "units",
      header: "Units sold",
      align: "right",
      render: (row) => <span className="text-muted">{row.unitsSold}</span>,
    },
    {
      key: "revenue",
      header: "Revenue",
      align: "right",
      render: (row) => (
        <span className="font-semibold text-ink">{formatMoney(row.revenue)}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock left",
      align: "right",
      render: (row) => <span className="text-muted">{row.stock}</span>,
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Products" },
        ]}
      />

      <PageHeader
        title="Products report"
        description="Best sellers by revenue, and how your catalogue is organised."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Total products", value: report.totalProducts, icon: <Package size={15} /> },
          { label: "Active", value: report.activeProducts },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="overflow-hidden">
          <CardHeader title="Top sellers by revenue" />

          <DataTable
            columns={columns}
            rows={report.topProducts}
            rowKey={(row) => row.id}
            empty={{
              icon: <Package size={20} />,
              title: "No sales yet",
              description: "Once orders come in, best sellers will show up here.",
            }}
          />
        </Card>

        <Card>
          <CardHeader title="Products by category" />
          <CardBody>
            <BarList
              data={report.categoryBreakdown.map((row) => ({
                label: row.name,
                value: row.count,
              }))}
            />
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
