import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "./cn";

export type Stat = {
  label: string;
  value: string | number;
  /* Signed percentage vs. the previous period. */
  delta?: number;
  hint?: string;
  icon?: ReactNode;
};

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon,
  className,
}: Stat & { className?: string }) {
  const hasDelta = typeof delta === "number" && Number.isFinite(delta);
  const isUp = hasDelta && delta >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card p-4 shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium text-faint">{label}</p>

        {icon && (
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>

      <p className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {value}
      </p>

      {(hasDelta || hint) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {hasDelta && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-semibold",
                isUp ? "text-success" : "text-danger",
              )}
            >
              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isUp ? "+" : ""}
              {delta.toFixed(1)}%
            </span>
          )}

          {hint && <span className="text-[11px] text-faint">{hint}</span>}
        </div>
      )}
    </div>
  );
}

export function StatGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
