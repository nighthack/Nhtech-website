import { ArrowRight, ArrowUpRight, Factory, Building2, Landmark, ShoppingBag, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { RoutePath } from '../../types';

interface WhoWeWorkWithStripProps {
  onNavigate: (path: RoutePath) => void;
}

export function WhoWeWorkWithStrip({ onNavigate }: WhoWeWorkWithStripProps) {
  const clientTypes = [
    {
      index: '01',
      label: 'Manufacturing & Industrial Operations',
      detail: 'Defect inspection, edge inference & plant telemetry',
      icon: Factory,
      route: '/industries/manufacturing' as RoutePath
    },
    {
      index: '02',
      label: 'Enterprise & Workflow Operations',
      detail: 'Legacy ERP modernization & document pipelines',
      icon: Building2,
      route: '/industries/enterprise' as RoutePath
    },
    {
      index: '03',
      label: 'FinTech, Banking & BFSI',
      detail: 'Streaming anomaly detection & KYC compliance',
      icon: Landmark,
      route: '/industries/fintech' as RoutePath
    },
    {
      index: '04',
      label: 'Retail & Digital Commerce',
      detail: 'SKU forecasting & automated procurement',
      icon: ShoppingBag,
      route: '/industries/retail' as RoutePath
    },
    {
      index: '05',
      label: 'Technically Complex Startups',
      detail: 'Rapid prototype sprints & AI-native builds',
      icon: Rocket,
      route: '/industries/startups' as RoutePath
    }
  ];

  return (
    <section
      id="who-we-work-with"
      aria-label="Who we work with"
      className="py-12 sm:py-16 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent-secondary)] font-semibold">
              Who we work with
            </p>
            <h2 className="text-lg sm:text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Built for engineering-heavy operations across regulated and physical-world industries.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/industries')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-text)] hover:underline cursor-pointer self-start sm:self-end shrink-0"
          >
            <span>Explore all industries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Unboxed Architectural Sector Ledger */}
        <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px">
          {clientTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                onClick={() => onNavigate(item.route)}
                className="group relative p-5 bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)] text-left transition-colors cursor-pointer flex flex-col justify-between gap-3"
              >
                {/* cobalt hairline sweep on hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[2px] w-0 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="tabular-nums font-semibold group-hover:text-[var(--accent-text)] transition-colors">
                    {item.index}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[var(--accent-secondary)] group-hover:text-[var(--accent-text)] transition-colors" />
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent-text)]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-display font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-text)] transition-colors">
                    {item.label}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
