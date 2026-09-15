import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   CUSTOMER READS (CMS)
========================================================= */

export type CustomerRow = {
  id: number;
  code: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  status: string;
  source: string;
  group: string | null;
  totalOrders: number;
  totalSpent: number;
  memberCount: number;
  measurementCount: number;
  lastOrderAt: string | null;
  createdAt: string;
};

export async function listCustomers(options: {
  search?: string;
  status?: string;
  groupId?: number;
  /* "with-measurements" | "no-measurements" | "new" */
  segment?: string;
  page?: number;
  perPage?: number;
} = {}) {
  const page = Math.max(1, options.page ?? 1);
  const perPage = options.perPage ?? 25;
  const search = options.search?.trim();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const where = {
    ...(options.status && options.status !== "All"
      ? { status: options.status }
      : {}),
    ...(options.groupId ? { groupId: options.groupId } : {}),
    ...(options.segment === "new"
      ? { createdAt: { gte: thirtyDaysAgo } }
      : {}),
    ...(options.segment === "with-measurements"
      ? { measurements: { some: {} } }
      : {}),
    ...(options.segment === "no-measurements"
      ? { measurements: { none: {} } }
      : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { code: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        code: true,
        fullName: true,
        email: true,
        phone: true,
        city: true,
        status: true,
        source: true,
        totalOrders: true,
        totalSpent: true,
        lastOrderAt: true,
        createdAt: true,
        group: { select: { name: true } },
        _count: { select: { members: true, measurements: true } },
      },
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    customers: rows.map((row) => ({
      id: row.id,
      code: row.code,
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      city: row.city,
      status: row.status,
      source: row.source,
      group: row.group?.name ?? null,
      totalOrders: row.totalOrders,
      totalSpent: toNumber(row.totalSpent),
      memberCount: row._count.members,
      measurementCount: row._count.measurements,
      lastOrderAt: row.lastOrderAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    })) satisfies CustomerRow[],
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

/* =========================================================
   COUNTS
========================================================= */

export async function getCustomerStats() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [all, active, newThisMonth, withMeasurements, revenue] =
    await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({ where: { status: "Active" } }),
      prisma.customer.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.customer.count({ where: { measurements: { some: {} } } }),
      prisma.customer.aggregate({ _sum: { totalSpent: true } }),
    ]);

  return {
    all,
    active,
    newThisMonth,
    withMeasurements,
    revenue: toNumber(revenue._sum.totalSpent),
  };
}

/* =========================================================
   SINGLE CUSTOMER
========================================================= */

export async function getCustomerDetail(id: number) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      group: { select: { id: true, name: true } },
      user: { select: { email: true, lastSeenAt: true } },
    },
  });

  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    code: customer.code,
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    whatsapp: customer.whatsapp,
    gender: customer.gender,
    addressLine: customer.addressLine,
    city: customer.city,
    postalCode: customer.postalCode,
    notes: customer.notes,
    status: customer.status,
    source: customer.source,
    groupName: customer.group?.name ?? null,
    totalOrders: customer.totalOrders,
    totalSpent: toNumber(customer.totalSpent),
    lastOrderAt: customer.lastOrderAt?.toISOString() ?? null,
    createdAt: customer.createdAt.toISOString(),
    hasLogin: Boolean(customer.userId),
    lastSeenAt: customer.user?.lastSeenAt?.toISOString() ?? null,
  };
}
