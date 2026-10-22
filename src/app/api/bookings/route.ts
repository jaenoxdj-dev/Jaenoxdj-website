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

type BookingInput = z.infer<typeof bookingSchema>;

const NOTIFY_EMAIL = process.env.BOOKING_NOTIFY_EMAIL || "jaenoxdj@gmail.com";
const FROM = "JAENOX Bookings <onboarding@resend.dev>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icsEscape(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function buildIcs(b: BookingInput, id: string): { filename: string; content: string } | null {
  const m = (b.eventDate || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const dtstart = `${m[1]}${m[2]}${m[3]}`;
  const dtstamp = `${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`;
  const description = [
    `Booking enquiry from ${b.name} (${b.email})`,
    `Event type: ${b.eventType}`,
    `Set length: ${b.setLength || "TBC"}`,
    `Budget: ${b.budget || "TBC"}`,
    "",
    b.message,
  ].join("\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JAENOX//Booking Form//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${id}@jaenox`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `SUMMARY:${icsEscape(`DJ JAENOX booking - ${b.eventType} - ${b.name}`)}`,
    ...(b.location ? [`LOCATION:${icsEscape(b.location)}`] : []),
    `DESCRIPTION:${icsEscape(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const ics = lines.join("\r\n");
  return { filename: "jaenox-booking.ics", content: Buffer.from(ics, "utf8").toString("base64") };
}

function detailRow(label: string, value?: string | null): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 16px 8px 24px;color:#9ca3af;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 24px 8px 0;color:#f9fafb;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildHtml(b: BookingInput): string {
  return `<div style="background:#0b0b0f;padding:24px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#141419;border:1px solid #26262e;border-radius:12px;overflow:hidden;">
    <div style="padding:20px 24px;border-bottom:1px solid #26262e;background:#101014;">
      <div style="color:#f9fafb;font-size:18px;font-weight:bold;letter-spacing:0.5px;">New booking request</div>
      <div style="color:#9ca3af;font-size:13px;margin-top:4px;">via the jaenox website booking form</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${detailRow("Name", b.name)}
      ${detailRow("Email", b.email)}
      ${detailRow("Event type", b.eventType)}
      ${detailRow("Event date", b.eventDate)}
      ${detailRow("Location", b.location)}
      ${detailRow("Set length", b.setLength)}
      ${detailRow("Budget", b.budget)}
    </table>
    <div style="padding:16px 24px 8px;color:#9ca3af;font-size:13px;">Message</div>
    <div style="padding:0 24px 24px;color:#f9fafb;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(b.message)}</div>
    <div style="padding:16px 24px;background:#101014;border-top:1px solid #26262e;color:#9ca3af;font-size:13px;">Hit reply to answer ${escapeHtml(b.name)} directly.</div>
  </div>
</div>`;
}

function buildText(b: BookingInput): string {
  return [
    "New booking request via jaenox website",
    "",
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Event type: ${b.eventType}`,
    b.eventDate ? `Event date: ${b.eventDate}` : "",
    b.location ? `Location: ${b.location}` : "",
    b.setLength ? `Set length: ${b.setLength}` : "",
    b.budget ? `Budget: ${b.budget}` : "",
    "",
    `Message: ${b.message}`,
    "",
    "(A calendar invite is attached when a date is provided.)",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendBookingEmail(id: string, b: BookingInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[bookings] RESEND_API_KEY not set - skipping email notification");
    return;
  }

  const attachment = buildIcs(b, id);
  const subject = `New booking: ${b.eventType}${b.eventDate ? ` - ${b.eventDate}` : ""} - ${b.name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_EMAIL],
        reply_to: b.email,
        subject,
        html: buildHtml(b),
        text: buildText(b),
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[bookings] notification email failed:", res.status, detail);
    } else {
      console.log("[bookings] notification email sent for booking", id);
    }
  } catch (e) {
    console.error("[bookings] notification email error:", e);
  }
}

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

    await sendBookingEmail(booking.id, b);

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (err) {
    console.error("[bookings] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your request. Please email jaenoxdj@gmail.com directly." },
      { status: 500 }
    );
  }
}
