import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { RoutePath } from '../../types';
import { RouteLink } from '../common/RouteLink';
import { HeroSignalField } from './HeroSignalField';

interface HeroMediaStageProps {
  onNavigate: (path: RoutePath) => void;
}

export function HeroMediaStage({ onNavigate }: HeroMediaStageProps) {
  return (
    <section id="hero-section" className="home-hero relative isolate overflow-hidden border-b border-[var(--border-color)]">
      <HeroSignalField />
      <div className="home-hero-inner relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-hero-display home-hero-title">
          We turn complex business operations into production-ready AI systems.
        </h1>
        <p className="text-body home-hero-description text-[var(--text-secondary)]">
          Senior engineering teams embedded alongside your domain experts—building deterministic workflow automation, edge computer vision, and enterprise AI platforms deployed inside infrastructure you control.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <RouteLink href="/contact" onNavigate={onNavigate} className="ui-action hero-primary">
            Discuss a business workflow
            <ArrowRight size={16} aria-hidden="true" />
          </RouteLink>
          <RouteLink href="/work" onNavigate={onNavigate} className="ui-action hero-secondary">
            Explore selected work
            <ArrowUpRight size={16} aria-hidden="true" />
          </RouteLink>
        </div>
      </div>
    </section>
  );
}
