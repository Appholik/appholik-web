// ---------------------------------------------------------------------------
// All editable site content lives here. Change text in this file and rebuild —
// you do not need to touch any HTML. This is also the shape we'll move into a
// CMS later, so keep the structure as-is.
// ---------------------------------------------------------------------------

export const site = {
  name: 'AppHolik',
  domain: 'appholik.com',
  tagline: 'We build and own digital products',
  description:
    'AppHolik is a SaaS and mobile app development company. We design, build and run our own products — Sandar and Owniva — and build for clients the same way.',
  email: 'apps@appholik.com',
  instagram: 'appholik_appdev',
  instagramUrl: 'https://instagram.com/appholik_appdev',
  locations: ['United Arab Emirates', 'Canada'],
  year: new Date().getFullYear(),
};

export const nav = [
  { label: 'Products', href: '/#products' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const hero = {
  announcement: 'Owniva is live — social exposure audits',
  headingBefore: "We don't just build apps.",
  headingEm: 'own',
  headingAfter: 'them.',
  lede:
    'AppHolik is a SaaS and mobile app development company. Sandar and Owniva are ours — designed, engineered, launched and still run by the same team. We build for clients the same way we build for ourselves.',
  meta: ['2 products live', 'iOS · Android · Web', 'UAE · Canada'],
};

export const products = [
  {
    name: 'Sandar',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://sandar.live',
    linkLabel: 'sandar.live',
    visual: 'wave',
    span: 4,
    blurb:
      'A streaming home for Afghan music — over 5,000 tracks across Dari, Pashto, classical, attan and more. Albums, artists, genres, live radio, playlists and offline downloads, on mobile and web. Built and operated by AppHolik.',
  },
  {
    name: 'Owniva',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://owniva.app',
    linkLabel: 'owniva.app',
    visual: 'shield',
    span: 2,
    blurb:
      'A social exposure audit. Scans a public profile and reports what it reveals — security gaps, privacy leaks, fake engagement — in plain language, and helps you protect your digital footprint.',
  },
  {
    name: 'More coming',
    status: 'soon',
    statusLabel: 'In the works',
    url: '/contact/',
    linkLabel: 'Get notified',
    visual: 'dots',
    span: 2,
    blurb:
      "We're building the next one now. If you'd like to hear about it before it launches, leave us your email.",
  },
];

export const stats = [
  { value: '2', suffix: '', label: 'Products live and operated by us' },
  { value: '5K', suffix: '+', label: 'Tracks in the Sandar catalogue' },
  { value: '3', suffix: '', label: 'Platforms — iOS, Android, web' },
  { value: '2', suffix: '', label: 'Offices — UAE & Canada' },
];

export const capabilities = [
  'Swift & SwiftUI', 'Kotlin', 'React Native', 'Next.js',
  'Product design', 'APIs & infrastructure', 'App Store launch', 'Growth & analytics',
];

export const services = [
  {
    num: '01',
    title: 'Product & UX design',
    body: 'We start with the problem, not the screens. Research, flows, prototypes and a design system your product can grow into.',
    tags: ['Discovery', 'Prototyping', 'Design systems'],
  },
  {
    num: '02',
    title: 'Mobile app development',
    body: 'Native Swift and Kotlin where performance matters, cross-platform where speed matters. Either way, one team, one standard.',
    tags: ['SwiftUI', 'Kotlin', 'React Native', 'Flutter'],
  },
  {
    num: '03',
    title: 'SaaS & web platforms',
    body: 'Owniva is a SaaS product end to end — scanning, scoring, subscriptions, billing. We build the same for clients.',
    tags: ['Next.js', 'Node', 'Postgres', 'Payments'],
  },
  {
    num: '04',
    title: 'Launch & aftercare',
    body: 'Store submission, release management, analytics and the unglamorous work of keeping a product healthy after launch day.',
    tags: ['App Store', 'Play Store', 'Analytics', 'Support'],
  },
];

export const process = [
  { n: 1, title: 'Scope',  body: 'A short paid discovery. You leave with a spec, a timeline and a fixed price — whether or not you build with us.' },
  { n: 2, title: 'Design', body: 'Clickable prototype before a line of production code. You approve how it looks and how it feels.' },
  { n: 3, title: 'Build',  body: 'Two-week sprints with a working build in your hands at the end of each one. No black box.' },
  { n: 4, title: 'Ship',   body: 'We handle store review, launch and the first months of iteration while real users arrive.' },
];

// ---------------------------------------------------------------------------
// Instagram section
// ---------------------------------------------------------------------------

export const instagram = {
  eyebrow: 'From the studio',
  heading: 'What we’re working on',
  body:
    'Launches, work in progress and the occasional look behind the scenes. The grid here is our actual Instagram — it refreshes every time the site is deployed.',
  points: [
    'Product launches and release notes',
    'Design and build in progress',
    'The team, and how we actually work',
  ],
};

// Shown when no live feed is configured, or if the feed is unreachable at build
// time. Replace `image` with real files in public/images/instagram/ and point
// `permalink` at the actual posts.
export const instagramFallback = [
  { id: 'f1', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'Sandar app', tone: 0 },
  { id: 'f2', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'Owniva scan', tone: 1 },
  { id: 'f3', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'Design work', tone: 2 },
  { id: 'f4', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'Behind the scenes', tone: 3 },
  { id: 'f5', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'Release notes', tone: 4 },
  { id: 'f6', permalink: 'https://instagram.com/appholik_appdev', image: null, alt: 'The team', tone: 5 },
];
