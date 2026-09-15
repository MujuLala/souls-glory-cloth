import {
  BarChart3,
  Boxes,
  CircleHelp,
  LayoutDashboard,
  MessageSquare,
  Package,
  Ruler,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Zap,
} from "lucide-react";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  /* Children render as a collapsible submenu. */
  children?: NavChild[];
  /* Which live counter, if any, shows as a badge. */
  badge?: "inbox";
  /* Highlighted as a primary workspace action. */
  accent?: boolean;
};

export const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Point of Sale",
        href: "/pos",
        icon: Store,
        accent: true,
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: MessageSquare,
        badge: "inbox",
      },
    ],
  },
  {
    title: "Commerce",
    items: [
      {
        label: "Orders",
        href: "/orders",
        icon: ShoppingBag,
        children: [
          { label: "All Orders", href: "/orders" },
          { label: "Pending", href: "/orders/pending" },
          { label: "Processing", href: "/orders/processing" },
          { label: "Completed", href: "/orders/completed" },
          { label: "Cancelled", href: "/orders/cancelled" },
        ],
      },
      {
        label: "Products",
        href: "/products",
        icon: Package,
        children: [
          { label: "All Products", href: "/products" },
          { label: "Add New Product", href: "/products/add" },
          { label: "Categories", href: "/products/categories" },
          { label: "Collections", href: "/products/collections" },
          { label: "Tags", href: "/products/tags" },
          { label: "Attributes", href: "/products/attributes" },
          { label: "Product Reviews", href: "/products/reviews" },
          { label: "Import / Export", href: "/products/import-export" },
        ],
      },
      {
        label: "Inventory",
        href: "/inventory",
        icon: Boxes,
        children: [
          { label: "Stock Overview", href: "/inventory" },
          { label: "Low Stock", href: "/inventory/low-stock" },
          { label: "Out of Stock", href: "/inventory/out-of-stock" },
          { label: "Stock Adjustments", href: "/inventory/adjustments" },
        ],
      },
    ],
  },
  {
    title: "Atelier",
    items: [
      {
        label: "Customers",
        href: "/customers",
        icon: Users,
        children: [
          { label: "All Customers", href: "/customers" },
          { label: "Add Customer", href: "/customers/new" },
          { label: "Customer Groups", href: "/customers/groups" },
          { label: "Segments", href: "/customers/segments" },
        ],
      },
      {
        label: "Tailoring",
        href: "/tailoring",
        icon: Ruler,
        children: [
          { label: "Tailoring Board", href: "/tailoring" },
          { label: "Measurements", href: "/tailoring/measurements" },
          { label: "Measurement Types", href: "/tailoring/templates" },
          { label: "Product Questions", href: "/tailoring/questions" },
        ],
      },
    ],
  },
  {
    title: "Growth",
    items: [
      {
        label: "Marketing",
        href: "/marketing",
        icon: Zap,
        children: [
          { label: "Campaigns", href: "/marketing" },
          { label: "Coupons", href: "/marketing/coupons" },
          { label: "Discounts", href: "/marketing/discounts" },
          { label: "Promotions", href: "/marketing/promotions" },
        ],
      },
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
        children: [
          { label: "Overview", href: "/reports" },
          { label: "Sales", href: "/reports/sales" },
          { label: "Products", href: "/reports/products" },
          { label: "Customers", href: "/reports/customers" },
          { label: "Inventory", href: "/reports/inventory" },
        ],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        label: "Help & Support",
        href: "/help-support",
        icon: CircleHelp,
      },
    ],
  },
];

/** Flat list used by the command palette / global search. */
export const navIndex: NavChild[] = navSections.flatMap((section) =>
  section.items.flatMap((item) =>
    item.children?.length
      ? item.children
      : [{ label: item.label, href: item.href }],
  ),
);
