# SEO
- `astro.config.ts` sets the canonical site and generates XML sitemaps.
- `SEO.astro` controls title, description, canonical, robots, Open Graph, and Twitter cards.
- Services include `Service` structured data; articles include `Article`; homepage includes `ProfessionalService`.
- Do not create thin location pages or duplicate service pages.
- Preserve redirects in `public/_redirects` during migration.
- Add verified Google Search Console token only through a future site setting; never hardcode an unverified token.
