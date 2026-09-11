"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BarChart3,
  Boxes,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Users,
  X,
  Zap,
} from "lucide-react";

const productLinks = [
  {
    label: "All Products",
    href: "/products",
  },
  {
    label: "Add New Product",
    href: "/products/new",
  },
  {
    label: "Categories",
    href: "/products/categories",
  },
  {
    label: "Collections",
    href: "/products/collections",
  },
  {
    label: "Tags",
    href: "/products/tags",
  },
  {
    label: "Attributes",
    href: "/products/attributes",
  },
  {
    label: "Product Reviews",
    href: "/products/reviews",
  },
  {
    label: "Import / Export",
    href: "/products/import-export",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);

  /*
   * Automatically open Products menu
   * whenever we are inside /products/*
   */
  useEffect(() => {
    if (pathname.startsWith("/products")) {
      setProductsOpen(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#101010] text-white md:hidden"
        aria-label="Open navigation"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[82vw] max-w-[360px] flex-col border-r border-white/[0.08] bg-[#050505] px-3 py-5 transition-transform duration-300",
          "md:w-[260px] md:max-w-none md:translate-x-0 md:px-3 md:py-5",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-2 pb-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#ff1638] text-sm font-black text-[#ff1638]">
            S
          </div>

          <div className="leading-none">
            <strong className="block text-sm font-bold">
              Soul&apos;s Glory
            </strong>

            <span className="mt-1 block text-sm font-extrabold text-[#ff1638]">
              Cloth
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto text-neutral-500 md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          {/* PRODUCTS */}
          <div>
            <button
              type="button"
              className={[
                "flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition",
                pathname.startsWith("/products")
                  ? "bg-gradient-to-r from-[#ff1638] to-[#a80e27] text-white"
                  : "text-neutral-400 hover:bg-white/[0.04] hover:text-white",
              ].join(" ")}
              onClick={() => setProductsOpen((value) => !value)}
            >
              <Package size={18} />

              <span className="flex-1">Products</span>

              <ChevronDown
                size={16}
                className={[
                  "transition-transform",
                  productsOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            {/* Product submenu */}
            {productsOpen && (
              <div className="ml-5 mt-1 border-l border-[#6b1626] pl-3">
                {productLinks.map((link) => {
                  /*
                   * Exact active URL
                   *
                   * /products      → All Products
                   * /products/new  → Add New Product
                   * /products/categories → Categories
                   */
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      href={link.href}
                      key={link.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "relative block w-full rounded-md px-2 py-2 text-left text-xs transition",
                        isActive
                          ? "bg-[#ff1638]/10 text-white"
                          : "text-neutral-500 hover:text-white",
                      ].join(" ")}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <i className="absolute -left-[15px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#ff1638]" />
                      )}

                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <NavItem
            icon={<ShoppingBag size={18} />}
            label="Orders"
            expandable
          />

          <NavItem
            icon={<Users size={18} />}
            label="Customers"
            expandable
          />

          <NavItem
            icon={<Boxes size={18} />}
            label="Inventory"
            expandable
          />

          <NavItem
            icon={<Zap size={18} />}
            label="Marketing"
            expandable
          />

          <NavItem
            icon={<BarChart3 size={18} />}
            label="Reports"
            expandable
          />

          <NavItem
            icon={<SlidersHorizontal size={18} />}
            label="Custom Studio"
            expandable
          />

          <NavItem
            icon={<Settings size={18} />}
            label="Settings"
          />

          <NavItem
            icon={<CircleHelp size={18} />}
            label="Help & Support"
          />
        </nav>

        {/* User */}
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neutral-800 text-[10px] font-bold">
            MH
          </div>

          <div>
            <strong className="block text-[11px]">
              Mujahid Hussain
            </strong>

            <span className="text-[10px] text-neutral-600">
              Admin
            </span>
          </div>

          <span className="ml-auto text-neutral-600">
            •••
          </span>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  icon,
  label,
  expandable,
}: {
  icon: React.ReactNode;
  label: string;
  expandable?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-neutral-400 transition hover:bg-white/[0.04] hover:text-white"
    >
      {icon}

      <span className="flex-1">
        {label}
      </span>

      {expandable && (
        <ChevronDown
          size={15}
          className="text-neutral-600"
        />
      )}
    </button>
  );
}