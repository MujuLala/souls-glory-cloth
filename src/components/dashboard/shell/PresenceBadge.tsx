"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { usePresence } from "@/components/presence/use-presence";

/* =========================================================
   PRESENCE BADGE

   Shows the live connection state plus how many people are
   currently in the workspace — staff on the POS/CMS and
   shoppers on the storefront.
========================================================= */

export default function PresenceBadge({
  userId,
  name,
  role,
}: {
  userId: string;
  name: string;
  role: string;
}) {
  const { online, counts } = usePresence({ id: userId, name, role });
  const [detailsOpen, setDetailsOpen] = useState(false);

  /* Close the popover on outside click. */
  useEffect(() => {
    if (!detailsOpen) {
      return;
    }

    const close = () => setDetailsOpen(false);

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, [detailsOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setDetailsOpen((value) => !value);
        }}
        title={online ? "Connected — live data" : "Reconnecting…"}
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg border px-2.5 text-[11px] font-semibold transition-colors",
          online
            ? "border-success/30 bg-success/10 text-success"
            : "border-warning/30 bg-warning/10 text-warning",
        )}
      >
        {online ? (
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
        ) : (
          <WifiOff size={13} />
        )}

        <span className="hidden sm:inline">
          {online ? `${counts.total} online` : "Offline"}
        </span>
      </button>

      {detailsOpen && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute right-0 top-[calc(100%+6px)] w-[220px] overflow-hidden rounded-xl border border-line bg-card-elevated p-3 shadow-float"
        >
          <p className="flex items-center gap-2 text-[11px] font-semibold text-ink">
            {online ? <Wifi size={13} /> : <WifiOff size={13} />}
            {online ? "Live connection" : "Reconnecting"}
          </p>

          <dl className="mt-2.5 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <dt className="text-faint">Staff online</dt>
              <dd className="font-semibold text-ink">{counts.staff}</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-faint">Shoppers online</dt>
              <dd className="font-semibold text-ink">{counts.customers}</dd>
            </div>
          </dl>

          <p className="mt-2.5 border-t border-line-subtle pt-2 text-[10px] leading-4 text-faint">
            Presence refreshes every 25 seconds.
          </p>
        </div>
      )}
    </div>
  );
}
