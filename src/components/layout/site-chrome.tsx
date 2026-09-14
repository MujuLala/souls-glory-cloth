"use client";

import { usePathname } from "next/navigation";

interface SiteChromeProps {
  children: React.ReactNode;
  announcement: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function SiteChrome({
  children,
  announcement,
  header,
  footer,
}: SiteChromeProps) {
  const pathname = usePathname();

  const hideSiteChrome =
    // Dashboard
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||

    // Products
    pathname === "/products" ||
    pathname.startsWith("/products/") ||

    // Orders
    pathname === "/orders" ||
    pathname.startsWith("/orders/") ||

    // Customers
    pathname === "/customers" ||
    pathname.startsWith("/customers/") ||

    // Inventory
    pathname === "/inventory" ||
    pathname.startsWith("/inventory/") ||

    // Marketing
    pathname === "/marketing" ||
    pathname.startsWith("/marketing/") ||

    // Reports
    pathname === "/reports" ||
    pathname.startsWith("/reports/") ||

    // Custom Studio
    pathname === "/custom-studio" ||
    pathname.startsWith("/custom-studio/") ||

    // Settings
    pathname === "/settings" ||
    pathname.startsWith("/settings/") ||

    // Help & Support
    pathname === "/help-support" ||
    pathname.startsWith("/help-support/");

  if (hideSiteChrome) {
    return <>{children}</>;
  }

  return (
    <>
      {announcement}
      {header}

      <main>{children}</main>

      {footer}
    </>
  );
}