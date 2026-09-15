"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  getCurrentUser,
  getOrCreateCustomer,
  requireStaff,
} from "@/lib/session";
import { padCode, toNumber } from "@/lib/format";
import { shippingFor, TAILORING_FEE, taxFor } from "@/lib/constants";

/* =========================================================
   TYPES
========================================================= */

export type CheckoutLine = {
  productId: number;
  quantity: number;
  size: string | null;
  color: string | null;
  isCustom: boolean;
  memberId: number | null;
  measurementId: number | null;
  notes: string | null;
};

export type CheckoutInput = {
  lines: CheckoutLine[];

  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;

  paymentMethod: string;
};

function fail(error: string) {
  return { success: false as const, error };
}

/* =========================================================
   PLACE ORDER

   Prices are re-read from the database — never trusted from
   the browser — and stock is decremented in the same
   transaction that writes the order.
========================================================= */

export async function placeOrder(input: CheckoutInput) {
  if (input.lines.length === 0) {
    return fail("Your bag is empty.");
  }

  if (!input.fullName.trim() || !input.phone.trim()) {
    return fail("We need a name and a phone number to deliver your order.");
  }

  if (!input.address.trim() || !input.city.trim()) {
    return fail("Enter a delivery address.");
  }

  const products = await prisma.product.findMany({
    where: { id: { in: input.lines.map((line) => line.productId) } },
    select: {
      id: true,
      name: true,
      sku: true,
      price: true,
      salePrice: true,
      stock: true,
      trackInventory: true,
      images: {
        select: { imageUrl: true },
        orderBy: { sortOrder: "asc" },
        take: 1,
      },
    },
  });

  const byId = new Map(products.map((product) => [product.id, product]));

  /* Build the priced lines server-side. */
  const items: {
    productId: number;
    name: string;
    sku: string;
    image: string | null;
    size: string | null;
    color: string | null;
    isCustom: boolean;
    memberId: number | null;
    measurementId: number | null;
    customNotes: string | null;
    unitPrice: number;
    tailoringFee: number;
    quantity: number;
    total: number;
  }[] = [];

  for (const line of input.lines) {
    const product = byId.get(line.productId);

    if (!product) {
      return fail("One of the pieces in your bag is no longer available.");
    }

    const quantity = Math.max(1, Math.min(20, Math.floor(line.quantity)));

    if (
      product.trackInventory &&
      !line.isCustom &&
      product.stock < quantity
    ) {
      return fail(
        `${product.name} only has ${product.stock} left in stock.`,
      );
    }

    const unitPrice = toNumber(product.salePrice ?? product.price);
    const tailoringFee = line.isCustom ? TAILORING_FEE : 0;

    items.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      image: product.images[0]?.imageUrl ?? null,
      size: line.size,
      color: line.color,
      isCustom: line.isCustom,
      memberId: line.memberId,
      measurementId: line.measurementId,
      customNotes: line.notes,
      unitPrice,
      tailoringFee,
      quantity,
      total: (unitPrice + tailoringFee) * quantity,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shippingTotal = shippingFor(subtotal);
  const taxTotal = taxFor(subtotal);
  const total = subtotal + shippingTotal + taxTotal;

  const hasCustom = items.some((item) => item.isCustom);
  const allCustom = items.every((item) => item.isCustom);

  /* Attach the order to a customer record where we can. */
  const user = await getCurrentUser();

  let customerId: number | null = null;

  if (user) {
    customerId = user.customerId ?? (await getOrCreateCustomer(user));
  } else {
    /* Guests are matched on phone so repeat buyers build one
       history instead of a new record per order. */
    const existing = await prisma.customer.findFirst({
      where: { phone: input.phone.trim() },
      select: { id: true },
    });

    if (existing) {
      customerId = existing.id;
    } else {
      const created = await prisma.customer.create({
        data: {
          code: "TEMP",
          fullName: input.fullName.trim(),
          email: input.email.trim() || null,
          phone: input.phone.trim(),
          city: input.city.trim(),
          addressLine: input.address.trim(),
          source: "Storefront",
          members: {
            create: {
              fullName: input.fullName.trim(),
              relation: "Self",
              isPrimary: true,
            },
          },
        },
        select: { id: true },
      });

      await prisma.customer.update({
        where: { id: created.id },
        data: { code: padCode("SGC", created.id, 4) },
      });

      customerId = created.id;
    }
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          /* Temporary unique value; replaced with the padded
             number once the row has an id. */
          orderNumber: `TMP-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
          customerId,
          type: allCustom ? "Custom" : hasCustom ? "Mixed" : "Ready Made",
          channel: "Online",
          status: "Pending",
          paymentStatus: "Unpaid",
          paymentMethod: input.paymentMethod,

          subtotal,
          shippingTotal,
          taxTotal,
          total,

          notes: input.notes?.trim() || null,

          shippingName: input.fullName.trim(),
          shippingPhone: input.phone.trim(),
          shippingAddress: input.address.trim(),
          shippingCity: input.city.trim(),
          shippingCountry: "Pakistan",

          items: {
            create: items.map((item) => ({
              productId: item.productId,
              name: item.name,
              sku: item.sku,
              image: item.image,
              size: item.size,
              color: item.color,
              isCustom: item.isCustom,
              memberId: item.memberId,
              measurementId: item.measurementId,
              customNotes: item.customNotes,
              unitPrice: item.unitPrice,
              tailoringFee: item.tailoringFee,
              quantity: item.quantity,
              total: item.total,
            })),
          },

          events: {
            create: {
              status: "Pending",
              note: "Order placed from the storefront.",
              createdBy: input.fullName.trim(),
            },
          },
        },
        select: { id: true },
      });

      const orderNumber = padCode("SG", created.id + 1000, 5);

      await tx.order.update({
        where: { id: created.id },
        data: { orderNumber },
      });

      /* Ready-to-wear lines come out of stock immediately. */
      for (const item of items) {
        if (item.isCustom) {
          continue;
        }

        await tx.product.updateMany({
          where: { id: item.productId, trackInventory: true },
          data: { stock: { decrement: item.quantity } },
        });
      }

      if (customerId) {
        await tx.customer.update({
          where: { id: customerId },
          data: {
            totalOrders: { increment: 1 },
            totalSpent: { increment: total },
            lastOrderAt: new Date(),
          },
        });
      }

      return { id: created.id, orderNumber };
    });

    revalidatePath("/orders");
    revalidatePath("/dashboard");
    revalidatePath("/account/orders");

    return { success: true as const, data: order };
  } catch (error) {
    console.error("Place order failed:", error);

    return fail("We couldn't place the order. Please try again.");
  }
}

/* =========================================================
   ADMIN: STATUS
========================================================= */

export async function updateOrderStatus(
  orderId: number,
  status: string,
  note?: string,
) {
  const staff = await requireStaff();

  try {
    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status },
      }),
      prisma.orderEvent.create({
        data: {
          orderId,
          status,
          note: note?.trim() || null,
          createdBy: staff.name ?? staff.email,
        },
      }),
    ]);

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);
    revalidatePath("/dashboard");

    return { success: true as const };
  } catch (error) {
    console.error("Update order status failed:", error);
    return fail("Could not update the order.");
  }
}

/* =========================================================
   ADMIN: PAYMENT
========================================================= */

export async function recordPayment(input: {
  orderId: number;
  amount: number;
  method: string;
  reference?: string;
}) {
  const staff = await requireStaff();

  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    return fail("Enter a valid amount.");
  }

  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    select: { id: true, total: true, amountPaid: true },
  });

  if (!order) {
    return fail("That order no longer exists.");
  }

  const paid = toNumber(order.amountPaid) + input.amount;
  const total = toNumber(order.total);

  try {
    await prisma.$transaction([
      prisma.payment.create({
        data: {
          orderId: order.id,
          amount: input.amount,
          method: input.method,
          reference: input.reference?.trim() || null,
          note: `Recorded by ${staff.name ?? staff.email}`,
        },
      }),
      prisma.order.update({
        where: { id: order.id },
        data: {
          amountPaid: paid,
          paymentStatus:
            paid >= total ? "Paid" : paid > 0 ? "Partial" : "Unpaid",
          paymentMethod: input.method,
        },
      }),
    ]);

    revalidatePath(`/orders/${order.id}`);
    revalidatePath("/orders");

    return { success: true as const };
  } catch (error) {
    console.error("Record payment failed:", error);
    return fail("Could not record the payment.");
  }
}

/* =========================================================
   ADMIN: TAILOR & DUE DATE
========================================================= */

export async function updateOrderTailoring(input: {
  orderId: number;
  assignedTailorId: string | null;
  dueDate: string | null;
  internalNotes?: string;
}) {
  await requireStaff();

  try {
    await prisma.order.update({
      where: { id: input.orderId },
      data: {
        assignedTailorId: input.assignedTailorId,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        internalNotes: input.internalNotes?.trim() || null,
      },
    });

    revalidatePath(`/orders/${input.orderId}`);
    revalidatePath("/tailoring");

    return { success: true as const };
  } catch (error) {
    console.error("Update tailoring failed:", error);
    return fail("Could not update the tailoring details.");
  }
}
