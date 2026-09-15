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

/* =========================================================
   GET /api/chat/thread

   Opens (or resumes) the caller's own thread and returns the
   messages after `after`. The storefront widget polls this.
========================================================= */

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const guestKey = url.searchParams.get("guestKey");
    const guestName = url.searchParams.get("guestName");
    const after = Number(url.searchParams.get("after") ?? 0);

    const requestedId = Number(url.searchParams.get("conversationId") ?? 0);

    const identity = await resolveIdentity(guestKey, guestName);

    if (!identity) {
      return NextResponse.json(
        { error: "Missing identity" },
        { status: 400 },
      );
    }

    let conversationId = requestedId;

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

    const [conversation, messages] = await Promise.all([
      prisma.conversation.findUnique({
        where: { id: conversationId },
        select: {
          id: true,
          status: true,
          subject: true,
          unreadForCustomer: true,
          assignedTo: { select: { name: true } },
        },
      }),
      prisma.message.findMany({
        where: {
          conversationId,
          ...(after > 0 ? { id: { gt: after } } : {}),
        },
        orderBy: { id: "asc" },
        take: 200,
        select: messageSelect,
      }),
    ]);

    /* Opening the widget clears the customer's unread count. */
    if (identity.kind !== "staff" && conversation?.unreadForCustomer) {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { unreadForCustomer: 0 },
      });
    }

    /* Are any staff members online right now? */
    const staffOnline = await prisma.presence.count({
      where: {
        role: { not: "Customer" },
        status: "online",
        lastSeenAt: { gte: new Date(Date.now() - 70_000) },
      },
    });

    return NextResponse.json({
      conversationId,
      status: conversation?.status ?? "Open",
      agent: conversation?.assignedTo?.name ?? null,
      atelierOnline: staffOnline > 0,
      messages: messages.map(serializeMessage),
    });
  } catch (error) {
    console.error("Chat thread failed:", error);

    return NextResponse.json(
      { error: "Unable to load the conversation." },
      { status: 500 },
    );
  }
}
