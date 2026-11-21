import { useState } from 'react';
import {
  FileSearch,
  GitBranch,
  Cpu,
  Layers,
  Eye,
  Activity,
  Lock
} from 'lucide-react';

export function FdeIntegrationBlueprintVisual() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      num: '01',
      title: 'Frame Workflow',
      metric: 'Gate 01',
      detail: 'Map incoming email/PDF triggers, legacy rules & edge cases inside client stack.'
    },
    {
      num: '02',
      title: 'Guardrail State DAG',
      metric: 'Gate 02',
      detail: 'Benchmark SLMs vs frontier models against domain samples with strict schemas.'
    },
    {
      num: '03',
      title: 'ERP & Gate UI',
      metric: 'Gate 03',
      detail: 'Build SAP/Oracle/SQL connectors and human approval workbenches inside your repo.'
    },
    {
      num: '04',
      title: 'VPC Handover',
      metric: 'Gate 04',
      detail: 'Deploy inside your cluster with full CI/CD observability and 100% client IP ownership.'
    }
  ];

  const current = phases[activePhase];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#173D5B] bg-[#061421] text-[#F5F8FA] p-5 sm:p-6 shadow-xl space-y-5 text-left">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(117, 164, 181, 0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono pb-3 border-b border-white/10">
        <span className="text-[#FF7A45] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Embedded Pod Integration Blueprint</span>
        </span>
        <span className="text-[#A6C3CE] tabular-nums">{current.metric}</span>
      </div>

      {/* 4 Phase Steps */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5">
        {phases.map((phase, idx) => {
          const isActive = activePhase === idx;
          return (
            <button
              key={phase.num}
              type="button"
              onClick={() => setActivePhase(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#173D5B]/90 border-[#FF5A1F]'
                  : 'bg-[#0B2030] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A6C3CE] mb-1">
                <span className={isActive ? 'text-[#FF7A45] font-bold' : ''}>{phase.num}</span>
                <span className="tabular-nums">{phase.metric}</span>
              </div>
              <div className="text-xs font-display font-bold text-[#F5F8FA]">
                {phase.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Blueprint Detail */}
      <div className="relative z-10 p-4 rounded-xl bg-[#0B2030] border border-[#24536F]/60 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#75A4B5] uppercase">Active Pod Sprint Scope</span>
          <span className="text-[#FF7A45] font-bold">Phase {current.num}</span>
        </div>
        <p className="text-xs text-[#D1E0E6] leading-relaxed">{current.detail}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#A6C3CE] pt-1">
        <span>Inside Client Repository</span>
        <span className="text-[#F5F8FA]">Full IP Handover</span>
      </div>
    </div>
  );
}

/**
 * 4. ComposableArchitectureVisual
 * Dynamic node topology for WhatWeBuildPage showing which capability layers
 * compose to solve the currently selected business challenge or domain.
 */
interface ComposableArchitectureVisualProps {
  activeLayers: number[];
  modeLabel: string;
}

export function ComposableArchitectureVisual({
  activeLayers,
  modeLabel
}: ComposableArchitectureVisualProps) {
  const modules = [
    { idx: 0, title: 'Agentic Workflow Engines', short: 'State Machines', icon: GitBranch },
    { idx: 1, title: 'Document Intelligence', short: 'Spatial RAG', icon: FileSearch },
    { idx: 2, title: 'AI-First Applications', short: 'Review Workbenches', icon: Layers },
    { idx: 3, title: 'Complex ERP & Data Systems', short: 'ERP / SQL / Kafka', icon: Activity },
    { idx: 4, title: 'On-Prem & Sovereign Models', short: 'VPC / Self-Hosted', icon: Lock },
    { idx: 5, title: 'Vision & Edge AI', short: 'On-Device Edge', icon: Eye }
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#173D5B] bg-[#061421] text-[#F5F8FA] p-5 sm:p-6 shadow-xl space-y-4 text-left">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(117, 164, 181, 0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-white/10 text-[11px] font-mono">
        <span className="text-[#FF7A45] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          <span>Composable System Topology</span>
        </span>
        <span className="text-[#A6C3CE] truncate max-w-[180px]">{modeLabel}</span>
      </div>

      {/* 6 Capability Layers Lighting Up Based on Selected Challenge / Domain */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isHighlighted = activeLayers.includes(mod.idx);
          return (
            <div
              key={mod.title}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isHighlighted
                  ? 'bg-[#173D5B]/90 border-[#FF5A1F] shadow-sm'
                  : 'bg-[#0B2030]/60 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isHighlighted ? 'text-[#FF7A45]' : 'text-[#75A4B5]'
                  }`}
                />
                <span
                  className={`text-[10px] font-mono ${
                    isHighlighted ? 'text-[#FF7A45] font-bold' : 'text-[#A6C3CE]'
                  }`}
                >
                  {isHighlighted ? 'ACTIVE' : `L0${mod.idx + 1}`}
                </span>
              </div>
              <div className="text-xs font-display font-bold text-[#F5F8FA] truncate">
                {mod.short}
              </div>
              <div className="text-[10px] font-mono text-[#A6C3CE] truncate">
                {mod.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cohesive Deployment Target Footer */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
        <span className="text-[#D1E0E6]">Cohesive Production Platform</span>
        <span className="text-[#FF7A45] font-semibold">VPC · On-Prem · Edge</span>
      </div>
    </div>
  );
}
