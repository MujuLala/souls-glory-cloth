"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { slugify } from "@/lib/format";

/* =========================================================
   CSV IMPORT

   Rows are matched on SKU: an existing SKU is updated, a new
   one is created. Categories, collections and tags named in
   the file are created on demand so an import doesn't fail
   just because a lookup row is missing.
========================================================= */

export type ImportRow = Record<string, string>;

export type ImportSummary = {
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; message: string }[];
};

function num(value: string | undefined, fallback = 0): number {
  if (!value?.trim()) {
    return fallback;
  }

  const parsed = Number(value.replace(/[^0-9.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : fallback;
}

function list(value: string | undefined): string[] {
  return (value ?? "")
    .split(/[|,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

async function ensureCategory(name: string) {
  const slug = slugify(name);

  const existing = await prisma.category.findUnique({ where: { slug } });

  if (existing) {
    return existing.id;
  }

  const created = await prisma.category.create({ data: { name, slug } });

  return created.id;
}

async function ensureCollection(name: string) {
  const slug = slugify(name);

  const existing = await prisma.collection.findUnique({ where: { slug } });

  if (existing) {
    return existing.id;
  }

  const created = await prisma.collection.create({ data: { name, slug } });

  return created.id;
}

async function ensureTags(names: string[]) {
  const ids: number[] = [];

  for (const name of names) {
    const slug = slugify(name);

    const existing = await prisma.tag.findUnique({ where: { slug } });

    if (existing) {
      ids.push(existing.id);
      continue;
    }

    const created = await prisma.tag.create({ data: { name, slug } });

    ids.push(created.id);
  }

  return ids;
}

export async function importProducts(rows: ImportRow[]) {
  await requireStaff();

  const summary: ImportSummary = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  if (rows.length === 0) {
    return { success: false as const, error: "The file had no rows." };
  }

  if (rows.length > 1000) {
    return {
      success: false as const,
      error: "Import up to 1000 rows at a time.",
    };
  }

  for (const [index, row] of rows.entries()) {
    const lineNumber = index + 2;

    try {
      const sku = row.sku?.trim();
      const name = row.name?.trim();

      if (!sku || !name) {
        summary.skipped += 1;
        summary.errors.push({
          row: lineNumber,
          message: "Both sku and name are required.",
        });
        continue;
      }

      const categoryId = row.category?.trim()
        ? await ensureCategory(row.category.trim())
        : null;

      const collectionId = row.collection?.trim()
        ? await ensureCollection(row.collection.trim())
        : null;

      const tagIds = await ensureTags(list(row.tags));

      const price = num(row.price);
      const sizes = list(row.sizes);
      const colors = list(row.colors);
      const image = row.image?.trim();

      const base = {
        name,
        slug: row.slug?.trim() || slugify(name),
        description: row.description?.trim() || null,
        price,
        salePrice: row.salePrice?.trim() ? num(row.salePrice) : null,
        costPrice: row.costPrice?.trim() ? num(row.costPrice) : null,
        stock: num(row.stock),
        lowStockThreshold: num(row.lowStockThreshold, 10),
        status: row.status?.trim() || "Draft",
        badge: row.badge?.trim() || null,
        featured: /^(yes|true|1)$/i.test(row.featured ?? ""),
        categoryId,
        collectionId,
      };

      const existing = await prisma.product.findUnique({
        where: { sku },
        select: { id: true },
      });

      if (existing) {
        await prisma.$transaction([
          prisma.productSize.deleteMany({ where: { productId: existing.id } }),
          prisma.productColor.deleteMany({ where: { productId: existing.id } }),
          prisma.productTag.deleteMany({ where: { productId: existing.id } }),
          prisma.product.update({
            where: { id: existing.id },
            data: {
              ...base,
              sizes: { create: sizes.map((size) => ({ size })) },
              colors: { create: colors.map((color) => ({ color })) },
              tags: { create: tagIds.map((tagId) => ({ tagId })) },
            },
          }),
        ]);

        summary.updated += 1;
      } else {
        await prisma.product.create({
          data: {
            ...base,
            sku,
            sizes: { create: sizes.map((size) => ({ size })) },
            colors: { create: colors.map((color) => ({ color })) },
            tags: { create: tagIds.map((tagId) => ({ tagId })) },
            images: image
              ? { create: [{ imageUrl: image, sortOrder: 0 }] }
              : undefined,
          },
        });

        summary.created += 1;
      }
    } catch (error) {
      console.error(`Import row ${lineNumber} failed:`, error);

      summary.skipped += 1;
      summary.errors.push({
        row: lineNumber,
        message:
          (error as { code?: string })?.code === "P2002"
            ? "A product with that slug already exists."
            : "Could not import this row.",
      });
    }
  }

  revalidatePath("/products");
  revalidatePath("/inventory");

  return { success: true as const, data: summary };
}
