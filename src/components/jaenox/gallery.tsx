"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import { SectionHeading } from "./shared";
import { GALLERY } from "./data";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative scroll-mt-20 py-20 sm:py-28" aria-label="Photo gallery">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-ice/10 blur-[64px] sm:blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Live & direct"
          title="From the"
          accent="dancefloor"
          description="Club rooms, festival stages and studio moments — tap any shot to view it full size."
        />

        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <motion.div
              key={g.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setIndex(i)}
                    aria-label={`Open photo: ${g.caption}`}
                    className="group relative block w-full overflow-hidden rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={800}
                      height={g.span === "wide" ? 600 : 1100}
                      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 46vw, 30vw"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-foreground/90">
                        {g.caption}
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-ice/40 bg-background/70 text-ice">
                        <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl border-ice/25 bg-background/95 p-2 sm:p-3">
                  <DialogTitle className="sr-only">{g.caption}</DialogTitle>
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={1200}
                      height={g.span === "wide" ? 900 : 1600}
                      className="h-auto max-h-[80vh] w-full object-contain"
                      sizes="90vw"
                      priority
                    />
                  </div>
                  <p className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {g.caption}
                  </p>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <p className={cn("mt-8 text-center text-xs uppercase tracking-[0.28em] text-muted-foreground")}>
          High-resolution press photos available on request
        </p>
      </div>
    </section>
  );
}
