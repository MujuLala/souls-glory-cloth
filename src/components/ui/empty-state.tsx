import type { ReactNode } from "react";

import { cn } from "./cn";

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
    >
      {icon && (
        <span className="mb-3 grid size-12 place-items-center rounded-2xl border border-line bg-surface text-faint">
          {icon}
        </span>
      )}

      <p className="text-sm font-semibold text-ink">{title}</p>

      {description && (
        <p className="mt-1.5 max-w-[46ch] text-xs leading-5 text-faint">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
