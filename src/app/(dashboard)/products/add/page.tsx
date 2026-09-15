import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { getCatalogOptions } from "@/data/products";

export const metadata = { title: "Add product" };

export default async function AddProductPage() {
  const { categories, collections, tags } = await getCatalogOptions();

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Add product" },
        ]}
      />

      <PageHeader
        title="Add a product"
        description="Add a ready-to-wear piece or a made-to-measure design your customers can order."
      />

      <ProductForm
        categories={categories}
        collections={collections}
        tags={tags}
      />
    </PageShell>
  );
}
