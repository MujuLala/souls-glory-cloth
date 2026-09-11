import { NextResponse } from "next/server";
import { sql } from "@neondatabase/serverless";

const db = sql(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Keep Neon database active
    const result = await db`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Neon database is alive",
      result,
      executedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Neon keep-alive error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database keep-alive failed",
      },
      { status: 500 }
    );
  }
}