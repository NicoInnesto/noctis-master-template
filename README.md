# Noctis · Master Template per ristoranti

Demo Astro statica di un ristorante immaginario. La home usa GSAP ScrollTrigger solo sui dispositivi larghi; su tablet e smartphone le scene seguono lo scroll naturale. Senza JavaScript o con `prefers-reduced-motion`, tutte le scene restano normali sezioni HTML.

## Avvio

```bash
npm install
npm run dev
npm run build
```

Per generare URL canonici e metadati social della pubblicazione:

```bash
SITE_URL=https://indirizzo-del-sito.example npm run build
```

## Dove adattare il template

| Contenuto | File |
| --- | --- |
| Identità, navigazione, modalità prenotazione, stato demo | `src/config/site.ts` |
| Testi e immagini della home | `src/data/scenes.ts` |
| Piatti, bevande e prezzi | `src/data/menu.ts` |
| Aspetto e componenti condivisi | `src/styles/global.css`, `src/components/` |
| Animazione desktop e mobile | `src/scripts/story.ts` |
| SEO e struttura delle pagine | `src/layouts/BaseLayout.astro`, `src/pages/` |

La modalità `demo` mostra un riepilogo locale della prenotazione senza inviare dati. Per un cliente reale, impostare `reservationMode` su `phone`, `whatsapp` o `external` e valorizzare `reservationHref`. Il template mostrerà un collegamento al canale scelto. Inserire anche informazioni aziendali verificate nel campo `business`.

## Prima della pubblicazione per un cliente reale

1. Sostituire nome, testi, indirizzo, orari, piatti, prezzi e immagini; verificare i diritti d'uso delle fotografie.
2. Inserire i dati reali dell'attività in `site.business` e impostare `site.isDemo` su `false` solo quando sono completi. In modalità demo il sito è `noindex` e `robots.txt` blocca la scansione.
3. Collegare un canale di prenotazione reale e sostituire `src/pages/privacy.astro` con l'informativa del titolare.
4. Eseguire `npm run build` con `SITE_URL` impostato all'indirizzo definitivo; verificare sitemap, metadati, prestazioni e navigazione su dispositivi reali.

Le fotografie della demo provengono dalla cartella `locale-prototipo` condivisa per questo progetto. Non raffigurano necessariamente un ristorante chiamato Noctis. I contenuti di menu, orari e prenotazione sono dimostrativi.
