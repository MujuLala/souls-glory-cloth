/* =========================================================
   COMMERCE SETTINGS

   Single place for the numbers the storefront, POS and
   checkout all have to agree on.
========================================================= */

/** Added per line when a piece is stitched to measurements. */
export const TAILORING_FEE = 2500;

/** Flat delivery charge, waived above the threshold. */
export const SHIPPING_FLAT = 350;
export const FREE_SHIPPING_THRESHOLD = 15000;

/** Sales tax applied at checkout and in the POS. 0 disables it. */
export const TAX_RATE = 0;

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return SHIPPING_FLAT;
}

export function taxFor(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE);
}

/* =========================================================
   ORDER WORKFLOW
========================================================= */

export const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "In Tailoring",
  "Ready for Pickup",
  "Shipped",
  "Delivered",
  "Completed",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "Unpaid",
  "Partial",
  "Paid",
  "Refunded",
] as const;

export const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "Easypaisa",
  "JazzCash",
  "Bank Transfer",
  "Cash on Delivery",
] as const;

export const RELATIONS = [
  "Self",
  "Wife",
  "Husband",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Other",
] as const;
