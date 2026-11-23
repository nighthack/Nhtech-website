import {
ArrowRight,
CheckCircle2,
Sliders
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CustomModelPipelineStage } from '../components/architecture/CustomModelPipelineStage';
import { SovereignTopologyStage } from '../components/architecture/SovereignTopologyStage';
import { MotionPage } from '../components/common/MotionPage';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { ModelEcosystemSpectrum } from '../components/home/ModelEcosystemSpectrum';
import { SectionBackdrop } from '../components/home/SectionBackdrop';
import { StageGroup } from '../components/home/StageGroup';
import { RoutePath } from '../types';

interface OnPremAiPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function OnPremAiPage({ onNavigate }: OnPremAiPageProps) {
  const [selectedTradeoff, setSelectedTradeoff] = useState<'rag' | 'finetuning' | 'distillation'>('rag');

  const tradeoffs = {
    rag: {
      id: 'rag',
      title: 'Retrieval-augmented generation (RAG)',
      badge: 'DYNAMIC KNOWLEDGE RETRIEVAL',
      accent: 'var(--accent-secondary)',
      summary: 'Best for continuously changing knowledge, policy manuals, regulatory docs, and search where deterministic citation back to the original source text is mandatory.',
      pros: [
        'No model training needed',
        'Instant updates as enterprise databases change',
        'Exact source attribution with bounding box coordinates',
        'Direct access control and document-level permissions'
      ],
      cons: [
        'Higher latency due to multi-stage vector search + synthesis',
        'Context window limits on massive multi-document reasoning',
        'Does not teach the model new syntaxes or private formatting styles'
      ],
      idealWhen: 'Your data changes frequently, source citation is legally mandated, and the base model already understands your domain vocabulary.'
    },
    finetuning: {
      id: 'finetuning',
      title: 'LoRA & QLoRA parameter-efficient fine-tuning',
      badge: 'STYLE, SYNTAX & DOMAIN ADAPTATION',
      accent: 'var(--accent-orange-text)',
      summary: 'Best for teaching specialized domain vocabularies, strict output schemas (JSON/SQL), clinical/legal taxonomy, and tone alignment on proprietary datasets.',
      pros: [
        'Adapts open-weight models (Llama, Mistral, Qwen) to custom syntax',
        'Reduces prompt token overhead and latency substantially',
        'Client owns all adapter weights and fine-tuning artifacts',
        'Parameter-efficient (LoRA/QLoRA) requires modest GPU clusters'
      ],
      cons: [
        'Requires clean, human-validated ground truth datasets',
        'Not ideal for frequently changing factual knowledge',
        'Requires ongoing evaluation to prevent catastrophic forgetting'
      ],
      idealWhen: 'You have repetitive tasks requiring strict output formatting, proprietary industry terminology, or low-latency deterministic classifications.'
    },
    distillation: {
      id: 'distillation',
      title: 'Model distillation & quantisation',
      badge: 'HIGH-THROUGHPUT COMPACT RUNTIMES',
      accent: 'var(--accent-ocean)',
      summary: 'Transfer knowledge from large frontier models into compact 1B-8B parameter models quantised for FP8 or INT4 inference on commodity hardware or edge nodes.',
      pros: [
        'Lower inference latency, measured against your workload',
        'Lower running costs once deployed on your own hardware',
        'Deployable to edge devices, local servers, or smaller cloud instances',
        'Can operate without external network access'
      ],
      cons: [
        'Requires frontier model supervision during training dataset synthesis',
        'Narrower reasoning scope than massive general-purpose models',
        'Requires quantisation loss calibration benchmarks'
      ],
      idealWhen: 'High-volume queries require low latency, low hardware cost, and high repeatability on a well-bounded business problem.'
    }
  };

  return (
    <MotionPage id="on-prem-ai-chapter">

      {/* 1. Spatial Header - Private AI & Sovereign Model Engineering */}
      <section className="home-section detail-hero pt-36 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SectionBackdrop mode="platforms" />
        <SpatialPageHeader
          title="Turn your data into a"
          titleAccent="model you control."
          subtitle="We work out whether you need search over your documents, a fine-tuned model or a smaller, faster one. Then we build it and run it on your servers or private cloud. You keep the data, the tests and the model."
          ctaText="Talk about a private model"
          ctaRoute="/contact"
          secondaryCtaText="See our work"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'Strategy', value: 'RAG · Fine-Tuning · Distillation' },
            { label: 'Techniques', value: 'LoRA · QLoRA · Quantisation' },
            { label: 'Deployment', value: 'Edge · On-Prem · Private Cloud' },
          ]}
        />
      </section>

      {/* 2. RAG vs Fine-Tuning vs Distillation Decision Matrix */}
      <section className="home-section py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container relative z-10 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              RAG vs. fine-tuning vs. distillation
            </h2>
          </div>

        </div>

        {/* Strategy Buttons */}
        <StageGroup label="Model strategy" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['rag', 'finetuning', 'distillation'] as const).map((key) => {
            const item = tradeoffs[key];
            const isSelected = selectedTradeoff === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isSelected}
                aria-controls="on-prem-strategy-detail"
                onClick={() => setSelectedTradeoff(key)}
                data-suggested={key === (['rag', 'finetuning', 'distillation'][(['rag', 'finetuning', 'distillation'].indexOf(selectedTradeoff) + 1) % 3])}
                className={`stage-control p-5 rounded-2xl border text-left transition-colors cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-[var(--bg-surface-elevated)] border-[#FF4800]/60 shadow-md'
                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--text-secondary)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold" style={{ color: item.accent }}>
                    {item.badge}
                  </span>

                </div>
                <div className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                  {item.title}
                </div>
              </button>
            );
          })}
        </StageGroup>

        {/* Selected Strategy Deep Breakdown */}
        {(() => {
          const current = tradeoffs[selectedTradeoff];
          return (
            <motion.div
              key={selectedTradeoff}
              id="on-prem-strategy-detail"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-8"
            >
              <div className="space-y-3">
                <div className="text-xs font-bold" style={{ color: current.accent }}>
                  {current.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                  {current.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-color)]">
                <div className="space-y-3">
                  <div className="text-xs text-[var(--status-success-text)] font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--status-success-text)]" />
                    <span>Primary Advantages</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {current.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--status-success-text)]">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[var(--text-muted)]" />
                    <span>Constraints &amp; Tradeoffs</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {current.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--text-muted)]">⚠</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[var(--text-muted)] ">Suitable when</span>
                <span className="text-[var(--text-primary)] font-medium sm:text-right">{current.idealWhen}</span>
              </div>
            </motion.div>
          );
        })()}
        </div>
      </section>

      {/* 3. Core Story & Visual Pipeline Stage: Data -> Eval -> Tuning -> Artifacts -> Deployment */}
      <section className="home-section py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <SectionBackdrop mode="platforms" />
        <div className="site-container relative z-10 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Domain data to deployed ML architecture
            </h2>
          </div>

        </div>

        {/* Custom Model Pipeline Interactive Stage */}
        <CustomModelPipelineStage />
        </div>
      </section>

      {/* 4. Model Spectrum: The Right Model for the Problem (owns its own section & max-w-7xl) */}
      <ModelEcosystemSpectrum onExploreWork={() => onNavigate('/work')} />

      {/* 6. Deployment Topologies Section: Managed Cloud, Containerized, Custom API */}
      <section className="home-section py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <SectionBackdrop mode="platforms" />
        <div className="site-container relative z-10 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Production ML deployment environments
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            Cloud ML · Containers · On-Prem Clusters
          </span>
        </div>

        <SovereignTopologyStage />
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="home-section relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <SectionBackdrop mode="convergence" />
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
        >

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to evaluate and fine-tune a model for your business?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            Our AI/ML pod works with your team on domain data readiness, benchmark harness design, open-weight fine-tuning, and production deployment.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="site-button button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Talk about a private model</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>

    </MotionPage>
  );
}
