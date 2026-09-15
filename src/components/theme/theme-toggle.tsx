"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "./theme-provider";

type ThemeToggleProps = {
  className?: string;
  size?: number;
};

export default function ThemeToggle({
  className = "",
  size = 16,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={[
        "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line",
        "bg-surface text-muted transition-colors",
        "hover:border-primary/50 hover:bg-surface-hover hover:text-ink",
        "active:scale-[0.97]",
        className,
      ].join(" ")}
    >
      {/* Before mount the real theme is unknown, so render a
          neutral placeholder to keep SSR and client markup
          identical. */}
      {!mounted ? (
        <span
          className="rounded-full bg-current opacity-40"
          style={{ width: size - 4, height: size - 4 }}
        />
      ) : isDark ? (
        <Sun size={size} />
      ) : (
        <Moon size={size} />
      )}
    </button>
  );
}
