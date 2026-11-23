import { caseStudies } from '../data/caseStudies';
import { products } from '../data/products';
import { brand } from './brand';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  pageType?: string;
  noindex?: boolean;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': { title: 'Applied AI engineering | NHTech', description: 'Senior engineers build workflow automation, edge computer vision and private AI with your team. Everything runs on infrastructure you control.' },
  '/what-we-build': { title: 'Services | NHTech', description: 'Embedded teams, vision and edge AI, and private AI. We combine workflow automation, document processing and custom apps around your operations.' },
  '/fde': { title: 'Embedded engineering teams | NHTech', description: 'Senior product and AI engineers work alongside your team, from workflow discovery and prototyping to integration, deployment and handover.' },
  '/computer-vision': { title: 'Vision & edge AI | NHTech', description: 'Computer vision for cameras, tablets and factory hardware. On-device motion tracking and defect inspection with local processing and operator review.' },
  '/on-prem-ai': { title: 'Private AI models | NHTech', description: 'Search over your documents, adapt a model to your domain, or build a smaller model. Run it on your servers or private cloud and keep the data and code.' },
  '/agentic-ai': { title: 'AI agents | NHTech', description: 'AI agents that read documents, use your tools and stop for human approval. Scoped access, fixed workflow steps and a full audit log.' },
  '/document-intelligence': { title: 'Document intelligence | NHTech', description: 'Turn contracts, filings, manuals and clinical records into searchable data. Check answers against source citations and run on private infrastructure.' },
  '/work': { title: 'Our work | NHTech', description: 'Case studies in enterprise workflows, document intelligence, on-device vision, defect inspection, financial monitoring and demand forecasting.', pageType: 'CollectionPage' },
  '/products': { title: 'Products: Talkument, Hoot and Ottom8 | NHTech', description: 'Talkument for documents, Hoot for team chat and Ottom8 for AI workflows. See product demonstrations and find the right platform for your team.', pageType: 'CollectionPage' },
  '/industries': { title: 'Industries | NHTech', description: 'Applied AI for manufacturing, enterprise operations, banking, retail and startups, with document and clinical workflows.', pageType: 'CollectionPage' },
  '/industries/manufacturing': { title: 'AI for manufacturing | NHTech', description: 'On-device defect inspection, plant telemetry and operator dashboards. Systems can run offline inside your plant network.' },
  '/industries/enterprise': { title: 'AI for enterprise operations | NHTech', description: 'Connect email, documents, spreadsheets and core business systems. Automate routine processing and route exceptions to your operators.' },
  '/industries/fintech': { title: 'AI for banking and fintech | NHTech', description: 'Financial transaction monitoring, anomaly detection, document processing and reconciliation, with review controls and audit trails.' },
  '/industries/retail': { title: 'AI for retail | NHTech', description: 'Demand forecasting, catalogue processing and inventory workflows. Connect predictions to procurement and warehouse systems.' },
  '/industries/startups': { title: 'AI engineering for startups | NHTech', description: 'Senior engineers help founders test difficult AI assumptions, build working prototypes and take products into production.' },
  '/about': { title: 'About NHTech', description: 'NHTech is a brand of NightHack Technology Private Limited, based in Bengaluru. We build applied AI and product systems alongside customer teams.', pageType: 'AboutPage' },
  '/careers': { title: 'Careers | NHTech', description: 'Join a small team of senior engineers building AI and product systems, with ownership from design to production.' },
  '/contact': { title: 'Contact | NHTech', description: 'Tell us what you need help with. Talk directly to NHTech about embedded teams, vision and edge AI, private models, documents or AI agents.', pageType: 'ContactPage' },
  '/terms-and-conditions': { title: 'Terms and payments | NHTech', description: 'Terms of service, billing, payments and refunds for NightHack Technology Private Limited.' },
  '/privacy-policy': { title: 'Privacy policy | NHTech', description: 'How NHTech handles website enquiries, contact details and technical information, and how to contact us about your personal data.' },
};

export const routeAliases: Record<string, string> = {
  '/forward-deployed-engineering': '/fde',
  '/sovereign-models': '/on-prem-ai',
  '/sovereign-ai': '/on-prem-ai',
};

export function normalisePath(path: string) {
  return path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
}

export function getPageMetadata(path: string): PageMetadata {
  const clean = normalisePath(path);
  const canonical = routeAliases[clean] || clean;
  const study = caseStudies.find((item) => item.approvedForPublicWebsite && `/work/${item.slug}` === canonical);
  if (study) return { title: `${study.title} | NHTech`, description: study.context, pageType: 'Article', canonicalPath: canonical };
  return pageMetadata[canonical] ? { ...pageMetadata[canonical], canonicalPath: canonical } : {
    title: 'Page not found | NHTech', description: 'This page could not be found. Browse NHTech services, products and case studies.', noindex: true, canonicalPath: clean,
  };
}

export function getSeo(path: string, noindex = false) {
  const meta = getPageMetadata(path);
  const canonicalPath = meta.canonicalPath || normalisePath(path);
  const canonical = `${brand.siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;
  const image = `${brand.siteUrl}/social/${canonicalPath === '/' ? 'home' : canonicalPath.slice(1).replaceAll('/', '-')}.png`;
  const robots = noindex || meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const organization = {
    '@type': 'Organization', '@id': `${brand.siteUrl}/#organization`, name: brand.legalName,
    alternateName: brand.displayName, url: `${brand.siteUrl}/`, email: brand.contact.email,
    logo: `${brand.siteUrl}/logo.jpg`, address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
    sameAs: [brand.contact.linkedInUrl, brand.contact.githubUrl],
  };
  const schemas: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', ...organization },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${brand.siteUrl}/#website`, name: brand.displayName, url: `${brand.siteUrl}/`, publisher: { '@id': organization['@id'] }, inLanguage: 'en-IN' },
    { '@context': 'https://schema.org', '@type': meta.pageType === 'Article' ? 'WebPage' : meta.pageType || 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: meta.title, description: meta.description, inLanguage: 'en-IN', isPartOf: { '@id': `${brand.siteUrl}/#website` } },
  ];
  if (['/fde', '/computer-vision', '/on-prem-ai', '/agentic-ai', '/document-intelligence'].includes(canonicalPath)) schemas.push({ '@context': 'https://schema.org', '@type': 'Service', name: meta.title.replace(/ \| NHTech$/, ''), description: meta.description, url: canonical, provider: { '@id': organization['@id'] } });
  const study = caseStudies.find((item) => item.approvedForPublicWebsite && canonicalPath === `/work/${item.slug}`);
  if (study) schemas.push({ '@context': 'https://schema.org', '@type': 'Article', headline: study.title, description: study.context, url: canonical, mainEntityOfPage: { '@id': `${canonical}#webpage` }, author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] }, image, articleBody: `${study.difficulty} ${study.systemDesigned} ${study.operationalImpact}` });
  if (canonicalPath === '/work') schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: caseStudies.filter((item) => item.approvedForPublicWebsite).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: `${brand.siteUrl}/work/${item.slug}` })) });
  if (canonicalPath === '/products') products.filter((item) => item.approvedForPublicWebsite).forEach((product) => schemas.push({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: product.name, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: product.liveUrl, description: product.description, author: { '@id': organization['@id'] } }));
  const crumbs = [{ name: 'Home', url: `${brand.siteUrl}/` }];
  if (canonicalPath.startsWith('/work/')) crumbs.push({ name: 'Our work', url: `${brand.siteUrl}/work` });
  if (canonicalPath.startsWith('/industries/')) crumbs.push({ name: 'Industries', url: `${brand.siteUrl}/industries` });
  if (canonicalPath !== '/' && !meta.noindex) crumbs.push({ name: meta.title.replace(/ \| NHTech$/, ''), url: canonical });
  schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url })) });
  return { meta, canonical, image: meta.noindex ? `${brand.siteUrl}/social/home.png` : image, robots, schemas };
}
