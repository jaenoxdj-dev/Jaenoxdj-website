"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Mail, ChevronDown, MapPin, Award } from "lucide-react";
import { SITE } from "./data";
import { Equalizer } from "./shared";
import { JaenoxWordmark } from "./logo";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="JAENOX — UK Trance DJ and Producer"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/jaenox-decks.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_35%_45%,black,transparent)]" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-ice/15 blur-[64px] sm:blur-[130px]" />
        <div className="absolute -right-24 bottom-1/4 hidden h-80 w-80 rounded-full bg-flare/15 blur-[64px] sm:block sm:blur-[130px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:px-8"
      >
        {/* kicker */}
        <motion.div variants={item} className="mb-4 flex flex-wrap items-center gap-3 sm:mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-flare/40 bg-flare/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-flare sm:px-3.5 sm:text-[11px] sm:tracking-[0.24em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flare" />
            </span>
            New release — HIVE MINDS on FSOE
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-ice-soft sm:text-sm"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {SITE.role} — United Kingdom
        </motion.p>

        <motion.div variants={item} className="mt-2 w-full max-w-[42rem] xl:max-w-[46rem]">
          <h1 className="sr-only">JAENOX — UK Trance DJ &amp; Producer</h1>
          <JaenoxWordmark idPrefix="hero-word" entry energy pulse className="w-full" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl"
        >
          High-energy trance built <span className="font-semibold text-ice-soft">hard</span>,{" "}
          <span className="font-semibold text-ice-soft">driving</span> and{" "}
          <span className="font-semibold text-flare">euphoric</span> — from UK club nights to
          festival stages across Europe.
        </motion.p>

        {/* genre chips */}
        <motion.div variants={item} className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
          {["Hard Trance", "Driving Trance", "Euphoric Trance"].map((g, i) => (
            <span
              key={g}
              className="rounded-full border border-ice/25 bg-ice/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ice-soft/90 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]"
              style={{ boxShadow: i === 2 ? "0 0 24px rgba(224,57,215,0.15)" : undefined }}
            >
              {g}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
            <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            Timescape Takeover Winner
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={SITE.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-gradient-to-r from-ice to-ice-soft px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-background transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] sm:justify-start"
          >
            <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" aria-hidden="true" />
            Listen on SoundCloud
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-md border border-flare/50 bg-flare/10 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-flare transition-all hover:scale-[1.03] hover:bg-flare/20 hover:shadow-[0_0_40px_rgba(224,57,215,0.35)] sm:justify-start"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Book JAENOX
          </a>
        </motion.div>

        {/* equalizer */}
        <motion.div variants={item} className="pointer-events-none mt-8 max-w-xl opacity-70 sm:mt-12">
          <Equalizer bars={32} className="h-10 sm:h-14" />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#music"
        aria-label="Scroll to music section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-ice sm:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
        >
          Scroll
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
