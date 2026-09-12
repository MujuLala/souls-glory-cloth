import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Layers3,
  Package,
  Pencil,
  Trash2,
  Sparkles,
} from "lucide-react";

import type { ReactNode } from "react";

import Breadcrumbs from "./Breadcrumbs";
import { collections, products } from "./data";

export default function Collections() {
  const activeCollections = collections.filter(
    (collection) => collection.status === "Active"
  );

  const totalProducts = collections.reduce(
    (total, collection) => total + collection.productIds.length,
    0
  );

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full pl-8 pr-8 md:w-[100%]">
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: "Products",
                href: "/products",
              },
              {
                label: "Collections",
              },
            ]}
          />

          {/* Header */}
          <section className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <Link
                href="/products"
                aria-label="Back to products"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={16} />
              </Link>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Collections
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Create and manage curated groups of products.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] sm:w-auto"
            >
              <Plus size={17} />
              Add Collection
            </button>
          </section>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              icon={<Layers3 size={18} />}
              label="Total Collections"
              value={collections.length}
            />

            <StatCard
              icon={<Sparkles size={18} />}
              label="Active Collections"
              value={activeCollections.length}
            />

            <StatCard
              icon={<Package size={18} />}
              label="Products in Collections"
              value={totalProducts}
            />
          </div>

          {/* Collection Card */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
            {/* Toolbar */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold">All Collections</h2>

                <p className="mt-1 text-xs text-neutral-600">
                  Manage your product collections.
                </p>
              </div>

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                />

                <input
                  type="text"
                  placeholder="Search collections..."
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {collections.map((collection) => {
                const collectionProducts = products.filter((product) =>
                  collection.productIds.includes(product.id)
                );

                return (
                  <div
                    key={collection.id}
                    className="rounded-xl border border-white/[0.07] bg-black/20 p-4 transition hover:border-white/[0.12]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">
                          <Layers3 size={18} />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {collection.name}
                          </h3>

                          <p className="mt-1 text-[11px] text-neutral-600">
                            /{collection.slug}
                          </p>
                        </div>
                      </div>

                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                          collection.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-yellow-500/10 text-yellow-400",
                        ].join(" ")}
                      >
                        {collection.status}
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-neutral-500">
                      {collection.description}
                    </p>

                    {/* Product Preview */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {collectionProducts.slice(0, 3).map((product) => (
                        <span
                          key={product.id}
                          className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-neutral-600"
                        >
                          {product.name}
                        </span>
                      ))}

                      {collectionProducts.length > 3 && (
                        <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-neutral-600">
                          +{collectionProducts.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Package size={14} />
                        {collection.productIds.length} products
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={`Edit ${collection.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Delete ${collection.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-[#ff1638]/10 hover:text-[#ff1638]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff1638]/10 text-[#ff1638]">
          {icon}
        </div>

        <div>
          <p className="text-[11px] text-neutral-600">{label}</p>

          <p className="mt-1 text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}