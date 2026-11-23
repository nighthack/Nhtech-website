import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { caseStudies } from '../data/caseStudies';
import { engineeringTracks } from '../data/tracks';
import type { RoutePath } from '../types';

export function WorkPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const [filter, setFilter] = useState('all');
  const studies = caseStudies.filter((study) => study.approvedForPublicWebsite && (filter === 'all' || study.track === filter));
  return <div id="work-chapter">
    <section className="border-b border-[var(--border-color)] pb-14 pt-28 sm:pb-16 sm:pt-32">
      <SpatialPageHeader title="Our work" subtitle="Systems built around real operational problems, from document intake and financial review to vision on the factory floor." ctaText="Talk to us" ctaRoute="/contact" secondaryCtaText="How we work" secondaryCtaRoute="/fde" onNavigate={onNavigate} />
    </section>
    <section className="bg-[var(--bg-surface-subtle)] py-14 sm:py-20">
      <div className="site-container space-y-10">
        <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2">
          {[{ id: 'all', shortTitle: 'All work' }, ...engineeringTracks].map((track) => <button key={track.id} type="button" aria-pressed={filter === track.id} onClick={() => setFilter(track.id)} className={`site-button ${filter === track.id ? 'button-primary' : 'button-secondary'}`}>{track.shortTitle}</button>)}
        </div>
        <p role="status" className="sr-only">{studies.length} case studies</p>
        <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
          {studies.map((study) => <article key={study.slug} className="grid gap-6 py-8 md:grid-cols-[1fr_1.3fr] md:gap-12">
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-muted)]">{study.clientAnonymousName}</p>
              <h2 className="text-card-display">{study.title}</h2>
              <a href={`/work/${study.slug}`} className="site-button button-secondary" onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate(`/work/${study.slug}`); }}>Read the case study <ArrowRight aria-hidden="true" className="size-4" /></a>
            </div>
            <dl className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              <div><dt className="font-semibold text-[var(--text-primary)]">Problem</dt><dd>{study.difficulty}</dd></div>
              <div><dt className="font-semibold text-[var(--text-primary)]">What we built</dt><dd>{study.systemDesigned}</dd></div>
              <div><dt className="font-semibold text-[var(--text-primary)]">Result</dt><dd>{study.operationalImpact}</dd></div>
            </dl>
          </article>)}
        </div>
        <a href="/contact" className="site-button button-primary" onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate('/contact'); }}>Talk to us <ArrowRight aria-hidden="true" className="size-4" /></a>
      </div>
    </section>
  </div>;
}
