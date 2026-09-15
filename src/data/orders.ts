import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   ORDER READS (CMS)
========================================================= */

export type OrderRow = {
  id: number;
  orderNumber: string;
  customerName: string;
  customerId: number | null;
  status: string;
  paymentStatus: string;
  type: string;
  channel: string;
  total: number;
  amountPaid: number;
  itemCount: number;
  hasCustom: boolean;
  dueDate: string | null;
  assignedTailor: string | null;
  createdAt: string;
};

export async function listOrders(options: {
  status?: string;
  /* Several statuses at once, e.g. everything in flight. */
  statuses?: string[];
  paymentStatus?: string;
  channel?: string;
  search?: string;
  tailoringOnly?: boolean;
  page?: number;
  perPage?: number;
} = {}) {
  const page = Math.max(1, options.page ?? 1);
  const perPage = options.perPage ?? 25;
  const search = options.search?.trim();

  const where = {
    ...(options.statuses?.length
      ? { status: { in: options.statuses } }
      : options.status && options.status !== "All"
        ? { status: options.status }
        : {}),
    ...(options.paymentStatus ? { paymentStatus: options.paymentStatus } : {}),
    ...(options.channel ? { channel: options.channel } : {}),
    ...(options.tailoringOnly
      ? { items: { some: { isCustom: true } } }
      : {}),
    ...(search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: "insensitive" as const } },
            {
              shippingName: { contains: search, mode: "insensitive" as const },
            },
            {
              shippingPhone: { contains: search, mode: "insensitive" as const },
            },
            {
              customer: {
                fullName: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentStatus: true,
        type: true,
        channel: true,
        total: true,
        amountPaid: true,
        dueDate: true,
        createdAt: true,
        shippingName: true,
        customer: { select: { id: true, fullName: true } },
        assignedTailor: { select: { name: true, email: true } },
        items: { select: { quantity: true, isCustom: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: rows.map((row) => ({
      id: row.id,
      orderNumber: row.orderNumber,
      customerName:
        row.customer?.fullName ?? row.shippingName ?? "Walk-in customer",
      customerId: row.customer?.id ?? null,
      status: row.status,
      paymentStatus: row.paymentStatus,
      type: row.type,
      channel: row.channel,
      total: toNumber(row.total),
      amountPaid: toNumber(row.amountPaid),
      itemCount: row.items.reduce((sum, item) => sum + item.quantity, 0),
      hasCustom: row.items.some((item) => item.isCustom),
      dueDate: row.dueDate?.toISOString() ?? null,
      assignedTailor:
        row.assignedTailor?.name ?? row.assignedTailor?.email ?? null,
      createdAt: row.createdAt.toISOString(),
    })) satisfies OrderRow[],
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

/* =========================================================
   COUNTS
========================================================= */

export async function getOrderStats() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    all,
    pending,
    inTailoring,
    completed,
    cancelled,
    unpaid,
    revenue,
    todayRevenue,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "Pending" } }),
    prisma.order.count({ where: { status: "In Tailoring" } }),
    prisma.order.count({
      where: { status: { in: ["Completed", "Delivered"] } },
    }),
    prisma.order.count({ where: { status: "Cancelled" } }),
    prisma.order.count({ where: { paymentStatus: { in: ["Unpaid", "Partial"] } } }),
    prisma.order.aggregate({
      where: { status: { not: "Cancelled" } },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: { not: "Cancelled" },
        createdAt: { gte: startOfToday },
      },
      _sum: { total: true },
      _count: true,
    }),
  ]);

  return {
    all,
    pending,
    inTailoring,
    completed,
    cancelled,
    unpaid,
    revenue: toNumber(revenue._sum.total),
    todayRevenue: toNumber(todayRevenue._sum.total),
    todayCount: todayRevenue._count,
  };
}

/* =========================================================
   SINGLE ORDER
========================================================= */

export async function getOrderDetail(id: number) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: {
        select: { id: true, fullName: true, code: true, phone: true, email: true },
      },
      member: { select: { fullName: true, relation: true } },
      assignedTailor: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          member: { select: { fullName: true } },
          measurement: {
            select: {
              id: true,
              title: true,
              unit: true,
              values: true,
              template: { select: { name: true } },
            },
          },
        },
      },
      events: { orderBy: { createdAt: "desc" } },
      payments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!order) {
    return null;
  }

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    type: order.type,
    channel: order.channel,

    subtotal: toNumber(order.subtotal),
    discountTotal: toNumber(order.discountTotal),
    shippingTotal: toNumber(order.shippingTotal),
    taxTotal: toNumber(order.taxTotal),
    total: toNumber(order.total),
    amountPaid: toNumber(order.amountPaid),

    notes: order.notes,
    internalNotes: order.internalNotes,

    shippingName: order.shippingName,
    shippingPhone: order.shippingPhone,
    shippingAddress: order.shippingAddress,
    shippingCity: order.shippingCity,

    dueDate: order.dueDate?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),

    customer: order.customer,
    assignedTailorId: order.assignedTailor?.id ?? null,
    assignedTailor:
      order.assignedTailor?.name ?? order.assignedTailor?.email ?? null,

    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      sku: item.sku,
      image: item.image,
      size: item.size,
      color: item.color,
      fabric: item.fabric,
      quantity: item.quantity,
      unitPrice: toNumber(item.unitPrice),
      tailoringFee: toNumber(item.tailoringFee),
      total: toNumber(item.total),
      isCustom: item.isCustom,
      customNotes: item.customNotes,
      memberName: item.member?.fullName ?? null,
      measurement: item.measurement
        ? {
            id: item.measurement.id,
            title: item.measurement.title,
            unit: item.measurement.unit,
            templateName: item.measurement.template.name,
            values: (item.measurement.values ?? {}) as Record<
              string,
              string | number
            >,
          }
        : null,
    })),

    events: order.events.map((event) => ({
      id: event.id,
      status: event.status,
      note: event.note,
      createdBy: event.createdBy,
      createdAt: event.createdAt.toISOString(),
    })),

    payments: order.payments.map((payment) => ({
      id: payment.id,
      amount: toNumber(payment.amount),
      method: payment.method,
      reference: payment.reference,
      createdAt: payment.createdAt.toISOString(),
    })),
  };
}

export type OrderDetail = NonNullable<
  Awaited<ReturnType<typeof getOrderDetail>>
>;
