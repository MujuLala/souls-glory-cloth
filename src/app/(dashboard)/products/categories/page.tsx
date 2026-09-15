import { FolderTree } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import TaxonomyManager from "@/components/dashboard/catalog/TaxonomyManager";
import { deleteCategory, saveCategory } from "@/actions/catalog";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: true,
      _count: { select: { products: true } },
    },
  });

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    status: category.status,
    productCount: category._count.products,
  }));

  const uncategorised = await prisma.product.count({
    where: { categoryId: null },
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Categories" },
        ]}
      />

      <PageHeader
        title="Categories"
        description="The top-level structure customers browse by — menswear, womenswear, kids, fabric and so on."
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Categories",
            value: rows.length,
            icon: <FolderTree size={15} />,
          },
          {
            label: "Active",
            value: rows.filter((row) => row.status === "Active").length,
          },
          {
            label: "Products categorised",
            value: rows.reduce((sum, row) => sum + row.productCount, 0),
          },
          {
            label: "Uncategorised",
            value: uncategorised,
            hint: uncategorised > 0 ? "Needs attention" : "All sorted",
          },
        ]}
      />

      <TaxonomyManager
        rows={rows}
        singular="Category"
        plural="Categories"
        emptyHint="Categories group your catalogue so shoppers can find pieces quickly."
        onSave={saveCategory}
        onDelete={deleteCategory}
      />
    </PageShell>
  );
}
