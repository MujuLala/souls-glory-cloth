"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

/**
 * Finds a signed-up account by email or name, regardless of
 * their current role — this is how an admin promotes a
 * customer to staff, since they won't appear in the staff
 * list until they already have a staff role.
 */
export async function searchAppUsers(query: string) {
  await requireAdmin();

  const term = query.trim();

  if (term.length < 2) {
    return { success: true as const, users: [] };
  }

  const users = await prisma.appUser.findMany({
    where: {
      OR: [
        { email: { contains: term, mode: "insensitive" } },
        { name: { contains: term, mode: "insensitive" } },
      ],
    },
    orderBy: { email: "asc" },
    take: 10,
    select: { id: true, name: true, email: true, role: true },
  });

  return { success: true as const, users };
}
