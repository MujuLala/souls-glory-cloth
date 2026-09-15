import { prisma } from "@/lib/prisma";
import { getCurrentUser, getOrCreateCustomer, isStaff } from "@/lib/session";

/* =========================================================
   CHAT IDENTITY

   A thread belongs either to a signed-in customer or to an
   anonymous visitor identified by a browser-local guest key.
   Staff can reach every thread.
========================================================= */

export type ChatIdentity =
  | { kind: "staff"; userId: string; name: string }
  | { kind: "customer"; userId: string; customerId: number; name: string }
  | { kind: "guest"; guestKey: string; name: string };

export async function resolveIdentity(
  guestKey?: string | null,
  guestName?: string | null,
): Promise<ChatIdentity | null> {
  const user = await getCurrentUser();

  if (user && isStaff(user.role)) {
    return {
      kind: "staff",
      userId: user.id,
      name: user.name ?? user.email.split("@")[0],
    };
  }

  if (user) {
    const customerId = user.customerId ?? (await getOrCreateCustomer(user));

    return {
      kind: "customer",
      userId: user.id,
      customerId,
      name: user.name ?? user.email.split("@")[0],
    };
  }

  const key = (guestKey ?? "").trim();

  if (!key || key.length > 80) {
    return null;
  }

  return {
    kind: "guest",
    guestKey: key,
    name: (guestName ?? "").trim().slice(0, 60) || "Guest",
  };
}

/* =========================================================
   MESSAGE SHAPE SENT TO THE BROWSER
========================================================= */

export const messageSelect = {
  id: true,
  senderRole: true,
  senderName: true,
  body: true,
  metadata: true,
  attachmentUrl: true,
  attachmentName: true,
  readAt: true,
  createdAt: true,
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      images: {
        select: { imageUrl: true },
        orderBy: { sortOrder: "asc" },
        take: 1,
      },
    },
  },
} as const;

export type ChatMessage = {
  id: number;
  senderRole: string;
  senderName: string;
  body: string;
  metadata: unknown;
  attachmentUrl: string | null;
  attachmentName: string | null;
  createdAt: string;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
  } | null;
};

type RawMessage = {
  id: number;
  senderRole: string;
  senderName: string;
  body: string;
  metadata: unknown;
  attachmentUrl: string | null;
  attachmentName: string | null;
  createdAt: Date;
  product: {
    id: number;
    name: string;
    slug: string;
    price: unknown;
    salePrice: unknown;
    images: { imageUrl: string }[];
  } | null;
};

export function serializeMessage(message: RawMessage): ChatMessage {
  return {
    id: message.id,
    senderRole: message.senderRole,
    senderName: message.senderName,
    body: message.body,
    metadata: message.metadata ?? null,
    attachmentUrl: message.attachmentUrl,
    attachmentName: message.attachmentName,
    createdAt: message.createdAt.toISOString(),
    product: message.product
      ? {
          id: message.product.id,
          name: message.product.name,
          slug: message.product.slug,
          price: Number(
            (message.product.salePrice ?? message.product.price)?.toString() ??
              0,
          ),
          image: message.product.images[0]?.imageUrl ?? null,
        }
      : null,
  };
}

/* =========================================================
   CONVERSATION ACCESS
========================================================= */

/** Find (or start) the thread that belongs to this identity. */
export async function getOwnConversation(identity: ChatIdentity) {
  if (identity.kind === "staff") {
    return null;
  }

  const where =
    identity.kind === "customer"
      ? { customerId: identity.customerId }
      : { guestKey: identity.guestKey };

  const existing = await prisma.conversation.findFirst({
    where: { ...where, status: { not: "Closed" } },
    orderBy: { lastMessageAt: "desc" },
    select: { id: true },
  });

  if (existing) {
    return existing.id;
  }

  const created = await prisma.conversation.create({
    data:
      identity.kind === "customer"
        ? {
            customerId: identity.customerId,
            subject: "Storefront enquiry",
          }
        : {
            guestKey: identity.guestKey,
            guestName: identity.name,
            subject: "Storefront enquiry",
          },
    select: { id: true },
  });

  await prisma.message.create({
    data: {
      conversationId: created.id,
      senderRole: "system",
      senderName: "Soul's Glory Cloth",
      body:
        "Welcome to Soul's Glory Cloth. Ask us about fabrics, fittings, " +
        "delivery times, or attach a product and we'll walk you through the " +
        "details.",
    },
  });

  return created.id;
}

/** True when this identity is allowed to read/write the thread. */
export async function canAccessConversation(
  identity: ChatIdentity,
  conversationId: number,
): Promise<boolean> {
  if (identity.kind === "staff") {
    return true;
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { customerId: true, guestKey: true },
  });

  if (!conversation) {
    return false;
  }

  if (identity.kind === "customer") {
    return conversation.customerId === identity.customerId;
  }

  return conversation.guestKey === identity.guestKey;
}
