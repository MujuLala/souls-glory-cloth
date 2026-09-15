import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   PRODUCT READS

   Used directly by server components. Everything is mapped
   to plain JSON (Decimal → number) before it crosses into a
   client component.
========================================================= */

export type ProductRow = {
  id: number;
  name: string;
  sku: string;
  slug: string;
  category: string | null;
  collection: string | null;
  price: number;
  salePrice: number | null;
  stock: number;
  lowStockThreshold: number;
  status: string;
  /* Derived from stock, so the table shows the truth rather
     than a status someone forgot to update. */
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  featured: boolean;
  image: string | null;
  createdAt: string;
};

export type ProductFilter = {
  search?: string;
  status?: string;
  categoryId?: number;
  /* "low" | "out" narrow by stock rather than status. */
  stock?: "low" | "out";
  page?: number;
  perPage?: number;
  sort?: "newest" | "oldest" | "name" | "price-high" | "price-low" | "stock";
};

export const PRODUCTS_PER_PAGE = 20;

function stockStatusOf(
  stock: number,
  threshold: number,
): ProductRow["stockStatus"] {
  if (stock <= 0) {
    return "Out of Stock";
  }

  return stock <= threshold ? "Low Stock" : "In Stock";
}

function orderByFor(sort: ProductFilter["sort"]) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };
    case "name":
      return { name: "asc" as const };
    case "price-high":
      return { price: "desc" as const };
    case "price-low":
      return { price: "asc" as const };
    case "stock":
      return { stock: "asc" as const };
    default:
      return { createdAt: "desc" as const };
  }
}

export async function listProducts(filter: ProductFilter = {}) {
  const page = Math.max(1, filter.page ?? 1);
  const perPage = filter.perPage ?? PRODUCTS_PER_PAGE;

  const search = filter.search?.trim();

  const where = {
    ...(filter.status && filter.status !== "All"
      ? { status: filter.status }
      : {}),
    ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
    ...(filter.stock === "out" ? { stock: { lte: 0 } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { sku: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: orderByFor(filter.sort),
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        sku: true,
        slug: true,
        price: true,
        salePrice: true,
        stock: true,
        lowStockThreshold: true,
        status: true,
        featured: true,
        createdAt: true,
        category: { select: { name: true } },
        collection: { select: { name: true } },
        images: {
          select: { imageUrl: true },
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  let products: ProductRow[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    sku: row.sku,
    slug: row.slug,
    category: row.category?.name ?? null,
    collection: row.collection?.name ?? null,
    price: toNumber(row.price),
    salePrice: row.salePrice ? toNumber(row.salePrice) : null,
    stock: row.stock,
    lowStockThreshold: row.lowStockThreshold,
    status: row.status,
    stockStatus: stockStatusOf(row.stock, row.lowStockThreshold),
    featured: row.featured,
    image: row.images[0]?.imageUrl ?? null,
    createdAt: row.createdAt.toISOString(),
  }));

  /* "Low stock" compares two columns, which Prisma can't do
     in a where clause, so it is filtered after the query. */
  if (filter.stock === "low") {
    products = products.filter((row) => row.stockStatus === "Low Stock");
  }

  return {
    products,
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

/* =========================================================
   COUNTS FOR THE STATUS TABS
========================================================= */

export async function getProductCounts() {
  const [all, active, draft, archived, outOfStock, lowStock] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "Active" } }),
      prisma.product.count({ where: { status: "Draft" } }),
      prisma.product.count({ where: { status: "Archived" } }),
      prisma.product.count({ where: { stock: { lte: 0 } } }),
      prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*)::bigint AS count
        FROM "Product"
        WHERE "stock" > 0 AND "stock" <= "lowStockThreshold"
      `,
    ]);

  return {
    all,
    active,
    draft,
    archived,
    outOfStock,
    lowStock: Number(lowStock[0]?.count ?? 0),
  };
}

/* =========================================================
   SINGLE PRODUCT (edit form)
========================================================= */

export async function getProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
      sizes: true,
      colors: true,
      tags: { include: { tag: true } },
      category: true,
      collection: true,
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    slug: product.slug,
    description: product.description ?? "",
    price: toNumber(product.price),
    salePrice: product.salePrice ? toNumber(product.salePrice) : null,
    costPrice: product.costPrice ? toNumber(product.costPrice) : null,
    compareAtPrice: product.compareAtPrice
      ? toNumber(product.compareAtPrice)
      : null,
    stock: product.stock,
    lowStockThreshold: product.lowStockThreshold,
    trackInventory: product.trackInventory,
    status: product.status,
    badge: product.badge ?? "",
    featured: product.featured,
    categoryId: product.categoryId,
    collectionId: product.collectionId,
    subcategory: product.subcategory ?? "",
    images: product.images.map((image) => ({
      imageUrl: image.imageUrl,
      isHover: image.isHover,
    })),
    variants: product.variants.map((variant) => ({
      name: variant.name,
      sku: variant.sku,
      price: toNumber(variant.price),
      stock: variant.stock,
    })),
    sizes: product.sizes.map((size) => size.size),
    colors: product.colors.map((color) => color.color),
    tagIds: product.tags.map((tag) => tag.tagId),
  };
}

export type ProductFormValues = NonNullable<
  Awaited<ReturnType<typeof getProduct>>
>;

/* =========================================================
   PICKERS
========================================================= */

export async function getCatalogOptions() {
  const [categories, collections, tags] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, status: true },
    }),
    prisma.collection.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, status: true },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  return { categories, collections, tags };
}
