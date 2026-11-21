import type { RoutePath } from '../../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
    <div className="site-container relative z-10">
      <div className="max-w-4xl">
        <h1 className="text-hero-display">
          {title}{titleAccent && <> <span className="text-[var(--accent-secondary)]">{titleAccent}</span></>}
        </h1>
        <p className="site-lead mt-4">{subtitle}</p>

        {(ctaText || (secondaryCtaText && secondaryCtaRoute)) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {ctaText && (ctaHref ? (
              <a href={ctaHref} className="site-button button-primary">
                {ctaText} <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            ) : (
              <button type="button" onClick={() => onNavigate(ctaRoute)} className="site-button button-primary">
                {ctaText} <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            ))}

            {secondaryCtaText && secondaryCtaRoute && (
              <button type="button" onClick={() => onNavigate(secondaryCtaRoute)} className="site-button button-secondary">
                {secondaryCtaText} <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {(tag || telemetryItems.length > 0) && (
        <div className="mt-7 flex flex-wrap items-start justify-between gap-x-8 gap-y-3 border-t border-[var(--border-color)] pt-4">
          {tag && <p className="text-xs font-medium text-[var(--text-muted)]">{tag}</p>}
          {telemetryItems.length > 0 && (
            <dl className="hidden flex-wrap gap-x-5 gap-y-2 text-xs sm:flex">
              {telemetryItems.map(({ label, value }) => (
                <div key={label} className="flex flex-wrap items-baseline gap-x-1.5">
                  <dt className="text-[var(--text-muted)]">{label}</dt>
                  <dd className="font-semibold text-[var(--text-secondary)]">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
