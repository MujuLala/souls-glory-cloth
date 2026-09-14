"use server";

import { prisma } from "@/lib/prisma";

export type CreateProductInput = {
  name: string;
  slug: string;
  sku: string;
  description?: string;

  // Pricing
  price: number;
  salePrice?: number;
  costPrice?: number;
  compareAtPrice?: number;

  // Inventory
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

export async function createProduct(input: CreateProductInput) {
  try {
    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug,
        sku: input.sku,
        description: input.description || null,

        // Pricing
        price: input.price,
        salePrice: input.salePrice ?? null,
        costPrice: input.costPrice ?? null,
        compareAtPrice: input.compareAtPrice ?? null,

        // Inventory
        stock: input.stock,
        lowStockThreshold: input.lowStockThreshold,
        trackInventory: input.trackInventory,

        // Product status
        status: input.status,
        badge: input.badge || null,

        // Organization
        categoryId: input.categoryId || null,
        collectionId: input.collectionId || null,
        subcategory: input.subcategory || null,

        // Images
        images: {
          create: input.images.map((image, index) => ({
            imageUrl: image.imageUrl,
            sortOrder: index,
            isHover: image.isHover ?? false,
          })),
        },

        // Variants
        variants: {
          create: input.variants.map((variant) => ({
            name: variant.name,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
          })),
        },

        // Sizes
        sizes: {
          create: input.sizes.map((size) => ({
            size,
          })),
        },

        // Colors
        colors: {
          create: input.colors.map((color) => ({
            color,
          })),
        },

        // Tags
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
      },
    });

    return {
      success: true,
      product,
    };
  } catch (error) {
    console.error("Create product error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create product",
    };
  }
}