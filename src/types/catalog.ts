/* =========================================================
   STOREFRONT CATALOGUE TYPES

   The shape every storefront component reads. Kept separate
   from Prisma's models so client components never import the
   database client, and Decimals never leak into the browser.
========================================================= */

export type StorefrontProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;

  category: string | null;
  categorySlug: string | null;
  collection: string | null;
  subcategory: string | null;

  price: number;
  salePrice: number | null;
  compareAtPrice: number | null;

  stock: number;
  inStock: boolean;

  badge: string | null;
  featured: boolean;

  image: string | null;
  hoverImage: string | null;

  sizes: string[];
  colors: string[];
  tags: string[];

  rating: number;
  reviewCount: number;

  description: string | null;
};

export type StorefrontCollection = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  productCount: number;
  previewImages: string[];
};

export type StorefrontCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  productCount: number;
};
