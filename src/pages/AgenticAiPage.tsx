import { useState } from 'react';
import { RoutePath } from '../types';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { AgentWorkflowSimulator } from '../components/architecture/AgentWorkflowSimulator';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { Lock, ShieldCheck, FileText, ArrowRight, Terminal, CheckCircle2, Play, RefreshCw, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

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
          tag="Agentic Systems & Deterministic State Engines"
          title="AI that does the work,"
          titleAccent="not just the talking."
          subtitle="Autonomous execution engines designed to live inside real enterprise operations—operating tools, evaluating context, respecting permission boundaries, and escalating to human checkpoints."
          ctaText="Initiate Agentic Assessment"
          ctaRoute="/contact"
          secondaryCtaText="Inspect WYZ Case Study"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'Orchestration', value: 'Deterministic DAG' },
            { label: 'Checkpoints', value: 'Mandatory Human Gates' },
            { label: 'Partnership', value: 'OpenAI Select' },
          ]}
        />
      </section>

      {/* 2. Interactive DAG Agent Workflow Simulator */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div>
              <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold">
                Execution Sandbox · 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                Deterministic Multi-Step Agent State Machine
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[var(--accent-secondary)] uppercase font-semibold">Enterprise Governance</span>
            <MaskedHeading as="h2" className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              How agents are constrained in production.
            </MaskedHeading>
            <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              Stochastic language models cannot be granted unrestricted API access. We enforce strict state machine boundaries, explicit permission scopes, and replayable execution audit logs.
            </ScrollText>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-3 gap-px">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[#FF5A1F]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Bounded Tool Permissions</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                Agents never run with unrestricted root access. Every tool invocation uses strictly scoped OAuth/mTLS tokens, rate-limited endpoints, and rigorous parameter schema validation.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                Scoped IAM &amp; mTLS credentials
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-secondary)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Human-in-the-Loop Gates</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                High-consequence operations (financial transactions above limits, database deletions, high-entropy classifications) pause automatically for human operator verification.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                Exception triage workbenches
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="p-7 bg-[var(--bg-surface-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-secondary)]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Immutable Decision Logs</h3>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-widest block">
            Agent Architecture Roadmap
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to architect deterministic agent workflows?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            We evaluate your existing operational friction, map decision DAGs, and construct custom autonomous systems.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] text-[#061421] font-display font-bold text-sm tracking-tight transition-all cursor-pointer shadow-md"
            >
              <span>Schedule Architecture Session</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
