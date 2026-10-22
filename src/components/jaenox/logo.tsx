"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LETTERS,
  VIEW,
  WAVE_BAND,
  WAVE_FULL,
  WAVE_LONG,
  MARK_VIEW,
  O_PATH,
} from "./logo-paths";

const ICE = "#22d3ee";
const ICE_SOFT = "#7deefb";
const LETTER_FILL = "#f4f8ff";

const WAVE_AMP = 12.5;
const WAVE_PERIOD = 24;

/** Deterministic periodic sine wave path (same math as the generator script). */
function wavePath(x0: number, x1: number, yMid: number, amp: number, period: number, step = 1) {
  const pts: string[] = [];
  const n = Math.ceil((x1 - x0) / step);
  for (let i = 0; i <= n; i++) {
    const px = x0 + i * step;
    const py = yMid - amp * Math.sin((2 * Math.PI * (px - x0)) / period);
    pts.push(`L ${Math.round(px * 10) / 10} ${Math.round(py * 10) / 10}`);
  }
  return `M ${x0} ${yMid} ${pts.join(" ")}`.replace("L", "");
}

/** Long variant (one extra period) so the wave can loop seamlessly. */
const WAVE_MARK_LONG = wavePath(-11 - WAVE_PERIOD, 111, 50, WAVE_AMP, WAVE_PERIOD);

/** Elliptical orbit path for the comet animations. */
function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
}

/* ------------------------------------------------------------------ */
/* Lite-mode detection — low-power WebViews (WhatsApp/IG in-app browser)
/* and touch devices get static energy effects: orbiting rings, pointer
/* parallax and per-frame SVG glow filters are the most expensive
/* continuous paints on mobile GPUs. Hydration-safe (server renders the
/* full mode; client relaxes it after mount).                           */
/* ------------------------------------------------------------------ */
function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const mqs = [coarse, narrow];
    const update = () => setLite(coarse.matches || narrow.matches);
    update();
    for (const m of mqs) {
      if (m.addEventListener) m.addEventListener("change", update);
      else m.addListener(update);
    }
    return () => {
      for (const m of mqs) {
        if (m.removeEventListener) m.removeEventListener("change", update);
        else m.removeListener(update);
      }
    };
  }, []);
  return lite;
}

/* ------------------------------------------------------------------ */
/* Full wordmark — JAENOX with the signature waveform through the O    */
/* ------------------------------------------------------------------ */

export function JaenoxWordmark({
  className,
  animated = true,
  entry = false,
  energy = false,
  pulse = false,
  idPrefix = "jx-word",
}: {
  className?: string;
  /** Flowing waveform through the O */
  animated?: boolean;
  /** Staggered letter reveal on mount (hero) */
  entry?: boolean;
  /** Orbiting light rings + parallax glow (hero scale) */
  energy?: boolean;
  /** Click for a bass-drop pulse */
  pulse?: boolean;
  /** Deterministic SVG id prefix — pass a unique value per usage site
   *  (keeps server & client markup identical, so hydration never mismatches). */
  idPrefix?: string;
}) {
  const uid = idPrefix.replace(/[^a-zA-Z0-9-]/g, "") || "jx-word";
  const clipId = `wc-${uid}`;
  const glowId = `wg-${uid}`;
  const lglowId = `lg-${uid}`;

  const reduce = useReducedMotion();
  const lite = useLiteMode();
  const live = animated && !reduce;
  const energyLive = energy && !lite && !reduce;

  const [hover, setHover] = useState(false);
  const [dropping, setDropping] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (dropTimer.current) clearTimeout(dropTimer.current);
    },
    []
  );

  const onDrop = useCallback(() => {
    if (!pulse || reduce || dropping) return;
    setDropping(true);
    dropTimer.current = setTimeout(() => setDropping(false), 700);
  }, [pulse, reduce, dropping]);

  // pointer parallax — rings + glow drift subtly toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18 };
  const ringsX = useSpring(useTransform(mx, (v) => v * 10), springCfg);
  const ringsY = useSpring(useTransform(my, (v) => v * 7), springCfg);
  const glowX = useSpring(useTransform(mx, (v) => v * -6), springCfg);
  const glowY = useSpring(useTransform(my, (v) => v * -4), springCfg);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!energyLive) return;
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [energyLive, mx, my]
  );
  const onPointerLeave = useCallback(() => {
    setHover(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const pad = 10;
  const vb = `${-pad} -${pad + 8} ${VIEW.width + pad * 2} ${VIEW.capHeight + pad * 2 + 16}`;

  const wave = (
    <g clipPath={`url(#${clipId})`} aria-hidden="true">
      <motion.path
        d={live ? WAVE_LONG : WAVE_FULL}
        fill="none"
        stroke={ICE_SOFT}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter={lite ? undefined : `url(#${glowId})`}
        animate={live ? { x: [0, -WAVE_BAND.period] } : { x: 0 }}
        transition={
          live
            ? { x: { repeat: Infinity, ease: "linear", duration: hover ? 0.75 : 1.7 } }
            : { duration: 0 }
        }
      />
    </g>
  );

  return (
    <div
      className={cn("relative select-none", pulse && "cursor-pointer", className)}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={onPointerLeave}
      onClick={onDrop}
    >
      {/* radial glow behind everything */}
      {energy && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.20), rgba(224,57,215,0.07) 60%, transparent)",
            x: glowX,
            y: glowY,
          }}
          animate={
            energyLive ? { opacity: hover ? 1 : [0.55, 0.85, 0.55] } : { opacity: 0.7 }
          }
          transition={hover ? { duration: 0.3 } : { repeat: energyLive ? Infinity : 0, duration: 4.5 }}
        />
      )}

      {/* orbiting light rings (energy mode — desktop / fine pointer only) */}
      {energyLive && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ x: ringsX, y: ringsY }}
        >
          <svg
            className="absolute left-1/2 top-1/2 h-[430%] w-[132%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            viewBox="-650 -215 1300 430"
            fill="none"
          >
            <ellipse
              cx="0"
              cy="0"
              rx="620"
              ry="185"
              stroke={ICE}
              strokeOpacity="0.16"
              strokeWidth="1.4"
              strokeDasharray="3 14"
              transform="rotate(-4)"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="540"
              ry="140"
              stroke="#e039d7"
              strokeOpacity="0.12"
              strokeWidth="1.2"
              strokeDasharray="2 18"
              transform="rotate(5)"
            />
            {!reduce && (
              <>
                <circle r="3" fill={ICE_SOFT} opacity="0.9">
                  <animateMotion
                    dur="11s"
                    repeatCount="indefinite"
                    path={ellipsePath(0, 0, 620, 185)}
                  />
                </circle>
                <circle r="2.4" fill="#e039d7" opacity="0.8">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path={ellipsePath(0, 0, 540, 140)}
                  />
                </circle>
              </>
            )}
          </svg>
        </motion.div>
      )}

      {/* bass-drop burst ring */}
      {pulse && (
        <AnimatePresence>
          {dropping && (
            <motion.span
              key="burst"
              aria-hidden="true"
              initial={{ opacity: 0.75, scale: 0.85 }}
              animate={{ opacity: 0, scale: 1.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 block h-[130%] w-[106%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ice/60"
            />
          )}
        </AnimatePresence>
      )}

      {/* the wordmark itself */}
      <motion.svg
        viewBox={vb}
        className="relative z-10 h-auto w-full overflow-visible"
        role="img"
        aria-label="JAENOX"
        animate={dropping ? { scale: [1, 1.035, 0.985, 1] } : { scale: 1 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <defs>
          <filter id={lglowId} x="-15%" y="-45%" width="130%" height="190%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor={ICE}
              floodOpacity={hover ? 0.85 : 0.55}
            />
          </filter>
          <filter id={glowId} x="-30%" y="-140%" width="160%" height="380%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2.2"
              floodColor={ICE_SOFT}
              floodOpacity="0.95"
            />
          </filter>
          <clipPath id={clipId}>
            <rect
              x={WAVE_BAND.x0}
              y={WAVE_BAND.yMid - WAVE_AMP - 4}
              width={WAVE_BAND.x1 - WAVE_BAND.x0}
              height={WAVE_AMP * 2 + 8}
              rx="4"
            />
          </clipPath>
        </defs>
        {LETTERS.map((l, i) => (
          <motion.path
            key={l.ch}
            d={l.d}
            fill={LETTER_FILL}
            stroke={ICE}
            strokeWidth={1.6}
            strokeLinejoin="round"
            filter={`url(#${lglowId})`}
            initial={entry ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              entry
                ? { delay: 0.12 + i * 0.07, duration: 0.55, ease: "easeOut" }
                : { duration: 0 }
            }
          />
        ))}
        {wave}
      </motion.svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Compact mark — the O with its waveform, optionally on a brand tile  */
/* ------------------------------------------------------------------ */

export function JaenoxMark({
  className,
  animated = true,
  tile = true,
  idPrefix = "jx-mark",
}: {
  className?: string;
  animated?: boolean;
  tile?: boolean;
  /** Deterministic SVG id prefix — pass a unique value per usage site
   *  (keeps server & client markup identical, so hydration never mismatches). */
  idPrefix?: string;
}) {
  const uid = idPrefix.replace(/[^a-zA-Z0-9-]/g, "") || "jx-mark";
  const clipId = `mc-${uid}`;
  const glowId = `mg-${uid}`;
  const lglowId = `ml-${uid}`;
  const reduce = useReducedMotion();
  const live = animated && !reduce;

  const inner = (
    <>
      <path
        d={O_PATH}
        fill={LETTER_FILL}
        stroke={ICE}
        strokeWidth={1.8}
        strokeLinejoin="round"
        filter={`url(#${lglowId})`}
      />
      <g clipPath={`url(#${clipId})`} aria-hidden="true">
        <motion.path
          d={WAVE_MARK_LONG}
          fill="none"
          stroke={ICE_SOFT}
          strokeWidth={2.6}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          animate={live ? { x: [0, -WAVE_PERIOD] } : { x: 0 }}
          transition={
            live ? { x: { repeat: Infinity, ease: "linear", duration: 1.5 } } : { duration: 0 }
          }
        />
      </g>
    </>
  );

  const clipBand = (
    <rect x={-8} y={50 - WAVE_AMP - 4} width={116} height={WAVE_AMP * 2 + 8} rx="3" />
  );

  const defs = (
    <defs>
      <filter id={lglowId} x="-20%" y="-45%" width="140%" height="190%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={ICE} floodOpacity="0.6" />
      </filter>
      <filter id={glowId} x="-30%" y="-140%" width="160%" height="380%">
        <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor={ICE_SOFT} floodOpacity="0.95" />
      </filter>
      <clipPath id={clipId}>{clipBand}</clipPath>
    </defs>
  );

  if (tile) {
    return (
      <svg
        viewBox="0 0 64 64"
        className={cn("h-9 w-9", className)}
        role="img"
        aria-label="JAENOX mark"
      >
        <defs>
          <linearGradient id={`${uid}-tg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={ICE_SOFT} />
            <stop offset="0.55" stopColor={ICE} />
            <stop offset="1" stopColor="#e039d7" />
          </linearGradient>
        </defs>
        {defs}
        <rect width="64" height="64" rx="14" fill="#05060b" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="12.5"
          fill="none"
          stroke={`url(#${uid}-tg)`}
          strokeOpacity="0.55"
          strokeWidth="2"
        />
        <g transform="translate(32 32) scale(0.44) translate(-50 -50)">{inner}</g>
      </svg>
    );
  }

  return (
    <svg
      viewBox={`${MARK_VIEW.x} ${MARK_VIEW.y} ${MARK_VIEW.w} ${MARK_VIEW.h}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="JAENOX mark"
    >
      {defs}
      {inner}
    </svg>
  );
}
