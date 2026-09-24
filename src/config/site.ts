import { withBase } from "./paths";

export const site = {
  name: "NOCTIS",
  label: "Noctis",
  location: "Bologna",
  category: "Ristorante & Cocktail Bar",
  tagline: "Cucina & Alchimia",
  description:
    "Noctis è un ristorante immaginario a Bologna: cucina contemporanea, cocktail d'autore e il piacere di prendersi il proprio tempo.",
  isDemo: true,
  reservationMode: "demo" as "demo" | "phone" | "whatsapp" | "external",
  reservationHref: "",
  business: null as null | {
    streetAddress: string;
    postalCode: string;
    locality: string;
    telephone: string;
    cuisine: string;
  },
  displayAddress: "Via delle Ombre 24 · 40121 Bologna",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Via+delle+Ombre+24%2C+40121+Bologna",
  displayHours: [
    { day: "Martedì — giovedì", time: "19:00 — 00:00" },
    { day: "Venerdì — sabato", time: "19:00 — 01:00" },
    { day: "Domenica", time: "19:00 — 23:00" },
    { day: "Lunedì", time: "Chiuso" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ] as { label: string; href: string }[],
};

export const navigation = [
  { label: "Home", href: withBase("/") },
  { label: "La cucina", href: withBase("/menu/") },
  { label: "Il bar", href: withBase("/bar/") },
  { label: "Chi siamo", href: withBase("/chi-siamo/") },
  { label: "Contatti", href: withBase("/contatti/") },
] as const;
