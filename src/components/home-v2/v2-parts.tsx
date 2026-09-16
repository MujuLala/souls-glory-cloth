import type { ReactNode } from "react";

/* =========================================================
   SHARED V2 PRIMITIVES
   Small bits reused across every section so spacing, the
   eyebrow style, and card shape stay consistent throughout.
========================================================= */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-primary)]">
      <span className="size-1.5 rounded-full bg-[var(--v2-primary)]" />
      {children}
    </span>
  );
}

export function V2Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--v2-border)] bg-[var(--v2-card)] shadow-[var(--v2-shadow-md)] ${className}`}
    >
      {children}
    </div>
  );
}

export function V2Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Avatar({
  label,
  size = 40,
  tone = "primary",
}: {
  label: string;
  size?: number;
  tone?: "primary" | "neutral";
}) {
  const initials = label
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      className={
        tone === "primary"
          ? "grid shrink-0 place-items-center rounded-full bg-[var(--v2-primary)] font-bold text-white"
          : "grid shrink-0 place-items-center rounded-full bg-[var(--v2-bg-deep)] font-bold text-[var(--v2-primary-dark)]"
      }
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.36),
        border: "2px solid var(--v2-card)",
      }}
    >
      {initials}
    </span>
  );
}
