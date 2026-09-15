import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import NewCustomerForm from "@/components/dashboard/customers/NewCustomerForm";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Add customer" };

export default async function NewCustomerPage() {
  const groups = await prisma.customerGroup.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: "Add customer" },
        ]}
      />

      <PageHeader
        title="Add a customer"
        description="For walk-ins and phone orders. Online shoppers create their own record at checkout."
      />

      <NewCustomerForm groups={groups} />
    </PageShell>
  );
}
