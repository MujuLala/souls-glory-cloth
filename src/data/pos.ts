import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

export type PosProduct = {
  id: number;
  name: string;
  sku: string;
  price: number;
  image: string | null;
  stock: number;
  trackInventory: boolean;
  category: string | null;
};

export async function getPosProducts(): Promise<PosProduct[]> {
  const products = await prisma.product.findMany({
    where: { status: "Active" },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    take: 200,
    select: {
      id: true,
      name: true,
      sku: true,
      price: true,
      salePrice: true,
      stock: true,
      trackInventory: true,
      category: { select: { name: true } },
      images: {
        select: { imageUrl: true },
        orderBy: { sortOrder: "asc" },
        take: 1,
      },
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: toNumber(product.salePrice ?? product.price),
    image: product.images[0]?.imageUrl ?? null,
    stock: product.stock,
    trackInventory: product.trackInventory,
    category: product.category?.name ?? null,
  }));
}

export async function getOpenPosSession(staffId: string) {
  const session = await prisma.posSession.findFirst({
    where: { openedById: staffId, status: "Open" },
    include: {
      sales: { select: { total: true } },
    },
  });

  if (!session) {
    return null;
  }

  return {
    id: session.id,
    code: session.code,
    openingFloat: toNumber(session.openingFloat),
    openedAt: session.openedAt.toISOString(),
    saleCount: session.sales.length,
    salesTotal: session.sales.reduce((sum, sale) => sum + toNumber(sale.total), 0),
  };
}

export async function getRecentPosSales(sessionId: number | null, limit = 10) {
  const sales = await prisma.posSale.findMany({
    where: sessionId ? { sessionId } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { customer: { select: { fullName: true } } },
  });

  return sales.map((sale) => ({
    id: sale.id,
    saleNumber: sale.saleNumber,
    customerName: sale.customer?.fullName ?? "Walk-in",
    total: toNumber(sale.total),
    paymentMethod: sale.paymentMethod,
    createdAt: sale.createdAt.toISOString(),
  }));
}
