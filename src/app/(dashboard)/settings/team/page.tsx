import { Users } from "lucide-react";

import { Card, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import TeamClient from "@/components/dashboard/settings/TeamClient";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const admin = await requireAdmin();

  const staff = await prisma.appUser.findMany({
    where: { role: { not: "Customer" } },
    orderBy: [{ role: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastSeenAt: true,
    },
  });

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Team" },
        ]}
      />

      <PageHeader
        title="Team"
        description="Everyone with access to this workspace, and what they can do. New staff get an account automatically the first time they sign in — set their role here."
      />

      <Card className="overflow-hidden">
        <CardHeader title="Staff accounts" icon={<Users size={16} />} />

        <TeamClient
          staff={staff.map((member) => ({
            ...member,
            lastSeenAt: member.lastSeenAt?.toISOString() ?? null,
          }))}
          currentUserId={admin.id}
        />
      </Card>

      <p className="mt-4 text-[11px] leading-5 text-faint">
        Cashier and Tailor accounts can use the POS and see the sections
        relevant to their work; Manager and Admin see everything. Only Admin
        and Manager can change roles here.
      </p>
    </PageShell>
  );
}
