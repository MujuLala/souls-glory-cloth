"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, UserRound, X } from "lucide-react";

import ThemeToggle from "@/components/theme/theme-toggle";
import CartButton from "@/components/shop/CartButton";
import { Shell } from "@/components/ui/page";
import { cn } from "@/components/ui/cn";

/* =========================================================
   NAVIGATION
========================================================= */

type NavLink = { label: string; href: string; description?: string };

const platformItems: NavLink[] = [
  {
    label: "Custom Studio",
    description: "Design a piece from scratch",
    href: "/custom-studio",
  },
  {
    label: "Your account",
    description: "Orders, measurements and family profiles",
    href: "/account",
  },
  {
    label: "Measurements",
    description: "Save a fit for everyone you order for",
    href: "/account/measurements",
  },
];

const mainLinks: NavLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "Support", href: "/support" },
];

export default function Header({
  categories = [],
}: {
  categories?: { name: string; slug: string }[];
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"platform" | "shop" | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  const shopItems: NavLink[] = [
    { label: "Everything", href: "/shop" },
    ...categories.map((category) => ({
      label: category.name,
      href: `/shop/${category.slug}`,
    })),
  ];

  /* Close menus when the route changes or focus leaves. */
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Lock the page while the mobile drawer is open. */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    cn(
      "text-[13px] font-medium leading-none tracking-[-0.015em] transition-colors xl:text-[14px]",
      active ? "text-primary" : "text-muted hover:text-primary",
    );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[100] w-full border-b border-line bg-[var(--header-bg)] backdrop-blur-2xl"
    >
      <Shell className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        {/* =============================================
            LOGO
        ============================================= */}

        <Link
          href="/"
          aria-label="Soul's Glory Cloth home"
          className="shrink-0 text-[18px] font-bold leading-[0.86] tracking-[-0.065em] text-ink lg:text-[20px]"
        >
          Soul&apos;s
          <br />
          <span className="text-primary">Glory</span>
        </Link>

        {/* =============================================
            DESKTOP NAV
        ============================================= */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          <Dropdown
            label="Platform"
            open={openMenu === "platform"}
            onToggle={() =>
              setOpenMenu((current) =>
                current === "platform" ? null : "platform",
              )
            }
            items={platformItems}
            withDescriptions
          />

          <Dropdown
            label="Shop"
            open={openMenu === "shop"}
            onToggle={() =>
              setOpenMenu((current) => (current === "shop" ? null : "shop"))
            }
            items={shopItems}
          />

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(pathname.startsWith(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* =============================================
            ACTIONS
        ============================================= */}

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/shop"
            aria-label="Search the shop"
            title="Search"
            className="hidden size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-primary hover:text-ink sm:grid"
          >
            <Search size={16} />
          </Link>

          <ThemeToggle />

          <CartButton />

          <Link
            href="/account"
            aria-label="Your account"
            title="Account"
            className="hidden size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-primary hover:text-ink sm:grid"
          >
            <UserRound size={16} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink lg:hidden"
          >
            <Menu size={17} />
          </button>
        </div>
      </Shell>

      {/* =============================================
          MOBILE DRAWER
      ============================================= */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 flex w-[86vw] max-w-[340px] flex-col border-l border-line bg-bg-secondary">
            <div className="flex items-center justify-between border-b border-line-subtle px-4 py-4">
              <span className="text-[13px] font-bold text-ink">Menu</span>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid size-8 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
              <MobileGroup title="Shop" items={shopItems} />
              <MobileGroup title="Platform" items={platformItems} />
              <MobileGroup title="More" items={mainLinks} />
            </nav>

            <div className="border-t border-line-subtle p-3">
              <Link
                href="/account"
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-[13px] font-bold text-[var(--primary-contrast)]"
              >
                <UserRound size={16} />
                Your account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   DESKTOP DROPDOWN
========================================================= */

function Dropdown({
  label,
  open,
  onToggle,
  items,
  withDescriptions = false,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: NavLink[];
  withDescriptions?: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        className="flex items-center gap-1.5 text-[13px] font-medium leading-none tracking-[-0.015em] text-muted transition-colors hover:text-primary xl:text-[14px]"
      >
        {label}

        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-[calc(100%+22px)] z-[110] w-[260px] -translate-x-1/2 rounded-xl border border-line bg-[var(--dropdown-bg)] p-2 shadow-float backdrop-blur-2xl"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-hover"
            >
              <span className="block text-[13.5px] font-medium leading-none text-ink transition-colors group-hover:text-primary">
                {item.label}
              </span>

              {withDescriptions && item.description && (
                <span className="mt-1.5 block text-[11.5px] leading-4 text-faint">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MOBILE GROUP
========================================================= */

function MobileGroup({ title, items }: { title: string; items: NavLink[] }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
        {title}
      </p>

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-lg px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
