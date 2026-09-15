import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import ReviewsClient from "@/components/dashboard/catalog/ReviewsClient";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Product reviews" };

export default async function ReviewsPage() {
  const reviews = await prisma.productReview.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { product: { select: { name: true } } },
  });

  const rows = reviews.map((review) => ({
    id: review.id,
    customerName: review.customerName,
    customerEmail: review.customerEmail,
    productName: review.product.name,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    status: review.status,
    createdAt: review.createdAt.toISOString(),
  }));

  const average =
    rows.length > 0
      ? rows.reduce((sum, row) => sum + row.rating, 0) / rows.length
      : 0;

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Reviews" },
        ]}
      />

      <PageHeader
        title="Product reviews"
        description="Approve what appears on the storefront. Rejected reviews stay on record but stay hidden."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Total reviews", value: rows.length },
          {
            label: "Awaiting moderation",
            value: rows.filter((row) => row.status === "Pending").length,
          },
          {
            label: "Published",
            value: rows.filter((row) => row.status === "Approved").length,
          },
          {
            label: "Average rating",
            value: rows.length ? `${average.toFixed(1)} / 5` : "—",
          },
        ]}
      />

      <ReviewsClient rows={rows} />
    </PageShell>
  );
}
