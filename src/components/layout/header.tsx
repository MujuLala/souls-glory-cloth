"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";

import ThemeToggle from "@/components/theme/theme-toggle";
import CartButton from "@/components/shop/CartButton";
import { Shell } from "@/components/ui/page";
import { cn } from "@/components/ui/cn";

/* =========================================================
   NAVIGATION
========================================================= */

type NavLink = {
  label: string;
  href: string;
  description?: string;
};

const platformItems: NavLink[] = [
  {
    label: "Custom Studio",
    description: "Design a piece from scratch",
    href: "/custom-studio",
  },
  {
    label: "Your Account",
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
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Support",
    href: "/support",
  },
];

export default function Header({
  categories = [],
}: {
  categories?: {
    name: string;
    slug: string;
  }[];
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<
    "platform" | "shop" | null
  >(null);

  const headerRef = useRef<HTMLElement>(null);

  const shopItems: NavLink[] = [
    {
      label: "Everything",
      href: "/shop",
    },
    ...categories.map((category) => ({
      label: category.name,
      href: `/shop/${category.slug}`,
    })),
  ];

  /* =======================================================
     CLOSE MENUS ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  /* =======================================================
     CLOSE DESKTOP DROPDOWN OUTSIDE HEADER
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /* =======================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     NAV LINK STYLE
  ======================================================= */

  const linkClass = (active: boolean) =>
    cn(
      `
        text-[0.72vw]
        font-medium
        leading-none
        tracking-[-0.015em]

        transition-colors
        duration-200

        max-xl:text-[13px]
        max-lg:text-[14px]
      `,
      active
        ? "text-primary"
        : "text-muted hover:text-primary",
    );

  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-[100]
        w-full

        bg-[var(--header-bg)]

        backdrop-blur-2xl
      "
    >
      {/* =====================================================
          HEADER INNER
      ====================================================== */}

      <Shell
        className="
          flex
          h-[4.5vw]

          min-h-16

          items-center
          justify-between

          gap-[2vw]

          lg:min-h-[68px]

          max-xl:h-[72px]

          max-lg:h-16

          max-sm:h-[62px]
        "
      >
        {/* ===================================================
            LOGO
        ==================================================== */}

        <Link
          href="/"
          aria-label="Soul's Glory Cloth home"
          className="
            shrink-0
            transition-opacity
            duration-200
            hover:opacity-90
          "
        >
          {/* Light mode */}

          <img
            src="/images/souls-glory-logo-black.svg"
            alt="Soul's Glory Cloth"
            className="
              block
              h-auto
              w-[11vw]

              max-xl:w-[160px]

              max-lg:w-[150px]

              max-sm:w-[135px]

              dark:hidden
            "
          />

          {/* Dark mode */}

          <img
            src="/images/souls-glory-logo-white.svg"
            alt="Soul's Glory Cloth"
            className="
              hidden
              h-auto
              w-[11vw]

              max-xl:w-[160px]

              max-lg:w-[150px]

              max-sm:w-[135px]

              dark:block
            "
          />
        </Link>

        {/* ===================================================
            DESKTOP NAV
        ==================================================== */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            items-center

            gap-[2vw]

            lg:flex

            xl:gap-[2.2vw]
          "
        >
          {/* PLATFORM */}

          <Dropdown
            label="Platform"
            open={openMenu === "platform"}
            onToggle={() =>
              setOpenMenu((current) =>
                current === "platform"
                  ? null
                  : "platform",
              )
            }
            items={platformItems}
            withDescriptions
          />

          {/* SHOP */}

          <Dropdown
            label="Shop"
            open={openMenu === "shop"}
            onToggle={() =>
              setOpenMenu((current) =>
                current === "shop"
                  ? null
                  : "shop",
              )
            }
            items={shopItems}
          />

          {/* MAIN LINKS */}

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(
                pathname.startsWith(link.href),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ===================================================
            ACTIONS
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center

            gap-[0.55vw]

            max-lg:gap-2

            max-sm:gap-1.5
          "
        >
          {/* SEARCH */}

          <Link
            href="/shop"
            aria-label="Search the shop"
            title="Search"
            className="
              hidden
              h-[2.35vw]
              w-[2.35vw]
              min-h-9
              min-w-9

              place-items-center

              rounded-[0.55vw]

              border
              border-line

              bg-surface

              text-muted

              transition-colors
              duration-200

              hover:border-primary
              hover:text-ink

              sm:grid

              max-lg:h-9
              max-lg:w-9

              max-lg:rounded-lg
            "
          >
            <Search
              className="
                h-[0.95vw]
                w-[0.95vw]

                max-lg:h-4
                max-lg:w-4
              "
            />
          </Link>

          {/* THEME */}

          <ThemeToggle />

          {/* CART */}

          <CartButton />

          {/* ACCOUNT */}

          <Link
            href="/account"
            aria-label="Your account"
            title="Account"
            className="
              hidden
              h-[2.35vw]
              w-[2.35vw]
              min-h-9
              min-w-9

              place-items-center

              rounded-[0.55vw]

              border
              border-line

              bg-surface

              text-muted

              transition-colors
              duration-200

              hover:border-primary
              hover:text-ink

              sm:grid

              max-lg:h-9
              max-lg:w-9

              max-lg:rounded-lg
            "
          >
            <UserRound
              className="
                h-[0.95vw]
                w-[0.95vw]

                max-lg:h-4
                max-lg:w-4
              "
            />
          </Link>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="
              grid

              h-[2.35vw]
              w-[2.35vw]

              min-h-9
              min-w-9

              place-items-center

              rounded-[0.55vw]

              border
              border-line

              bg-surface

              text-muted

              transition-colors
              duration-200

              hover:border-primary
              hover:text-ink

              lg:hidden

              max-lg:h-9
              max-lg:w-9

              max-lg:rounded-lg
            "
          >
            <Menu
              className="
                h-[1vw]
                w-[1vw]

                max-lg:h-[17px]
                max-lg:w-[17px]
              "
            />
          </button>
        </div>
      </Shell>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[110]

            lg:hidden
          "
        >
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="
              absolute
              inset-0

              bg-overlay
              backdrop-blur-sm
            "
          />

          {/* DRAWER */}

          <div
            className="
              absolute
              inset-y-0
              right-0

              flex
              w-[86vw]

              max-w-[380px]

              flex-col

              border-l
              border-line

              bg-bg-secondary

              shadow-float
            "
          >
            {/* DRAWER HEADER */}

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-line-subtle

                px-[4vw]
                py-[4vw]

                max-sm:px-5
                max-sm:py-4
              "
            >
              <span
                className="
                  text-[0.8vw]
                  font-semibold
                  tracking-[-0.01em]
                  text-ink

                  max-lg:text-[13px]
                "
              >
                Menu
              </span>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                aria-label="Close menu"
                className="
                  grid

                  h-[2.3vw]
                  w-[2.3vw]

                  min-h-8
                  min-w-8

                  place-items-center

                  rounded-lg

                  text-faint

                  transition-colors
                  duration-200

                  hover:bg-surface
                  hover:text-ink

                  max-lg:h-8
                  max-lg:w-8
                "
              >
                <X
                  className="
                    h-[0.95vw]
                    w-[0.95vw]

                    max-lg:h-[17px]
                    max-lg:w-[17px]
                  "
                />
              </button>
            </div>

            {/* MOBILE NAV */}

            <nav
              className="
                flex-1
                overflow-y-auto
                scrollbar-thin

                px-[1.2vw]
                py-[1.2vw]

                max-lg:px-3
                max-lg:py-4
              "
            >
              <MobileGroup
                title="Shop"
                items={shopItems}
              />

              <MobileGroup
                title="Platform"
                items={platformItems}
              />

              <MobileGroup
                title="More"
                items={mainLinks}
              />
            </nav>

            {/* ACCOUNT CTA */}

            <div
              className="
                border-t
                border-line-subtle

                p-[1.2vw]

                max-lg:p-3
              "
            >
              <Link
                href="/account"
                className="
                  hover-animate-stitching

                  flex
                  h-[3.1vw]

                  min-h-11

                  items-center
                  justify-center

                  gap-[0.6vw]

                  rounded-[0.7vw]

                  bg-primary

                  text-[0.75vw]
                  font-semibold

                  text-[var(--primary-contrast)]

                  transition-colors
                  duration-200

                  max-lg:gap-2
                  max-lg:rounded-lg
                  max-lg:text-[13px]
                "
              >
                <UserRound
                  className="
                    h-[0.95vw]
                    w-[0.95vw]

                    max-lg:h-4
                    max-lg:w-4
                  "
                />

                Your Account
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
  const closeTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    if (!open) {
      onToggle();
    }
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      if (open) {
        onToggle();
      }
    }, 140);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ===================================================
          DROPDOWN TRIGGER
      ==================================================== */}

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        className="
          flex
          items-center

          gap-[0.4vw]

          text-[0.72vw]
          font-medium
          leading-none
          tracking-[-0.015em]

          text-muted

          transition-colors
          duration-200

          hover:text-primary

          max-xl:gap-1.5
          max-xl:text-[13px]
        "
      >
        {label}

        <ChevronDown
          className={cn(
            `
              h-[0.75vw]
              w-[0.75vw]

              transition-transform
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]

              max-xl:h-3.5
              max-xl:w-3.5
            `,
            open && "rotate-180",
          )}
        />
      </button>

      {/* ===================================================
          HOVER BRIDGE
      ==================================================== */}

      <div
        className={cn(
          `
            absolute
            left-1/2
            top-full

            h-[1.4vw]
            w-[18vw]

            -translate-x-1/2
          `,
          open ? "block" : "hidden",
        )}
      />

      {/* ===================================================
          DROPDOWN
      ==================================================== */}

      <div
        role="menu"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          `
            absolute
            left-1/2

            top-[calc(100%+1.65vw)]

            z-[110]

            w-[19vw]
            min-w-[245px]
            max-w-[310px]

            -translate-x-1/2

            rounded-[0.9vw]

            border
            border-line

            bg-[var(--dropdown-bg)]

            p-[0.45vw]

            shadow-float

            backdrop-blur-2xl

            origin-top

            transition-[opacity,transform,visibility]

            duration-300

            ease-[cubic-bezier(0.22,1,0.36,1)]

            max-xl:top-[calc(100%+22px)]
            max-xl:rounded-xl
            max-xl:p-2
          `,

          open
            ? `
              visible
              translate-y-0
              scale-100
              opacity-100
            `
            : `
              invisible
              -translate-y-1
              scale-[0.98]
              opacity-0
            `,
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="
              group
              relative
              mb-[0.25vw]
              block
              overflow-hidden

              rounded-[0.65vw]

              bg-surface-hover

              px-[0.8vw]
              py-[0.7vw]

              transition-colors
              duration-200

              hover:bg-primary-hover

              hover-animate-stitching

              last:mb-0

              max-xl:mb-1
              max-xl:rounded-lg
              max-xl:px-3
              max-xl:py-2.5
            "
          >
            {/* TITLE */}

            <span
              className="
                block

                text-[0.75vw]
                font-semibold
                leading-[1.1]

                text-primary

                transition-colors
                duration-200

                group-hover:text-[var(--primary-contrast)]

                max-xl:text-[13px]
              "
            >
              {item.label}
            </span>

            {/* DESCRIPTION */}

            {withDescriptions &&
              item.description && (
                <span
                  className="
                    mt-[0.35vw]
                    block

                    text-[0.62vw]
                    leading-[1.45]

                    text-faint

                    transition-colors
                    duration-200

                    group-hover:text-[var(--primary-contrast)]/75

                    max-xl:mt-1.5
                    max-xl:text-[11px]
                    max-xl:leading-4
                  "
                >
                  {item.description}
                </span>
              )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE GROUP
========================================================= */

function MobileGroup({
  title,
  items,
}: {
  title: string;
  items: NavLink[];
}) {
  return (
    <div
      className="
        mb-[1.8vw]

        last:mb-0

        max-lg:mb-5
      "
    >
      {/* GROUP TITLE */}

      <p
        className="
          mb-[0.45vw]

          px-[0.8vw]

          text-[0.58vw]
          font-bold
          uppercase
          tracking-[0.14em]

          text-faint

          max-lg:mb-1.5
          max-lg:px-3
          max-lg:text-[10px]
        "
      >
        {title}
      </p>

      {/* LINKS */}

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="
            group
            block

            rounded-[0.6vw]

            px-[0.8vw]
            py-[0.7vw]

            text-[0.72vw]
            font-medium

            text-muted

            transition-colors
            duration-200

            hover:bg-surface
            hover:text-primary

            max-lg:rounded-lg
            max-lg:px-3
            max-lg:py-2.5
            max-lg:text-[13px]
          "
        >
          {item.label}

          {item.description && (
            <span
              className="
                mt-1
                block

                text-[0.6vw]
                leading-[1.4]

                text-faint

                max-lg:text-[11px]
              "
            >
              {item.description}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}