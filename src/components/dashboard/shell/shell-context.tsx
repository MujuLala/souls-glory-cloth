"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ShellContextValue = {
  navOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function useDashboardShell() {
  const context = useContext(ShellContext);

  if (!context) {
    throw new Error(
      "useDashboardShell must be used inside <DashboardShellProvider>.",
    );
  }

  return context;
}

export default function DashboardShellProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = useCallback(() => setNavOpen(true), []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const toggleNav = useCallback(() => setNavOpen((value) => !value), []);

  const value = useMemo<ShellContextValue>(
    () => ({ navOpen, openNav, closeNav, toggleNav }),
    [navOpen, openNav, closeNav, toggleNav],
  );

  return (
    <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
  );
}
