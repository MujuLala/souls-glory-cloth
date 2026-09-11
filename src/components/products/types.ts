export type ProductStatus = "Active" | "Draft" | "Out of Stock" | "Low Stock";

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: ProductStatus;
  image: string;
};
