import { Users } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import TaxonomyManager from "@/components/dashboard/catalog/TaxonomyManager";
import { deleteCustomerGroup, saveCustomerGroup } from "@/actions/account";
import { prisma } from "@/lib/prisma";
import { StatGrid } from "@/components/ui/stat";

export const metadata = { title: "Customer groups" };

export default async function CustomerGroupsPage() {
  const groups = await prisma.customerGroup.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      discountPercent: true,
      _count: { select: { customers: true } },
    },
  });

  const rows = groups.map((group) => ({
    id: group.id,
    name: group.name,
    slug: group.slug,
    description: group.discountPercent
      ? `${group.description ?? ""}${group.description ? " · " : ""}${Number(
          group.discountPercent,
        )}% standing discount`
      : group.description,
    productCount: group._count.customers,
  }));

  const ungrouped = await prisma.customer.count({ where: { groupId: null } });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: "Groups" },
        ]}
      />

      <PageHeader
        title="Customer groups"
        description="Bundle customers who get the same treatment — wholesale buyers, staff families, loyalty tiers."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Groups", value: rows.length, icon: <Users size={15} /> },
          {
            label: "Grouped customers",
            value: rows.reduce((sum, row) => sum + row.productCount, 0),
          },
          { label: "Ungrouped", value: ungrouped },
          {
            label: "Empty groups",
            value: rows.filter((row) => row.productCount === 0).length,
          },
        ]}
      />

      <TaxonomyManager
        rows={rows}
        singular="Group"
        plural="Groups"
        emptyHint="Create a group to apply the same discount or terms to a set of customers."
        countLabel="Customers"
        withStatus={false}
        onSave={saveCustomerGroup}
        onDelete={deleteCustomerGroup}
      />
    </PageShell>
  );
}
