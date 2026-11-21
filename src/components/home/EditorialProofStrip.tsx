import { ShieldCheck, Terminal, Eye, Layers, Activity } from 'lucide-react';
import { SectionBackdrop } from './SectionBackdrop';

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
      className="home-section py-16 sm:py-24 bg-ocean-depth text-[var(--text-primary)] border-b border-[var(--border-color)] relative overflow-hidden"
    >
      <SectionBackdrop mode="meridian" />
      <div className="site-container relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-2.5 max-w-2xl text-left">
            <h2 className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              Verifiable engineering evidence.{' '}
              <span className="text-[var(--accent-secondary)]">
                Tested in production.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-md leading-relaxed text-left">
            We evaluate engineering systems by their ability to execute enterprise workloads under actual operational load—measured by real throughput, on-device performance, and verified partnerships.
          </p>
        </div>

        {/* Unboxed Architectural Metric Ledger (5 columns divided cleanly by vertical hairlines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-[var(--border-color)] border-b border-[var(--border-color)] pb-4">
          {defensibleProofs.map((proof) => {
            const Icon = proof.icon;
            return (
              <div
                key={proof.metric}
                className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-6 text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                    <span className="uppercase tracking-wider">{proof.label}</span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        proof.isSignal ? 'text-[var(--accent-orange-text)]' : 'text-[var(--accent-secondary)]'
                      }`}
                    />
                  </div>

                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text-primary)] tracking-tight tabular-nums leading-none">
                    {proof.metric}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                    {proof.context}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
