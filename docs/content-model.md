# Content Model
Pages CMS is configured in `.pages.yml`.
- `src/data/settings/site.json`: company, contact, and booking provider settings.
- `src/content/services/*.md`: service landing pages and FAQs.
- `src/content/articles/*.md`: insight articles.
- `src/data/faqs.json`: homepage general FAQs.
- `public/uploads`: CMS-uploaded media.

Editors sign in at `https://app.pagescms.org`, install the GitHub app, select the repository and branch, then edit content. Saving commits to GitHub and triggers the connected deployment.
