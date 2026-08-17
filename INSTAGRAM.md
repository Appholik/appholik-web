# Connecting the Instagram feed

The homepage has an Instagram section showing the six most recent posts from
**@appholik_appdev**. Until you connect a feed it shows gradient placeholder tiles —
the layout is real, the content isn't.

---

## Why it works the way it does

Instagram shut down the old Basic Display API in **December 2024**. The official
replacement requires a Business or Creator account, a Meta developer app, and a token
that expires every 60 days and has to be refreshed. That's a lot of moving parts to
keep six pictures on a page, and when the token silently expires your homepage breaks.

So this site uses a feed service that handles the token for you, and it fetches the
posts **once, at build time** — not in your visitor's browser.

That means:

- No third-party JavaScript on the page, so nothing slows the site down
- No per-visitor request, so free tiers go a very long way
- If the feed provider is down when someone visits, your site is unaffected
- If the fetch fails during a build, the build still succeeds with placeholders

The trade-off: **posts refresh when you deploy**, not the moment you post. On the free
plan the provider only refreshes once a day anyway, so in practice you lose nothing.

---

## Setup — about ten minutes

### 1. Make sure @appholik_appdev is a Business or Creator account

Instagram app → Settings → Account type and tools → Switch to professional account.

This is required by Meta for any feed integration. It's free and reversible.

### 2. Create a free Behold account

Go to [behold.so](https://behold.so) and sign up.

Free plan gives you 1 feed, 6 posts, refreshed daily — exactly what this section uses.

### 3. Connect the account and create a feed

- Connect **@appholik_appdev**
- Create a feed from that source
- Set the post limit to **6**
- Go to the **JSON feed** tab and copy the feed URL

It looks like `https://feeds.behold.so/XXXXXXXXXXXX`

### 4. Add it to the project

Create a file called `.env` in the project root:

```
INSTAGRAM_FEED_URL=https://feeds.behold.so/XXXXXXXXXXXX
```

There's a `.env.example` you can copy. `.env` is gitignored — it won't be committed,
which is what you want.

### 5. Build

```bash
npm run build
```

Watch the output. You should see:

```
[instagram] fetched 6 posts.
```

If you see `using fallback tiles` instead, the URL is wrong or unreachable.

### 6. Deploy

```bash
npm run ship
```

Then Deploy in cPanel. Your real posts are now on the homepage.

---

## Keeping it fresh

Every deploy re-fetches. If you post something and want it on the site immediately,
run `npm run ship` and click Deploy.

If you'd rather it update on its own, two options:

- **Deploy on a schedule.** A weekly rebuild keeps it reasonably current.
- **Switch to a live client-side feed.** Behold's Starter plan ($10/mo) refreshes hourly
  and can render in the browser. This costs page speed and adds a third-party script,
  so only do it if same-day freshness genuinely matters.

---

## Alternatives to Behold

Nothing here is locked in — the code just needs a URL returning JSON with `permalink`
and an image field. `src/data/instagram.js` already handles the common field names
(`mediaUrl`, `media_url`, `thumbnailUrl`, `sizes.medium.mediaUrl`).

| Option | Cost | Notes |
|---|---|---|
| **Behold** | Free / $10 | Recommended. Clean JSON, handles tokens |
| **SnapWidget** | From $8/mo | Widget-first, JSON on higher tiers |
| **Curator.io** | Free tier | Aggregates several networks, heavier |
| **Meta API direct** | Free | No third party, but you manage a 60-day token yourself |

If you ever want the direct Meta route, ask Claude Code:

```
Replace the Behold feed in src/data/instagram.js with a direct Instagram
Graph API call at build time, including long-lived token refresh.
Explain what I need to set up in the Meta developer console first.
```

---

## Using your own images instead

If you'd rather hand-pick what shows, skip the feed entirely:

1. Put square images in `public/images/instagram/`
2. Edit `instagramFallback` in `src/data/site.js` — set each `image` to
   `/images/instagram/yourfile.jpg` and each `permalink` to the real post URL
3. Leave `INSTAGRAM_FEED_URL` empty

The section renders identically. You just update it by hand.

---

## Troubleshooting

**"Live feed not connected yet" shows under the grid.**
That note only appears when there's no live feed. Once the fetch succeeds it disappears.

**Images load but then break weeks later.**
Instagram's image URLs expire. Rebuild and redeploy — that's the fix, and it's why
regular deploys matter.

**Build says `fetch failed`.**
Check the URL in `.env` opens in your browser and returns JSON. Also confirm your
Behold account hasn't hit its monthly view limit.

**Posts are stale.**
Free plan refreshes once a day on Behold's side. Your build can only fetch what they
have. Deploy again tomorrow, or upgrade.
