import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";

import type { ReactNode } from "react";

import Breadcrumbs from "./Breadcrumbs";
import { attributes } from "./data";

export default function Attributes() {
  const selectAttributes = attributes.filter(
    (attribute) => attribute.type === "Select"
  );

  const totalValues = attributes.reduce(
    (total, attribute) => total + attribute.values.length,
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
                label: "Attributes",
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
                  Attributes
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Manage product options such as size, color and fabric.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] sm:w-auto"
            >
              <Plus size={17} />
              Add Attribute
            </button>
          </section>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <StatCard
              icon={<SlidersHorizontal size={18} />}
              label="Total Attributes"
              value={attributes.length}
            />

            <StatCard
              icon={<SlidersHorizontal size={18} />}
              label="Attribute Values"
              value={totalValues}
            />

            <StatCard
              icon={<SlidersHorizontal size={18} />}
              label="Select Attributes"
              value={selectAttributes.length}
            />

          </div>

          {/* Main */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Product Attributes
                </h2>

                <p className="mt-1 text-xs text-neutral-600">
                  Configure product attributes and their values.
                </p>
              </div>

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                />

                <input
                  type="text"
                  placeholder="Search attributes..."
                  className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
                />
              </div>

            </div>

            {/* Attributes */}
            <div className="divide-y divide-white/[0.06]">

              {attributes.map((attribute) => (
                <div
                  key={attribute.id}
                  className="p-4 sm:p-5"
                >

                  {/* Attribute Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">
                        <SlidersHorizontal size={17} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-semibold">
                            {attribute.name}
                          </h3>

                          <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[9px] uppercase tracking-wider text-neutral-500">
                            {attribute.type}
                          </span>

                        </div>

                        <p className="mt-1 text-[11px] text-neutral-600">
                          /{attribute.slug} ·{" "}
                          {attribute.values.length} values
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">

                      <button
                        type="button"
                        aria-label={`Edit ${attribute.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${attribute.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-[#ff1638]/10 hover:text-[#ff1638]"
                      >
                        <Trash2 size={14} />
                      </button>

                      <button
                        type="button"
                        aria-label={`Expand ${attribute.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        <ChevronDown size={15} />
                      </button>

                    </div>

                  </div>

                  {/* Values */}
                  <div className="mt-4 flex flex-wrap gap-2 pl-0 sm:pl-[52px]">

                    {attribute.values.map((value) => (
                      <span
                        key={value}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-xs text-neutral-400"
                      >
                        {attribute.type === "Color" && (
                          <span className="h-2.5 w-2.5 rounded-full border border-white/20 bg-white/40" />
                        )}

                        {value}
                      </span>
                    ))}

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#ff1638]/30 px-3 py-2 text-xs font-medium text-[#ff1638] transition hover:bg-[#ff1638]/5"
                    >
                      <Plus size={13} />
                      Add Value
                    </button>

                  </div>

                </div>
              ))}

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