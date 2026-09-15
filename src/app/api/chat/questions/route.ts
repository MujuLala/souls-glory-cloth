import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export type ChatQuestion = {
  id: string;
  question: string;
  helpText: string | null;
  type: string;
  options: string[];
  required: boolean;
};

/* =========================================================
   FALLBACK QUESTIONS

   Used when an admin hasn't configured anything specific for
   the product or its category yet — the shopper still gets a
   guided conversation instead of a blank box.
========================================================= */

const fallbackQuestions: ChatQuestion[] = [
  {
    id: "fallback-fit",
    question: "How would you like this stitched?",
    helpText: "We can tailor to your measurements or ship a standard size.",
    type: "Select",
    options: [
      "Custom stitched to my measurements",
      "Standard size (ready to wear)",
      "Not sure — please advise",
    ],
    required: true,
  },
  {
    id: "fallback-who",
    question: "Who is this being made for?",
    helpText: "Pick a saved family member, or tell us the name.",
    type: "Measurement",
    options: [],
    required: false,
  },
  {
    id: "fallback-fabric",
    question: "Any fabric preference?",
    helpText: null,
    type: "Select",
    options: ["Cotton", "Wash & Wear", "Linen", "Silk blend", "Let us suggest"],
    required: false,
  },
  {
    id: "fallback-date",
    question: "When do you need it delivered?",
    helpText: "Custom stitching usually takes 7–12 working days.",
    type: "Select",
    options: ["Within a week", "2–3 weeks", "No rush", "Specific date"],
    required: false,
  },
];

/* =========================================================
   GET /api/chat/questions?productId=
========================================================= */

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const productId = Number(url.searchParams.get("productId") ?? 0);

    if (!productId) {
      return NextResponse.json({ questions: fallbackQuestions });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, categoryId: true },
    });

    if (!product) {
      return NextResponse.json({ questions: fallbackQuestions });
    }

    const rows = await prisma.productQuestion.findMany({
      where: {
        isActive: true,
        OR: [
          { productId: product.id },
          ...(product.categoryId
            ? [{ categoryId: product.categoryId, productId: null }]
            : []),
        ],
      },
      orderBy: [{ productId: "desc" }, { sortOrder: "asc" }],
      take: 10,
    });

    if (rows.length === 0) {
      return NextResponse.json({ questions: fallbackQuestions });
    }

    const questions: ChatQuestion[] = rows.map((row) => ({
      id: String(row.id),
      question: row.question,
      helpText: row.helpText,
      type: row.type,
      options: Array.isArray(row.options) ? (row.options as string[]) : [],
      required: row.required,
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Chat questions failed:", error);

    return NextResponse.json({ questions: fallbackQuestions });
  }
}
