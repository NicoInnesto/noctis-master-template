import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: "static",
  build: { inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
});
