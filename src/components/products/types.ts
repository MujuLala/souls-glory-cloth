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
export type ReviewStatus = "Approved" | "Pending" | "Rejected";

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