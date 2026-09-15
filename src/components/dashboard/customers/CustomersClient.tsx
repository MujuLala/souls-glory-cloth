"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Ruler,
  Search,
  UserRound,
  Users,
} from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import DataTable, { type Column } from "@/components/ui/data-table";
import { formatDate, formatMoney, initials } from "@/lib/format";
import type { CustomerRow } from "@/data/customers";

const segments = [
  { key: "all", label: "All" },
  { key: "new", label: "New (30 days)" },
  { key: "with-measurements", label: "With measurements" },
  { key: "no-measurements", label: "No measurements" },
];

export default function CustomersClient({
  customers,
  page,
  pageCount,
  total,
}: {
  customers: CustomerRow[];
  page: number;
  pageCount: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [search, setSearch] = useState(params.get("search") ?? "");

  const activeSegment = params.get("segment") ?? "all";

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

  const columns: Column<CustomerRow>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
            {initials(row.fullName)}
          </span>

          <span className="min-w-0">
            <Link
              href={`/customers/${row.id}`}
              className="block truncate font-medium text-ink hover:text-primary"
            >
              {row.fullName}
            </Link>

            <span className="mt-0.5 block truncate text-[11px] text-faint">
              {row.code} · {row.phone ?? row.email ?? "no contact"}
            </span>
          </span>
        </div>
      ),
    },
    {
      key: "city",
      header: "City",
      render: (row) => <span className="text-muted">{row.city ?? "—"}</span>,
    },
    {
      key: "people",
      header: "People",
      align: "center",
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-muted">
          <Users size={12} />
          {row.memberCount}
        </span>
      ),
    },
    {
      key: "measurements",
      header: "Measurements",
      align: "center",
      render: (row) => (
        <Badge tone={row.measurementCount > 0 ? "success" : "neutral"}>
          <Ruler size={11} />
          {row.measurementCount}
        </Badge>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      align: "right",
      render: (row) => (
        <span className="text-muted">
          {row.totalOrders}
          {row.lastOrderAt && (
            <span className="ml-1.5 text-[11px] text-faint">
              {formatDate(row.lastOrderAt)}
            </span>
          )}
        </span>
      ),
    },
    {
      key: "spent",
      header: "Spent",
      align: "right",
      render: (row) => (
        <span className="font-semibold text-ink">
          {formatMoney(row.totalSpent)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line-subtle p-3">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {segments.map((segment) => (
            <button
              key={segment.key}
              type="button"
              onClick={() =>
                setParam({
                  segment: segment.key === "all" ? null : segment.key,
                })
              }
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors",
                activeSegment === segment.key
                  ? "bg-primary text-[var(--primary-contrast)]"
                  : "bg-surface text-muted hover:text-ink",
              )}
            >
              {segment.label}
            </button>
          ))}
        </div>

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
            placeholder="Search by name, phone, email or code, then press Enter"
            aria-label="Search customers"
            className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={customers}
        rowKey={(row) => row.id}
        empty={{
          icon: <UserRound size={20} />,
          title: "No customers found",
          description:
            "Customers appear here after their first order, or add one manually for walk-ins.",
          action: (
            <Button href="/customers/new" size="sm">
              Add customer
            </Button>
          ),
        }}
        renderCard={(row) => (
          <Link href={`/customers/${row.id}`} className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-[12px] font-bold text-primary">
              {initials(row.fullName)}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-ink">
                {row.fullName}
              </span>

              <span className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-faint">
                <Phone size={10} />
                {row.phone ?? row.email ?? "no contact"}
              </span>

              <span className="mt-2 flex flex-wrap items-center gap-1.5">
                <StatusBadge status={row.status} />

                <Badge tone="neutral">
                  <Users size={10} />
                  {row.memberCount}
                </Badge>

                <Badge tone={row.measurementCount > 0 ? "success" : "neutral"}>
                  <Ruler size={10} />
                  {row.measurementCount}
                </Badge>
              </span>
            </span>

            <span className="shrink-0 text-right">
              <span className="block text-[13px] font-bold text-ink">
                {formatMoney(row.totalSpent)}
              </span>

              <span className="mt-0.5 block text-[11px] text-faint">
                {row.totalOrders} order{row.totalOrders === 1 ? "" : "s"}
              </span>
            </span>
          </Link>
        )}
      />

      {total > 0 && (
        <div className="flex flex-col gap-3 border-t border-line-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] text-faint">
            Page {page} of {pageCount} · {total} customer
            {total === 1 ? "" : "s"}
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
