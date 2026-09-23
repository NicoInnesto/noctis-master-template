export type MenuItem = { name: string; description: string; price: number; note?: string };
export type MenuCategory = { id: string; title: string; intro: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    id: "antipasti", title: "Per iniziare", intro: "Piccoli gesti, grandi attese.",
    items: [
      { name: "L'Uovo Noctis", description: "Tuorlo marinato, spuma di Parmigiano 36 mesi, crumble al carbone.", price: 18 },
      { name: "Battuta di manzo", description: "Nocciole tostate, senape antica, capperi e fumo di faggio.", price: 22 },
      { name: "Cipolla, taleggio e sfoglia", description: "Cipolla caramellata, sfoglia croccante e fonduta di taleggio.", price: 16 },
    ],
  },
  {
    id: "primi", title: "La nostra terra", intro: "La tradizione entra, cambia passo e resta riconoscibile.",
    items: [
      { name: "Tortellone di casa", description: "Pasta tirata a mano, ripieno della tradizione, crema di Vacche Rosse 30 mesi.", price: 20 },
      { name: "Tagliatella al ragù Noctis", description: "Taglio al coltello, ragù bianco di cortile e ginepro.", price: 18 },
      { name: "Risotto allo zafferano", description: "Riso Acquerello, zafferano, midollo e una nota d'oro.", price: 24 },
    ],
  },
  {
    id: "secondi", title: "Il centro della scena", intro: "Materia, fuoco e un'idea precisa di equilibrio.",
    items: [
      { name: "Guancia brasata al Sangiovese", description: "Cottura lenta, purè di patate e fondo ristretto.", price: 26 },
      { name: "Anatra in due tempi", description: "Petto rosato, coscia confit e salsa al cognac.", price: 30 },
      { name: "Melanzana fondente", description: "Miso, sesamo tostato ed erbe aromatiche.", price: 20, note: "Vegetariano" },
    ],
  },
  {
    id: "dessert", title: "L'ultimo ricordo", intro: "Per chi sa che il finale conta.",
    items: [
      { name: "Tiramisù al momento", description: "Mascarpone soffice, cacao e caffè espresso caldo.", price: 10 },
      { name: "Fondente e lampone", description: "Guscio di cioccolato, cuore di lampone, crumble salato.", price: 14 },
      { name: "Pistacchio e fior di sale", description: "Pistacchio, cioccolato bianco e una punta di sale.", price: 12 },
    ],
  },
];

export const drinks = [
  { name: "Noctis Negroni", description: "Gin infuso al carbone, bitter, vermouth rosso e rosmarino.", price: 14 },
  { name: "L'Elisir d'Oro", description: "Vodka, sambuco, lime e una nota di Champagne.", price: 18 },
  { name: "Geisha Sour", description: "Gin giapponese, yuzu, matcha e una trama vellutata.", price: 16 },
  { name: "Old Fashioned Noctis", description: "Bourbon, burro di cacao, zucchero bruno e arancia.", price: 15 },
] satisfies MenuItem[];
