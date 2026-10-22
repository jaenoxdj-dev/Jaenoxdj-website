"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ExternalLink } from "lucide-react";
import { SectionHeading } from "./shared";
import { SOCIALS } from "./brand-icons";

function HypeButton() {
  const [count, setCount] = useState<number | null>(null);
  const [bursts, setBursts] = useState<number[]>([]);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    fetch("/api/hype")
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  async function hype() {
    setPulse((p) => p + 1);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 900);
    setCount((c) => (c ?? 0) + 1);
    try {
      const r = await fetch("/api/hype", { method: "POST" });
      const d = await r.json();
      if (d.ok) setCount(d.count);
    } catch {
      /* keep optimistic count */
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <AnimatePresence>
          {bursts.map((id, i) => (
            <motion.span
              key={id}
              initial={{ opacity: 1, scale: 0.6, x: "-50%", y: "-50%" }}
              animate={{ opacity: 0, scale: 2.4 + (i % 3) * 0.5, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 rounded-full border-2 border-ice"
              aria-hidden="true"
            />
          ))}
        </AnimatePresence>
        <motion.button
          key={pulse}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.92, 1.06, 1] }}
          transition={{ duration: 0.35 }}
          onClick={hype}
          aria-label="Hype JAENOX — show some love"
          className="animate-flare-pulse inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-flare via-[#ff5fd0] to-ice px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-105 active:scale-95"
        >
          <Zap className="h-4.5 w-4.5 fill-current" aria-hidden="true" />
          Hype JAENOX
        </motion.button>
      </div>
      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground" aria-live="polite">
        {count === null ? "Loading the love..." : (
          <>
            <span className="font-display text-lg text-ice-soft">{count.toLocaleString()}</span>{" "}
            fans have hyped so far
          </>
        )}
      </p>
    </div>
  );
}

export function Socials() {
  return (
    <section id="follow" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="Follow JAENOX on social media">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/40 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Join the movement"
          title="Follow"
          accent="the rise"
          description="Daily energy on the socials — stream clips, gig announcements, behind-the-scenes and first dibs on new music."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-center transition-colors"
              style={{ ["--soc" as string]: s.color }}
            >
              <div
                className="pointer-events-none absolute -top-12 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-15 blur-3xl transition-opacity duration-300 group-hover:opacity-50"
                style={{ background: s.color }}
                aria-hidden="true"
              />
              <span
                className="mx-auto grid h-14 w-14 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${s.color}55`,
                  background: `${s.color}14`,
                  boxShadow: `0 0 24px ${s.color}22`,
                }}
              >
                <s.icon className="h-6 w-6" style={{ color: s.color }} aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg uppercase tracking-[0.14em] text-foreground">
                {s.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: s.color }}>
                {s.handle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                Follow
                <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-flare/25 bg-gradient-to-b from-flare/[0.07] to-transparent p-8 text-center sm:p-10">
          <p className="font-display text-xl uppercase tracking-[0.14em] text-foreground sm:text-2xl">
            Feeling the energy? <span className="gradient-text">Send it back.</span>
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            One tap, permanent bragging rights. The counter never resets.
          </p>
          <div className="mt-7">
            <HypeButton />
          </div>
        </div>
      </div>
    </section>
  );
}
