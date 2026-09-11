import { Plus } from "lucide-react";
import Link from "next/link";

import Stats from "./Stats";
import ProductTable from "./ProductTable";
import FeatureCards from "./FeatureCards";
import Breadcrumbs from "./Breadcrumbs";
import CMSPageContainer from "./CMSPageContainer";

export default function ProductDashboard() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7] pl-8 pr-8">

      <CMSPageContainer>

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              label: "Products",
              href: "/products",
            },
            {
              label: "All Products",
            },
          ]}
        />

        {/* Page Header */}
        <section className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Product Management
            </h1>

            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
              Manage your products, collections and inventory with ease.
            </p>
          </div>

          <Link
            href="/products/new"
            className="flex w-fit items-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948]"
          >
            <Plus size={17} />
            Add Product
          </Link>

        </section>

        {/* Stats */}
        <Stats />

        {/* Product Table */}
        <div className="mt-4 w-full">
          <ProductTable />
        </div>

        {/* Feature Cards */}
        <div className="mt-4 w-full">
          <FeatureCards />
        </div>

      </CMSPageContainer>

      {/* Footer */}
      <footer className="flex w-full flex-col justify-between gap-2 border-t border-white/[0.06] px-8 py-5 text-[10px] text-neutral-700 sm:flex-row">
        <span>
          © 2025 Soul&apos;s Glory Cloth. All rights reserved.
        </span>

        <span>
          Privacy &nbsp;&nbsp; Terms &nbsp;&nbsp; Help
        </span>
      </footer>

    </div>
  );
}