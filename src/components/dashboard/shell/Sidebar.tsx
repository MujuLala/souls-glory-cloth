"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, LogOut, X } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { initials } from "@/lib/format";
import { navSections, type NavItem } from "./nav-config";
import { useDashboardShell } from "./shell-context";

/* =========================================================
   SIDEBAR
========================================================= */

export default function Sidebar({
  user,
  inboxCount,
}: {
  user: { name: string; role: string; email: string };
  inboxCount: number;
}) {
  const pathname = usePathname();
  const { navOpen, closeNav } = useDashboardShell();

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  return (
    <>
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {navOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeNav}
          className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =================================================
          DRAWER / RAIL
      ================================================= */}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[84vw] max-w-[300px] flex-col border-r border-line bg-sidebar transition-transform duration-300",
          "lg:w-[var(--sidebar-width)] lg:max-w-none lg:translate-x-0",
          navOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2.5 border-b border-line-subtle px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary text-sm font-black text-primary">
              S
            </span>

            <span className="leading-none">
              <strong className="block text-[13px] font-bold text-ink">
                Soul&apos;s Glory
              </strong>

              <span className="mt-1 block text-[13px] font-extrabold text-primary">
                Cloth
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeNav}
            aria-label="Close menu"
            className="ml-auto grid size-8 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          {navSections.map((section) => (
            <div key={section.title} className="mb-5 last:mb-0">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-faint">
                {section.title}
              </p>

              {section.items.map((item) => (
                <NavEntry
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  inboxCount={inboxCount}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* USER */}
        <div className="flex items-center gap-2.5 border-t border-line-subtle px-3 py-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
            {initials(user.name)}
          </span>

          <div className="min-w-0 flex-1">
            <strong className="block truncate text-[12px] text-ink">
              {user.name}
            </strong>

            <span className="block truncate text-[10px] text-faint">
              {user.role}
            </span>
          </div>

          <Link
            href="/sign-out"
            aria-label="Sign out"
            title="Sign out"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink"
          >
            <LogOut size={15} />
          </Link>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   NAV ENTRY
========================================================= */

function NavEntry({
  item,
  pathname,
  inboxCount,
}: {
  item: NavItem;
  pathname: string;
  inboxCount: number;
}) {
  const isSectionActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const [open, setOpen] = useState(isSectionActive);

  /* Reveal the group that owns the current page. */
  useEffect(() => {
    if (isSectionActive) {
      setOpen(true);
    }
  }, [isSectionActive]);

  const Icon = item.icon;

  const badgeValue = item.badge === "inbox" ? inboxCount : 0;

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className={cn(
          "mb-1 flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors",
          pathname === item.href
            ? "bg-primary text-[var(--primary-contrast)]"
            : item.accent
              ? "text-ink hover:bg-surface"
              : "text-muted hover:bg-surface hover:text-ink",
        )}
      >
        <Icon size={17} className="shrink-0" />

        <span className="flex-1 truncate">{item.label}</span>

        {badgeValue > 0 && (
          <span
            className={cn(
              "grid min-w-5 shrink-0 place-items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold",
              pathname === item.href
                ? "bg-white/20 text-white"
                : "bg-primary text-[var(--primary-contrast)]",
            )}
          >
            {badgeValue > 99 ? "99+" : badgeValue}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={cn(
          "flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] transition-colors",
          isSectionActive
            ? "bg-surface text-ink"
            : "text-muted hover:bg-surface hover:text-ink",
        )}
      >
        <Icon size={17} className="shrink-0" />

        <span className="flex-1 truncate">{item.label}</span>

        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-faint transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="ml-[22px] mt-1 border-l border-primary/30 pl-3">
          {item.children.map((child) => {
            const isActive = pathname === child.href;

            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "relative mb-0.5 block rounded-md px-2.5 py-2 text-[12px] transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-ink"
                    : "text-faint hover:bg-surface hover:text-ink",
                )}
              >
                {isActive && (
                  <span className="absolute -left-[15px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary" />
                )}

                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
