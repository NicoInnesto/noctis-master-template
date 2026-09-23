import diningRoom from "../assets/images/dining-room.jpg";
import signatureDish from "../assets/images/signature-dish.jpg";
import cocktail from "../assets/images/cocktail.jpg";
import roseRoom from "../assets/images/rose-room.jpg";

export const scenes = [
  {
    id: "ingresso",
    count: "01",
    eyebrow: "Bologna, dopo il tramonto",
    title: "La notte ha un altro sapore.",
    body: "Un rifugio urbano dove la cucina incontra l'alchimia e il tempo torna ad appartenerti.",
    image: diningRoom,
    imageAlt: "Sala raccolta con tavoli apparecchiati e luci calde",
    position: "center center",
    mobilePosition: "54% center",
    href: "/chi-siamo/",
    cta: "Entra nel mondo Noctis",
  },
  {
    id: "cucina",
    count: "02",
    eyebrow: "La cucina",
    title: "La materia diventa emozione.",
    body: "Radici emiliane, sguardo contemporaneo. Ogni piatto lascia parlare l'ingrediente, poi sorprende.",
    image: signatureDish,
    imageAlt: "Piatto contemporaneo servito su ceramica scura",
    position: "55% center",
    mobilePosition: "58% center",
    href: "/menu/",
    cta: "Scopri la cucina",
  },
  {
    id: "alchimia",
    count: "03",
    eyebrow: "Alchimia liquida",
    title: "Il rito continua nel bicchiere.",
    body: "Cocktail d'autore e selezioni da sorseggiare lentamente. Il finale perfetto non ha fretta.",
    image: cocktail,
    imageAlt: "Cocktail in coppa su un bancone illuminato",
    position: "center 57%",
    mobilePosition: "center 55%",
    href: "/bar/",
    cta: "Esplora il bar",
  },
  {
    id: "tempo",
    count: "04",
    eyebrow: "L'essenza di Noctis",
    title: "Prenditi tutto il tempo.",
    body: "Una luce, un tavolo, una conversazione che continua. La serata comincia quando decidi di fermarti.",
    image: roseRoom,
    imageAlt: "Tavolo raccolto con una rosa e luci soffuse",
    position: "center center",
    mobilePosition: "55% center",
    href: "/prenota/",
    cta: "Riserva la tua serata",
  },
] as const;
