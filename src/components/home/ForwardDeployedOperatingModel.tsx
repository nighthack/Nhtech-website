import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Search,
  Workflow,
  Zap,
  GitMerge,
  Server,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { RoutePath } from '../../types';
import { MaskedHeading, ScrollText } from '../common/ScrollMotion';

interface ForwardDeployedOperatingModelProps {
  onNavigate: (path: RoutePath) => void;
}

interface EngagementStep {
  id: string;
  stepNumber: string;
  label: string;
  subtitle: string;
  nhtechRole: string;
  clientPartner: string[];
  deliverable: string;
  icon: typeof Search;
}

const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    id: 'discover',
    stepNumber: '01',
    label: 'Discover',
    subtitle: 'Shadow operations & frame the bottleneck',
    clientPartner: ['Department Heads', 'Domain Analysts', 'Process Operators'],
    nhtechRole:
      'Senior engineers sit directly with your operators to dissect manual steps, legacy rules, incoming document formats, and real-world failure modes.',
    deliverable: 'Problem Boundary & Error/Latency Budget',
    icon: Search
  },
  {
    id: 'map-workflow',
    stepNumber: '02',
    label: 'Map Workflow',
    subtitle: 'Design deterministic states & human checkpoints',
    clientPartner: ['System Owners', 'Compliance Lead', 'Engineering Lead'],
    nhtechRole:
      'We map every input, approval gate, fallback rule, and database write—selecting Small Language Models (SLMs), frontier models, or deterministic logic per step.',
    deliverable: 'Workflow State Map & Model Benchmark Matrix',
    icon: Workflow
  },
  {
    id: 'prototype',
    stepNumber: '03',
    label: 'Prototype',
    subtitle: 'Validate end-to-end behavior on live data',
    clientPartner: ['Subject Matter Experts', 'QA Lead', 'End-Users'],
    nhtechRole:
      'We stand up a working prototype against real operational payloads to prove accuracy, latency, and human review ergonomics before scaling.',
    deliverable: 'Functional End-to-End Prototype',
    icon: Zap
  },
  {
    id: 'integrate',
    stepNumber: '04',
    label: 'Integrate',
    subtitle: 'Connect securely to ERPs, databases & APIs',
    clientPartner: ['Database Admins', 'Security / SecOps', 'API Owners'],
    nhtechRole:
      'Engineers build hardened microservices, bidirectional SAP/Oracle/SQL connectors, Role-Based Access Control (RBAC), and inline operator workbenches.',
    deliverable: 'Integrated Microservices & Approval Workbench',
    icon: GitMerge
  },
  {
    id: 'deploy',
    stepNumber: '05',
    label: 'Deploy',
    subtitle: 'Ship inside infrastructure you control',
    clientPartner: ['Site Reliability / DevOps', 'IT Security', 'Executive Sponsor'],
    nhtechRole:
      'Deployed into your Virtual Private Cloud (VPC), on-premises GPU cluster, or edge hardware with automated CI/CD, observability, and full codebase handover.',
    deliverable: 'Production Runtime & 100% IP Handover',
    icon: Server
  },
  {
    id: 'optimise',
    stepNumber: '06',
    label: 'Optimise',
    subtitle: 'Calibrate accuracy, cost & operator throughput',
    clientPartner: ['Operations Manager', 'Internal Developers'],
    nhtechRole:
      'We monitor live traffic, human override rates, and inference costs—quantizing models or tuning prompts and rules based on real production telemetry.',
    deliverable: 'Telemetry Runbooks & Team Enablement',
    icon: TrendingUp
  }
];

export function ForwardDeployedOperatingModel({ onNavigate }: ForwardDeployedOperatingModelProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = ENGAGEMENT_STEPS[activeStepIndex];

  return (
    <section
      id="fde-operating-model-section"
      className="py-20 sm:py-28 bg-[var(--bg-base)] border-b border-[var(--border-color)] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-3 max-w-2xl text-left">
            <p className="text-xs font-mono text-[var(--accent-orange-text)] uppercase tracking-[0.14em] font-semibold">
              Six-Stage Engagement Flow
            </p>

            <MaskedHeading as="h2" className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              Discover → Map Workflow → Prototype →{' '}
              <span className="text-[var(--accent-secondary)]">
                Integrate → Deploy → Optimise
              </span>
            </MaskedHeading>
          </div>

          <ScrollText
            className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-md leading-relaxed text-left"
            delay={0.12}
          >
            Select any stage along the track to inspect what our embedded engineering pod builds, who they collaborate with on your team, and what artifact is delivered at each gate.
          </ScrollText>
        </div>

        {/* Connected 6-Stage Hairline Track */}
        <div className="space-y-10">
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[var(--border-color)]"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 relative">
              {ENGAGEMENT_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className="text-left transition-all relative cursor-pointer group space-y-3 pt-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all relative z-10 ${
                          isActive
                            ? 'bg-[#FF5A1F] border-[#FF5A1F] text-[#061421] shadow-md'
                            : 'bg-[var(--bg-base)] border-[var(--border-hover)] text-[var(--accent-secondary)] group-hover:border-[#FF5A1F]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs font-mono font-bold tabular-nums ${
                          isActive ? 'text-[var(--accent-orange-text)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                    </div>

                    <div className="space-y-1 pr-2">
                      <div
                        className={`text-sm font-display font-bold leading-snug transition-colors ${
                          isActive
                            ? 'text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] leading-snug">
                        {step.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unboxed Detailed Stage Editorial Spread */}
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-b border-[var(--border-color)] py-8 sm:py-10 text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:divide-x divide-[var(--border-color)]">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5 lg:pr-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="font-bold uppercase text-[var(--accent-orange-text)] tabular-nums">
                    Stage {currentStep.stepNumber} · {currentStep.label}
                  </span>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span className="text-[var(--text-secondary)]">{currentStep.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                  {currentStep.subtitle}
                </h3>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                  {currentStep.nhtechRole}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Client Stakeholders Involved
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[var(--text-primary)]">
                    {currentStep.clientPartner.map((persona) => (
                      <span key={persona} className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                        <span>{persona}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Theme-Aware Ocean Decision Gate Module */}
              <div className="lg:col-span-5 lg:pl-8 space-y-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-ocean-depth text-[var(--text-primary)] space-y-5 border border-[var(--border-hover)] shadow-lg">
                  <div className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Stage Output &amp; Decision Gate</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-display font-bold text-[var(--text-primary)]">
                      {currentStep.deliverable}
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      Delivered directly inside your repository and infrastructure with clear acceptance benchmarks before advancing to the next stage.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('/contact')}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-orange-text)] hover:underline cursor-pointer"
                    >
                      <span>Discuss an embedded engagement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
                      Stage {activeStepIndex + 1} of 6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
