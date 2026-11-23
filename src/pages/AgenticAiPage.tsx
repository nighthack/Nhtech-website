import { ArrowRight, FileText, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { AgentWorkflowSimulator } from '../components/architecture/AgentWorkflowSimulator';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { RoutePath } from '../types';

interface AgenticAiPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function AgenticAiPage({ onNavigate }: AgenticAiPageProps) {
  return (
    <div id="agentic-ai-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Dynamic World Canvas */}
      <WorldCanvas mode="enterprise" opacity={0.22} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader

          title="Agents that do the work."
          titleAccent="People approve what matters."
          subtitle="Agents that read your inboxes and documents, use your tools, and stop for a person before anything risky."
          ctaText="Talk to us about an agent"
          ctaRoute="/contact"
          secondaryCtaText="Read the case study"
          secondaryCtaRoute="/work/enterprise-workflow-intelligence"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'Workflow', value: 'Fixed steps' },
            { label: 'Review', value: 'Human sign-off' },
            { label: 'History', value: 'Full audit log' },
          ]}
        />
      </section>

      {/* 2. Interactive DAG Agent Workflow Simulator */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container space-y-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div>
              <span className="text-xs font-mono text-[var(--accent-orange-text)] font-bold">
                Execution Sandbox · 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                Deterministic multi-step agent state machine
              </h2>
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)]">
              Live runtime simulation with human checkpoints
            </div>
          </div>

          <AgentWorkflowSimulator />
        </div>
      </section>

      {/* 3. The 3 Architectural Governance Boundaries */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-10 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[var(--accent-secondary)] font-semibold">Enterprise Governance</span>
            <MaskedHeading as="h2" className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              How agents are constrained in production.
            </MaskedHeading>
            <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              AI models make mistakes, so they never get unlimited access to your systems. We enforce strict state machine boundaries, explicit permission scopes, and replayable execution audit logs.
            </ScrollText>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-3 gap-px">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[#FF4800]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Bounded tool permissions</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                Agents never run with unrestricted root access. Every tool invocation uses strictly scoped OAuth/mTLS tokens, rate-limited endpoints, and rigorous parameter schema validation.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                Scoped IAM &amp; mTLS credentials
              </div>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-secondary)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Human-in-the-loop gates</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                High-consequence operations (financial transactions above limits, database deletions, high-entropy classifications) pause automatically for human operator verification.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                Exception triage workbenches
              </div>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-secondary)]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Immutable decision logs</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                Every step, prompt token, intermediate thought, tool call argument, and operator sign-off is logged into an immutable append-only event store for compliance auditability.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                OpenTelemetry &amp; SIEM streaming
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            Agent Architecture Roadmap
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Have a process you’d like an agent to run?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            Tell us the process. We’ll show you which steps an agent can take over.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
