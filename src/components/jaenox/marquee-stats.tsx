"use client";

import { Zap } from "lucide-react";
import { MARQUEE_ITEMS, STATS } from "./data";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-ice/15 bg-gradient-to-r from-ice/[0.06] via-transparent to-flare/[0.06] py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((text, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-sm uppercase tracking-[0.3em] text-foreground/70">
              {text}
            </span>
            <Zap className="h-3.5 w-3.5 text-ice/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl text-foreground sm:text-6xl">
      <span className="gradient-text text-glow-ice">{display}</span>
      <span className="text-ice-soft">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20" aria-label="Career highlights in numbers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 text-center transition-colors hover:border-ice/30 sm:p-8"
            >
              <div className="absolute -top-10 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-ice/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-foreground/90">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
