import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const KEY = "global";

export async function GET() {
  try {
    const row = await db.hype.upsert({
      where: { key: KEY },
      update: {},
      create: { key: KEY, count: 0 },
    });
    return NextResponse.json({ ok: true, count: row.count });
  } catch (err) {
    console.error("[hype] GET failed:", err);
    return NextResponse.json({ ok: false, count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const row = await db.hype.upsert({
      where: { key: KEY },
      update: { count: { increment: 1 } },
      create: { key: KEY, count: 1 },
    });
    return NextResponse.json({ ok: true, count: row.count });
  } catch (err) {
    console.error("[hype] POST failed:", err);
    return NextResponse.json({ ok: false, count: 0 }, { status: 500 });
  }
}
