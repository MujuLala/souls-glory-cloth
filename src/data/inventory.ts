import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   INVENTORY READS
========================================================= */

export type StockRow = {
  id: number;
  name: string;
  sku: string;
  image: string | null;
  category: string | null;
  stock: number;
  lowStockThreshold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  price: number;
  value: number;
  trackInventory: boolean;
};

function statusOf(stock: number, threshold: number): StockRow["status"] {
  if (stock <= 0) return "Out of Stock";
  return stock <= threshold ? "Low Stock" : "In Stock";
}

export async function listStock(options: {
  filter?: "all" | "low" | "out" | "tracked";
  search?: string;
  page?: number;
  perPage?: number;
} = {}) {
  const page = Math.max(1, options.page ?? 1);
  const perPage = options.perPage ?? 25;
  const search = options.search?.trim();

  const where = {
    trackInventory: true,
    ...(options.filter === "out" ? { stock: { lte: 0 } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { sku: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { stock: "asc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        sku: true,
        stock: true,
        lowStockThreshold: true,
        price: true,
        trackInventory: true,
        category: { select: { name: true } },
        images: {
          select: { imageUrl: true },
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  let stock: StockRow[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    sku: row.sku,
    image: row.images[0]?.imageUrl ?? null,
    category: row.category?.name ?? null,
    stock: row.stock,
    lowStockThreshold: row.lowStockThreshold,
    status: statusOf(row.stock, row.lowStockThreshold),
    price: toNumber(row.price),
    value: toNumber(row.price) * row.stock,
    trackInventory: row.trackInventory,
  }));

  if (options.filter === "low") {
    stock = stock.filter((row) => row.status === "Low Stock");
  }

  return {
    stock,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getInventoryStats() {
  const [tracked, outOfStock, valueAgg, lowStock] = await Promise.all([
    prisma.product.count({ where: { trackInventory: true } }),
    prisma.product.count({ where: { trackInventory: true, stock: { lte: 0 } } }),
    prisma.product.aggregate({
      where: { trackInventory: true },
      _sum: { stock: true },
    }),
    prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*)::bigint AS count
      FROM "Product"
      WHERE "trackInventory" = true AND "stock" > 0 AND "stock" <= "lowStockThreshold"
    `,
  ]);

  const inventoryValue = await prisma.$queryRaw<[{ total: string | null }]>`
    SELECT SUM("price" * "stock")::text AS total
    FROM "Product"
    WHERE "trackInventory" = true
  `;

  return {
    tracked,
    outOfStock,
    lowStock: Number(lowStock[0]?.count ?? 0),
    unitsInStock: valueAgg._sum.stock ?? 0,
    inventoryValue: Number(inventoryValue[0]?.total ?? 0),
  };
}

/* =========================================================
   ADJUSTMENT HISTORY
========================================================= */

export type AdjustmentRow = {
  id: number;
  productName: string;
  productSku: string;
  type: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string | null;
  createdBy: string | null;
  createdAt: string;
};

export async function listAdjustments(limit = 100) {
  const rows = await prisma.stockAdjustment.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { product: { select: { name: true, sku: true } } },
  });

  return rows.map((row) => ({
    id: row.id,
    productName: row.product.name,
    productSku: row.product.sku,
    type: row.type,
    quantity: row.quantity,
    previousStock: row.previousStock,
    newStock: row.newStock,
    reason: row.reason,
    createdBy: row.createdBy,
    createdAt: row.createdAt.toISOString(),
  })) satisfies AdjustmentRow[];
}
