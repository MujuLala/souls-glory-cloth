"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";

function fail(error: string) {
  return { success: false as const, error };
}

export async function setConversationStatus(id: number, status: string) {
  await requireStaff();

  try {
    await prisma.conversation.update({ where: { id }, data: { status } });

    revalidatePath("/inbox");

    return { success: true as const };
  } catch (error) {
    console.error("Set conversation status failed:", error);
    return fail("Could not update the conversation.");
  }
}

export async function setConversationPriority(id: number, priority: string) {
  await requireStaff();

  try {
    await prisma.conversation.update({ where: { id }, data: { priority } });

    revalidatePath("/inbox");

    return { success: true as const };
  } catch (error) {
    console.error("Set conversation priority failed:", error);
    return fail("Could not update the conversation.");
  }
}

export async function assignConversation(id: number, assignedToId: string | null) {
  const staff = await requireStaff();

  try {
    await prisma.conversation.update({
      where: { id },
      data: { assignedToId: assignedToId ?? staff.id },
    });

    revalidatePath("/inbox");

    return { success: true as const };
  } catch (error) {
    console.error("Assign conversation failed:", error);
    return fail("Could not assign the conversation.");
  }
}
