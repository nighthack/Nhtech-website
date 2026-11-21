import { useState } from 'react';
import { ArrowRight, Mail, FileSearch, ShieldCheck, Database, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { RoutePath, CaseStudy } from '../../types';
import { caseStudies } from '../../data/caseStudies';
import { SectionBackdrop } from './SectionBackdrop';
import { StageGroup } from './StageGroup';

interface FeaturedCaseStudySectionProps {
  onNavigate: (path: RoutePath) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export function FeaturedCaseStudySection({
  onNavigate,
  onSelectCaseStudy
}: FeaturedCaseStudySectionProps) {
  const featured = caseStudies.find((cs) => cs.slug === 'enterprise-workflow-intelligence') ?? caseStudies[0];
  const [activePipelineIdx, setActivePipelineIdx] = useState<number>(2);

  const pipelineSteps = [
    {
      step: '01',
      label: 'Inputs',
      title: 'Multi-Channel Intake',
      detail: 'Customer emails, PDF attachments & SFTP feeds normalized automatically on arrival.',
      payload: 'INGEST: Exchange Mail + PDF Valuation Attachment (14 pages) -> Queue #WYZ-408',
      icon: Mail
    },
    {
      step: '02',
      label: 'AI Processing',
      title: 'Parsing & Valuation Rules',
      detail: 'Spatial citation grounding paired with deterministic client pricing formulas.',
      payload: 'EXTRACT: Net Asset Sum = $14.28M (Confidence: 0.992 | Anchor: Page 4, Table B)',
      icon: FileSearch
    },
    {
      step: '03',
      label: 'Human Review',
      title: 'Operator Exception Gate',
      detail: 'Inline PDF diffing pauses low-confidence or threshold variance items for sign-off.',
      payload: 'GATE: Variance +1.8% flagged -> Specialist verified citation & approved in 14s',
      icon: ShieldCheck
    },
    {
      step: '04',
      label: 'System Action',
      title: 'Core ERP & Audit Write',
      detail: 'Verified transaction commits to SQL/SaaS ledgers alongside an immutable audit trail.',
      payload: 'COMMIT: ERP Ledger #VL-9921 Updated | Audit Hash: 0x8a4e...c91f',
      icon: Database
    }
  ];

  const activeStep = pipelineSteps[activePipelineIdx];

  return (
    <section
      id="featured-case-study"
      className="home-section py-16 sm:py-24 bg-[var(--bg-base)] border-b border-[var(--border-color)]"
    >
      <SectionBackdrop mode="valuation" activeStage={activePipelineIdx} />
      <div className="site-container relative z-10 space-y-12">
        <div className="max-w-3xl space-y-5 text-left">
          <h2 className="text-section-display">{featured.title}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{featured.clientAnonymousName}</p>

          <div className="pt-5 mt-1 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-7 items-start">
            <div className="sm:pr-7 sm:border-r sm:border-[var(--border-color)] shrink-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--accent-orange-text)] tracking-tight tabular-nums leading-tight">
                {featured.scaleEvidence.primaryMetric}
              </div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Production Outcome
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {featured.scaleEvidence.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => onSelectCaseStudy(featured)}
              className="site-button button-secondary"
            >
              <span>Inspect full case study</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-orange-text)]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-secondary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer"
            >
              <span>View all 6 verified deployments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive 4-Stage Signal Trace Rail (No nested card-grid) */}
        <div className="space-y-5 text-left">
          <div className="relative">
            {/* Connecting track line on desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[var(--border-color)]"
            />
            <StageGroup label="Valuation pipeline stages" className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activePipelineIdx === idx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActivePipelineIdx(idx)}
                    aria-pressed={isActive}
                    aria-controls="valuation-trace"
                    data-suggested={idx === (activePipelineIdx + 1) % pipelineSteps.length}
                    className="stage-control group space-y-2 rounded-xl border border-[var(--border-color)] p-3 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all relative z-10 ${
                          isActive
                            ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-primary-text)]'
                            : 'bg-[var(--bg-base)] border-[var(--border-hover)] text-[var(--accent-secondary)] group-hover:border-[#FF5A1F]'
                        }`}
                      >
                        <Icon aria-hidden="true" className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
                          isActive ? 'text-[var(--accent-orange-text)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {step.step} · {step.label}
                      </span>
                    </div>

                    <div className="pl-11 space-y-1">
                      <div className="text-sm font-display font-bold text-[var(--text-primary)]">
                        {step.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </StageGroup>
          </div>

          {/* Live Telemetry Readout Bar */}
          <div
            id="valuation-trace"
            role="status"
            className="flex flex-wrap items-baseline gap-x-4 gap-y-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-xs"
          >
            <span className="font-semibold text-[var(--accent-orange-text)]">Sample trace</span>
            <code className="min-w-0 wrap-anywhere text-[var(--text-secondary)]">{activeStep.payload}</code>
          </div>
        </div>

        {/* Unboxed 3-Column Typographic Spread: Problem / Solution / Outcome */}
        <div className="border-t border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
          {/* 01 Problem */}
          <div className="py-8 lg:pr-8 space-y-3 text-left">
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
              Fragmented intake &amp; manual spreadsheet re-entry
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {featured.context}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
              {featured.difficulty}
            </p>
          </div>

          {/* 02 Solution */}
          <div className="py-8 lg:px-8 space-y-3 text-left">
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
              Unified orchestration with human sign-off gates
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {featured.systemDesigned}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
              {featured.humanCheckpoints}
            </p>
          </div>

          {/* 03 Outcome */}
          <div className="py-8 lg:pl-8 space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                Verified operational acceleration with immutable traceability
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-1" />
                <span>{featured.operationalImpact}</span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-[var(--text-muted)]">
              {featured.technologies.slice(0, 5).map((tech, tIdx) => (
                <span key={tech} className="inline-flex items-center gap-2">
                  {tIdx > 0 && <span aria-hidden="true" className="text-[var(--border-hover)]">·</span>}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
