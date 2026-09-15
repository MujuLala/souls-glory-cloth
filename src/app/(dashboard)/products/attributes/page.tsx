import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import AttributesClient from "@/components/dashboard/catalog/AttributesClient";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Attributes" };

export default async function AttributesPage() {
  const attributes = await prisma.attribute.findMany({
    orderBy: { name: "asc" },
    include: { values: { orderBy: { id: "asc" } } },
  });

  const rows = attributes.map((attribute) => ({
    id: attribute.id,
    name: attribute.name,
    slug: attribute.slug,
    values: attribute.values.map((value) => value.value),
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Attributes" },
        ]}
      />

      <PageHeader
        title="Attributes"
        description="Reusable option sets you attach to products — fabric, fit, sleeve length, embroidery style."
      />

      <AttributesClient rows={rows} />
    </PageShell>
  );
}
