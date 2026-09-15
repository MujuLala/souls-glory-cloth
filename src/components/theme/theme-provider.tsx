"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "soul-glory-theme";

/* =========================================================
   NO-FLASH SCRIPT

   Runs before paint so the correct theme is on <html>
   during the very first frame. Without this the page
   renders dark and then snaps to light on hydration.
========================================================= */

export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

/* =========================================================
   CONTEXT
========================================================= */

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /* False until the client has read the stored preference.
     Use it to avoid rendering theme-dependent icons on the
     server where the real theme isn't known yet. */
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>.");
  }

  return context;
}

/* =========================================================
   PROVIDER
========================================================= */

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  /* Adopt whatever the init script already put on <html>. */
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");

    setThemeState(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  /* Follow the OS only while the user has made no explicit choice. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) {
        return;
      }

      const next: Theme = event.matches ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", next);
      setThemeState(next);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;

    /* Soften the flip, then drop the helper class so it
       doesn't slow down unrelated interactions. */
    root.classList.add("theme-transition");

    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private mode — the choice just won't persist. */
    }

    setThemeState(next);

    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 220);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, mounted }),
    [theme, setTheme, toggleTheme, mounted],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
