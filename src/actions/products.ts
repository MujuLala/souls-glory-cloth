"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { slugify } from "@/lib/format";

/* =========================================================
   TYPES
========================================================= */

export type ProductInput = {
  name: string;
  slug: string;
  sku: string;
  description?: string;

  price: number;
  salePrice?: number | null;
  costPrice?: number | null;
  compareAtPrice?: number | null;

  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;

  status: string;
  badge?: string;
  featured?: boolean;

  categoryId?: number | null;
  collectionId?: number | null;
  subcategory?: string;

  images: { imageUrl: string; isHover?: boolean }[];
  variants: { name: string; sku: string; price: number; stock: number }[];

  sizes: string[];
  colors: string[];
  tagIds: number[];
};

export type ActionResult<T = undefined> =
  | ({ success: true } & (T extends undefined ? object : { data: T }))
  | { success: false; error: string };

function fail(error: string) {
  return { success: false as const, error };
}

/* =========================================================
   VALIDATION
========================================================= */

function validate(input: ProductInput): string | null {
  if (!input.name.trim()) {
    return "Product name is required.";
  }

  if (!input.sku.trim()) {
    return "SKU is required.";
  }

  if (!Number.isFinite(input.price) || input.price < 0) {
    return "Enter a valid price.";
  }

  if (
    input.salePrice !== null &&
    input.salePrice !== undefined &&
    input.salePrice > input.price
  ) {
    return "Sale price cannot be higher than the regular price.";
  }

  if (!Number.isFinite(input.stock) || input.stock < 0) {
    return "Stock cannot be negative.";
  }

  const variantSkus = input.variants.map((variant) => variant.sku.trim());

  if (new Set(variantSkus).size !== variantSkus.length) {
    return "Each variant needs its own unique SKU.";
  }

  return null;
}

/** Make sure a category/collection id points at a real row. */
async function resolveRelation(
  kind: "category" | "collection",
  id: number | null | undefined,
): Promise<{ ok: true; id: number | null } | { ok: false; error: string }> {
  if (!id) {
    return { ok: true, id: null };
  }

  const row =
    kind === "category"
      ? await prisma.category.findUnique({ where: { id }, select: { id: true } })
      : await prisma.collection.findUnique({
          where: { id },
          select: { id: true },
        });

  if (!row) {
    return { ok: false, error: `The selected ${kind} no longer exists.` };
  }

  return { ok: true, id: row.id };
}

function refreshProductPages(id?: number) {
  revalidatePath("/products");
  revalidatePath("/inventory");
  revalidatePath("/dashboard");

  if (id) {
    revalidatePath(`/products/${id}`);
  }
}

/* =========================================================
   CREATE
========================================================= */

export async function createProduct(input: ProductInput) {
  await requireStaff();

  const invalid = validate(input);

  if (invalid) {
    return fail(invalid);
  }

  const category = await resolveRelation("category", input.categoryId);

  if (!category.ok) {
    return fail(category.error);
  }

  const collection = await resolveRelation("collection", input.collectionId);

  if (!collection.ok) {
    return fail(collection.error);
  }

  const slug = input.slug.trim() || slugify(input.name);

  try {
    const product = await prisma.product.create({
      data: {
        name: input.name.trim(),
        slug,
        sku: input.sku.trim(),
        description: input.description?.trim() || null,

        price: input.price,
        salePrice: input.salePrice ?? null,
        costPrice: input.costPrice ?? null,
        compareAtPrice: input.compareAtPrice ?? null,

        stock: input.stock,
        lowStockThreshold: input.lowStockThreshold,
        trackInventory: input.trackInventory,

        status: input.status,
        badge: input.badge?.trim() || null,
        featured: input.featured ?? false,

        categoryId: category.id,
        collectionId: collection.id,
        subcategory: input.subcategory?.trim() || null,

        images: {
          create: input.images.map((image, index) => ({
            imageUrl: image.imageUrl,
            sortOrder: index,
            isHover: image.isHover ?? false,
          })),
        },

        variants: {
          create: input.variants.map((variant) => ({
            name: variant.name,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
          })),
        },

        sizes: { create: input.sizes.map((size) => ({ size })) },
        colors: { create: input.colors.map((color) => ({ color })) },
        tags: { create: input.tagIds.map((tagId) => ({ tagId })) },
      },
      select: { id: true },
    });

    refreshProductPages(product.id);

    return { success: true as const, data: { id: product.id } };
  } catch (error) {
    return fail(describeWriteError(error, "create"));
  }
}

/* =========================================================
   UPDATE
========================================================= */

export async function updateProduct(id: number, input: ProductInput) {
  await requireStaff();

  const invalid = validate(input);

  if (invalid) {
    return fail(invalid);
  }

  const category = await resolveRelation("category", input.categoryId);

  if (!category.ok) {
    return fail(category.error);
  }

  const collection = await resolveRelation("collection", input.collectionId);

  if (!collection.ok) {
    return fail(collection.error);
  }

  try {
    /* Child rows are replaced wholesale — simpler and safer
       than diffing images/sizes/colours/tags by hand. */
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.productSize.deleteMany({ where: { productId: id } }),
      prisma.productColor.deleteMany({ where: { productId: id } }),
      prisma.productTag.deleteMany({ where: { productId: id } }),
      prisma.productVariant.deleteMany({ where: { productId: id } }),

      prisma.product.update({
        where: { id },
        data: {
          name: input.name.trim(),
          slug: input.slug.trim() || slugify(input.name),
          sku: input.sku.trim(),
          description: input.description?.trim() || null,

          price: input.price,
          salePrice: input.salePrice ?? null,
          costPrice: input.costPrice ?? null,
          compareAtPrice: input.compareAtPrice ?? null,

          stock: input.stock,
          lowStockThreshold: input.lowStockThreshold,
          trackInventory: input.trackInventory,

          status: input.status,
          badge: input.badge?.trim() || null,
          featured: input.featured ?? false,

          categoryId: category.id,
          collectionId: collection.id,
          subcategory: input.subcategory?.trim() || null,

          images: {
            create: input.images.map((image, index) => ({
              imageUrl: image.imageUrl,
              sortOrder: index,
              isHover: image.isHover ?? false,
            })),
          },

          variants: {
            create: input.variants.map((variant) => ({
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock,
            })),
          },

          sizes: { create: input.sizes.map((size) => ({ size })) },
          colors: { create: input.colors.map((color) => ({ color })) },
          tags: { create: input.tagIds.map((tagId) => ({ tagId })) },
        },
      }),
    ]);

    refreshProductPages(id);

    return { success: true as const, data: { id } };
  } catch (error) {
    return fail(describeWriteError(error, "update"));
  }
}

/* =========================================================
   STATUS / FEATURED / DELETE
========================================================= */

export async function setProductStatus(ids: number[], status: string) {
  await requireStaff();

  if (ids.length === 0) {
    return fail("Select at least one product.");
  }

  try {
    await prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });

    refreshProductPages();

    return { success: true as const };
  } catch (error) {
    console.error("Set product status failed:", error);
    return fail("Could not update the selected products.");
  }
}

export async function toggleProductFeatured(id: number, featured: boolean) {
  await requireStaff();

  try {
    await prisma.product.update({ where: { id }, data: { featured } });

    refreshProductPages(id);

    return { success: true as const };
  } catch (error) {
    console.error("Toggle featured failed:", error);
    return fail("Could not update the product.");
  }
}

export async function deleteProducts(ids: number[]) {
  await requireStaff();

  if (ids.length === 0) {
    return fail("Select at least one product.");
  }

  try {
    await prisma.product.deleteMany({ where: { id: { in: ids } } });

    refreshProductPages();

    return { success: true as const };
  } catch (error) {
    console.error("Delete products failed:", error);
    return fail("Could not delete the selected products.");
  }
}

/* =========================================================
   STOCK
========================================================= */

export async function adjustStock(input: {
  productId: number;
  type: "Add" | "Remove" | "Recount" | "Damaged" | "Returned";
  quantity: number;
  reason?: string;
}) {
  const staff = await requireStaff();

  if (!Number.isFinite(input.quantity) || input.quantity < 0) {
    return fail("Enter a valid quantity.");
  }

  const product = await prisma.product.findUnique({
    where: { id: input.productId },
    select: { id: true, stock: true },
  });

  if (!product) {
    return fail("That product no longer exists.");
  }

  const previousStock = product.stock;

  const newStock =
    input.type === "Recount"
      ? input.quantity
      : input.type === "Add" || input.type === "Returned"
        ? previousStock + input.quantity
        : previousStock - input.quantity;

  if (newStock < 0) {
    return fail("That would push stock below zero.");
  }

  try {
    await prisma.$transaction([
      prisma.product.update({
        where: { id: product.id },
        data: { stock: newStock },
      }),
      prisma.stockAdjustment.create({
        data: {
          productId: product.id,
          type: input.type,
          quantity: input.quantity,
          previousStock,
          newStock,
          reason: input.reason?.trim() || null,
          createdBy: staff.name ?? staff.email,
        },
      }),
    ]);

    refreshProductPages(product.id);
    revalidatePath("/inventory/adjustments");

    return { success: true as const };
  } catch (error) {
    console.error("Stock adjustment failed:", error);
    return fail("Could not record the adjustment.");
  }
}

/* =========================================================
   ERRORS
========================================================= */

function describeWriteError(error: unknown, verb: "create" | "update") {
  console.error(`Product ${verb} failed:`, error);

  const code = (error as { code?: string })?.code;

  if (code === "P2002") {
    const target = (error as { meta?: { target?: string[] } })?.meta?.target;
    const field = target?.[0] ?? "value";

    return `That ${field} is already used by another product.`;
  }

  if (code === "P2025") {
    return "That product no longer exists.";
  }

  return `Could not ${verb} the product. Please try again.`;
}

/* =========================================================
   PICKER DATA (client components call these)
========================================================= */

export async function getProductCategories() {
  const categories = await prisma.category.findMany({
    where: { status: "Active" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return { success: true as const, categories };
}

export async function getProductCollections() {
  const collections = await prisma.collection.findMany({
    where: { status: "Active" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return { success: true as const, collections };
}
