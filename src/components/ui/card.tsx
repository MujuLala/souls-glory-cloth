import type { ReactNode } from "react";

import { cn } from "./cn";

/* =========================================================
   CARD
   The standard panel used across the whole CMS. Uses solid
   --card rather than a translucent white overlay so it reads
   correctly on a light background too.
========================================================= */

export function Card({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-card shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   CARD HEADER
========================================================= */

export function CardHeader({
  title,
  description,
  icon,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-line-subtle p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-2.5">
        {icon && <span className="mt-0.5 shrink-0 text-primary">{icon}</span>}

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-ink">{title}</h2>

          {description && (
            <p className="mt-1 text-xs leading-5 text-faint">{description}</p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CARD BODY
========================================================= */

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
