import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser, isStaff } from "@/lib/session";

export const dynamic = "force-dynamic";

/* =========================================================
   GET /api/chat/conversations

   The inbox list for staff — every thread, newest activity
   first, with enough detail to render without a second call.
========================================================= */

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user || !isStaff(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const conversations = await prisma.conversation.findMany({
      where: status && status !== "All" ? { status } : undefined,
      orderBy: { lastMessageAt: "desc" },
      take: 100,
      select: {
        id: true,
        subject: true,
        status: true,
        priority: true,
        guestName: true,
        lastMessageAt: true,
        lastMessageText: true,
        unreadForAdmin: true,
        customer: {
          select: { id: true, fullName: true, phone: true, code: true },
        },
        assignedTo: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json({
      conversations: conversations.map((conversation) => ({
        id: conversation.id,
        subject: conversation.subject,
        status: conversation.status,
        priority: conversation.priority,
        name: conversation.customer?.fullName ?? conversation.guestName ?? "Guest",
        customerId: conversation.customer?.id ?? null,
        customerCode: conversation.customer?.code ?? null,
        phone: conversation.customer?.phone ?? null,
        lastMessageAt: conversation.lastMessageAt.toISOString(),
        lastMessageText: conversation.lastMessageText,
        unread: conversation.unreadForAdmin,
        assignedTo: conversation.assignedTo?.name ?? conversation.assignedTo?.email ?? null,
      })),
    });
  } catch (error) {
    console.error("List conversations failed:", error);

    return NextResponse.json({ conversations: [] }, { status: 200 });
  }
}
