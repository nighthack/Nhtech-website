import { RoutePath } from '../../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MaskedHeading, ScrollText } from './ScrollMotion';

interface SpatialPageHeaderProps {
  tag?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  ctaText?: string;
  ctaRoute?: RoutePath;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaRoute?: RoutePath;
  onNavigate: (path: RoutePath) => void;
  telemetryItems?: { label: string; value: string; color?: string }[];
}

export function SpatialPageHeader({
  tag,
  title,
  titleAccent,
  subtitle,
  ctaText = 'Initiate Technical Assessment',
  ctaRoute = '/contact',
  ctaHref,
  secondaryCtaText,
  secondaryCtaRoute,
  onNavigate,
  telemetryItems = [],
}: SpatialPageHeaderProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Top Kicker & Metadata Ribbon (rendered only when provided) */}
      {(tag || telemetryItems.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-color)] text-xs"
        >
          {tag && (
            <span className="font-medium tracking-wide text-[var(--accent-orange-text)]">
              {tag}
            </span>
          )}

          {telemetryItems.length > 0 && (
            <div className="hidden sm:flex items-center gap-4 md:gap-5 text-xs flex-wrap font-mono">
              {telemetryItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[var(--text-muted)]">{item.label}:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Hero Heading Cluster */}
      <div className="max-w-4xl space-y-4">
        <MaskedHeading as="h1" className="text-hero-display text-[var(--text-primary)] leading-[1.15] text-balance">
          {title}{' '}
          {titleAccent && (
            <span className="font-bold text-[var(--accent-secondary)] inline">
              {titleAccent}
            </span>
          )}
        </MaskedHeading>

        <ScrollText className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-[1.65] max-w-2xl" delay={0.1}>
          {subtitle}
        </ScrollText>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          {ctaText && (
            ctaHref ? (
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] active:bg-[#E95013] text-[#061421] font-bold text-xs tracking-tight transition-all cursor-pointer shadow-md no-underline whitespace-nowrap"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-current" />
              </a>
            ) : (
              <button
                onClick={() => onNavigate(ctaRoute)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] active:bg-[#E95013] text-[#061421] font-bold text-xs tracking-tight transition-all cursor-pointer shadow-md whitespace-nowrap"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-current" />
              </button>
            )
          )}

          {secondaryCtaText && secondaryCtaRoute && (
            <button
              onClick={() => onNavigate(secondaryCtaRoute)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--text-primary)] font-medium text-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{secondaryCtaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
