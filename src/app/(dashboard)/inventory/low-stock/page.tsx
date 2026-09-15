import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import StockClient from "@/components/dashboard/inventory/StockClient";
import { listStock } from "@/data/inventory";

export const metadata = { title: "Low stock" };

export default async function LowStockPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  const { stock, total, page, pageCount } = await listStock({
    filter: "low",
    search: params.search,
    page: Number(params.page ?? 1),
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Inventory", href: "/inventory" },
          { label: "Low stock" },
        ]}
      />

      <PageHeader
        title="Low stock"
        description="At or below the alert threshold you set on each product. Reorder before these sell out."
      />

      <StockClient stock={stock} page={page} pageCount={pageCount} total={total} />
    </PageShell>
  );
}
