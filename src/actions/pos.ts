"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { padCode, toNumber } from "@/lib/format";

function fail(error: string) {
  return { success: false as const, error };
}

/* =========================================================
   SESSION (register open / close)
========================================================= */

export async function openPosSession(openingFloat: number) {
  const staff = await requireStaff();

  const existing = await prisma.posSession.findFirst({
    where: { openedById: staff.id, status: "Open" },
    select: { id: true },
  });

  if (existing) {
    return { success: true as const, data: { id: existing.id } };
  }

  try {
    const session = await prisma.posSession.create({
      data: {
        code: `SES-${Date.now().toString(36).toUpperCase()}`,
        openedById: staff.id,
        openingFloat: Number.isFinite(openingFloat) ? openingFloat : 0,
      },
      select: { id: true },
    });

    revalidatePath("/pos");

    return { success: true as const, data: { id: session.id } };
  } catch (error) {
    console.error("Open POS session failed:", error);
    return fail("Could not open the register.");
  }
}

export async function closePosSession(input: {
  sessionId: number;
  countedTotal: number;
  notes?: string;
}) {
  await requireStaff();

  const session = await prisma.posSession.findUnique({
    where: { id: input.sessionId },
    include: { sales: { select: { total: true } } },
  });

  if (!session) {
    return fail("Session not found.");
  }

  const expectedTotal =
    toNumber(session.openingFloat) +
    session.sales.reduce((sum, sale) => sum + toNumber(sale.total), 0);

  try {
    await prisma.posSession.update({
      where: { id: session.id },
      data: {
        status: "Closed",
        expectedTotal,
        countedTotal: input.countedTotal,
        notes: input.notes?.trim() || null,
        closedAt: new Date(),
      },
    });

    revalidatePath("/pos");

    return {
      success: true as const,
      data: { expectedTotal, difference: input.countedTotal - expectedTotal },
    };
  } catch (error) {
    console.error("Close POS session failed:", error);
    return fail("Could not close the register.");
  }
}

/* =========================================================
   SALE
========================================================= */

export type PosCartLine = {
  productId: number;
  quantity: number;
};

export async function completeSale(input: {
  sessionId: number | null;
  customerId: number | null;
  lines: PosCartLine[];
  discount: number;
  paymentMethod: string;
  amountTendered: number;
}) {
  const staff = await requireStaff();

  if (input.lines.length === 0) {
    return fail("Add at least one item to the sale.");
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
    },
  });

  const byId = new Map(products.map((product) => [product.id, product]));

  const items: {
    productId: number;
    name: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    total: number;
  }[] = [];

  for (const line of input.lines) {
    const product = byId.get(line.productId);

    if (!product) {
      return fail("One of the items is no longer available.");
    }

    const quantity = Math.max(1, Math.floor(line.quantity));

    if (product.trackInventory && product.stock < quantity) {
      return fail(`${product.name} only has ${product.stock} left.`);
    }

    const unitPrice = toNumber(product.salePrice ?? product.price);

    items.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      unitPrice,
      quantity,
      total: unitPrice * quantity,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = Math.min(input.discount, subtotal);
  const total = subtotal - discount;
  const paid = Math.max(input.amountTendered, total);
  const change = paid - total;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber: `TMP-${Date.now()}`,
          customerId: input.customerId,
          type: "Ready Made",
          channel: "POS",
          status: "Completed",
          paymentStatus: "Paid",
          paymentMethod: input.paymentMethod,
          subtotal,
          discountTotal: discount,
          total,
          amountPaid: total,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              name: item.name,
              sku: item.sku,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              total: item.total,
            })),
          },
          events: {
            create: {
              status: "Completed",
              note: "Sold at POS",
              createdBy: staff.name ?? staff.email,
            },
          },
        },
        select: { id: true },
      });

      const orderNumber = padCode("SG", order.id + 1000, 5);

      await tx.order.update({
        where: { id: order.id },
        data: { orderNumber },
      });

      const sale = await tx.posSale.create({
        data: {
          saleNumber: padCode("POS", order.id + 1000, 5),
          sessionId: input.sessionId,
          orderId: order.id,
          customerId: input.customerId,
          subtotal,
          discount,
          total,
          paid,
          change,
          paymentMethod: input.paymentMethod,
          cashierId: staff.id,
          cashierName: staff.name ?? staff.email,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              name: item.name,
              sku: item.sku,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              total: item.total,
            })),
          },
        },
        select: { id: true, saleNumber: true },
      });

      for (const item of items) {
        await tx.product.updateMany({
          where: { id: item.productId, trackInventory: true },
          data: { stock: { decrement: item.quantity } },
        });
      }

      if (input.customerId) {
        await tx.customer.update({
          where: { id: input.customerId },
          data: {
            totalOrders: { increment: 1 },
            totalSpent: { increment: total },
            lastOrderAt: new Date(),
          },
        });
      }

      return { orderId: order.id, orderNumber, saleId: sale.id, saleNumber: sale.saleNumber };
    });

    revalidatePath("/pos");
    revalidatePath("/orders");
    revalidatePath("/inventory");
    revalidatePath("/dashboard");

    return {
      success: true as const,
      data: { ...result, total, paid, change },
    };
  } catch (error) {
    console.error("Complete sale failed:", error);
    return fail("Could not complete the sale.");
  }
}

/* =========================================================
   QUICK CUSTOMER LOOKUP / CREATE
========================================================= */

export async function findOrCreatePosCustomer(input: {
  phone: string;
  fullName?: string;
}) {
  await requireStaff();

  const phone = input.phone.trim();

  if (!phone) {
    return fail("Enter a phone number.");
  }

  try {
    const existing = await prisma.customer.findFirst({
      where: { phone },
      select: { id: true, fullName: true, phone: true },
    });

    if (existing) {
      return { success: true as const, data: existing };
    }

    if (!input.fullName?.trim()) {
      return fail("New customer — enter a name too.");
    }

    const created = await prisma.customer.create({
      data: {
        code: "TEMP",
        fullName: input.fullName.trim(),
        phone,
        source: "POS",
        members: {
          create: { fullName: input.fullName.trim(), relation: "Self", isPrimary: true },
        },
      },
      select: { id: true, fullName: true, phone: true },
    });

    await prisma.customer.update({
      where: { id: created.id },
      data: { code: padCode("SGC", created.id, 4) },
    });

    revalidatePath("/customers");

    return { success: true as const, data: created };
  } catch (error) {
    console.error("POS customer lookup failed:", error);
    return fail("Could not look up that customer.");
  }
}
