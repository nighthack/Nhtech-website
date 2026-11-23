import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { ProductVideoPlayer } from '../components/products/ProductVideoPlayer';
import { publicProducts } from '../data/products';
import type { RoutePath } from '../types';

export function ProductsPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const [filter, setFilter] = useState('all');
  const products = publicProducts.filter((product) => filter === 'all' || product.id === filter);
  const videos: Record<string, string> = { talkument: '/Talkument.mp4', hoot: '/Hoot.mp4', 'agent-platform': '/Ottom8.mp4' };
  return <div id="products-chapter">
    <section className="border-b border-[var(--border-color)] pb-14 pt-28 sm:pt-32"><SpatialPageHeader title="Our products" subtitle="Alongside client work, we build our own products: Talkument for documents, Hoot for team chat and Ottom8 for AI workflows." ctaText="Request a pilot" ctaRoute="/contact" onNavigate={onNavigate} /></section>
    <section className="bg-[var(--bg-surface-subtle)] py-14 sm:py-20"><div className="site-container space-y-10">
      <div role="group" aria-label="Filter products" className="flex flex-wrap gap-2">{[{ id: 'all', name: 'All products' }, ...publicProducts].map((product) => <button key={product.id} type="button" aria-pressed={filter === product.id} onClick={() => setFilter(product.id)} className={`site-button ${filter === product.id ? 'button-primary' : 'button-secondary'}`}>{product.name}</button>)}</div>
      <div className="divide-y divide-[var(--border-color)]">{products.map((product) => <article id={`product-showcase-${product.id}`} key={product.id} className="grid items-start gap-8 py-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div className="space-y-5"><h2 className="text-section-display">{product.name}</h2><p className="leading-relaxed text-[var(--text-secondary)]">{product.supportingText || product.description}</p><p className="text-sm leading-relaxed text-[var(--text-secondary)]">{product.problemSolved}</p><ul className="space-y-3 border-y border-[var(--border-color)] py-5 text-sm leading-relaxed text-[var(--text-secondary)]">{product.keyCapabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>{product.liveUrl && <a className="site-button button-secondary" href={product.liveUrl} target="_blank" rel="noopener noreferrer">Visit {product.name}<ArrowUpRight aria-hidden="true" className="size-4" /></a>}</div>
        <ProductVideoPlayer src={videos[product.id]} title={product.name} poster={`/product-posters/${product.id}.webp`} />
      </article>)}</div>
      <div className="space-y-5 border-t border-[var(--border-color)] pt-10"><h2 className="text-card-display">Want to try one with your team?</h2><button type="button" onClick={() => onNavigate('/contact')} className="site-button button-primary">Request a pilot<ArrowRight aria-hidden="true" className="size-4" /></button></div>
    </div></section>
  </div>;
}
