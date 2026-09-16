import Link from "next/link";
import { UserPlus, Users } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { BarList } from "@/components/ui/bar-chart";
import { getCustomersReport } from "@/data/reports";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Customers report" };

export default async function CustomersReportPage() {
  const report = await getCustomersReport();

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Customers" },
        ]}
      />

      <PageHeader
        title="Customers report"
        description="Who's buying, how often, and from where."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Total customers", value: report.total, icon: <Users size={15} /> },
          { label: "New this month", value: report.newThisMonth, icon: <UserPlus size={15} /> },
          {
            label: "Repeat rate",
            value: `${report.repeatRate.toFixed(1)}%`,
            hint: `${report.repeat} repeat buyers`,
          },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Top customers by spend" />
          <CardBody>
            {report.topSpenders.length === 0 ? (
              <p className="text-[12px] text-faint">No orders yet.</p>
            ) : (
              <ul className="space-y-2.5">
                {report.topSpenders.map((customer) => (
                  <li key={customer.id} className="flex items-center justify-between gap-2">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="truncate text-[12.5px] text-ink hover:text-primary"
                    >
                      {customer.name}
                    </Link>

                    <span className="shrink-0 text-[12px] text-muted">
                      {formatMoney(customer.spent)} · {customer.orders} orders
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Customers by city" />
          <CardBody>
            <BarList
              data={report.byCity.map((row) => ({ label: row.city, value: row.count }))}
            />
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
