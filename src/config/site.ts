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
  displayAddress: "Bologna, Italia · ambientazione dimostrativa",
  displayHours: [
    { day: "Martedì — giovedì", time: "19:00 — 00:00" },
    { day: "Venerdì — sabato", time: "19:00 — 01:00" },
    { day: "Domenica", time: "19:00 — 23:00" },
    { day: "Lunedì", time: "Chiuso" },
  ],
  social: [] as { label: string; href: string }[],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "La cucina", href: "/menu/" },
  { label: "Il bar", href: "/bar/" },
  { label: "Chi siamo", href: "/chi-siamo/" },
  { label: "Contatti", href: "/contatti/" },
] as const;
