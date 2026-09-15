"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Menu, MessageSquare, Plus, Search, Store, X } from "lucide-react";

import ThemeToggle from "@/components/theme/theme-toggle";
import { cn } from "@/components/ui/cn";
import { initials } from "@/lib/format";
import { navIndex } from "./nav-config";
import { useDashboardShell } from "./shell-context";
import PresenceBadge from "./PresenceBadge";

export default function Topbar({
  user,
  inboxCount,
}: {
  user: { id: string; name: string; role: string };
  inboxCount: number;
}) {
  const router = useRouter();
  const { toggleNav } = useDashboardShell();

  const [query, setQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Ctrl/Cmd+K focuses the search from anywhere. */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setPaletteOpen(true);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return [];
    }

    return navIndex
      .filter((entry) => entry.label.toLowerCase().includes(term))
      .slice(0, 7);
  }, [query]);

  const go = (href: string) => {
    setQuery("");
    setPaletteOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-topbar backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-[4vw] lg:px-6">
        {/* MENU */}
        <button
          type="button"
          onClick={toggleNav}
          aria-label="Open navigation"
          className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink lg:hidden"
        >
          <Menu size={18} />
        </button>

        {/* SEARCH */}
        <div className="relative min-w-0 flex-1 sm:max-w-[420px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
          />

          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPaletteOpen(true);
            }}
            onFocus={() => setPaletteOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results.length > 0) {
                go(results[0].href);
              }
            }}
            placeholder="Search pages, orders, products…"
            aria-label="Search the workspace"
            className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-16 text-xs text-ink outline-none transition-colors placeholder:text-faint focus-visible:border-primary/60"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setPaletteOpen(false);
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-faint hover:text-ink"
            >
              <X size={13} />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-line px-1.5 py-0.5 text-[9px] text-faint sm:block">
              Ctrl K
            </kbd>
          )}

          {/* RESULTS */}
          {paletteOpen && results.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] overflow-hidden rounded-xl border border-line bg-card-elevated shadow-float">
              {results.map((entry) => (
                <button
                  key={entry.href}
                  type="button"
                  onClick={() => go(entry.href)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs text-ink transition-colors hover:bg-surface"
                >
                  <span>{entry.label}</span>

                  <span className="text-[10px] text-faint">{entry.href}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <PresenceBadge userId={user.id} name={user.name} role={user.role} />

          <Link
            href="/pos"
            className="hidden h-9 items-center gap-2 rounded-lg bg-primary px-3 text-xs font-bold text-[var(--primary-contrast)] transition-colors hover:bg-primary-hover md:inline-flex"
          >
            <Store size={15} />
            Open POS
          </Link>

          <Link
            href="/products/add"
            aria-label="Add product"
            title="Add product"
            className="hidden size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink sm:grid"
          >
            <Plus size={17} />
          </Link>

          <Link
            href="/inbox"
            aria-label="Inbox"
            title="Inbox"
            className="relative grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink"
          >
            <MessageSquare size={16} />

            {inboxCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-[var(--primary-contrast)]">
                {inboxCount > 9 ? "9+" : inboxCount}
              </span>
            )}
          </Link>

          <Link
            href="/orders/pending"
            aria-label="Notifications"
            title="Pending orders"
            className="relative hidden size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink sm:grid"
          >
            <Bell size={16} />
          </Link>

          <ThemeToggle />

          <div className="flex items-center gap-2 border-l border-line pl-2">
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full",
                "bg-primary/12 text-[11px] font-bold text-primary",
              )}
            >
              {initials(user.name)}
            </span>

            <span className="hidden leading-none lg:block">
              <strong className="block text-[11px] text-ink">
                {user.name}
              </strong>

              <span className="mt-1 block text-[9px] text-faint">
                {user.role}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
