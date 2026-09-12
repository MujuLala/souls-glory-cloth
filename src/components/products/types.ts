export type ProductStatus =
  | "Active"
  | "Draft"
  | "Out of Stock"
  | "Low Stock";

export type Product = {
  id: number;
  name: string;
  sku: string;
  slug: string;

  category: string;
  subcategory?: string;

  price: number;
  stock: number;
  status: ProductStatus;

  image?: string;
  hoverImage?: string;

  badge?: string;

  tags?: string[];
  sizes?: string[];
  colors?: string[];

  rating?: number;
  reviews?: number;
};