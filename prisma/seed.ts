/**
 * Demo data seed — safe to run repeatedly (uses upsert / skips when a row
 * with the same unique key already exists). Run with:
 *   npx tsx prisma/seed.ts
 */
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function upsertCategory(name: string, description: string, image: string) {
  const slug = slugify(name);
  return prisma.category.upsert({
    where: { slug },
    update: {},
    create: { name, slug, description, image, status: "Active" },
  });
}

async function upsertCollection(name: string, description: string, image: string) {
  const slug = slugify(name);
  return prisma.collection.upsert({
    where: { slug },
    update: {},
    create: { name, slug, description, image, status: "Active" },
  });
}

async function upsertTag(name: string) {
  const slug = slugify(name);
  return prisma.tag.upsert({
    where: { slug },
    update: {},
    create: { name, slug },
  });
}

type SeedProduct = {
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number;
  compareAtPrice?: number;
  stock: number;
  categorySlug: string;
  collectionSlug?: string;
  badge?: string;
  featured?: boolean;
  images: string[];
  sizes: string[];
  colors: string[];
  tags: number[];
};

async function upsertProduct(
  input: SeedProduct,
  categoryId: number,
  collectionId: number | null,
  tagIds: number[],
) {
  const slug = slugify(input.name);

  const existing = await prisma.product.findUnique({ where: { sku: input.sku } });
  if (existing) return existing;

  return prisma.product.create({
    data: {
      name: input.name,
      slug,
      sku: input.sku,
      description: input.description,
      price: input.price,
      salePrice: input.salePrice ?? null,
      compareAtPrice: input.compareAtPrice ?? null,
      stock: input.stock,
      lowStockThreshold: 5,
      status: "Active",
      badge: input.badge ?? null,
      featured: input.featured ?? false,
      categoryId,
      collectionId,
      images: {
        create: input.images.map((imageUrl, index) => ({
          imageUrl,
          sortOrder: index,
          isHover: index === 1,
        })),
      },
      sizes: { create: input.sizes.map((size) => ({ size })) },
      colors: { create: input.colors.map((color) => ({ color })) },
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });
}

async function main() {
  console.log("Seeding demo catalogue…");

  /* ===================================================
     CATEGORIES
  =================================================== */

  const menswear = await upsertCategory(
    "Menswear",
    "Shalwar kameez, kurtas and formal wear for men.",
    "/images/products/classic-suit.svg",
  );
  const womenswear = await upsertCategory(
    "Womenswear",
    "Suits, dupattas and formal pieces for women.",
    "/images/products/formal-dress.svg",
  );
  const kids = await upsertCategory(
    "Kids",
    "Comfortable, growing-room styles for children.",
    "/images/products/kids.svg",
  );
  const fabric = await upsertCategory(
    "Fabric",
    "Unstitched fabric sold by the suit length.",
    "/images/products/fabric.svg",
  );

  /* ===================================================
     COLLECTIONS
  =================================================== */

  const wedding = await upsertCollection(
    "Wedding Edit",
    "Refined looks for your most memorable occasions.",
    "/images/collections/wedding.jpg",
  );
  const newArrivals = await upsertCollection(
    "New Arrivals",
    "Fresh silhouettes and refined everyday pieces.",
    "/images/collections/new-arrivals.jpg",
  );
  const premium = await upsertCollection(
    "Premium Essentials",
    "Timeless pieces designed for everyday confidence.",
    "/images/collections/premium.jpg",
  );

  /* ===================================================
     TAGS
  =================================================== */

  const tagNames = ["Cotton", "Silk", "Linen", "Wedding", "Everyday", "Formal", "Best Seller"];
  const tags = new Map<string, number>();
  for (const name of tagNames) {
    const tag = await upsertTag(name);
    tags.set(name, tag.id);
  }

  const t = (...names: string[]) => names.map((name) => tags.get(name)!).filter(Boolean);

  /* ===================================================
     PRODUCTS
  =================================================== */

  const products: SeedProduct[] = [
    {
      name: "Classic Ivory Shalwar Kameez",
      sku: "SGC-MEN-001",
      description:
        "A hand-finished shalwar kameez in soft cotton, lined for comfort and cut for an easy, everyday fit. Stitched to standard sizing or made to your own measurements.",
      price: 8900,
      compareAtPrice: 9500,
      stock: 24,
      categorySlug: "menswear",
      collectionSlug: "new-arrivals",
      badge: "Best Seller",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
      colors: ["Ivory", "White"],
      tags: t("Cotton", "Everyday", "Best Seller"),
    },
    {
      name: "Midnight Formal Kurta",
      sku: "SGC-MEN-002",
      description:
        "A sharply tailored kurta in a deep midnight shade, perfect over trousers for formal evenings.",
      price: 7900,
      salePrice: 6900,
      stock: 18,
      categorySlug: "menswear",
      badge: "Sale",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["M", "L", "XL", "Custom"],
      colors: ["Navy", "Black"],
      tags: t("Formal", "Everyday"),
    },
    {
      name: "Premium Sand Waistcoat",
      sku: "SGC-MEN-003",
      description: "A structured waistcoat in warm sand, worn over a kurta for weddings and formal events.",
      price: 6500,
      stock: 12,
      categorySlug: "menswear",
      collectionSlug: "wedding",
      badge: "New",
      images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["S", "M", "L", "XL", "Custom"],
      colors: ["Sand", "Beige"],
      tags: t("Wedding", "Formal"),
    },
    {
      name: "Ivory Silk Sherwani",
      sku: "SGC-MEN-004",
      description: "Hand-finished sherwani in pure silk, lined with cotton — our most requested wedding piece.",
      price: 45000,
      salePrice: 39000,
      stock: 6,
      categorySlug: "menswear",
      collectionSlug: "wedding",
      badge: "Premium",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["M", "L", "XL", "Custom"],
      colors: ["Ivory", "Gold"],
      tags: t("Silk", "Wedding", "Best Seller"),
    },
    {
      name: "Pearl Wedding Ensemble",
      sku: "SGC-WOM-001",
      description: "A three-piece suit in pearl tones with delicate embroidery, made for wedding season.",
      price: 18500,
      stock: 9,
      categorySlug: "womenswear",
      collectionSlug: "wedding",
      badge: "Premium",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["S", "M", "L", "Custom"],
      colors: ["Pearl", "Blush"],
      tags: t("Wedding", "Silk"),
    },
    {
      name: "Everyday Linen Suit",
      sku: "SGC-WOM-002",
      description: "A breathable linen suit for warm days — simple, comfortable, and easy to style.",
      price: 6900,
      stock: 20,
      categorySlug: "womenswear",
      collectionSlug: "premium",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Beige", "Olive", "White"],
      tags: t("Linen", "Everyday"),
    },
    {
      name: "Kids Festive Shalwar Kameez",
      sku: "SGC-KID-001",
      description: "A comfortable festive set for children, with growing room built into the fit.",
      price: 3500,
      stock: 30,
      categorySlug: "kids",
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
      colors: ["Sky Blue", "Ivory"],
      tags: t("Cotton", "Everyday"),
    },
    {
      name: "Premium Cotton Fabric — Suit Length",
      sku: "SGC-FAB-001",
      description: "Unstitched premium cotton, enough for one full suit. Pair it with our tailoring service.",
      price: 3200,
      stock: 50,
      categorySlug: "fabric",
      images: [
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=85",
      ],
      sizes: [],
      colors: ["White", "Ivory", "Grey"],
      tags: t("Cotton"),
    },
  ];

  const categoryBySlug: Record<string, number> = {
    menswear: menswear.id,
    womenswear: womenswear.id,
    kids: kids.id,
    fabric: fabric.id,
  };

  const collectionBySlug: Record<string, number> = {
    wedding: wedding.id,
    "new-arrivals": newArrivals.id,
    premium: premium.id,
  };

  let created = 0;
  for (const product of products) {
    const before = await prisma.product.findUnique({ where: { sku: product.sku } });

    await upsertProduct(
      product,
      categoryBySlug[product.categorySlug],
      product.collectionSlug ? collectionBySlug[product.collectionSlug] : null,
      product.tags,
    );

    if (!before) created += 1;
  }

  console.log(`Products: ${created} created, ${products.length - created} already existed.`);

  /* ===================================================
     A SAMPLE COUPON

     Note: deliberately no fake customer reviews here — a
     review carries a person's name, and inventing "reviews"
     from people who don't exist would show up on the live
     storefront as fabricated social proof. Real reviews will
     accumulate once customers order.
  =================================================== */

  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      description: "10% off for new customers",
      type: "Percentage",
      value: 10,
      status: "Active",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
