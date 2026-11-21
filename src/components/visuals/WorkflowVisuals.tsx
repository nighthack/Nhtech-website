import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  FileSearch,
  ShieldCheck,
  Database,
  CheckCircle2,
  GitBranch,
  Cpu,
  Layers,
  Eye,
  Activity,
  Lock
} from 'lucide-react';

/**
 * 1. ValuationPipelineDiagram
 * Replaces generic glass-prism stock photography with an interactive, animated
 * straight-through workflow pipeline visualization demonstrating document intake,
 * spatial citation anchoring, human exception gates, and ERP ledger commit.
 */
interface ValuationPipelineDiagramProps {
  activeStageIndex: number;
  onSelectStage?: (index: number) => void;
}

export function ValuationPipelineDiagram({
  activeStageIndex,
  onSelectStage
}: ValuationPipelineDiagramProps) {
  const nodes = [
    {
      idx: 0,
      label: 'Intake',
      sub: 'Mail · SFTP',
      icon: Mail,
      telemetry: '14p PDF + CSV Queued'
    },
    {
      idx: 1,
      label: 'Extract',
      sub: 'Rules + Anchors',
      icon: FileSearch,
      telemetry: 'Conf 0.992 · P4 Table B'
    },
    {
      idx: 2,
      label: 'Human Gate',
      sub: 'Exception Diff',
      icon: ShieldCheck,
      telemetry: '+1.8% Variance Review'
    },
    {
      idx: 3,
      label: 'ERP Write',
      sub: 'Audit Ledger',
      icon: Database,
      telemetry: 'Voucher #VL-9921'
    }
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#173D5B] bg-[#061421] text-[#F5F8FA] p-5 sm:p-6 shadow-xl space-y-5 text-left">
      {/* Subtle Architectural Coordinate Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(rgba(117, 164, 181, 0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header Strip */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 border-b border-white/10 text-[11px] font-mono">
        <span className="text-[var(--accent-on-dark)] font-semibold uppercase tracking-wider">
          Valuation Routing Topology
        </span>
        <span className="text-[#A6C3CE] tabular-nums">
          Stage 0{activeStageIndex + 1} / 04 · Audit-Ready
        </span>
      </div>

      {/* Connected 4-Node Signal Flow */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeStageIndex === node.idx;
          const isPassed = node.idx < activeStageIndex;

          return (
            <button
              key={node.label}
              type="button"
              onClick={() => onSelectStage?.(node.idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                isActive
                  ? 'bg-[#173D5B]/85 border-[var(--accent-on-dark)] shadow-sm'
                  : isPassed
                  ? 'bg-[#0B2030] border-[#47849B]/55'
                  : 'bg-[#0B2030]/75 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-[var(--accent-on-dark)]'
                      : isPassed
                      ? 'text-[#75A4B5]'
                      : 'text-[#A6C3CE]/70'
                  }`}
                />
                <span className="text-[10px] font-mono tabular-nums text-[#A6C3CE]">
                  0{node.idx + 1}
                </span>
              </div>
              <div>
                <div className="text-xs font-display font-bold text-[#F5F8FA]">
                  {node.label}
                </div>
                <div className="text-[10px] font-mono text-[#A6C3CE] truncate">
                  {node.sub}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Document-to-ERP Inspection Canvas */}
      <div className="relative z-10 rounded-xl bg-[#0B2030] border border-[#24536F]/60 p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#A6C3CE]">
          <span>Active Trace Window</span>
          <span className="text-[var(--accent-on-dark)] font-semibold">
            {nodes[activeStageIndex]?.telemetry}
          </span>
        </div>

        {/* Visual Representation per Stage */}
        {activeStageIndex === 0 && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#061421] border border-white/10">
              <span className="text-[#D1E0E6]">Val_Report_Q3.pdf</span>
              <span className="text-[#75A4B5]">Normalized · 14 pages</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#061421] border border-white/10">
              <span className="text-[#D1E0E6]">Batch_Rates_Feed.csv</span>
              <span className="text-[var(--accent-on-dark)]">Schema Validated</span>
            </div>
          </div>
        )}

        {activeStageIndex === 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#D1E0E6]">
              <span>Document Page 04 · Table B</span>
              <span className="text-[var(--accent-on-dark)]">Spatial Anchor Linked</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#061421] border border-[var(--accent-on-dark)]/60 flex items-center justify-between text-xs font-mono">
              <span className="text-[#F5F8FA]">Net Asset Sum</span>
              <span className="text-[var(--accent-on-dark)] font-bold tabular-nums">$14,280,000.00</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-2 rounded bg-[#173D5B]" />
              <div className="h-2 rounded bg-[#326B86]" />
              <div className="h-2 rounded bg-[var(--accent-on-dark)]/70" />
            </div>
          </div>
        )}

        {activeStageIndex === 2 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[var(--accent-on-dark)] font-semibold">
                Threshold Variance Triggered (+1.8%)
              </span>
              <span className="text-[#A6C3CE]">Gate Required</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-[#061421] border border-white/10">
                <div className="text-[#A6C3CE]">Extracted PDF</div>
                <div className="text-[#F5F8FA] font-bold tabular-nums mt-0.5">$14,280,000</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#061421] border border-[var(--accent-on-dark)]/55">
                <div className="text-[var(--accent-on-dark)]">Rule Formula Check</div>
                <div className="text-[#F5F8FA] font-bold tabular-nums mt-0.5">$14,027,500</div>
              </div>
            </div>
          </div>
        )}

        {activeStageIndex === 3 && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#061421] border border-[#47849B]/50">
              <span className="flex items-center gap-2 text-[#F5F8FA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-on-dark)]" />
                <span>ERP Ledger #VL-9921</span>
              </span>
              <span className="text-[#75A4B5]">Committed</span>
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#A6C3CE]">
              <span>Immutable Signature</span>
              <span className="tabular-nums">0x8a4e...c91f</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metadata Line */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#A6C3CE]">
        <span>Deterministic State Machine</span>
        <span className="text-[#F5F8FA]">100% Citation Traceability</span>
      </div>
    </div>
  );
}

/**
 * 2. OfferingTrackVisual
 * Pure live procedural Canvas2D + clean vector system diagrams for the
 * 3 Core Engineering Offerings on the Homepage. Zero stock imagery.
 */
interface OfferingTrackVisualProps {
  mode: 'embedded' | 'vision-edge' | 'custom-platforms';
  indexNumber: string;
  badge: string;
  caption: string;
}

export function OfferingTrackVisual({
  mode,
  indexNumber,
  badge,
  caption
}: OfferingTrackVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = () => {
      const w = canvas.clientWidth || 540;
      const h = canvas.clientHeight || 400;
      ctx.clearRect(0, 0, w, h);

      // Calibrated coordinate dot matrix background
      ctx.fillStyle = 'rgba(117, 164, 181, 0.22)';
      const step = 28;
      for (let gx = step / 2; gx < w; gx += step) {
        for (let gy = step / 2; gy < h; gy += step) {
          ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }

      if (mode === 'embedded') {
        // Embedded Pod Synchronization Loop across 4 Architecture Stages
        const stages = [
          { x: w * 0.16, y: h * 0.5, label: 'INTAKE', color: '#75A4B5' },
          { x: w * 0.39, y: h * 0.36, label: 'STATE DAG', color: '#A6C3CE' },
          { x: w * 0.62, y: h * 0.64, label: 'HUMAN GATE', color: '#80A5FF' },
          { x: w * 0.84, y: h * 0.48, label: 'CORE ERP', color: '#F5F8FA' }
        ];

        // Orbiting telemetry rings behind nodes
        ctx.strokeStyle = 'rgba(71, 132, 155, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.5, w * 0.36, h * 0.26, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Bezier links connecting stages
        for (let i = 0; i < stages.length - 1; i++) {
          const a = stages[i];
          const b = stages[i + 1];
          ctx.strokeStyle = i === 1 ? 'rgba(128, 165, 255, 0.7)' : 'rgba(117, 164, 181, 0.55)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          const cpX = (a.x + b.x) * 0.5;
          ctx.bezierCurveTo(cpX, a.y, cpX, b.y, b.x, b.y);
          ctx.stroke();

          // Traveling data packet along bezier curve
          const p = prefersReducedMotion ? 0.5 : (time * 0.5 + i * 0.33) % 1;
          const inv = 1 - p;
          const px =
            inv * inv * inv * a.x +
            3 * inv * inv * p * cpX +
            3 * inv * p * p * cpX +
            p * p * p * b.x;
          const py =
            inv * inv * inv * a.y +
            3 * inv * inv * p * a.y +
            3 * inv * p * p * b.y +
            p * p * p * b.y;

          ctx.fillStyle = i === 1 ? '#80A5FF' : '#F5F8FA';
          ctx.beginPath();
          ctx.arc(px, py, 3.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Node Rings & Labels
        stages.forEach((st, idx) => {
          const isGate = idx === 2;
          ctx.fillStyle = '#061421';
          ctx.strokeStyle = st.color;
          ctx.lineWidth = isGate ? 2.4 : 1.8;
          ctx.beginPath();
          ctx.arc(st.x, st.y, isGate ? 20 : 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = st.color;
          ctx.beginPath();
          ctx.arc(st.x, st.y, isGate ? 5 : 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#D1E0E6';
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(st.label, st.x, st.y + 34);
        });
      } else if (mode === 'vision-edge') {
        // Live Edge Vision & Kinematics Dual Telemetry Rig
        const cx = w * 0.5;
        const cy = h * 0.5;
        const sway = prefersReducedMotion ? 0.35 : Math.sin(time * 2.1);
        const pulse = prefersReducedMotion ? 0.5 : (Math.sin(time * 1.4) + 1) * 0.5;

        // Optical field bounding frame
        const fw = Math.min(w * 0.72, 360);
        const fh = Math.min(h * 0.64, 240);
        const fx = cx - fw * 0.5;
        const fy = cy - fh * 0.5;

        ctx.strokeStyle = 'rgba(117, 164, 181, 0.45)';
        ctx.lineWidth = 1;
        ctx.strokeRect(fx, fy, fw, fh);

        // Corner precision brackets
        const bLen = 14;
        ctx.strokeStyle = '#80A5FF';
        ctx.lineWidth = 2;
        [
          [fx, fy, 1, 1],
          [fx + fw, fy, -1, 1],
          [fx, fy + fh, 1, -1],
          [fx + fw, fy + fh, -1, -1]
        ].forEach(([x, y, dx, dy]) => {
          ctx.beginPath();
          ctx.moveTo(x, y + dy * bLen);
          ctx.lineTo(x, y);
          ctx.lineTo(x + dx * bLen, y);
          ctx.stroke();
        });

        // Kinematic skeleton joints
        const joints: [number, number][] = [
          [cx + sway * 9, cy - 68],
          [cx + sway * 5, cy - 46],
          [cx - 28, cy - 38],
          [cx + 28, cy - 38],
          [cx - 46 - sway * 14, cy - 12],
          [cx + 46 + sway * 14, cy - 14],
          [cx - 38 - sway * 24, cy + 16],
          [cx + 38 + sway * 22, cy - 44],
          [cx, cy + 6],
          [cx - 18 - sway * 10, cy + 44],
          [cx + 18 + sway * 10, cy + 44],
          [cx - 24 - sway * 14, cy + 78],
          [cx + 24 + sway * 15, cy + 78]
        ];
        const links = [
          [0, 1], [1, 2], [1, 3], [2, 4], [4, 6],
          [3, 5], [5, 7], [1, 8], [8, 9], [9, 11],
          [8, 10], [10, 12]
        ];

        ctx.strokeStyle = '#75A4B5';
        ctx.lineWidth = 2.2;
        links.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(joints[a][0], joints[a][1]);
          ctx.lineTo(joints[b][0], joints[b][1]);
          ctx.stroke();
        });

        joints.forEach(([x, y], i) => {
          const isKey = i === 6 || i === 7 || i === 8;
          ctx.fillStyle = isKey ? '#80A5FF' : '#F5F8FA';
          ctx.beginPath();
          ctx.arc(x, y, isKey ? 4.8 : 3.2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Vertical laser calibration sweep
        const scanX = fx + pulse * fw;
        ctx.strokeStyle = 'rgba(128, 165, 255, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(scanX, fy);
        ctx.lineTo(scanX, fy + fh);
        ctx.stroke();
      } else {
        // Custom Platforms: Layered Compute Topology (3 Enclave Planes)
        const layers = [
          { y: h * 0.27, title: 'VPC / ON-PREM ENCLAVE', color: '#80A5FF' },
          { y: h * 0.5, title: 'TUNED SLMs + VECTOR/GRAPH', color: '#75A4B5' },
          { y: h * 0.73, title: 'ERP · KAFKA · PAYMENTS LEDGER', color: '#47849B' }
        ];

        const cols = 5;
        const leftX = w * 0.2;
        const rightX = w * 0.8;
        const colStep = (rightX - leftX) / (cols - 1);

        // Vertical bus interconnects
        for (let c = 0; c < cols; c++) {
          const x = leftX + c * colStep;
          ctx.strokeStyle = c === 2 ? 'rgba(128, 165, 255, 0.55)' : 'rgba(117, 164, 181, 0.28)';
          ctx.lineWidth = c === 2 ? 1.8 : 1.1;
          ctx.beginPath();
          ctx.moveTo(x, layers[0].y);
          ctx.lineTo(x, layers[2].y);
          ctx.stroke();

          // Signal packet travelling vertically
          const pyOffset = prefersReducedMotion ? 0.5 : (time * 0.55 + c * 0.21) % 1;
          const py = layers[2].y - pyOffset * (layers[2].y - layers[0].y);
          ctx.fillStyle = c % 2 === 0 ? '#80A5FF' : '#F5F8FA';
          ctx.beginPath();
          ctx.arc(x, py, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Layer horizontal buses & nodes
        layers.forEach((layer, lIdx) => {
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(leftX, layer.y);
          ctx.lineTo(rightX, layer.y);
          ctx.stroke();

          for (let c = 0; c < cols; c++) {
            const x = leftX + c * colStep;
            ctx.fillStyle = '#061421';
            ctx.strokeStyle = lIdx === 0 && c === 2 ? '#80A5FF' : layer.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, layer.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          ctx.fillStyle = '#A6C3CE';
          ctx.font = '600 9.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(layer.title, w * 0.5, layer.y - 14);
        });
      }

      if (!prefersReducedMotion) {
        time += 0.016;
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [mode]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#173D5B] aspect-[4/3] bg-[#061421] shadow-xl">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between gap-2 text-[11px] font-mono text-[#F5F8FA]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#0B2030] border border-[#47849B]/50 font-bold tabular-nums text-[var(--accent-on-dark)]">
            {indexNumber}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#0B2030] border border-white/10 text-[#D1E0E6]">
            {badge}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono text-[#D1E0E6]">
        <span>{caption}</span>
        <span className="text-[var(--accent-on-dark)] font-semibold">Live Architecture</span>
      </div>
    </div>
  );
}

/**
 * 3. FdeIntegrationBlueprintVisual
 * Replaces abstract light-beam image on FDE Hero with an interactive 4-step sprint blueprint.
 */
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
        <span className="text-[var(--accent-on-dark)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
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
                  ? 'bg-[#173D5B]/90 border-[var(--accent-on-dark)]'
                  : 'bg-[#0B2030] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A6C3CE] mb-1">
                <span className={isActive ? 'text-[var(--accent-on-dark)] font-bold' : ''}>{phase.num}</span>
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
          <span className="text-[var(--accent-on-dark)] font-bold">Phase {current.num}</span>
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
        <span className="text-[var(--accent-on-dark)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
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
                  ? 'bg-[#173D5B]/90 border-[var(--accent-on-dark)] shadow-sm'
                  : 'bg-[#0B2030]/60 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isHighlighted ? 'text-[var(--accent-on-dark)]' : 'text-[#75A4B5]'
                  }`}
                />
                <span
                  className={`text-[10px] font-mono ${
                    isHighlighted ? 'text-[var(--accent-on-dark)] font-bold' : 'text-[#A6C3CE]'
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
        <span className="text-[var(--accent-on-dark)] font-semibold">VPC · On-Prem · Edge</span>
      </div>
    </div>
  );
}
