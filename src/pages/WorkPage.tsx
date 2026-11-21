import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { RoutePath, CaseStudy } from '../types';
import { caseStudies } from '../data/caseStudies';
import { engineeringTracks } from '../data/tracks';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { X, Terminal, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

interface WorkPageProps {
  onNavigate: (path: RoutePath) => void;
  selectedCaseStudy?: CaseStudy | null;
  onSelectCaseStudy: (caseStudy: CaseStudy | null) => void;
}

export function WorkPage({ onNavigate, selectedCaseStudy, onSelectCaseStudy }: WorkPageProps) {
  const activeModalStudy = selectedCaseStudy;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filterTrack, setFilterTrack] = useState<string>('all');

  const publicCaseStudies = caseStudies.filter(cs => cs.approvedForPublicWebsite);

  const filteredCaseStudies = filterTrack === 'all'
    ? publicCaseStudies
    : publicCaseStudies.filter(cs => cs.track === filterTrack);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!activeModalStudy || !dialog) return;

    const previousFocus = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      } else {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    };
  }, [activeModalStudy]);

  return (
    <div id="work-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      
      {/* 1. Spatial Page Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Forward Deployed Engineering Dossiers"
          title="Difficult problems converted into"
          titleAccent="production technology."
          subtitle="Forward-deployed engineers working alongside customer teams from problem definition to deployment across agentic AI, on-device computer vision, and complex business architectures."
          ctaText="Initiate Engineering Pod"
          ctaRoute="/contact"
          secondaryCtaText="Explore FDE Methodology"
          secondaryCtaRoute="/fde"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'TRACKS', value: '3 CORE DOMAINS', color: 'var(--accent-orange-text)' },
            { label: 'CLIENT IP', value: '100% OWNED BY CLIENT', color: 'var(--text-primary)' },
            { label: 'DELIVERY', value: 'VPC / ON-PREM / EDGE', color: 'var(--accent-secondary)' },
          ]}
        />
      </section>

      {/* 2. Track Filter & Engineering Dossiers */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-color)]"
          >
            <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
              Organized by Engineering Track
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={filterTrack === 'all'}
                onClick={() => setFilterTrack('all')}
                className={`site-button ${
                  filterTrack === 'all'
                    ? 'button-primary'
                    : 'button-secondary'
                }`}
              >
                All Systems ({publicCaseStudies.length})
              </button>
              {engineeringTracks.map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  aria-pressed={filterTrack === tr.id}
                  onClick={() => setFilterTrack(tr.id)}
                  className={`site-button ${
                    filterTrack === tr.id
                      ? 'button-primary'
                      : 'button-secondary'
                  }`}
                >
                  {tr.shortTitle}
                </button>
              ))}
            </div>
          </motion.div>

          <p role="status" className="sr-only">{filteredCaseStudies.length} case studies</p>
          <div className="space-y-10">
            {filteredCaseStudies.map((study, idx) => {
              const trackMeta = engineeringTracks.find(t => t.id === study.track);
              return (
                <motion.div
                  key={study.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-4 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-surface)] relative space-y-6"
                >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] font-bold">
                    SYSTEM DOSSIER 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded text-[var(--accent-orange-text)] bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                    {trackMeta?.badge || 'ENGINEERING TRACK'}
                  </span>
                  <span className="text-base sm:text-xl font-display font-bold text-[var(--text-primary)]">
                    {study.clientName || study.clientAnonymousName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[var(--status-success-text)] font-bold">
                  <span>✓ PRODUCTION SYSTEM DEPLOYED</span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Narrative (7 cols) */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                    {study.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                    {study.context}
                  </p>

                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1.5">
                    <div className="text-xs font-mono text-[var(--accent-secondary)] uppercase font-bold">
                      THE BUSINESS / TECHNICAL PROBLEM
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                      {study.difficulty}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] space-y-1.5">
                    <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold">
                      PRODUCTION SYSTEM ARCHITECTED &amp; DEPLOYED
                    </div>
                    <div className="text-xs text-[var(--text-primary)] leading-relaxed font-normal">
                      {study.systemDesigned}
                    </div>
                  </div>

                  {/* Scale Evidence */}
                  {study.scaleEvidence && (
                    <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-2xl font-display font-bold text-[var(--text-primary)] tabular-nums">
                          {study.scaleEvidence.primaryMetric}
                        </div>
                        <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                          {study.scaleEvidence.metricLabel}
                        </div>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] font-normal max-w-xs text-right hidden sm:block">
                        {study.scaleEvidence.description}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => onSelectCaseStudy(study)}
                    className="site-button button-secondary"
                  >
                    Inspect full case study <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>

                {/* Abstract Architectural Diagram (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-4">
                  <div className="text-xs font-mono text-[var(--text-secondary)] flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <span className="uppercase tracking-wider font-semibold">System Topology</span>
                    <span className="text-[var(--status-success-text)] font-bold">ACTIVE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                    {study.architecture.slice(0, 3).map((layer, lIdx) => (
                      <div key={lIdx} className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-start gap-2.5">
                        <span className="text-[var(--accent-orange-text)] font-bold tabular-nums">0{lIdx + 1}</span>
                        <span className="text-[var(--text-primary)] font-medium font-sans leading-relaxed">{layer}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>Engineered with 100% Client Codebase Ownership</span>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
          </div>
        </div>
      </section>

      {/* Case Study Full Architecture Modal */}
      {activeModalStudy && (
        <dialog
          ref={dialogRef}
          aria-labelledby="case-study-title"
          onCancel={(event) => {
            event.preventDefault();
            onSelectCaseStudy(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onSelectCaseStudy(null);
          }}
          className="case-study-dialog fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
        >
          <div className="space-y-6 p-4 text-left sm:p-8">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                  System Dossier · {activeModalStudy.clientName || activeModalStudy.clientAnonymousName}
                </span>
                <h2 id="case-study-title" className="text-section-display mt-1">
                  {activeModalStudy.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close case study"
                onClick={() => onSelectCaseStudy(null)}
                className="site-button button-secondary size-11 shrink-0 p-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--text-primary)] uppercase font-bold">Operational Context</div>
                <p>{activeModalStudy.context}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--accent-secondary)] uppercase font-bold">Technical Difficulty</div>
                <p>{activeModalStudy.difficulty}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold">Architecture Pipeline</div>
                <div className="space-y-1.5 font-mono">
                  {activeModalStudy.architecture.map((layer, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                      <span className="text-[var(--accent-orange-text)] font-bold">•</span>
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalStudy.scaleEvidence && (
                <div className="p-4 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="text-xl font-display font-bold text-[var(--text-primary)] tabular-nums">{activeModalStudy.scaleEvidence.primaryMetric}</div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase">{activeModalStudy.scaleEvidence.metricLabel}</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">{activeModalStudy.scaleEvidence.description}</div>
                </div>
              )}
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-color)]">
              <span className="text-xs font-mono text-[var(--text-muted)]">
                IP STATUS: 100% OWNED BY CLIENT
              </span>
              <button
                onClick={() => {
                  onSelectCaseStudy(null);
                  onNavigate('/contact');
                }}
                className="site-button button-primary"
              >
                Discuss Similar Architecture Deployment
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 4. Bottom CTA */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-widest block">
            Forward Deployed Pod Dispatch
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to convert your complex problem into a production system?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            Our forward-deployed engineers embed alongside your team to define, architect, and ship high-reliability software.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

