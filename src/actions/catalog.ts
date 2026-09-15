"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { slugify } from "@/lib/format";

/* =========================================================
   SHARED
========================================================= */

function fail(error: string) {
  return { success: false as const, error };
}

function ok() {
  return { success: true as const };
}

function describe(error: unknown, subject: string) {
  console.error(`${subject} write failed:`, error);

  const code = (error as { code?: string })?.code;

  if (code === "P2002") {
    return `A ${subject.toLowerCase()} with that name already exists.`;
  }

  if (code === "P2003") {
    return `That ${subject.toLowerCase()} is still linked to other records.`;
  }

  if (code === "P2025") {
    return `That ${subject.toLowerCase()} no longer exists.`;
  }

  return `Could not save the ${subject.toLowerCase()}.`;
}

/* =========================================================
   CATEGORIES
========================================================= */

export type CategoryInput = {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: string;
};

export async function saveCategory(input: CategoryInput & { id?: number }) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Category name is required.");
  }

  const data = {
    name,
    slug: (input.slug?.trim() || slugify(name)).toLowerCase(),
    description: input.description?.trim() || null,
    image: input.image?.trim() || null,
    status: input.status ?? "Active",
  };

  try {
    if (input.id) {
      await prisma.category.update({ where: { id: input.id }, data });
    } else {
      await prisma.category.create({ data });
    }

    revalidatePath("/products/categories");
    revalidatePath("/products");

    return ok();
  } catch (error) {
    return fail(describe(error, "Category"));
  }
}

export async function deleteCategory(id: number) {
  await requireStaff();

  try {
    await prisma.category.delete({ where: { id } });

    revalidatePath("/products/categories");
    revalidatePath("/products");

    return ok();
  } catch (error) {
    return fail(describe(error, "Category"));
  }
}

/* =========================================================
   COLLECTIONS
========================================================= */

export async function saveCollection(
  input: CategoryInput & { id?: number },
) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Collection name is required.");
  }

  const data = {
    name,
    slug: (input.slug?.trim() || slugify(name)).toLowerCase(),
    description: input.description?.trim() || null,
    image: input.image?.trim() || null,
    status: input.status ?? "Active",
  };

  try {
    if (input.id) {
      await prisma.collection.update({ where: { id: input.id }, data });
    } else {
      await prisma.collection.create({ data });
    }

    revalidatePath("/products/collections");

    return ok();
  } catch (error) {
    return fail(describe(error, "Collection"));
  }
}

export async function deleteCollection(id: number) {
  await requireStaff();

  try {
    await prisma.collection.delete({ where: { id } });

    revalidatePath("/products/collections");

    return ok();
  } catch (error) {
    return fail(describe(error, "Collection"));
  }
}

/* =========================================================
   TAGS
========================================================= */

export async function saveTag(input: { id?: number; name: string }) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Tag name is required.");
  }

  const data = { name, slug: slugify(name) };

  try {
    if (input.id) {
      await prisma.tag.update({ where: { id: input.id }, data });
    } else {
      await prisma.tag.create({ data });
    }

    revalidatePath("/products/tags");

    return ok();
  } catch (error) {
    return fail(describe(error, "Tag"));
  }
}

export async function deleteTag(id: number) {
  await requireStaff();

  try {
    await prisma.tag.delete({ where: { id } });

    revalidatePath("/products/tags");

    return ok();
  } catch (error) {
    return fail(describe(error, "Tag"));
  }
}

/* =========================================================
   ATTRIBUTES
========================================================= */

export async function saveAttribute(input: {
  id?: number;
  name: string;
  values: string[];
}) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Attribute name is required.");
  }

  const values = input.values
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value, index, all) => all.indexOf(value) === index);

  try {
    if (input.id) {
      await prisma.$transaction([
        prisma.attributeValue.deleteMany({ where: { attributeId: input.id } }),
        prisma.attribute.update({
          where: { id: input.id },
          data: {
            name,
            slug: slugify(name),
            values: { create: values.map((value) => ({ value })) },
          },
        }),
      ]);
    } else {
      await prisma.attribute.create({
        data: {
          name,
          slug: slugify(name),
          values: { create: values.map((value) => ({ value })) },
        },
      });
    }

    revalidatePath("/products/attributes");

    return ok();
  } catch (error) {
    return fail(describe(error, "Attribute"));
  }
}

export async function deleteAttribute(id: number) {
  await requireStaff();

  try {
    await prisma.attribute.delete({ where: { id } });

    revalidatePath("/products/attributes");

    return ok();
  } catch (error) {
    return fail(describe(error, "Attribute"));
  }
}

/* =========================================================
   REVIEWS
========================================================= */

export async function setReviewStatus(ids: number[], status: string) {
  await requireStaff();

  if (ids.length === 0) {
    return fail("Select at least one review.");
  }

  try {
    await prisma.productReview.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });

    revalidatePath("/products/reviews");

    return ok();
  } catch (error) {
    return fail(describe(error, "Review"));
  }
}

export async function deleteReview(id: number) {
  await requireStaff();

  try {
    await prisma.productReview.delete({ where: { id } });

    revalidatePath("/products/reviews");

    return ok();
  } catch (error) {
    return fail(describe(error, "Review"));
  }
}

/* =========================================================
   PRODUCT QUESTIONS (used by chat)
========================================================= */

export async function saveProductQuestion(input: {
  id?: number;
  productId?: number | null;
  categoryId?: number | null;
  question: string;
  helpText?: string;
  type: string;
  options: string[];
  required: boolean;
  sortOrder?: number;
}) {
  await requireStaff();

  const question = input.question.trim();

  if (!question) {
    return fail("Write the question first.");
  }

  if (!input.productId && !input.categoryId) {
    return fail("Pick a product or a category for this question.");
  }

  const data = {
    productId: input.productId ?? null,
    categoryId: input.productId ? null : (input.categoryId ?? null),
    question,
    helpText: input.helpText?.trim() || null,
    type: input.type,
    options: input.options.filter(Boolean),
    required: input.required,
    sortOrder: input.sortOrder ?? 0,
  };

  try {
    if (input.id) {
      await prisma.productQuestion.update({ where: { id: input.id }, data });
    } else {
      await prisma.productQuestion.create({ data });
    }

    revalidatePath("/tailoring/questions");

    return ok();
  } catch (error) {
    return fail(describe(error, "Question"));
  }
}

export async function deleteProductQuestion(id: number) {
  await requireStaff();

  try {
    await prisma.productQuestion.delete({ where: { id } });

    revalidatePath("/tailoring/questions");

    return ok();
  } catch (error) {
    return fail(describe(error, "Question"));
  }
}
