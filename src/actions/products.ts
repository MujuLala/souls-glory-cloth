"use server";

import { prisma } from "@/lib/prisma";

export type CreateProductInput = {
  name: string;
  slug: string;
  sku: string;
  description?: string;

  price: number;
  salePrice?: number;
  costPrice?: number;
  compareAtPrice?: number;

  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;

  status: string;
  badge?: string;

  categoryId?: number;
  collectionId?: number;
  subcategory?: string;

  images: {
    imageUrl: string;
    isHover?: boolean;
  }[];

  variants: {
    name: string;
    sku: string;
    price: number;
    stock: number;
  }[];

  sizes: string[];
  colors: string[];
  tagIds: number[];
};

/* =========================================
   GET CATEGORIES
========================================= */

export async function getProductCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return {
      success: true as const,
      categories,
    };
  } catch (error) {
    console.error("Get categories error:", error);

    return {
      success: false as const,
      categories: [],
      error: "Failed to load categories.",
    };
  }
}

/* =========================================
   GET COLLECTIONS
========================================= */

export async function getProductCollections() {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return {
      success: true as const,
      collections,
    };
  } catch (error) {
    console.error("Get collections error:", error);

    return {
      success: false as const,
      collections: [],
      error: "Failed to load collections.",
    };
  }
}

/* =========================================
   CREATE PRODUCT
========================================= */

export async function createProduct(input: CreateProductInput) {
  try {
    /* -----------------------------------------
       VALIDATE CATEGORY
    ------------------------------------------ */

    let validCategoryId: number | null = null;

    if (input.categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: {
          id: input.categoryId,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!category) {
        return {
          success: false as const,
          error: `Category with ID ${input.categoryId} does not exist.`,
        };
      }

      if (category.status !== "Active") {
        return {
          success: false as const,
          error: "Selected category is not active.",
        };
      }

      validCategoryId = category.id;
    }

    /* -----------------------------------------
       VALIDATE COLLECTION
    ------------------------------------------ */

    let validCollectionId: number | null = null;

    if (input.collectionId !== undefined) {
      const collection = await prisma.collection.findUnique({
        where: {
          id: input.collectionId,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!collection) {
        return {
          success: false as const,
          error: `Collection with ID ${input.collectionId} does not exist.`,
        };
      }

      if (collection.status !== "Active") {
        return {
          success: false as const,
          error: "Selected collection is not active.",
        };
      }

      validCollectionId = collection.id;
    }

    /* -----------------------------------------
       CREATE PRODUCT
    ------------------------------------------ */

    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug,
        sku: input.sku,

        description: input.description || null,

        price: input.price,
        salePrice: input.salePrice ?? null,
        costPrice: input.costPrice ?? null,
        compareAtPrice: input.compareAtPrice ?? null,

        stock: input.stock,
        lowStockThreshold: input.lowStockThreshold,
        trackInventory: input.trackInventory,

        status: input.status,
        badge: input.badge || null,

        categoryId: validCategoryId,
        collectionId: validCollectionId,

        subcategory: input.subcategory || null,

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

        sizes: {
          create: input.sizes.map((size) => ({
            size,
          })),
        },

        colors: {
          create: input.colors.map((color) => ({
            color,
          })),
        },

        tags: {
          create: input.tagIds.map((tagId) => ({
            tagId,
          })),
        },
      },

      include: {
        images: true,
        variants: true,
        sizes: true,
        colors: true,
        tags: {
          include: {
            tag: true,
          },
        },
        category: true,
        collection: true,
      },
    });

    return {
      success: true as const,
      product,
    };
  } catch (error) {
    console.error("Create product error:", error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create product.",
    };
  }
}