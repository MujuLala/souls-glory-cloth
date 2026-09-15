import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import OrdersClient from "./OrdersClient";
import { listOrders } from "@/data/orders";

/* =========================================================
   ORDER QUEUE

   Shared body for the status-specific order pages so they
   stay identical apart from which statuses they show.
========================================================= */

export default async function OrderQueuePage({
  title,
  description,
  statuses,
  search,
  page,
}: {
  title: string;
  description: string;
  statuses: string[];
  search?: string;
  page?: string;
}) {
  const { orders, total, pageCount, page: current } = await listOrders({
    statuses,
    search,
    page: Number(page ?? 1),
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Orders", href: "/orders" },
          { label: title },
        ]}
      />

      <PageHeader title={title} description={description} />

      <OrdersClient
        orders={orders}
        page={current}
        pageCount={pageCount}
        total={total}
        lockedStatus={statuses.join(", ")}
      />
    </PageShell>
  );
}
