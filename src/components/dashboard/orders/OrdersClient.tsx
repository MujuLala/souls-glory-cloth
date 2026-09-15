"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Ruler,
  Search,
  Store,
} from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import DataTable, { type Column } from "@/components/ui/data-table";
import { formatMoney, formatRelative } from "@/lib/format";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderRow } from "@/data/orders";

export default function OrdersClient({
  orders,
  page,
  pageCount,
  total,
  lockedStatus,
}: {
  orders: OrderRow[];
  page: number;
  pageCount: number;
  total: number;
  /* Set on the dedicated /orders/pending style pages. */
  lockedStatus?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [search, setSearch] = useState(params.get("search") ?? "");

  const activeStatus = lockedStatus ?? params.get("status") ?? "All";

  const setParam = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    if (!("page" in updates)) {
      next.delete("page");
    }

    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  };

  const columns: Column<OrderRow>[] = [
    {
      key: "order",
      header: "Order",
      render: (row) => (
        <div className="min-w-0">
          <Link
            href={`/orders/${row.id}`}
            className="block truncate font-medium text-ink hover:text-primary"
          >
            {row.orderNumber}
          </Link>

          <span className="mt-0.5 block truncate text-[11px] text-faint">
            {formatRelative(row.createdAt)} · {row.itemCount} item
            {row.itemCount === 1 ? "" : "s"}
          </span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) =>
        row.customerId ? (
          <Link
            href={`/customers/${row.customerId}`}
            className="text-muted hover:text-primary"
          >
            {row.customerName}
          </Link>
        ) : (
          <span className="text-muted">{row.customerName}</span>
        ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-1.5">
          {row.hasCustom && (
            <Badge tone="primary">
              <Ruler size={10} />
              Tailored
            </Badge>
          )}

          {row.channel === "POS" && (
            <Badge tone="neutral">
              <Store size={10} />
              POS
            </Badge>
          )}

          {!row.hasCustom && row.channel !== "POS" && (
            <span className="text-[11px] text-faint">Ready made</span>
          )}
        </div>
      ),
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (row) => (
        <div>
          <p className="font-semibold text-ink">{formatMoney(row.total)}</p>

          {row.amountPaid > 0 && row.amountPaid < row.total && (
            <p className="mt-0.5 text-[11px] text-warning">
              {formatMoney(row.amountPaid)} paid
            </p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusBadge status={row.status} />
          <StatusBadge status={row.paymentStatus} />
        </div>
      ),
    },
    {
      key: "due",
      header: "Due",
      render: (row) => (
        <span className="text-muted">
          {row.dueDate ? formatRelative(row.dueDate) : "—"}
        </span>
      ),
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line-subtle p-3">
        {!lockedStatus && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {["All", ...ORDER_STATUSES].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setParam({ status: status === "All" ? null : status })
                }
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors",
                  activeStatus === status
                    ? "bg-primary text-[var(--primary-contrast)]"
                    : "bg-surface text-muted hover:text-ink",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setParam({ search: search.trim() || null });
              }
            }}
            placeholder="Search order number, customer or phone, then press Enter"
            aria-label="Search orders"
            className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={orders}
        rowKey={(row) => row.id}
        empty={{
          icon: <Package size={20} />,
          title: "No orders here",
          description:
            "Orders from the storefront and the POS both land in this list.",
        }}
        renderCard={(row) => (
          <Link href={`/orders/${row.id}`} className="block">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {row.orderNumber}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-faint">
                  {row.customerName} · {formatRelative(row.createdAt)}
                </p>
              </div>

              <span className="shrink-0 text-[13px] font-bold text-ink">
                {formatMoney(row.total)}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <StatusBadge status={row.status} />
              <StatusBadge status={row.paymentStatus} />

              {row.hasCustom && (
                <Badge tone="primary">
                  <Ruler size={10} />
                  Tailored
                </Badge>
              )}
            </div>
          </Link>
        )}
      />

      {total > 0 && (
        <div className="flex flex-col gap-3 border-t border-line-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] text-faint">
            Page {page} of {pageCount} · {total} order{total === 1 ? "" : "s"}
          </span>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={page <= 1 || pending}
              onClick={() => setParam({ page: String(page - 1) })}
            >
              <ChevronLeft size={14} />
              Previous
            </Button>

            <Button
              size="sm"
              variant="secondary"
              disabled={page >= pageCount || pending}
              onClick={() => setParam({ page: String(page + 1) })}
            >
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
