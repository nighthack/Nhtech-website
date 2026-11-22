import { MotionPage } from '../components/common/MotionPage';
import { SectionBackdrop } from '../components/home/SectionBackdrop';
import {
  ArrowRight,
  Terminal,
  Layers,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Users2,
  FileText,
  ArrowUpRight,
  Flag,
  Briefcase,
  Code2,
  CalendarClock
} from 'lucide-react';
import { RoutePath } from '../types';
import { caseStudies } from '../data/caseStudies';
import { ForwardDeployedOperatingModel } from '../components/home/ForwardDeployedOperatingModel';
import { AgenticExecutionFlowSection } from '../components/home/AgenticExecutionFlowSection';

interface ForwardDeployedEngineeringPageProps {
  onNavigate: (path: RoutePath) => void;
  onSelectCaseStudy?: (slug: string) => void;
}

export function ForwardDeployedEngineeringPage({
  onNavigate,
  onSelectCaseStudy
}: ForwardDeployedEngineeringPageProps) {
  const fdeCaseStudies = caseStudies.filter(
    (cs) =>
      cs.track === 'fde' ||
      cs.id === 'enterprise-workflow-intelligence' ||
      cs.id === 'document-intelligence'
  );

  const sprintPhases = [
    {
      phase: 'Phase 01',
      days: 'Discovery',
      title: 'Discover & Map Workflow',
      activities: [
        'Embed alongside operators and technical leads to map current manual steps, documents, and legacy rules.',
        'Identify system boundaries, edge cases, and failure modes across existing databases.'
      ],
      decisionGate: 'Signed workflow boundary specification and measurable accuracy/latency targets.',
      deliverables: [
        'End-to-end operational workflow map',
        'Data feasibility audit & risk register',
        'Success benchmark & latency budget'
      ]
    },
    {
      phase: 'Phase 02',
      days: 'Validation',
      title: 'Model Selection & Working Prototype',
      activities: [
        'Benchmark Small Language Models (SLMs) and frontier reasoning models against real domain samples.',
        'Stand up an interactive prototype on representative payloads to validate extraction and decision rules.'
      ],
      decisionGate: 'Go/no-go review against ground-truth evaluation metrics before full integration.',
      deliverables: [
        'Empirical model evaluation matrix',
        'Working prototype tested on real inputs',
        'Fallback & human escalation rules'
      ]
    },
    {
      phase: 'Phase 03',
      days: 'Integration',
      title: 'Integrate Into Core Systems',
      activities: [
        'Engineer deterministic state machines, citation grounding, and bidirectional ERP/CRM/SQL connectors.',
        'Build the operator triage workbench with mandatory human review gates and audit logging.'
      ],
      decisionGate: 'End-to-end staging validation with your internal operators and IT security review.',
      deliverables: [
        'Production microservices & connectors',
        'Human-in-the-loop review workbench',
        'Immutable audit trail & role permissions'
      ]
    },
    {
      phase: 'Phase 04',
      days: 'Production',
      title: 'Deploy, Optimise & Handover',
      activities: [
        'Deploy to your Virtual Private Cloud (VPC), on-premises cluster, or edge environment with CI/CD.',
        'Monitor live telemetry, calibrate model thresholds, and train your internal engineering team.'
      ],
      decisionGate: 'Production sign-off and complete transfer of code, weights, and documentation.',
      deliverables: [
        'Production infrastructure & CI/CD pipelines',
        'Operational runbooks & telemetry alerts',
        '100% client-owned code & model weights'
      ]
    }
  ];

  const nhtechResponsibilities = [
    'Embed senior product, AI, and systems engineers directly with your team',
    'Map operational edge cases, evaluate models, and write production application code',
    'Build deterministic guardrails, human approval interfaces, and legacy system connectors',
    'Deploy into your infrastructure with automated tests, monitoring, and full IP handover'
  ];

  const clientProvides = [
    'Access to domain operators and subject-matter experts during workflow discovery',
    'Representative sample inputs, historical records, and ground-truth review criteria',
    'Staging/production environment credentials, API documentation, and security boundaries',
    'Regular sprint check-ins and timely sign-off at each phase decision gate'
  ];

  const pillars = [
    {
      title: 'Agentic Systems & Deterministic State Machines',
      desc: 'We wrap AI models inside deterministic state machines with strict schema validation, human approval gates, and clear error boundaries.',
      icon: Terminal
    },
    {
      title: 'Small Language Models to Frontier Routing',
      desc: 'From sub-10ms quantized models hosted on private GPUs to frontier reasoning models for complex multi-step analysis.',
      icon: Cpu
    },
    {
      title: 'Document & Knowledge Intelligence',
      desc: 'Spatial Optical Character Recognition (OCR), contract parsing, and hybrid vector/graph indexing with exact source citations.',
      icon: FileText
    },
    {
      title: 'Human-in-the-Loop Operator Interfaces',
      desc: 'Purpose-built review workbenches enabling domain specialists to verify, edit, and approve automated pipelines in seconds.',
      icon: Users2
    },
    {
      title: 'Enterprise Stack Connectors',
      desc: 'Bidirectional connectors engineered for SAP, Oracle, Salesforce, PostgreSQL, Secure File Transfer Protocol (SFTP), and legacy APIs.',
      icon: Layers
    },
    {
      title: 'Governance, Observability & Auditing',
      desc: 'Telemetry tracking token latency, model drift, human override rates, and immutable audit logs for compliance.',
      icon: ShieldCheck
    }
  ];

  return (
    <MotionPage id="fde-chapter">
      {/* Section-wide engineering background */}
      <section className="home-section detail-hero pt-36 pb-16 sm:pt-32 sm:pb-20 border-b border-[var(--border-color)] relative">
        <SectionBackdrop mode="routing" />
        <div className="site-container relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="max-w-3xl lg:col-span-8 space-y-7">

              <h1 className="text-hero-display text-[var(--text-primary)] leading-[1.08]">
                Bring us the business problem.{' '}
                <span className="text-[var(--accent-secondary)]">
                  We’ll engineer the system.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed">
                Instead of handing over slide decks or isolated prototypes, we place senior product and AI engineers directly alongside your operational and technical teams. They map the real workflow, write production code inside your systems, and stay until the software is running reliably in production. In our practice, we call this model{' '}
                <strong className="text-[var(--text-primary)] font-semibold">
                  Forward Deployed Engineering (FDE)
                </strong>
                .
              </p>

              {/* Hairline Flow Summary Strip */}
              <div className="pt-4 border-t border-[var(--border-color)]">

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-display font-semibold text-[var(--text-primary)]">
                  <span>Discover</span>
                  <span className="text-[var(--accent-orange-text)]">→</span>
                  <span>Map Workflow</span>
                  <span className="text-[var(--accent-orange-text)]">→</span>
                  <span>Prototype</span>
                  <span className="text-[var(--accent-orange-text)]">→</span>
                  <span>Integrate</span>
                  <span className="text-[var(--accent-orange-text)]">→</span>
                  <span>Deploy</span>
                  <span className="text-[var(--accent-orange-text)]">→</span>
                  <span>Optimise</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="site-button button-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-sm"
                >
                  <span>Discuss a business workflow</span>
                  <ArrowRight className="w-4 h-4 text-[#061421]" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-[var(--bg-surface)] border border-[var(--border-hover)] text-[var(--text-primary)] text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Explore selected work</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SIX-STAGE ENGAGEMENT FLOW INTERACTIVE MODEL */}
      <ForwardDeployedOperatingModel onNavigate={onNavigate} />

      {/* 3. RESPONSIBILITIES: UNBOXED TWO-COLUMN HAIRLINE SPLIT */}
      <section className="home-section py-20 sm:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="site-container relative z-10 space-y-12 text-left">
          <div className="max-w-3xl space-y-3">

            <h2 className="text-section-display text-[var(--text-primary)]">
              How your team and our engineering pod work together.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              Production AI systems fail when engineering is disconnected from operational reality. Clear responsibilities keep sprints fast and predictable from week one.
            </p>
          </div>

          <div className="border-t border-b border-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
            {/* What NHTech Does */}
            <div className="py-8 md:pr-10 space-y-5">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-5 h-5 text-[var(--accent-orange-text)]" />
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                    What NHTech does
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[var(--accent-orange-text)]">
                  Engineering Pod
                </span>
              </div>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                {nhtechResponsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What the Client Provides */}
            <div className="py-8 md:pl-10 space-y-5">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-5 h-5 text-[var(--accent-secondary)]" />
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                    What the client provides
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[var(--accent-secondary)]">
                  Domain &amp; Access
                </span>
              </div>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                {clientProvides.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. READABLE EXECUTION CADENCE WITH HAIRLINE SPINE */}
      <section className="home-section py-20 sm:py-28 bg-[var(--bg-base)] border-b border-[var(--border-color)]">
        <div className="site-container relative z-10 space-y-12 text-left">
          <div className="max-w-3xl space-y-3">

            <h2 className="text-section-display text-[var(--text-primary)]">
              The Forward Deployed Execution Cadence
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              Every engagement follows explicit phases, continuous engineering collaboration, measurable decision gates, and concrete deliverables inside your repository.
            </p>
          </div>

          <div className="divide-y divide-[var(--border-color)] border-t border-b border-[var(--border-color)]">
            {sprintPhases.map((item) => (
              <div
                key={item.phase}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Phase & Timeline Anchor */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--accent-orange-text)] tabular-nums">
                    <CalendarClock className="w-4 h-4" />
                    <span>{item.phase} · {item.days}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Key Activities & Decision Gate */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Key Activities
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {item.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[var(--accent-secondary)] font-bold mt-0.5">→</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-[var(--border-color)] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs uppercase font-semibold text-[var(--accent-orange-text)]">
                      <Flag className="w-3.5 h-3.5" />
                      <span>Decision Gate</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {item.decisionGate}
                    </p>
                  </div>
                </div>

                {/* Stage Deliverables */}
                <div className="lg:col-span-4 space-y-3 lg:pl-6 lg:border-l border-[var(--border-color)]">
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Stage Deliverables
                  </div>
                  <ul className="space-y-2.5">
                    {item.deliverables.map((del) => (
                      <li
                        key={del}
                        className="text-xs sm:text-sm text-[var(--text-primary)] flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONCRETE WORKFLOW ILLUSTRATION */}
      <AgenticExecutionFlowSection onNavigate={onNavigate} />

      {/* 6. WHEN THIS MODEL IS RIGHT + WHAT YOU GET + CONFIRMED ENGAGEMENT OPTIONS */}
      <section className="home-section py-20 sm:py-24 bg-[var(--bg-base)] border-b border-[var(--border-color)]">
        <div className="site-container relative z-10 space-y-14 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)] border-t border-b border-[var(--border-color)]">
            {/* When this model is right */}
            <div className="py-8 lg:pr-10 space-y-4">

              <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                When this model is right
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-1" />
                  <span>Your core workflow spans fragmented emails, PDFs, spreadsheets, and legacy ERPs where off-the-shelf SaaS fails.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-1" />
                  <span>Data privacy, compliance, or latency requirements demand VPC, on-premises, or edge deployment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-1" />
                  <span>You want working production software owned by your organization—not slideware or vendor lock-in.</span>
                </li>
              </ul>
            </div>

            {/* What you get */}
            <div className="py-8 lg:pl-10 space-y-4">
              <p className="text-xs text-[var(--accent-secondary)] uppercase font-semibold tracking-wider">
                Handover &amp; Ownership
              </p>
              <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                What you get
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-1" />
                  <span>100% ownership of source code, fine-tuned model weights, evaluation harnesses, and deployment scripts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-1" />
                  <span>Production microservices with human approval workbenches, role permissions, and immutable audit trails.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-1" />
                  <span>Infrastructure-as-Code, runbooks, and structured engineering handover for your internal team.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Confirmed Engagement Options */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-[var(--accent-orange-text)] uppercase font-semibold tracking-wider">
                Confirmed Engagement Tracks
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
                Two verified ways to start
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--accent-orange-text)]">Option 01 · Validation</span>
                  <span className="text-[var(--text-muted)] tabular-nums">Prototype Sprint</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Focused Prototype Sprint
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Prove core AI feasibility and model accuracy against your real data in a focused validation sprint with clear acceptance benchmarks before committing to full enterprise integration.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-ocean-depth text-[var(--text-primary)] border border-[var(--border-hover)] space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--accent-orange-text)]">Option 02 · Production</span>
                  <span className="text-[var(--text-muted)] tabular-nums">Dedicated Pod</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  Embedded Engineering Pod
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  A cross-functional engineering pod embedded directly with your team to take a critical workflow from discovery through system integration, production deployment, and full IP handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SIX CORE TECHNICAL PILLARS (Hairline Matrix) */}
      <section className="home-section py-20 sm:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="site-container relative z-10 space-y-12 text-left">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs text-[var(--accent-secondary)] uppercase tracking-wider font-semibold">
              Technical Foundations
            </p>
            <h2 className="text-section-display text-[var(--text-primary)]">
              Engineered for complexity. Built for reliability.
            </h2>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 sm:p-7 bg-[var(--bg-surface-subtle)] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-bold text-[var(--accent-orange-text)]">0{idx + 1}</span>
                    <Icon className="w-4 h-4 text-[var(--accent-secondary)]" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ENHANCED CASE STUDIES HIGHLIGHTING VERIFIED OUTCOMES */}
      <section className="home-section py-20 sm:py-24 bg-[var(--bg-base)] border-b border-[var(--border-color)]">
        <div className="site-container relative z-10 space-y-10 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--accent-orange-text)] uppercase tracking-wider font-semibold">
                Verified Outcomes
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
                Selected Embedded Engineering Deployments
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-orange-text)] hover:underline cursor-pointer"
            >
              <span>View all case studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)] border-t border-b border-[var(--border-color)]">
            {fdeCaseStudies.slice(0, 2).map((cs, idx) => (
              <div
                key={cs.id}
                onClick={() => (onSelectCaseStudy ? onSelectCaseStudy(cs.slug) : onNavigate('/work'))}
                className={`py-8 ${idx === 1 ? 'md:pl-8' : 'md:pr-4'} cursor-pointer space-y-5 group flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                    <span>{cs.clientAnonymousName}</span>
                    <span className="text-[var(--accent-orange-text)] font-bold tabular-nums">
                      {cs.scaleEvidence.primaryMetric}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-orange-text)] transition-colors leading-snug">
                    {cs.title}
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-xs uppercase text-[var(--text-muted)] block">
                        Problem
                      </span>
                      <p className="text-[var(--text-secondary)] leading-relaxed">{cs.context}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-[var(--accent-secondary)] block">
                        Verified Outcome
                      </span>
                      <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                        {cs.operationalImpact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-primary)]">
                  <span>Inspect System Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-orange-text)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM OCEAN DEPTH CTA */}
      <section className="home-section py-24 sm:py-28 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <SectionBackdrop mode="convergence" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-orange-text)] font-semibold">
            Start a Conversation
          </p>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">
            Ready to put an embedded engineering team on your bottleneck?
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-xl mx-auto leading-relaxed">
            Share your workflow constraints and target systems. Senior engineers will review feasibility and outline how a prototype sprint or embedded engineering pod would fit.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="site-button button-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Discuss a business workflow</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
