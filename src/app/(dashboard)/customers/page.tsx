import { Plus, Ruler, UserPlus, Users, Wallet } from "lucide-react";

import Button from "@/components/ui/button";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import CustomersClient from "@/components/dashboard/customers/CustomersClient";
import { getCustomerStats, listCustomers } from "@/data/customers";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Customers" };

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; segment?: string; page?: string }>;
}) {
  const params = await searchParams;

  const [{ customers, total, page, pageCount }, stats] = await Promise.all([
    listCustomers({
      search: params.search,
      segment: params.segment,
      page: Number(params.page ?? 1),
    }),
    getCustomerStats(),
  ]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers" },
        ]}
      />

      <PageHeader
        title="Customers"
        description="Everyone you tailor for — their family profiles, saved measurements and order history in one place."
        actions={
          <>
            <Button href="/customers/groups" variant="secondary" size="sm">
              Groups
            </Button>

            <Button href="/customers/new" size="sm">
              <Plus size={15} />
              Add customer
            </Button>
          </>
        }
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Customers",
            value: stats.all,
            icon: <Users size={15} />,
          },
          {
            label: "New this month",
            value: stats.newThisMonth,
            icon: <UserPlus size={15} />,
          },
          {
            label: "With measurements",
            value: stats.withMeasurements,
            icon: <Ruler size={15} />,
            hint:
              stats.all > 0
                ? `${Math.round((stats.withMeasurements / stats.all) * 100)}% of all`
                : undefined,
          },
          {
            label: "Lifetime revenue",
            value: formatMoney(stats.revenue, { compact: true }),
            icon: <Wallet size={15} />,
          },
        ]}
      />

      <CustomersClient
        customers={customers}
        page={page}
        pageCount={pageCount}
        total={total}
      />
    </PageShell>
  );
}
