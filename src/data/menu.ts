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

export const barMenu: MenuCategory[] = [
  {
    id: "signature-cocktails", title: "Signature cocktails", intro: "Le nostre idee, servite nel bicchiere.",
    items: [
      { name: "Noctis Negroni", description: "Gin infuso al carbone, bitter, vermouth rosso e rosmarino.", price: 14 },
      { name: "L'Elisir d'Oro", description: "Vodka, sambuco, lime e una nota di Champagne.", price: 18 },
      { name: "Geisha Sour", description: "Gin giapponese, yuzu, matcha e una trama vellutata.", price: 16 },
      { name: "Old Fashioned Noctis", description: "Bourbon, burro di cacao, zucchero bruno e arancia.", price: 15 },
      { name: "Ombra Fizz", description: "Gin, bergamotto, basilico e soda al pompelmo rosa.", price: 15 },
    ],
  },
  {
    id: "classici", title: "Classici della notte", intro: "Forme familiari, dettagli inattesi.",
    items: [
      { name: "Martini delle 23", description: "Gin, vermouth dry, oliva e una goccia di olio al limone.", price: 15 },
      { name: "Boulevardier al caffè", description: "Whisky, bitter, vermouth rosso e caffè tostato.", price: 16 },
      { name: "Paloma amara", description: "Tequila, pompelmo, lime e una punta di pepe rosa.", price: 14 },
      { name: "Espresso Martini della casa", description: "Vodka, espresso fresco e liquore al caffè.", price: 14 },
    ],
  },
  {
    id: "vini", title: "Vini al calice", intro: "Una selezione immaginaria per accompagnare la serata.",
    items: [
      { name: "Pignoletto dei Colli", description: "Bianco fresco, agrumato e delicatamente minerale.", price: 9 },
      { name: "Lambrusco di Sorbara", description: "Rosato vivace, floreale, con finale asciutto.", price: 9 },
      { name: "Sangiovese di Romagna", description: "Rosso agile, frutto scuro e spezie leggere.", price: 10 },
      { name: "Etna Rosso", description: "Elegante e sapido, con richiami di ciliegia e cenere.", price: 13 },
      { name: "Franciacorta Brut", description: "Bollicina fine, crosta di pane e mela verde.", price: 14 },
    ],
  },
  {
    id: "zero-alcol", title: "Senza alcol", intro: "Tutta l'attenzione al gusto, senza alcol.",
    items: [
      { name: "Notturno Zero", description: "Tè nero freddo, amarena, limone e salvia.", price: 11 },
      { name: "Mandarino & Timo", description: "Mandarino fresco, timo, miele e soda.", price: 10 },
      { name: "Pesca di sera", description: "Pesca bianca, rosmarino, tè oolong e limone.", price: 10 },
    ],
  },
];
