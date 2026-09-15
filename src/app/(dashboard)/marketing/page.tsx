import Link from "next/link";
import { ArrowRight, Megaphone, Percent, Ticket, Zap } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { prisma } from "@/lib/prisma";
import { formatMoney, toNumber } from "@/lib/format";

export const metadata = { title: "Marketing" };

export default async function MarketingPage() {
  const [coupons, campaigns] = await Promise.all([
    prisma.coupon.findMany(),
    prisma.campaign.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const activeCoupons = coupons.filter((coupon) => coupon.status === "Active");
  const totalRedemptions = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0);
  const attributedRevenue = campaigns.reduce(
    (sum, campaign) => sum + toNumber(campaign.revenue),
    0,
  );

  const sections = [
    {
      title: "Coupons",
      description: `${activeCoupons.length} active of ${coupons.length} total codes.`,
      icon: <Ticket size={17} />,
      href: "/marketing/coupons",
    },
    {
      title: "Discounts",
      description: "Price cuts currently live on the storefront.",
      icon: <Percent size={17} />,
      href: "/marketing/discounts",
    },
    {
      title: "Promotions",
      description: `${campaigns.length} campaign${campaigns.length === 1 ? "" : "s"} planned or sent.`,
      icon: <Megaphone size={17} />,
      href: "/marketing/promotions",
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Marketing" }]}
      />

      <PageHeader
        title="Marketing"
        description="Coupons, discounts and campaigns that bring shoppers back."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Active coupons", value: activeCoupons.length, icon: <Ticket size={15} /> },
          { label: "Total redemptions", value: totalRedemptions },
          { label: "Campaigns", value: campaigns.length, icon: <Zap size={15} /> },
          { label: "Attributed revenue", value: formatMoney(attributedRevenue) },
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group rounded-2xl border border-line bg-card p-4 shadow-card transition-colors hover:border-primary/40"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              {section.icon}
            </span>

            <p className="mt-3 text-[13px] font-semibold text-ink">
              {section.title}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-faint">
              {section.description}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
              Open
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {campaigns.length > 0 && (
        <Card className="mt-4">
          <div className="border-b border-line-subtle p-4">
            <h2 className="text-sm font-semibold text-ink">Recent campaigns</h2>
          </div>

          <ul className="divide-y divide-line-subtle">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-ink">{campaign.name}</p>
                  <p className="mt-0.5 text-[11px] text-faint">{campaign.channel}</p>
                </div>

                <span className="shrink-0 text-[12px] text-muted">{campaign.status}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </PageShell>
  );
}
