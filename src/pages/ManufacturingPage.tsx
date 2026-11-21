import { useState } from 'react';
import { RoutePath } from '../types';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { Factory, Eye, Cpu, ShieldCheck, ArrowRight, ArrowUpRight, Zap, Server, Activity, Wrench, Crosshair, HardHat } from 'lucide-react';
import { motion } from 'motion/react';

interface ManufacturingPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function ManufacturingPage({ onNavigate }: ManufacturingPageProps) {
  const [activeTopologyNode, setActiveTopologyNode] = useState<number>(1);

  const plantNodes = [
    {
      num: '01',
      title: 'Shop-Floor Optical Feeds',
      role: 'High-Speed Optics',
      desc: 'Interfacing directly with GigE industrial cameras and optical sensors over local Ethernet buses with deterministic frame capture.',
      accent: 'var(--accent-orange-text)'
    },
    {
      num: '02',
      title: 'Local Edge IPC Inference',
      role: 'TensorRT Acceleration',
      desc: 'Executing quantized visual classification models on on-premise industrial PCs and NVIDIA Jetson nodes with zero external internet dependencies.',
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Operator Verification Station',
      role: 'Human Sign-off Gate',
      desc: 'Ruggedized tablet consoles for factory floor engineers to review flagged anomalies, inspect bounding-box diffs, and authorize production line overrides.',
      accent: 'var(--accent-ocean)'
    },
    {
      num: '04',
      title: 'Plant Historian & ERP Sync',
      role: 'Asynchronous Persistence',
      desc: 'Bridging inspected part tallies and yield statistics asynchronously to SAP/Siemens plant databases over secure internal IPC queues.',
      accent: 'var(--accent-orange-text)'
    }
  ];

  return (
    <div id="manufacturing-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Ambient Manufacturing & Laser Scan Canvas */}
      <WorldCanvas mode="manufacturing" opacity={0.4} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Industrial AI Engineering · Germany, Netherlands, Switzerland & Northern Europe"
          title="AI engineered for the"
          titleAccent="physical plant."
          subtitle="NHTech combines high-speed computer vision, edge AI runtimes, sensor telemetry engineering, and deterministic factory software to build dependable intelligence for industrial manufacturing operations."
          ctaText="Discuss Industrial Deployment"
          ctaRoute="/contact"
          secondaryCtaText="Inspect Physical Work"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'SOVEREIGNTY', value: '100% AIR-GAPPED IPC' },
            { label: 'HARDWARE', value: 'NVIDIA JETSON / IPC' },
            { label: 'SECURITY', value: 'ZERO CAD / YIELD LEAKS' },
          ]}
        />
      </section>

      {/* 2. Interactive Plant Topology Stage */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container space-y-8 text-left">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div>
              <span className="text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                Plant Topology · Air-Gapped Runtime
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                End-to-End Shop Floor Architecture
              </h2>
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)]">
              Click pipeline stages to inspect isolation controls
            </div>
          </div>

          {/* 4 Pipeline Stages (Flush hairline matrix) */}
          <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
            {plantNodes.map((node, idx) => {
              const isSelected = activeTopologyNode === idx;
              return (
                <button
                  key={node.num}
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="manufacturing-topology-detail"
                  onClick={() => setActiveTopologyNode(idx)}
                  className={`p-5 text-left font-mono focus-visible:-outline-offset-4 transition-colors cursor-pointer relative ${
                    isSelected
                      ? 'bg-[var(--bg-surface)]'
                      : 'bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)]/80'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                      isSelected ? 'w-full bg-[#FF5A1F]' : 'w-0'
                    }`}
                  />
                  <div className="text-xs font-bold" style={{ color: node.accent }}>
                    {node.num} · {node.role}
                  </div>
                  <div className="text-sm font-display font-bold text-[var(--text-primary)] mt-1.5">
                    {node.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Deep Inspector */}
          <div id="manufacturing-topology-detail" className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold" style={{ color: plantNodes[activeTopologyNode].accent }}>
              <span>Topology Stage {plantNodes[activeTopologyNode].num}</span>
              <span aria-hidden="true">·</span>
              <span>{plantNodes[activeTopologyNode].role}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
              {plantNodes[activeTopologyNode].title}
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-4xl font-sans">
              {plantNodes[activeTopologyNode].desc}
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--status-success-text)]" />
                <span className="text-[var(--text-primary)] font-medium">Compliance: Air-Gapped On-Premise Factory Network</span>
              </div>
              <span className="text-[var(--text-muted)]">Compatible with Siemens, SAP &amp; Industrial IPC Fleets</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Manufacturing Engineering Systems */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-10 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider font-semibold">
              Plant Capabilities
            </span>
            <MaskedHeading as="h2" className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Industrial systems we engineer in practice.
            </MaskedHeading>
            <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
              Engineering capabilities designed for deterministic factory floors, low latency budgets, and zero cloud leaks.
            </ScrollText>
          </div>

          <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-px">
            {[
              {
                title: 'Edge Computer Vision & Defect Inspection',
                desc: 'Deploying optimized neural networks (TensorRT / ONNX) on local industrial PCs and cameras to classify part anomalies with zero cloud roundtrips.',
                tag: 'ON-DEVICE VISION'
              },
              {
                title: 'Sensor Telemetry & Temporal Anomaly Detection',
                desc: 'Streaming high-frequency vibrational, thermal, and acoustic sensor logs into deep neural models to detect machine degradation early.',
                tag: 'TELEMETRY INTELLIGENCE'
              },
              {
                title: 'Operator Verification Tablet Consoles',
                desc: 'Intuitive tablet workbenches for floor engineers to inspect flagged parts, annotate edge cases, and calibrate model thresholds.',
                tag: 'HUMAN GATES'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3.5"
              >
                <div className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-wider">
                  System 0{idx + 1} · {item.tag}
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
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
            Plant Prototype Sprint
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Bring your industrial challenge to our engineering pod.
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            We can prototype edge computer vision and anomaly intelligence for your manufacturing line in structured sprint tracks.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md"
            >
              <span>Schedule Plant Engineering Discussion</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
