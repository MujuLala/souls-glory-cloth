import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";
import type {
  StorefrontCategory,
  StorefrontCollection,
  StorefrontProduct,
} from "@/types/catalog";

/* =========================================================
   STOREFRONT READS

   Only published products are ever returned here — drafts
   and archived pieces stay inside the CMS.
========================================================= */

const productSelect = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  description: true,
  price: true,
  salePrice: true,
  compareAtPrice: true,
  stock: true,
  badge: true,
  featured: true,
  subcategory: true,
  category: { select: { name: true, slug: true } },
  collection: { select: { name: true } },
  images: { select: { imageUrl: true, isHover: true }, orderBy: { sortOrder: "asc" } },
  sizes: { select: { size: true } },
  colors: { select: { color: true } },
  tags: { select: { tag: { select: { name: true } } } },
  reviews: {
    where: { status: "Approved" },
    select: { rating: true },
  },
} as const;

/** Prisma hands back Decimal objects; only toString() matters. */
type Money = { toString(): string } | number | string | null;

type RawProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: Money;
  salePrice: Money;
  compareAtPrice: Money;
  stock: number;
  badge: string | null;
  featured: boolean;
  subcategory: string | null;
  category: { name: string; slug: string } | null;
  collection: { name: string } | null;
  images: { imageUrl: string; isHover: boolean }[];
  sizes: { size: string }[];
  colors: { color: string }[];
  tags: { tag: { name: string } }[];
  reviews: { rating: number }[];
};

function serialize(product: RawProduct): StorefrontProduct {
  const ratings = product.reviews.map((review) => review.rating);

  const average =
    ratings.length > 0
      ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
      : 0;

  const hover =
    product.images.find((image) => image.isHover)?.imageUrl ??
    product.images[1]?.imageUrl ??
    null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,

    category: product.category?.name ?? null,
    categorySlug: product.category?.slug ?? null,
    collection: product.collection?.name ?? null,
    subcategory: product.subcategory,

    price: toNumber(product.price),
    salePrice: product.salePrice ? toNumber(product.salePrice) : null,
    compareAtPrice: product.compareAtPrice
      ? toNumber(product.compareAtPrice)
      : null,

    stock: product.stock,
    inStock: product.stock > 0,

    badge: product.badge,
    featured: product.featured,

    image: product.images[0]?.imageUrl ?? null,
    hoverImage: hover,

    sizes: product.sizes.map((size) => size.size),
    colors: product.colors.map((color) => color.color),
    tags: product.tags.map((tag) => tag.tag.name),

    rating: Number(average.toFixed(1)),
    reviewCount: ratings.length,

    description: product.description,
  };
}

/* =========================================================
   LISTS
========================================================= */

export async function getStorefrontProducts(options: {
  categorySlug?: string;
  collectionSlug?: string;
  featured?: boolean;
  limit?: number;
} = {}): Promise<StorefrontProduct[]> {
  const products = await prisma.product.findMany({
    where: {
      status: "Active",
      ...(options.categorySlug
        ? { category: { slug: options.categorySlug } }
        : {}),
      ...(options.collectionSlug
        ? { collection: { slug: options.collectionSlug } }
        : {}),
      ...(options.featured ? { featured: true } : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: options.limit ?? 120,
    select: productSelect,
  });

  return products.map(serialize);
}

export async function getStorefrontProduct(
  slug: string,
): Promise<StorefrontProduct | null> {
  const product = await prisma.product.findFirst({
    where: { slug, status: "Active" },
    select: productSelect,
  });

  return product ? serialize(product) : null;
}

/* =========================================================
   TAXONOMY
========================================================= */

export async function getStorefrontCategories(): Promise<
  StorefrontCategory[]
> {
  const categories = await prisma.category.findMany({
    where: { status: "Active" },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      _count: { select: { products: true } },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    productCount: category._count.products,
  }));
}

export async function getStorefrontCollections(): Promise<
  StorefrontCollection[]
> {
  const collections = await prisma.collection.findMany({
    where: { status: "Active" },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      _count: { select: { products: true } },
      products: {
        where: { status: "Active" },
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          images: {
            select: { imageUrl: true },
            orderBy: { sortOrder: "asc" },
            take: 1,
          },
        },
      },
    },
  });

  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description,
    image: collection.image,
    productCount: collection._count.products,
    previewImages: collection.products
      .map((product) => product.images[0]?.imageUrl)
      .filter((url): url is string => Boolean(url)),
  }));
}

/* =========================================================
   FACETS

   Derived from the products actually on the page so a filter
   never offers an option that returns nothing.
========================================================= */

export function buildFacets(products: StorefrontProduct[]) {
  const categories = new Set<string>();
  const sizes = new Set<string>();
  const colors = new Set<string>();
  const tags = new Set<string>();

  let maxPrice = 0;

  for (const product of products) {
    if (product.category) {
      categories.add(product.category);
    }

    product.sizes.forEach((size) => sizes.add(size));
    product.colors.forEach((color) => colors.add(color));
    product.tags.forEach((tag) => tags.add(tag));

    maxPrice = Math.max(maxPrice, product.salePrice ?? product.price);
  }

  return {
    categories: [...categories].sort(),
    sizes: [...sizes].sort(),
    colors: [...colors].sort(),
    tags: [...tags].sort(),
    maxPrice: Math.max(1000, Math.ceil(maxPrice / 1000) * 1000),
  };
}

export type ShopFacets = ReturnType<typeof buildFacets>;
