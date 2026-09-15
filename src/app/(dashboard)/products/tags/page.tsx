import { TagIcon } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import TaxonomyManager from "@/components/dashboard/catalog/TaxonomyManager";
import { deleteTag, saveTag } from "@/actions/catalog";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Tags" };

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: { select: { products: true } },
    },
  });

  const rows = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    productCount: tag._count.products,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Tags" },
        ]}
      />

      <PageHeader
        title="Tags"
        description="Free-form labels for filtering and search — fabric names, occasions, fits."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Tags", value: rows.length, icon: <TagIcon size={15} /> },
          {
            label: "In use",
            value: rows.filter((row) => row.productCount > 0).length,
          },
          {
            label: "Unused",
            value: rows.filter((row) => row.productCount === 0).length,
          },
          {
            label: "Tagged products",
            value: rows.reduce((sum, row) => sum + row.productCount, 0),
          },
        ]}
      />

      <TaxonomyManager
        rows={rows}
        singular="Tag"
        plural="Tags"
        emptyHint="Tags make filtering precise — “wedding”, “linen”, “slim fit”."
        withDescription={false}
        withStatus={false}
        onSave={saveTag}
        onDelete={deleteTag}
      />
    </PageShell>
  );
}
