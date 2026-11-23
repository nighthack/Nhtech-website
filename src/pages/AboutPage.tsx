import { OpenAIPartnerBadge } from '../components/common/OpenAIPartnerBadge';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { brand } from '../config/brand';
import type { RoutePath } from '../types';

export function AboutPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const principles = [
    ['Work alongside your team', 'Senior engineers work directly with domain experts, from understanding the workflow to deploying the software.'],
    ['Build the whole system', 'The work includes data pipelines, models, interfaces, integrations, tests and the production runtime.'],
    ['Keep people in control', 'Review screens, access controls and audit trails help operators check the decisions that matter.'],
    ['Hand over what we build', 'You own the project code, model weights, tests and deployment scripts. We support your team in taking over.'],
  ];
  return <div id="about-chapter">
    <section className="border-b border-[var(--border-color)] pb-14 pt-28 sm:pt-32"><SpatialPageHeader title="About NHTech" subtitle="We build applied AI and product systems alongside customer teams, turning difficult operational problems into working software." ctaText="Talk to the founders" secondaryCtaText="See our work" secondaryCtaRoute="/work" onNavigate={onNavigate} /></section>
    <section className="py-14 sm:py-20"><div className="site-container space-y-8"><h2 className="text-section-display">The company</h2><dl className="grid gap-6 border-y border-[var(--border-color)] py-7 md:grid-cols-3">
      <div className="space-y-2"><dt className="text-sm text-[var(--text-muted)]">Public brand</dt><dd className="text-card-display">{brand.displayName}</dd></div>
      <div className="space-y-2"><dt className="text-sm text-[var(--text-muted)]">Registered company</dt><dd className="text-lg font-semibold">{brand.legalName}</dd></div>
      <div className="space-y-2"><dt className="text-sm text-[var(--text-muted)]">Based in</dt><dd className="text-lg font-semibold">Bengaluru, India</dd></div>
    </dl><p className="text-[var(--text-secondary)]">{brand.regionLine}</p></div></section>
    <section className="bg-[var(--bg-surface-subtle)] py-14 sm:py-20"><div className="site-container space-y-8"><h2 className="text-section-display">How we work</h2><div className="grid gap-x-12 gap-y-8 md:grid-cols-2">{principles.map(([title, body]) => <div key={title} className="space-y-3 border-t border-[var(--border-color)] pt-5"><h3 className="text-card-display">{title}</h3><p className="max-w-[65ch] leading-relaxed text-[var(--text-secondary)]">{body}</p></div>)}</div></div></section>
    {(brand.partnerships.openai.confirmed || brand.partnerships.researchRoots.confirmed) && <section className="site-container space-y-8 py-14"><h2 className="text-section-display">Background and partnerships</h2><OpenAIPartnerBadge variant="card" />{brand.partnerships.researchRoots.confirmed && <p>{brand.partnerships.researchRoots.description}</p>}</section>}
  </div>;
}
