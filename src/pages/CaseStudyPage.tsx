import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CaseStudy, RoutePath } from '../types';

export function CaseStudyPage({ study, onNavigate }: { study: CaseStudy; onNavigate: (path: RoutePath) => void }) {
  return <article className="pb-20 pt-28 sm:pt-32">
    <div className="site-container space-y-10">
      <nav aria-label="Breadcrumb"><a href="/work" className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--accent-orange-text)] hover:underline" onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate('/work'); }}><ArrowLeft aria-hidden="true" className="size-4" /> Our work</a></nav>
      <header className="max-w-4xl space-y-5"><p className="text-sm text-[var(--text-muted)]">{study.clientName || study.clientAnonymousName}</p><h1 className="text-hero-display">{study.title}</h1><p className="site-lead">{study.context}</p></header>
      <div className="grid gap-10 border-y border-[var(--border-color)] py-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div className="space-y-10">
          <section className="max-w-[70ch] space-y-4"><h2 className="text-card-display">The problem</h2><p className="leading-relaxed text-[var(--text-secondary)]">{study.difficulty}</p></section>
          <section className="max-w-[70ch] space-y-4"><h2 className="text-card-display">What we built</h2><p className="leading-relaxed text-[var(--text-secondary)]">{study.systemDesigned}</p><ul className="space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">{study.architecture.map((part) => <li key={part} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent-orange-text)]" />{part}</li>)}</ul></section>
          <section className="max-w-[70ch] space-y-4"><h2 className="text-card-display">Human review</h2><p className="leading-relaxed text-[var(--text-secondary)]">{study.humanCheckpoints}</p></section>
          <section className="max-w-[70ch] space-y-4"><h2 className="text-card-display">Result</h2><p className="leading-relaxed text-[var(--text-secondary)]">{study.operationalImpact}</p></section>
        </div>
        <aside className="space-y-5"><h2 className="text-card-display">Technology</h2><ul className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">{study.technologies.map((name) => <li key={name} className="rounded-lg border border-[var(--border-color)] px-3 py-2">{name}</li>)}</ul><p className="text-sm leading-relaxed text-[var(--text-muted)]">Client details are kept private. This case study describes the system and its operational use.</p></aside>
      </div>
      <a href="/contact" className="site-button button-primary" onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate('/contact'); }}>Talk about a similar project <ArrowRight aria-hidden="true" className="size-4" /></a>
    </div>
  </article>;
}
