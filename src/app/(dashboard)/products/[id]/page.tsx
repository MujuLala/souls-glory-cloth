import { notFound } from "next/navigation";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import Button from "@/components/ui/button";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { getCatalogOptions, getProduct } from "@/data/products";

export const metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const [product, options] = await Promise.all([
    getProduct(productId),
    getCatalogOptions(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <PageHeader
        title={product.name}
        description={`SKU ${product.sku} · ${product.status}`}
        actions={
          <Button href="/products" variant="secondary" size="sm">
            Back to products
          </Button>
        }
      />

      <ProductForm
        product={product}
        categories={options.categories}
        collections={options.collections}
        tags={options.tags}
      />
    </PageShell>
  );
}
