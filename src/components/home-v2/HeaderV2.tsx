"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Globe2, Menu, Search, X } from "lucide-react";

import { V2Shell } from "./v2-parts";

/* =========================================================
   HEADER V2

   Self-contained header for the V2 landing experiment — it
   intentionally does not reuse the site-wide <Header>, since
   the nav structure here (Home / How It Works / Shop /
   Pricing / About) is specific to this design and this page
   renders outside the (site) route group's chrome.
========================================================= */

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#process" },
  { label: "Shop", href: "/shop" },
  { label: "Pricing", href: "#milestones" },
  { label: "About", href: "#reach" },
];

/** Real routes get next/link (prefetch, client nav); in-page
 * anchors stay a plain <a> since Link adds nothing for those. */
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default function HeaderV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-[var(--v2-border)] bg-[var(--v2-bg)]/85 backdrop-blur-xl"
    >
      <V2Shell className="flex h-[72px] items-center justify-between gap-4">
        <Link
          href="#top"
          className="shrink-0 text-[19px] font-extrabold tracking-[-0.03em] text-[var(--v2-text)]"
        >
          Soul&rsquo;s Glory
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-[var(--v2-text-secondary)] transition-colors hover:text-[var(--v2-primary)]"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/shop"
            aria-label="Search products"
            title="Search"
            className="hidden size-10 place-items-center rounded-full border border-[var(--v2-border)] bg-white text-[var(--v2-text-secondary)] transition-colors hover:border-[var(--v2-primary)]/40 hover:text-[var(--v2-primary)] sm:grid"
          >
            <Search size={16} />
          </Link>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((value) => !value)}
              aria-expanded={langOpen}
              className="flex h-10 items-center gap-1.5 rounded-full border border-[var(--v2-border)] bg-white px-3 text-[12px] font-semibold text-[var(--v2-text-secondary)] transition-colors hover:border-[var(--v2-primary)]/40 hover:text-[var(--v2-primary)]"
            >
              <Globe2 size={15} />
              EN
            </button>

            {langOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[140px] overflow-hidden rounded-xl border border-[var(--v2-border)] bg-white shadow-[var(--v2-shadow-md)]">
                <button
                  type="button"
                  onClick={() => setLangOpen(false)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-[12px] font-medium text-[var(--v2-text)]"
                >
                  English
                  <span className="text-[var(--v2-primary)]">✓</span>
                </button>
              </div>
            )}
          </div>

          <Link
            href="/sign-in"
            className="hidden h-10 items-center rounded-full border border-[var(--v2-border-strong)] px-5 text-[13px] font-semibold text-[var(--v2-text)] transition-colors hover:border-[var(--v2-primary)]/40 hover:text-[var(--v2-primary)] sm:inline-flex"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="hidden h-10 items-center gap-1.5 rounded-full bg-[var(--v2-text)] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--v2-primary)] sm:inline-flex"
          >
            Start Free
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-[var(--v2-border)] bg-white text-[var(--v2-text)] lg:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </V2Shell>

      {/* ===================================================
          MOBILE MENU
      =================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[rgba(11,18,32,0.45)] backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 flex w-[84vw] max-w-[360px] flex-col bg-[var(--v2-bg)] p-5 shadow-[var(--v2-shadow-lg)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[var(--v2-text)]">
                Soul&rsquo;s Glory
              </span>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full border border-[var(--v2-border)] bg-white text-[var(--v2-text)]"
              >
                <X size={17} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-[var(--v2-text)] transition-colors hover:bg-white"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2.5 border-t border-[var(--v2-border)] pt-5">
              <Link
                href="/sign-in"
                className="flex h-12 items-center justify-center rounded-full border border-[var(--v2-border-strong)] text-[14px] font-semibold text-[var(--v2-text)]"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="flex h-12 items-center justify-center rounded-full bg-[var(--v2-primary)] text-[14px] font-semibold text-white"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
