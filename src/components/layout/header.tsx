"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

const platformItems = [
  {
    label: "How It Works",
    description: "See how Soul's Glory works",
    href: "/how-it-works",
  },
  {
    label: "Client Dashboard",
    description: "Manage your fashion journey",
    href: "/account",
  },
  {
    label: "Measurements",
    description: "Save your personal fit",
    href: "/account/measurements",
  },
];

const shopItems = [
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Kids", href: "/shop/kids" },
  { label: "Ready to Wear", href: "/shop/ready-to-wear" },
];

const mainLinks = [
  {
    label: "Custom Studio",
    href: "/custom-studio",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Support",
    href: "/support",
  },
];

/* =========================================================
   SHARED NAV TYPOGRAPHY
   IMPORTANT:
   All navigation items use the exact same color.
========================================================= */

const navTextClass = `
  text-[13px]
  xl:text-[14px]
  2xl:text-[15px]
  font-medium
  leading-none
  tracking-[-0.015em]
  !text-[#d6d6d6]
  transition-colors
  duration-200
  hover:!text-[var(--primary)]
`;

/* =========================================================
   DROPDOWN MAIN TEXT
========================================================= */

const dropdownTitleClass = `
  text-[14px]
  font-medium
  leading-none
  !text-[#d6d6d6]
  transition-colors
  duration-200
  group-hover:!text-[var(--primary)]
`;

/* =========================================================
   DROPDOWN SIMPLE ITEM
========================================================= */

const dropdownItemClass = `
  block
  rounded-[8px]
  px-3
  py-3
  text-[14px]
  font-medium
  leading-none
  !text-[#d6d6d6]
  transition-all
  duration-200
  hover:bg-[var(--surface-hover)]
  hover:!text-[var(--primary)]
`;

/* =========================================================
   ICON BUTTON
========================================================= */

const iconButtonClass = `
  flex
  h-[38px]
  w-[38px]
  shrink-0
  items-center
  justify-center
  rounded-[8px]
  border
  border-[var(--border)]
  bg-[var(--surface)]
  !text-[var(--text-secondary)]
  transition-all
  duration-200
  hover:border-[var(--primary)]
  hover:bg-[var(--surface-hover)]
  hover:!text-[var(--text)]
  active:scale-[0.97]
  sm:h-[40px]
  sm:w-[40px]
`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const headerRef = useRef<HTMLElement>(null);

  /* =========================================================
     INITIAL THEME
  ========================================================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("soul-glory-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  /* =========================================================
     CLOSE DROPDOWNS OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setPlatformOpen(false);
        setShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     THEME
  ========================================================= */

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("soul-glory-theme", nextTheme);

    setDarkMode(!darkMode);
  };

  /* =========================================================
     CLOSE MOBILE
  ========================================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setPlatformOpen(false);
    setShopOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-[100]
        w-full
        border-b
        border-[var(--border)]
        bg-[var(--header-bg)]
        backdrop-blur-2xl
      "
    >
      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <Container
        className="
          flex
          h-[64px]
          items-center
          justify-between
          sm:h-[68px]
          lg:h-[72px]
          xl:h-[74px]
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          href="/"
          aria-label="Soul's Glory Cloth home"
          onClick={closeMobileMenu}
          className="
            group
            flex
            shrink-0
            items-center
          "
        >
          <div
            className="
              text-[18px]
              font-bold
              leading-[0.86]
              tracking-[-0.065em]
              text-[var(--text)]
              sm:text-[19px]
              lg:text-[20px]
              xl:text-[21px]
            "
          >
            Soul&apos;s
            <br />

            <span className="text-[var(--primary)]">
              Glory
            </span>
          </div>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            items-center
            gap-5
            lg:flex
            xl:gap-7
            2xl:gap-8
          "
        >
          {/* =================================================
              PLATFORM
          ================================================== */}

          <div className="relative">
            <button
              type="button"
              aria-expanded={platformOpen}
              aria-haspopup="menu"
              onClick={() => {
                setPlatformOpen((value) => !value);
                setShopOpen(false);
              }}
              className={`
                flex
                items-center
                gap-1.5
                ${navTextClass}
              `}
            >
              <span>Platform</span>

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`
                  shrink-0
                  !text-[#d6d6d6]
                  transition-all
                  duration-200
                  ${platformOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {platformOpen && (
              <div
                role="menu"
                className="
                  absolute
                  left-1/2
                  top-[calc(100%+40px)]
                  z-[110]
                  w-[260px]
                  -translate-x-1/2
                  rounded-[12px]
                  border
                  border-[var(--border)]
                  bg-[var(--dropdown-bg)]
                  p-2
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >
                {platformItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setPlatformOpen(false)}
                    className="
                      group
                      block
                      rounded-[8px]
                      px-3
                      py-3
                      transition-colors
                      duration-200
                      hover:bg-[var(--surface-hover)]
                    "
                  >
                    <div className={dropdownTitleClass}>
                      {item.label}
                    </div>

                    <div
                      className="
                        mt-1.5
                        text-[12px]
                        font-normal
                        leading-[1.35]
                        !text-[#999999]
                      "
                    >
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              SHOP
          ================================================== */}

          <div className="relative">
            <button
              type="button"
              aria-expanded={shopOpen}
              aria-haspopup="menu"
              onClick={() => {
                setShopOpen((value) => !value);
                setPlatformOpen(false);
              }}
              className={`
                flex
                items-center
                gap-1.5
                ${navTextClass}
              `}
            >
              <span>Shop</span>

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`
                  shrink-0
                  !text-[#d6d6d6]
                  transition-all
                  duration-200
                  ${shopOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {shopOpen && (
              <div
                role="menu"
                className="
                  absolute
                  left-1/2
                  top-[calc(100%+40px)]
                  z-[110]
                  w-[200px]
                  -translate-x-1/2
                  rounded-[12px]
                  border
                  border-[var(--border)]
                  bg-[var(--dropdown-bg)]
                  p-2
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >
                {shopItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setShopOpen(false)}
                    className={dropdownItemClass}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              MAIN LINKS
          ================================================== */}

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navTextClass}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =================================================
            RIGHT ACTIONS
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-1.5
            sm:gap-2
          "
        >
          {/* SEARCH */}

          <Link
            href="/search"
            aria-label="Search"
            className={iconButtonClass}
          >
            <Search size={16} strokeWidth={1.8} />
          </Link>

          {/* LOGIN */}

          <Link
            href="/sign-in"
            className="
              hidden
              px-2
              py-2
              text-[13px]
              font-semibold
              leading-none
              !text-[#d6d6d6]
              transition-colors
              duration-200
              hover:!text-[var(--primary)]
              xl:block
              2xl:text-[14px]
            "
          >
            Log in
          </Link>

          {/* BECOME CLIENT */}

          <Button
            href="/sign-up"
            variant="primary"
            className="
              hidden
              h-[40px]
              rounded-[8px]
              px-4
              text-[13px]
              font-semibold
              leading-none
              lg:inline-flex
              xl:px-5
              xl:text-[14px]
            "
          >
            Become a Client
          </Button>

          {/* THEME */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className={iconButtonClass}
          >
            {darkMode ? (
              <Sun size={16} strokeWidth={1.8} />
            ) : (
              <Moon size={16} strokeWidth={1.8} />
            )}
          </button>

          {/* ACCOUNT */}

          <Link
            href="/account"
            aria-label="My account"
            className={`
              ${iconButtonClass}
              hidden
              md:flex
            `}
          >
            <UserRound size={16} strokeWidth={1.8} />
          </Link>

          {/* CART */}

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className={`
              ${iconButtonClass}
              relative
            `}
          >
            <ShoppingBag size={16} strokeWidth={1.8} />

            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-[15px]
                min-w-[15px]
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                px-1
                text-[9px]
                font-bold
                leading-none
                text-white
              "
            >
              0
            </span>
          </Link>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((value) => !value);
              setPlatformOpen(false);
              setShopOpen(false);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`
              ${iconButtonClass}
              lg:hidden
            `}
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </Container>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-[var(--border)]
            bg-[var(--header-bg)]
            backdrop-blur-2xl
            lg:hidden
          "
        >
          <Container className="py-4 sm:py-5">
            <nav className="flex flex-col">

              {/* =================================================
                  PLATFORM
              ================================================== */}

              <div className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() =>
                    setPlatformOpen((value) => !value)
                  }
                  className="
                    flex
                    min-h-[52px]
                    w-full
                    items-center
                    justify-between
                    text-left
                    text-[15px]
                    font-semibold
                    leading-none
                    !text-[#d6d6d6]
                    transition-colors
                    duration-200
                    hover:!text-[var(--primary)]
                  "
                >
                  Platform

                  <ChevronDown
                    size={17}
                    className={`
                      !text-[#d6d6d6]
                      transition-transform
                      duration-200
                      ${platformOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {platformOpen && (
                  <div className="pb-3">
                    {platformItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="
                          block
                          rounded-[8px]
                          px-3
                          py-3
                          text-[13px]
                          font-medium
                          leading-none
                          !text-[#d6d6d6]
                          transition-all
                          duration-200
                          hover:bg-[var(--surface-hover)]
                          hover:!text-[var(--primary)]
                        "
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* =================================================
                  SHOP
              ================================================== */}

              <div className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() =>
                    setShopOpen((value) => !value)
                  }
                  className="
                    flex
                    min-h-[52px]
                    w-full
                    items-center
                    justify-between
                    text-left
                    text-[15px]
                    font-semibold
                    leading-none
                    !text-[#d6d6d6]
                    transition-colors
                    duration-200
                    hover:!text-[var(--primary)]
                  "
                >
                  Shop

                  <ChevronDown
                    size={17}
                    className={`
                      !text-[#d6d6d6]
                      transition-transform
                      duration-200
                      ${shopOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {shopOpen && (
                  <div className="pb-3">
                    {shopItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="
                          block
                          rounded-[8px]
                          px-3
                          py-3
                          text-[13px]
                          font-medium
                          leading-none
                          !text-[#d6d6d6]
                          transition-all
                          duration-200
                          hover:bg-[var(--surface-hover)]
                          hover:!text-[var(--primary)]
                        "
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* =================================================
                  MAIN LINKS
              ================================================== */}

              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="
                    flex
                    min-h-[52px]
                    items-center
                    border-b
                    border-[var(--border)]
                    text-[15px]
                    font-semibold
                    leading-none
                    !text-[#d6d6d6]
                    transition-colors
                    duration-200
                    hover:!text-[var(--primary)]
                  "
                >
                  {item.label}
                </Link>
              ))}

              {/* =================================================
                  ACCOUNT ACTIONS
              ================================================== */}

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <Button
                  href="/sign-in"
                  variant="secondary"
                  className="
                    h-[46px]
                    w-full
                    px-3
                    text-[14px]
                  "
                >
                  Log in
                </Button>

                <Button
                  href="/sign-up"
                  variant="primary"
                  className="
                    h-[46px]
                    w-full
                    px-3
                    text-[14px]
                  "
                >
                  Become a Client
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}