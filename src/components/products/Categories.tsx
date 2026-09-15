import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  FolderTree,
  Package,
  Pencil,
  Trash2,
  CheckCircle2,
  CircleOff,
} from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";
import { categories, products } from "./data";

export default function Categories() {
  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  );

  const totalProducts = products.length;

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full md:w-[100%] pl-8 pr-8">
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: "Products",
                href: "/products",
              },
              {
                label: "Categories",
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
                  Categories
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Organize your products into categories.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] sm:w-auto"
            >
              <Plus size={17} />
              Add Category
            </button>
          </section>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<FolderTree size={18} />}
              label="Total Categories"
              value={categories.length}
            />

            <StatCard
              icon={<CheckCircle2 size={18} />}
              label="Active Categories"
              value={activeCategories.length}
            />

            <StatCard
              icon={<Package size={18} />}
              label="Products"
              value={totalProducts}
            />

            <StatCard
              icon={<CircleOff size={18} />}
              label="Empty Categories"
              value={0}
            />

          </div>

          {/* Main Card */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  All Categories
                </h2>

                <p className="mt-1 text-xs text-neutral-600">
                  Manage your product categories.
                </p>
              </div>

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                />

                <input
                  type="text"
                  placeholder="Search categories..."
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
                />
              </div>

            </div>

            {/* Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-neutral-600">
                    <th className="px-5 py-4 font-medium">
                      Category
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Parent
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Products
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => {

                    const categoryProducts = products.filter(
                      (product) =>
                        product.category === category.name ||
                        product.subcategory === category.name
                    ).length;

                    return (
                      <tr
                        key={category.id}
                        className="border-b border-white/[0.05] transition hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff1638]/10 text-[#ff1638]">
                              <FolderTree size={16} />
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                {category.name}
                              </p>

                              <p className="mt-0.5 text-[11px] text-neutral-600">
                                /{category.slug}
                              </p>
                            </div>

                          </div>
                        </td>

                        <td className="px-5 py-4 text-xs text-neutral-500">
                          {category.parent ?? "—"}
                        </td>

                        <td className="px-5 py-4 text-xs text-neutral-400">
                          {categoryProducts}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={category.status} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1">

                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-white/[0.05] hover:text-white"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-[#ff1638]/10 hover:text-[#ff1638]"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-white/[0.05] md:hidden">
              {categories.map((category) => {

                const categoryProducts = products.filter(
                  (product) =>
                    product.category === category.name ||
                    product.subcategory === category.name
                ).length;

                return (
                  <div
                    key={category.id}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff1638]/10 text-[#ff1638]">
                          <FolderTree size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {category.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-neutral-600">
                            /{category.slug}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 hover:text-white"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-neutral-600">
                        {categoryProducts} products
                      </span>

                      <StatusBadge status={category.status} />
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
  icon: React.ReactNode;
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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const isActive = status === "Active";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold",
        isActive
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-yellow-500/10 text-yellow-400",
      ].join(" ")}
    >
      {status}
    </span>
  );
}