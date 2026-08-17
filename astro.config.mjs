import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://appholik.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  compressHTML: true,
});
