import { withBase } from "../config/paths";
import type { APIRoute } from "astro";
import { navigation, site } from "../config/site";

export const GET: APIRoute = ({ site: origin }) => {
  const pages = site.isDemo ? [] : [...navigation.map((item) => item.href), withBase("/prenota/")];
  const urls = origin ? pages.map((path) => `<url><loc>${new URL(path, origin).href}</loc></url>`).join("") : "";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
