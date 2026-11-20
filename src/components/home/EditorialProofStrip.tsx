import { motion } from 'motion/react';
import { ShieldCheck, Terminal, Eye, Layers, Activity } from 'lucide-react';
import { MaskedHeading, ScrollText, AnimatedMetric } from '../common/ScrollMotion';

export function EditorialProofStrip() {
  const defensibleProofs = [
    {
      metric: 'Real-Time Scale',
      label: 'Financial Streaming',
      context:
        'Cross-region distributed ledger ingestion and real-time fraud pattern detection across high transaction volumes.',
      icon: Activity,
      isSignal: true
    },
    {
      metric: 'On-Device Edge',
      label: 'Local Computer Vision',
      context:
        'Real-time biomechanical joint tracking and kinematic motion analysis executed locally with zero cloud roundtrips.',
      icon: Eye,
      isSignal: false
    },
    {
      metric: 'Enterprise Agents',
      label: 'Production Workflows',
      context:
        'Multi-step state machines orchestrating ERP, CRM, and database records with mandatory human review gates.',
      icon: Terminal,
      isSignal: false
    },
    {
      metric: 'Microsoft R&D',
      label: 'Systems Pedigree',
      context:
        'Founding engineering leadership and core technical talent originating directly from Microsoft R&D India.',
      icon: Layers,
      isSignal: false
    },
    {
      metric: 'Select Partner',
      label: 'OpenAI Specialization',
      context:
        'Verified partner status focused on enterprise agent orchestration, model evaluations, and production tuning.',
      icon: ShieldCheck,
      isSignal: true
    }
  ];

  return (
    <section
      id="production-proof-section"
      className="py-20 sm:py-28 bg-ocean-depth text-[var(--text-primary)] border-b border-[var(--border-color)] relative overflow-hidden"
    >
      {/* Subtle Architectural Meridian Ring Overlay */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 500"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-15"
      >
        <circle cx="980" cy="120" r="320" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.75" />
        <circle cx="980" cy="120" r="460" fill="none" stroke="#FF5A1F" strokeWidth="0.6" strokeDasharray="5 9" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-2.5 max-w-2xl text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-[var(--accent-orange-text)] uppercase tracking-[0.16em] font-semibold"
            >
              Verified Production Proof
            </motion.p>

            <MaskedHeading as="h2" className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              Verifiable engineering evidence.{' '}
              <span className="text-[var(--accent-secondary)]">
                Tested in production.
              </span>
            </MaskedHeading>
          </div>

          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-md leading-relaxed text-left" delay={0.15}>
            We evaluate engineering systems by their ability to execute enterprise workloads under actual operational load—measured by real throughput, on-device performance, and verified partnerships.
          </ScrollText>
        </div>

        {/* Unboxed Architectural Metric Ledger (5 columns divided cleanly by vertical hairlines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-[var(--border-color)] border-b border-[var(--border-color)] pb-4">
          {defensibleProofs.map((proof, idx) => {
            const Icon = proof.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-6 text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                    <span className="uppercase tracking-wider">{proof.label}</span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        proof.isSignal ? 'text-[var(--accent-orange-text)]' : 'text-[var(--accent-secondary)]'
                      }`}
                    />
                  </div>

                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text-primary)] tracking-tight tabular-nums leading-none">
                    <AnimatedMetric value={proof.metric} />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
                    {proof.context}
                  </p>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-secondary)] group-hover:text-[var(--accent-orange-text)] transition-colors">
                  Verified Architecture
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
