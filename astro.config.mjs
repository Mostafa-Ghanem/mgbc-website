import { defineConfig } from 'astro/config';
import removeLeadingHeading from './src/lib/remark/remove-leading-heading.mjs';

export default defineConfig({
  site: 'https://mgbc.sa',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { remarkPlugins: [removeLeadingHeading] },
});
