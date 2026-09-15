import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/* A client is considered online while it has sent a
   heartbeat within this window. Heartbeats run every 25s. */
const ONLINE_WINDOW_MS = 70_000;

function since() {
  return new Date(Date.now() - ONLINE_WINDOW_MS);
}

async function readOnline() {
  const rows = await prisma.presence.findMany({
    where: { lastSeenAt: { gte: since() }, status: { not: "offline" } },
    orderBy: { lastSeenAt: "desc" },
    take: 50,
    select: { id: true, name: true, role: true, lastSeenAt: true },
  });

  return {
    total: rows.length,
    staff: rows.filter((row) => row.role !== "Customer").length,
    customers: rows.filter((row) => row.role === "Customer").length,
    people: rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      lastSeenAt: row.lastSeenAt.toISOString(),
    })),
  };
}

/* =========================================================
   GET — who is online right now
========================================================= */

export async function GET() {
  try {
    return NextResponse.json(await readOnline());
  } catch (error) {
    console.error("Presence read failed:", error);

    return NextResponse.json(
      { total: 0, staff: 0, customers: 0, people: [] },
      { status: 200 },
    );
  }
}

/* =========================================================
   POST — heartbeat
========================================================= */

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      id?: string;
      name?: string;
      role?: string;
      status?: string;
    };

    const id = (body.id ?? "").trim();

    if (!id || id.length > 120) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const data = {
      name: body.name?.slice(0, 80) ?? null,
      role: body.role?.slice(0, 40) ?? "Customer",
      status: body.status === "offline" ? "offline" : "online",
      lastSeenAt: new Date(),
    };

    await prisma.presence.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });

    return NextResponse.json(await readOnline());
  } catch (error) {
    console.error("Presence heartbeat failed:", error);

    return NextResponse.json(
      { total: 0, staff: 0, customers: 0, people: [] },
      { status: 200 },
    );
  }
}
