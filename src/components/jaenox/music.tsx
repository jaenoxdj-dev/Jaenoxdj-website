"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, Sparkles, Disc3 } from "lucide-react";
import { SectionHeading } from "./shared";
import { SITE } from "./data";

const SC_EMBED =
  "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjae-moyns&color=%2322d3ee&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";

export function Music() {
  const [playerLoaded, setPlayerLoaded] = useState(false);

  return (
    <section id="music" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="Music and releases">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-ice/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-ice/10 blur-[64px] sm:blur-[130px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Latest release"
          title="HIVE MINDS"
          accent="— out now"
          description="JAENOX teams up with Nu Spirit for a driving, euphoric weapon — signed to Future Sound of Egypt, the label at the heart of global trance."
        />

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          {/* Artwork card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-2xl border border-ice/25 bg-card"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-ice/20 to-flare/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <a
              href={SITE.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block"
              aria-label="Listen to HIVE MINDS on SoundCloud"
            >
              <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[3/1]">
                <Image
                  src="/images/jaenox-hiveminds.jpg"
                  alt="HIVE MINDS — JAENOX & Nu Spirit official artwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                    <Disc3 className="h-3 w-3" aria-hidden="true" />
                    Future Sound of Egypt
                  </p>
                  <h3 className="font-display mt-3 text-2xl uppercase tracking-wide text-foreground sm:text-3xl lg:text-4xl">
                    JAENOX <span className="text-ice">&</span> Nu Spirit
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
                    HIVE MINDS
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-ice to-ice-soft px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-background transition-transform group-hover:scale-105">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  Listen
                </span>
              </div>
            </a>
          </motion.div>

          {/* Player + info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card/70">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-ice" aria-hidden="true" />
                  SoundCloud player
                </p>
                <a
                  href={SITE.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-ice transition-colors hover:text-ice-soft"
                >
                  Open profile
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
              {playerLoaded ? (
                <iframe
                  title="JAENOX on SoundCloud"
                  height="340"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={SC_EMBED}
                  className="block w-full bg-[#0b0e17]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayerLoaded(true)}
                  className="group relative flex h-[300px] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#0b0e17] sm:h-[340px]"
                  aria-label="Load the SoundCloud player"
                >
                  <Image
                    src="/images/jaenox-club.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-45"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-[#0b0e17]/60" aria-hidden="true" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-full border border-ice/50 bg-ice/15 text-ice transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                    <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                  </span>
                  <span className="relative text-center">
                    <span className="block text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                      Latest tracks
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.24em] text-ice-soft">
                      Tap to load the player
                    </span>
                  </span>
                  <span className="relative inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <Disc3 className="h-3 w-3" aria-hidden="true" />
                    soundcloud.com/jae-moyns
                  </span>
                </button>
              )}
            </div>

            <div className="rounded-2xl border border-flare/20 bg-gradient-to-br from-flare/[0.08] to-transparent p-6">
              <p className="text-sm leading-relaxed text-foreground/85">
                The journey has moved into the studio.{" "}
                <span className="font-semibold text-flare">&ldquo;HIVE MINDS&rdquo;</span> marks
                JAENOX&apos;s production debut alongside Nu Spirit — and it landed on one of
                trance&apos;s most storied labels. More music is loading.
              </p>
              <a
                href={SITE.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-ice/40 bg-ice/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ice-soft transition-all hover:bg-ice/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Follow on SoundCloud
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
