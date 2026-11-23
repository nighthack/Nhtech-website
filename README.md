<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/510a0df4-6f3f-48b3-9ca5-fae9d87d633d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## SEO and production hosting

`npm run build` pre-renders each public route, including six case-study pages. It also generates the sitemap, robots.txt, per-page metadata and hosting rewrite files. `npm run test:seo` checks those artifacts and the production server; run it after a build.

See [the team review implementation](docs/seo-review.md) for Amplify rewrite setup, staging noindex controls, and company facts that still need confirmation.

For the hero interaction regression tests, run `npm run build && npm run test:hero`. They cover prerendered iframe startup, mouse/touch input, native touch scrolling, pause/reduced motion, reloads and offscreen playback. Install Chromium with `npx playwright install chromium` if needed, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium binary.
