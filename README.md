# Noctis · Master Template per ristoranti

Demo Astro statica di un ristorante immaginario. La home usa GSAP ScrollTrigger per una sequenza di quattro inquadrature con zoom, cambi d'asse, barre cinematografiche e transizioni governate dallo scroll. La pagina Chi siamo compone un ritratto originale dello chef con una sala separata e simula l'orbita della camera tramite prospettiva CSS 3D, rotazioni e parallasse su piani a profondità diverse. Le sequenze con pin sono attive soltanto sui desktop con puntatore preciso; su tablet e smartphone il contenuto segue lo scroll naturale. Senza JavaScript o con `prefers-reduced-motion`, tutte le scene restano normali sezioni HTML.

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
| Foto segnaposto Unsplash | `src/data/imagery.ts` |
| Piatti, drink, vini e prezzi | `src/data/menu.ts` |
| Catalogo condiviso Cucina/Bar | `src/components/MenuCatalog.astro`, `src/components/MenuList.astro` |
| Aspetto e componenti condivisi | `src/styles/global.css`, `src/components/` |
| Animazioni home, ritratto e voci del menu | `src/scripts/story.ts`, `src/scripts/owner-orbit.ts`, `src/scripts/menu-reveal.ts` |
| SEO e struttura delle pagine | `src/layouts/BaseLayout.astro`, `src/pages/` |

La modalità `demo` mostra un riepilogo locale della prenotazione senza inviare dati. Per un cliente reale, impostare `reservationMode` su `phone`, `whatsapp` o `external` e valorizzare `reservationHref`. Il template mostrerà un collegamento al canale scelto. Inserire anche informazioni aziendali verificate nel campo `business`.

L'indirizzo e la mappa sono illustrativi. Il click sull'immagine apre una ricerca Google Maps in una nuova scheda. Instagram e Facebook usano per ora `href="#"` e non navigano; aggiornarli in `src/config/site.ts` quando esistono profili reali. Le foto esterne sono richieste a `images.unsplash.com` con larghezze responsive e qualità limitata; sostituirle con immagini definitive ottimizzate e autocontenute per il sito reale.

Le pagine La Cucina e Il Bar usano lo stesso catalogo a due colonne. Su desktop le categorie restano visibili durante lo scroll; su schermi stretti precedono le sezioni in un layout verticale. Le voci appaiono con una transizione leggera al loro ingresso nella finestra; senza JavaScript e con movimento ridotto restano sempre leggibili.

## Prima della pubblicazione per un cliente reale

1. Sostituire nome, testi, indirizzo, orari, piatti, prezzi e immagini; verificare i diritti d'uso delle fotografie.
2. Inserire i dati reali dell'attività in `site.business` e impostare `site.isDemo` su `false` solo quando sono completi. In modalità demo il sito è `noindex` e `robots.txt` blocca la scansione.
3. Collegare un canale di prenotazione reale e sostituire `src/pages/privacy.astro` con l'informativa del titolare.
4. Eseguire `npm run build` con `SITE_URL` impostato all'indirizzo definitivo; verificare sitemap, metadati, prestazioni e navigazione su dispositivi reali.

Le immagini delle pagine interne provengono dalla cartella `locale-prototipo` condivisa. La home usa fotografie segnaposto Unsplash di [Yunshuo Qu](https://unsplash.com/photos/RucMtKnJDr8), [Muhammad Rahiman Abdulmanab](https://unsplash.com/photos/sthiQQhmljg), [Milan Trninic](https://unsplash.com/photos/R31OwFKbRdE) e [Yimeng Zhao](https://unsplash.com/photos/-zcILE8jS0M). Il ritratto dello chef e la sala usati in Chi siamo sono stati generati per questo concept con lo strumento integrato di generazione immagini: sorgenti `src/assets/images/noctis-chef-cutout.png` e `src/assets/images/noctis-dining-room.png`. Prompt chef: «chef italiano immaginario di 45-50 anni, giacca da cuoco antracite, ritratto editoriale notturno con luce ambra, figura scontornata su sfondo realmente trasparente». Prompt sala: «interno fotorealistico di Noctis, ristorante intimo a Bologna di notte, legno, ottone, cucina a vista, tavoli e luci ambra, senza persone né scritte». Le fotografie e i contenuti di menu, orari e prenotazione non descrivono un'attività reale.
