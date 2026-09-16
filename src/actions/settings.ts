"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, requireStaff, ROLES, type Role } from "@/lib/session";

function fail(error: string) {
  return { success: false as const, error };
}

/* =========================================================
   TEAM
========================================================= */

const assignableRoles: Role[] = [ROLES.admin, ROLES.manager, ROLES.tailor, ROLES.cashier];

export async function updateStaffRole(userId: string, role: string) {
  const admin = await requireAdmin();

  if (!assignableRoles.includes(role as Role)) {
    return fail("That isn't a valid staff role.");
  }

  if (userId === admin.id && role !== ROLES.admin) {
    return fail("You can't remove your own admin access.");
  }

  try {
    await prisma.appUser.update({ where: { id: userId }, data: { role } });

    revalidatePath("/settings/team");

    return { success: true as const };
  } catch (error) {
    console.error("Update staff role failed:", error);
    return fail("Could not update that account.");
  }
}

export async function setStaffActive(userId: string, isActive: boolean) {
  const admin = await requireAdmin();

  if (userId === admin.id && !isActive) {
    return fail("You can't deactivate your own account.");
  }

  try {
    await prisma.appUser.update({ where: { id: userId }, data: { isActive } });

    revalidatePath("/settings/team");

    return { success: true as const };
  } catch (error) {
    console.error("Set staff active failed:", error);
    return fail("Could not update that account.");
  }
}

/* =========================================================
   YOUR ACCOUNT
========================================================= */

export async function updateOwnProfile(input: { name: string; phone?: string }) {
  const staff = await requireStaff();

  if (!input.name.trim()) {
    return fail("Enter your name.");
  }

  try {
    await prisma.appUser.update({
      where: { id: staff.id },
      data: { name: input.name.trim(), phone: input.phone?.trim() || null },
    });

    revalidatePath("/settings/account");

    return { success: true as const };
  } catch (error) {
    console.error("Update own profile failed:", error);
    return fail("Could not save your details.");
  }
}

/* =========================================================
   STORE PROFILE (persisted as a JSON setting)
========================================================= */

export type StoreProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export async function saveStoreProfile(input: StoreProfile) {
  const staff = await requireAdmin();

  if (!input.name.trim()) {
    return fail("Enter your store name.");
  }

  try {
    await prisma.storeSetting.upsert({
      where: { key: "store.profile" },
      create: { key: "store.profile", value: input, updatedBy: staff.id },
      update: { value: input, updatedBy: staff.id },
    });

    revalidatePath("/settings/store");

    return { success: true as const };
  } catch (error) {
    console.error("Save store profile failed:", error);
    return fail("Could not save the store profile.");
  }
}
