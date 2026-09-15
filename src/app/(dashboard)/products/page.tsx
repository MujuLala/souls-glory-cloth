import { Package, Plus, TrendingDown, XCircle, Layers } from "lucide-react";

import Button from "@/components/ui/button";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import ProductsClient from "@/components/dashboard/products/ProductsClient";
import { getProductCounts, listProducts } from "@/data/products";

export const metadata = { title: "Products" };

type Search = {
  tab?: string;
  search?: string;
  sort?: string;
  page?: string;
};

/** Map the UI tab onto the status / stock filter it means. */
function filterFromTab(tab: string | undefined) {
  switch (tab) {
    case "active":
      return { status: "Active" };
    case "draft":
      return { status: "Draft" };
    case "archived":
      return { status: "Archived" };
    case "low":
      return { stock: "low" as const };
    case "out":
      return { stock: "out" as const };
    default:
      return {};
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;

  const [{ products, total, page, pageCount }, counts] = await Promise.all([
    listProducts({
      ...filterFromTab(params.tab),
      search: params.search,
      sort: params.sort as never,
      page: Number(params.page ?? 1),
    }),
    getProductCounts(),
  ]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products" }]}
      />

      <PageHeader
        title="Products"
        description="Everything you sell — ready-to-wear pieces, made-to-measure garments and the fabric you stock for them."
        actions={
          <>
            <Button href="/products/categories" variant="secondary" size="sm">
              <Layers size={15} />
              Categories
            </Button>

            <Button href="/products/add" size="sm">
              <Plus size={15} />
              Add product
            </Button>
          </>
        }
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Total products",
            value: counts.all,
            icon: <Package size={15} />,
          },
          {
            label: "Published",
            value: counts.active,
            hint: `${counts.draft} in draft`,
          },
          {
            label: "Low stock",
            value: counts.lowStock,
            icon: <TrendingDown size={15} />,
            hint: "At or below threshold",
          },
          {
            label: "Out of stock",
            value: counts.outOfStock,
            icon: <XCircle size={15} />,
          },
        ]}
      />

      <ProductsClient
        products={products}
        counts={counts}
        page={page}
        pageCount={pageCount}
        total={total}
      />
    </PageShell>
  );
}
