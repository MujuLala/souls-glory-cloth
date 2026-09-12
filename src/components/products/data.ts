import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Men's Suit",
    sku: "SUIT-001",
    slug: "classic-mens-suit",
    category: "Men Collection",
    subcategory: "Suits",
    price: 120,
    stock: 25,
    status: "Active",
    image: "/images/products/classic-suit.svg",

    tags: ["Premium", "Formal", "Featured"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],

    badge: "Featured",
    rating: 4.9,
    reviews: 20,
  },

  {
    id: 2,
    name: "Premium Kurta",
    sku: "KURTA-002",
    slug: "premium-kurta",
    category: "Traditional Wear",
    subcategory: "Kurta",
    price: 65,
    stock: 12,
    status: "Active",
    image: "/images/products/premium-kurta.svg",

    tags: ["Premium", "Traditional", "Featured"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Green"],

    badge: "Premium",
    rating: 4.8,
    reviews: 16,
  },

  {
    id: 3,
    name: "Ladies Formal Dress",
    sku: "DRESS-003",
    slug: "ladies-formal-dress",
    category: "Women Collection",
    subcategory: "Formal",
    price: 95,
    stock: 0,
    status: "Out of Stock",
    image: "/images/products/formal-dress.svg",

    tags: ["Formal", "Premium"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Maroon", "Beige"],

    badge: "Sold Out",
    rating: 4.9,
    reviews: 12,
  },

  {
    id: 4,
    name: "Cotton Fabric (1 Meter)",
    sku: "FAB-004",
    slug: "cotton-fabric-1-meter",
    category: "Fabrics",
    subcategory: "Cotton",
    price: 12,
    stock: 50,
    status: "Active",
    image: "/images/products/fabric.svg",

    tags: ["Fabric", "Cotton", "Featured"],
    sizes: ["1 Meter", "2 Meter", "3 Meter"],
    colors: ["White", "Black", "Navy", "Grey"],

    badge: "Popular",
    rating: 4.7,
    reviews: 34,
  },

  {
    id: 5,
    name: "Kids Shalwar Kameez",
    sku: "KID-005",
    slug: "kids-shalwar-kameez",
    category: "Kids Collection",
    subcategory: "Shalwar Kameez",
    price: 45,
    stock: 8,
    status: "Low Stock",
    image: "/images/products/kids.svg",

    tags: ["Kids", "Traditional", "Featured"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Navy", "Beige", "Green"],

    badge: "Low Stock",
    rating: 4.8,
    reviews: 9,
  },
];