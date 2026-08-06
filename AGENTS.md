# MGBC Website Agent Rules

Read `DESIGN.md`, `docs/design-system.md`, `docs/content-model.md`, `docs/seo.md`, and `docs/qa-checklist.md` before any UI or content change.

Non-negotiable rules:
- Arabic is the primary language; preserve native RTL behavior.
- One dominant CTA per surface: `ابدأ التقييم المجاني` or `احجز استشارة مجانية`.
- Never invent clients, certifications, testimonials, revenue figures, or regulatory claims.
- Use CMS content files instead of hardcoding new services or articles inside components.
- Preserve the static Astro architecture and avoid client JavaScript unless it supports navigation, assessment, or booking.
- Verify 390, 768, 1024, and 1440 px widths before merging.
- Respect keyboard focus and `prefers-reduced-motion`.
