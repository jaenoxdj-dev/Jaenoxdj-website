import { Navbar } from "@/components/jaenox/navbar";
import { Hero } from "@/components/jaenox/hero";
import { Marquee, Stats } from "@/components/jaenox/marquee-stats";
import { Music } from "@/components/jaenox/music";
import { About } from "@/components/jaenox/about";
import { Journey } from "@/components/jaenox/journey";
import { Gigs } from "@/components/jaenox/gigs";
import { Gallery } from "@/components/jaenox/gallery";
import { Booking } from "@/components/jaenox/booking";
import { Socials } from "@/components/jaenox/socials";
import { Footer, BackToTop } from "@/components/jaenox/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Music />
        <Stats />
        <About />
        <Journey />
        <Gigs />
        <Gallery />
        <Booking />
        <Socials />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
