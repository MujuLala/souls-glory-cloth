"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, Ruler, ShoppingBag, Trash2, X } from "lucide-react";

import Button from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import { formatMoney } from "@/lib/format";
import { shippingFor } from "@/lib/constants";
import { cartTotals, useCart } from "@/store/cart";

export default function CartDrawer() {
  const { lines, isOpen, close, remove, setQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, close]);

  if (!mounted || !isOpen) {
    return null;
  }

  const { subtotal, itemCount } = cartTotals(lines);
  const shipping = shippingFor(subtotal);

  return (
    <div className="fixed inset-0 z-[130]">
      <button
        type="button"
        aria-label="Close bag"
        onClick={close}
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-label="Your bag"
        className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-line bg-bg-secondary"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-line-subtle px-4 py-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">Your bag</h2>

            <p className="mt-0.5 text-[11px] text-faint">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>

        {/* LINES */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          {lines.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag size={20} />}
              title="Your bag is empty"
              description="Browse the collection and add something you love."
              action={
                <Button href="/shop" size="sm" onClick={close}>
                  Start shopping
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-line-subtle">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 p-4">
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={close}
                    className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint"
                  >
                    {line.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={line.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ShoppingBag size={16} />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={close}
                      className="block truncate text-[13px] font-semibold text-ink"
                    >
                      {line.name}
                    </Link>

                    <p className="mt-0.5 truncate text-[11px] text-faint">
                      {[line.size, line.color].filter(Boolean).join(" · ") ||
                        line.sku}
                    </p>

                    {line.isCustom && (
                      <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <Ruler size={10} />
                        Made to measure
                        {line.memberName ? ` · ${line.memberName}` : ""}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-lg border border-line">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.key, line.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="grid size-7 place-items-center text-muted hover:text-ink"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-7 text-center text-[12px] font-semibold text-ink">
                          {line.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.key, line.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="grid size-7 place-items-center text-muted hover:text-ink"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-[13px] font-bold text-ink">
                        {formatMoney(
                          (line.unitPrice + line.tailoringFee) * line.quantity,
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        aria-label={`Remove ${line.name}`}
                        className="grid size-7 place-items-center rounded-lg text-faint hover:bg-danger/10 hover:text-danger"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SUMMARY */}
        {lines.length > 0 && (
          <div className="border-t border-line-subtle p-4">
            <dl className="space-y-1.5 text-[12px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">
                  {formatMoney(subtotal)}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className="font-semibold text-ink">
                  {shipping === 0 ? "Free" : formatMoney(shipping)}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-line-subtle pt-2 text-[14px]">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-bold text-ink">
                  {formatMoney(subtotal + shipping)}
                </dd>
              </div>
            </dl>

            <Button
              href="/checkout"
              fullWidth
              size="lg"
              className="mt-3"
              onClick={close}
            >
              Checkout
            </Button>

            <button
              type="button"
              onClick={close}
              className="mt-2 w-full text-center text-[11px] text-faint hover:text-ink"
            >
              Keep shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
