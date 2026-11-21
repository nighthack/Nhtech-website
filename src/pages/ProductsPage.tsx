import { useState } from 'react';
import { motion } from 'motion/react';
import { RoutePath, ProductItem } from '../types';
import { publicProducts } from '../data/products';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { FileText, MessageSquareText, Workflow, ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Globe } from 'lucide-react';
import { ProductVideoPlayer } from '../components/products/ProductVideoPlayer';

interface ProductsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'talkument': return FileText;
      case 'hoot': return MessageSquareText;
      case 'agent-platform':
      default: return Workflow;
    }
  };

  const getProductMedia = (id: string) => {
    switch (id) {
      case 'talkument':
        return {
          videoSrc: '/Talkument.mp4',
          accent: '#47849B',
          textAccent: 'var(--accent-ocean)',
          badge: 'bg-[var(--bg-surface-elevated)] text-[var(--accent-secondary)] border border-[var(--border-color)]',
          telemetryBadge: 'Document Intelligence · Spatial RAG'
        };
      case 'hoot':
        return {
          videoSrc: '/Hoot.mp4',
          accent: '#FF5A1F',
          textAccent: 'var(--accent-orange-text)',
          badge: 'bg-[var(--bg-surface-elevated)] text-[var(--accent-orange-text)] border border-[var(--border-color)]',
          telemetryBadge: 'Enterprise Messaging · Context Agents'
        };
      case 'agent-platform':
      default:
        return {
          videoSrc: '/Ottom8.mp4',
          accent: '#75A4B5',
          textAccent: 'var(--accent-secondary)',
          badge: 'bg-[var(--bg-surface-elevated)] text-[var(--accent-secondary)] border border-[var(--border-color)]',
          telemetryBadge: 'Workflow Orchestration · DAG Runtime'
        };
    }
  };

  const filteredProducts = activeTab === 'all'
    ? publicProducts
    : publicProducts.filter(p => p.id === activeTab);

  return (
    <div id="products-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      
      {/* 1. Spatial Page Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Internal Incubated Software Platforms"
          title="Software platforms born from"
          titleAccent="applied engineering."
          subtitle="In addition to forward-deployed client engineering, NHTech builds specialized, standalone software runtimes for document intelligence, enterprise messaging, and multi-agent workflow orchestration."
          ctaText="Request Platform Pilot"
          ctaRoute="/contact"
          secondaryCtaText="Explore Engineering Tracks"
          secondaryCtaRoute="/fde"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'PLATFORMS', value: '3 PUBLIC PRODUCTS', color: 'var(--accent-orange-text)' },
            { label: 'DEPLOYMENT', value: 'VPC / ON-PREM READY', color: 'var(--text-primary)' },
            { label: 'STATUS', value: 'LIVE & IN PRODUCTION', color: 'var(--accent-secondary)' },
          ]}
        />
      </section>

      {/* 2. Platform Filter Bar & Deep Showcases */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-12">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-color)]"
          >
            <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
              Incubated Software Suite
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#FF5A1F] text-[#061421] font-bold shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                All Platforms ({publicProducts.length})
              </button>
              {publicProducts.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveTab(p.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === p.id
                      ? 'bg-[#FF5A1F] text-[#061421] font-bold shadow-sm'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-12">
            {filteredProducts.map((product, idx) => {
              const Icon = getProductIcon(product.id);
              const media = getProductMedia(product.id);

              return (
                <motion.div
                  key={product.id}
                  id={`product-showcase-${product.id}`}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] p-6 sm:p-10 space-y-8 shadow-sm relative overflow-hidden transition-all"
                >
              {/* Top Header with Live Product Link + Action CTAs */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] relative z-10">
                <div className="flex items-center gap-3.5">
                  {product.liveUrl ? (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-transform hover:scale-105 cursor-pointer"
                      style={{ color: media.textAccent }}
                      title={`Visit ${product.name} website`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ) : (
                    <div className="p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]" style={{ color: media.textAccent }}>
                      <Icon className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {product.liveUrl ? (
                        <a
                          href={product.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/title flex items-center gap-1.5 cursor-pointer"
                        >
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] group-hover/title:text-[var(--accent-secondary)] transition-colors tracking-tight">
                            {product.name}
                          </h2>
                          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover/title:text-[var(--accent-secondary)] transition-all transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
                        </a>
                      ) : (
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                          {product.name}
                        </h2>
                      )}

                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold ${media.badge}`}>
                        {product.status}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-display font-bold cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <span>{product.ctaLabel || `Explore ${product.name} ↗`}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => onNavigate('/contact')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer"
                  >
                    <span>Request Pilot</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </button>
                </div>
              </div>

              {/* Grid: Narrative + Real Product Video Focus */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 text-left">
                
                {/* Narrative & Concise Capabilities (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Dedicated Live Product Summary Card */}
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                      <span>Product Overview</span>
                      {product.liveUrl && (
                        <a
                          href={product.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-[var(--accent-secondary)] hover:underline flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          <span>{product.liveUrl.replace('https://', '').replace(/\/$/, '')}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                      {product.supportingText || product.description}
                    </p>
                  </div>

                  {/* Problem Solved */}
                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1.5">
                    <div className="text-[11px] font-mono uppercase font-bold" style={{ color: media.textAccent }}>
                      Enterprise Challenge Addressed
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                      {product.problemSolved}
                    </p>
                  </div>

                  {/* Concise Capabilities List */}
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Core Capabilities
                    </div>
                    {product.keyCapabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] font-normal">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: media.textAccent }} />
                        <span className="leading-relaxed font-sans">{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Website Link Anchor Button */}
                  {product.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:border-[var(--border-hover)] text-xs font-mono font-bold text-[var(--text-primary)] hover:text-[var(--accent-secondary)] transition-all group/cta"
                      >
                        <span className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                          <span>{product.ctaLabel || `Explore ${product.name} ↗`}</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover/cta:text-[var(--accent-secondary)] transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-all" />
                      </a>
                    </div>
                  )}

                  {/* Deployment note */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                    <span>Private VPC / On-Prem / Cloud Deployment</span>
                  </div>
                </div>

                {/* Real Product Video Showcase (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <ProductVideoPlayer
                    src={media.videoSrc}
                    title={product.name}
                    accentColor={media.accent}
                    badge={media.telemetryBadge}
                    liveUrl={product.liveUrl}
                    ctaLabel={product.ctaLabel}
                  />

                  {/* High Visibility Companion Link Bar alongside Video */}
                  {product.liveUrl && (
                    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-secondary)]">
                        <Globe className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                        <span className="text-[var(--text-muted)]">Live Product:</span>
                        <span className="font-bold text-[var(--text-primary)]">{product.liveUrl}</span>
                      </div>

                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--accent-orange-text)] hover:underline"
                      >
                        <span>{product.ctaLabel || `Explore ${product.name} ↗`}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-widest block">
            Enterprise Platform Pilots
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Deploy a dedicated platform instance inside your VPC.
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            We containerize and deploy Talkument, Hoot, or our Ottom8 Agent Platform directly into your cloud perimeter with zero vendor lock-in.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Request Platform Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
