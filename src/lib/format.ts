/* =========================================================
   FORMATTING HELPERS

   Prisma returns Decimal objects; every screen needs the
   same money/date/number formatting, so it lives here once.
========================================================= */

export const CURRENCY = "PKR";

type DecimalLike = { toString(): string } | number | string | null | undefined;

/** Safely turn a Prisma Decimal (or anything numeric) into a number. */
export function toNumber(value: DecimalLike): number {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = typeof value === "number" ? value : Number(value.toString());

  return Number.isFinite(parsed) ? parsed : 0;
}

/** "Rs 12,500" — no decimals, because prices here are whole rupees. */
export function formatMoney(
  value: DecimalLike,
  options: { compact?: boolean; withSymbol?: boolean } = {},
): string {
  const { compact = false, withSymbol = true } = options;
  const amount = toNumber(value);

  const formatted = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: compact && Math.abs(amount) >= 1000 ? 1 : 0,
    notation: compact && Math.abs(amount) >= 10000 ? "compact" : "standard",
  }).format(amount);

  return withSymbol ? `Rs ${formatted}` : formatted;
}

export function formatNumber(value: number | null | undefined): string {
  return new Intl.NumberFormat("en-PK").format(value ?? 0);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

/* =========================================================
   DATES
========================================================= */

export function formatDate(value: Date | string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = typeof value === "string" ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(
  value: Date | string | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const date = typeof value === "string" ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatTime(value: Date | string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/** "just now", "5m ago", "3h ago", "12 Mar" */
export function formatRelative(
  value: Date | string | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const date = typeof value === "string" ? new Date(value) : value;
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);

  if (seconds < 45) {
    return "just now";
  }

  if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m ago`;
  }

  if (seconds < 86400) {
    return `${Math.round(seconds / 3600)}h ago`;
  }

  if (seconds < 604800) {
    return `${Math.round(seconds / 86400)}d ago`;
  }

  return formatDate(date);
}

/* =========================================================
   TEXT
========================================================= */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function truncate(value: string, max = 80): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/* =========================================================
   SEQUENTIAL CODES
========================================================= */

export function padCode(prefix: string, id: number, width = 5): string {
  return `${prefix}-${String(id).padStart(width, "0")}`;
}
