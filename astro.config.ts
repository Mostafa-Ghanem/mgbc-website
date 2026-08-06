import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mgbc.sa',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/admin'),
    }),
  ],
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
