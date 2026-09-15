import { History } from "lucide-react";

import Badge from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { listAdjustments, type AdjustmentRow } from "@/data/inventory";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Stock adjustments" };

const typeTone: Record<string, "success" | "danger" | "neutral" | "warning"> = {
  Add: "success",
  Returned: "success",
  Remove: "danger",
  Damaged: "danger",
  Recount: "warning",
};

export default async function StockAdjustmentsPage() {
  const rows = await listAdjustments();

  const columns: Column<AdjustmentRow>[] = [
    {
      key: "product",
      header: "Product",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{row.productName}</p>
          <p className="mt-0.5 truncate text-[11px] text-faint">
            SKU {row.productSku}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => (
        <Badge tone={typeTone[row.type] ?? "neutral"}>{row.type}</Badge>
      ),
    },
    {
      key: "change",
      header: "Change",
      align: "right",
      render: (row) => (
        <span className="text-muted">
          {row.previousStock} → <strong className="text-ink">{row.newStock}</strong>
        </span>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      render: (row) => (
        <span className="text-muted">{row.reason ?? "—"}</span>
      ),
    },
    {
      key: "by",
      header: "By",
      render: (row) => (
        <span className="text-muted">{row.createdBy ?? "—"}</span>
      ),
    },
    {
      key: "when",
      header: "When",
      render: (row) => (
        <span className="text-faint">{formatDateTime(row.createdAt)}</span>
      ),
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Inventory", href: "/inventory" },
          { label: "Stock adjustments" },
        ]}
      />

      <PageHeader
        title="Stock adjustments"
        description="Every manual change to stock, with who made it and why. Adjust stock from a product's inventory page."
      />

      <Card className="overflow-hidden">
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          empty={{
            icon: <History size={20} />,
            title: "No adjustments yet",
            description: "Manual stock changes will show up here.",
          }}
        />
      </Card>
    </PageShell>
  );
}
