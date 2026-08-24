import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://mgbc.sa',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
