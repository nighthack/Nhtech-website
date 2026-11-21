import { ArrowRight, ShieldCheck, Lock, Terminal, ArrowUpRight } from 'lucide-react';
import { RoutePath } from '../../types';
import { RouteLink } from '../common/RouteLink';

interface ClimaxCTAProps {
  onNavigate: (path: RoutePath) => void;
}

export function ClimaxCTA({ onNavigate }: ClimaxCTAProps) {
  return (
    <section
      id="climax-cta"
      className="py-24 sm:py-32 bg-ocean-depth text-[var(--text-primary)] relative overflow-hidden border-b border-[var(--border-color)]"
    >
      {/* Subtle Concentric Orbital Arcs */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
      >
        <circle cx="600" cy="640" r="360" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.8" />
        <circle cx="600" cy="640" r="500" fill="none" stroke="var(--accent-primary)" strokeWidth="0.7" strokeDasharray="4 10" />
        <circle cx="600" cy="640" r="640" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.6" />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Strong Business-Problem Headline */}
        <div className="space-y-4">
          <h2 className="text-section-display">
            Have a workflow that is slow, fragmented or{' '}
            <span className="text-[var(--accent-secondary)]">
              technically blocked?
            </span>
          </h2>
          <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto">
            Bring us the operational problem. We will engineer the production system alongside your team.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <RouteLink href="/contact" onNavigate={onNavigate} className="ui-action hero-primary w-full sm:w-auto"
          >
            <span>Discuss a business workflow</span>
            <ArrowRight className="w-4 h-4 text-current" />
          </RouteLink>

          <RouteLink href="/work" onNavigate={onNavigate} className="ui-action hero-secondary w-full sm:w-auto"
          >
            <span>Explore selected work</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--accent-secondary)]" />
          </RouteLink>
        </div>

        {/* Guarantees */}
        <div
          className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)]"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-text)]" />
            <span>Mutual NDA from First Call</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>100% Client Code &amp; Model Weights Retention</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>Senior Systems Engineers Direct</span>
          </div>
        </div>
      </div>
    </section>
  );
}
