# AppHolik website — working notes

Static Astro site for appholik.com. Replaced a WordPress + Sydney + Elementor install.
Deploys to Namecheap cPanel shared hosting via `git push` + cPanel Git Version Control.

## Conventions

- **Copy lives in `src/data/site.js`, not in templates.** If a change is text-only, edit
  that file. Only touch `.astro` files for structural changes.
- **One stylesheet:** `src/styles/global.css`, imported once in `Base.astro`. Don't add
  scoped `<style>` blocks to components — it fragments the design system.
- **No client-side framework.** The only JS is the small inline block at the bottom of
  `Base.astro` (sticky nav, mobile menu, scroll reveal, card spotlight). Keep it that way
  unless there's a real reason.
- **All graphics are CSS or inline SVG.** No raster images in the page design, so nothing
  goes stale or needs optimising. Brand assets in `public/logo/` are the exception.

## Brand

Colours come from the logo and are defined as CSS custom properties:

```
--brand-orange  #F8A030   gradient start
--brand-magenta #E02088   gradient midpoint, primary accent
--brand-violet  #584098   gradient end
--brand-navy    #282060   wordmark
--bg            #080614   page background
```

Gradient always runs bottom-left → top-right. Don't introduce new accent colours.

Sandar and Owniva are separate products with their own identities — don't apply
AppHolik's gradient to them beyond what's already in the product cards.

## Facts to keep accurate

- AppHolik is a **SaaS and mobile app development company** — not an agency, not a studio.
- **Two** products are live: Sandar (sandar.live) and Owniva (owniva.app).
- Fawree and Khedmat are **not** current products. Don't reintroduce them.
- Offices: **UAE and Canada**. Not Kabul, not Dubai specifically, not Los Angeles.
- Contact is **apps@appholik.com** and Instagram **@appholik_appdev**. There is no public
  phone number on the site.
- Never invent stats. The old site's "5000+ happy clients" and "00 web awards" are exactly
  what this rebuild exists to fix.

## Build and deploy

```bash
npm run dev      # localhost:4321
npm run build    # writes dist/ — commit this, the server can't build
npm run ship     # build + commit + push to both remotes
```

`dist/` is committed on purpose (see `.gitignore`). After pushing, the deploy needs a
click in cPanel → Git Version Control → Deploy HEAD Commit.

`.cpanel.yml` contains a `CPANEL_USER` placeholder that must be filled in with the real
cPanel username before the first deploy.

## Instagram section

The homepage Instagram grid is fetched **at build time** in `src/data/instagram.js`,
not client-side. Don't convert it to a browser-side widget without a good reason — the
point is no third-party JavaScript on the page.

If `INSTAGRAM_FEED_URL` isn't set it falls back to gradient placeholder tiles and the
build still succeeds. Never let a social feed break the build.

Setup lives in `INSTAGRAM.md`.

## Careful with

- **`.htaccess`** — it forces HTTPS and holds the 301s from the old WordPress URLs.
  Breaking it takes the whole site down with a 500. Test changes by renaming rather
  than deleting.
- **`trailingSlash: 'always'`** in `astro.config.mjs` is matched by a rewrite rule in
  `.htaccess`. Change one and you must change the other.
- **Logo.astro** generates unique gradient IDs per instance. If two lockups render on one
  page with the same ID, the second one loses its gradient.

## Open work

See the "Known gaps" list at the bottom of `README.md`.
