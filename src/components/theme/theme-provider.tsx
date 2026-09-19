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

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
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

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  /*
   * Read saved theme after the client mounts.
   */
  useEffect(() => {
    let nextTheme: Theme = "dark";

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);

      if (stored === "light" || stored === "dark") {
        nextTheme = stored;
      } else {
        nextTheme = window.matchMedia(
          "(prefers-color-scheme: light)",
        ).matches
          ? "light"
          : "dark";
      }
    } catch {
      nextTheme = "dark";
    }

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme,
    );

    setThemeState(nextTheme);
    setMounted(true);
  }, []);

  /*
   * Follow system theme when the user has not selected
   * a theme manually.
   */
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-color-scheme: light)",
    );

    const handleChange = (event: MediaQueryListEvent) => {
      let hasStoredTheme = false;

      try {
        hasStoredTheme =
          !!localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        hasStoredTheme = false;
      }

      if (hasStoredTheme) {
        return;
      }

      const nextTheme: Theme = event.matches
        ? "light"
        : "dark";

      document.documentElement.setAttribute(
        "data-theme",
        nextTheme,
      );

      setThemeState(nextTheme);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  /*
   * Change theme manually.
   */
  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;

    root.classList.add("theme-transition");

    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        next,
      );
    } catch {
      // Storage unavailable/private mode.
    }

    setThemeState(next);

    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 220);
  }, []);

  /*
   * Toggle between dark and light.
   */
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      mounted,
    }),
    [theme, setTheme, toggleTheme, mounted],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}