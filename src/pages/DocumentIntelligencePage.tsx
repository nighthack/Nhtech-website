import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { RelatedWork } from '../components/common/RelatedWork';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { StageGroup } from '../components/home/StageGroup';
import { RoutePath } from '../types';

interface DocumentIntelligencePageProps {
  onNavigate: (path: RoutePath) => void;
}

export function DocumentIntelligencePage({ onNavigate }: DocumentIntelligencePageProps) {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  const pipelineSteps = [
    {
      num: '01',
      title: 'Read the layout',
      desc: 'Raw multi-hundred page PDFs, scans, and spreadsheets are parsed while retaining table grid coordinates, hierarchical headings, footnotes, and stamps.',
      metric: 'Keeps the position of every table and line',
      accent: 'var(--accent-orange-text)'
    },
    {
      num: '02',
      title: 'Index for search',
      desc: 'High-dimensional embeddings generated with Qdrant vector collections combined with BM25 keyword matching and domain entity graphs to prevent retrieval misses.',
      metric: 'Combines keyword and semantic search',
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Answer with a private model',
      desc: 'Specialized language models (Llama, Mistral) fine-tuned on custom legal, financial, or clinical taxonomy running inside your private cloud or on-premise servers.',
      metric: 'Runs on private infrastructure',
      accent: 'var(--accent-ocean)'
    },
    {
      num: '04',
      title: 'Check every citation',
      desc: 'Every extracted attribute, compliance summary, or calculated entity provides verifiable bounding-box citations linked back to the exact source paragraph.',
      metric: 'Verifiable paragraph citation trail',
      accent: 'var(--accent-orange-text)'
    }
  ];

  return (
    <div id="document-intelligence-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Ambient Document & Entity Canvas */}
      <WorldCanvas mode="matrix" opacity={0.22} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader

          title="Turn long documents into"
          titleAccent="answers you can check."
          subtitle="We turn long contracts, filings, manuals and clinical records into searchable data. Every answer links to the exact line it came from."
          ctaText="Discuss document architecture"
          ctaRoute="/contact"
          secondaryCtaText="See Talkument"
          secondaryCtaRoute="/products"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'Extraction', value: 'Spatial Bounding-Box' },
            { label: 'Isolation', value: 'Air-Gapped & VPC' },
            { label: 'Verification', value: 'Exact Citations' },
          ]}
        />
      </section>

      {/* 2. Interactive 4-Stage Ingestion & Verification Pipeline */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container space-y-8 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div>
              <span className="text-xs font-mono text-[var(--accent-orange-text)] font-bold">
                Ingestion Architecture · 04 Stages
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                End-to-end extraction &amp; citation pipeline
              </h2>
            </div>

          </div>

          {/* Step Selector Buttons */}
          <StageGroup label="Document processing stages" className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
            {pipelineSteps.map((step, idx) => {
              const isSelected = activePipelineStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  aria-pressed={isSelected}
                  data-suggested={idx === (activePipelineStep + 1) % pipelineSteps.length}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`stage-control p-5 text-left font-mono focus-visible:-outline-offset-4 transition-colors cursor-pointer relative ${
                    isSelected
                      ? 'bg-[var(--bg-surface)]'
                      : 'bg-[var(--bg-base)] hover:bg-[var(--bg-surface-subtle)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 h-[2.5px] transition-all duration-300 ${
                      isSelected ? 'w-full bg-[#FF4800]' : 'w-0'
                    }`}
                  />
                  <div className="text-xs font-bold" style={{ color: step.accent }}>
                    {step.num} · Stage
                  </div>
                  <div className="text-sm font-display font-bold text-[var(--text-primary)] mt-1">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </StageGroup>

          {/* Selected Stage Deep Inspector */}
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono" style={{ color: pipelineSteps[activePipelineStep].accent }}>
              <span>Pipeline Stage {pipelineSteps[activePipelineStep].num}</span>
              <span>·</span>
              <span>{pipelineSteps[activePipelineStep].title}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
              {pipelineSteps[activePipelineStep].title}
            </h3>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-4xl font-sans">
              {pipelineSteps[activePipelineStep].desc}
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                <span className="text-[var(--text-primary)] font-medium">{pipelineSteps[activePipelineStep].metric}</span>
              </div>
              <span className="text-[var(--text-muted)]">Runs inside your private cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Document Runtimes */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-10 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[var(--accent-secondary)] font-semibold">Technical Framework</span>
            <MaskedHeading as="h2" className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Enterprise document engines in production.
            </MaskedHeading>
            <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              Engineered to process dense technical layouts, tables, and regulatory compliance packets without losing context.
            </ScrollText>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-3 gap-px">
            {[
              {
                title: 'Multi-modal spatial layout OCR',
                desc: 'High-precision layout decomposition separating complex headers, embedded charts, sidebars, and nested financial tabular cells.',
                tag: 'Spatial Parsing'
              },
              {
                title: 'Hierarchical chunking & entity graph',
                desc: 'Connecting section parent-child nodes so extracted data preserves semantic context across 500+ page technical manuals.',
                tag: 'Graph RAG'
              },
              {
                title: 'Side-by-side audit workbench',
                desc: 'Operator UI with synchronized PDF page viewing, highlighted text bounding boxes, and instant confidence score inspection.',
                tag: 'Audit Traceability'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
              >
                <div className="text-xs font-mono text-[var(--accent-orange-text)] font-bold">
                  0{idx + 1} · {item.tag}
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RelatedWork slugs={["document-intelligence"]} onNavigate={onNavigate} />

      {/* 4. Bottom CTA */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-widest block">
            Document Workflow Pilot
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to make your enterprise documents computable?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            We build custom ingestion pipelines and deploy private extraction engines inside your security perimeter.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Send us a sample document</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
