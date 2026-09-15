"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, Package, Search, SlidersHorizontal } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { formatMoney } from "@/lib/format";
import StockAdjustModal from "./StockAdjustModal";
import type { StockRow } from "@/data/inventory";

export default function StockClient({
  stock,
  page,
  pageCount,
  total,
}: {
  stock: StockRow[];
  page: number;
  pageCount: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(params.get("search") ?? "");
  const [adjusting, setAdjusting] = useState<StockRow | null>(null);

  const setParam = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) next.delete(key);
      else next.set(key, value);
    }

    if (!("page" in updates)) next.delete("page");

    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  };

  const columns: Column<StockRow>[] = [
    {
      key: "product",
      header: "Product",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
            {row.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.image} alt="" className="size-full object-cover" />
            ) : (
              <Package size={15} />
            )}
          </span>

          <span className="min-w-0">
            <Link
              href={`/products/${row.id}`}
              className="block truncate font-medium text-ink hover:text-primary"
            >
              {row.name}
            </Link>

            <span className="mt-0.5 block truncate text-[11px] text-faint">
              SKU {row.sku} · {row.category ?? "Uncategorised"}
            </span>
          </span>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      align: "right",
      render: (row) => (
        <span className="font-semibold text-ink">{row.stock}</span>
      ),
    },
    {
      key: "threshold",
      header: "Alert at",
      align: "right",
      render: (row) => (
        <span className="text-muted">{row.lowStockThreshold}</span>
      ),
    },
    {
      key: "value",
      header: "Stock value",
      align: "right",
      render: (row) => (
        <span className="text-muted">{formatMoney(row.value)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "w-[110px]",
      hideOnMobile: true,
      render: (row) => (
        <Button size="sm" variant="secondary" onClick={() => setAdjusting(row)}>
          <SlidersHorizontal size={13} />
          Adjust
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card className="overflow-hidden">
        <div className="border-b border-line-subtle p-3">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") setParam({ search: search.trim() || null });
              }}
              placeholder="Search by name or SKU, then press Enter"
              aria-label="Search inventory"
              className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={stock}
          rowKey={(row) => row.id}
          empty={{
            icon: <Package size={20} />,
            title: "Nothing to show",
            description: "Products with inventory tracking on will appear here.",
          }}
          renderCard={(row) => (
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                {row.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.image} alt="" className="size-full object-cover" />
                ) : (
                  <Package size={16} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {row.name}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-faint">
                  SKU {row.sku} · {row.stock} in stock
                </p>

                <div className="mt-1.5">
                  <StatusBadge status={row.status} />
                </div>
              </div>

              <IconButton label="Adjust stock" onClick={() => setAdjusting(row)}>
                <SlidersHorizontal size={15} />
              </IconButton>
            </div>
          )}
        />

        {total > 0 && (
          <div className="flex flex-col gap-3 border-t border-line-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] text-faint">
              Page {page} of {pageCount} · {total} product{total === 1 ? "" : "s"}
            </span>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setParam({ page: String(page - 1) })}
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <Button
                size="sm"
                variant="secondary"
                disabled={page >= pageCount}
                onClick={() => setParam({ page: String(page + 1) })}
              >
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <StockAdjustModal
        open={Boolean(adjusting)}
        onClose={() => setAdjusting(null)}
        product={adjusting}
      />
    </>
  );
}
