"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-ice/25 bg-ice/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ice-soft",
        )}
      >
        <Zap className="h-3 w-3" aria-hidden="true" />
        {kicker}
      </span>
      <h2 className="font-display mt-5 text-4xl uppercase leading-[1.02] tracking-wide text-foreground sm:text-5xl lg:text-6xl">
        {title}{" "}
        {accent ? <span className="gradient-text">{accent}</span> : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

export function Equalizer({
  bars = 28,
  className,
  barClassName,
}: {
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  // Integer-only pseudo-random values — deterministic across JS engines
  // (avoids SSR/client hydration mismatches from float precision differences)
  const barsData = Array.from({ length: bars }, (_, i) => ({
    heightPct: 28 + ((i * 37 + 11) % 23) * 3,
    duration: `${(0.7 + ((i * 7) % 9) * 0.09).toFixed(2)}s`,
    delay: `${(((i * 13) % 10) * -0.12).toFixed(2)}s`,
  }));
  return (
    <div
      className={cn("flex h-16 items-end gap-[3px]", className)}
      aria-hidden="true"
    >
      {barsData.map((b, i) => (
        <span
          key={i}
          className={cn(
            "eq-bar w-[3px] flex-1 rounded-t-sm bg-gradient-to-t from-ice/25 via-ice/70 to-ice-soft sm:w-1",
            barClassName
          )}
          style={{
            height: `${b.heightPct}%`,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
