import Link from "next/link";
import { AlertTriangle, Package, Ruler } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRelative } from "@/lib/format";

export const metadata = { title: "Tailoring board" };

/* =========================================================
   TAILORING BOARD

   A kanban-style read of orders that contain a made-to-
   measure line, grouped by status. Assigning a tailor and
   changing status happens on the order detail page.
========================================================= */

const columns = [
  { status: "Confirmed", label: "Queued" },
  { status: "In Tailoring", label: "Cutting & stitching" },
  { status: "Ready for Pickup", label: "Ready" },
];

export default async function TailoringBoardPage() {
  const orders = await prisma.order.findMany({
    where: {
      status: { in: columns.map((column) => column.status) },
      items: { some: { isCustom: true } },
    },
    orderBy: { dueDate: "asc" },
    include: {
      customer: { select: { fullName: true } },
      assignedTailor: { select: { name: true, email: true } },
      items: { where: { isCustom: true }, select: { name: true, memberId: true } },
    },
  });

  const overdue = orders.filter(
    (order) => order.dueDate && order.dueDate < new Date(),
  ).length;

  const unassigned = orders.filter((order) => !order.assignedTailorId).length;

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Tailoring" }]}
      />

      <PageHeader
        title="Tailoring board"
        description="Every made-to-measure order in progress, grouped by stage."
      />

      <StatGrid
        className="mb-4"
        stats={[
          { label: "In the pipeline", value: orders.length, icon: <Ruler size={15} /> },
          {
            label: "Overdue",
            value: overdue,
            icon: <AlertTriangle size={15} />,
          },
          { label: "Unassigned", value: unassigned },
        ]}
      />

      {orders.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Package size={20} />}
            title="Nothing in tailoring right now"
            description="Made-to-measure orders will show up here once confirmed."
          />
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => {
            const items = orders.filter((order) => order.status === column.status);

            return (
              <div key={column.status}>
                <div className="mb-2.5 flex items-center justify-between">
                  <h2 className="text-[13px] font-semibold text-ink">
                    {column.label}
                  </h2>

                  <Badge tone="neutral">{items.length}</Badge>
                </div>

                <div className="space-y-2.5">
                  {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-line-strong p-4 text-center text-[11px] text-faint">
                      Nothing here
                    </div>
                  ) : (
                    items.map((order) => {
                      const isOverdue = order.dueDate && order.dueDate < new Date();

                      return (
                        <Link
                          key={order.id}
                          href={`/orders/${order.id}`}
                          className="block rounded-xl border border-line bg-card p-3.5 shadow-card transition-colors hover:border-primary/40"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[12.5px] font-semibold text-ink">
                              {order.orderNumber}
                            </p>

                            {isOverdue && (
                              <Badge tone="danger">Overdue</Badge>
                            )}
                          </div>

                          <p className="mt-1 truncate text-[11.5px] text-muted">
                            {order.customer?.fullName ?? "Walk-in"}
                          </p>

                          <p className="mt-1.5 truncate text-[11px] text-faint">
                            {order.items.map((item) => item.name).join(", ")}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
                            <span className="text-faint">
                              {order.assignedTailor?.name ??
                                order.assignedTailor?.email ??
                                "Unassigned"}
                            </span>

                            {order.dueDate && (
                              <span
                                className={isOverdue ? "font-semibold text-danger" : "text-faint"}
                              >
                                Due {formatDate(order.dueDate)}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
