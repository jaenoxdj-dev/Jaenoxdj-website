"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "./data";
import { SoundCloudIcon, TikTokIcon } from "./brand-icons";
import { Instagram, Facebook } from "lucide-react";
import { JaenoxMark, JaenoxWordmark } from "./logo";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-[#04050a]" aria-label="Site footer">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/50 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="JAENOX — back to top">
              <JaenoxMark idPrefix="foot-mark" className="h-10 w-10" />
              <JaenoxWordmark idPrefix="foot-word" className="h-6 w-auto" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.role} — bringing hard, driving and euphoric trance to stages across the UK,
              Europe and beyond. HIVE MINDS out now on Future Sound of Egypt.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SoundCloud"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-[#ff8800]/50 hover:text-[#ff8800]"
              >
                <SoundCloudIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-flare/50 hover:text-flare"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-ice-soft/50 hover:text-ice-soft"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-[#5b8bff]/50 hover:text-[#5b8bff]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email bookings"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-ice/50 hover:text-ice"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-foreground/70">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-ice"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-foreground/70">Bookings</p>
            <a
              href={`mailto:${SITE.email}?subject=Booking%20enquiry%20for%20JAENOX`}
              className="mt-4 inline-block text-sm text-ice transition-colors hover:text-ice-soft"
            >
              {SITE.email}
            </a>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Please include event date, location, set length and budget where possible.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ice/25 bg-ice/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ice-soft">
              jaenox.com · jaenox.co.uk
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JAENOX. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70">
            Hard · Driving · Euphoric
          </p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-ice/40 bg-background/85 text-ice shadow-[0_0_24px_rgba(34,211,238,0.3)] backdrop-blur transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
