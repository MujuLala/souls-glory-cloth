import { Store } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import StoreProfileForm from "@/components/dashboard/settings/StoreProfileForm";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import type { StoreProfile } from "@/actions/settings";

export const metadata = { title: "Store profile" };

const defaultProfile: StoreProfile = {
  name: "Soul's Glory Cloth",
  email: "support@soulsglorycloth.com",
  phone: "",
  address: "",
};

export default async function StoreProfilePage() {
  await requireAdmin();

  const setting = await prisma.storeSetting.findUnique({
    where: { key: "store.profile" },
  });

  const profile: StoreProfile = setting
    ? { ...defaultProfile, ...(setting.value as Partial<StoreProfile>) }
    : defaultProfile;

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Store profile" },
        ]}
      />

      <PageHeader
        title="Store profile"
        description="Your store's name and contact details."
      />

      <Card className="max-w-[720px]">
        <CardHeader title="Details" icon={<Store size={16} />} />

        <CardBody>
          <StoreProfileForm profile={profile} />
        </CardBody>
      </Card>
    </PageShell>
  );
}
