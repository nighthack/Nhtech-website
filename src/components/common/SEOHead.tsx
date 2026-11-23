import { useEffect } from 'react';
import { brand } from '../../config/brand';
import { getSeo } from '../../config/seo';

export function SEOHead({ currentPath }: { currentPath: string }) {
  useEffect(() => {
    const publicHost = new URL(brand.siteUrl).hostname.replace(/^www\./, '');
    const staging = window.location.hostname.replace(/^www\./, '') !== publicHost;
    const seo = getSeo(currentPath, staging || import.meta.env.VITE_NOINDEX === 'true');
    document.title = seo.meta.title;
    document.documentElement.lang = 'en-IN';
    const tags = {
      description: seo.meta.description, robots: seo.robots, googlebot: seo.robots,
      'theme-color': '#061421',
      'og:title': seo.meta.title, 'og:description': seo.meta.description, 'og:url': seo.canonical,
      'og:type': seo.meta.pageType === 'Article' ? 'article' : 'website', 'og:site_name': brand.displayName,
      'og:locale': 'en_IN', 'og:image': seo.image, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': seo.meta.title,
      'twitter:card': 'summary_large_image', 'twitter:title': seo.meta.title,
      'twitter:description': seo.meta.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.meta.title,
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, key); document.head.appendChild(tag); }
      tag.content = content;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = seo.canonical;
    let schema = document.getElementById('nhtech-jsonld');
    if (!schema) { schema = document.createElement('script'); schema.id = 'nhtech-jsonld'; schema.setAttribute('type', 'application/ld+json'); document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(seo.schemas);
  }, [currentPath]);
  return null;
}
