import { Boxes, PackageX, TrendingDown, Wallet } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import StockClient from "@/components/dashboard/inventory/StockClient";
import { getInventoryStats, listStock } from "@/data/inventory";
import { formatMoney, formatNumber } from "@/lib/format";

export const metadata = { title: "Inventory" };

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  const [{ stock, total, page, pageCount }, stats] = await Promise.all([
    listStock({ search: params.search, page: Number(params.page ?? 1) }),
    getInventoryStats(),
  ]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Inventory" }]}
      />

      <PageHeader
        title="Inventory"
        description="Stock levels across everything you track — adjust counts directly, or dig into low and out-of-stock queues."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Tracked products", value: stats.tracked, icon: <Boxes size={15} /> },
          {
            label: "Units in stock",
            value: formatNumber(stats.unitsInStock),
          },
          {
            label: "Low stock",
            value: stats.lowStock,
            icon: <TrendingDown size={15} />,
          },
          {
            label: "Out of stock",
            value: stats.outOfStock,
            icon: <PackageX size={15} />,
          },
        ]}
      />

      <div className="mb-4 rounded-2xl border border-line bg-card p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Wallet size={16} />
          </span>

          <div>
            <p className="text-[11px] text-faint">Total inventory value</p>
            <p className="text-lg font-bold text-ink">
              {formatMoney(stats.inventoryValue)}
            </p>
          </div>
        </div>
      </div>

      <StockClient stock={stock} page={page} pageCount={pageCount} total={total} />
    </PageShell>
  );
}
