import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import TemplatesClient from "@/components/dashboard/tailoring/TemplatesClient";
import { ensureMeasurementTemplates } from "@/lib/seed-templates";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Measurement types" };

export default async function TemplatesPage() {
  await ensureMeasurementTemplates();

  const templates = await prisma.measurementTemplate.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      fields: { orderBy: { sortOrder: "asc" } },
      _count: { select: { measurements: true } },
    },
  });

  const rows = templates.map((template) => ({
    id: template.id,
    name: template.name,
    slug: template.slug,
    gender: template.gender,
    description: template.description,
    isActive: template.isActive,
    fields: template.fields.map((field) => ({
      id: field.id,
      key: field.key,
      label: field.label,
      unit: field.unit,
      helpText: field.helpText,
      placeholder: field.placeholder,
      required: field.required,
    })),
    measurementCount: template._count.measurements,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tailoring", href: "/tailoring" },
          { label: "Measurement types" },
        ]}
      />

      <PageHeader
        title="Measurement types"
        description="The garment templates customers and staff fill in when saving a measurement — shalwar kameez, sherwani, pant & shirt, and anything else you stitch."
      />

      <TemplatesClient templates={rows} />
    </PageShell>
  );
}
