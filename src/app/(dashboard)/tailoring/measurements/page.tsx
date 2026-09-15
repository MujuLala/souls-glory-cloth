import Link from "next/link";
import { Ruler, Search } from "lucide-react";

import Badge from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Measurements" };

type Row = {
  id: number;
  title: string;
  templateName: string;
  customerName: string;
  customerId: number;
  memberName: string | null;
  updatedAt: string;
};

export default async function AdminMeasurementsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const term = search?.trim();

  const measurements = await prisma.measurement.findMany({
    where: term
      ? {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { customer: { fullName: { contains: term, mode: "insensitive" } } },
          ],
        }
      : undefined,
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: {
      template: { select: { name: true } },
      customer: { select: { id: true, fullName: true } },
      member: { select: { fullName: true } },
    },
  });

  const rows: Row[] = measurements.map((measurement) => ({
    id: measurement.id,
    title: measurement.title,
    templateName: measurement.template.name,
    customerName: measurement.customer.fullName,
    customerId: measurement.customer.id,
    memberName: measurement.member?.fullName ?? null,
    updatedAt: measurement.updatedAt.toISOString(),
  }));

  const templateCount = await prisma.measurementTemplate.count();

  const columns: Column<Row>[] = [
    {
      key: "title",
      header: "Measurement",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{row.title}</p>
          <p className="mt-0.5 truncate text-[11px] text-faint">
            {row.templateName}
          </p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <Link
          href={`/customers/${row.customerId}?tab=measurements`}
          className="text-muted hover:text-primary"
        >
          {row.customerName}
          {row.memberName && row.memberName !== row.customerName
            ? ` · ${row.memberName}`
            : ""}
        </Link>
      ),
    },
    {
      key: "updated",
      header: "Updated",
      render: (row) => (
        <span className="text-faint">{formatDate(row.updatedAt)}</span>
      ),
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tailoring", href: "/tailoring" },
          { label: "Measurements" },
        ]}
      />

      <PageHeader
        title="Measurements"
        description="Every measurement saved across all customers. Edit one from the customer's profile."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Saved measurements", value: rows.length, icon: <Ruler size={15} /> },
          { label: "Garment templates", value: templateCount },
        ]}
      />

      <Card className="overflow-hidden">
        <form className="border-b border-line-subtle p-3" method="get">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              name="search"
              defaultValue={search}
              placeholder="Search by customer or label…"
              aria-label="Search measurements"
              className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>
        </form>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          empty={{
            icon: <Ruler size={20} />,
            title: "No measurements found",
          }}
        />
      </Card>
    </PageShell>
  );
}
