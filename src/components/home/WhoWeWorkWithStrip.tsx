import { ArrowRight, ArrowUpRight, Factory, Building2, Landmark, ShoppingBag, Rocket } from 'lucide-react';
import { RoutePath } from '../../types';

interface WhoWeWorkWithStripProps {
  onNavigate: (path: RoutePath) => void;
}

export function WhoWeWorkWithStrip({ onNavigate }: WhoWeWorkWithStripProps) {
  const clientTypes = [
    {
      label: 'Manufacturing & Industrial Operations',
      detail: 'Defect inspection, edge inference & plant telemetry',
      icon: Factory,
      route: '/industries/manufacturing' as RoutePath
    },
    {
      label: 'Enterprise & Workflow Operations',
      detail: 'Legacy ERP modernization & document pipelines',
      icon: Building2,
      route: '/industries/enterprise' as RoutePath
    },
    {
      label: 'FinTech, Banking & BFSI',
      detail: 'Streaming anomaly detection & KYC compliance',
      icon: Landmark,
      route: '/industries/fintech' as RoutePath
    },
    {
      label: 'Retail & Digital Commerce',
      detail: 'SKU forecasting & automated procurement',
      icon: ShoppingBag,
      route: '/industries/retail' as RoutePath
    },
    {
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
      className="home-section py-12 sm:py-16 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]"
    >
      <div className="site-container relative z-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left max-w-2xl">
            <h2 className="text-lg sm:text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Built for engineering-heavy operations across regulated and physical-world industries.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/industries')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-orange-text)] hover:underline cursor-pointer self-start sm:self-end shrink-0"
          >
            <span>Explore all industries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Unboxed Architectural Sector Ledger */}
        <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px">
          {clientTypes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.route)}
                className="group relative p-5 bg-[var(--bg-surface-subtle)]/75 hover:bg-[var(--bg-surface)] text-left transition-colors cursor-pointer flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <Icon aria-hidden="true" className="size-4 text-[var(--accent-secondary)] group-hover:text-[var(--accent-orange-text)]" />
                  <ArrowUpRight aria-hidden="true" className="size-3.5 text-[var(--accent-orange-text)]" />
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-display font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-orange-text)] transition-colors">
                    {item.label}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
