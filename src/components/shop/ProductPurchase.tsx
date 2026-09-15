"use client";

import { useState } from "react";
import { MessageCircle, Ruler, ShoppingBag } from "lucide-react";

import Button from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/format";
import { TAILORING_FEE } from "@/lib/constants";
import { useCart } from "@/store/cart";
import type { StorefrontProduct } from "@/types/catalog";

/* =========================================================
   PURCHASE PANEL

   Two ways to buy: take the piece as it is, or have it
   stitched to measurements — which adds the tailoring fee
   and marks the line as custom so the atelier sees it.
========================================================= */

export default function ProductPurchase({
  product,
}: {
  product: StorefrontProduct;
}) {
  const add = useCart((state) => state.add);
  const { toast } = useToast();

  const [size, setSize] = useState<string | null>(
    product.sizes.includes("Custom")
      ? null
      : (product.sizes[0] ?? null),
  );
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [custom, setCustom] = useState(false);

  const unitPrice = product.salePrice ?? product.price;
  const tailoringFee = custom ? TAILORING_FEE : 0;
  const lineTotal = (unitPrice + tailoringFee) * quantity;

  const needsSize = product.sizes.length > 0 && !custom;

  const addToBag = () => {
    if (needsSize && !size) {
      toast({ tone: "warning", title: "Pick a size first" });
      return;
    }

    add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: product.image,
      unitPrice,
      quantity,
      size: custom ? "Made to measure" : size,
      color,
      isCustom: custom,
      tailoringFee,
      memberId: null,
      memberName: null,
      measurementId: null,
      notes: null,
    });

    toast({
      tone: "success",
      title: "Added to your bag",
      description: `${product.name}${custom ? " · made to measure" : ""}`,
    });
  };

  return (
    <div className="space-y-5">
      {/* PRICE */}
      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className="text-2xl font-bold text-ink">
          {formatMoney(unitPrice)}
        </span>

        {product.salePrice && (
          <s className="text-sm text-faint">{formatMoney(product.price)}</s>
        )}

        {custom && (
          <span className="text-[11px] text-muted">
            + {formatMoney(TAILORING_FEE)} tailoring
          </span>
        )}
      </div>

      {/* FIT */}
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-faint">
          How would you like it?
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setCustom(false)}
            aria-pressed={!custom}
            className={cn(
              "rounded-xl border p-3 text-left transition-colors",
              !custom
                ? "border-primary bg-primary/8"
                : "border-line bg-surface hover:border-line-strong",
            )}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <ShoppingBag size={15} />
              Ready to wear
            </span>

            <span className="mt-1 block text-[11px] leading-4 text-faint">
              Ships in standard sizing
            </span>
          </button>

          <button
            type="button"
            onClick={() => setCustom(true)}
            aria-pressed={custom}
            className={cn(
              "rounded-xl border p-3 text-left transition-colors",
              custom
                ? "border-primary bg-primary/8"
                : "border-line bg-surface hover:border-line-strong",
            )}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <Ruler size={15} />
              Made to measure
            </span>

            <span className="mt-1 block text-[11px] leading-4 text-faint">
              + {formatMoney(TAILORING_FEE)} · 7–12 working days
            </span>
          </button>
        </div>
      </div>

      {/* SIZE */}
      {needsSize && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-faint">
            Size
          </p>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                aria-pressed={size === option}
                className={cn(
                  "min-w-11 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors",
                  size === option
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-line bg-surface text-muted hover:text-ink",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* COLOUR */}
      {product.colors.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-faint">
            Colour
          </p>

          <div className="flex flex-wrap gap-1.5">
            {product.colors.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setColor(option)}
                aria-pressed={color === option}
                className={cn(
                  "rounded-lg border px-3 py-2 text-[12px] transition-colors",
                  color === option
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-line bg-surface text-muted hover:text-ink",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUANTITY */}
      <div className="flex items-center gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-faint">
          Quantity
        </p>

        <div className="flex items-center rounded-lg border border-line">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="grid size-9 place-items-center text-muted hover:text-ink"
          >
            −
          </button>

          <span className="w-9 text-center text-[13px] font-semibold text-ink">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            aria-label="Increase quantity"
            className="grid size-9 place-items-center text-muted hover:text-ink"
          >
            +
          </button>
        </div>

        <span className="ml-auto text-[13px] font-bold text-ink">
          {formatMoney(lineTotal)}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="space-y-2">
        <Button
          fullWidth
          size="lg"
          onClick={addToBag}
          disabled={!product.inStock && !custom}
        >
          <ShoppingBag size={16} />
          {!product.inStock && !custom
            ? "Out of stock"
            : custom
              ? "Add made-to-measure"
              : "Add to bag"}
        </Button>

        <Button
          fullWidth
          variant="secondary"
          size="lg"
          onClick={() => {
            /* The widget listens for this and opens with the
               product already attached. */
            window.dispatchEvent(
              new CustomEvent("sg:chat-product", {
                detail: { productId: product.id, name: product.name },
              }),
            );
          }}
        >
          <MessageCircle size={16} />
          Ask about this piece
        </Button>
      </div>

      {!product.inStock && custom && (
        <p className="rounded-lg border border-info/30 bg-info/10 px-3 py-2 text-[11px] text-info">
          This piece is out of stock ready-to-wear, but we can still stitch it
          to your measurements.
        </p>
      )}
    </div>
  );
}
