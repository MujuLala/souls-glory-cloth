import OrderQueuePage from "@/components/dashboard/orders/OrderQueuePage";

export const metadata = { title: "Cancelled orders" };

export default async function CancelledOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;

  return (
    <OrderQueuePage
      title="Cancelled"
      description="Cancelled or refunded. Stock for ready-made lines was not returned automatically — check inventory if needed."
      statuses={["Cancelled"]}
      search={params.search}
      page={params.page}
    />
  );
}
