import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { VisibilityPause } from "@/components/jaenox/visibility-pause";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaenox.com"),
  title: "JAENOX | UK Trance DJ & Producer — Hard Trance · Driving Trance · Euphoric Trance",
  description:
    "Official site of JAENOX — UK trance DJ & producer. Signed to Future Sound of Egypt with 'HIVE MINDS' (with Nu Spirit). Winner of the Timescape stage takeover. Book JAENOX for festivals, club nights and events worldwide.",
  keywords: [
    "JAENOX",
    "trance DJ",
    "UK DJ",
    "hard trance",
    "driving trance",
    "euphoric trance",
    "FSOE",
    "Future Sound of Egypt",
    "HIVE MINDS",
    "Nu Spirit",
    "Luminosity Original After Party",
    "Timescape",
    "DJ booking",
  ],
  authors: [{ name: "JAENOX" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "music",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "JAENOX | UK Trance DJ & Producer",
    description:
      "High-energy hard, driving & euphoric trance. HIVE MINDS out now on Future Sound of Egypt. Bookings: jaenoxdj@gmail.com",
    url: "https://jaenox.com",
    siteName: "JAENOX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JAENOX — Hard · Driving · Euphoric Trance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JAENOX | UK Trance DJ & Producer",
    description:
      "High-energy hard, driving & euphoric trance. HIVE MINDS out now on FSOE.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "JAENOX",
  url: "https://jaenox.com",
  genre: "Trance",
  email: "jaenoxdj@gmail.com",
  description:
    "JAENOX is a UK trance DJ & producer playing hard, driving and euphoric trance. Signed to Future Sound of Egypt with 'HIVE MINDS' (with Nu Spirit).",
  foundingLocation: { "@type": "Place", name: "United Kingdom" },
  sameAs: [
    "https://soundcloud.com/jae-moyns",
    "https://www.instagram.com/jaenoxdj",
    "https://www.tiktok.com/@jaenox_dj",
    "https://www.facebook.com/share/1CabzUM6Bo/",
  ],
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <VisibilityPause />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0b0e17",
              border: "1px solid rgba(34,211,238,0.25)",
              color: "#f2f6fb",
            },
          }}
        />
      </body>
    </html>
  );
}
