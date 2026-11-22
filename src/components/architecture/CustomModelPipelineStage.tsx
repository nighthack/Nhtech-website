import { StageGroup } from '../home/StageGroup';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, BrainCircuit, Sparkles, Lock, Server } from 'lucide-react';

export function CustomModelPipelineStage() {
  const [activeStep, setActiveStep] = useState<number>(2); // Default on fine-tuning

  const steps = [
    {
      id: 0,
      title: 'Domain Data Ingestion & Sanitization',
      shortTitle: 'Data Ingestion',
      tagline: 'Your Proprietary Business Data',
      icon: Database,
      accent: '#47849B',
      desc: 'Ingest and sanitize proprietary schemas, transaction logs, unstructured domain documents, and business records through structured data engineering pipelines.',
      metrics: [
        { label: 'Data Sources', value: 'Databases, PDFs, Spreadsheets, APIs' },
        { label: 'Quality Controls', value: 'Data Quality Checks & Filtering' },
        { label: 'Custody', value: 'Direct Enterprise Integration' }
      ],
      nodes: ['Operational Databases (PostgreSQL / MySQL)', 'Domain Documents & Contracts', 'Historical Decision Records', 'ETL/ELT Pipeline Sanitization']
    },
    {
      id: 1,
      title: 'Model Evaluation & Benchmark Harness',
      shortTitle: 'Evaluation Harness',
      tagline: 'Grounded Metrics Before Training',
      icon: BrainCircuit,
      accent: '#75A4B5',
      desc: 'Establish rigorous evaluation metrics, ground-truth test sets, and latency constraints to benchmark model options against your actual business requirements.',
      metrics: [
        { label: 'Metrics Framework', value: 'Accuracy, F1, Latency, Cost' },
        { label: 'Evaluation Sets', value: 'Human-Labeled Domain Ground Truth' },
        { label: 'Model Selection', value: 'Open-Weights vs Frontier APIs' }
      ],
      nodes: ['Benchmark Test Suites', 'Latency & Memory Profiling', 'Domain-Specific Edge Case Testing', 'Human Acceptance Gates']
    },
    {
      id: 2,
      title: 'Model Fine-Tuning & Adaptation',
      shortTitle: 'Fine-Tuning',
      tagline: 'Llama & Mistral Family Adaptation',
      icon: Sparkles,
      accent: '#FF5A1F',
      desc: 'Fine-tune open-weight foundations (Llama-family, Mistral/Mixtral-family) and custom ML models using PyTorch, Hugging Face Transformers, and parameter-efficient techniques tailored to your domain vocabulary.',
      metrics: [
        { label: 'Supported Families', value: 'Llama-family & Mistral-family' },
        { label: 'Frameworks', value: 'PyTorch / Hugging Face Transformers' },
        { label: 'Techniques', value: 'LoRA, Task Adaptation, Quantization' }
      ],
      nodes: ['PyTorch Training Pipelines', 'Hugging Face Model Adaptation', 'Domain Vocabulary Alignment', 'Resource & Precision Optimization']
    },
    {
      id: 3,
      title: 'Client-Owned Artifacts & Weights',
      shortTitle: 'Owned Artifacts',
      tagline: 'Your Intellectual Property',
      icon: Lock,
      accent: '#47849B',
      desc: 'You retain full ownership of the trained model checkpoints, adapter weights, and inference pipelines. No recurring token tolls, no vendor lock-in, and full operational control.',
      metrics: [
        { label: 'Ownership', value: '100% Client-Owned Weights' },
        { label: 'Artifact Formats', value: 'Standard PyTorch / Transformers' },
        { label: 'Vendor Lock-in', value: 'Zero Proprietary Lock-In' }
      ],
      nodes: ['Exportable Model Checkpoints', 'Tuned Adapter Weights', 'Reproducible Training Recipes', 'Custom Inference Code']
    },
    {
      id: 4,
      title: 'Production Deployment & Inference APIs',
      shortTitle: 'ML Deployment',
      tagline: 'Cloud ML, Docker, & Kubernetes',
      icon: Server,
      accent: '#FF5A1F',
      desc: 'Deploy fine-tuned models to your target environment—AWS SageMaker, Google AI Platform, Azure ML, or containerized via Docker and Kubernetes—with high-throughput FastAPI inference endpoints.',
      metrics: [
        { label: 'Target Platforms', value: 'AWS SageMaker, GCP, Azure ML' },
        { label: 'Containerization', value: 'Docker & Kubernetes Pods' },
        { label: 'API Layer', value: 'FastAPI / Async REST Endpoints' }
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
                  ? 'bg-[var(--bg-surface)] border-[#FF5A1F] shadow-md'
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A1F]" />
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
              <span className="text-xs uppercase tracking-wider font-bold text-[var(--accent-orange-text)]">
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
            <span className="text-xs text-[var(--text-muted)] uppercase">
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
