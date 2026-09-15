import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

/* =========================================================
   GET /api/chat/products?q=

   Product picker used inside chat, so a shopper (or an
   agent) can attach exactly what they're asking about.
========================================================= */

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const term = (url.searchParams.get("q") ?? "").trim();

    const products = await prisma.product.findMany({
      where: {
        status: { not: "Archived" },
        ...(term
          ? {
              OR: [
                { name: { contains: term, mode: "insensitive" as const } },
                { sku: { contains: term, mode: "insensitive" as const } },
              ],
            }
          : {}),
      },
      orderBy: term
        ? { name: "asc" }
        : [{ featured: "desc" }, { createdAt: "desc" }],
      take: 12,
      select: {
        id: true,
        name: true,
        slug: true,
        sku: true,
        price: true,
        salePrice: true,
        category: { select: { name: true } },
        images: {
          select: { imageUrl: true },
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
      },
    });

    return NextResponse.json({
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price: toNumber(product.salePrice ?? product.price),
        category: product.category?.name ?? null,
        image: product.images[0]?.imageUrl ?? null,
      })),
    });
  } catch (error) {
    console.error("Chat product search failed:", error);

    return NextResponse.json({ products: [] }, { status: 200 });
  }
}
