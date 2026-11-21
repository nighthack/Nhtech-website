import { motion } from 'motion/react';
import { RoutePath } from '../types';
import { brand } from '../config/brand';
import { publicProofStats } from '../data/proofStats';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { OpenAIPartnerBadge } from '../components/common/OpenAIPartnerBadge';
import { AnimatedCounter, MaskedHeading, ScrollText, StaggerContainer, StaggerItem } from '../components/common/ScrollMotion';
import { Sparkles, ArrowRight, ShieldCheck, Users, Cpu, Layers } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div id="about-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      
      {/* 1. Spatial Page Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Forward Deployed Engineering Origins"
          title="Deep product engineering +"
          titleAccent="AI implementation."
          subtitle={`${brand.displayName} takes difficult business problems and converts them into production technology. We combine deep product engineering and AI implementation, with forward-deployed engineers working alongside customer teams from problem definition to deployment.`}
          ctaText="Initiate Engineering Pod"
          ctaRoute="/contact"
          secondaryCtaText="Explore Engineering Tracks"
          secondaryCtaRoute="/fde"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'ORIGINS', value: 'MICROSOFT R&D INDIA', color: 'var(--accent-orange-text)' },
            { label: 'PARTNERSHIP', value: 'OPENAI SELECT', color: 'var(--text-primary)' },
            { label: 'DELIVERY', value: 'FORWARD DEPLOYED PODS', color: 'var(--accent-secondary)' },
          ]}
        />
      </section>

      {/* 2. Proof Stats Strip with Scroll-triggered Counter */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container space-y-6">
          <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
            Production Systems &amp; Delivery Track Record
          </div>

          <StaggerContainer className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3 gap-px">
            {publicProofStats.map(stat => (
              <StaggerItem key={stat.id}>
                <div className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-2 text-left h-full">
                  <div className="text-4xl font-display font-bold text-[var(--accent-orange-text)] tabular-nums">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-base font-display font-bold text-[var(--text-primary)] mt-1">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">{stat.context}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Core Philosophy & Engineering Pod Narrative */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-8 text-left">
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">Core Operating Tenets</span>
            <MaskedHeading as="h2" className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              How Forward-Deployed Engineering Works at NHTech
            </MaskedHeading>
          </div>

          <StaggerContainer className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-px">
            <StaggerItem>
              <div className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3 h-full">
                <div className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-wider">01 · INCEPTION &amp; RESEARCH RIGOR</div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Research roots before market noise
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  Our AI journey began through research collaborations with <strong>Microsoft R&amp;D India</strong>, grounding our team in mathematical rigor, model evaluation, and algorithmic stability. We turned that foundation into an applied forward-deployed engineering practice.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3 h-full">
                <div className="text-xs font-mono text-[var(--accent-secondary)] font-bold tracking-wider">02 · OPERATING STANCE</div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Deep product engineering + AI implementation
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  We approach enterprise challenges as complete product systems rather than isolated model prompts. We architect the data pipelines, state machines, human review workflows, and mission-critical connectors as one unified production runtime.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3 h-full">
                <div className="text-xs font-mono text-[var(--accent-ocean)] font-bold tracking-wider">03 · TARGET PROBLEMS</div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Built for non-trivial, complex bottlenecks
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  NHTech is brought in when the business problem is difficult, the implementation is non-trivial, and you need senior engineers who can turn complex requirements into a working production system with zero data egress compromises.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3 h-full">
                <div className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-wider">04 · POD ENGAGEMENT</div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Small, senior pods. 100% client code ownership.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  We embed compact, senior engineering pods consisting of applied AI researchers, distributed systems architects, and full-stack product engineers directly with your internal teams. All deliverables, weights, and code remain 100% client-owned.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Verified Partnerships & Ecosystem */}
      <section className="py-14 sm:py-20 relative z-10">
        <div className="site-container space-y-8 text-left">
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">Partnership &amp; Roots</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Partnerships &amp; Research Origins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OpenAIPartnerBadge variant="card" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Research Inception</span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  ML Systems
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                {brand.partnerships.researchRoots.institution}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                Foundational machine learning research collaboration that seeded our core architectural principles in model evaluation and stability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Legal Identity & Bottom CTA */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
              Corporate Identity
            </div>
            <div className="text-sm sm:text-base font-sans text-[var(--text-secondary)]">
              Public Brand: <strong className="text-[var(--text-primary)]">{brand.displayName}</strong>
              <span className="mx-2 text-[var(--accent-secondary)]" aria-hidden="true">·</span>
              Legal Entity: <strong className="text-[var(--text-primary)]">{brand.legalName}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="button-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-tight cursor-pointer shadow-md self-start md:self-auto"
          >
            <span>Get in touch with our engineering leadership</span>
            <ArrowRight className="w-4 h-4 text-[#061421]" />
          </button>
        </div>
      </section>

    </div>
  );
}

