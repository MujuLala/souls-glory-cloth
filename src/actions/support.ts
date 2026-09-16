"use server";

import { prisma } from "@/lib/prisma";
import { formatDate, formatMoney } from "@/lib/format";

/* =========================================================
   PUBLIC ORDER LOOKUP

   No login required — matched on order number + phone so a
   guest can check their own order without exposing anyone
   else's.
========================================================= */

export type OrderLookupResult = {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: string;
  itemCount: number;
  placedOn: string;
  dueDate: string | null;
};

export async function lookupOrderForSupport(input: {
  orderNumber: string;
  phone: string;
}): Promise<
  | { success: true; data: OrderLookupResult }
  | { success: false; error: string }
> {
  const orderNumber = input.orderNumber.trim().toUpperCase();
  const phone = input.phone.trim();

  if (!orderNumber || !phone) {
    return { success: false, error: "Enter both your order number and phone number." };
  }

  const order = await prisma.order.findFirst({
    where: { orderNumber, shippingPhone: phone },
    include: { items: { select: { quantity: true } } },
  });

  if (!order) {
    return {
      success: false,
      error:
        "We couldn't find a matching order. Double-check the order number and the phone number used at checkout.",
    };
  }

  return {
    success: true,
    data: {
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: formatMoney(order.total),
      itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      placedOn: formatDate(order.createdAt),
      dueDate: order.dueDate ? formatDate(order.dueDate) : null,
    },
  };
}
