"use client";

import { motion } from "framer-motion";
import { Zap, Trophy, Globe2, Disc3, Rocket, Disc, Headphones } from "lucide-react";
import { SectionHeading } from "./shared";
import { TIMELINE } from "./data";

const TAG_STYLE: Record<string, { icon: typeof Zap; className: string }> = {
  ORIGIN: { icon: Rocket, className: "border-ice/40 bg-ice/10 text-ice-soft" },
  CRAFT: { icon: Headphones, className: "border-sky-400/40 bg-sky-400/10 text-sky-300" },
  BREAKTHROUGH: { icon: Zap, className: "border-flare/40 bg-flare/10 text-flare" },
  AWARD: { icon: Trophy, className: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  INTERNATIONAL: { icon: Globe2, className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
  RELEASE: { icon: Disc3, className: "border-violet-400/40 bg-violet-400/10 text-violet-300" },
};

export function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="JAENOX journey timeline">
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Years of craft → Now"
          title="A rapid rise"
          accent="in motion"
          description="The decks were a passion for years — then the talent did the talking. From hobby sets to FSOE and international stages in record time."
        />

        <div className="relative">
          {/* spine */}
          <div
            className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-ice/60 via-ice/25 to-flare/50 sm:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-14">
            {TIMELINE.map((t, i) => {
              const style = TAG_STYLE[t.tag] ?? TAG_STYLE.BREAKTHROUGH;
              const TagIcon = style.icon;
              const left = i % 2 === 0;
              return (
                <li key={`${t.period}-${t.title}`} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.6 }}
                    className={`flex items-start gap-5 sm:items-center ${
                      left ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* node */}
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ice/40 bg-background shadow-[0_0_20px_rgba(34,211,238,0.35)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <Disc className="h-4 w-4 text-ice" aria-hidden="true" />
                      <span className="absolute inset-0 rounded-full border border-ice/20 animate-ping [animation-duration:2.6s]" aria-hidden="true" />
                    </span>

                    <div className={`w-full sm:w-[calc(50%-3rem)] ${left ? "" : "sm:ml-auto"}`}>
                      <div className="group rounded-xl border border-border bg-card/60 p-5 transition-all hover:-translate-y-1 hover:border-ice/35 hover:shadow-[0_10px_40px_rgba(34,211,238,0.12)] sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-display text-sm tracking-[0.2em] text-ice-soft">
                            {t.period}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${style.className}`}
                          >
                            <TagIcon className="h-3 w-3" aria-hidden="true" />
                            {t.tag}
                          </span>
                        </div>
                        <h3 className="font-display mt-3 text-xl uppercase tracking-wide text-foreground sm:text-2xl">
                          {t.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {t.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
