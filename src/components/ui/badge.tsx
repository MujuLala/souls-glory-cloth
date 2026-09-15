import type { ReactNode } from "react";

import { cn } from "./cn";

export type BadgeTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface text-muted border-line",
  success: "bg-success/12 text-success border-success/25",
  warning: "bg-warning/12 text-warning border-warning/25",
  danger: "bg-danger/12 text-danger border-danger/25",
  info: "bg-info/12 text-info border-info/25",
  primary: "bg-primary/12 text-primary border-primary/25",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* =========================================================
   STATUS → TONE

   One mapping for every status string used anywhere in the
   app, so a status looks identical on every screen.
========================================================= */

const statusTones: Record<string, BadgeTone> = {
  /* Generic */
  Active: "success",
  Inactive: "neutral",
  Draft: "neutral",
  Archived: "neutral",
  Published: "success",

  /* Orders */
  Pending: "warning",
  Confirmed: "info",
  Processing: "info",
  "In Tailoring": "info",
  "Ready for Pickup": "primary",
  Shipped: "info",
  Delivered: "success",
  Completed: "success",
  Cancelled: "danger",
  Refunded: "danger",
  "On Hold": "warning",

  /* Payments */
  Paid: "success",
  Unpaid: "danger",
  Partial: "warning",

  /* Inventory */
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",

  /* Reviews */
  Approved: "success",
  Rejected: "danger",
};

export function statusTone(status: string): BadgeTone {
  return statusTones[status] ?? "neutral";
}

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <Badge tone={statusTone(status)} className={className}>
      {status}
    </Badge>
  );
}
