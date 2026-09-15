"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { cartTotals, useCart } from "@/store/cart";

export default function CartButton() {
  const lines = useCart((state) => state.lines);
  const open = useCart((state) => state.open);

  /* The persisted cart only exists after hydration, so the
     badge waits a tick rather than rendering a server/client
     mismatch. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { itemCount } = cartTotals(lines);

  return (
    <button
      type="button"
      onClick={open}
      aria-label={
        itemCount > 0 ? `Open bag — ${itemCount} items` : "Open bag"
      }
      title="Your bag"
      className="relative grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-primary hover:text-ink"
    >
      <ShoppingBag size={16} />

      {mounted && itemCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-[var(--primary-contrast)]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
