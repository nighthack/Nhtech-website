import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Lock, Terminal, ArrowUpRight } from 'lucide-react';
import { RoutePath } from '../../types';
import { MaskedHeading, ScrollText } from '../common/ScrollMotion';

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
        <circle cx="600" cy="640" r="500" fill="none" stroke="#FF5A1F" strokeWidth="0.7" strokeDasharray="4 10" />
        <circle cx="600" cy="640" r="640" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.6" />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Subtle Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--accent-orange-text)] font-semibold"
        >
          Forward Deployed Engineering Initiative
        </motion.p>

        {/* Strong Business-Problem Headline */}
        <div className="space-y-4">
          <MaskedHeading as="h2" className="text-hero-display text-[var(--text-primary)] leading-[1.15] text-balance">
            Have a workflow that is slow, fragmented or{' '}
            <span className="text-[var(--accent-secondary)]">
              technically blocked?
            </span>
          </MaskedHeading>
          <ScrollText className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-xl mx-auto leading-relaxed" delay={0.15}>
            Bring us the operational problem. We will engineer the production system alongside your team.
          </ScrollText>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="button-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
          >
            <span>Discuss a business workflow</span>
            <ArrowRight className="w-4 h-4 text-[#061421]" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-[var(--bg-surface)]/80 hover:bg-[var(--bg-surface)] border border-[var(--border-hover)] text-[var(--text-primary)] text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore selected work</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--accent-secondary)]" />
          </button>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-orange-text)]" />
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
        </motion.div>
      </div>
    </section>
  );
}
