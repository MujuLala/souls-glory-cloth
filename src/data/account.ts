import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/format";

/* =========================================================
   ACCOUNT READS

   Everything the signed-in customer's own pages need, and
   the pickers checkout uses for made-to-measure lines.
========================================================= */

export type MemberSummary = {
  id: number;
  fullName: string;
  relation: string;
  gender: string | null;
  ageGroup: string | null;
  phone: string | null;
  notes: string | null;
  isPrimary: boolean;
  measurementCount: number;
};

export type MeasurementSummary = {
  id: number;
  title: string;
  templateId: number;
  templateName: string;
  memberId: number | null;
  memberName: string | null;
  unit: string;
  values: Record<string, string | number>;
  notes: string | null;
  isDefault: boolean;
  updatedAt: string;
};

export type OrderSummary = {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  type: string;
  total: number;
  itemCount: number;
  createdAt: string;
  dueDate: string | null;
  items: {
    id: number;
    name: string;
    image: string | null;
    quantity: number;
    total: number;
    isCustom: boolean;
    memberName: string | null;
    size: string | null;
  }[];
};

/* =========================================================
   MEMBERS
========================================================= */

export async function getMembers(
  customerId: number,
): Promise<MemberSummary[]> {
  const members = await prisma.customerMember.findMany({
    where: { customerId },
    orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      fullName: true,
      relation: true,
      gender: true,
      ageGroup: true,
      phone: true,
      notes: true,
      isPrimary: true,
      _count: { select: { measurements: true } },
    },
  });

  return members.map((member) => ({
    id: member.id,
    fullName: member.fullName,
    relation: member.relation,
    gender: member.gender,
    ageGroup: member.ageGroup,
    phone: member.phone,
    notes: member.notes,
    isPrimary: member.isPrimary,
    measurementCount: member._count.measurements,
  }));
}

/* =========================================================
   MEASUREMENTS
========================================================= */

export async function getMeasurements(
  customerId: number,
): Promise<MeasurementSummary[]> {
  const measurements = await prisma.measurement.findMany({
    where: { customerId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      templateId: true,
      unit: true,
      values: true,
      notes: true,
      isDefault: true,
      updatedAt: true,
      template: { select: { name: true } },
      member: { select: { id: true, fullName: true } },
    },
  });

  return measurements.map((measurement) => ({
    id: measurement.id,
    title: measurement.title,
    templateId: measurement.templateId,
    templateName: measurement.template.name,
    memberId: measurement.member?.id ?? null,
    memberName: measurement.member?.fullName ?? null,
    unit: measurement.unit,
    values: (measurement.values ?? {}) as Record<string, string | number>,
    notes: measurement.notes,
    isDefault: measurement.isDefault,
    updatedAt: measurement.updatedAt.toISOString(),
  }));
}

/* =========================================================
   TEMPLATES
========================================================= */

export type TemplateWithFields = {
  id: number;
  name: string;
  slug: string;
  gender: string;
  description: string | null;
  fields: {
    id: number;
    key: string;
    label: string;
    unit: string;
    helpText: string | null;
    placeholder: string | null;
    required: boolean;
  }[];
};

export async function getMeasurementTemplates(): Promise<
  TemplateWithFields[]
> {
  const templates = await prisma.measurementTemplate.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { fields: { orderBy: { sortOrder: "asc" } } },
  });

  return templates.map((template) => ({
    id: template.id,
    name: template.name,
    slug: template.slug,
    gender: template.gender,
    description: template.description,
    fields: template.fields.map((field) => ({
      id: field.id,
      key: field.key,
      label: field.label,
      unit: field.unit,
      helpText: field.helpText,
      placeholder: field.placeholder,
      required: field.required,
    })),
  }));
}

/* =========================================================
   ORDERS
========================================================= */

export async function getCustomerOrders(
  customerId: number,
  limit = 50,
): Promise<OrderSummary[]> {
  const orders = await prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      items: {
        include: { member: { select: { fullName: true } } },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    type: order.type,
    total: toNumber(order.total),
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: order.createdAt.toISOString(),
    dueDate: order.dueDate?.toISOString() ?? null,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      total: toNumber(item.total),
      isCustom: item.isCustom,
      memberName: item.member?.fullName ?? null,
      size: item.size,
    })),
  }));
}
