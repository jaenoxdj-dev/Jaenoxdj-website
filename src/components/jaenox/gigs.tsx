"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, Trophy, Plane, Building, Disc3, Mail } from "lucide-react";
import { SectionHeading } from "./shared";
import { GIGS, SITE, type Gig } from "./data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "International", "Festival", "Club"] as const;
type Filter = (typeof FILTERS)[number];

function matchFilter(g: Gig, f: Filter) {
  if (f === "All") return true;
  if (f === "International") return g.region === "International";
  return g.venue === f;
}

export function Gigs() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = GIGS.filter((g) => matchFilter(g, filter));

  return (
    <section id="gigs" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="Selected gigs and performances">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-flare/10 blur-[64px] sm:blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Selected performances"
          title="Stage"
          accent="history"
          description="Festival mainstages, beach clubs and underground rooms — every set leaves a mark."
        />

        {/* Filter buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter gigs">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-all",
                filter === f
                  ? "border-ice bg-ice/15 text-ice shadow-[0_0_24px_rgba(34,211,238,0.25)]"
                  : "border-border text-muted-foreground hover:border-ice/40 hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((g) => (
              <motion.article
                layout
                key={g.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-ice/35"
              >
                <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-ice/10 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-ice/30 bg-ice/10">
                    {g.venue === "Festival" ? (
                      <Disc3 className="h-4.5 w-4.5 text-ice" aria-hidden="true" />
                    ) : g.venue === "Club" ? (
                      <Building className="h-4.5 w-4.5 text-ice" aria-hidden="true" />
                    ) : (
                      <Trophy className="h-4.5 w-4.5 text-ice" aria-hidden="true" />
                    )}
                  </span>
                  <div className="flex gap-2">
                    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {g.venue}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
                        g.region === "International"
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : "border-ice/30 bg-ice/10 text-ice-soft"
                      )}
                    >
                      {g.region === "International" && <Plane className="h-3 w-3" aria-hidden="true" />}
                      {g.region}
                    </span>
                  </div>
                </div>
                <h3 className="font-display mt-4 text-xl uppercase leading-tight tracking-wide text-foreground">
                  {g.name}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-flare" aria-hidden="true" />
                  {g.location}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-ice" aria-hidden="true" />
                  {g.year}
                </p>
                {g.note && (
                  <p className="mt-3 border-t border-border pt-3 text-xs italic leading-relaxed text-foreground/60">
                    {g.note}
                  </p>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Booking CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-2xl border border-flare/30 bg-gradient-to-r from-flare/[0.1] via-card to-ice/[0.08] p-8 text-center sm:p-10"
        >
          <h3 className="font-display text-2xl uppercase tracking-wide text-foreground sm:text-3xl">
            Want JAENOX <span className="gradient-text">on your lineup?</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            More dates are announced constantly — festivals, club nights and live streams.
            Lock in your event date before the calendar fills.
          </p>
          <a
            href={SITE.email.replace("@", "%40") ? "#contact" : "#contact"}
            className="animate-glow-pulse mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-ice to-ice-soft px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-background transition-transform hover:scale-[1.03]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Check availability
          </a>
        </motion.div>
      </div>
    </section>
  );
}
