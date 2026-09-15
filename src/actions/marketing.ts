"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/session";
import { slugify } from "@/lib/format";

function fail(error: string) {
  return { success: false as const, error };
}

function ok() {
  return { success: true as const };
}

/* =========================================================
   COUPONS
========================================================= */

export async function saveCoupon(input: {
  id?: number;
  code: string;
  description?: string;
  type: string;
  value: number;
  minOrderTotal?: number | null;
  usageLimit?: number | null;
  startsAt?: string | null;
  endsAt?: string | null;
  status?: string;
}) {
  await requireStaff();

  const code = input.code.trim().toUpperCase();

  if (!code) {
    return fail("Enter a coupon code.");
  }

  if (!Number.isFinite(input.value) || input.value <= 0) {
    return fail("Enter a valid value.");
  }

  const data = {
    code,
    description: input.description?.trim() || null,
    type: input.type,
    value: input.value,
    minOrderTotal: input.minOrderTotal ?? null,
    usageLimit: input.usageLimit ?? null,
    startsAt: input.startsAt ? new Date(input.startsAt) : null,
    endsAt: input.endsAt ? new Date(input.endsAt) : null,
    status: input.status ?? "Active",
  };

  try {
    if (input.id) {
      await prisma.coupon.update({ where: { id: input.id }, data });
    } else {
      await prisma.coupon.create({ data });
    }

    revalidatePath("/marketing/coupons");

    return ok();
  } catch (error) {
    const code2 = (error as { code?: string })?.code;
    console.error("Save coupon failed:", error);

    return fail(
      code2 === "P2002"
        ? "That coupon code is already in use."
        : "Could not save the coupon.",
    );
  }
}

export async function deleteCoupon(id: number) {
  await requireStaff();

  try {
    await prisma.coupon.delete({ where: { id } });

    revalidatePath("/marketing/coupons");

    return ok();
  } catch (error) {
    console.error("Delete coupon failed:", error);
    return fail("Could not delete the coupon.");
  }
}

export async function setCouponStatus(id: number, status: string) {
  await requireStaff();

  try {
    await prisma.coupon.update({ where: { id }, data: { status } });

    revalidatePath("/marketing/coupons");

    return ok();
  } catch (error) {
    console.error("Set coupon status failed:", error);
    return fail("Could not update the coupon.");
  }
}

/* =========================================================
   CAMPAIGNS (used for both "Promotions" and campaign overview)
========================================================= */

export async function saveCampaign(input: {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  channel: string;
  status?: string;
  audience?: string;
  startsAt?: string | null;
  endsAt?: string | null;
}) {
  await requireStaff();

  const name = input.name.trim();

  if (!name) {
    return fail("Name the campaign first.");
  }

  const data = {
    name,
    slug: input.slug?.trim() || slugify(name),
    description: input.description?.trim() || null,
    channel: input.channel,
    status: input.status ?? "Draft",
    audience: input.audience?.trim() || null,
    startsAt: input.startsAt ? new Date(input.startsAt) : null,
    endsAt: input.endsAt ? new Date(input.endsAt) : null,
  };

  try {
    if (input.id) {
      await prisma.campaign.update({ where: { id: input.id }, data });
    } else {
      await prisma.campaign.create({ data });
    }

    revalidatePath("/marketing");
    revalidatePath("/marketing/promotions");

    return ok();
  } catch (error) {
    console.error("Save campaign failed:", error);
    return fail("Could not save the campaign.");
  }
}

export async function deleteCampaign(id: number) {
  await requireStaff();

  try {
    await prisma.campaign.delete({ where: { id } });

    revalidatePath("/marketing");
    revalidatePath("/marketing/promotions");

    return ok();
  } catch (error) {
    console.error("Delete campaign failed:", error);
    return fail("Could not delete the campaign.");
  }
}

export async function setCampaignStatus(id: number, status: string) {
  await requireStaff();

  try {
    await prisma.campaign.update({ where: { id }, data: { status } });

    revalidatePath("/marketing");
    revalidatePath("/marketing/promotions");

    return ok();
  } catch (error) {
    console.error("Set campaign status failed:", error);
    return fail("Could not update the campaign.");
  }
}
