import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  canAccessConversation,
  getOwnConversation,
  messageSelect,
  resolveIdentity,
  serializeMessage,
} from "@/lib/chat";

export const dynamic = "force-dynamic";

const MAX_BODY_LENGTH = 4000;

/* =========================================================
   POST /api/chat/messages

   Sends one message. Works for shoppers, guests and staff —
   the sender role comes from the session, never the payload.
========================================================= */

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      conversationId?: number;
      body?: string;
      productId?: number;
      metadata?: Record<string, unknown>;
      guestKey?: string;
      guestName?: string;
    };

    const identity = await resolveIdentity(
      payload.guestKey,
      payload.guestName,
    );

    if (!identity) {
      return NextResponse.json({ error: "Missing identity" }, { status: 400 });
    }

    const body = (payload.body ?? "").trim();

    if (!body && !payload.productId) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    if (body.length > MAX_BODY_LENGTH) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    /* Resolve the target thread. */
    let conversationId = Number(payload.conversationId ?? 0);

    if (conversationId) {
      const allowed = await canAccessConversation(identity, conversationId);

      if (!allowed) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    } else {
      const own = await getOwnConversation(identity);

      if (!own) {
        return NextResponse.json(
          { error: "Staff must pass a conversationId" },
          { status: 400 },
        );
      }

      conversationId = own;
    }

    /* Only accept a product id that actually exists. */
    let productId: number | null = null;

    if (payload.productId) {
      const product = await prisma.product.findUnique({
        where: { id: Number(payload.productId) },
        select: { id: true },
      });

      productId = product?.id ?? null;
    }

    const isStaffSender = identity.kind === "staff";

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderRole: isStaffSender ? "admin" : "customer",
        senderId: identity.kind === "guest" ? null : identity.userId,
        senderName: identity.name,
        body,
        productId,
        metadata: (payload.metadata ?? undefined) as never,
      },
      select: messageSelect,
    });

    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        lastMessageText: body.slice(0, 160) || "Shared a product",
        status: "Open",
        ...(isStaffSender
          ? { unreadForCustomer: { increment: 1 }, unreadForAdmin: 0 }
          : { unreadForAdmin: { increment: 1 } }),
      },
    });

    return NextResponse.json({
      conversationId,
      message: serializeMessage(message),
    });
  } catch (error) {
    console.error("Send message failed:", error);

    return NextResponse.json(
      { error: "Unable to send the message." },
      { status: 500 },
    );
  }
}
