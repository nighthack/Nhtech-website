import { BrainCircuit, Database, Lock, Server, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { StageGroup } from '../home/StageGroup';

export function CustomModelPipelineStage() {
  const [activeStep, setActiveStep] = useState<number>(2); // Default on fine-tuning

  const steps = [
    {
      id: 0,
      title: 'Domain data ingestion & sanitization',
      shortTitle: 'Data ingestion',
      tagline: 'Your Proprietary Business Data',
      icon: Database,
      accent: '#47849B',
      desc: 'Ingest and sanitize proprietary schemas, transaction logs, unstructured domain documents, and business records through structured data engineering pipelines.',
      metrics: [
        { label: 'Data sources', value: 'Databases, PDFs, Spreadsheets, APIs' },
        { label: 'Quality controls', value: 'Data Quality Checks & Filtering' },
        { label: 'Custody', value: 'Direct Enterprise Integration' }
      ],
      nodes: ['Operational Databases (PostgreSQL / MySQL)', 'Domain Documents & Contracts', 'Historical Decision Records', 'ETL/ELT Pipeline Sanitization']
    },
    {
      id: 1,
      title: 'Model evaluation & benchmark harness',
      shortTitle: 'Evaluation harness',
      tagline: 'Grounded Metrics Before Training',
      icon: BrainCircuit,
      accent: '#75A4B5',
      desc: 'Establish rigorous evaluation metrics, ground-truth test sets, and latency constraints to benchmark model options against your actual business requirements.',
      metrics: [
        { label: 'Metrics framework', value: 'Accuracy, F1, Latency, Cost' },
        { label: 'Evaluation sets', value: 'Human-Labeled Domain Ground Truth' },
        { label: 'Model selection', value: 'Open-Weights vs Frontier APIs' }
      ],
      nodes: ['Benchmark Test Suites', 'Latency & Memory Profiling', 'Domain-Specific Edge Case Testing', 'Human Acceptance Gates']
    },
    {
      id: 2,
      title: 'Model fine-tuning & adaptation',
      shortTitle: 'Fine-tuning',
      tagline: 'Llama & Mistral Family Adaptation',
      icon: Sparkles,
      accent: '#FF4800',
      desc: 'Fine-tune open-weight foundations (Llama-family, Mistral/Mixtral-family) and custom ML models using PyTorch, Hugging Face Transformers, and parameter-efficient techniques tailored to your domain vocabulary.',
      metrics: [
        { label: 'Supported families', value: 'Llama-family & Mistral-family' },
        { label: 'Frameworks', value: 'PyTorch / Hugging Face Transformers' },
        { label: 'Techniques', value: 'LoRA, Task Adaptation, Quantisation' }
      ],
      nodes: ['PyTorch Training Pipelines', 'Hugging Face Model Adaptation', 'Domain Vocabulary Alignment', 'Resource & Precision Optimisation']
    },
    {
      id: 3,
      title: 'Client-owned artifacts & weights',
      shortTitle: 'Owned artifacts',
      tagline: 'Your Intellectual Property',
      icon: Lock,
      accent: '#47849B',
      desc: 'You retain full ownership of the trained model checkpoints, adapter weights, and inference pipelines. You control the model and code, with running costs tied to your own infrastructure.',
      metrics: [
        { label: 'Ownership', value: 'Client-owned weights' },
        { label: 'Artifact formats', value: 'Standard PyTorch / Transformers' },
        { label: 'Vendor lock-in', value: 'Exportable models and code' }
      ],
      nodes: ['Exportable Model Checkpoints', 'Tuned Adapter Weights', 'Reproducible Training Recipes', 'Custom Inference Code']
    },
    {
      id: 4,
      title: 'Production deployment & inference APIs',
      shortTitle: 'ML deployment',
      tagline: 'Cloud ML, Docker, & Kubernetes',
      icon: Server,
      accent: '#FF4800',
      desc: 'Deploy fine-tuned models to your target environment. AWS SageMaker, Vertex AI, Azure ML, or containerized via Docker and Kubernetes. with high-throughput FastAPI inference endpoints.',
      metrics: [
        { label: 'Target platforms', value: 'AWS SageMaker, GCP, Azure ML' },
        { label: 'Containerization', value: 'Docker & Kubernetes Pods' },
        { label: 'API layer', value: 'FastAPI / Async REST Endpoints' }
      ],
      nodes: ['Managed Cloud Endpoints', 'Containerized Kubernetes Pods', 'FastAPI Microservice Runtimes', 'Workflow & Dashboard Integration']
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="space-y-8">
      {/* 5-Step Progress Ribbon */}
      <StageGroup label="Model engineering phases" className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {steps.map((step, idx) => {
          const isCurrent = activeStep === idx;
          const isPassed = activeStep > idx;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              aria-pressed={isCurrent}
              aria-controls="model-phase-detail"
              data-suggested={idx === (activeStep + 1) % steps.length}
              className={`stage-control p-3.5 rounded-2xl border text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                isCurrent
                  ? 'bg-[var(--bg-surface)] border-[#FF4800] shadow-md'
                  : isPassed
                  ? 'bg-[var(--bg-surface-elevated)] border-[var(--border-color)] text-[var(--text-secondary)]'
                  : 'bg-[var(--bg-surface-subtle)] border-[var(--border-color)] text-[var(--text-muted)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold tabular-nums ${isCurrent ? 'text-[var(--accent-orange-text)]' : 'text-[var(--text-muted)]'}`}>
                  0{idx + 1}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[var(--accent-orange-text)]' : 'text-[var(--text-muted)]'}`} />
              </div>
              <span className={`text-xs font-medium  ${isCurrent ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                {step.shortTitle}
              </span>
              {isCurrent && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4800]" />
              )}
            </button>
          );
        })}
      </StageGroup>

      {/* Active Stage Detailed Breakdown */}
      <AnimatePresence mode="wait">
        <motion.div id="model-phase-detail" role="region" aria-label="Model engineering phases detail"
          key={current.id}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-2xl detail-panel bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-6 text-left"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div className="space-y-1">
              <span className="text-xs tracking-wider font-bold text-[var(--accent-orange-text)]">
                {current.tagline}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                {current.title}
              </h3>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
            {current.desc}
          </p>

          {/* Architecture Nodes */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-3">
            <span className="text-xs text-[var(--text-muted)] ">
              Engineering Artifacts &amp; Data Flow
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.nodes.map((node, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-1">

                  <p className="text-xs text-[var(--text-secondary)] font-normal leading-snug">
                    {node}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {current.metrics.map((m, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                <span className="text-xs text-[var(--text-muted)]">{m.label}</span>
                <div className="text-xs font-bold text-[var(--text-primary)]">{m.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
