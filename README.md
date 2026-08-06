# MGBC Astro + Pages CMS

Production-oriented Arabic RTL website for MG Business Consultancy.

## Stack
- Astro 7 static output
- Astro Content Collections
- Pages CMS (Git-backed)
- GitHub + Cloudflare Pages / GitHub Pages-compatible static output
- Provider-agnostic consultation booking (Cal.com recommended, Calendly supported)

## Local development
```bash
npm install
npm run dev
npm run check
npm run build
```

## Booking activation
Edit `src/data/settings/site.json` through Pages CMS:
1. Set `booking.provider` to `calcom` or `calendly`.
2. Paste the public event or routing-form URL into `booking.url`.
3. Save. The consultation assessment will prefill lead information and UTM source into the booking experience.

Recommended Cal.com event: 30-minute hidden or public event named `financial-diagnostic`, with booking questions for company, service, and challenge.

## Deployment
Build command: `npm run build`
Output directory: `dist`
Node: `22.12+`
