import { User } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import AccountSettingsForm from "@/components/dashboard/settings/AccountSettingsForm";
import { requireStaff } from "@/lib/session";

export const metadata = { title: "Your account" };

export default async function StaffAccountPage() {
  const staff = await requireStaff();

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Your account" },
        ]}
      />

      <PageHeader title="Your account" description="Your own name, contact details and role." />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader title="Details" icon={<User size={16} />} />

          <CardBody>
            <AccountSettingsForm name={staff.name ?? ""} phone="" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Access" />

          <CardBody className="space-y-3 text-[12px]">
            <div className="flex justify-between">
              <span className="text-faint">Email</span>
              <span className="text-ink">{staff.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-faint">Role</span>
              <span className="text-ink">{staff.role}</span>
            </div>

            <Button href="/sign-out" variant="secondary" size="sm" fullWidth>
              Sign out
            </Button>
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
