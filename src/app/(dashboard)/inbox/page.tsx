import { Suspense } from "react";

import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import InboxClient from "@/components/dashboard/inbox/InboxClient";

export const metadata = { title: "Inbox" };
export const dynamic = "force-dynamic";

export default function InboxPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Inbox" }]} />

      <PageHeader
        title="Inbox"
        description="Every conversation from the storefront chat widget, in one place."
      />

      <Suspense fallback={null}>
        <InboxClient />
      </Suspense>
    </PageShell>
  );
}
