import {
Cpu,
Database,
FileInput,
ShieldCheck,
Terminal,
UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { RoutePath } from '../../types';
import { SectionBackdrop } from './SectionBackdrop';
import { StageGroup } from './StageGroup';

interface AgenticExecutionFlowSectionProps {
  onNavigate: (path: RoutePath) => void;
}

interface ChainStep {
  id: string;
  stepNumber: string;
  title: string;
  subhead: string;
  role: string;
  systemsAccessed: string[];
  whatHappens: string;
  sampleData: string;
  requiresHuman: boolean;
  icon: typeof FileInput;
}

const EXECUTION_CHAIN: ChainStep[] = [
  {
    id: 'input',
    stepNumber: '01',
    title: 'Input',
    subhead: 'Event & Document Ingestion',
    role: 'Incoming business payloads arrive from email, file feeds, portals, or system webhooks.',
    systemsAccessed: ['Internal API Gateway', 'SFTP Ingestion', 'Email / Document Queue'],
    whatHappens:
      'The system ingests incoming operational payloads (invoices, contracts, valuation sheets, or customer requests) and validates input structure before processing.',
    sampleData: 'EVENT: invoice_discrepancy_check | ID: INV-2026-8812 | Source: SFTP_BATCH',
    requiresHuman: false,
    icon: FileInput
  },
  {
    id: 'ai-processing',
    stepNumber: '02',
    title: 'AI processing',
    subhead: 'Extraction & Rule Evaluation',
    role: 'Calibrated models extract fields with source citations and evaluate deterministic business rules.',
    systemsAccessed: ['Fine-Tuned SLM / LLM Router', 'Document Vector Index', 'Deterministic Rule Engine'],
    whatHappens:
      'Structured extraction parses line items, links extracted values back to source page coordinates, and compares figures against your master rate cards and policies.',
    sampleData: 'CHECK: Line item #4 variance detected ($210/hr billed vs $185/hr contract rate).',
    requiresHuman: false,
    icon: Cpu
  },
  {
    id: 'human-review',
    stepNumber: '03',
    title: 'Human review',
    subhead: 'Mandatory Approval Gate',
    role: 'Exceptions, low-confidence extractions, or threshold breaches pause for operator sign-off.',
    systemsAccessed: ['Operator Triage Workbench', 'Inline PDF Diff Viewer', 'Role-Based Approval Queue'],
    whatHappens:
      'Operators inspect a structured side-by-side comparison with highlighted source citations and approve, adjust, or reject before any downstream database mutation occurs.',
    sampleData: 'GATE: Controller approved adjusted voucher $15,950.00 | Reason: Contract variance.',
    requiresHuman: true,
    icon: UserCheck
  },
  {
    id: 'system-action',
    stepNumber: '04',
    title: 'System action',
    subhead: 'Core ERP Write & Audit Log',
    role: 'Approved actions commit to enterprise systems of record alongside an immutable audit trail.',
    systemsAccessed: ['SAP / ERP Connector', 'PostgreSQL Ledger', 'Immutable Audit Log'],
    whatHappens:
      'The system writes the verified transaction to your core Enterprise Resource Planning (ERP) or SQL ledger and logs the inputs, model version, and approver identity.',
    sampleData: 'COMMIT: ledger_voucher("PV-44109", amount=$15950.00) -> 200 OK | AUDIT LOGGED',
    requiresHuman: false,
    icon: Database
  }
];

export function AgenticExecutionFlowSection({ onNavigate }: AgenticExecutionFlowSectionProps) {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(2);
  const currentStep = EXECUTION_CHAIN[selectedStepIndex];

  return (
    <section
      id="agentic-execution-chain-section"
      className="home-section py-20 sm:py-28 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] relative"
    >
      <SectionBackdrop mode="routing" />
      <div className="site-container space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-3 max-w-2xl text-left">

            <h2 className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              Input → AI Processing →{' '}
              <span className="text-[var(--accent-secondary)]">
                Human Review → System Action
              </span>
            </h2>
          </div>

          <p
            className="text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-md leading-relaxed text-left"
          >
            AI models never write unverified changes straight into production records. Every automated workflow routes uncertain or high-value actions through explicit human approval and audit logging.
          </p>
        </div>

        {/* Connected 4-Stage Visual Flow Track */}
        <div className="space-y-10">
          <div className="relative">
            <div aria-hidden="true"
              className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[var(--border-color)]"
            />
            <StageGroup label="Workflow stages" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {EXECUTION_CHAIN.map((step, idx) => {
                const isSelected = selectedStepIndex === idx;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setSelectedStepIndex(idx)}
                    aria-pressed={isSelected}
                    aria-controls="fde-workflow-detail"
                    data-suggested={idx === (selectedStepIndex + 1) % EXECUTION_CHAIN.length}
                    className="stage-control text-left transition-colors cursor-pointer group space-y-3 pt-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors relative z-10 ${
                            isSelected
                              ? 'bg-[#FF4800] border-[#FF4800] text-[#061421] shadow-md'
                              : step.requiresHuman
                              ? 'bg-[var(--bg-base)] border-[#FF4800]/60 text-[var(--accent-orange-text)]'
                              : 'bg-[var(--bg-base)] border-[var(--border-hover)] text-[var(--accent-secondary)] group-hover:border-[#FF4800]'
                          }`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            isSelected ? 'text-[var(--accent-orange-text)]' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                      </div>

                      <span
                        className={`text-xs tracking-wider ${
                          step.requiresHuman
                            ? 'text-[var(--accent-orange-text)] font-bold'
                            : 'text-[var(--accent-secondary)]'
                        }`}
                      >
                        {step.requiresHuman ? 'Human Gate' : 'Automated'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-display font-bold text-[var(--text-primary)]">
                        {step.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-snug">
                        {step.subhead}
                      </p>
                      <div className="text-xs text-[var(--text-muted)] truncate pt-1">
                        {step.systemsAccessed[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </StageGroup>
          </div>

          {/* Unboxed Detailed Inspector Spread */}
          <motion.div id="fde-workflow-detail" role="region" aria-label="Workflow stages detail"
            key={currentStep.id}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-b border-[var(--border-color)] py-8 sm:py-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:divide-x divide-[var(--border-color)]">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5 text-left lg:pr-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md font-bold bg-[#FF4800] text-[#061421] tabular-nums">
                      Step {currentStep.stepNumber} · {currentStep.title}
                    </span>
                    <span className="text-[var(--text-muted)] ">
                      {currentStep.subhead}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] leading-snug">
                    {currentStep.role}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {currentStep.whatHappens}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs text-[var(--text-muted)] tracking-wider block">
                    System Components Connected
                  </span>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--text-primary)]">
                    {currentStep.systemsAccessed.map((sys) => (
                      <span key={sys} className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                        <span>{sys}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Trace Console */}
              <div className="lg:col-span-5 lg:pl-8 space-y-4 text-left">
                <div className="p-6 rounded-2xl bg-[#061421] border border-[#173D5B] text-[#F5F8FA] space-y-4 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2 font-semibold">
                      <Terminal className="w-4 h-4 text-[#FF7A45]" />
                      <span>Example</span>
                    </div>
                    <span className="text-[#75A4B5] font-semibold">Audited</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B2030] border border-[#24536F]/50 text-xs text-[#F5F8FA] overflow-x-auto leading-relaxed">
                    {currentStep.sampleData}
                  </div>

                  <div className="text-xs leading-relaxed">
                    {currentStep.requiresHuman ? (
                      <div className="flex items-start gap-2 text-[#FF7A45] font-medium">
                        <UserCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                          Human approval is mandatory before downstream system writes execute. no unverified database mutations.
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-[#D1E0E6]">
                        <ShieldCheck className="w-4 h-4 text-[#75A4B5] shrink-0 mt-0.5" />
                        <span>
                          Bounded execution with strict schema validation, deterministic fallback routing, and immutable event logging.
                        </span>
                      </div>
                    )}
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
