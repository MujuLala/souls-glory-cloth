import { Megaphone } from "lucide-react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import CampaignsClient from "@/components/dashboard/marketing/CampaignsClient";
import { prisma } from "@/lib/prisma";
import { formatMoney, toNumber } from "@/lib/format";

export const metadata = { title: "Promotions" };

export default async function PromotionsPage() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    channel: campaign.channel,
    status: campaign.status,
    audience: campaign.audience,
    sent: campaign.sent,
    opened: campaign.opened,
    clicked: campaign.clicked,
    revenue: toNumber(campaign.revenue),
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketing", href: "/marketing" },
          { label: "Promotions" },
        ]}
      />

      <PageHeader
        title="Promotions"
        description="Planned pushes across email, SMS, WhatsApp and social."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "Campaigns", value: rows.length, icon: <Megaphone size={15} /> },
          { label: "Active", value: rows.filter((row) => row.status === "Active").length },
          { label: "Total sent", value: rows.reduce((sum, row) => sum + row.sent, 0) },
          {
            label: "Attributed revenue",
            value: formatMoney(rows.reduce((sum, row) => sum + row.revenue, 0)),
          },
        ]}
      />

      <CampaignsClient campaigns={rows} />
    </PageShell>
  );
}
