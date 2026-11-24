import { build as bundle } from 'esbuild';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

// Vite exposes the same staging flag to the browser and the generated HTML.
if (process.env.AWS_BRANCH && process.env.AWS_BRANCH !== 'main') process.env.VITE_NOINDEX = 'true';
await build();
const cache = path.resolve('node_modules/.cache/nhtech-prerender.mjs');
await mkdir(path.dirname(cache), { recursive: true });
try {
  await bundle({ entryPoints: ['scripts/prerender.tsx'], outfile: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', define: { 'import.meta.env.VITE_NOINDEX': JSON.stringify(process.env.VITE_NOINDEX || '') } });
  await import(pathToFileURL(cache).href);
} finally { await rm(cache, { force: true }); }
if (!process.argv.includes('--frontend-only')) await bundle({ entryPoints: ['server.ts'], outfile: 'dist/server.cjs', bundle: true, platform: 'node', format: 'cjs', packages: 'external', sourcemap: true });
