# appholik.com

Static site for AppHolik. Astro, no database, no WordPress. Deploys to Namecheap cPanel
via `git push`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

## Deploying

See **[DEPLOY.md](./DEPLOY.md)** for the full one-time setup and the day-to-day loop.

Short version, once set up:

```bash
npm run build && git add -A && git commit -m "..." && git push cpanel main
```

…then click **Deploy HEAD Commit** in cPanel → Git Version Control.

## Where things live

```
src/
  data/site.js          ← all copy and content. Edit this, not the HTML.
  layouts/Base.astro    ← <head>, nav, footer, scripts. Wraps every page.
  components/
    Logo.astro          ← brand lockup as inline SVG
    Nav.astro
    Footer.astro
    Marquee.astro       ← scrolling capabilities strip
    ProductCard.astro   ← one product tile
    Cta.astro           ← closing call-to-action block
  pages/
    index.astro         ← /
    services.astro      ← /services/
    about.astro         ← /about/
    contact.astro       ← /contact/
    404.astro           ← custom not-found page
  styles/global.css     ← the entire design system

public/                 ← copied verbatim to the site root
  .htaccess             ← HTTPS, old-WordPress 301s, caching, security headers
  favicon.ico
  robots.txt
  site.webmanifest
  logo/                 ← SVG + PNG brand assets, OG image
```

## Brand tokens

Defined at the top of `src/styles/global.css`, taken from the logo:

| Token | Value |
|---|---|
| `--brand-orange` | `#F8A030` |
| `--brand-magenta` | `#E02088` |
| `--brand-violet` | `#584098` |
| `--brand-navy` | `#282060` |
| `--bg` | `#080614` |

The signature gradient runs orange → magenta → violet, bottom-left to top-right.

## Known gaps

Tracked so they don't get forgotten:

- [ ] Real Sandar and Owniva screenshots to replace the CSS mockups
- [ ] Contact form (currently mailto only) — needs a form endpoint
- [ ] A real testimonial from an artist or an Owniva user
- [ ] Team / founder section
- [ ] Individual product pages for Sandar and Owniva
- [ ] Analytics
