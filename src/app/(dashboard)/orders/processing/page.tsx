import OrderQueuePage from "@/components/dashboard/orders/OrderQueuePage";

export const metadata = { title: "Orders in progress" };

export default async function ProcessingOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  return (
    <OrderQueuePage
      title="In progress"
      description="Confirmed, being stitched, or on their way to the customer."
      statuses={["Confirmed", "In Tailoring", "Ready for Pickup", "Shipped"]}
      search={params.search}
      page={params.page}
    />
  );
}
