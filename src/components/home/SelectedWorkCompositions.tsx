import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ShieldCheck, Activity, Eye, Layers } from 'lucide-react';
import { RoutePath } from '../../types';
import { caseStudies } from '../../data/caseStudies';
import { MaskedHeading, AnimatedMetric } from '../common/ScrollMotion';

interface SelectedWorkCompositionsProps {
  onNavigate: (path: RoutePath) => void;
}

function LiveTelemetryCanvas({ mode }: { mode: 'document-ast' | 'kinematic-mesh' | 'stream-graph' }) {
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
      const w = canvas.clientWidth || 520;
      const h = canvas.clientHeight || 320;
      ctx.clearRect(0, 0, w, h);

      // Calibrated architectural coordinate matrix
      ctx.fillStyle = 'rgba(117, 164, 181, 0.2)';
      const gridStep = 26;
      for (let gx = gridStep / 2; gx < w; gx += gridStep) {
        for (let gy = gridStep / 2; gy < h; gy += gridStep) {
          ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }

      if (mode === 'kinematic-mesh') {
        // Real-time skeletal pose simulation over kinematic lab
        const cx = w * 0.5;
        const cy = h * 0.52;
        const swing = prefersReducedMotion ? 0.35 : Math.sin(time * 2.1);
        const lift = prefersReducedMotion ? 0.2 : Math.cos(time * 2.1) * 14;

        const joints = {
          head: { x: cx + swing * 8, y: cy - 86 + lift * 0.2 },
          neck: { x: cx + swing * 5, y: cy - 62 + lift * 0.2 },
          lShoulder: { x: cx - 32, y: cy - 52 + lift * 0.2 },
          rShoulder: { x: cx + 32, y: cy - 52 + lift * 0.2 },
          lElbow: { x: cx - 54 - swing * 18, y: cy - 20 + lift * 0.4 },
          rElbow: { x: cx + 56 + swing * 18, y: cy - 22 - lift * 0.4 },
          lWrist: { x: cx - 44 - swing * 32, y: cy + 12 + lift * 0.7 },
          rWrist: { x: cx + 46 + swing * 28, y: cy - 52 - lift * 0.8 },
          pelvis: { x: cx, y: cy + 4 + lift * 0.15 },
          lKnee: { x: cx - 22 - swing * 14, y: cy + 46 },
          rKnee: { x: cx + 22 + swing * 14, y: cy + 46 },
          lAnkle: { x: cx - 28 - swing * 20, y: cy + 92 },
          rAnkle: { x: cx + 26 + swing * 22, y: cy + 90 }
        };

        const bones: [keyof typeof joints, keyof typeof joints][] = [
          ['head', 'neck'],
          ['neck', 'lShoulder'],
          ['neck', 'rShoulder'],
          ['lShoulder', 'lElbow'],
          ['lElbow', 'lWrist'],
          ['rShoulder', 'rElbow'],
          ['rElbow', 'rWrist'],
          ['neck', 'pelvis'],
          ['pelvis', 'lKnee'],
          ['lKnee', 'lAnkle'],
          ['pelvis', 'rKnee'],
          ['rKnee', 'rAnkle']
        ];

        // Calibration arc
        ctx.strokeStyle = 'rgba(117, 164, 181, 0.32)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy - 10, 115, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.stroke();

        // Bones
        ctx.strokeStyle = '#75A4B5';
        ctx.lineWidth = 2.2;
        bones.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(joints[a].x, joints[a].y);
          ctx.lineTo(joints[b].x, joints[b].y);
          ctx.stroke();
        });

        // Joints (highlight key articulated wrists/shoulders in cobalt)
        (Object.keys(joints) as (keyof typeof joints)[]).forEach((key) => {
          const j = joints[key];
          const isSignal = key.includes('Wrist') || key === 'pelvis';
          ctx.fillStyle = isSignal ? '#80A5FF' : '#F5F8FA';
          ctx.beginPath();
          ctx.arc(j.x, j.y, isSignal ? 4.5 : 3.2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (mode === 'stream-graph') {
        // Real-time Kafka Stream Anomaly Waveform
        const baselineY = h * 0.6;
        const stepX = w / 72;

        // Baseline grid lines
        ctx.strokeStyle = 'rgba(166, 195, 206, 0.15)';
        ctx.lineWidth = 1;
        for (let g = 1; g <= 3; g++) {
          const gy = (h / 4) * g;
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
          ctx.stroke();
        }

        ctx.beginPath();
        for (let i = 0; i <= 72; i++) {
          const x = i * stepX;
          const phase = i * 0.25 - time * 2.6;
          const spike =
            Math.abs(Math.sin(phase * 0.35)) > 0.94
              ? Math.sin(phase * 3.1) * 52
              : Math.sin(phase) * 18 + Math.cos(phase * 1.7) * 9;
          const y = baselineY - Math.abs(spike);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#75A4B5';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight anomaly threshold markers in cobalt
        for (let i = 4; i < 70; i += 14) {
          const x = i * stepX;
          const phase = i * 0.25 - time * 2.6;
          const val = Math.abs(Math.sin(phase * 0.35));
          if (val > 0.72) {
            const y = baselineY - val * 48;
            ctx.strokeStyle = 'rgba(128, 165, 255, 0.55)';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, baselineY + 26);
            ctx.stroke();

            ctx.fillStyle = '#80A5FF';
            ctx.beginPath();
            ctx.arc(x, y, 4.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        // Document AST & Bounding Box Extraction Scan
        const docX = w * 0.16;
        const docY = h * 0.16;
        const docW = w * 0.68;
        const docH = h * 0.68;

        ctx.strokeStyle = 'rgba(166, 195, 206, 0.32)';
        ctx.lineWidth = 1;
        ctx.strokeRect(docX, docY, docW, docH);

        // Simulated document line bands + cobalt citation anchor
        const scanProgress = prefersReducedMotion ? 0.55 : (Math.sin(time * 1.1) + 1) * 0.5;
        const scanY = docY + scanProgress * docH;

        for (let r = 0; r < 5; r++) {
          const ry = docY + 22 + r * 30;
          const isAnchored = r === 2;
          ctx.fillStyle = isAnchored
            ? 'rgba(128, 165, 255, 0.22)'
            : 'rgba(117, 164, 181, 0.18)';
          ctx.fillRect(docX + 20, ry, docW - 40, 14);
          if (isAnchored) {
            ctx.strokeStyle = '#80A5FF';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(docX + 18, ry - 2, docW - 36, 18);
          }
        }

        // Laser scan hairline
        ctx.strokeStyle = '#80A5FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(docX - 10, scanY);
        ctx.lineTo(docX + docW + 10, scanY);
        ctx.stroke();
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export function SelectedWorkCompositions({ onNavigate }: SelectedWorkCompositionsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const wyz = caseStudies.find((c) => c.slug === 'enterprise-workflow-intelligence');
  const motiVision = caseStudies.find((c) => c.slug === 'computer-vision-motion');
  const whitegold = caseStudies.find((c) => c.slug === 'financial-anomaly');

  const featuredStudies = [
    {
      data: wyz,
      num: '01',
      badge: 'Embedded Teams',
      icon: Layers,
      industry: 'Forward Deployed Engineering · Workflows',
      title: 'Unifying valuation workflows into an automated production system.',
      challenge:
        'Deconstructing fragmented customer intake, PDF valuation models, and custom formulas into an automated pipeline with mandatory human sign-off gates.',
      outcomeMetric: 'Automated Hub',
      outcomeLabel: 'Straight-Through Processing & Audit Trail',
      diagramType: 'document-ast' as const,
      stackLine: 'PDF / SFTP Intake → Citation Grounding → Human Gate → ERP Writeback'
    },
    {
      data: motiVision,
      num: '02',
      badge: 'Vision & Edge AI',
      icon: Eye,
      industry: 'Vision & Edge AI · Kinematics',
      title: 'Biomechanical kinematic pose extraction running 100% on-device.',
      challenge:
        'Processing live optical video feeds on standard commercial tablets to extract skeletal joint angles locally in bandwidth-constrained facilities.',
      outcomeMetric: 'On-Device Edge',
      outcomeLabel: 'Local Inference (Zero Cloud Dependency)',
      diagramType: 'kinematic-mesh' as const,
      stackLine: 'Tablet Camera → Pose 3D & ONNX Runtime → Local SQLite → Coach UI'
    },
    {
      data: whitegold,
      num: '03',
      badge: 'Custom Platforms',
      icon: Activity,
      industry: 'Complex Business Systems · Payments',
      title: 'Real-time temporal stream anomaly scoring in high-volume ledgers.',
      challenge:
        'Evaluating complex multi-hop transaction topologies in real-time streaming windows without false-positive cascades blocking legitimate payments.',
      outcomeMetric: 'Real-Time Scale',
      outcomeLabel: 'Continuous Distributed Stream Capacity',
      diagramType: 'stream-graph' as const,
      stackLine: 'Kafka Event Stream → Custom PyTorch DNN → Threshold Scoring → VPC Ledger'
    }
  ];

  const activeStudy = featuredStudies[activeIdx];

  return (
    <section
      id="selected-work-section"
      className="py-16 sm:py-24 bg-[var(--bg-base)] relative overflow-hidden border-b border-[var(--border-color)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-2.5 max-w-2xl text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-[0.16em] font-semibold"
            >
              Across All Three Offerings
            </motion.p>

            <MaskedHeading as="h2" className="text-section-display text-[var(--text-primary)] leading-[1.15]">
              From business bottleneck to{' '}
              <span className="text-[var(--accent-secondary)]">production system.</span>
            </MaskedHeading>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent-text)] hover:underline transition-colors cursor-pointer group self-start lg:self-end"
          >
            <span>Explore all engineering case studies</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Interactive Split Dossier Switcher (Left: Selector Index | Right: Live Visual Demonstration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Hairline Case Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[var(--border-color)] border-t border-b border-[var(--border-color)] text-left">
            {featuredStudies.map((study, idx) => {
              const isSelected = activeIdx === idx;
              const Icon = study.icon;
              return (
                <button
                  key={study.num}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`py-6 text-left transition-all cursor-pointer group relative ${
                    isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-6 bottom-6 w-[2.5px] transition-all duration-300 ${
                      isSelected ? 'bg-[var(--accent-primary)]' : 'bg-transparent group-hover:bg-[var(--border-hover)]'
                    }`}
                  />
                  <div className="pl-5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span
                        className={`font-bold flex items-center gap-2 ${
                          isSelected ? 'text-[var(--accent-text)]' : 'text-[var(--accent-secondary)]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{study.num} · {study.badge}</span>
                      </span>
                      <span className="text-[11px] font-bold text-[var(--text-primary)] tabular-nums">
                        {study.outcomeMetric}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[var(--text-primary)] leading-snug">
                      {study.title}
                    </h3>

                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1"
                      >
                        {study.challenge}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Visual Demonstration Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              key={activeStudy.num}
              initial={{ opacity: 0.4, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl overflow-hidden border border-[#173D5B] bg-[#061421] min-h-[360px] sm:min-h-[420px] flex flex-col justify-between shadow-xl"
            >
              {/* Live Procedural Canvas Telemetry Stage */}
              <LiveTelemetryCanvas mode={activeStudy.diagramType} />

              {/* Top Telemetry Meta */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#D1E0E6]">
                <span className="uppercase tracking-wider text-[var(--accent-on-dark)] font-semibold">
                  {activeStudy.industry}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#061421]/80 border border-white/15 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#75A4B5]" />
                  <span>Production System</span>
                </span>
              </div>

              {/* Bottom Outcome Anchor */}
              <div className="relative z-10 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 bg-[#061421]/75 text-left">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#75A4B5] uppercase tracking-wider">
                    {activeStudy.stackLine}
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#F5F8FA] tabular-nums">
                    <AnimatedMetric value={activeStudy.outcomeMetric} />
                  </div>
                  <div className="text-xs text-[#D1E0E6] font-mono">
                    {activeStudy.outcomeLabel}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] font-display font-bold text-xs tracking-tight transition-all cursor-pointer shrink-0 self-start sm:self-end"
                >
                  <span>Inspect Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
