/** Replace these IDs with a client's licensed photography before launch. */
export const imagery = {
  entrance: "1767706508378-8835e2a0ec97",
  kitchen: "1776353744117-9e8595e8092c",
  cocktail: "1778104960251-b1d82ac92ee9",
  dinner: "1772479020020-9bd8d2f577d0",
} as const;

export function unsplashImage(id: string, width: number, quality = 76) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function unsplashSrcSet(id: string) {
  return [960, 1600, 2400].map((width) => `${unsplashImage(id, width)} ${width}w`).join(", ");
}
