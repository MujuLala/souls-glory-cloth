import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";

import DashboardShellProvider from "@/components/dashboard/shell/shell-context";
import Sidebar from "@/components/dashboard/shell/Sidebar";
import Topbar from "@/components/dashboard/shell/Topbar";

/* Auth + live counters make every CMS page request-time. */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();

  const inboxCount = await prisma.conversation
    .count({
      where: {
        unreadForAdmin: { gt: 0 },
        status: { in: ["Open", "Pending"] },
      },
    })
    .catch(() => 0);

  const displayName = user.name ?? user.email.split("@")[0];

  return (
    <DashboardShellProvider>
      <div className="min-h-screen bg-bg text-ink">
        <Sidebar
          user={{ name: displayName, role: user.role, email: user.email }}
          inboxCount={inboxCount}
        />

        {/* The rail is fixed, so the content column is offset
            by its width from `lg` up and full width below. */}
        <div className="flex min-h-screen flex-col lg:ml-[var(--sidebar-width)]">
          <Topbar
            user={{ id: user.id, name: displayName, role: user.role }}
            inboxCount={inboxCount}
          />

          <main className="flex-1">{children}</main>

          <footer className="mx-auto flex w-full max-w-[92vw] flex-col gap-1 border-t border-line-subtle py-4 text-[10px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Soul&apos;s Glory Cloth — all
              rights reserved.
            </span>

            <span>Bespoke tailoring &amp; retail platform</span>
          </footer>
        </div>
      </div>
    </DashboardShellProvider>
  );
}
