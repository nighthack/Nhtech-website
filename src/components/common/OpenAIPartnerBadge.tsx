import { ShieldCheck, Sparkles } from 'lucide-react';
import { brand } from '../../config/brand';

interface Props {
  variant?: 'compact' | 'hero' | 'card';
  className?: string;
}

export function OpenAIPartnerBadge({ variant = 'compact', className = '' }: Props) {
  if (variant === 'hero') {
    return (
      <div 
        id="openai-partner-hero-badge"
        className={`inline-flex items-center gap-2.5 text-xs text-[var(--text-secondary)] ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-ocean)]" />
        <span className="font-semibold text-[var(--text-primary)] tracking-wide">
          {brand.partnerships.openai.status}
        </span>
        <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
        <span className="text-[var(--text-secondary)] hidden sm:inline">
          {brand.partnerships.openai.specialization}
        </span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div 
        id="openai-partner-card"
        className={`p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all space-y-2 shadow-sm ${className}`}
      >
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--accent-orange-text)] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Partnership</span>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Agent Architecture
          </span>
        </div>
        <h3 className="text-lg font-display font-bold text-[var(--text-primary)] tracking-tight">
          {brand.partnerships.openai.status}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {brand.partnerships.openai.specialization}. Rigorous design of resilient agentic systems and production AI runtimes.
        </p>
      </div>
    );
  }

  return (
    <div 
      id="openai-partner-compact-badge"
      className={`inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] ${className}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-ocean)]" />
      <span className="font-medium text-[var(--text-primary)]">{brand.partnerships.openai.status}</span>
      <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
      <span>{brand.partnerships.openai.specialization}</span>
    </div>
  );
}
