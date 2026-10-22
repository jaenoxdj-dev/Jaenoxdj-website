import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  eventType: z.string().trim().min(1, "Please choose an event type").max(60),
  eventDate: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  setLength: z.string().trim().max(60).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell JAENOX a little more about the event (10+ characters)")
    .max(3000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid booking request" },
        { status: 400 }
      );
    }

    const b = parsed.data;
    const booking = await db.booking.create({
      data: {
        name: b.name,
        email: b.email,
        eventType: b.eventType,
        eventDate: b.eventDate || null,
        location: b.location || null,
        setLength: b.setLength || null,
        budget: b.budget || null,
        message: b.message,
      },
    });

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (err) {
    console.error("[bookings] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your request. Please email jaenoxdj@gmail.com directly." },
      { status: 500 }
    );
  }
}
