import { RoutePath } from '../types';
import { industries } from '../data/industries';
import { WorldCanvas, WorldMode } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, Layers, Factory, Building2, Landmark, ShoppingBag, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface IndustryDetailPageProps {
  slug: string;
  onNavigate: (path: RoutePath) => void;
}

export function IndustryDetailPage({ slug, onNavigate }: IndustryDetailPageProps) {
  const industry = industries.find(i => i.slug === slug) || industries[0];

  const getWorldMode = (slug: string): WorldMode => {
    switch (slug) {
      case 'manufacturing': return 'manufacturing';
      case 'fintech': return 'fintech';
      case 'enterprise': return 'enterprise';
      case 'retail': return 'matrix';
      case 'startups': return 'vision';
      default: return 'minimal';
    }
  };

  const worldMode = getWorldMode(industry.slug);

  return (
    <div id={`industry-detail-${industry.slug}`} className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Ambient World Canvas tailored to the sector */}
      <WorldCanvas mode={worldMode} opacity={0.35} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag={`Sector Architecture · ${industry.slug}`}
          title={industry.name.split('&')[0].trim()}
          titleAccent={industry.name.split('&')[1] ? `& ${industry.name.split('&')[1].trim()}` : 'Engineering'}
          subtitle={industry.summary}
          ctaText={`Initiate ${industry.name.split('&')[0].trim()} Assessment`}
          ctaRoute="/contact"
          secondaryCtaText="Inspect Live Topologies"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'SOVEREIGNTY', value: 'AIR-GAPPED & VPC' },
            { label: 'SECTOR', value: industry.slug.toUpperCase() },
            { label: 'RETENTION', value: '100% CLIENT IP' },
          ]}
        />
      </section>

      {/* 2. Challenge & Engineered Systems Stage */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
              <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                Operational Friction Point
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
                The Core Technical Bottleneck
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-4xl">
                {industry.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Engineered Workflow Systems Deployed
              </div>
              <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px font-mono text-xs">
                {industry.systems.map((sys, idx) => (
                  <div key={idx} className="p-5 bg-[var(--bg-surface-subtle)] flex items-start gap-3">
                    <span className="text-[var(--accent-orange-text)] font-bold mt-0.5 tabular-nums">0{idx + 1}</span>
                    <span className="text-[var(--text-primary)] font-sans text-xs sm:text-sm leading-relaxed">{sys}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architectural Focus Pillars */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">System Constraints</span>
            <MaskedHeading as="h2" className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Architectural Principles &amp; Guarantees
            </MaskedHeading>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px font-mono text-xs">
            {industry.architectureFocus.map((focus, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 bg-[var(--bg-surface)] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="text-[var(--accent-orange-text)] font-bold tabular-nums">Focus 0{idx + 1}</div>
                  <div className="text-sm font-display font-bold text-[var(--text-primary)] font-sans leading-snug">
                    {focus}
                  </div>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                  ✓ Validated in production
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-widest block">
            Sector Engagement
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to deploy an engineering pod in {industry.name}?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            We partner with operational leaders to design AI systems tailored to your data topology.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] text-[#061421] font-display font-bold text-sm tracking-tight transition-all cursor-pointer shadow-md"
            >
              <span>Initiate Sector Discussion</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
