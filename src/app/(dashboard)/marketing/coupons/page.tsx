import { Ticket } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import CouponsClient from "@/components/dashboard/marketing/CouponsClient";
import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

export const metadata = { title: "Coupons" };

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  const rows = coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    description: coupon.description,
    type: coupon.type,
    value: toNumber(coupon.value),
    minOrderTotal: coupon.minOrderTotal ? toNumber(coupon.minOrderTotal) : null,
    usageLimit: coupon.usageLimit,
    usedCount: coupon.usedCount,
    status: coupon.status,
    endsAt: coupon.endsAt?.toISOString() ?? null,
  }));

  const now = new Date();
  const expiring = rows.filter(
    (row) => row.endsAt && new Date(row.endsAt) > now && new Date(row.endsAt).getTime() - now.getTime() < 7 * 86400000,
  ).length;

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketing", href: "/marketing" },
          { label: "Coupons" },
        ]}
      />

      <PageHeader
        title="Coupons"
        description="Discount codes shoppers enter at checkout."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Coupons", value: rows.length, icon: <Ticket size={15} /> },
          { label: "Active", value: rows.filter((row) => row.status === "Active").length },
          {
            label: "Total redemptions",
            value: rows.reduce((sum, row) => sum + row.usedCount, 0),
          },
          { label: "Expiring soon", value: expiring },
        ]}
      />

      <CouponsClient coupons={rows} />
    </PageShell>
  );
}
