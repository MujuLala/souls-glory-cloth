import Link from "next/link";
import { Percent } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import EmptyState from "@/components/ui/empty-state";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { prisma } from "@/lib/prisma";
import { formatMoney, toNumber } from "@/lib/format";

export const metadata = { title: "Discounts" };

/* =========================================================
   DISCOUNTS

   Reads the same coupon table as /marketing/coupons, filtered
   to percentage and fixed-amount price cuts — the "discounts"
   customers see reflected in cart totals. Coupons are created
   and edited from the Coupons page; this is the price-cut
   view of that same data.
========================================================= */

export default async function DiscountsPage() {
  const coupons = await prisma.coupon.findMany({
    where: { type: { in: ["Percentage", "Fixed"] } },
    orderBy: { createdAt: "desc" },
  });

  type DiscountRow = {
    id: number;
    code: string;
    type: string;
    value: number;
    status: string;
    usedCount: number;
  };

  const rows: DiscountRow[] = coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    type: coupon.type,
    value: toNumber(coupon.value),
    status: coupon.status,
    usedCount: coupon.usedCount,
  }));

  const columns: Column<DiscountRow>[] = [
    {
      key: "code",
      header: "Code",
      render: (row) => (
        <span className="font-mono text-[12px] font-semibold text-ink">
          {row.code}
        </span>
      ),
    },
    {
      key: "cut",
      header: "Price cut",
      render: (row) => (
        <span className="text-muted">
          {row.type === "Percentage"
            ? `${row.value}% off`
            : `${formatMoney(row.value)} off`}
        </span>
      ),
    },
    {
      key: "redemptions",
      header: "Redemptions",
      align: "right",
      render: (row) => <span className="text-muted">{row.usedCount}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge tone={row.status === "Active" ? "success" : "neutral"}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketing", href: "/marketing" },
          { label: "Discounts" },
        ]}
      />

      <PageHeader
        title="Discounts"
        description="Price cuts currently live on the storefront — the percentage and fixed-amount coupons from your Coupons list."
        actions={
          <Button href="/marketing/coupons" size="sm" variant="secondary">
            Manage coupons
          </Button>
        }
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Discount codes", value: rows.length, icon: <Percent size={15} /> },
          { label: "Active", value: rows.filter((row) => row.status === "Active").length },
          {
            label: "Total redemptions",
            value: rows.reduce((sum, row) => sum + row.usedCount, 0),
          },
        ]}
      />

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState
            icon={<Percent size={20} />}
            title="No discounts yet"
            description="Create a percentage or fixed-amount coupon and it will show up here."
            action={
              <Button href="/marketing/coupons" size="sm">
                Create a coupon
              </Button>
            }
          />
        ) : (
          <DataTable columns={columns} rows={rows} rowKey={(row) => row.id} />
        )}
      </Card>

      <p className="mt-4 text-[11px] text-faint">
        Need a discount that applies automatically, with no code? That&apos;s
        on the roadmap —{" "}
        <Link href="/help-support" className="text-primary">
          let us know
        </Link>{" "}
        if you need it sooner.
      </p>
    </PageShell>
  );
}
