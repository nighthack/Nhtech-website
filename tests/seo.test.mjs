import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const dist = path.resolve('dist');
const routes = ['/', '/what-we-build', '/fde', '/computer-vision', '/on-prem-ai', '/agentic-ai', '/document-intelligence', '/work', '/products', '/industries', ...['manufacturing', 'enterprise', 'fintech', 'retail', 'startups'].map((name) => `/industries/${name}`), '/about', '/careers', '/contact', '/privacy-policy', '/terms-and-conditions', ...['enterprise-workflow-intelligence', 'document-intelligence', 'computer-vision-motion', 'vision-robotic-inspection', 'financial-anomaly', 'demand-forecasting'].map((slug) => `/work/${slug}`)];
const titleOf = (html) => html.match(/<title>([^<]+)<\/title>/)?.[1];

test('every public route has independent readable HTML and complete share metadata', async () => {
  const titles = new Set();
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  for (const route of routes) {
    const html = await readFile(path.join(dist, route.slice(1), 'index.html'), 'utf8');
    const title = titleOf(html); assert.ok(title, route); assert.ok(!titles.has(title), `duplicate title: ${route}`); titles.add(title);
    assert.match(html, /<html lang="en-IN"/); assert.match(html, /<h1\b/); assert.doesNotMatch(html, /<div id="root"><\/div>/);
    for (const key of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'twitter:card']) assert.ok(html.includes(`="${key}"`), `${route}: ${key}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]; assert.ok(canonical?.endsWith(route), route); assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), route);
    const image = html.match(/property="og:image" content="[^"]+(\/social\/[^"]+)"/)?.[1]; assert.ok(image, route);
    const bytes = await readFile(path.join(dist, image.slice(1))); assert.equal(bytes.readUInt32BE(16), 1200); assert.equal(bytes.readUInt32BE(20), 630);
    const schema = JSON.parse(html.match(/id="nhtech-jsonld">([\s\S]*?)<\/script>/)[1]); assert.ok(schema.some((item) => item['@type'] === 'BreadcrumbList'));
    if (route.startsWith('/work/')) assert.ok(schema.some((item) => item['@type'] === 'Article' && item.url === canonical));
  }
});

test('hosting rules preserve per-page metadata and genuine missing-page responses', async () => {
  const rules = JSON.parse(await readFile(path.join(dist, 'amplify-rewrites.json'), 'utf8'));
  for (const route of routes.filter((route) => route !== '/')) assert.ok(rules.some((rule) => rule.source === route && rule.target === `${route}/index.html` && rule.status === '200'));
  assert.deepEqual(rules.at(-1), { source: '/<*>', target: '/404.html', status: '404' });
  const notFound = await readFile(path.join(dist, '404.html'), 'utf8'); assert.match(notFound, /noindex, nofollow/); assert.match(notFound, /Page not found/);
});

test('route chunks replace the previous single large page bundle', async () => {
  const assets = await readdir(path.join(dist, 'assets'));
  assert.ok(assets.some((file) => /^ContactPage-.*\.js$/.test(file)));
  assert.ok(assets.some((file) => /^CaseStudyPage-.*\.js$/.test(file)));
  for (const file of assets.filter((file) => file.endsWith('.js'))) assert.ok((await readFile(path.join(dist, 'assets', file))).length < 500_000, file);
});

test('production direct links, aliases, 404s and three-field contact validation', async (context) => {
  const child = spawn(process.execPath, ['dist/server.cjs'], { env: { ...process.env, NODE_ENV: 'production', PORT: '4191', OTTOM8_API_KEY: '' }, stdio: 'ignore' });
  context.after(() => child.kill());
  const base = 'http://127.0.0.1:4191';
  let ready = false;
  for (let n = 0; n < 100; n++) {
    try { if ((await fetch(`${base}/api/health`)).ok) { ready = true; break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  assert.ok(ready, 'production server started');
  for (const route of routes) { const response = await fetch(base + route); assert.equal(response.status, 200, route); const html = await response.text(); assert.ok(titleOf(html)); }
  const alias = await fetch(`${base}/forward-deployed-engineering`, { redirect: 'manual' }); assert.equal(alias.status, 301); assert.equal(alias.headers.get('location'), '/fde');
  assert.equal((await fetch(`${base}/missing-page`)).status, 404);
  assert.equal((await fetch(`${base}/missing.js`)).status, 404);
  const post = (payload) => fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  assert.equal((await post({ name: '', email: 'invalid' })).status, 400);
  assert.equal((await post({ name: 'Test', email: 'test@example.com', problemStatement: 'Checking validation only', company: {} })).status, 400);
  const valid = await post({ name: 'Test', email: 'test@example.com', problemStatement: 'Checking validation without sending any message' });
  assert.equal(valid.status, 503, 'three required fields reach delivery without needing scheduling or company');
  assert.equal((await valid.json()).success, false, 'unavailable delivery is reported honestly');
});

test('the extracted contact handler forwards the short enquiry to Ottom8 and reports provider failure', async (context) => {
  const { createServer } = await import('node:http');
  const payloads = [];
  let failProvider = false;
  const provider = createServer(async (req, res) => {
    let body = '';
    for await (const chunk of req) body += chunk;
    payloads.push({ key: req.headers['x-api-key'], payload: JSON.parse(body) });
    res.writeHead(failProvider ? 502 : 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(failProvider ? { error: 'Test failure' } : { result: 'accepted' }));
  });
  await new Promise((resolve) => provider.listen(0, '127.0.0.1', resolve));
  const providerPort = provider.address().port;
  const child = spawn(process.execPath, ['dist/server.cjs'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '4195', OTTOM8_API_KEY: 'local-test-key', OTTOM8_AGENT_URL: `http://127.0.0.1:${providerPort}/agent` },
    stdio: 'ignore',
  });
  context.after(() => { child.kill(); provider.closeAllConnections(); provider.close(); });
  let ready = false;
  for (let n = 0; n < 100; n++) {
    try { if ((await fetch('http://127.0.0.1:4195/api/health')).ok) { ready = true; break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  assert.ok(ready, 'production server started');
  const post = (data) => fetch('http://127.0.0.1:4195/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  const enquiry = { name: 'Test', email: 'test@example.com', problemStatement: 'A local-only integration test enquiry' };
  const accepted = await post(enquiry);
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).agentProcessed, true);
  assert.equal(payloads[0].key, 'local-test-key');
  const forwarded = JSON.parse(payloads[0].payload.input_value);
  assert.equal(forwarded.name, enquiry.name);
  assert.equal(forwarded.problem_statement, enquiry.problemStatement);
  assert.equal(forwarded.company, 'Not Specified');
  assert.ok(!('schedulingDate' in forwarded));
  assert.ok(!('schedulingTime' in forwarded));
  failProvider = true;
  const failed = await post(enquiry);
  assert.equal(failed.status, 503);
  assert.equal((await failed.json()).success, false);
  assert.equal((await post({ ...enquiry, role: {} })).status, 400);
  assert.equal(payloads.length, 2, 'invalid input does not reach the provider');
});
