export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  badge?: string;

  tags: string[];
  sizes: string[];
  colors: string[];
  availability: "in-stock" | "out-of-stock";
};

export const allProducts: Product[] = [
  // =========================
  // MEN
  // =========================

  {
    id: "men-classic-linen-kurta",
    slug: "classic-linen-kurta",
    name: "Classic Linen Kurta",
    category: "Men",
    subcategory: "Kurta",
    price: 4999,
    badge: "New",
    tags: ["New Arrivals", "Casual", "Featured"],
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    colors: ["White", "Beige", "Navy", "Black"],
    availability: "in-stock",
  },

  {
    id: "men-signature-shalwar-kameez",
    slug: "signature-shalwar-kameez",
    name: "Signature Shalwar Kameez",
    category: "Men",
    subcategory: "Shalwar Kameez",
    price: 7499,
    tags: ["Premium", "Featured", "Bestseller"],
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    colors: ["White", "Black", "Navy", "Green"],
    availability: "in-stock",
  },

  {
    id: "men-premium-waistcoat",
    slug: "premium-waistcoat",
    name: "Premium Textured Waistcoat",
    category: "Men",
    subcategory: "Waistcoat",
    price: 6499,
    badge: "Premium",
    tags: ["Premium", "Formal", "Wedding"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Brown", "Maroon"],
    availability: "in-stock",
  },

  {
    id: "men-classic-formal-suit",
    slug: "classic-formal-suit",
    name: "Classic Formal Suit",
    category: "Men",
    subcategory: "Suits",
    price: 14999,
    tags: ["Premium", "Formal", "Featured"],
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    colors: ["Black", "Navy", "Grey"],
    availability: "in-stock",
  },

  {
    id: "men-wedding-sherwani",
    slug: "wedding-sherwani",
    name: "Royal Wedding Sherwani",
    category: "Men",
    subcategory: "Formal",
    price: 18999,
    badge: "Best Seller",
    tags: ["Bestseller", "Wedding", "Premium", "Limited Edition"],
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    colors: ["Black", "Maroon", "Brown", "Beige"],
    availability: "in-stock",
  },

  {
    id: "men-everyday-cotton-kurta",
    slug: "everyday-cotton-kurta",
    name: "Everyday Cotton Kurta",
    category: "Men",
    subcategory: "Casual",
    price: 3999,
    tags: ["Casual", "Featured"],
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    colors: ["White", "Beige", "Green", "Navy"],
    availability: "in-stock",
  },

  // =========================
  // WOMEN
  // =========================

  {
    id: "women-embroidered-lawn-set",
    slug: "embroidered-lawn-set",
    name: "Embroidered Lawn Set",
    category: "Women",
    subcategory: "3 Piece",
    price: 8999,
    badge: "New",
    tags: ["New Arrivals", "Featured", "Eid"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["White", "Beige", "Green", "Maroon"],
    availability: "in-stock",
  },

  {
    id: "women-everyday-cotton-kurti",
    slug: "everyday-cotton-kurti",
    name: "Everyday Cotton Kurti",
    category: "Women",
    subcategory: "Kurtis",
    price: 3999,
    tags: ["Casual", "Bestseller"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["White", "Black", "Navy", "Beige"],
    availability: "in-stock",
  },

  {
    id: "women-signature-2-piece",
    slug: "signature-2-piece",
    name: "Signature 2 Piece Set",
    category: "Women",
    subcategory: "2 Piece",
    price: 6999,
    tags: ["Featured", "Casual", "Premium"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["Black", "White", "Maroon", "Green"],
    availability: "in-stock",
  },

  {
    id: "women-luxury-3-piece",
    slug: "luxury-3-piece",
    name: "Luxury Embroidered 3 Piece",
    category: "Women",
    subcategory: "3 Piece",
    price: 11999,
    badge: "Premium",
    tags: ["Premium", "Wedding", "Eid", "Featured"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["Maroon", "Green", "Beige", "Brown"],
    availability: "in-stock",
  },

  {
    id: "women-formal-collection",
    slug: "women-formal-collection",
    name: "Elegant Formal Collection",
    category: "Women",
    subcategory: "Formal",
    price: 13999,
    tags: ["Formal", "Premium", "Wedding"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["Black", "Maroon", "Navy", "Beige"],
    availability: "in-stock",
  },

  {
    id: "women-festive-dress",
    slug: "women-festive-dress",
    name: "Festive Embroidered Dress",
    category: "Women",
    subcategory: "Formal",
    price: 9999,
    badge: "Limited Edition",
    tags: ["Wedding", "Eid", "Limited Edition", "Premium"],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["Maroon", "Green", "Beige"],
    availability: "in-stock",
  },

  // =========================
  // KIDS
  // =========================

  {
    id: "kids-little-gentleman",
    slug: "little-gentleman-set",
    name: "Little Gentleman Set",
    category: "Kids",
    subcategory: "Boys",
    price: 3499,
    tags: ["Casual", "Bestseller"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Navy", "Beige", "Green"],
    availability: "in-stock",
  },

  {
    id: "kids-mini-festive-dress",
    slug: "mini-festive-dress",
    name: "Mini Festive Dress",
    category: "Kids",
    subcategory: "Girls",
    price: 4499,
    badge: "New",
    tags: ["New Arrivals", "Eid", "Festive"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Maroon", "Green", "Beige", "White"],
    availability: "in-stock",
  },

  {
    id: "kids-classic-kurta",
    slug: "kids-classic-kurta",
    name: "Classic Kids Kurta",
    category: "Kids",
    subcategory: "Boys",
    price: 2999,
    tags: ["Casual", "Featured"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Navy"],
    availability: "in-stock",
  },

  {
    id: "kids-princess-embroidered",
    slug: "princess-embroidered-dress",
    name: "Princess Embroidered Dress",
    category: "Kids",
    subcategory: "Girls",
    price: 4999,
    tags: ["Festive", "Eid", "Featured"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Maroon", "Beige", "Green"],
    availability: "in-stock",
  },

  {
    id: "kids-festive-shalwar-kameez",
    slug: "kids-festive-shalwar-kameez",
    name: "Festive Shalwar Kameez",
    category: "Kids",
    subcategory: "Boys",
    price: 4299,
    tags: ["Festive", "Eid", "Premium"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Beige", "Navy"],
    availability: "in-stock",
  },

  // =========================
  // READY TO WEAR
  // =========================

  {
    id: "ready-premium-kurta",
    slug: "premium-ready-kurta",
    name: "Premium Ready Kurta",
    category: "Ready to Wear",
    subcategory: "Men's",
    price: 5499,
    tags: ["Featured", "Premium"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Green"],
    availability: "in-stock",
  },

  {
    id: "ready-essential-coord",
    slug: "essential-co-ord-set",
    name: "Essential Co-Ord Set",
    category: "Ready to Wear",
    subcategory: "Women's",
    price: 6999,
    badge: "Best Seller",
    tags: ["Bestseller", "Featured", "Casual"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Beige", "Maroon"],
    availability: "in-stock",
  },

  {
    id: "ready-signature-kameez",
    slug: "signature-ready-kameez",
    name: "Signature Ready Kameez",
    category: "Ready to Wear",
    subcategory: "Women's",
    price: 7999,
    tags: ["New Arrivals", "Premium", "Featured"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Green", "Maroon", "Beige", "Black"],
    availability: "in-stock",
  },

  {
    id: "ready-kids-festive",
    slug: "ready-kids-festive-set",
    name: "Kids Festive Ready Set",
    category: "Ready to Wear",
    subcategory: "Kids",
    price: 4499,
    badge: "New",
    tags: ["New Arrivals", "Eid", "Festive"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Green", "Maroon", "Navy"],
    availability: "in-stock",
  },

  {
    id: "ready-limited-edition",
    slug: "limited-edition-ensemble",
    name: "Limited Edition Ensemble",
    category: "Ready to Wear",
    subcategory: "Women's",
    price: 10999,
    badge: "Limited Edition",
    tags: ["Limited Edition", "Premium", "Wedding"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Maroon", "Black", "Beige"],
    availability: "in-stock",
  },
];


// =====================================================
// CATEGORY DATA
// =====================================================

export const categoryData = {
  men: {
    eyebrow: "THE MEN'S EDIT",
    title: "Men's Collection",
    description:
      "Timeless tailoring, refined details, and a fit made around you.",
    categories: [
      "Shalwar Kameez",
      "Kurta",
      "Waistcoat",
      "Suits",
      "Formal",
      "Casual",
    ],
    filters: ["All", "Kurta", "Shalwar Kameez", "Formal", "Casual"],
    products: allProducts.filter((p) => p.category === "Men"),
  },

  women: {
    eyebrow: "THE WOMEN'S EDIT",
    title: "Women's Collection",
    description:
      "Elegant silhouettes, beautiful fabrics, and your perfect fit.",
    categories: [
      "Shalwar Kameez",
      "2 Piece",
      "3 Piece",
      "Kurtis",
      "Formal",
      "Casual",
    ],
    filters: ["All", "Kurtis", "2 Piece", "3 Piece", "Formal"],
    products: allProducts.filter((p) => p.category === "Women"),
  },

  kids: {
    eyebrow: "THE KIDS' EDIT",
    title: "Kids Collection",
    description:
      "Comfortable, stylish and made for every little moment.",
    categories: [
      "Boys",
      "Girls",
      "0–2 Years",
      "3–5 Years",
      "6–9 Years",
      "10–14 Years",
    ],
    filters: ["All", "Boys", "Girls", "Festive", "Casual"],
    products: allProducts.filter((p) => p.category === "Kids"),
  },

  "ready-to-wear": {
    eyebrow: "READY WHEN YOU ARE",
    title: "Ready to Wear",
    description:
      "Your style, ready when you are. Discover pieces made for effortless dressing.",
    categories: [
      "Men's",
      "Women's",
      "Kids",
      "New Arrivals",
      "Best Sellers",
      "Limited Edition",
    ],
    filters: ["All", "Men's", "Women's", "Kids", "New Arrivals"],
    products: allProducts.filter(
      (p) => p.category === "Ready to Wear"
    ),
  },
} as const;