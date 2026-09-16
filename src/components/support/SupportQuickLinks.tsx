"use client";

import {
  ChevronRight,
  Package,
  Ruler,
  Truck,
  RefreshCcw,
  CreditCard,
  UserRound,
} from "lucide-react";

const items = [
  ["01", "Orders & payments", "Order status, changes and payment help.", Package],
  ["02", "Measurements", "Get the right fit before you order.", Ruler],
  ["03", "Shipping", "Delivery times and tracking information.", Truck],
  ["04", "Returns", "Exchanges, refunds and damaged items.", RefreshCcw],
  ["05", "Payments", "Payment methods and checkout questions.", CreditCard],
  ["06", "My account", "Profile, saved measurements and settings.", UserRound],
] as const;

export default function SupportQuickLinks() {
  return (
    <section
      id="support-categories"
      className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-primary">
            Support topics
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-ink sm:text-4xl">
            What do you need <span className="text-primary">help with?</span>
          </h2>
        </div>
        <p className="max-w-sm text-xs leading-5 text-faint">
          Start with one of the most common support topics. Everything is kept
          simple and focused.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([n, title, copy, Icon]) => (
          <a
            href="#support-faq"
            key={title}
            className="group rounded-xl border border-line-subtle bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card-hover"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-[8px] text-faint">
                {n}
              </span>
              <Icon className="h-4 w-4 text-faint transition group-hover:text-primary" />
            </div>
            <h3 className="mt-7 text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-1 max-w-xs text-[10px] leading-4 text-faint">{copy}</p>
            <div className="mt-5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-faint transition group-hover:text-primary">
              Explore
              <ChevronRight className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
