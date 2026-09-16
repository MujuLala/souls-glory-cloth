import { redirect } from "next/navigation";

import { auth } from "@/lib/server";
import { prisma } from "@/lib/prisma";
import { padCode } from "@/lib/format";

/* =========================================================
   ROLES
========================================================= */

export const ROLES = {
  admin: "Admin",
  manager: "Manager",
  tailor: "Tailor",
  cashier: "Cashier",
  customer: "Customer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Roles allowed into the admin CMS. */
export const STAFF_ROLES: Role[] = [
  ROLES.admin,
  ROLES.manager,
  ROLES.tailor,
  ROLES.cashier,
];

export function isStaff(role: string | undefined | null): boolean {
  return STAFF_ROLES.includes((role ?? "") as Role);
}

/* =========================================================
   RAW SESSION
========================================================= */

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
};

/**
 * The signed-in identity straight from Neon Auth, or null.
 * Never throws — a broken auth service should degrade to
 * "signed out" rather than 500 the whole page.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const { data } = await auth.getSession();

    const user = data?.user;

    if (!user?.id || !user.email) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? null,
      image: (user as { image?: string | null }).image ?? null,
    };
  } catch (error) {
    console.error("getSession failed:", error);
    return null;
  }
}

/* =========================================================
   APP USER

   Mirrors the auth identity into our own tables so the rest
   of the schema can hold real foreign keys, and decides the
   role the first time we see a user.
========================================================= */

function resolveBootstrapRole(email: string, existingUsers: number): Role {
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.includes(email.toLowerCase())) {
    return ROLES.admin;
  }

  /* The very first account to sign in owns the workspace. */
  if (existingUsers === 0) {
    return ROLES.admin;
  }

  return ROLES.customer;
}

export type AppUserWithCustomer = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  avatarUrl: string | null;
  customerId: number | null;
};

export async function getCurrentUser(): Promise<AppUserWithCustomer | null> {
  const session = await getSessionUser();

  if (!session) {
    return null;
  }

  const existing = await prisma.appUser.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
      customer: { select: { id: true } },
    },
  });

  if (existing) {
    /* Keep the presence timestamp fresh without blocking the
       render on it. */
    void prisma.appUser
      .update({
        where: { id: existing.id },
        data: { lastSeenAt: new Date() },
      })
      .catch(() => undefined);

    return {
      id: existing.id,
      email: existing.email,
      name: existing.name,
      role: existing.role,
      avatarUrl: existing.avatarUrl,
      customerId: existing.customer?.id ?? null,
    };
  }

  const userCount = await prisma.appUser.count();
  const role = resolveBootstrapRole(session.email, userCount);

  try {
    const created = await prisma.appUser.create({
      data: {
        id: session.id,
        email: session.email,
        name: session.name,
        avatarUrl: session.image ?? null,
        role,
        lastSeenAt: new Date(),
      },
      select: { id: true, email: true, name: true, role: true, avatarUrl: true },
    });

    return { ...created, customerId: null };
  } catch (error) {
    /* Two requests can both find "no existing row" and race to
       create one (e.g. a layout and a page fetching the
       session in parallel). The loser hits this unique
       constraint — just read back what the winner created. */
    if ((error as { code?: string }).code === "P2002") {
      const winner = await prisma.appUser.findUnique({
        where: { id: session.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          customer: { select: { id: true } },
        },
      });

      if (winner) {
        return { ...winner, customerId: winner.customer?.id ?? null };
      }
    }

    throw error;
  }
}

/* =========================================================
   CUSTOMER RECORD

   Every signed-in shopper gets a Customer row plus a "Self"
   member, so measurements always have something to hang on.
========================================================= */

export async function getOrCreateCustomer(user: AppUserWithCustomer) {
  const existing = await prisma.customer.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (existing) {
    return existing.id;
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        code: "TEMP",
        fullName: user.name ?? user.email.split("@")[0],
        email: user.email,
        source: "Storefront",
        members: {
          create: {
            fullName: user.name ?? user.email.split("@")[0],
            relation: "Self",
            isPrimary: true,
          },
        },
      },
      select: { id: true },
    });

    await prisma.customer.update({
      where: { id: customer.id },
      data: { code: padCode("SGC", customer.id, 4) },
    });

    return customer.id;
  } catch (error) {
    /* Same race as the AppUser create above — another request
       may have created the customer row first. */
    if ((error as { code?: string }).code === "P2002") {
      const winner = await prisma.customer.findUnique({
        where: { userId: user.id },
        select: { id: true },
      });

      if (winner) {
        return winner.id;
      }
    }

    throw error;
  }
}

/* =========================================================
   GUARDS
========================================================= */

export async function requireUser(redirectTo = "/sign-in") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireStaff() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isStaff(user.role)) {
    redirect("/account");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireStaff();

  if (user.role !== ROLES.admin && user.role !== ROLES.manager) {
    redirect("/dashboard");
  }

  return user;
}
