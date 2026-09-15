import OrderQueuePage from "@/components/dashboard/orders/OrderQueuePage";

export const metadata = { title: "Pending orders" };

export default async function PendingOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  return (
    <OrderQueuePage
      title="Pending orders"
      description="Placed but not yet confirmed. Call or message the customer, then move them forward."
      statuses={["Pending"]}
      search={params.search}
      page={params.page}
    />
  );
}
