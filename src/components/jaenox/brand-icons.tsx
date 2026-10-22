import { Instagram, Facebook } from "lucide-react";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function SoundCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.2 13.9c-.1 0-.2.1-.2.2l-.3 1.7.3 1.7c0 .1.1.2.2.2s.2-.1.2-.2l.3-1.7-.3-1.7c0-.1-.1-.2-.2-.2zm1.7-1c-.1 0-.2.1-.2.2l-.4 2.7.4 2.6c0 .1.1.2.2.2.1 0 .2-.1.2-.2l.4-2.6-.4-2.7c0-.1-.1-.2-.2-.2zm1.8-.8c-.1 0-.3.1-.3.3l-.3 3.4.3 3.3c0 .2.1.3.3.3.1 0 .3-.1.3-.3l.4-3.3-.4-3.4c0-.2-.1-.3-.3-.3zm1.8-.4c-.2 0-.3.1-.3.3l-.3 3.8.3 3.6c0 .2.2.3.3.3.2 0 .3-.1.3-.3l.4-3.6-.4-3.8c0-.2-.2-.3-.3-.3zm1.9-.9c-.2 0-.3.1-.4.3l-.3 4.7.3 3.6c0 .2.2.4.4.4s.3-.2.4-.4l.3-3.6-.3-4.7c0-.2-.2-.3-.4-.3zm1.9-1.7c-.2 0-.4.2-.4.4l-.3 6.3.3 3.6c0 .2.2.4.4.4s.4-.2.4-.4l.3-3.6-.3-6.3c0-.2-.2-.4-.4-.4zm7.9 2.6c-.4 0-.8.1-1.2.2-.2-2.7-2.5-4.8-5.3-4.8-.7 0-1.4.1-2 .4-.2.1-.3.2-.3.4v9.7c0 .2.2.4.4.4h8.4c1.7 0 3-1.3 3-3 .1-1.8-1.3-3.3-3-3.3z" />
    </svg>
  );
}

export const SOCIALS = [
  {
    name: "Instagram",
    handle: "@jaenoxdj",
    href: "https://www.instagram.com/jaenoxdj",
    icon: Instagram,
    color: "#e039d7",
    blurb: "Behind the decks & on the road",
  },
  {
    name: "TikTok",
    handle: "@jaenox_dj",
    href: "https://www.tiktok.com/@jaenox_dj",
    icon: TikTokIcon,
    color: "#7deefb",
    blurb: "Clips, drops & stream moments",
  },
  {
    name: "SoundCloud",
    handle: "JAENOX",
    href: "https://soundcloud.com/jae-moyns",
    icon: SoundCloudIcon,
    color: "#ff8800",
    blurb: "Mixes & HIVE MINDS",
  },
  {
    name: "Facebook",
    handle: "Jae Moyns (JAENOX)",
    href: "https://www.facebook.com/share/1CabzUM6Bo/",
    icon: Facebook,
    color: "#5b8bff",
    blurb: "Event announcements & community",
  },
];
