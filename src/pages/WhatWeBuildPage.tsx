import { useState } from 'react';
import { RoutePath } from '../types';
import { capabilities } from '../data/capabilities';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { ComposableArchitectureVisual } from '../components/visuals/WorkflowVisuals';
import {
  ArrowRight,
  Layers,
  CheckCircle2,
  GitMerge,
  FileText,
  Workflow,
  Eye,
  Database,
  Lock,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhatWeBuildPageProps {
  onNavigate: (path: RoutePath) => void;
}

interface BusinessChallenge {
  id: string;
  title: string;
  problemSummary: string;
  expectedOutcome: string;
  combinedCapabilities: {
    capIndex: number;
    roleInSystem: string;
  }[];
  integrationExamples: string[];
  deliverables: string[];
  primaryRoute: RoutePath;
  primaryRouteLabel: string;
}

const BUSINESS_CHALLENGES: BusinessChallenge[] = [
  {
    id: 'manual-backoffice',
    title: 'Manual triage across emails, PDFs, spreadsheets, and legacy ERPs',
    problemSummary:
      'Operations teams spend significant manual hours extracting numbers from incoming emails and attachments, checking proprietary formulas, and re-entering records into Enterprise Resource Planning (ERP) or SQL systems.',
    expectedOutcome:
      'Straight-through processing with mandatory human review gates for exceptions, full citation traceability, and zero manual re-entry.',
    combinedCapabilities: [
      { capIndex: 1, roleInSystem: 'Document parsing & bounding-box extraction' },
      { capIndex: 0, roleInSystem: 'Deterministic rule routing & human approval gates' },
      { capIndex: 3, roleInSystem: 'Bidirectional ERP & SQL ledger synchronization' }
    ],
    integrationExamples: [
      'Exchange / IMAP email & Secure File Transfer Protocol (SFTP) intake connected directly into SAP, Oracle, or internal PostgreSQL databases',
      'Human-in-the-loop triage workbench showing extracted figures alongside highlighted source PDF regions'
    ],
    deliverables: [
      'Automated intake & extraction microservices',
      'Operator exception review workbench',
      'Bidirectional ERP & database connectors',
      'Immutable compliance audit log'
    ],
    primaryRoute: '/fde',
    primaryRouteLabel: 'See how embedded teams deliver this'
  },
  {
    id: 'complex-documents',
    title: 'Critical knowledge locked inside dense contracts, filings, or manuals',
    problemSummary:
      'Multi-hundred-page legal covenants, clinical records, and technical specifications defeat standard Optical Character Recognition (OCR) and keyword search, leaving analysts verifying clauses manually.',
    expectedOutcome:
      'Sub-second semantic retrieval and structured entity extraction where every answer is anchored to exact page and paragraph coordinates.',
    combinedCapabilities: [
      { capIndex: 1, roleInSystem: 'Hybrid vector + graph Retrieval-Augmented Generation (RAG)' },
      { capIndex: 4, roleInSystem: 'Domain-tuned Small Language Models (SLMs) on private VPC/on-prem' },
      { capIndex: 2, roleInSystem: 'Role-Based Access Control (RBAC) search & verification UI' }
    ],
    integrationExamples: [
      'Qdrant vector indexing paired with Neo4j entity graphs and Single Sign-On (SSO/SAML) permissions',
      'Synchronized side-by-side document viewer with one-click citation verification before downstream writes'
    ],
    deliverables: [
      'Spatial layout parser & indexing pipeline',
      'Citation-grounded RAG query API',
      'Domain-tuned open-weight model adapters',
      'Reviewer verification web application'
    ],
    primaryRoute: '/document-intelligence',
    primaryRouteLabel: 'Explore Document Intelligence'
  },
  {
    id: 'physical-edge-vision',
    title: 'Visual inspection, motion tracking, or sensor monitoring without cloud lag',
    problemSummary:
      'Factory quality stations, clinics, and field facilities require instant frame-by-frame analysis on local tablets or industrial cameras where internet bandwidth is limited or data cannot leave the site.',
    expectedOutcome:
      'Deterministic on-device inference running locally in real time with instant operator alerts and offline-first telemetry sync.',
    combinedCapabilities: [
      { capIndex: 5, roleInSystem: 'On-device TensorRT / ONNX vision & kinematic pipelines' },
      { capIndex: 2, roleInSystem: 'Tablet operator dashboard with local SQLite persistence' },
      { capIndex: 3, roleInSystem: 'Asynchronous sync to central plant or clinical ERPs' }
    ],
    integrationExamples: [
      'Local tablet cameras and industrial optical lines feeding Open Neural Network Exchange (ONNX) / TensorRT runtimes',
      'Bluetooth Low Energy (BLE) sensor coordination and Over-the-Air (OTA) fleet updates'
    ],
    deliverables: [
      'Optimized edge inference runtime',
      'Real-time defect or kinematic tracking engine',
      'Field operator tablet / station UI',
      'Offline sync & OTA fleet tooling'
    ],
    primaryRoute: '/computer-vision',
    primaryRouteLabel: 'Explore Vision & Edge AI'
  },
  {
    id: 'high-volume-data-privacy',
    title: 'High-volume anomaly detection, forecasting, or strict data-residency AI',
    problemSummary:
      'Financial ledgers, supply chains, and regulated industries process millions of events or records daily and cannot send sensitive operational data to third-party public model endpoints.',
    expectedOutcome:
      'Real-time anomaly scoring, inventory forecasting, and self-hosted private models deployed exclusively inside your Virtual Private Cloud (VPC) or on-premises cluster.',
    combinedCapabilities: [
      { capIndex: 3, roleInSystem: 'Streaming ledger anomaly & multi-horizon forecasting pipelines' },
      { capIndex: 4, roleInSystem: 'Self-hosted quantized models via vLLM / TensorRT-LLM' },
      { capIndex: 0, roleInSystem: 'Automated escalation queues & procurement drafts' }
    ],
    integrationExamples: [
      'Apache Kafka transaction streams scored by custom PyTorch Deep Neural Networks (DNNs) inside isolated VPCs',
      'Time-series forecasting models generating safety-stock purchase order drafts directly inside procurement ERPs'
    ],
    deliverables: [
      'Private VPC or on-premises inference cluster',
      'Streaming anomaly or forecasting pipeline',
      'Compliance escalation & audit dashboard',
      '100% client-owned code & model weights'
    ],
    primaryRoute: '/on-prem-ai',
    primaryRouteLabel: 'Explore On-Prem & Private AI'
  }
];

export function WhatWeBuildPage({ onNavigate }: WhatWeBuildPageProps) {
  const [browseMode, setBrowseMode] = useState<'challenge' | 'capability'>('challenge');
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [activeCapIdx, setActiveCapIdx] = useState(0);

  const activeChallenge = BUSINESS_CHALLENGES[activeChallengeIdx];
  const activeCap = capabilities[activeCapIdx];

  const getCapIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Workflow;
      case 1:
        return FileText;
      case 2:
        return Layers;
      case 3:
        return Database;
      case 4:
        return Lock;
      default:
        return Eye;
    }
  };

  return (
    <div
      id="what-we-build-chapter"
      className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]"
    >
      {/* 0. Ambient Canvas */}
      <WorldCanvas mode="matrix" opacity={0.22} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Capabilities & Custom AI Platforms"
          title="What we engineer."
          titleAccent="Built around your operational bottleneck."
          subtitle="We combine workflow automation, document intelligence, full-stack enterprise applications, on-premises model hosting, and edge computer vision into unified production systems tailored to your business constraints."
          ctaText="Discuss a business workflow"
          ctaRoute="/contact"
          secondaryCtaText="Explore selected work"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[]}
        />
      </section>

      {/* 2. Composable Systems Editorial Split + Interactive Topology Visual */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-orange-text)] font-semibold">
              <GitMerge className="w-4 h-4" />
              <span>Composable Systems Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Multiple capabilities combine into one tailored production system.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Real business operations rarely fit a single technical box. A single engagement often pairs{' '}
              <strong className="text-[var(--text-primary)]">Document Intelligence</strong> with{' '}
              <strong className="text-[var(--text-primary)]">Workflow State Machines</strong>,{' '}
              <strong className="text-[var(--text-primary)]">Enterprise Resource Planning (ERP) Connectors</strong>, and{' '}
              <strong className="text-[var(--text-primary)]">Private On-Premises Models</strong>—delivered as one cohesive platform.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setBrowseMode('challenge')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  browseMode === 'challenge'
                    ? 'bg-[#FF5A1F] text-[#061421] shadow-sm'
                    : 'bg-transparent border border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Browse by Business Challenge
              </button>
              <button
                type="button"
                onClick={() => setBrowseMode('capability')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  browseMode === 'capability'
                    ? 'bg-[#FF5A1F] text-[#061421] shadow-sm'
                    : 'bg-transparent border border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Browse by Engineering Capability
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ComposableArchitectureVisual
              activeLayers={
                browseMode === 'challenge'
                  ? activeChallenge.combinedCapabilities.map((c) => c.capIndex)
                  : [activeCapIdx]
              }
              modeLabel={
                browseMode === 'challenge'
                  ? `Challenge 0${activeChallengeIdx + 1}`
                  : activeCap.title
              }
            />
          </div>
        </div>
      </section>

      {/* 3. Interactive Explorer: Two Navigation Routes */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[var(--border-color)]">
          <div>
            <p className="text-xs font-mono text-[var(--accent-orange-text)] uppercase tracking-wider font-semibold">
              {browseMode === 'challenge'
                ? 'Route 01 · Browse by Business Challenge'
                : 'Route 02 · Browse by Engineering Capability'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mt-1">
              What challenge are you trying to solve?
            </h2>
          </div>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            {browseMode === 'challenge'
              ? 'Select a bottleneck to see combined capabilities & deliverables'
              : 'Select an engineering domain to inspect architecture & deliverables'}
          </span>
        </div>

        {/* MODE A: BROWSE BY BUSINESS CHALLENGE */}
        {browseMode === 'challenge' && (
          <div className="space-y-10">
            {/* Flush Hairline Challenge Selector Tabs */}
            <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
              {BUSINESS_CHALLENGES.map((challenge, idx) => {
                const isActive = activeChallengeIdx === idx;
                return (
                  <button
                    key={challenge.id}
                    type="button"
                    onClick={() => setActiveChallengeIdx(idx)}
                    className={`p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-3 relative ${
                      isActive
                        ? 'bg-[var(--bg-surface)]'
                        : 'bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)]/80'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                        isActive ? 'w-full bg-[#FF5A1F]' : 'w-0'
                      }`}
                    />
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span
                        className={`font-bold tabular-nums ${
                          isActive
                            ? 'text-[var(--accent-orange-text)]'
                            : 'text-[var(--accent-secondary)]'
                        }`}
                      >
                        Challenge 0{idx + 1}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
                        {challenge.combinedCapabilities.length} layers
                      </span>
                    </div>
                    <span className="text-sm font-display font-bold text-[var(--text-primary)] leading-snug">
                      {challenge.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Challenge Unboxed Editorial Dossier */}
            <motion.div
              key={activeChallenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 pb-8 border-b border-[var(--border-color)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
                <div className="space-y-4 max-w-3xl">
                  <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-semibold tracking-wider">
                    Operational Bottleneck 0{activeChallengeIdx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                    {activeChallenge.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {activeChallenge.problemSummary}
                  </p>
                  <div className="pt-3 border-t border-[var(--border-color)] space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-secondary)] font-semibold">
                      Target Business Outcome
                    </div>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed font-medium">
                      {activeChallenge.expectedOutcome}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(activeChallenge.primaryRoute)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF5A1F] hover:bg-[#E0440E] text-[#061421] font-display font-bold text-xs tracking-tight transition-all cursor-pointer shadow-sm self-start shrink-0"
                >
                  <span>{activeChallenge.primaryRouteLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#061421]" />
                </button>
              </div>

              {/* Composed Architecture Layer Matrix (Unboxed hairline grid) */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  Combined Capabilities in This System
                </div>
                <div className="border-t border-b border-[var(--border-color)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
                  {activeChallenge.combinedCapabilities.map((item) => {
                    const cap = capabilities[item.capIndex];
                    const CapIcon = getCapIcon(item.capIndex);
                    return (
                      <button
                        key={cap.id}
                        type="button"
                        onClick={() => {
                          setActiveCapIdx(item.capIndex);
                          setBrowseMode('capability');
                        }}
                        className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 text-left space-y-2 transition-colors cursor-pointer group hover:bg-[var(--bg-surface)]/40"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[var(--accent-secondary)] flex items-center gap-2">
                            <CapIcon className="w-4 h-4 text-[var(--accent-orange-text)]" />
                            <span>Capability 0{item.capIndex + 1}</span>
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-orange-text)] transition-colors">
                            Inspect →
                          </span>
                        </div>
                        <div className="text-base font-display font-bold text-[var(--text-primary)]">
                          {cap.title}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          Role: {item.roleInSystem}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Concrete Deliverables & Integration Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--accent-secondary)] uppercase font-semibold tracking-wider">
                    Integration Examples
                  </span>
                  <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {activeChallenge.integrationExamples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <Cpu className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 md:pl-8 md:border-l border-[var(--border-color)]">
                  <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-semibold tracking-wider">
                    Concrete Deliverables
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeChallenge.deliverables.map((del) => (
                      <li
                        key={del}
                        className="text-xs sm:text-sm font-medium text-[var(--text-primary)] flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange-text)] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODE B: BROWSE BY ENGINEERING CAPABILITY */}
        {browseMode === 'capability' && (
          <div className="space-y-10">
            <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
              {capabilities.map((cap, idx) => {
                const isSelected = activeCapIdx === idx;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveCapIdx(idx)}
                    className={`py-4 px-3.5 text-xs font-mono transition-all cursor-pointer flex flex-col justify-between text-left space-y-2 relative ${
                      isSelected
                        ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold'
                        : 'bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                        isSelected ? 'w-full bg-[#FF5A1F]' : 'w-0'
                      }`}
                    />
                    <span className="tabular-nums text-[var(--accent-orange-text)] font-bold">
                      0{idx + 1}
                    </span>
                    <span className="line-clamp-2 leading-tight font-sans font-semibold">{cap.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Capability Editorial Panel */}
            <motion.div
              key={activeCap.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 pb-8 border-b border-[var(--border-color)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-color)]">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-semibold tracking-wider">
                    Capability Domain 0{activeCapIdx + 1} · Business Outcome
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                    {activeCap.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--accent-secondary)]">
                    {activeCap.headline}
                  </p>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                    {activeCap.description}
                  </p>
                </div>

                {activeCap.relatedRoute && (
                  <button
                    type="button"
                    onClick={() => onNavigate(activeCap.relatedRoute!)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF5A1F] hover:bg-[#E0440E] text-[#061421] font-display font-bold text-xs tracking-tight transition-all cursor-pointer shadow-sm self-start lg:self-auto shrink-0"
                  >
                    <span>Explore Dedicated Page</span>
                    <ArrowRight className="w-4 h-4 text-[#061421]" />
                  </button>
                )}
              </div>

              {/* Core Engineering Mechanics (Hairline Columns) */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  Core Engineering Mechanics
                </div>
                <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
                  {activeCap.coreConcepts.map((concept, cIdx) => (
                    <div key={cIdx} className="p-5 bg-[var(--bg-surface)] space-y-2">
                      <div className="text-[var(--accent-secondary)] font-display font-bold text-sm">
                        {concept.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Runtimes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--accent-secondary)] uppercase font-semibold tracking-wider">
                    Concrete Deliverables &amp; Integration Examples
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {activeCap.architecturePoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[var(--accent-orange-text)] font-bold mt-0.5">→</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5 md:pl-8 md:border-l border-[var(--border-color)]">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Production Runtimes &amp; Stack
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-secondary)]">
                      {activeCap.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeCap.deliverables && (
                    <div className="space-y-2.5 pt-3 border-t border-[var(--border-color)]">
                      <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-semibold tracking-wider block">
                        What You Receive
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeCap.deliverables.map((del, dIdx) => (
                          <li
                            key={dIdx}
                            className="text-xs text-[var(--text-primary)] flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-orange-text)] shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </section>

      {/* 4. Direct Links to Detailed Capability Destinations (Hairline Index) */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div>
              <div className="text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider font-semibold">
                Dedicated Capability Guides
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                Explore All Six Engineering Domains
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Often combined within a single client platform
            </span>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {capabilities.map((cap, idx) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => cap.relatedRoute && onNavigate(cap.relatedRoute)}
                className="p-6 sm:p-7 bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer flex flex-col justify-between space-y-5 group text-left relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                    <span className="tabular-nums font-bold text-[var(--accent-orange-text)]">0{idx + 1}</span>
                    <span className="text-[var(--accent-secondary)] uppercase">Engineering Domain</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-orange-text)] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-primary)]">
                  <span>View Architecture &amp; Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[var(--accent-orange-text)]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Consultation Callout */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-widest block">
            Architecture Evaluation
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Need a unified system across multiple capabilities?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            Share your operational workflow, data residency boundaries, and existing enterprise systems. We will map the exact architecture, deliverables, and integration path.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] text-[#061421] font-display font-bold text-sm tracking-tight transition-all cursor-pointer shadow-md"
            >
              <span>Discuss a business workflow</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
