import { prisma } from "@/lib/prisma";
import { getCurrentUser, isStaff } from "@/lib/session";
import { toNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

const columns = [
  "sku",
  "name",
  "slug",
  "description",
  "category",
  "collection",
  "price",
  "salePrice",
  "costPrice",
  "stock",
  "lowStockThreshold",
  "status",
  "badge",
  "featured",
  "sizes",
  "colors",
  "tags",
  "image",
] as const;

/** RFC-4180 escaping: quote the field and double any quotes. */
function cell(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);

  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user || !isStaff(user.role)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      collection: { select: { name: true } },
      sizes: true,
      colors: true,
      tags: { include: { tag: true } },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
  });

  const lines = [columns.join(",")];

  for (const product of products) {
    lines.push(
      [
        product.sku,
        product.name,
        product.slug,
        product.description ?? "",
        product.category?.name ?? "",
        product.collection?.name ?? "",
        toNumber(product.price),
        product.salePrice ? toNumber(product.salePrice) : "",
        product.costPrice ? toNumber(product.costPrice) : "",
        product.stock,
        product.lowStockThreshold,
        product.status,
        product.badge ?? "",
        product.featured ? "yes" : "no",
        product.sizes.map((size) => size.size).join("|"),
        product.colors.map((color) => color.color).join("|"),
        product.tags.map((tag) => tag.tag.name).join("|"),
        product.images[0]?.imageUrl ?? "",
      ]
        .map(cell)
        .join(","),
    );
  }

  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="products-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
