import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import StockClient from "@/components/dashboard/inventory/StockClient";
import { listStock } from "@/data/inventory";

export const metadata = { title: "Out of stock" };

export default async function OutOfStockPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  const { stock, total, page, pageCount } = await listStock({
    filter: "out",
    search: params.search,
    page: Number(params.page ?? 1),
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Inventory", href: "/inventory" },
          { label: "Out of stock" },
        ]}
      />

      <PageHeader
        title="Out of stock"
        description="Zero units on hand. Shoppers can still order these made-to-measure, but not off the shelf."
      />

      <StockClient stock={stock} page={page} pageCount={pageCount} total={total} />
    </PageShell>
  );
}
