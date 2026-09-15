export type ProductStatus =
  | "Active"
  | "Draft"
  | "Out of Stock"
  | "Low Stock"
  | "Archived";

/* =========================================================
   CATEGORY
========================================================= */

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;

  // Parent category name.
  // null means this is a top-level category.
  parent: string | null;

  status: string;
};

/* =========================================================
   COLLECTION
========================================================= */

export type Collection = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status: string;

  // IDs of products belonging to this collection
  productIds: number[];
};

/* =========================================================
   PRODUCT
========================================================= */

export type Product = {
  id: number;

  name: string;
  sku: string;
  slug: string;

  category: string;
  subcategory?: string;

  price: number;
  salePrice?: number;
  costPrice?: number;
  compareAtPrice?: number;

  stock: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;

  status: ProductStatus;

  image?: string;
  hoverImage?: string;

  badge?: string;

  tags: string[];
  sizes: string[];
  colors: string[];

  rating?: number;
  reviews?: number;

  featured?: boolean;

  attributes?: ProductAttribute[];
};

/* =========================================================
   PRODUCT TAG
========================================================= */

export type ProductTag = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

/* =========================================================
   PRODUCT ATTRIBUTE
========================================================= */

export type ProductAttribute = {
  id: number;
  name: string;
  slug: string;

  type: "Select" | "Color" | "Text";

  description?: string;

  values: string[];
};

/* =========================================================
   PRODUCT REVIEW
========================================================= */

export type ReviewStatus =
  | "Approved"
  | "Pending"
  | "Rejected";

export type ProductReview = {
  id: number;

  customerName: string;
  customerEmail: string;

  productId: number;

  rating: number;
  title: string;
  comment: string;

  status: ReviewStatus;

  date: string;
};