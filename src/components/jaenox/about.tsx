"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Radio, Disc3, Quote } from "lucide-react";
import { SectionHeading } from "./shared";
import { SITE } from "./data";

const highlights = [
  {
    icon: Flame,
    title: "Pure high energy",
    body: "Sets engineered around hard, driving and euphoric trance — built to lift a room from warm-up to hands-in-the-air in minutes.",
  },
  {
    icon: Radio,
    title: "Always live",
    body: "Regular online live streams bring the sound straight to fans around the world — the energy never switches off between gigs.",
  },
  {
    icon: Disc3,
    title: "Producer credits",
    body: "'HIVE MINDS' with Nu Spirit, signed to Future Sound of Egypt — studio craft to match the booth.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="About JAENOX">
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-flare/10 blur-[64px] sm:blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Who is JAENOX"
          title="The man behind"
          accent="the decks"
          align="left"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-ice/25 via-transparent to-flare/25 blur-xl" aria-hidden="true" />
            <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-2xl border border-ice/25">
              <Image
                src="/images/jaenox-spotlight.jpg"
                alt="JAENOX studio portrait in a dramatic spotlight"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-2xl uppercase tracking-[0.14em] text-foreground">
                  Jae <span className="text-ice">Moyns</span>
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-ice-soft/80">
                  JAENOX · Trance DJ & Producer
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 rounded-lg border border-amber-400/40 bg-background/90 px-4 py-2 shadow-[0_0_30px_rgba(251,191,36,0.15)] backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                Pro since Nov 2025
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative rounded-xl border border-ice/15 bg-card/50 p-6 sm:p-8">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-ice/20" aria-hidden="true" />
              <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                JAENOX has spent <span className="font-semibold text-ice-soft">years behind the decks</span> —
                DJing for the pure love of it long before the bookings came. In{" "}
                <span className="font-semibold text-ice-soft">November 2025</span> he went all-in,
                and years of quiet craft started paying off immediately: multiple events, talent
                competition wins, the{" "}
                <span className="font-semibold text-amber-300">Timescape stage takeover</span>,
                and a first international appearance at the{" "}
                <span className="font-semibold text-ice-soft">Luminosity Original after party</span>{" "}
                in Zandvoort, Netherlands.
              </p>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              What sets JAENOX apart is the connection — with the dancefloor and with the trance
              community itself. Whether he is behind the decks at a festival after-party,
              driving a beach club in Albania into the early hours, or streaming live to fans
              around the world, every set is delivered with intensity, emotion and a deep
              respect for the genre. That reputation is now crossing into production, with
              music signed to one of trance&apos;s most iconic labels.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="rounded-lg border border-border bg-secondary/40 p-4 transition-colors hover:border-ice/30"
                >
                  <h.icon className="h-5 w-5 text-ice" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                    {h.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{h.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={SITE.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-ice/40 bg-ice/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ice-soft transition-all hover:bg-ice/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
              >
                Hear the sets
              </a>
              <a
                href="#journey"
                className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Trace the journey →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
