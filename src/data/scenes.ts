import { withBase } from "../config/paths";
import { imagery } from "./imagery";
import diningRoom from "../assets/images/dining-room.jpg";
import kitchen from "../assets/images/chef.jpg";
import cocktail from "../assets/images/cocktail.jpg";
import dinner from "../assets/images/rose-room.jpg";

export const scenes = [
  {
    id: "ingresso",
    count: "01",
    eyebrow: "Bologna, dopo il tramonto",
    title: "La notte ha un altro sapore.",
    body: "Un rifugio urbano dove la cucina incontra l'alchimia e il tempo torna ad appartenerti.",
    imageId: imagery.entrance,
    fallbackSrc: diningRoom.src,
    imageAlt: "Ristorante contemporaneo illuminato nella notte",
    position: "center center",
    mobilePosition: "54% center",
    cameraOrigin: "58% 48%",
    href: withBase("/chi-siamo/"),
    cta: "Entra nel mondo Noctis",
  },
  {
    id: "cucina",
    count: "02",
    eyebrow: "La cucina",
    title: "La materia diventa emozione.",
    body: "Radici emiliane, sguardo contemporaneo. Ogni piatto lascia parlare l'ingrediente, poi sorprende.",
    imageId: imagery.kitchen,
    fallbackSrc: kitchen.src,
    imageAlt: "Chef al lavoro in una cucina poco illuminata",
    position: "52% center",
    mobilePosition: "58% center",
    cameraOrigin: "54% 54%",
    href: withBase("/menu/"),
    cta: "Scopri la cucina",
  },
  {
    id: "alchimia",
    count: "03",
    eyebrow: "Alchimia liquida",
    title: "Il rito continua nel bicchiere.",
    body: "Cocktail d'autore e selezioni da sorseggiare lentamente. Il finale perfetto non ha fretta.",
    imageId: imagery.cocktail,
    fallbackSrc: cocktail.src,
    imageAlt: "Cocktail notturno con arancia sul bancone",
    position: "54% 57%",
    mobilePosition: "center 55%",
    cameraOrigin: "48% 52%",
    href: withBase("/bar/"),
    cta: "Esplora il bar",
  },
  {
    id: "tempo",
    count: "04",
    eyebrow: "L'essenza di Noctis",
    title: "Prenditi tutto il tempo.",
    body: "Una luce, un tavolo, una conversazione che continua. La serata comincia quando decidi di fermarti.",
    imageId: imagery.dinner,
    fallbackSrc: dinner.src,
    imageAlt: "Cena intima a lume di candela",
    position: "center center",
    mobilePosition: "55% center",
    cameraOrigin: "55% 50%",
    href: withBase("/prenota/"),
    cta: "Riserva la tua serata",
  },
] as const;
