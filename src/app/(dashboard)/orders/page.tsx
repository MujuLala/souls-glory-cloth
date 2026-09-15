import { Clock, Package, Ruler, Wallet } from "lucide-react";

import Button from "@/components/ui/button";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import OrdersClient from "@/components/dashboard/orders/OrdersClient";
import { getOrderStats, listOrders } from "@/data/orders";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Orders" };

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;

  const [{ orders, total, page, pageCount }, stats] = await Promise.all([
    listOrders({
      status: params.status,
      search: params.search,
      page: Number(params.page ?? 1),
    }),
    getOrderStats(),
  ]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Orders" }]}
      />

      <PageHeader
        title="Orders"
        description="Every sale in one queue — storefront, POS and phone orders, ready-made and tailored."
        actions={
          <Button href="/pos" size="sm">
            New sale in POS
          </Button>
        }
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Orders today",
            value: stats.todayCount,
            icon: <Package size={15} />,
            hint: formatMoney(stats.todayRevenue),
          },
          {
            label: "Awaiting action",
            value: stats.pending,
            icon: <Clock size={15} />,
            hint: `${stats.inTailoring} in tailoring`,
          },
          {
            label: "Unpaid balance",
            value: stats.unpaid,
            icon: <Wallet size={15} />,
            hint: "orders not fully paid",
          },
          {
            label: "Total revenue",
            value: formatMoney(stats.revenue, { compact: true }),
            icon: <Ruler size={15} />,
            hint: `${stats.completed} completed`,
          },
        ]}
      />

      <OrdersClient
        orders={orders}
        page={page}
        pageCount={pageCount}
        total={total}
      />
    </PageShell>
  );
}
