"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, ShoppingBag } from "lucide-react";

import { formatMoney } from "@/lib/format";

export type PickerProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  category: string | null;
  image: string | null;
};

/* =========================================================
   PRODUCT PICKER

   Lets a shopper (or an agent) attach the exact product the
   conversation is about.
========================================================= */

export default function ProductPicker({
  onSelect,
}: {
  onSelect: (product: PickerProduct) => void;
}) {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState<PickerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    /* Debounce so typing doesn't fire a request per keystroke. */
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/chat/products?q=${encodeURIComponent(term)}`,
          { cache: "no-store" },
        );

        const data = (await response.json()) as { products: PickerProduct[] };

        if (!cancelled) {
          setProducts(data.products ?? []);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [term]);

  return (
    <div className="flex h-full flex-col">
      <div className="relative shrink-0 p-3">
        <Search
          size={15}
          className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-faint"
        />

        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search products…"
          autoFocus
          className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-[12px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-faint">
            <Loader2 size={18} className="animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <p className="py-8 text-center text-[12px] text-faint">
            No products matched “{term}”.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {products.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelect(product)}
                  className="flex w-full items-center gap-2.5 rounded-lg border border-line bg-card p-2 text-left transition-colors hover:border-primary/40 hover:bg-card-hover"
                >
                  <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-surface text-faint">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ShoppingBag size={15} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-semibold text-ink">
                      {product.name}
                    </span>

                    <span className="block truncate text-[10px] text-faint">
                      {product.category ?? product.sku}
                    </span>
                  </span>

                  <span className="shrink-0 text-[11px] font-bold text-primary">
                    {formatMoney(product.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
