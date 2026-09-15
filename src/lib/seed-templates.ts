import { prisma } from "@/lib/prisma";

/* =========================================================
   DEFAULT MEASUREMENT TEMPLATES

   A tailoring workspace is useless with no garment types, so
   the first time one is needed we create a sensible South
   Asian set. Idempotent: it only ever fills in what's
   missing, and never touches a template the shop has edited.
========================================================= */

type SeedField = {
  key: string;
  label: string;
  required?: boolean;
  helpText?: string;
};

type SeedTemplate = {
  name: string;
  slug: string;
  gender: string;
  description: string;
  sortOrder: number;
  fields: SeedField[];
};

const upperBody: SeedField[] = [
  { key: "length", label: "Length (Lambai)", required: true },
  { key: "shoulder", label: "Shoulder (Teera)", required: true },
  { key: "chest", label: "Chest (Chhati)", required: true },
  { key: "waist", label: "Waist (Kamar)" },
  { key: "hip", label: "Hip (Gherra)" },
  { key: "sleeve", label: "Sleeve length (Baazu)", required: true },
  { key: "cuff", label: "Cuff (Aasteen)" },
  { key: "neck", label: "Neck (Gala)" },
];

const lowerBody: SeedField[] = [
  { key: "trouserLength", label: "Trouser length", required: true },
  { key: "trouserWaist", label: "Trouser waist", required: true },
  { key: "thigh", label: "Thigh" },
  { key: "knee", label: "Knee" },
  { key: "bottom", label: "Bottom (Paancha)", required: true },
];

const templates: SeedTemplate[] = [
  {
    name: "Shalwar Kameez",
    slug: "shalwar-kameez",
    gender: "Unisex",
    description: "The standard two-piece — kameez plus shalwar.",
    sortOrder: 1,
    fields: [...upperBody, ...lowerBody],
  },
  {
    name: "Kurta",
    slug: "kurta",
    gender: "Unisex",
    description: "Kurta only, worn with trousers or jeans.",
    sortOrder: 2,
    fields: upperBody,
  },
  {
    name: "Sherwani",
    slug: "sherwani",
    gender: "Male",
    description: "Formal and wedding wear, usually lined.",
    sortOrder: 3,
    fields: [
      ...upperBody,
      { key: "collarHeight", label: "Collar height" },
      { key: "frontOpening", label: "Front opening" },
    ],
  },
  {
    name: "Waistcoat",
    slug: "waistcoat",
    gender: "Male",
    description: "Worn over a kurta or shirt.",
    sortOrder: 4,
    fields: [
      { key: "length", label: "Length", required: true },
      { key: "shoulder", label: "Shoulder", required: true },
      { key: "chest", label: "Chest", required: true },
      { key: "waist", label: "Waist" },
      { key: "armhole", label: "Armhole" },
    ],
  },
  {
    name: "Pant & Shirt",
    slug: "pant-shirt",
    gender: "Unisex",
    description: "Western formal shirt with trousers.",
    sortOrder: 5,
    fields: [
      { key: "shirtLength", label: "Shirt length", required: true },
      { key: "shoulder", label: "Shoulder", required: true },
      { key: "chest", label: "Chest", required: true },
      { key: "sleeve", label: "Sleeve", required: true },
      { key: "collar", label: "Collar" },
      ...lowerBody,
    ],
  },
  {
    name: "Women's Suit",
    slug: "womens-suit",
    gender: "Female",
    description: "Kameez, shalwar or trouser, and dupatta.",
    sortOrder: 6,
    fields: [
      ...upperBody,
      { key: "bust", label: "Bust", required: true },
      { key: "underBust", label: "Under bust" },
      { key: "frontNeck", label: "Front neck depth" },
      { key: "backNeck", label: "Back neck depth" },
      ...lowerBody,
    ],
  },
  {
    name: "Kids Suit",
    slug: "kids-suit",
    gender: "Unisex",
    description: "Children's shalwar kameez — measured with growing room.",
    sortOrder: 7,
    fields: [
      { key: "length", label: "Kameez length", required: true },
      { key: "shoulder", label: "Shoulder", required: true },
      { key: "chest", label: "Chest", required: true },
      { key: "sleeve", label: "Sleeve", required: true },
      { key: "trouserLength", label: "Shalwar length", required: true },
      { key: "bottom", label: "Bottom" },
      {
        key: "growingRoom",
        label: "Growing room",
        helpText: "Extra inches allowed for growth",
      },
    ],
  },
];

let seeding: Promise<void> | null = null;

export async function ensureMeasurementTemplates() {
  /* Several pages can ask at once on a cold start — share
     one promise so they don't race each other. */
  if (seeding) {
    return seeding;
  }

  seeding = (async () => {
    try {
      const existing = await prisma.measurementTemplate.count();

      if (existing > 0) {
        return;
      }

      for (const template of templates) {
        await prisma.measurementTemplate.create({
          data: {
            name: template.name,
            slug: template.slug,
            gender: template.gender,
            description: template.description,
            sortOrder: template.sortOrder,
            fields: {
              create: template.fields.map((field, index) => ({
                key: field.key,
                label: field.label,
                unit: "in",
                required: field.required ?? false,
                helpText: field.helpText ?? null,
                sortOrder: index,
              })),
            },
          },
        });
      }
    } catch (error) {
      console.error("Seeding measurement templates failed:", error);
    } finally {
      seeding = null;
    }
  })();

  return seeding;
}
