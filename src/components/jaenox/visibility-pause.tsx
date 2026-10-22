"use client";

import { useEffect } from "react";

/**
 * Toggles `anim-paused` on <html> whenever the page is hidden (background tab,
 * WhatsApp/Instagram in-app WebView switched away, screen off). Continuous CSS
 * animations (marquee, equalizer, glow pulses) stop burning CPU while the user
 * can't see the page — the #1 source of "the site lags" reports on low-end
 * Android WebViews.
 */
export function VisibilityPause() {
  useEffect(() => {
    const root = document.documentElement;
    let media: MediaQueryList | null = null;
    const apply = () => {
      const hidden = document.hidden || media?.matches === true;
      root.classList.toggle("anim-paused", hidden);
    };
    const onChange = () => apply();
    document.addEventListener("visibilitychange", onChange);
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.addEventListener) media.addEventListener("change", onChange);
    apply();
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      media?.removeEventListener?.("change", onChange);
    };
  }, []);

  return null;
}
