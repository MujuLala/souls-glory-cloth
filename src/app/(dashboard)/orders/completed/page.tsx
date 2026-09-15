import OrderQueuePage from "@/components/dashboard/orders/OrderQueuePage";

export const metadata = { title: "Completed orders" };

export default async function CompletedOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  return (
    <OrderQueuePage
      title="Completed"
      description="Delivered and closed. Kept for reordering, reviews and reporting."
      statuses={["Delivered", "Completed"]}
      search={params.search}
      page={params.page}
    />
  );
}
