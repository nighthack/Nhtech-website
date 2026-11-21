import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, FileSearch, ShieldCheck, Database, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { RoutePath, CaseStudy } from '../../types';
import { caseStudies } from '../../data/caseStudies';
import { ValuationPipelineDiagram } from '../visuals/WorkflowVisuals';

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
      className="py-12 sm:py-16 bg-[var(--bg-base)] border-b border-[var(--border-color)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Editorial Asymmetric Showcase Header + Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <h2 className="text-section-display text-[var(--text-primary)]">
              {featured.title}
            </h2>
            <p className="text-sm font-medium text-[var(--text-muted)]">
              Featured case study · {featured.clientAnonymousName}
            </p>

            <div className="pt-5 mt-1 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-7 items-start">
              <div className="sm:pr-7 sm:border-r sm:border-[var(--border-color)] shrink-0">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--accent-text)] tracking-tight tabular-nums leading-tight">
                  {featured.scaleEvidence.primaryMetric}
                </div>
                <div className="text-data text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  Production Outcome
                </div>
              </div>

              <p className="text-body text-[var(--text-secondary)] max-w-lg">
                {featured.scaleEvidence.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onSelectCaseStudy(featured)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-hover)] text-xs font-mono font-bold text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <span>Inspect full case study</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-secondary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer"
              >
                <span>View all 6 verified deployments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Straight-Through Valuation Pipeline */}
          <div className="lg:col-span-5 relative">
            <ValuationPipelineDiagram
              activeStageIndex={activePipelineIdx}
              onSelectStage={setActivePipelineIdx}
            />
          </div>
        </div>

        {/* Unboxed 3-Column Typographic Spread: Problem / Solution / Outcome */}
        <div className="border-t border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
          {/* 01 Problem */}
          <div className="py-8 lg:pr-8 space-y-3 text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] font-bold">
              01 · Problem
            </div>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
              Fragmented intake &amp; manual spreadsheet re-entry
            </h3>
            <p className="text-body text-[var(--text-secondary)]">
              {featured.context}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
              {featured.difficulty}
            </p>
          </div>

          {/* 02 Solution */}
          <div className="py-8 lg:px-8 space-y-3 text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)] font-bold">
              02 · Solution
            </div>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
              Unified orchestration with human sign-off gates
            </h3>
            <p className="text-body text-[var(--text-secondary)]">
              {featured.systemDesigned}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2">
              {featured.humanCheckpoints}
            </p>
          </div>

          {/* 03 Outcome */}
          <div className="py-8 lg:pl-8 space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] font-bold">
                03 · Outcome
              </div>
              <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                Verified operational acceleration with immutable traceability
              </h3>
              <p className="text-body text-[var(--text-secondary)] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-1" />
                <span>{featured.operationalImpact}</span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-x-3 gap-y-1 text-data text-[var(--text-muted)]">
              {featured.technologies.slice(0, 5).map((tech, tIdx) => (
                <span key={tech} className="inline-flex items-center gap-2">
                  {tIdx > 0 && <span aria-hidden="true" className="text-[var(--border-hover)]">·</span>}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive 4-Stage Signal Trace Rail (No nested card-grid) */}
        <div className="space-y-5 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="uppercase tracking-[0.14em] font-semibold text-[var(--text-secondary)]">
              Interactive Production Signal Flow · Click any stage
            </span>
            <span className="text-[11px] text-[var(--accent-secondary)]">
              Deterministic execution &amp; human governance
            </span>
          </div>

          <div className="relative">
            {/* Connecting track line on desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[var(--border-color)]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activePipelineIdx === idx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActivePipelineIdx(idx)}
                    className="text-left group cursor-pointer space-y-2.5 pt-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all relative z-10 ${
                          isActive
                            ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-primary-text)] shadow-md'
                            : 'bg-[var(--bg-base)] border-[var(--border-hover)] text-[var(--accent-secondary)] group-hover:border-[var(--accent-primary)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-data uppercase tracking-wider font-bold ${
                          isActive ? 'text-[var(--accent-text)]' : 'text-[var(--text-muted)]'
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
            </div>
          </div>

          {/* Live Telemetry Readout Bar */}
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 py-3 rounded-xl bg-[#061421] border border-[#173D5B] text-[#F5F8FA] font-mono text-xs flex flex-wrap items-center justify-between gap-3"
          >
            <span className="text-[var(--accent-on-dark)] font-semibold">
              TRACE [{activeStep.label.toUpperCase()}]
            </span>
            <span className="text-[#D1E0E6] overflow-x-auto">{activeStep.payload}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
