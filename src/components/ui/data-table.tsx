import type { ReactNode } from "react";

import { cn } from "./cn";
import EmptyState from "./empty-state";

/* =========================================================
   COLUMN
========================================================= */

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  /* Width hint for the desktop table, e.g. "w-[160px]". */
  width?: string;
  /* Keep the column out of the stacked mobile card — use it
     for anything already covered by `renderCard`. */
  hideOnMobile?: boolean;
};

/* =========================================================
   DATA TABLE

   Desktop: a real table inside a horizontal scroller, so a
   wide table never widens the page itself.
   Mobile: one card per row — either a custom `renderCard`
   or an automatic label/value stack.
========================================================= */

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  renderCard,
  empty,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  renderCard?: (row: T) => ReactNode;
  empty?: { icon?: ReactNode; title: string; description?: string; action?: ReactNode };
  className?: string;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState
        icon={empty?.icon}
        title={empty?.title ?? "Nothing here yet"}
        description={empty?.description}
        action={empty?.action}
      />
    );
  }

  const alignClass = (align: Column<T>["align"]) =>
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <div className={className}>
      {/* =================================================
          DESKTOP TABLE
      ================================================= */}

      <div className="hidden overflow-x-auto scrollbar-thin md:block">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-line-subtle">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-faint",
                    alignClass(column.align),
                    column.width,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-line-subtle last:border-0 transition-colors hover:bg-surface"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 align-middle text-[13px] text-ink",
                      alignClass(column.align),
                    )}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =================================================
          MOBILE CARDS
      ================================================= */}

      <div className="divide-y divide-line-subtle md:hidden">
        {rows.map((row) => (
          <div key={rowKey(row)} className="p-4">
            {renderCard ? (
              renderCard(row)
            ) : (
              <dl className="space-y-2">
                {columns
                  .filter((column) => !column.hideOnMobile)
                  .map((column) => (
                    <div
                      key={column.key}
                      className="flex items-start justify-between gap-3"
                    >
                      <dt className="text-[11px] font-medium text-faint">
                        {column.header}
                      </dt>

                      <dd className="min-w-0 text-right text-[13px] text-ink">
                        {column.render(row)}
                      </dd>
                    </div>
                  ))}
              </dl>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
