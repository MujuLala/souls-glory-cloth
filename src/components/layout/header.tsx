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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const headerRef = useRef<HTMLElement>(null);

  /*
   * ---------------------------------------------------------
   * INITIAL THEME
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const savedTheme = localStorage.getItem("soul-glory-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.setAttribute(
        "data-theme",
        "light"
      );
    } else {
      setDarkMode(true);
      document.documentElement.setAttribute(
        "data-theme",
        "dark"
      );
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
   * ---------------------------------------------------------
   */

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

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * THEME
   * ---------------------------------------------------------
   */

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme
    );

    localStorage.setItem(
      "soul-glory-theme",
      nextTheme
    );

    setDarkMode(!darkMode);
  };

  /*
   * ---------------------------------------------------------
   * MOBILE NAV
   * ---------------------------------------------------------
   */

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
        z-50
        w-full
        border-b
        border-[var(--border)]
        bg-[var(--header-bg)]
        backdrop-blur-2xl
      "
    >
      {/* =====================================================
          DESKTOP / MAIN HEADER
      ====================================================== */}

      <Container
        className="
          flex
          h-[4.4vw]
          min-h-[64px]
          max-h-[76px]
          items-center
          justify-between
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
              text-[1.15vw]
              font-bold
              leading-[0.86]
              tracking-[-0.065em]
              text-[var(--text)]
              max-[1100px]:text-[18px]
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
            gap-[1.55vw]
            lg:flex
          "
        >
          {/* PLATFORM */}

          <div className="relative">
            <button
              type="button"
              aria-expanded={platformOpen}
              onClick={() => {
                setPlatformOpen(!platformOpen);
                setShopOpen(false);
              }}
              className="
                flex
                items-center
                gap-[0.25vw]
                text-[0.72vw]
                font-medium
                text-[var(--text-secondary)]
                transition-colors
                hover:text-[var(--text)]
              "
            >
              Platform

              <ChevronDown
                size={12}
                className={`
                  transition-transform
                  duration-200
                  ${platformOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {platformOpen && (
              <div
                className="
                  absolute
                  left-[-0.8vw]
                  top-[calc(100%+1.15vw)]
                  w-[17vw]
                  min-w-[225px]
                  rounded-[12px]
                  border
                  border-[var(--border)]
                  bg-[var(--dropdown-bg)]
                  p-[0.4vw]
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >
                {platformItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setPlatformOpen(false);
                    }}
                    className="
                      group
                      block
                      rounded-[8px]
                      px-[0.75vw]
                      py-[0.65vw]
                      transition-colors
                      hover:bg-[var(--surface-hover)]
                    "
                  >
                    <div
                      className="
                        text-[0.68vw]
                        font-semibold
                        text-[var(--text)]
                        max-[1100px]:text-[10px]
                      "
                    >
                      {item.label}
                    </div>

                    <div
                      className="
                        mt-[2px]
                        text-[0.56vw]
                        text-[var(--text-tertiary)]
                        max-[1100px]:text-[8px]
                      "
                    >
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SHOP */}

          <div className="relative">
            <button
              type="button"
              aria-expanded={shopOpen}
              onClick={() => {
                setShopOpen(!shopOpen);
                setPlatformOpen(false);
              }}
              className="
                flex
                items-center
                gap-[0.25vw]
                text-[0.72vw]
                font-medium
                text-[var(--text-secondary)]
                transition-colors
                hover:text-[var(--text)]
              "
            >
              Shop

              <ChevronDown
                size={12}
                className={`
                  transition-transform
                  duration-200
                  ${shopOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {shopOpen && (
              <div
                className="
                  absolute
                  left-[-0.8vw]
                  top-[calc(100%+1.15vw)]
                  w-[13vw]
                  min-w-[180px]
                  rounded-[12px]
                  border
                  border-[var(--border)]
                  bg-[var(--dropdown-bg)]
                  p-[0.4vw]
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >
                {shopItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShopOpen(false)}
                    className="
                      block
                      rounded-[8px]
                      px-[0.75vw]
                      py-[0.65vw]
                      text-[0.68vw]
                      font-medium
                      text-[var(--text-secondary)]
                      transition-colors
                      hover:bg-[var(--surface-hover)]
                      hover:text-[var(--text)]
                      max-[1100px]:text-[10px]
                    "
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MAIN LINKS */}

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                text-[0.72vw]
                font-medium
                text-[var(--text-secondary)]
                transition-colors
                hover:text-[var(--text)]
              "
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
            gap-[0.4vw]
          "
        >
          {/* SEARCH */}

          <Link
            href="/search"
            aria-label="Search"
            className="
              flex
              h-[2.35vw]
              min-h-[36px]
              w-[2.35vw]
              min-w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text-secondary)]
              transition-all
              hover:border-[var(--primary)]
              hover:bg-[var(--surface-hover)]
              hover:text-[var(--text)]
            "
          >
            <Search size={15} />
          </Link>

          {/* LOGIN */}

          <Link
            href="/sign-in"
            className="
              hidden
              px-[0.55vw]
              py-[0.6vw]
              text-[0.7vw]
              font-semibold
              text-[var(--text-secondary)]
              transition-colors
              hover:text-[var(--text)]
              xl:block
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
              h-[2.35vw]
              min-h-[36px]
              rounded-[9px]
              px-[1vw]
              text-[0.68vw]
              max-[1100px]:text-[10px]
              lg:inline-flex
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
            className="
              flex
              h-[2.35vw]
              min-h-[36px]
              w-[2.35vw]
              min-w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text-secondary)]
              transition-all
              hover:border-[var(--primary)]
              hover:bg-[var(--surface-hover)]
              hover:text-[var(--text)]
            "
          >
            {darkMode ? (
              <Sun size={15} />
            ) : (
              <Moon size={15} />
            )}
          </button>

          {/* ACCOUNT */}

          <Link
            href="/account"
            aria-label="My account"
            className="
              hidden
              h-[2.35vw]
              min-h-[36px]
              w-[2.35vw]
              min-w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text-secondary)]
              transition-all
              hover:border-[var(--primary)]
              hover:bg-[var(--surface-hover)]
              hover:text-[var(--text)]
              md:flex
            "
          >
            <UserRound size={15} />
          </Link>

          {/* CART */}

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="
              relative
              flex
              h-[2.35vw]
              min-h-[36px]
              w-[2.35vw]
              min-w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text-secondary)]
              transition-all
              hover:border-[var(--primary)]
              hover:bg-[var(--surface-hover)]
              hover:text-[var(--text)]
            "
          >
            <ShoppingBag size={15} />

            <span
              className="
                absolute
                right-[-3px]
                top-[-4px]
                flex
                h-[14px]
                min-w-[14px]
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                px-[3px]
                text-[8px]
                font-bold
                text-white
              "
            >
              0
            </span>
          </Link>

          {/* MOBILE */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setPlatformOpen(false);
              setShopOpen(false);
            }}
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            className="
              flex
              h-[36px]
              w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text)]
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
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
          <Container className="py-[4vw]">
            <nav className="flex flex-col">

              {/* PLATFORM */}

              <div className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() =>
                    setPlatformOpen(!platformOpen)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    py-[3.2vw]
                    text-left
                    text-[14px]
                    font-semibold
                    text-[var(--text)]
                  "
                >
                  Platform

                  <ChevronDown
                    size={16}
                    className={
                      platformOpen
                        ? "rotate-180"
                        : ""
                    }
                  />
                </button>

                {platformOpen && (
                  <div className="pb-[2vw]">
                    {platformItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="
                          block
                          py-[2.5vw]
                          pl-[2vw]
                          text-[12px]
                          text-[var(--text-secondary)]
                        "
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* SHOP */}

              <div className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() =>
                    setShopOpen(!shopOpen)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    py-[3.2vw]
                    text-left
                    text-[14px]
                    font-semibold
                    text-[var(--text)]
                  "
                >
                  Shop

                  <ChevronDown
                    size={16}
                    className={
                      shopOpen
                        ? "rotate-180"
                        : ""
                    }
                  />
                </button>

                {shopOpen && (
                  <div className="pb-[2vw]">
                    {shopItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="
                          block
                          py-[2.5vw]
                          pl-[2vw]
                          text-[12px]
                          text-[var(--text-secondary)]
                        "
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* MAIN LINKS */}

              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="
                    border-b
                    border-[var(--border)]
                    py-[3.2vw]
                    text-[14px]
                    font-semibold
                    text-[var(--text)]
                  "
                >
                  {item.label}
                </Link>
              ))}

              {/* ACCOUNT ACTIONS */}

              <div className="mt-[4vw] grid grid-cols-2 gap-[2vw]">

                <Button
                  href="/sign-in"
                  variant="secondary"
                  className="h-[46px] text-[12px]"
                >
                  Log in
                </Button>

                <Button
                  href="/sign-up"
                  variant="primary"
                  className="h-[46px] text-[12px]"
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