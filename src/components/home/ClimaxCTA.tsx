import { ArrowRight, ArrowUpRight, Lock, ShieldCheck, Terminal } from 'lucide-react';
import { RoutePath } from '../../types';
import { SectionBackdrop } from './SectionBackdrop';

interface ClimaxCTAProps {
  onNavigate: (path: RoutePath) => void;
}

export function ClimaxCTA({ onNavigate }: ClimaxCTAProps) {
  return (
    <section
      id="climax-cta"
      className="home-section home-section--center py-20 sm:py-28 bg-ocean-depth text-[var(--text-primary)] relative overflow-hidden border-b border-[var(--border-color)]"
    >
      <SectionBackdrop mode="convergence" />
      <div className="site-container relative z-10 max-w-4xl space-y-8 text-center">
        {/* Strong Business-Problem Headline */}
        <div className="space-y-4">
          <h2 className="text-hero-display text-[var(--text-primary)] leading-[1.15] text-balance">
            Have a workflow that is slow, fragmented or{' '}
            <span className="text-[var(--accent-secondary)]">
              technically blocked?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-xl mx-auto leading-relaxed">
            Bring us the operational problem. We will engineer the production system alongside your team.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="site-button button-primary w-full sm:w-auto"
          >
            <span>Talk to us</span>
            <ArrowRight className="w-4 h-4 text-[#061421]" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="site-button button-secondary w-full sm:w-auto"
          >
            <span>See our work</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--accent-secondary)]" />
          </button>
        </div>

        {/* Guarantees */}
        <div
          className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-orange-text)]" />
            <span>Mutual NDA from the first call</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>You own the code</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>Talk directly to senior engineers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
