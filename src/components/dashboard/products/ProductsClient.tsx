"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Pencil,
  Search,
  Star,
  Trash2,
} from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import DataTable, { type Column } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/modal";
import { Select } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/format";
import {
  deleteProducts,
  setProductStatus,
  toggleProductFeatured,
} from "@/actions/products";
import type { ProductRow } from "@/data/products";

type Counts = {
  all: number;
  active: number;
  draft: number;
  archived: number;
  outOfStock: number;
  lowStock: number;
};

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "price-high", label: "Price: high to low" },
  { value: "price-low", label: "Price: low to high" },
  { value: "stock", label: "Stock: low to high" },
];

export default function ProductsClient({
  products,
  counts,
  page,
  pageCount,
  total,
}: {
  products: ProductRow[];
  counts: Counts;
  page: number;
  pageCount: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [confirming, setConfirming] = useState(false);

  const activeTab = params.get("tab") ?? "all";

  /* =======================================================
     URL-DRIVEN FILTERS
     Keeping filters in the query string means the list is
     shareable and survives a refresh.
  ======================================================= */

  const setParam = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    /* Any filter change puts us back on page one. */
    if (!("page" in updates)) {
      next.delete("page");
    }

    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  const tabs = [
    { key: "all", label: "All", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "draft", label: "Draft", count: counts.draft },
    { key: "low", label: "Low stock", count: counts.lowStock },
    { key: "out", label: "Out of stock", count: counts.outOfStock },
    { key: "archived", label: "Archived", count: counts.archived },
  ];

  /* =======================================================
     BULK ACTIONS
  ======================================================= */

  const runBulk = (
    action: () => Promise<{ success: boolean; error?: string }>,
    successMessage: string,
  ) => {
    startTransition(async () => {
      const result = await action();

      if (result.success) {
        toast({ tone: "success", title: successMessage });
        setSelected([]);
        router.refresh();
      } else {
        toast({
          tone: "error",
          title: "That didn't work",
          description: result.error,
        });
      }
    });
  };

  const toggleRow = (id: number) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const allSelected =
    products.length > 0 && products.every((row) => selected.includes(row.id));

  /* =======================================================
     COLUMNS
  ======================================================= */

  const columns: Column<ProductRow>[] = [
    {
      key: "select",
      header: "",
      width: "w-10",
      hideOnMobile: true,
      render: (row) => (
        <input
          type="checkbox"
          checked={selected.includes(row.id)}
          onChange={() => toggleRow(row.id)}
          aria-label={`Select ${row.name}`}
          className="size-4 accent-[var(--primary)]"
        />
      ),
    },
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
              SKU {row.sku}
            </span>
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => (
        <span className="text-muted">{row.category ?? "—"}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      align: "right",
      render: (row) =>
        row.salePrice ? (
          <span className="whitespace-nowrap">
            <span className="font-semibold text-ink">
              {formatMoney(row.salePrice)}
            </span>

            <s className="ml-1.5 text-[11px] text-faint">
              {formatMoney(row.price)}
            </s>
          </span>
        ) : (
          <span className="font-semibold text-ink">
            {formatMoney(row.price)}
          </span>
        ),
    },
    {
      key: "stock",
      header: "Stock",
      align: "right",
      render: (row) => (
        <span
          className={cn(
            "font-semibold",
            row.stockStatus === "Out of Stock"
              ? "text-danger"
              : row.stockStatus === "Low Stock"
                ? "text-warning"
                : "text-ink",
          )}
        >
          {row.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusBadge status={row.status} />

          {row.stockStatus !== "In Stock" && (
            <StatusBadge status={row.stockStatus} />
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "w-[120px]",
      hideOnMobile: true,
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <IconButton
            label={row.featured ? "Remove from featured" : "Mark as featured"}
            onClick={() =>
              runBulk(
                () => toggleProductFeatured(row.id, !row.featured),
                row.featured ? "Removed from featured" : "Marked as featured",
              )
            }
            className={row.featured ? "text-warning" : undefined}
          >
            <Star size={14} fill={row.featured ? "currentColor" : "none"} />
          </IconButton>

          <Link
            href={`/products/${row.id}`}
            aria-label={`Edit ${row.name}`}
            title="Edit"
            className="grid size-8 place-items-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink"
          >
            <Pencil size={14} />
          </Link>

          <IconButton
            label={`Delete ${row.name}`}
            tone="danger"
            onClick={() => {
              setSelected([row.id]);
              setConfirming(true);
            }}
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className="overflow-hidden">
        {/* ===============================================
            TOOLBAR
        =============================================== */}

        <div className="flex flex-col gap-3 border-b border-line-subtle p-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  setParam({ tab: tab.key === "all" ? null : tab.key })
                }
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors",
                  activeTab === tab.key
                    ? "bg-primary text-[var(--primary-contrast)]"
                    : "bg-surface text-muted hover:text-ink",
                )}
              >
                {tab.label}
                <span className="ml-1.5 opacity-70">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative min-w-0 flex-1">
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
                placeholder="Search by name or SKU, then press Enter"
                aria-label="Search products"
                className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
              />
            </div>

            <Select
              value={params.get("sort") ?? "newest"}
              onChange={(value) =>
                setParam({ sort: value === "newest" ? null : value })
              }
              className="h-10 sm:w-[190px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* ===============================================
            BULK BAR
        =============================================== */}

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line-subtle bg-primary/8 px-3 py-2.5">
            <strong className="mr-auto text-[11px] text-ink">
              {selected.length} selected
            </strong>

            <Button
              size="sm"
              variant="secondary"
              disabled={pending}
              onClick={() =>
                runBulk(
                  () => setProductStatus(selected, "Active"),
                  "Products published",
                )
              }
            >
              Publish
            </Button>

            <Button
              size="sm"
              variant="secondary"
              disabled={pending}
              onClick={() =>
                runBulk(
                  () => setProductStatus(selected, "Draft"),
                  "Moved to draft",
                )
              }
            >
              Draft
            </Button>

            <Button
              size="sm"
              variant="secondary"
              disabled={pending}
              onClick={() =>
                runBulk(
                  () => setProductStatus(selected, "Archived"),
                  "Products archived",
                )
              }
            >
              Archive
            </Button>

            <Button
              size="sm"
              variant="danger"
              disabled={pending}
              onClick={() => setConfirming(true)}
            >
              Delete
            </Button>

            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-[11px] text-faint hover:text-ink"
            >
              Clear
            </button>
          </div>
        )}

        {/* SELECT ALL (desktop) */}
        {products.length > 0 && (
          <div className="hidden items-center gap-2 border-b border-line-subtle px-4 py-2 md:flex">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() =>
                setSelected(allSelected ? [] : products.map((row) => row.id))
              }
              aria-label="Select all products on this page"
              className="size-4 accent-[var(--primary)]"
            />

            <span className="text-[11px] text-faint">
              Select all on this page
            </span>
          </div>
        )}

        {/* ===============================================
            TABLE
        =============================================== */}

        <DataTable
          columns={columns}
          rows={products}
          rowKey={(row) => row.id}
          empty={{
            icon: <Package size={20} />,
            title: "No products found",
            description:
              "Try a different filter, or add your first product to the catalogue.",
            action: (
              <Button href="/products/add" size="sm">
                Add product
              </Button>
            ),
          }}
          renderCard={(row) => (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selected.includes(row.id)}
                onChange={() => toggleRow(row.id)}
                aria-label={`Select ${row.name}`}
                className="mt-1 size-4 shrink-0 accent-[var(--primary)]"
              />

              <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                {row.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={row.image}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <Package size={16} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${row.id}`}
                  className="block truncate text-[13px] font-semibold text-ink"
                >
                  {row.name}
                </Link>

                <p className="mt-0.5 truncate text-[11px] text-faint">
                  {row.category ?? "Uncategorised"} · SKU {row.sku}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <StatusBadge status={row.status} />

                  {row.stockStatus !== "In Stock" ? (
                    <StatusBadge status={row.stockStatus} />
                  ) : (
                    <Badge tone="neutral">{row.stock} in stock</Badge>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[13px] font-bold text-ink">
                  {formatMoney(row.salePrice ?? row.price)}
                </p>

                <Link
                  href={`/products/${row.id}`}
                  className="mt-1 inline-block text-[11px] text-primary"
                >
                  Edit
                </Link>
              </div>
            </div>
          )}
        />

        {/* ===============================================
            PAGINATION
        =============================================== */}

        {total > 0 && (
          <div className="flex flex-col gap-3 border-t border-line-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] text-faint">
              Page {page} of {pageCount} · {total} product
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

      <ConfirmDialog
        open={confirming}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          runBulk(
            () => deleteProducts(selected),
            selected.length === 1 ? "Product deleted" : "Products deleted",
          );
        }}
        loading={pending}
        title={
          selected.length === 1 ? "Delete this product?" : "Delete products?"
        }
        message={`This permanently removes ${
          selected.length === 1 ? "the product" : `${selected.length} products`
        }, along with images, variants and tags. Orders that already reference ${
          selected.length === 1 ? "it" : "them"
        } keep their saved copy.`}
      />
    </>
  );
}
