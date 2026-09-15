import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   DASHBOARD OVERVIEW
========================================================= */

function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / previous) * 100;
}

export async function getDashboardOverview() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    revenueThisMonth,
    revenueLastMonth,
    ordersThisMonth,
    ordersLastMonth,
    customersThisMonth,
    customersLastMonth,
    productsInStock,
    lowStock,
    pendingOrders,
    inTailoring,
    unreadChats,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfMonth }, status: { not: "Cancelled" } },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startOfLastMonth, lt: startOfMonth },
        status: { not: "Cancelled" },
      },
      _sum: { total: true },
    }),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.count({
      where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
    }),
    prisma.customer.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.customer.count({
      where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
    }),
    prisma.product.count({ where: { status: "Active" } }),
    prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*)::bigint AS count FROM "Product"
      WHERE "trackInventory" = true AND "stock" > 0 AND "stock" <= "lowStockThreshold"
    `,
    prisma.order.count({ where: { status: "Pending" } }),
    prisma.order.count({ where: { status: "In Tailoring" } }),
    prisma.conversation.count({
      where: { unreadForAdmin: { gt: 0 }, status: { in: ["Open", "Pending"] } },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        total: true,
        createdAt: true,
        customer: { select: { fullName: true } },
        shippingName: true,
      },
    }),
    prisma.product.findMany({
      where: { trackInventory: true, stock: { gt: 0 } },
      orderBy: { stock: "asc" },
      take: 5,
      select: { id: true, name: true, stock: true, lowStockThreshold: true },
    }),
  ]);

  const revenue = toNumber(revenueThisMonth._sum.total);
  const previousRevenue = toNumber(revenueLastMonth._sum.total);

  return {
    revenue,
    revenueChange: percentChange(revenue, previousRevenue),
    orders: ordersThisMonth,
    ordersChange: percentChange(ordersThisMonth, ordersLastMonth),
    newCustomers: customersThisMonth,
    customersChange: percentChange(customersThisMonth, customersLastMonth),
    productsInStock,
    lowStockCount: Number(lowStock[0]?.count ?? 0),
    pendingOrders,
    inTailoring,
    unreadChats,
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customer?.fullName ?? order.shippingName ?? "Walk-in",
      status: order.status,
      total: toNumber(order.total),
      createdAt: order.createdAt.toISOString(),
    })),
    lowStockProducts: lowStockProducts
      .filter((product) => product.stock <= product.lowStockThreshold)
      .map((product) => ({
        id: product.id,
        name: product.name,
        stock: product.stock,
        threshold: product.lowStockThreshold,
      })),
  };
}
