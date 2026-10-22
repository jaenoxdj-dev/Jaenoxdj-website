export const SITE = {
  name: "JAENOX",
  role: "UK Trance DJ & Producer",
  tagline: "Hard Trance · Driving Trance · Euphoric Trance",
  email: "jaenoxdj@gmail.com",
  soundcloud: "https://soundcloud.com/jae-moyns",
  instagram: "https://www.instagram.com/jaenoxdj",
  tiktok: "https://www.tiktok.com/@jaenox_dj",
  facebook: "https://www.facebook.com/share/1CabzUM6Bo/",
  instagramHandle: "@jaenoxdj",
  tiktokHandle: "@jaenox_dj",
  soundcloudHandle: "JAENOX",
  facebookHandle: "Jae Moyns (JAENOX)",
};

export const NAV_LINKS = [
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Gigs", href: "#gigs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const MARQUEE_ITEMS = [
  "HARD TRANCE",
  "DRIVING TRANCE",
  "EUPHORIC TRANCE",
  "SIGNED TO FSOE",
  "LUMINOSITY ORIGINAL AFTER PARTY",
  "TIMESCAPE FESTIVAL",
  "UK · EUROPE · WORLDWIDE",
  "HIVE MINDS OUT NOW",
];

export const STATS = [
  { value: 15, suffix: "+", label: "Events played", sub: "UK & international" },
  { value: 2, suffix: "×", label: "Competition wins", sub: "Talent comp + Timescape takeover" },
  { value: 3, suffix: "", label: "Countries", sub: "UK · Netherlands · Albania" },
  { value: 1, suffix: "", label: "FSOE release", sub: "HIVE MINDS w/ Nu Spirit" },
];

export const TIMELINE = [
  {
    period: "THE EARLY YEARS",
    title: "The hobby that became a craft",
    body: "Years of DJing purely for the love of it — bedroom sessions, house parties and long nights studying the trance greats, quietly sharpening the sound that would become JAENOX.",
    tag: "CRAFT",
  },
  {
    period: "NOV 2025",
    title: "Goes all-in — the scene takes notice",
    body: "Turns years of passion into a proper pursuit. The hard, driving and euphoric sound — built on years of practice — starts turning heads across the UK club circuit almost immediately.",
    tag: "ORIGIN",
  },
  {
    period: "2026",
    title: "UK circuit takeover",
    body: "Multiple bookings land across the UK — Trance United, Home Events and a run of club nights — quickly building a reputation for powerful, carefully crafted performances.",
    tag: "BREAKTHROUGH",
  },
  {
    period: "2026",
    title: "Talent competition win",
    body: "Beats the field at a DJ talent competition, proving the energy translates everywhere — from bedroom streams to main-room soundsystems.",
    tag: "AWARD",
  },
  {
    period: "2026",
    title: "Timescape stage takeover champion",
    body: "Wins the Timescape stage takeover competition and performs at Timescape Festival — a defining moment on home soil.",
    tag: "AWARD",
  },
  {
    period: "2026",
    title: "First international gig — Zandvoort, NL",
    body: "Plays the Luminosity Original after party at Chin Chins, Zandvoort, Netherlands — plus Albania beach clubs — taking the sound international.",
    tag: "INTERNATIONAL",
  },
  {
    period: "2026",
    title: "HIVE MINDS signs to FSOE",
    body: "Steps into production: 'HIVE MINDS', a collaboration with Nu Spirit, is signed to Future Sound of Egypt — the label of trance royalty.",
    tag: "RELEASE",
  },
];

export type Gig = {
  name: string;
  location: string;
  region: "International" | "UK";
  venue: "Festival" | "Club" | "Event";
  year: string;
  note?: string;
};

export const GIGS: Gig[] = [
  {
    name: "Luminosity Original After Party",
    location: "Chin Chins · Zandvoort, Netherlands",
    region: "International",
    venue: "Festival",
    year: "2026",
    note: "First international gig — Luminosity Original after party",
  },
  {
    name: "Albania Beach Clubs",
    location: "Albanian Riviera, Albania",
    region: "International",
    venue: "Club",
    year: "2026",
    note: "Sun-soaked open-air sets on the beach",
  },
  {
    name: "Timescape Festival",
    location: "United Kingdom",
    region: "UK",
    venue: "Festival",
    year: "2026",
    note: "Won the Timescape stage takeover competition",
  },
  {
    name: "Trance United",
    location: "United Kingdom",
    region: "UK",
    venue: "Event",
    year: "2026",
  },
  {
    name: "Home Events",
    location: "United Kingdom",
    region: "UK",
    venue: "Event",
    year: "2026",
  },
  {
    name: "UK Club Nights",
    location: "Various cities, United Kingdom",
    region: "UK",
    venue: "Club",
    year: "2026",
    note: "A growing run of residencies & one-offs",
  },
];

export const GALLERY = [
  {
    src: "/images/jaenox-club.jpg",
    alt: "JAENOX performing an intimate club set",
    caption: "Lights low, energy high — club duty.",
    span: "tall",
  },
  {
    src: "/images/jaenox-decks.jpg",
    alt: "JAENOX on the decks under blue and purple stage light",
    caption: "Locked in on the mix.",
    span: "tall",
  },
  {
    src: "/images/jaenox-festival.jpg",
    alt: "JAENOX performing at a festival with rollercoaster backdrop",
    caption: "Festival stages only.",
    span: "tall",
  },
  {
    src: "/images/jaenox-crew.jpg",
    alt: "JAENOX backstage with the crew under LED lights",
    caption: "Backstage family.",
    span: "wide",
  },
  {
    src: "/images/jaenox-spotlight.jpg",
    alt: "Studio portrait of JAENOX in dramatic spotlight",
    caption: "Press portrait.",
    span: "tall",
  },
  {
    src: "/images/jaenox-portrait.jpg",
    alt: "Studio portrait of JAENOX on black background",
    caption: "Focused.",
    span: "tall",
  },
];
