"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  getCurrentUser,
  getOrCreateCustomer,
  isStaff,
  requireStaff,
} from "@/lib/session";

/* =========================================================
   ACCOUNT ACTIONS

   Shared by the customer's own pages and the CMS: staff can
   act on any customer, a customer only on their own record.
========================================================= */

function fail(error: string) {
  return { success: false as const, error };
}

/**
 * Resolve which customer the caller may write to.
 * `customerId` is only honoured for staff.
 */
async function resolveCustomerId(
  customerId?: number,
): Promise<{ ok: true; id: number; staff: boolean } | { ok: false; error: string }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "Please sign in first." };
  }

  if (isStaff(user.role)) {
    if (!customerId) {
      return { ok: false, error: "No customer selected." };
    }

    const exists = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { id: true },
    });

    if (!exists) {
      return { ok: false, error: "That customer no longer exists." };
    }

    return { ok: true, id: exists.id, staff: true };
  }

  const own = user.customerId ?? (await getOrCreateCustomer(user));

  if (customerId && customerId !== own) {
    return { ok: false, error: "You can only edit your own profile." };
  }

  return { ok: true, id: own, staff: false };
}

function refresh(customerId: number) {
  revalidatePath("/account");
  revalidatePath("/account/members");
  revalidatePath("/account/measurements");
  revalidatePath("/customers");
  revalidatePath(`/customers/${customerId}`);
  revalidatePath("/tailoring/measurements");
}

/* =========================================================
   PROFILE
========================================================= */

export async function updateCustomerProfile(input: {
  customerId?: number;
  fullName: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  gender?: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
}) {
  const resolved = await resolveCustomerId(input.customerId);

  if (!resolved.ok) {
    return fail(resolved.error);
  }

  if (!input.fullName.trim()) {
    return fail("Your name can't be empty.");
  }

  try {
    await prisma.customer.update({
      where: { id: resolved.id },
      data: {
        fullName: input.fullName.trim(),
        email: input.email?.trim() || null,
        phone: input.phone?.trim() || null,
        whatsapp: input.whatsapp?.trim() || null,
        gender: input.gender?.trim() || null,
        addressLine: input.addressLine?.trim() || null,
        city: input.city?.trim() || null,
        postalCode: input.postalCode?.trim() || null,
        /* Internal notes stay staff-only. */
        ...(resolved.staff ? { notes: input.notes?.trim() || null } : {}),
      },
    });

    refresh(resolved.id);

    return { success: true as const };
  } catch (error) {
    console.error("Update profile failed:", error);
    return fail("Could not save your details.");
  }
}

/* =========================================================
   FAMILY MEMBERS ("afraad")
========================================================= */

export async function saveMember(input: {
  id?: number;
  customerId?: number;
  fullName: string;
  relation: string;
  gender?: string;
  ageGroup?: string;
  dateOfBirth?: string;
  phone?: string;
  notes?: string;
}) {
  const resolved = await resolveCustomerId(input.customerId);

  if (!resolved.ok) {
    return fail(resolved.error);
  }

  if (!input.fullName.trim()) {
    return fail("Enter a name.");
  }

  const data = {
    fullName: input.fullName.trim(),
    relation: input.relation || "Other",
    gender: input.gender?.trim() || null,
    ageGroup: input.ageGroup?.trim() || "Adult",
    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
    phone: input.phone?.trim() || null,
    notes: input.notes?.trim() || null,
  };

  try {
    if (input.id) {
      /* Make sure the member really belongs to this customer. */
      const member = await prisma.customerMember.findFirst({
        where: { id: input.id, customerId: resolved.id },
        select: { id: true },
      });

      if (!member) {
        return fail("That person is not on this profile.");
      }

      await prisma.customerMember.update({
        where: { id: member.id },
        data,
      });
    } else {
      await prisma.customerMember.create({
        data: { ...data, customerId: resolved.id },
      });
    }

    refresh(resolved.id);

    return { success: true as const };
  } catch (error) {
    console.error("Save member failed:", error);
    return fail("Could not save this person.");
  }
}

export async function deleteMember(input: {
  id: number;
  customerId?: number;
}) {
  const resolved = await resolveCustomerId(input.customerId);

  if (!resolved.ok) {
    return fail(resolved.error);
  }

  const member = await prisma.customerMember.findFirst({
    where: { id: input.id, customerId: resolved.id },
    select: { id: true, isPrimary: true },
  });

  if (!member) {
    return fail("That person is not on this profile.");
  }

  if (member.isPrimary) {
    return fail("The main profile can't be removed.");
  }

  try {
    await prisma.customerMember.delete({ where: { id: member.id } });

    refresh(resolved.id);

    return { success: true as const };
  } catch (error) {
    console.error("Delete member failed:", error);
    return fail("Could not remove this person.");
  }
}

/* =========================================================
   MEASUREMENTS
========================================================= */

export async function saveMeasurement(input: {
  id?: number;
  customerId?: number;
  memberId: number | null;
  templateId: number;
  title: string;
  unit: string;
  values: Record<string, string>;
  notes?: string;
  isDefault?: boolean;
}) {
  const resolved = await resolveCustomerId(input.customerId);

  if (!resolved.ok) {
    return fail(resolved.error);
  }

  const template = await prisma.measurementTemplate.findUnique({
    where: { id: input.templateId },
    include: { fields: true },
  });

  if (!template) {
    return fail("Pick a garment type first.");
  }

  /* Keep only known field keys, and drop empty values. */
  const allowed = new Set(template.fields.map((field) => field.key));

  const values: Record<string, string> = {};

  for (const [key, value] of Object.entries(input.values)) {
    if (allowed.has(key) && String(value).trim()) {
      values[key] = String(value).trim();
    }
  }

  const missing = template.fields
    .filter((field) => field.required && !values[field.key])
    .map((field) => field.label);

  if (missing.length > 0) {
    return fail(`Still needed: ${missing.join(", ")}.`);
  }

  if (Object.keys(values).length === 0) {
    return fail("Add at least one measurement.");
  }

  if (input.memberId) {
    const member = await prisma.customerMember.findFirst({
      where: { id: input.memberId, customerId: resolved.id },
      select: { id: true },
    });

    if (!member) {
      return fail("That person is not on this profile.");
    }
  }

  const data = {
    memberId: input.memberId,
    templateId: template.id,
    title: input.title.trim() || template.name,
    unit: input.unit || "in",
    values,
    notes: input.notes?.trim() || null,
    isDefault: input.isDefault ?? false,
  };

  try {
    if (input.id) {
      const existing = await prisma.measurement.findFirst({
        where: { id: input.id, customerId: resolved.id },
        select: { id: true, version: true },
      });

      if (!existing) {
        return fail("That measurement no longer exists.");
      }

      await prisma.measurement.update({
        where: { id: existing.id },
        data: { ...data, version: existing.version + 1 },
      });
    } else {
      await prisma.measurement.create({
        data: { ...data, customerId: resolved.id },
      });
    }

    /* Only one default per member. */
    if (data.isDefault && input.memberId) {
      await prisma.measurement.updateMany({
        where: {
          customerId: resolved.id,
          memberId: input.memberId,
          ...(input.id ? { id: { not: input.id } } : {}),
        },
        data: { isDefault: false },
      });
    }

    refresh(resolved.id);

    return { success: true as const };
  } catch (error) {
    console.error("Save measurement failed:", error);
    return fail("Could not save the measurement.");
  }
}

export async function deleteMeasurement(input: {
  id: number;
  customerId?: number;
}) {
  const resolved = await resolveCustomerId(input.customerId);

  if (!resolved.ok) {
    return fail(resolved.error);
  }

  const measurement = await prisma.measurement.findFirst({
    where: { id: input.id, customerId: resolved.id },
    select: { id: true },
  });

  if (!measurement) {
    return fail("That measurement no longer exists.");
  }

  try {
    await prisma.measurement.delete({ where: { id: measurement.id } });

    refresh(resolved.id);

    return { success: true as const };
  } catch (error) {
    console.error("Delete measurement failed:", error);
    return fail("Could not delete the measurement.");
  }
}

/* =========================================================
   STAFF ONLY — CUSTOMER RECORDS
========================================================= */

export async function createCustomer(input: {
  fullName: string;
  phone?: string;
  email?: string;
  city?: string;
  addressLine?: string;
  groupId?: number | null;
  notes?: string;
}) {
  await requireStaff();

  if (!input.fullName.trim()) {
    return fail("Enter the customer's name.");
  }

  try {
    const created = await prisma.customer.create({
      data: {
        code: "TEMP",
        fullName: input.fullName.trim(),
        phone: input.phone?.trim() || null,
        email: input.email?.trim() || null,
        city: input.city?.trim() || null,
        addressLine: input.addressLine?.trim() || null,
        groupId: input.groupId ?? null,
        notes: input.notes?.trim() || null,
        source: "In store",
        members: {
          create: {
            fullName: input.fullName.trim(),
            relation: "Self",
            isPrimary: true,
          },
        },
      },
      select: { id: true },
    });

    const code = `SGC-${String(created.id).padStart(4, "0")}`;

    await prisma.customer.update({
      where: { id: created.id },
      data: { code },
    });

    revalidatePath("/customers");

    return { success: true as const, data: { id: created.id, code } };
  } catch (error) {
    console.error("Create customer failed:", error);
    return fail("Could not create the customer.");
  }
}

export async function setCustomerStatus(customerId: number, status: string) {
  await requireStaff();

  try {
    await prisma.customer.update({
      where: { id: customerId },
      data: { status },
    });

    revalidatePath("/customers");
    revalidatePath(`/customers/${customerId}`);

    return { success: true as const };
  } catch (error) {
    console.error("Set customer status failed:", error);
    return fail("Could not update the customer.");
  }
}

export async function saveCustomerGroup(input: {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  discountPercent?: number | null;
}) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Name the group first.");
  }

  const data = {
    name,
    slug:
      input.slug?.trim() ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    description: input.description?.trim() || null,
    discountPercent: input.discountPercent ?? null,
  };

  try {
    if (input.id) {
      await prisma.customerGroup.update({ where: { id: input.id }, data });
    } else {
      await prisma.customerGroup.create({ data });
    }

    revalidatePath("/customers/groups");

    return { success: true as const };
  } catch (error) {
    console.error("Save customer group failed:", error);
    return fail("Could not save the group.");
  }
}

export async function deleteCustomerGroup(id: number) {
  await requireStaff();

  try {
    await prisma.customerGroup.delete({ where: { id } });

    revalidatePath("/customers/groups");

    return { success: true as const };
  } catch (error) {
    console.error("Delete customer group failed:", error);
    return fail("Could not delete the group.");
  }
}
