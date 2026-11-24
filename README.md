# NHTech website

NHTech is a Vite + React single-page application with a small Express API for the technical intake form.

## Architecture

The repository contains two runtime concerns:

- **Frontend:** Vite builds the React SPA to `dist/`. AWS Amplify Hosting provides static hosting, HTTPS, custom domains, branch deployments, and SPA rewrites.
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

The current Express process continues to work locally and on a container service without changes. For Lambda, create a thin adapter around the existing Express routes (for example with a maintained Express-to-Lambda adapter) or extract the route logic into a shared handler. Do not run `app.listen()` inside a Lambda handler. Amplify does not create this backend automatically.

The frontend currently calls `fetch('/api/contact')`, so the preferred production setup is a same-origin Amplify reverse-proxy rewrite for `/api/<*>`. If a separate API hostname is used instead, update the frontend request base URL and configure CORS for the Amplify domain before deploying.

## Prerequisites

Before deploying, an operator must have:

1. An AWS account with permission to create/configure Amplify Hosting, API Gateway, Lambda, IAM roles, CloudWatch logs, and (if used) SES or another mail provider.
2. A Git repository containing this project and an AWS region selected for API resources.
3. Verified email/domain identities for the chosen email provider. SMTP or Resend credentials are not included here.
4. An Ottom8 API key if the technical-intake agent integration is required.
5. Node.js 20+ and npm for local development and checks.

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

Configure these in Lambda (or the container service), not in Amplify Hosting:

| Variable | Required | Purpose |
| --- | --- | --- |
| `CONTACT_RECIPIENT_EMAIL` | No | Intake recipient; defaults to `info@nighthack.in`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | No | SMTP delivery; host/user/pass are needed for SMTP to be attempted. |
| `SMTP_FROM` | No | SMTP sender address. |
| `RESEND_API_KEY` | No | Fallback email delivery through Resend. |
| `OTTOM8_API_KEY` | No | Enables forwarding the intake to the Ottom8 agent. |
| `OTTOM8_AGENT_URL` | No | Optional compatible Ottom8 endpoint override. |

If no mail provider is configured, the API logs the submission instead of delivering email. Treat that as development/failure mode, not a production success criterion.

`GEMINI_API_KEY` and `APP_URL` remain in `.env.example` for the existing application context, but the current source does not read either value. Do not add a secret to the frontend build unless it is intentionally public.

### Amplify Hosting variables

The current frontend has no required client-side environment variables. If it is later changed to call a separate API hostname, add a non-secret `VITE_API_BASE_URL` in Amplify and use it in the request URL. Never put SMTP, Resend, Ottom8, or other private credentials in frontend variables: Vite-bundled values are public.

## Deploy the frontend to AWS Amplify

1. Push the repository to a Git provider and confirm `main` contains the desired production code.
2. In the AWS Amplify console, choose **Create new app**, select the Git provider, repository, and `main` branch.
3. Use the repository root as the app root. This is a single app, not a monorepo.
4. Accept the checked-in `amplify.yml` settings, review the artifact directory (`dist`), and deploy.
5. Add the production custom domain in Amplify Hosting and complete DNS validation/certificate steps.
6. Add this SPA rewrite in **Hosting > Rewrites and redirects** so direct visits to routes such as `/contact` resolve to `index.html`:

   ```text
   Source: /<*>
   Target: /index.html
   Type: Rewrite (200)
   ```

   Put any `/api/<*>` proxy rule before the SPA fallback rule.

## Deploy the API

### Lambda + API Gateway (recommended)

1. Create a dedicated Lambda function in the selected region with a least-privilege execution role and CloudWatch logging.
2. Package the contact API and dependencies. Adapt the existing Express routes to Lambda with a maintained Express-to-Lambda adapter, or move `submitContact` into a Lambda handler that maps API Gateway requests to the existing validation and delivery logic.
3. Configure API Gateway routes: `GET /api/health` and `POST /api/contact` -> Lambda.
4. Configure Lambda variables from the API table. Store secrets in AWS Secrets Manager or encrypted Lambda environment variables; do not commit them.
5. Set timeout/memory high enough for the Ottom8 (15-second client timeout) and email-provider calls. Add CloudWatch alarms for errors and throttles.
6. Deploy a stable API stage and preferably a custom API hostname such as `api.example.com` with an ACM certificate and DNS record.
7. Test before connecting Amplify:

   ```bash
   curl -i https://api.example.com/api/health
   curl -i -X POST https://api.example.com/api/contact \
     -H 'Content-Type: application/json' \
     --data '{"name":"Production Test","email":"test@example.com","problemStatement":"This is a production smoke test.","schedulingDate":"2030-01-02","schedulingTime":"09:00"}'
   ```

   Use an approved test address and remove test submissions from downstream systems as appropriate.

### Alternative: ECS/Fargate

Build and deploy the existing `npm run build` output as a container, run `npm start`, put an Application Load Balancer in front, and route `/api/*` to the service. This is the lowest-change option for Express but adds container, load balancer, networking, and scaling operations.

## API routing and CORS

The safest arrangement is same-origin:

1. Keep the frontend request as `/api/contact`.
2. Add an Amplify reverse-proxy rewrite from `/api/<*>` to the API Gateway origin, preserving the path.
3. Keep the SPA fallback rule after the API rule.

If Amplify cannot proxy the selected API Gateway configuration, use the API hostname directly and configure API Gateway/Lambda CORS to allow only the exact Amplify production domain and approved preview domains. Allow `Content-Type`, `GET`, `POST`, and `OPTIONS`, handle preflight requests, and do not use a wildcard origin in production. The local Express server needs no CORS middleware because local frontend and API share port 3000.

## Production verification

1. Run `npm ci`, `npm run lint`, and `npm run build` in CI.
2. Open every primary SPA route directly and refresh it; routes must return the React app rather than a 404.
3. Confirm `GET /api/health` returns HTTP 200 through the public API path.
4. Submit the contact form with a controlled test address and verify validation errors, agent processing (if enabled), and email delivery.
5. Confirm browser tools show no CORS, mixed-content, or failed `/api/contact` requests.
6. Check CloudWatch/API Gateway logs and alarms, including an invalid request and a controlled provider failure path.
7. Verify secrets are present only in the API runtime and absent from built JavaScript and Amplify build logs.

## Validation commands

```bash
npm run lint
npm run build
```

`npm run build` produces the Vite frontend and the existing bundled Express server for local/container deployment. Amplify uses the frontend-only command in `amplify.yml`, so it publishes only static frontend artifacts.
