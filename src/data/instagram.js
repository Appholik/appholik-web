// ---------------------------------------------------------------------------
// Instagram feed — fetched once at BUILD time, not in the visitor's browser.
//
// Why build time:
//   * no third-party JavaScript on the page, so nothing slows the site down
//   * no view limits — one request per deploy instead of one per visitor
//   * nothing to break if the feed provider is down when someone visits
//
// The trade-off is that posts refresh when you deploy, not the second you post.
// See INSTAGRAM.md for setup.
// ---------------------------------------------------------------------------

import { instagramFallback } from './site.js';

const FEED_URL = import.meta.env.INSTAGRAM_FEED_URL;
const MAX_POSTS = 6;
const TIMEOUT_MS = 8000;

/** Normalise whatever the provider returns into the shape the component wants. */
function normalise(raw) {
  const list = Array.isArray(raw) ? raw : (raw?.posts ?? raw?.data ?? []);

  return list
    .map((p) => {
      const isVideo =
        (p.mediaType ?? p.media_type ?? '').toUpperCase().includes('VIDEO');

      return {
        id: p.id ?? p.permalink,
        permalink: p.permalink ?? p.link,
        image:
          p.sizes?.medium?.mediaUrl ??
          p.thumbnailUrl ??
          p.thumbnail_url ??
          p.mediaUrl ??
          p.media_url,
        alt:
          (p.caption ?? '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 110) || 'Instagram post from AppHolik',
        isVideo,
      };
    })
    .filter((p) => p.image && p.permalink)
    .slice(0, MAX_POSTS);
}

async function load() {
  if (!FEED_URL) {
    console.info('[instagram] INSTAGRAM_FEED_URL not set — using fallback tiles.');
    return { posts: instagramFallback, live: false };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(FEED_URL, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`feed responded ${res.status}`);

    const posts = normalise(await res.json());
    if (!posts.length) throw new Error('feed returned no usable posts');

    console.info(`[instagram] fetched ${posts.length} posts.`);
    return { posts, live: true };
  } catch (err) {
    // Never fail the build over a social feed.
    console.warn(`[instagram] fetch failed (${err.message}) — using fallback tiles.`);
    return { posts: instagramFallback, live: false };
  }
}

export const { posts: instagramPosts, live: instagramIsLive } = await load();
