# Jake's Car Detailing: design canon

Concept: **Under the light.** A detailer checks paint with an inspection light. The site borrows that one idea and uses it three times: the hero photo develops from dark as a band of light crosses it, a soft light follows the pointer across the hero photo, and the paint panels on the correction and coating pages are lit by a light the visitor moves.

Read this before changing layout, type, colour or motion.

## Sources of truth

- `src/lib/constants.ts`: every business fact, with where it came from. Add nothing there that is not on Jake's own site or his Google listing.
- `src/lib/reviews.ts`: real Google reviews, verbatim excerpts. Never reword them.
- `src/lib/posts.ts`: his three articles, word for word, at their original slugs.
- `src/lib/photos.ts` and `scripts/build-photos.py`: every photo is Jake's own. Captions name the car only.

## Rules that are easy to break

1. **No invented claims.** Ceramic coating and paint correction are new. Until Jake supplies them there are no prices, product names, durability figures, warranty terms, cure times or turnaround times on those pages.
2. **No em dashes or en dashes anywhere**, including code comments.
3. **Free-quote vocabulary** for the two quoted services ("Get a free quote"). Priced details say "Book the exterior detail" and so on.
4. **Illustrations are captioned as illustrations.** The swirl panel and the water panel are simulations, never presented as a customer's car or a product test.
5. **Nothing rests hidden.** No scroll-reveal. The load moment is pure CSS and only ever adds an animation on top of visible content.
6. **No lightbox, filter bar or expand icons** on photos. Selected photographs, captioned, composed into the page.
7. **His logo artwork** (public/brand, cut from his own logo file) sits in the header on every page. The italic belongs to the logo; site type stays upright.
8. **The interior photo is 514px wide.** Never show it wider than about 420 CSS px. Ask Jake for more interior photos.
9. The two professional photos carry the credit "Photo: @breckenmutch".

## Colour

| Token | Value | Use |
| --- | --- | --- |
| black | #000000 | main ground |
| spruce | #0b100c | alternate dark ground (the tree shadows in his photos) |
| overcast | #eef1ef | the one light ground: prices, reviews, forms, articles |
| blue | #0f5ad2 | fills and buttons (his logo underline, the Huracán) |
| sky | #7fb2ff | blue for text and links on dark |
| fog / steel | #a9b4ad / #55605a | secondary text on dark / on light |

Sections declare a surface (`on-dark`, `on-spruce`, `on-light`, `on-blue`), which sets `--fg`, `--muted`, `--line`, `--raised` and `--accent`. The blue band is used once per page, as the closing call to action.

## Type

One family, Zalando Sans, with its width axis. Display is wide (`d1` to `d4`, 114 to 125 percent), reading text is normal width. Sentence case everywhere. `label` is the small semibold style; it is never set in capitals. `figure` is for prices, the rating and the phone number.

## Layout

Left aligned, 1320px container, hairlines instead of boxes, 4px radius on controls and 6px on photos. Interior pages open with `PageHero`, the same photograph-into-black frame as the home page. Numbered lists appear only where the order is real (the wash method, the correction and coating sequences).

## Motion

- One load moment per page (hero develop, light sweep, headline rise). CSS only, off under reduced motion.
- Pointer light on the hero photo: fine pointers only, adds light, never hides anything.
- `PaintPanel` (swirls) and `BeadDemo` (water): canvas, paused off screen, static under reduced motion.
- Everything else moves only in answer to the visitor: tabs crossfade, the segmented thumb slides, accordions open.

## Tailwind v4

Every custom class in `globals.css` lives inside `@layer`, so utilities always win. Keep it that way: an unlayered rule silently beats `hidden`, `text-*` and `pt-*`.

## Building

Desktop is iCloud synced, so `.next`, `out` and `node_modules` are symlinks to `*.nosync` folders. Never undo that. Build locally with `npm run build:local` (plain `next build` replaces the `out` symlink with a real folder). Never run `next dev` here. The local build prints "module not found" warnings from inside `node_modules.nosync`; they come from the symlink and do not appear on CI.

Hosting: GitHub Pages from the Actions workflow, live at https://www.jakesdetailing.ca since 2026-10-06 (custom domain set through the Pages API, `public/CNAME`, HTTPS enforced). Every push to `main` deploys to production. The old preview address redirects to the domain. To build a private preview again, set `NEXT_PUBLIC_BASE_PATH` in `deploy.yml` on a separate repo or branch deploy: it turns on noindex and a disallow-all robots file.

## Launch record and what is still open

Done on 2026-10-06: Jake pointed GoDaddy at GitHub (A @ to 185.199.108.153 through .111.153, CNAME www to nradachy-web.github.io), then `scripts/go-live.sh` switched the build to the domain root, registered the custom domain and enforced HTTPS once the certificate was issued. The script has done its job and is kept as a record; it will refuse to run again.

Old Wix URLs keep working: `/book-online`, `/portfolio`, `/blog` and `/post/*` kept their paths, and `/service-page/*`, `/booking-calendar/*`, `/portfolio-collections/*` and `/blank*` have redirect stubs in `public/`.

Still open:

1. Booking requests now go two places at once (2026-10-06): Jake's booking desk at shop-desk-nine.vercel.app, which saves them, and an email through Web3Forms. The desk path is proven end to end on production. The Web3Forms path is still unproven: its key is in the live bundle, but Web3Forms can report success for a dead key and automated browsers cannot reach it, so only a real submission that Jake confirms in his inbox settles it. The desk repo is `nradachy-web/shop-desk`; read its `docs/DESK.md` before touching the form's delivery.
2. Confirm with Jake: ceramic and correction details, that the full detail is the exterior plus the interior package, the durations and prices as listed, his hours, whether he wants a street address shown, his real Instagram handle, more interior photos.
3. Submit `https://www.jakesdetailing.ca/sitemap.xml` in Search Console.
