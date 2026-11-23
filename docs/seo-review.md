# Team review implementation

The source is the supplied “NHTech website: page-by-page changes” review. Conditional suggestions remain conditional; no client names, measurements, company statistics, certification or partnership wording have been invented.

## Implemented

- Each public route is pre-rendered at build time with readable body content, its own title and description, canonical URL, en-IN language, en_IN locale, social metadata and JSON-LD.
- Six public case studies have stable `/work/<slug>` URLs, Article metadata, sitemap entries, links from the work listing and relevant service/industry pages. Unknown URLs have a separate noindex 404 page.
- Shared offering names are Embedded teams, Vision & edge AI and Private AI. Existing URLs are retained. Services leads with those three offerings, followed by the existing capabilities.
- Page copy, duplicate process descriptions, ageing model-version lists, diagnostic labels, unsupported performance promises and absolute-result labels have been reduced. Unconfirmed OpenAI and Microsoft credentials are hidden behind central confirmation flags.
- The contact form has three required fields. Company, role, engagement type and constraints are optional. No meeting time is requested without an availability service. Delivery failures are reported rather than presented as successful enquiries.
- A privacy notice is linked from the form and footer. It describes the current enquiry flow, local theme storage and possible processors; it requires company/legal review before launch.
- Product videos use frames from the existing videos as posters and load media on demand. Product links are consolidated. Hoot's existing URL is retained until a working replacement is confirmed.
- Pages load as separate JavaScript chunks. Only Plus Jakarta Sans and JetBrains Mono are loaded. Headings remain readable during loading; mobile retains the Talk to us action.
- Official light/dark logo assets are preloaded and selected in CSS. Button orange matches the supplied colour logo; dark-mode secondary colours use the brand palette.

## Hosting configuration

`npm run build` writes `dist/<route>/index.html`, `dist/404.html`, `dist/sitemap.xml`, `dist/robots.txt`, `dist/_redirects` and `dist/amplify-rewrites.json`.

For AWS Amplify, build with the included `amplify.yml`, then import the ordered rules in **dist/amplify-rewrites.json** into Hosting → Rewrites and redirects. The explicit page rules must precede the final 404 rule. Do not retain the old blanket 200 rewrite to `/index.html`: it would serve the homepage metadata for inner pages. These console-level rules are not automatically applied by `amplify.yml`.

The repository contains no Amplify application identifier or console connection, so hosting-console changes have not been applied by this commit. The bundled Express server serves the same generated pages and sends a real HTTP 404 for unknown routes. Static Amplify hosting does not execute `server.cjs`: retain or configure the existing `/api/contact` backend/proxy separately, ahead of the final 404 rule. This update does not deploy a new email service or API endpoint. Netlify can use the generated `_redirects` file.

Preview builds with an `AWS_BRANCH` other than `main` automatically receive noindex, nofollow and a disallow-all robots.txt. Other staging hosts must set `VITE_NOINDEX=true` at build time. Client-side navigation also sets noindex whenever the current host differs from the configured public hostname. Canonical URLs always use `brand.siteUrl`.

## Decisions needed before launch

- Confirm the canonical domain and public email. Current values remain nighthack.in and info@nighthack.in.
- Confirm whether Europe is the exclusive focus. Current neutral wording says Bengaluru-based, working with customers worldwide.
- Supply the registered office address, founder/team details and approved photographs, foundation date and company counts.
- Confirm exact written OpenAI status and wording, and whether the Microsoft story is employment history or a research relationship. Set the corresponding `confirmed` flags only with approved wording.
- Supply client permissions and real measured results. Track record links to documented work but does not manufacture three numeric proof cards.
- Confirm two-week sprints, prototype duration and monthly sign-off cadence. The page currently says timing is agreed for the scope.
- Supply a working availability-based booking URL (`brand.bookingUrl`), if desired. The success screen only shows a booking link when configured.
- Approve the privacy notice, retention policy, processor list and registered address with counsel. No claim of DPDP/GDPR certification or NHTech PCI certification is made.
- Confirm role locations and experience requirements; job details avoid invented years or remote-work promises. The existing working public email remains the application route until a careers mailbox or form is provided.
- Supply permission-cleared field imagery for the vision page. Existing scientific backgrounds remain in place.
- Provide a verified Hoot domain migration before changing its live link. DNS, certificates and external product deployments are outside these repository changes.

The implementation retains the existing hero animation as a subtle responsive background. The mobile header retains 44px controls, including at 320px.

No analytics or tracking cookies are added by this update. Theme preference uses local storage; introducing analytics later requires an appropriate consent/notice review.

## Validation

Run `npm run lint`, `npm run build` and `npm run test:seo`. Browser checks should cover desktop and mobile, both themes, direct entry and refresh, case-study URLs, history navigation, product filtering/video loading, and contact success/error flows with mocked delivery.
