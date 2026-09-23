import type { APIRoute } from "astro";
import { site } from "../config/site";

export const GET: APIRoute = ({ site: origin }) => new Response(
  site.isDemo
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${new URL("/sitemap.xml", origin).href}\n` : ""}`,
  { headers: { "Content-Type": "text/plain; charset=utf-8" } },
);
