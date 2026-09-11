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
    pathname === "/products" || pathname.startsWith("/products/");

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