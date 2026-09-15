import type { ReactNode } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid, type Stat } from "@/components/ui/stat";

/* =========================================================
   MANAGEMENT PAGE

   Shared list layout for the simpler CMS screens. Data comes
   from the page that renders it, so each screen can move to
   live records without touching this file.
========================================================= */

export type ManagementItem = {
  id: number | string;
  title: string;
  subtitle: string;
  status?: string;
  meta?: string;
  href?: string;
};

export default function ManagementPage({
  title,
  description,
  backHref = "/dashboard",
  backLabel = "Dashboard",
  addLabel = "Add new",
  addHref,
  icon,
  stats = [],
  items,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  searchPlaceholder = "Search…",
}: {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  addLabel?: string;
  addHref?: string;
  icon: ReactNode;
  stats?: Stat[];
  items: ManagementItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  searchPlaceholder?: string;
}) {
  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: backLabel, href: backHref }, { label: title }]}
      />

      <PageHeader
        title={title}
        description={description}
        actions={
          addHref ? (
            <Button href={addHref} size="sm">
              <Plus size={15} />
              {addLabel}
            </Button>
          ) : undefined
        }
      />

      {stats.length > 0 && <StatGrid className="mb-4" stats={stats} />}

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </span>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-ink">
                All {title.toLowerCase()}
              </h2>

              <p className="mt-0.5 text-[11px] text-faint">
                {items.length} record{items.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-[280px]">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={icon}
            title={emptyTitle}
            description={emptyDescription}
            action={
              addHref ? (
                <Button href={addHref} size="sm">
                  {addLabel}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                  </span>

                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-semibold text-ink">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 truncate text-[11px] text-faint">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:justify-end">
                  {item.meta && (
                    <span className="text-[12px] text-muted">{item.meta}</span>
                  )}

                  {item.status && <StatusBadge status={item.status} />}

                  <IconButton label={`Edit ${item.title}`}>
                    <Pencil size={14} />
                  </IconButton>

                  <IconButton label={`Delete ${item.title}`} tone="danger">
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </PageShell>
  );
}
