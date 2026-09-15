import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import ImportExportClient from "@/components/dashboard/catalog/ImportExportClient";

export const metadata = { title: "Import & export" };

export default function ImportExportPage() {
  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Import / Export" },
        ]}
      />

      <PageHeader
        title="Import & export"
        description="Move your catalogue in and out as CSV — handy for bulk price changes or migrating from another system."
      />

      <ImportExportClient />
    </PageShell>
  );
}
