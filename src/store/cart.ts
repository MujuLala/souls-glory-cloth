"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================================================
   CART

   Lives in the browser until checkout, where it is turned
   into a real Order row. Custom (stitched) lines carry the
   member and measurement the garment is being made for.
========================================================= */

export type CartLine = {
  /* Stable key: a product can appear twice with different
     size/colour/member combinations. */
  key: string;
  productId: number;
  name: string;
  slug: string;
  sku: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
  size: string | null;
  color: string | null;
  isCustom: boolean;
  tailoringFee: number;
  memberId: number | null;
  memberName: string | null;
  measurementId: number | null;
  notes: string | null;
};

export type NewCartLine = Omit<CartLine, "key" | "quantity"> & {
  quantity?: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;

  add: (line: NewCartLine) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  toggle: () => void;
};

function lineKey(line: NewCartLine) {
  return [
    line.productId,
    line.size ?? "",
    line.color ?? "",
    line.isCustom ? "custom" : "stock",
    line.memberId ?? "",
  ].join(":");
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,

      add: (line) =>
        set((state) => {
          const key = lineKey(line);
          const quantity = line.quantity ?? 1;

          const existing = state.lines.find((item) => item.key === key);

          if (existing) {
            return {
              isOpen: true,
              lines: state.lines.map((item) =>
                item.key === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            isOpen: true,
            lines: [...state.lines, { ...line, key, quantity }],
          };
        }),

      remove: (key) =>
        set((state) => ({
          lines: state.lines.filter((item) => item.key !== key),
        })),

      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((item) => item.key !== key)
              : state.lines.map((item) =>
                  item.key === key ? { ...item, quantity } : item,
                ),
        })),

      clear: () => set({ lines: [], isOpen: false }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "sg-cart",
      /* The drawer should never be open on first paint. */
      partialize: (state) => ({ lines: state.lines }) as CartState,
    },
  ),
);

/* =========================================================
   DERIVED TOTALS
========================================================= */

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce(
    (sum, line) => sum + (line.unitPrice + line.tailoringFee) * line.quantity,
    0,
  );

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return { subtotal, itemCount };
}
