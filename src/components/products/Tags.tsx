import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Tag as TagIcon,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import type { ReactNode } from "react";

import Breadcrumbs from "./Breadcrumbs";
import { tags, products } from "./data";

export default function Tags() {
  const taggedProducts = products.filter(
    (product) => product.tags.length > 0
  ).length;

  const totalTagAssignments = products.reduce(
    (total, product) => total + product.tags.length,
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
                label: "Tags",
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
                  Tags
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Organize and label products with tags.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] sm:w-auto"
            >
              <Plus size={17} />
              Add Tag
            </button>
          </section>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <StatCard
              icon={<TagIcon size={18} />}
              label="Total Tags"
              value={tags.length}
            />

            <StatCard
              icon={<Package size={18} />}
              label="Tagged Products"
              value={taggedProducts}
            />

            <StatCard
              icon={<TagIcon size={18} />}
              label="Tag Assignments"
              value={totalTagAssignments}
            />

          </div>

          {/* Main */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Product Tags
                </h2>

                <p className="mt-1 text-xs text-neutral-600">
                  Manage all product tags.
                </p>
              </div>

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                />

                <input
                  type="text"
                  placeholder="Search tags..."
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
                />
              </div>

            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

              {tags.map((tag) => {
                const productCount = products.filter(
                  (product) => product.tags.includes(tag.name)
                ).length;

                return (
                  <div
                    key={tag.id}
                    className="border-b border-white/[0.06] p-4 transition hover:bg-white/[0.02] sm:border-r"
                  >

                    {/* Tag Header */}
                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff1638]/10 text-[#ff1638]">
                          <TagIcon size={15} />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {tag.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-neutral-600">
                            /{tag.slug}
                          </p>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="flex gap-1">

                        <button
                          type="button"
                          aria-label={`Edit ${tag.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          <Pencil size={13} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Delete ${tag.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-[#ff1638]/10 hover:text-[#ff1638]"
                        >
                          <Trash2 size={13} />
                        </button>

                      </div>

                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-5 text-neutral-600">
                      {tag.description}
                    </p>

                    {/* Product Count */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-neutral-600">
                      <Package size={13} />
                      {productCount} products
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
          <p className="text-[11px] text-neutral-600">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}