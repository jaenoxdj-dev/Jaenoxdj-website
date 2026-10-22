"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send, Mail, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "./shared";
import { SITE } from "./data";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  eventType: z.string().min(1, "Choose an event type"),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  setLength: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(10, "Give a few details about the event (10+ characters)"),
  // Honeypot: invisible to humans, irresistible to bots. Never rendered visibly.
  website: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

const inputCls =
  "border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ice/60 focus-visible:border-ice/50 h-11";

/** Opens the visitor's email app with the whole enquiry prefilled —
 *  used as a fallback if the booking API is unreachable (e.g. cold serverless host).
 *  Guarantees an enquiry never gets lost. */
function bookingMailto(values: FormValues) {
  const subject = `Booking enquiry — ${values.eventType}${values.eventDate ? ` · ${values.eventDate}` : ""}`;
  const body = [
    "Hi JAENOX,",
    "",
    "I'd like to book you for an event.",
    "",
    `Name: ${values.name}`,
    `Reply-to email: ${values.email}`,
    `Event type: ${values.eventType}`,
    values.eventDate ? `Date: ${values.eventDate}` : "",
    values.location ? `Location: ${values.location}` : "",
    values.setLength ? `Set length: ${values.setLength}` : "",
    values.budget ? `Budget: ${values.budget}` : "",
    "",
    "Details:",
    values.message,
  ]
    .filter(Boolean)
    .join("\n");
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      eventType: "",
      eventDate: "",
      location: "",
      setLength: "",
      budget: "",
      message: "",
      website: "",
    },
  });

  const eventType = watch("eventType");
  const setLength = watch("setLength");

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        toast.success("Booking request sent!", {
          description: `Thanks ${values.name.split(" ")[0]} — JAENOX will get back to you at ${values.email}.`,
        });
        reset();
      } else {
        toast.error(data.error ?? "Could not send your request.", {
          action: { label: "Email instead", onClick: () => bookingMailto(values) },
        });
      }
    } catch {
      toast.error("Network error — your enquiry didn't reach the server.", {
        action: { label: "Email instead", onClick: () => bookingMailto(values) },
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="Book JAENOX">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flare/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-flare/10 blur-[64px] sm:blur-[130px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Bookings & enquiries"
          title="Bring the energy"
          accent="to your event"
          description="Festivals, club nights, private events, live streams — tell JAENOX about your date and he'll take it from there."
        />

        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"
            noValidate
          >
            {/* Spam trap — hidden from humans, auto-filled by bots */}
            <input
              type="text"
              id="bk-website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bk-name" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Your name *
                </Label>
                <Input id="bk-name" placeholder="Alex Turner" className={inputCls} {...register("name")} />
                {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-email" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Email *
                </Label>
                <Input id="bk-email" type="email" placeholder="you@promoter.com" className={inputCls} {...register("email")} />
                {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-type" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Event type *
                </Label>
                <Select value={eventType} onValueChange={(v) => setValue("eventType", v, { shouldValidate: true })}>
                  <SelectTrigger id="bk-type" className={inputCls} aria-label="Event type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    {["Club Night", "Festival", "Private Event", "Corporate", "Live Stream", "Other"].map((t) => (
                      <SelectItem key={t} value={t} className="focus:bg-ice/10 focus:text-ice">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventType && <p className="text-xs text-rose-400">{errors.eventType.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-date" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Event date
                </Label>
                <Input id="bk-date" type="date" className={inputCls} {...register("eventDate")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-location" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Location / venue
                </Label>
                <Input id="bk-location" placeholder="City, country or venue" className={inputCls} {...register("location")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-length" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Set length
                </Label>
                <Select value={setLength} onValueChange={(v) => setValue("setLength", v)}>
                  <SelectTrigger id="bk-length" className={inputCls} aria-label="Set length">
                    <SelectValue placeholder="Select set length" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    {["60 minutes", "90 minutes", "2 hours", "Extended set", "Flexible"].map((t) => (
                      <SelectItem key={t} value={t} className="focus:bg-ice/10 focus:text-ice">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bk-budget" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Budget (optional)
                </Label>
                <Input id="bk-budget" placeholder="e.g. £500–£1,000 + travel" className={inputCls} {...register("budget")} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bk-message" className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">
                  Event details *
                </Label>
                <Textarea
                  id="bk-message"
                  placeholder="Tell JAENOX about the night — crowd, room size, other artists on the bill, anything that matters..."
                  rows={5}
                  className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ice/60 focus-visible:border-ice/50"
                  {...register("message")}
                />
                {errors.message && <p className="text-xs text-rose-400">{errors.message.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-7 h-12 w-full rounded-md bg-gradient-to-r from-ice to-ice-soft text-sm font-bold uppercase tracking-[0.18em] text-background transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send booking request
                </>
              )}
            </Button>
          </form>

          {/* Side info */}
          <div className="flex flex-col gap-5">
            <a
              href={`mailto:${SITE.email}?subject=Booking%20enquiry%20for%20JAENOX`}
              className="group rounded-2xl border border-ice/30 bg-gradient-to-br from-ice/10 to-transparent p-6 transition-all hover:border-ice/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                Prefer email?
              </p>
              <p className="mt-2 flex items-center gap-2.5 font-display text-xl tracking-wide text-ice sm:text-2xl">
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                {SITE.email}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Include event date, location, set length and budget where possible — it gets
                back to you faster.
              </p>
            </a>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-border bg-card/60 p-5">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                  <Clock className="h-4 w-4 text-ice" aria-hidden="true" />
                  Fast responses
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Booking requests land straight in JAENOX&apos;s inbox and typically get a reply
                  within 24–48 hours.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-5">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                  <ShieldCheck className="h-4 w-4 text-flare" aria-hidden="true" />
                  Worldwide bookings
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Based in the UK, regularly playing internationally — UK, Netherlands, Albania
                  and beyond. Travel-ready.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/jaenox-crew.jpg"
                  alt="JAENOX backstage with the crew"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 font-display text-sm uppercase tracking-[0.24em] text-foreground/90">
                  Festival tested · crowd approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
