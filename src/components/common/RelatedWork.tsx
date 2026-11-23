import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import type { RoutePath } from '../../types';

export function RelatedWork({ slugs, onNavigate, title = 'Related work' }: { slugs: string[]; onNavigate: (path: RoutePath) => void; title?: string }) {
  const studies = caseStudies.filter((study) => study.approvedForPublicWebsite && slugs.includes(study.slug));
  if (!studies.length) return null;
  return <section className="home-section border-y border-[var(--border-color)] py-14 sm:py-20">
    <div className="site-container space-y-8">
      <h2 className="text-section-display">{title}</h2>
      <div className={`grid gap-8 ${studies.length > 1 ? 'md:grid-cols-3' : 'max-w-3xl'}`}>
        {studies.map((study) => <article key={study.slug} className="space-y-3 border-t border-[var(--border-color)] pt-5">
          <p className="text-xs text-[var(--text-muted)]">{study.clientAnonymousName}</p>
          <h3 className="text-card-display">{study.title}</h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{study.operationalImpact}</p>
          <a href={`/work/${study.slug}`} onClick={(event) => {
            if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); onNavigate(`/work/${study.slug}`);
          }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent-orange-text)] hover:underline">Read the case study <ArrowRight aria-hidden="true" className="size-4" /></a>
        </article>)}
      </div>
    </div>
  </section>;
}
