"use client";

import { useState } from "react";

import { cn } from "./cn";

/* =========================================================
   BAR CHART

   A dependency-free bar chart for simple report views. Not a
   general charting solution — just enough for "value per day
   / per category" reads with a hover tooltip.
========================================================= */

export type BarDatum = {
  label: string;
  value: number;
};

export default function BarChart({
  data,
  formatValue = (value) => String(value),
  height = 160,
  className,
}: {
  data: BarDatum[];
  formatValue?: (value: number) => string;
  height?: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((point) => point.value));

  if (data.length === 0) {
    return (
      <div
        className="grid place-items-center text-[12px] text-faint"
        style={{ height }}
      >
        No data yet
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {hovered !== null && (
        <div className="pointer-events-none mb-2 text-[11px] text-muted">
          <strong className="text-ink">{data[hovered].label}</strong>
          {" — "}
          {formatValue(data[hovered].value)}
        </div>
      )}

      <div
        className="flex items-end gap-1"
        style={{ height }}
        role="img"
        aria-label="Bar chart"
      >
        {data.map((point, index) => (
          <button
            key={`${point.label}-${index}`}
            type="button"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
            className="group flex h-full flex-1 items-end"
            aria-label={`${point.label}: ${formatValue(point.value)}`}
          >
            <span
              className={cn(
                "w-full min-h-[3px] rounded-t-sm bg-primary/30 transition-colors",
                hovered === index ? "bg-primary" : "group-hover:bg-primary/60",
              )}
              style={{ height: `${Math.max(2, (point.value / max) * 100)}%` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   HORIZONTAL BAR LIST
   For ranked comparisons — top products, cities, categories.
========================================================= */

export function BarList({
  data,
  formatValue = (value) => String(value),
}: {
  data: BarDatum[];
  formatValue?: (value: number) => string;
}) {
  const max = Math.max(1, ...data.map((point) => point.value));

  if (data.length === 0) {
    return <p className="text-[12px] text-faint">No data yet</p>;
  }

  return (
    <div className="space-y-2.5">
      {data.map((point) => (
        <div key={point.label}>
          <div className="mb-1 flex items-center justify-between gap-2 text-[12px]">
            <span className="truncate text-ink">{point.label}</span>
            <span className="shrink-0 font-semibold text-muted">
              {formatValue(point.value)}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max(2, (point.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
