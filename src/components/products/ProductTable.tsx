 "use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { products } from "./data";
import type { ProductStatus } from "./types";

type Tab = "All Products" | ProductStatus;

const tabs: Array<{ name: Tab; count: number }> = [
  { name: "All Products", count: 128 },
  { name: "Active", count: 112 },
  { name: "Draft", count: 8 },
  { name: "Out of Stock", count: 6 },
  { name: "Low Stock", count: 10 },
];

export default function ProductTable() {
  const [activeTab, setActiveTab] = useState<Tab>("All Products");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const statusMatch = activeTab === "All Products" || product.status === activeTab;
      const text = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
      return statusMatch && text.includes(search.toLowerCase());
    });
  }, [activeTab, search]);

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.includes(p.id));

  function toggleAll() {
    setSelected(allSelected ? [] : filtered.map((p) => p.id));
  }

  function toggle(id: number) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <section className="w-full overflow-hidden rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#0d0d0d] to-[#080808]">
      <div className="flex w-full flex-col gap-3 border-b border-white/[0.07] p-3 xl:flex-row xl:items-center">
        <div className="flex w-full gap-1 overflow-x-auto xl:flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => setActiveTab(tab.name)}
              className={[
                "shrink-0 rounded-md px-3 py-2 text-[10px] font-medium transition",
                activeTab === tab.name
                  ? "bg-[#ff1638] text-white"
                  : "bg-[#111] text-neutral-500 hover:text-white",
              ].join(" ")}
            >
              {tab.name}
              <small className="ml-1.5 opacity-70">{tab.count}</small>
            </button>
          ))}
        </div>

        <div className="flex w-full gap-2 xl:w-auto">
          <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-white/10 bg-[#0b0b0b] px-2.5 xl:w-48">
            <Search size={14} className="shrink-0 text-neutral-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 bg-transparent text-[10px] text-neutral-300 outline-none placeholder:text-neutral-600"
              placeholder="Search products..."
            />
          </label>

          <button className="flex h-9 items-center gap-1.5 rounded-md border border-white/10 bg-[#0b0b0b] px-3 text-[10px] text-neutral-400">
            <Filter size={13} /> Filter
          </button>

          <button className="flex h-9 items-center gap-1.5 rounded-md border border-white/10 bg-[#0b0b0b] px-3 text-[10px] text-neutral-400">
            <ArrowDownUp size={13} /> Sort
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-2 border-b border-[#35131b] bg-[#15090c] px-3 py-2 text-[10px]">
          <strong className="mr-auto">{selected.length} selected</strong>
          <button className="rounded border border-white/10 bg-[#111] px-2 py-1 text-neutral-400">
            <Edit3 className="mr-1 inline" size={11} /> Bulk Edit
          </button>
          <button className="rounded border border-white/10 bg-[#111] px-2 py-1 text-neutral-400">
            <Upload className="mr-1 inline" size={11} /> Export
          </button>
          <button className="rounded border border-white/10 bg-[#111] px-2 py-1 text-neutral-400">
            <Trash2 className="mr-1 inline" size={11} /> Delete
          </button>
          <button onClick={() => setSelected([])} className="text-neutral-500">Clear</button>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-[#0d0d0d]">
              <th className="w-10 px-3 py-3 text-left">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-[#ff1638]" />
              </th>
              {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((heading) => (
                <th key={heading} className="px-3 py-3 text-left text-[10px] font-semibold text-neutral-600">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-t border-white/[0.06] transition hover:bg-white/[0.015]">
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggle(product.id)}
                    className="accent-[#ff1638]"
                  />
                </td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-md object-cover"
                    />
                    <div>
                      <strong className="block text-[11px] text-neutral-200">{product.name}</strong>
                      <span className="mt-1 block text-[9px] text-neutral-600">SKU: {product.sku}</span>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3 text-[10px] text-neutral-500">{product.category}</td>
                <td className="px-3 py-3 text-[10px] font-semibold text-neutral-200">{product.price}</td>
                <td className={`px-3 py-3 text-[10px] ${product.stock === 0 ? "text-[#ff1638]" : "text-neutral-500"}`}>
                  {product.stock}
                </td>
                <td className="px-3 py-3"><Status status={product.status} /></td>

                <td className="px-3 py-3">
                  <div className="flex gap-1.5">
                    {[Edit3, Eye, MoreHorizontal].map((Icon, index) => (
                      <button
                        key={index}
                        className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-[#0d0d0d] text-neutral-500 hover:text-white"
                        aria-label={index === 0 ? "Edit" : index === 1 ? "View" : "More"}
                      >
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-neutral-600">No products found.</div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-3 py-3 text-[9px] text-neutral-600">
        <span>Showing 1 to {filtered.length} of 128 products</span>
        <div className="flex items-center gap-1">
          <PageButton><ChevronLeft size={13} /></PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <span className="px-1">...</span>
          <PageButton>26</PageButton>
          <PageButton><ChevronRight size={13} /></PageButton>
        </div>
      </div>
    </section>
  );
}

function PageButton({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`grid h-7 min-w-7 place-items-center rounded border text-[9px] ${active ? "border-[#ff1638] bg-[#ff1638] text-white" : "border-white/10 bg-[#0c0c0c] text-neutral-500"}`}>
      {children}
    </button>
  );
}

function Status({ status }: { status: ProductStatus }) {
  const classes = {
    Active: "bg-[#082317] text-[#29dc7c]",
    Draft: "bg-[#202020] text-neutral-400",
    "Out of Stock": "bg-[#280c11] text-[#ff4a60]",
    "Low Stock": "bg-[#2b1d07] text-[#ffb01b]",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ${classes[status]}`}>
      {status}
    </span>
  );
}
