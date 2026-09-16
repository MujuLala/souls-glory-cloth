import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   SALES REPORT
========================================================= */

export async function getSalesReport(days = 30) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: since }, status: { not: "Cancelled" } },
    select: { total: true, createdAt: true, channel: true, type: true },
  });

  /* Bucket by day so the chart always has one point per day,
     even days with zero orders. */
  const byDay = new Map<string, number>();

  for (let i = 0; i < days; i += 1) {
    const date = new Date(since.getTime() + i * 86400000);
    byDay.set(date.toISOString().slice(0, 10), 0);
  }

  let totalRevenue = 0;

  for (const order of orders) {
    const key = order.createdAt.toISOString().slice(0, 10);
    const amount = toNumber(order.total);

    byDay.set(key, (byDay.get(key) ?? 0) + amount);
    totalRevenue += amount;
  }

  const byChannel = new Map<string, number>();
  const byType = new Map<string, number>();

  for (const order of orders) {
    byChannel.set(order.channel, (byChannel.get(order.channel) ?? 0) + 1);
    byType.set(order.type, (byType.get(order.type) ?? 0) + 1);
  }

  return {
    days: [...byDay.entries()].map(([date, revenue]) => ({ date, revenue })),
    totalRevenue,
    orderCount: orders.length,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    byChannel: [...byChannel.entries()].map(([channel, count]) => ({
      channel,
      count,
    })),
    byType: [...byType.entries()].map(([type, count]) => ({ type, count })),
  };
}

/* =========================================================
   PRODUCTS REPORT
========================================================= */

export async function getProductsReport() {
  const items = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: { productId: { not: null } },
    _sum: { quantity: true, total: true },
    orderBy: { _sum: { total: "desc" } },
    take: 10,
  });

  const productIds = items
    .map((item) => item.productId)
    .filter((id): id is number => id !== null);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, sku: true, stock: true, status: true },
  });

  const byId = new Map(products.map((product) => [product.id, product]));

  const topProducts = items
    .map((item) => {
      const product = item.productId ? byId.get(item.productId) : undefined;

      return {
        id: item.productId ?? 0,
        name: product?.name ?? "Deleted product",
        sku: product?.sku ?? "—",
        unitsSold: item._sum.quantity ?? 0,
        revenue: toNumber(item._sum.total),
        stock: product?.stock ?? 0,
      };
    })
    .filter((item) => item.id !== 0);

  const [totalProducts, activeProducts, categoryBreakdown] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "Active" } }),
      prisma.category.findMany({
        select: { name: true, _count: { select: { products: true } } },
        orderBy: { products: { _count: "desc" } },
        take: 8,
      }),
    ]);

  return {
    topProducts,
    totalProducts,
    activeProducts,
    categoryBreakdown: categoryBreakdown.map((category) => ({
      name: category.name,
      count: category._count.products,
    })),
  };
}

/* =========================================================
   CUSTOMERS REPORT
========================================================= */

export async function getCustomersReport() {
  const now = Date.now();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const [total, newThisMonth, repeat, topSpenders, byCity] =
    await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.customer.count({ where: { totalOrders: { gte: 2 } } }),
      prisma.customer.findMany({
        orderBy: { totalSpent: "desc" },
        take: 8,
        select: {
          id: true,
          fullName: true,
          totalSpent: true,
          totalOrders: true,
        },
      }),
      prisma.customer.groupBy({
        by: ["city"],
        _count: true,
        where: { city: { not: null } },
        orderBy: { _count: { city: "desc" } },
        take: 6,
      }),
    ]);

  return {
    total,
    newThisMonth,
    repeat,
    repeatRate: total > 0 ? (repeat / total) * 100 : 0,
    topSpenders: topSpenders.map((customer) => ({
      id: customer.id,
      name: customer.fullName,
      spent: toNumber(customer.totalSpent),
      orders: customer.totalOrders,
    })),
    byCity: byCity.map((row) => ({
      city: row.city ?? "Unknown",
      count: row._count,
    })),
  };
}

/* =========================================================
   INVENTORY REPORT
========================================================= */

export async function getInventoryReport() {
  const [totalValue, categories, lowStock, outOfStock] = await Promise.all([
    prisma.$queryRaw<[{ total: string | null }]>`
      SELECT SUM("price" * "stock")::text AS total
      FROM "Product" WHERE "trackInventory" = true
    `,
    prisma.category.findMany({
      select: {
        name: true,
        products: {
          where: { trackInventory: true },
          select: { stock: true, price: true },
        },
      },
    }),
    prisma.product.count({
      where: { trackInventory: true, stock: { gt: 0 } },
    }),
    prisma.product.count({
      where: { trackInventory: true, stock: { lte: 0 } },
    }),
  ]);

  return {
    totalValue: Number(totalValue[0]?.total ?? 0),
    lowStock,
    outOfStock,
    byCategory: categories
      .map((category) => ({
        name: category.name,
        units: category.products.reduce((sum, p) => sum + p.stock, 0),
        value: category.products.reduce(
          (sum, p) => sum + p.stock * toNumber(p.price),
          0,
        ),
      }))
      .filter((row) => row.units > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8),
  };
}
