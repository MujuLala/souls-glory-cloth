import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "./cn";

/* =========================================================
   SHELL

   The one width rule for the entire product: content is
   92vw, centred, and nothing else adds horizontal padding.
   Any extra px-* on an ancestor is what used to push pages
   past the viewport on phones.
========================================================= */

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[92vw]", className)}>
      {children}
    </div>
  );
}

/* =========================================================
   PAGE SHELL
   Shell + the vertical rhythm every CMS page shares.
========================================================= */

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Shell className={cn("py-5 sm:py-7", className)}>{children}</Shell>
  );
}

/* =========================================================
   BREADCRUMBS
========================================================= */

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-1 text-[11px] text-faint"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-muted" : undefined}>
                {item.label}
              </span>
            )}

            {!isLast && <ChevronRight size={12} className="opacity-60" />}
          </span>
        );
      })}
    </nav>
  );
}

/* =========================================================
   PAGE HEADER
========================================================= */

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-[70ch] text-xs leading-5 text-muted sm:text-[13px]">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  );
}

/* =========================================================
   SECTION HEADING (in-page)
========================================================= */

export function SectionTitle({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>

        {description && (
          <p className="mt-0.5 text-[11px] text-faint">{description}</p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
