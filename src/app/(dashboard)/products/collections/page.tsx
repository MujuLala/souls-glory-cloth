import { Layers } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import TaxonomyManager from "@/components/dashboard/catalog/TaxonomyManager";
import { deleteCollection, saveCollection } from "@/actions/catalog";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Collections" };

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
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

  const rows = collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description,
    status: collection.status,
    productCount: collection._count.products,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Collections" },
        ]}
      />

      <PageHeader
        title="Collections"
        description="Seasonal and themed edits — a wedding line, an Eid drop, a capsule of everyday shirts."
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Collections",
            value: rows.length,
            icon: <Layers size={15} />,
          },
          {
            label: "Live",
            value: rows.filter((row) => row.status === "Active").length,
          },
          {
            label: "Pieces featured",
            value: rows.reduce((sum, row) => sum + row.productCount, 0),
          },
          {
            label: "Empty collections",
            value: rows.filter((row) => row.productCount === 0).length,
          },
        ]}
      />

      <TaxonomyManager
        rows={rows}
        singular="Collection"
        plural="Collections"
        emptyHint="Build a collection to tell one story across several pieces."
        onSave={saveCollection}
        onDelete={deleteCollection}
      />
    </PageShell>
  );
}
