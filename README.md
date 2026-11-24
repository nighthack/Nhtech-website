# NHTech website

NHTech is a Vite + React application with prerendered public pages and a small Express API for the enquiry form.

## Architecture

The repository contains two runtime concerns:

- **Frontend:** Vite builds the React application to `dist/`, then the build prerenders each public route with its own content and metadata. AWS Amplify Hosting provides static hosting, HTTPS, custom domains, branch deployments, and route rewrites.
- **API:** `server.ts` is a long-running Express process. It serves `/api/health` and `/api/contact`, and must run separately from Amplify Hosting. Amplify Hosting does not run this Express server as a backend process.

### Recommended production topology

Use Amplify Hosting for the frontend and deploy the API separately as AWS Lambda + API Gateway (or ECS/Fargate if a long-running Express process is preferred):

```text
Browser -> Amplify Hosting (React SPA)
             |
             +-> /api/* reverse-proxy rewrite or API hostname
                       |
                       +-> API Gateway -> Lambda adapter -> submitContact()
```

The current Express process continues to work locally and on a container service without changes. For Lambda, create a thin adapter around the Express routes (for example with a maintained Express-to-Lambda adapter), or call the shared `submitContact()` handler in `src/server/contact.ts` from an API Gateway adapter. Do not run `app.listen()` inside a Lambda handler. Amplify does not create this backend automatically.

The frontend currently calls `fetch('/api/contact')`, so the preferred production setup is a same-origin Amplify reverse-proxy rewrite for `/api/<*>`. If a separate API hostname is used instead, update the frontend request base URL and configure CORS for the Amplify domain before deploying.

## Prerequisites

Before deploying, an operator must have:

1. An AWS account with permission to create/configure Amplify Hosting, API Gateway, Lambda, IAM roles, and CloudWatch logs.
2. A Git repository containing this project and an AWS region selected for API resources.
3. An Ottom8 API key for the technical-intake agent integration.
4. Node.js 20+ and npm for local development and checks.

No AWS infrastructure, domain, DNS records, IAM role, API Gateway, Lambda function, email identity, or credentials are assumed to exist.

## Run locally

```bash
npm ci
cp .env.example .env
npm run dev
```

The local server listens on `http://localhost:3000`, serves the SPA, and exposes `GET /api/health` and `POST /api/contact`.

Never commit `.env`. Server secrets are read only by the Express/API runtime and must not be exposed as Vite client variables.

## Configuration

### API runtime variables

Configure these in Lambda (or the container service), not in Amplify Hosting. The API validates the form and securely forwards the intake to Ottom8; the Ottom8 agent handles downstream email delivery through Composio MCP.

| Variable | Required | Purpose |
| --- | --- | --- |
| `OTTOM8_API_KEY` | Yes | Secret API key sent in the `x-api-key` header for agent invocation. |
| `OTTOM8_AGENT_URL` | No | Optional compatible endpoint override; defaults to the NHTech technical-intake agent endpoint. |

The API does not send email directly and does not require SMTP, Resend, SES, or any other email-provider credentials.

`GEMINI_API_KEY` and `APP_URL` remain in `.env.example` for the existing application context, but the current source does not read either value. Do not add a secret to the frontend build unless it is intentionally public.

### Amplify Hosting variables

The frontend has no required client-side environment variables. Preview builds with `AWS_BRANCH` other than `main` automatically receive noindex metadata and a disallow-all robots.txt. Set `VITE_NOINDEX=true` at build time for other staging deployments. If it is later changed to call a separate API hostname, add a non-secret `VITE_API_BASE_URL` in Amplify and use it in the request URL. Never put `OTTOM8_API_KEY` in frontend variables: Vite-bundled values are public.

## Deploy the frontend to AWS Amplify

1. Push the repository to a Git provider and confirm `main` contains the desired production code.
2. In the AWS Amplify console, choose **Create new app**, select the Git provider, repository, and `main` branch.
3. Use the repository root as the app root. This is a single app, not a monorepo.
4. Accept the checked-in `amplify.yml` settings, review the artifact directory (`dist`), and deploy.
5. Add the production custom domain in Amplify Hosting and complete DNS validation/certificate steps.
6. In **Hosting > Rewrites and redirects**, retain the `/api/<*>` reverse-proxy rule first, then add the ordered page and alias rules generated in `dist/amplify-rewrites.json`. The final rule serves `/404.html` with status 404 for unknown paths.

   Do not use a blanket rewrite to `/index.html`: it would replace inner-page content and metadata with the homepage. The generated console rules are not applied automatically by `amplify.yml`.

## Deploy the API

### Lambda + API Gateway (recommended)

1. Create a dedicated Lambda function in the selected region with a least-privilege execution role and CloudWatch logging.
2. Package the contact API and dependencies. Adapt the existing Express routes to Lambda with a maintained Express-to-Lambda adapter, or call the shared `submitContact` function from a Lambda handler that maps API Gateway requests to its input and response.
3. Configure API Gateway routes: `GET /api/health` and `POST /api/contact` -> Lambda.
4. Configure Lambda variables from the API table. Store secrets in AWS Secrets Manager or encrypted Lambda environment variables; do not commit them.
5. Set timeout/memory high enough for the Ottom8 request (the API aborts after 15 seconds). Add CloudWatch alarms for errors and throttles.
6. Deploy a stable API stage and preferably a custom API hostname such as `api.example.com` with an ACM certificate and DNS record.
7. Test before connecting Amplify:

   ```bash
   curl -i https://api.example.com/api/health
   curl -i -X POST https://api.example.com/api/contact \
     -H 'Content-Type: application/json' \
     --data '{"name":"Production Test","email":"test@example.com","problemStatement":"This is a production smoke test."}'
   ```

   Verify the response includes `success: true` and `agentProcessed: true`, and confirm the Ottom8 execution completed successfully. Downstream email delivery is owned by the agent.

### Alternative: ECS/Fargate

Build and deploy the existing `npm run build` output as a container, run `npm start`, put an Application Load Balancer in front, and route `/api/*` to the service. This is the lowest-change option for Express but adds container, load balancer, networking, and scaling operations.

## API routing and CORS

The safest arrangement is same-origin:

1. Keep the frontend request as `/api/contact`.
2. Add an Amplify reverse-proxy rewrite from `/api/<*>` to the API Gateway origin, preserving the path.
3. Keep the generated page/alias rewrites after the API rule, followed by the final 404 rule.

If Amplify cannot proxy the selected API Gateway configuration, use the API hostname directly and configure API Gateway/Lambda CORS to allow only the exact Amplify production domain and approved preview domains. Allow `Content-Type`, `GET`, `POST`, and `OPTIONS`, handle preflight requests, and do not use a wildcard origin in production. The local Express server needs no CORS middleware because local frontend and API share port 3000.

## Production verification

1. Run `npm ci`, `npm run lint`, `npm run build`, and `npm run test:seo` in CI.
2. Open every primary SPA route directly and refresh it; known routes must return their own prerendered content; unknown routes must return HTTP 404.
3. Confirm `GET /api/health` returns HTTP 200 through the public API path.
4. Submit the contact form with a controlled test payload and verify validation errors, a successful Ottom8 execution, and `agentProcessed: true` in the API response.
5. Confirm browser tools show no CORS, mixed-content, or failed `/api/contact` requests.
6. Check CloudWatch/API Gateway logs and alarms, including an invalid request and a controlled provider failure path.
7. Verify `OTTOM8_API_KEY` is present only in the API runtime and absent from built JavaScript and Amplify build logs.

## Validation commands

```bash
npm run lint
npm run build
npm run test:seo
npm run test:hero
npm run test:contact
```

`npm run build` produces prerendered frontend pages and a bundled Express server for local/container deployment. Amplify runs `npm run build:frontend`, which generates the same prerendered pages, metadata, sitemap and robots.txt without publishing the Node server bundle.

The browser checks require Chromium. Install it with `npx playwright install chromium` if needed, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium binary. Hero tests cover startup before hydration, mouse/touch input, native scrolling, pause/reduced motion, reloads and offscreen playback. Contact tests mock delivery and do not send real enquiries.

See [the team review implementation](docs/seo-review.md) for SEO decisions and company facts that still need confirmation.
