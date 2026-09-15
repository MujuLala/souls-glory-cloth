"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { slugify } from "@/lib/format";

function fail(error: string) {
  return { success: false as const, error };
}

export type TemplateFieldInput = {
  key: string;
  label: string;
  unit?: string;
  helpText?: string;
  required?: boolean;
};

export async function saveMeasurementTemplate(input: {
  id?: number;
  name: string;
  gender: string;
  description?: string;
  fields: TemplateFieldInput[];
}) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Name the garment type first.");
  }

  const fields = input.fields
    .map((field) => ({
      key: field.key.trim() || slugify(field.label),
      label: field.label.trim(),
      unit: field.unit?.trim() || "in",
      helpText: field.helpText?.trim() || null,
      required: field.required ?? false,
    }))
    .filter((field) => field.label);

  if (fields.length === 0) {
    return fail("Add at least one measurement field.");
  }

  const keys = fields.map((field) => field.key);

  if (new Set(keys).size !== keys.length) {
    return fail("Each field needs a unique key.");
  }

  try {
    if (input.id) {
      await prisma.$transaction([
        prisma.measurementField.deleteMany({ where: { templateId: input.id } }),
        prisma.measurementTemplate.update({
          where: { id: input.id },
          data: {
            name,
            gender: input.gender,
            description: input.description?.trim() || null,
            fields: {
              create: fields.map((field, index) => ({ ...field, sortOrder: index })),
            },
          },
        }),
      ]);
    } else {
      await prisma.measurementTemplate.create({
        data: {
          name,
          slug: slugify(name),
          gender: input.gender,
          description: input.description?.trim() || null,
          fields: {
            create: fields.map((field, index) => ({ ...field, sortOrder: index })),
          },
        },
      });
    }

    revalidatePath("/tailoring/templates");
    revalidatePath("/account/measurements");

    return { success: true as const };
  } catch (error) {
    console.error("Save measurement template failed:", error);
    return fail("Could not save this garment type.");
  }
}

export async function deleteMeasurementTemplate(id: number) {
  await requireStaff();

  const usage = await prisma.measurement.count({ where: { templateId: id } });

  if (usage > 0) {
    return fail(
      `${usage} saved measurement${usage === 1 ? "" : "s"} use this type. Remove them first.`,
    );
  }

  try {
    await prisma.measurementTemplate.delete({ where: { id } });

    revalidatePath("/tailoring/templates");

    return { success: true as const };
  } catch (error) {
    console.error("Delete measurement template failed:", error);
    return fail("Could not delete this garment type.");
  }
}

export async function setTemplateActive(id: number, isActive: boolean) {
  await requireStaff();

  try {
    await prisma.measurementTemplate.update({ where: { id }, data: { isActive } });

    revalidatePath("/tailoring/templates");
    revalidatePath("/account/measurements");

    return { success: true as const };
  } catch (error) {
    console.error("Set template active failed:", error);
    return fail("Could not update this garment type.");
  }
}
