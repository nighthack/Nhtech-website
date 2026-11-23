import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { brand } from '../src/config/brand';
import { getSeo, routeAliases } from '../src/config/seo';
import { caseStudies } from '../src/data/caseStudies';
import { AboutPage } from '../src/pages/AboutPage';
import { AgenticAiPage } from '../src/pages/AgenticAiPage';
import { CareersPage } from '../src/pages/CareersPage';
import { CaseStudyPage } from '../src/pages/CaseStudyPage';
import { ComputerVisionPage } from '../src/pages/ComputerVisionPage';
import { ContactPage } from '../src/pages/ContactPage';
import { DocumentIntelligencePage } from '../src/pages/DocumentIntelligencePage';
import { ForwardDeployedEngineeringPage } from '../src/pages/ForwardDeployedEngineeringPage';
import { HomePage } from '../src/pages/HomePage';
import { IndustriesPage } from '../src/pages/IndustriesPage';
import { IndustryDetailPage } from '../src/pages/IndustryDetailPage';
import { ManufacturingPage } from '../src/pages/ManufacturingPage';
import { NotFoundPage } from '../src/pages/NotFoundPage';
import { OnPremAiPage } from '../src/pages/OnPremAiPage';
import { PrivacyPolicyPage } from '../src/pages/PrivacyPolicyPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { TermsAndConditionsPage } from '../src/pages/TermsAndConditionsPage';
import { WhatWeBuildPage } from '../src/pages/WhatWeBuildPage';
import { WorkPage } from '../src/pages/WorkPage';

const navigate = () => {};
const props = { onNavigate: navigate, onSelectCaseStudy: () => {} };
const views = {
  '/': <HomePage {...props} />, '/fde': <ForwardDeployedEngineeringPage {...props} />,
  '/on-prem-ai': <OnPremAiPage {...props} />, '/what-we-build': <WhatWeBuildPage {...props} />,
  '/agentic-ai': <AgenticAiPage {...props} />, '/document-intelligence': <DocumentIntelligencePage {...props} />,
  '/computer-vision': <ComputerVisionPage {...props} />, '/industries': <IndustriesPage {...props} />,
  '/industries/manufacturing': <ManufacturingPage {...props} />,
  ...Object.fromEntries(['enterprise', 'fintech', 'retail', 'startups'].map((slug) => [`/industries/${slug}`, <IndustryDetailPage {...props} slug={slug} />])),
  '/work': <WorkPage {...props} />, '/products': <ProductsPage {...props} />, '/about': <AboutPage {...props} />,
  '/careers': <CareersPage {...props} />, '/contact': <ContactPage {...props} />,
  '/terms-and-conditions': <TermsAndConditionsPage {...props} />, '/privacy-policy': <PrivacyPolicyPage />,
  ...Object.fromEntries(caseStudies.filter((study) => study.approvedForPublicWebsite).map((study) => [`/work/${study.slug}`, <CaseStudyPage {...props} study={study} />])),
};
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const noindex = process.env.VITE_NOINDEX === 'true' || (!!process.env.AWS_BRANCH && process.env.AWS_BRANCH !== 'main');
const rewrites: { source: string; target: string; status: string }[] = [];
for (const [route, view] of [...Object.entries(views), ['/404', <NotFoundPage />] as const]) {
  const { meta, canonical, image, robots, schemas } = getSeo(route, noindex);
  const markup = renderToString(createElement(App, { initialPath: route, serverPage: view }));
  let html = template.replace(/<title>[\s\S]*?<\/title>|<meta (?:name|property)="(?:description|robots|googlebot|og:[^"]+|twitter:[^"]+|theme-color)"[^>]*>|<link rel="canonical"[^>]*>/g, '');
  const tags = { description: meta.description, robots, googlebot: robots, 'theme-color': '#061421', 'og:title': meta.title, 'og:description': meta.description, 'og:type': meta.pageType === 'Article' ? 'article' : 'website', 'og:url': canonical, 'og:site_name': brand.displayName, 'og:locale': 'en_IN', 'og:image': image, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': meta.title, 'twitter:card': 'summary_large_image', 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': image, 'twitter:image:alt': meta.title };
  const head = `<title>${escape(meta.title)}</title>\n` + Object.entries(tags).map(([name, value]) => `<meta ${name.startsWith('og:') ? 'property' : 'name'}="${name}" content="${escape(value)}">`).join('\n') + `\n<link rel="canonical" href="${escape(canonical)}">\n<script type="application/ld+json" id="nhtech-jsonld">${JSON.stringify(schemas).replaceAll('<', '\\u003c')}</script>`;
  html = html.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${markup}</div>`).replace('lang="en"', 'lang="en-IN"');
  const file = route === '/404' ? path.join(dist, '404.html') : path.join(dist, route.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, html);
  if (route !== '/' && route !== '/404') {
    rewrites.push({ source: route, target: `${route}/index.html`, status: '200' });
    rewrites.push({ source: `${route}/`, target: route, status: '301' });
  }
}
for (const [source, target] of Object.entries(routeAliases)) {
  rewrites.unshift({ source, target, status: '301' });
  await mkdir(path.join(dist, source.slice(1)), { recursive: true });
  await writeFile(path.join(dist, source.slice(1), 'index.html'), `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${brand.siteUrl}${target}"></head><body><a href="${target}">Continue to ${target}</a></body></html>`);
}
rewrites.push({ source: '/<*>', target: '/404.html', status: '404' });
await writeFile(path.join(dist, 'amplify-rewrites.json'), JSON.stringify(rewrites, null, 2));
await writeFile(path.join(dist, '_redirects'), rewrites.map(({ source, target, status }) => `${source.replace('/<*>', '/*')} ${target} ${status}`).join('\n') + '\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(views).map((route) => `<url><loc>${brand.siteUrl}${route === '/' ? '/' : route}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(dist, 'robots.txt'), noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${brand.siteUrl}/sitemap.xml\n`);
console.log(`Pre-rendered ${Object.keys(views).length} pages with content, metadata and structured data${noindex ? ' (noindex build)' : ''}.`);
