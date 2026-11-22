import { SectionBackdrop } from './SectionBackdrop';
import { StageGroup } from './StageGroup';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Gauge, Lock, DollarSign, Target, Server, ArrowRight } from 'lucide-react';

interface ModelEcosystemSpectrumProps {
  onExploreWork?: () => void;
}

export function ModelEcosystemSpectrum({ onExploreWork }: ModelEcosystemSpectrumProps) {
  const [selectedCategory, setSelectedCategory] = useState<'frontier' | 'slm' | 'open-weight' | 'fine-tuned'>('frontier');

  const modelLabs = [
    { name: 'OpenAI', tech: 'GPT-4.5 / o3-mini (Select Partner)', isPartner: true },
    { name: 'Anthropic', tech: 'Claude 3.7 Sonnet', isPartner: false },
    { name: 'Google', tech: 'Gemini 2.0 Flash / Pro', isPartner: false },
    { name: 'Microsoft', tech: 'Azure AI / Phi-4', isPartner: false },
    { name: 'Qwen', tech: 'Qwen 2.5 72B / Coder', isPartner: false },
    { name: 'GLM', tech: 'GLM-4 Multi-Modal', isPartner: false },
    { name: 'DeepSeek', tech: 'DeepSeek R1 / V3', isPartner: false },
    { name: 'Open-Weight', tech: 'Llama 3.3 / Mistral / vLLM', isPartner: false },
  ];

  const selectionCriteria = [
    { name: 'Accuracy', desc: 'Reasoning depth & multi-turn schema adherence', icon: Target },
    { name: 'Latency', desc: 'Time-to-first-token & real-time throughput', icon: Gauge },
    { name: 'Cost', desc: 'Token economics vs. dedicated self-hosted compute', icon: DollarSign },
    { name: 'Deployment', desc: 'Cloud API, private VPC, on-prem, or edge runtime', icon: Server },
    { name: 'Privacy', desc: 'Customer data boundaries & zero retention options', icon: Lock },
    { name: 'Business Requirements', desc: 'Regulatory compliance & existing SLA mandates', icon: Layers },
  ];

  const spectrumTiers = [
    {
      id: 'frontier',
      title: 'Frontier Models',
      sub: 'Deep Reasoning & Broad Knowledge',
      desc: 'Complex multi-step decision chains, deep code synthesis, unstructured legal synthesis, and open-ended agent deliberation.',
      examples: 'GPT-4.5, Claude 3.7 Sonnet, Gemini 2.0 Pro, DeepSeek R1',
      bestFor: 'Multi-modal research, high-ambiguity planning, unstructured extraction',
      accent: 'var(--accent-secondary)'
    },
    {
      id: 'slm',
      title: 'Small Language Models (SLMs)',
      sub: 'Ultra-Low Latency & On-Device Speed',
      desc: 'Compact parameter architectures (1B-8B) optimized for sub-15ms classification, routing, and embedded execution with minimal memory footprint.',
      examples: 'Phi-4, Llama 3.2 3B, Qwen 2.5 7B, Gemma 2 2B',
      bestFor: 'Edge devices, high-frequency classification, interactive typing assistance',
      accent: 'var(--accent-ocean)'
    },
    {
      id: 'open-weight',
      title: 'Open-Weight Models',
      sub: 'Customer-Controlled Infrastructure',
      desc: 'Models hosted directly on your VPC or on-premise GPU clusters. 100% data privacy with zero third-party API exposure.',
      examples: 'Llama 3.3 70B, Mistral Large, Qwen 2.5, DeepSeek V3',
      bestFor: 'Private cloud / on-prem infrastructure, strict regulatory boundaries, self-hosted workloads',
      accent: 'var(--accent-orange-text)'
    },
    {
      id: 'fine-tuned',
      title: 'Fine-Tuned / Domain Models',
      sub: 'Domain Taxonomy & Distillation',
      desc: 'Models distilled and quantized on your proprietary domain corpus. Achieves frontier accuracy on specific business tasks at 1/10th the inference cost.',
      examples: 'Custom LoRA / QLoRA checkpoints, quantized FP8 / INT4 engines',
      bestFor: 'Proprietary enterprise schemas, specialized terminology, cost reduction at scale',
      accent: 'var(--accent-orange-text)'
    }
  ];

  return (
    <section
      id="model-ecosystem-section"
      className="home-section py-14 sm:py-20 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] relative overflow-hidden z-10"
    >
      <SectionBackdrop mode="platforms" />
      <div className="site-container space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-3 max-w-2xl text-left">

            <h2 className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              Models are only useful when they work{' '}
              <span className="text-[var(--accent-secondary)]">
                inside the real operation.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-md leading-relaxed text-left">
            We are strictly model-agnostic. We evaluate frontier models, SLMs, open-weights, and fine-tuning strategies based on your operational latency, accuracy, cost, and infrastructure control requirements.
          </p>
        </div>

        {/* Labs We Work Across */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Model Ecosystems &amp; Labs We Engineer With
            </span>
            <span className="text-xs text-[var(--accent-secondary)] font-semibold">
              Multi-Architecture Runtime
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {modelLabs.map((lab) => (
              <div
                key={lab.name}
                className={`p-3 rounded-xl border transition-colors text-left space-y-1 ${
                  lab.isPartner
                    ? 'bg-[var(--bg-surface-elevated)] border-[#FF5A1F]/45 shadow-sm'
                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div className="text-xs font-display font-bold text-[var(--text-primary)]">
                    {lab.name}
                  </div>
                  {lab.isPartner && (
                    <span className="text-xs font-bold text-[var(--accent-orange-text)]" title="Verified Select Partner">
                      Select
                    </span>
                  )}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-relaxed break-words">
                  {lab.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 4-Tier Spectrum Interactive Selector */}
        <div className="space-y-6 text-left">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            The Model Spectrum: Matching Architecture to Workload
          </div>

          {/* Stepper bar */}
          <StageGroup label="Model spectrum" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {spectrumTiers.map((tier) => {
              const isSelected = selectedCategory === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedCategory(tier.id as any)}
                  aria-pressed={isSelected}
                  aria-controls="model-spectrum-detail"
                  data-suggested={spectrumTiers.indexOf(tier) === (spectrumTiers.findIndex((item) => item.id === selectedCategory) + 1) % spectrumTiers.length}
                  className={`stage-control p-5 rounded-2xl border text-left transition-colors relative overflow-hidden cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[var(--bg-surface-elevated)] border-[#FF5A1F] shadow-md'
                      : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
                  }`}
                >

                  <div className="text-base font-display font-bold text-[var(--text-primary)]">
                    {tier.title}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {tier.sub}
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5A1F]" />
                  )}
                </button>
              );
            })}
          </StageGroup>

          {/* Detailed Selected Tier Card */}
          {(() => {
            const current = spectrumTiers.find((t) => t.id === selectedCategory)!;
            return (
              <motion.div id="model-spectrum-detail" role="region" aria-label="Model spectrum detail"
                key={current.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
                  <div>

                    <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mt-1">
                      {current.title} — {current.sub}
                    </h3>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                    {current.bestFor}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {current.desc}
                </p>

                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[var(--text-muted)]">Representative Models:</span>
                  <span className="font-bold text-[var(--accent-secondary)]">{current.examples}</span>
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* 6 Selection Criteria Grid */}
        <div className="space-y-4 text-left">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            How We Choose: 6 Architectural Decision Criteria
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {selectionCriteria.map((crit, cIdx) => {
              const Icon = crit.icon;
              return (
                <div
                  key={cIdx}
                  className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2 text-left"
                >
                  <Icon className="w-4 h-4 text-[var(--accent-orange-text)]" />
                  <div className="text-xs font-display font-bold text-[var(--text-primary)]">
                    {crit.name}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-snug">
                    {crit.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Link with High-Intent CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)] text-left">
          <button
            type="button"
            onClick={onExploreWork}
            className="site-button button-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-tight cursor-pointer shadow-sm"
          >
            <span>Explore Production Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#061421]" />
          </button>

          <span className="text-xs text-[var(--text-muted)]">
            OpenAI Select Partner · Model-Agnostic Routing · Custom Fine-Tuning
          </span>
        </div>
      </div>
    </section>
  );
}
