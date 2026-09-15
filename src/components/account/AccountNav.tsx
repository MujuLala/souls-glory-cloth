"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Ruler,
  UserRound,
  Users,
} from "lucide-react";

import { cn } from "@/components/ui/cn";

const tabs = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "People", href: "/account/members", icon: Users },
  { label: "Measurements", href: "/account/measurements", icon: Ruler },
  { label: "Chat", href: "/account/chat", icon: MessageSquare },
  { label: "Profile", href: "/account/profile", icon: UserRound },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account sections"
      className="mt-5 flex gap-1.5 overflow-x-auto scrollbar-none border-b border-line-subtle pb-2"
    >
      {tabs.map((tab) => {
        const active =
          tab.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(tab.href);

        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-colors",
              active
                ? "bg-primary text-[var(--primary-contrast)]"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            <Icon size={14} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
