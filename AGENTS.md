# MGBC Website Agent Rules
Read `DESIGN.md`, `docs/design-system.md`, `docs/content-model.md`, `docs/seo.md`, `docs/assets.md`, and `docs/qa-checklist.md` before any UI or content change.

Non-negotiable rules:
- Arabic is the primary language; preserve native RTL behavior and logical CSS properties.
- One dominant CTA per surface: `ابدأ التقييم المجاني` (booking CTA can replace it only after a real booking URL exists).
- Never invent clients, certifications, testimonials, revenue figures, regulatory claims, or team imagery.
- Use CMS content files instead of hardcoding new services or articles inside components.
- Preserve the static Astro architecture; client JavaScript is limited to navigation, assessment, lead capture, and future booking.
- Verify 390, 768, 1024, and 1440px before merging. Respect keyboard focus, browser zoom, and `prefers-reduced-motion`.

UI quality gate:
- Apply Impeccable v4 principles for layout, typeset, harden, and polish: deliberate spatial rhythm, clear reading order, production states, restrained motion, and source cleanup.
- Apply the current Vercel Web Interface Guidelines: semantic controls, labels/autocomplete, focus-visible, live regions for async state, image dimensions/lazy loading, touch-safe controls, and no unsafe UI anti-patterns.
- Do not use eyebrow/kicker labels above headings, decorative hero metrics, decorative grid overlays, generic same-size card grids, glass effects, or gradient text.
- Images are editorial evidence/context, not filler. Do not place generic stock photography in the hero.
