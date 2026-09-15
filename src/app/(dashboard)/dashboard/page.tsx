import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Clock3,
  MessageSquare,
  Package,
  Ruler,
  ShoppingBag,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import { getDashboardOverview } from "@/data/dashboard";
import { formatDateTime, formatMoney } from "@/lib/format";
import { requireStaff } from "@/lib/session";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireStaff();
  const data = await getDashboardOverview();

  const displayName = (user.name ?? user.email.split("@")[0]).split(" ")[0];

  return (
    <PageShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Welcome back, {displayName}
        </h1>

        <p className="mt-2 text-[13px] text-muted">
          Here&apos;s what&apos;s happening across the atelier this month.
        </p>
      </div>

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Revenue this month",
            value: formatMoney(data.revenue, { compact: true }),
            delta: data.revenueChange,
            icon: <Wallet size={15} />,
          },
          {
            label: "Orders this month",
            value: data.orders,
            delta: data.ordersChange,
            icon: <ShoppingBag size={15} />,
          },
          {
            label: "New customers",
            value: data.newCustomers,
            delta: data.customersChange,
            icon: <Users size={15} />,
          },
          {
            label: "Products live",
            value: data.productsInStock,
            icon: <Package size={15} />,
            hint: `${data.lowStockCount} low stock`,
          },
        ]}
      />

      {/* ACTION ROW */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ActionTile
          href="/orders/pending"
          icon={<Clock3 size={16} />}
          label="Pending orders"
          value={data.pendingOrders}
        />

        <ActionTile
          href="/tailoring"
          icon={<Ruler size={16} />}
          label="In tailoring"
          value={data.inTailoring}
        />

        <ActionTile
          href="/inbox"
          icon={<MessageSquare size={16} />}
          label="Unread chats"
          value={data.unreadChats}
          tone={data.unreadChats > 0 ? "primary" : "neutral"}
        />

        <ActionTile
          href="/inventory/low-stock"
          icon={<Boxes size={16} />}
          label="Low stock"
          value={data.lowStockCount}
          tone={data.lowStockCount > 0 ? "warning" : "neutral"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* RECENT ORDERS */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Recent orders"
            icon={<ShoppingBag size={16} />}
            actions={
              <Button href="/orders" size="sm" variant="secondary">
                View all
              </Button>
            }
          />

          {data.recentOrders.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag size={20} />}
              title="No orders yet"
              description="Orders from the storefront and POS will appear here."
            />
          ) : (
            <ul className="divide-y divide-line-subtle">
              {data.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-surface"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">
                        {order.orderNumber}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-faint">
                        {order.customerName} · {formatDateTime(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-[13px] font-bold text-ink">
                        {formatMoney(order.total)}
                      </span>

                      <StatusBadge status={order.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* LOW STOCK */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Needs restocking"
            icon={<TrendingDown size={16} />}
            actions={
              <Button href="/inventory/low-stock" size="sm" variant="secondary">
                All
              </Button>
            }
          />

          {data.lowStockProducts.length === 0 ? (
            <EmptyState
              title="Stock looks healthy"
              description="Nothing is below its alert threshold right now."
            />
          ) : (
            <ul className="divide-y divide-line-subtle">
              {data.lowStockProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-surface"
                  >
                    <span className="min-w-0 truncate text-[12.5px] font-medium text-ink">
                      {product.name}
                    </span>

                    <span className="shrink-0 text-[12px] font-semibold text-warning">
                      {product.stock} left
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </PageShell>
  );
}

/* =========================================================
   ACTION TILE
========================================================= */

function ActionTile({
  href,
  icon,
  label,
  value,
  tone = "neutral",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  tone?: "neutral" | "primary" | "warning";
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary bg-primary/10"
      : tone === "warning"
        ? "text-warning bg-warning/10"
        : "text-muted bg-surface";

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-line bg-card p-3.5 shadow-card transition-colors hover:border-primary/40"
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${toneClass}`}>
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold text-ink">{value}</span>
        <span className="block truncate text-[10.5px] text-faint">{label}</span>
      </span>

      <ArrowRight
        size={14}
        className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
