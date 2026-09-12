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

/* =========================================================
   PRODUCTS
========================================================= */

const productLinks = [
  {
    label: "All Products",
    href: "/products",
  },
  {
    label: "Add New Product",
    href: "/products/add",
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

/* =========================================================
   ORDERS
========================================================= */

const orderLinks = [
  {
    label: "All Orders",
    href: "/orders",
  },
  {
    label: "Pending",
    href: "/orders/pending",
  },
  {
    label: "Processing",
    href: "/orders/processing",
  },
  {
    label: "Completed",
    href: "/orders/completed",
  },
  {
    label: "Cancelled",
    href: "/orders/cancelled",
  },
];

/* =========================================================
   CUSTOMERS
========================================================= */

const customerLinks = [
  {
    label: "All Customers",
    href: "/customers",
  },
  {
    label: "New Customers",
    href: "/customers/new",
  },
  {
    label: "Customer Groups",
    href: "/customers/groups",
  },
  {
    label: "Segments",
    href: "/customers/segments",
  },
];

/* =========================================================
   INVENTORY
========================================================= */

const inventoryLinks = [
  {
    label: "Stock Overview",
    href: "/inventory",
  },
  {
    label: "Low Stock",
    href: "/inventory/low-stock",
  },
  {
    label: "Out of Stock",
    href: "/inventory/out-of-stock",
  },
  {
    label: "Stock Adjustments",
    href: "/inventory/adjustments",
  },
];

/* =========================================================
   MARKETING
========================================================= */

const marketingLinks = [
  {
    label: "Campaigns",
    href: "/marketing",
  },
  {
    label: "Coupons",
    href: "/marketing/coupons",
  },
  {
    label: "Discounts",
    href: "/marketing/discounts",
  },
  {
    label: "Promotions",
    href: "/marketing/promotions",
  },
];

/* =========================================================
   REPORTS
========================================================= */

const reportLinks = [
  {
    label: "Overview",
    href: "/reports",
  },
  {
    label: "Sales",
    href: "/reports/sales",
  },
  {
    label: "Products",
    href: "/reports/products",
  },
  {
    label: "Customers",
    href: "/reports/customers",
  },
  {
    label: "Inventory",
    href: "/reports/inventory",
  },
];

/* =========================================================
   CUSTOM STUDIO
========================================================= */

const customStudioLinks = [
  {
    label: "Studio Overview",
    href: "/custom-studio",
  },
  {
    label: "Templates",
    href: "/custom-studio/templates",
  },
  {
    label: "Customization Options",
    href: "/custom-studio/options",
  },
  {
    label: "Measurements",
    href: "/custom-studio/measurements",
  },
  {
    label: "Saved Designs",
    href: "/custom-studio/designs",
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

export default function Sidebar() {
  const pathname = usePathname();

  /* Mobile sidebar */
  const [open, setOpen] = useState(false);

  /* Dropdown states */
  const [productsOpen, setProductsOpen] = useState(
    pathname.startsWith("/products")
  );

  const [ordersOpen, setOrdersOpen] = useState(
    pathname.startsWith("/orders")
  );

  const [customersOpen, setCustomersOpen] = useState(
    pathname.startsWith("/customers")
  );

  const [inventoryOpen, setInventoryOpen] = useState(
    pathname.startsWith("/inventory")
  );

  const [marketingOpen, setMarketingOpen] = useState(
    pathname.startsWith("/marketing")
  );

  const [reportsOpen, setReportsOpen] = useState(
    pathname.startsWith("/reports")
  );

  const [customStudioOpen, setCustomStudioOpen] = useState(
    pathname.startsWith("/custom-studio")
  );

  /*
   * Automatically open the dropdown
   * when visiting one of its child pages.
   */
  useEffect(() => {
    if (pathname.startsWith("/products")) {
      setProductsOpen(true);
    }

    if (pathname.startsWith("/orders")) {
      setOrdersOpen(true);
    }

    if (pathname.startsWith("/customers")) {
      setCustomersOpen(true);
    }

    if (pathname.startsWith("/inventory")) {
      setInventoryOpen(true);
    }

    if (pathname.startsWith("/marketing")) {
      setMarketingOpen(true);
    }

    if (pathname.startsWith("/reports")) {
      setReportsOpen(true);
    }

    if (pathname.startsWith("/custom-studio")) {
      setCustomStudioOpen(true);
    }
  }, [pathname]);

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#101010] text-white md:hidden"
        aria-label="Open navigation"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[82vw] max-w-[360px] flex-col border-r border-white/[0.08] bg-[#050505] px-3 py-5 transition-transform duration-300",
          "md:w-[260px] md:max-w-none md:translate-x-0 md:px-3 md:py-5",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* =================================================
            LOGO
        ================================================= */}

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

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 overflow-y-auto py-5">

          {/* DASHBOARD */}

          <NavLink
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <DropdownSection
            icon={<Package size={18} />}
            label="Products"
            pathname={pathname}
            basePath="/products"
            isOpen={productsOpen}
            setIsOpen={setProductsOpen}
          >
            <Submenu>
              {productLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              ORDERS
          ================================================= */}

          <DropdownSection
            icon={<ShoppingBag size={18} />}
            label="Orders"
            pathname={pathname}
            basePath="/orders"
            isOpen={ordersOpen}
            setIsOpen={setOrdersOpen}
          >
            <Submenu>
              {orderLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              CUSTOMERS
          ================================================= */}

          <DropdownSection
            icon={<Users size={18} />}
            label="Customers"
            pathname={pathname}
            basePath="/customers"
            isOpen={customersOpen}
            setIsOpen={setCustomersOpen}
          >
            <Submenu>
              {customerLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              INVENTORY
          ================================================= */}

          <DropdownSection
            icon={<Boxes size={18} />}
            label="Inventory"
            pathname={pathname}
            basePath="/inventory"
            isOpen={inventoryOpen}
            setIsOpen={setInventoryOpen}
          >
            <Submenu>
              {inventoryLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              MARKETING
          ================================================= */}

          <DropdownSection
            icon={<Zap size={18} />}
            label="Marketing"
            pathname={pathname}
            basePath="/marketing"
            isOpen={marketingOpen}
            setIsOpen={setMarketingOpen}
          >
            <Submenu>
              {marketingLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              REPORTS
          ================================================= */}

          <DropdownSection
            icon={<BarChart3 size={18} />}
            label="Reports"
            pathname={pathname}
            basePath="/reports"
            isOpen={reportsOpen}
            setIsOpen={setReportsOpen}
          >
            <Submenu>
              {reportLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              CUSTOM STUDIO
          ================================================= */}

          <DropdownSection
            icon={<SlidersHorizontal size={18} />}
            label="Custom Studio"
            pathname={pathname}
            basePath="/custom-studio"
            isOpen={customStudioOpen}
            setIsOpen={setCustomStudioOpen}
          >
            <Submenu>
              {customStudioLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <SubLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </Submenu>
          </DropdownSection>

          {/* =================================================
              SETTINGS
          ================================================= */}

          <NavLink
            href="/settings"
            icon={<Settings size={18} />}
            label="Settings"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />

          {/* =================================================
              HELP & SUPPORT
          ================================================= */}

          <NavLink
            href="/help-support"
            icon={<CircleHelp size={18} />}
            label="Help & Support"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
        </nav>

        {/* =================================================
            USER
        ================================================= */}

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

/* =========================================================
   DROPDOWN SECTION
========================================================= */

function DropdownSection({
  icon,
  label,
  pathname,
  basePath,
  isOpen,
  setIsOpen,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  pathname: string;
  basePath: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const isActive = pathname.startsWith(basePath);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={[
          "flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition",
          isActive
            ? "bg-white/[0.04] text-white"
            : "text-neutral-400 hover:bg-white/[0.04] hover:text-white",
        ].join(" ")}
      >
        {/* Main navigation icon */}
        <span
          className={
            isActive
              ? "text-neutral-300"
              : "text-neutral-500"
          }
        >
          {icon}
        </span>

        <span className="flex-1">
          {label}
        </span>

        <ChevronDown
          size={15}
          className={[
            "text-neutral-600 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen && children}
    </div>
  );
}

/* =========================================================
   SUBMENU
========================================================= */

function Submenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-5 mt-1 border-l border-[#6b1626] pl-3">
      {children}
    </div>
  );
}

/* =========================================================
   SUB LINK
   No icons here
========================================================= */

function SubLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "relative block w-full rounded-md px-2 py-2 text-left text-xs transition",
        isActive
          ? "bg-[#ff1638]/10 text-white"
          : "text-neutral-500 hover:bg-white/[0.025] hover:text-white",
      ].join(" ")}
    >
      {/* Active red dot */}
      {isActive && (
        <i className="absolute -left-[15px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#ff1638]" />
      )}

      {label}
    </Link>
  );
}

/* =========================================================
   NORMAL NAV LINK
========================================================= */

function NavLink({
  href,
  icon,
  label,
  pathname,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  onClick: () => void;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "mb-1 flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition",
        isActive
          ? "bg-gradient-to-r from-[#ff1638] to-[#a80e27] text-white"
          : "text-neutral-400 hover:bg-white/[0.04] hover:text-white",
      ].join(" ")}
    >
      {icon}

      <span className="flex-1">
        {label}
      </span>
    </Link>
  );
}