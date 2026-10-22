"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "./data";
import { SoundCloudIcon, TikTokIcon } from "./brand-icons";
import { Instagram, Facebook } from "lucide-react";
import { JaenoxMark, JaenoxWordmark } from "./logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ice via-ice-soft to-flare"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-border py-2.5" : "bg-transparent py-4"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="JAENOX — back to top"
          >
            <JaenoxMark idPrefix="nav-mark" className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
            <JaenoxWordmark idPrefix="nav-word" className="h-[18px] w-auto" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors",
                    active === link.href
                      ? "text-ice"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-ice to-transparent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              <a
                href={SITE.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JAENOX on SoundCloud"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-[#ff8800]"
              >
                <SoundCloudIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JAENOX on Instagram"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-flare"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JAENOX on TikTok"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-ice-soft"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JAENOX on Facebook"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-[#5b8bff]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
            <a
              href="#contact"
              className="animate-glow-pulse hidden items-center gap-2 rounded-md bg-gradient-to-r from-ice to-ice-soft px-4 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-background transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Book Now
            </a>
            <button
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="glass fixed inset-x-0 top-[64px] z-40 border-b border-border lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90 transition-colors hover:bg-ice/10 hover:text-ice"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ice to-ice-soft px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-background"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Book JAENOX
                </a>
              </li>
              <li className="flex items-center justify-center gap-5 pt-3 text-muted-foreground">
                <a href={SITE.soundcloud} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud"><SoundCloudIcon className="h-5 w-5" /></a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon className="h-5 w-5" /></a>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
