import { useState, useEffect, useRef } from 'react';
import { RoutePath } from '../types';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import {
  Cpu,
  Activity,
  ArrowRight,
  ShieldCheck,
  Camera,
  Gauge,
  Tablet,
  Radio,
  Scan,
  ChevronDown,
  Smartphone,
  UserCheck,
  Monitor
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComputerVisionPageProps {
  onNavigate: (path: RoutePath) => void;
}

type UseCaseCategory = 'kinematics' | 'defect' | 'physical';

function EdgeVisionLiveSimulator({ mode }: { mode: UseCaseCategory }) {
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
      const w = canvas.clientWidth || 640;
      const h = canvas.clientHeight || 360;
      ctx.clearRect(0, 0, w, h);

      // Calibrated optical coordinate matrix background
      ctx.fillStyle = 'rgba(117, 164, 181, 0.2)';
      const gridStep = 28;
      for (let gx = gridStep / 2; gx < w; gx += gridStep) {
        for (let gy = gridStep / 2; gy < h; gy += gridStep) {
          ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }

      // Horizontal optical baseline calibration lines
      ctx.strokeStyle = 'rgba(71, 132, 155, 0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, h * 0.5);
      ctx.lineTo(w * 0.92, h * 0.5);
      ctx.stroke();

      if (mode === 'kinematics') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const sway = prefersReducedMotion ? 0.3 : Math.sin(time * 2.1);

        const nodes = [
          [cx + sway * 10, cy - 88],
          [cx + sway * 6, cy - 60],
          [cx - 34, cy - 50],
          [cx + 34, cy - 50],
          [cx - 56 - sway * 18, cy - 18],
          [cx + 56 + sway * 18, cy - 22],
          [cx - 46 - sway * 30, cy + 16],
          [cx + 46 + sway * 26, cy - 56],
          [cx, cy + 10],
          [cx - 24 - sway * 14, cy + 54],
          [cx + 24 + sway * 14, cy + 54],
          [cx - 28 - sway * 18, cy + 100],
          [cx + 28 + sway * 20, cy + 98]
        ];
        const links = [
          [0, 1], [1, 2], [1, 3], [2, 4], [4, 6],
          [3, 5], [5, 7], [1, 8], [8, 9], [9, 11],
          [8, 10], [10, 12]
        ];

        ctx.strokeStyle = 'rgba(117, 164, 181, 0.85)';
        ctx.lineWidth = 2.2;
        links.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(nodes[a][0], nodes[a][1]);
          ctx.lineTo(nodes[b][0], nodes[b][1]);
          ctx.stroke();
        });

        nodes.forEach(([x, y], i) => {
          const isKey = i === 6 || i === 7 || i === 8;
          ctx.fillStyle = isKey ? '#80A5FF' : '#F5F8FA';
          ctx.beginPath();
          ctx.arc(x, y, isKey ? 5 : 3.4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (mode === 'defect') {
        const scanX = ((prefersReducedMotion ? 0.52 : (time * 0.22) % 1) * w * 0.72) + w * 0.14;
        ctx.strokeStyle = 'rgba(128, 165, 255, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(scanX, h * 0.14);
        ctx.lineTo(scanX, h * 0.84);
        ctx.stroke();

        // Component tolerance bounding boxes
        const boxes = [
          { x: w * 0.24, y: h * 0.44, bw: 92, bh: 68, flagged: false },
          { x: w * 0.48, y: h * 0.48, bw: 110, bh: 74, flagged: true },
          { x: w * 0.68, y: h * 0.36, bw: 84, bh: 60, flagged: false }
        ];
        boxes.forEach((b) => {
          ctx.strokeStyle = b.flagged ? '#80A5FF' : '#75A4B5';
          ctx.lineWidth = b.flagged ? 2 : 1.4;
          ctx.strokeRect(b.x, b.y, b.bw, b.bh);
          if (b.flagged) {
            ctx.fillStyle = 'rgba(128, 165, 255, 0.16)';
            ctx.fillRect(b.x, b.y, b.bw, b.bh);
          }
        });
      } else {
        // OpenVLA spatial target reticle & safety zone arcs
        const cx = w * 0.5;
        const cy = h * 0.5;
        const rot = prefersReducedMotion ? 0.4 : time * 0.55;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = 'rgba(117, 164, 181, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 96, 0, Math.PI * 1.4);
        ctx.stroke();
        ctx.rotate(-rot * 2);
        ctx.strokeStyle = '#80A5FF';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, 58, 0, Math.PI * 1.1);
        ctx.stroke();
        ctx.restore();

        // Crosshair ticks
        ctx.strokeStyle = 'rgba(245, 248, 250, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 24, cy);
        ctx.lineTo(cx + 24, cy);
        ctx.moveTo(cx, cy - 24);
        ctx.lineTo(cx, cy + 24);
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

  const readoutText =
    mode === 'kinematics'
      ? 'LOCAL RUNTIME: Pose3D + ONNX · Real-Time Edge · Zero Cloud Egress'
      : mode === 'defect'
      ? 'EDGE STATION: TensorRT FP16 · Tolerance Gate Active · Sub-15ms'
      : 'SPATIAL POLICY: OpenVLA + BLE Sensor Interlock · Safe Hold Guarded';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#173D5B] bg-[#061421] aspect-[16/9] max-h-[380px] w-full shadow-xl">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#D1E0E6]">
        <span className="px-2.5 py-1 rounded bg-[#0B2030] border border-[#47849B]/50 text-[var(--accent-primary)] font-semibold">
          Live Edge Pipeline View
        </span>
        <span className="hidden sm:inline px-2.5 py-1 rounded bg-[#0B2030] border border-white/10">
          {readoutText}
        </span>
      </div>
    </div>
  );
}

const CORE_SYSTEM_FLOW = [
  {
    title: 'Camera / Device',
    roleLabel: 'Input & Device',
    summary: 'Optical streams ingested directly from tablet cameras, line-scan sensors, or edge devices.',
    icon: Camera,
    isSignal: false
  },
  {
    title: 'On-device Inference',
    roleLabel: 'AI Processing',
    summary: 'Compiled ONNX and TensorRT vision models running locally without cloud roundtrips.',
    icon: Cpu,
    isSignal: false
  },
  {
    title: 'Event / Measurement',
    roleLabel: 'Telemetry',
    summary: 'Deterministic landmarks, movement phases, surface tolerance scores, or spatial events.',
    icon: Activity,
    isSignal: false
  },
  {
    title: 'Human Action',
    roleLabel: 'Human Review & Dashboard',
    summary: 'Instant operator alerts, video clip replays, or trainer dashboards for immediate decisions.',
    icon: UserCheck,
    isSignal: true
  }
];

const KINEMATICS_STAGES = [
  {
    title: 'Optical Frame Capture',
    role: 'Inputs & Devices',
    summary: 'Captures live video feeds directly from standard mobile or tablet cameras under varying room lighting.',
    technicalDetails: [
      'Low-overhead camera buffer management across iOS and Android tablets',
      'Adaptive exposure normalization for studio, gym, and clinical rooms',
      'Zero external video streaming required during active coaching sessions'
    ]
  },
  {
    title: 'Anatomical Landmark Tracking',
    role: 'AI Processing',
    summary: 'Extracts frame-by-frame skeletal joint coordinates locally using lightweight vision backbones.',
    technicalDetails: [
      'Real-time keypoint localization across full-body anatomical joints',
      'Perspective normalization across changing camera placements',
      'Open Neural Network Exchange (ONNX) & TensorRT runtime optimization'
    ]
  },
  {
    title: 'Temporal Phase Classification',
    role: 'AI Processing',
    summary: 'Segments continuous human movement into discrete repetition phases (eccentric, isometric, concentric).',
    technicalDetails: [
      'Time-series state machine distinguishing active reps from setup noise',
      'Deterministic filtering to reject camera shake and accidental occlusion',
      'Automatic repetition boundary detection and tempo calculation'
    ]
  },
  {
    title: 'Biomechanics & Cadence Metrics',
    role: 'Measurements',
    summary: 'Computes repetitions, bar velocity, range-of-motion angles, and form deviation thresholds in real time.',
    technicalDetails: [
      'Live velocity and tempo curves calculated directly on local CPU/NPU',
      'Form deviation flags calibrated to clinician or trainer thresholds',
      'Local SQLite persistence for offline facility reliability'
    ]
  },
  {
    title: 'Local Tablet & Sensor Coordination',
    role: 'Inputs & Devices',
    summary: 'Executes locally in real time while coordinating paired Bluetooth Low Energy (BLE) sensors.',
    technicalDetails: [
      'Sub-20ms frame inference loop tuned for tablet thermal and battery limits',
      'BLE peripheral onboarding and synchronized hardware telemetry',
      'Asynchronous encrypted upload when facility Wi-Fi becomes available'
    ]
  },
  {
    title: 'Coach & Clinician Dashboard',
    role: 'Human Review & Dashboard',
    summary: 'Displays live form guidance and session replays while keeping qualitative coaching decisions with humans.',
    technicalDetails: [
      'Clear visual cues for supervising coaches, athletes, or physical therapists',
      'Historical progression charts and multi-session adherence tracking',
      'Exportable clinical or training reports synced via FastAPI backends'
    ]
  }
];

const DEFECT_STAGES = [
  {
    title: 'High-Resolution Line & Station Capture',
    role: 'Inputs & Devices',
    summary: 'Optical inspection cameras capture components or surfaces along active manufacturing stations.',
    technicalDetails: [
      'Synchronized trigger capture on conveyor and bench assembly stations',
      'Controlled illumination handling for reflective metals and composites',
      'Local Inter-Process Communication (IPC) with factory station terminals'
    ]
  },
  {
    title: 'Surface Anomaly & Part Segmentation',
    role: 'AI Processing',
    summary: 'Vision models isolate component boundaries and flag micro-scratches, misalignments, or missing fasteners.',
    technicalDetails: [
      'Custom Convolutional Neural Networks (CNNs) and segmentation backbones',
      'Edge inference executing locally on industrial PCs (IPCs) or NVIDIA Jetson nodes',
      'Zero production-line stalls from external cloud latency'
    ]
  },
  {
    title: 'Tolerance Evaluation Engine',
    role: 'Measurements',
    summary: 'Evaluates detected visual features against client-defined quality tolerances and ground-truth benchmarks.',
    technicalDetails: [
      'Configurable pass/fail tolerance gates per SKU or production batch',
      'Quantitative defect area, alignment offset, and confidence scoring',
      'Historical defect logging tied to shift and batch identifiers'
    ]
  },
  {
    title: 'Operator Verification Station',
    role: 'Human Review & Dashboard',
    summary: 'Surfaces flagged parts with instant frame replays so line operators confirm rejects and tune thresholds.',
    technicalDetails: [
      'Side-by-side reference vs flagged component inspection viewer',
      'Human sign-off captures labeled edge cases for continuous retraining',
      'Over-the-Air (OTA) model updates deployed safely across plant stations'
    ]
  }
];

const PHYSICAL_INTERACTION_STAGES = [
  {
    title: 'Multimodal Scene Perception',
    role: 'Inputs & Devices',
    summary: 'Combines live optical camera feeds, depth cues, and physical sensor telemetry into a single local scene state.',
    technicalDetails: [
      'Synchronized camera, spatial depth, and IoT sensor ingestion',
      'WebRTC low-latency local video transport where remote oversight is required',
      'Resilient buffering when operating in bandwidth-constrained physical sites'
    ]
  },
  {
    title: 'OpenVLA & Spatial Action Modeling',
    role: 'AI Processing',
    summary: 'Uses Vision-Language-Action (OpenVLA) and object-tracking pipelines to map visual context to physical states.',
    technicalDetails: [
      'Open-weight Vision-Language-Action (OpenVLA) policy evaluation',
      '3D object and tool tracking across dynamic workspaces',
      'Strict safety bounding checks before emitting downstream commands'
    ]
  },
  {
    title: 'Hardware Safety & Interlock Gates',
    role: 'Measurements',
    summary: 'Applies deterministic boundary rules and confidence checks before any physical actuation or alert.',
    technicalDetails: [
      'Deterministic spatial envelope and velocity checks around human operators',
      'Immediate fallback to safe hold state if sensor confidence drops',
      'Immutable telemetry logs recording every visual input and action output'
    ]
  },
  {
    title: 'Supervisor Control Dashboard',
    role: 'Human Review & Dashboard',
    summary: 'Gives operators clear oversight of spatial state, sensor health, and manual override controls.',
    technicalDetails: [
      'Real-time camera overlay showing tracked entities and safety zones',
      'One-click operator pause, override, and calibration tools',
      'Central fleet diagnostics across distributed field devices'
    ]
  }
];

const VISION_TECH_STACK = [
  {
    category: 'AI & Vision Runtimes',
    items: ['PyTorch', 'TensorFlow', 'OpenVLA', 'TensorRT', 'ONNX Runtime', 'OpenCV', 'Scikit-learn']
  },
  {
    category: 'Device & Edge Apps',
    items: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'SQLite Local Persistence']
  },
  {
    category: 'Backend & Streaming',
    items: ['Python', 'FastAPI', 'WebRTC', 'WebSockets', 'Node.js', 'Redis Task Queues']
  },
  {
    category: 'Sensors & Hardware',
    items: ['Bluetooth Low Energy (BLE)', 'Industrial Camera APIs', 'NVIDIA Jetson / IPCs', 'IoT Sensor Streams']
  }
];

export function ComputerVisionPage({ onNavigate }: ComputerVisionPageProps) {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseCategory>('kinematics');
  const [expandedStageMap, setExpandedStageMap] = useState<Record<string, boolean>>({});
  const [showFullStack, setShowFullStack] = useState(false);

  const toggleStageDetails = (key: string) => {
    setExpandedStageMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeUseCaseMeta =
    selectedUseCase === 'kinematics'
      ? {
          title: 'Movement & Kinematics',
          subtitle:
            'Real-time human motion tracking, repetition counting, and biomechanical telemetry running locally on commercial tablets.',
          stages: KINEMATICS_STAGES,
          verifiedOutcome: 'Verified pattern: Real-time on-device kinematic tracking with zero cloud dependency.'
        }
      : selectedUseCase === 'defect'
      ? {
          title: 'Industrial Defect Inspection',
          subtitle:
            'Automated surface anomaly detection, component alignment checks, and tolerance evaluation running locally on factory floor hardware.',
          stages: DEFECT_STAGES,
          verifiedOutcome: 'Verified pattern: Real-time optical defect detection with operator replay stations.'
        }
      : {
          title: 'Physical-World Interaction',
          subtitle:
            'Object tracking, sensor coordination, and Vision-Language-Action (OpenVLA) spatial pipelines bridging cameras, hardware sensors, and operator control.',
          stages: PHYSICAL_INTERACTION_STAGES,
          verifiedOutcome: 'Verified pattern: Deterministic safety gates and local hardware/BLE coordination.'
        };

  return (
    <div
      id="computer-vision-chapter"
      className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]"
    >
      {/* 0. Ambient Canvas */}
      <WorldCanvas mode="vision" opacity={0.22} />

      {/* 1. Clean Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          title="Computer vision and"
          titleAccent="real-time edge intelligence."
          subtitle="We design and deploy vision systems that run reliably on cameras, commercial tablets, and industrial edge hardware—delivering low-latency measurements and clear operator interfaces without cloud roundtrips."
          ctaText="Discuss a vision system"
          ctaRoute="/contact"
          secondaryCtaText="Explore selected work"
          secondaryCtaRoute="/work"
          onNavigate={onNavigate}
          telemetryItems={[]}
        />
      </section>

      {/* 2. Lead System Visual: Connected 4-Stage Edge Pipeline Track */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--accent-text)] font-semibold">
            Edge Architecture Pattern
          </p>
          <MaskedHeading as="h2" className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
            Camera / Device → On-device Inference → Event / Measurement → Human Action
          </MaskedHeading>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Consistent architecture across physical environments: capture locally, run inference on the device, emit deterministic measurements, and put actionable control in the operator&apos;s hands.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[var(--border-color)]"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {CORE_SYSTEM_FLOW.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div key={node.title} className="space-y-3 pt-1">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border relative z-10 ${
                        node.isSignal
                          ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-primary-text)]'
                          : 'bg-[var(--bg-base)] border-[var(--border-hover)] text-[var(--accent-secondary)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                        node.isSignal ? 'text-[var(--accent-text)]' : 'text-[var(--accent-secondary)]'
                      }`}
                    >
                      {node.roleLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                    0{idx + 1}. {node.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {node.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standardized Role Legend */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>Inputs &amp; Devices</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>On-Device AI Processing</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5 text-[var(--accent-text)]" />
            <span>Human Review</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            <span>Operator Dashboards</span>
          </span>
        </div>
        </div>
      </section>

      {/* 3. Separated Use Cases with Interactive Live Edge Vision Simulator */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-5 border-b border-[var(--border-color)]">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--accent-text)] font-semibold">
              Applied Use Cases
            </p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Explore Vision &amp; Edge Systems by Use Case
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Vision and Edge AI use cases"
            className="flex flex-wrap gap-2"
          >
            {(
              [
                { id: 'kinematics', label: 'Movement & Kinematics' },
                { id: 'defect', label: 'Industrial Defect Inspection' },
                { id: 'physical', label: 'Physical-World Interaction' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedUseCase === tab.id}
                onClick={() => setSelectedUseCase(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedUseCase === tab.id
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)] shadow-sm'
                    : 'bg-transparent border border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Optical Simulator Visual */}
        <EdgeVisionLiveSimulator mode={selectedUseCase} />

        {/* Active Use Case Overview & Stage Matrix */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--border-color)]">
            <div className="space-y-1.5 max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                {activeUseCaseMeta.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeUseCaseMeta.subtitle}
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--accent-secondary)] shrink-0">
              {activeUseCaseMeta.verifiedOutcome}
            </span>
          </div>

          {/* Hairline Grid with Expandable Technical Specs */}
          <div
            className={`border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 gap-px ${
              activeUseCaseMeta.stages.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {activeUseCaseMeta.stages.map((stage, idx) => {
              const stageKey = `${selectedUseCase}-${idx}`;
              const isExpanded = !!expandedStageMap[stageKey];
              const isHumanStage = stage.role.includes('Human Review');

              return (
                <div
                  key={stageKey}
                  className="p-6 sm:p-7 bg-[var(--bg-surface-subtle)] flex flex-col justify-between space-y-4 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span
                        className={`font-semibold ${
                          isHumanStage ? 'text-[var(--accent-text)]' : 'text-[var(--accent-secondary)]'
                        }`}
                      >
                        {stage.role}
                      </span>
                      <span className="text-[var(--text-muted)] tabular-nums">0{idx + 1}</span>
                    </div>

                    <h4 className="text-lg font-display font-bold text-[var(--text-primary)] leading-snug">
                      {stage.title}
                    </h4>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  {/* Expandable Technical Details Disclosure */}
                  <div className="pt-3 border-t border-[var(--border-color)] space-y-3">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleStageDetails(stageKey)}
                      className="w-full flex items-center justify-between text-xs font-mono font-semibold text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide technical details' : 'View technical details'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[var(--accent-text)]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <ul className="space-y-2 pt-1 text-xs text-[var(--text-secondary)]">
                        {stage.technicalDetails.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[var(--accent-text)] font-bold mt-0.5">·</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      {/* 4. Core Vision & Edge Capabilities + Expandable Stack Specification */}
      <section className="py-14 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--accent-secondary)] font-semibold">
            Engineering Scope
          </p>
          <MaskedHeading as="h2" className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
            What every Vision &amp; Edge engagement covers
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Built around real hardware constraints—camera sensors, tablet thermals, offline databases, and operator ergonomics.
          </ScrollText>
        </div>

        <div className="border border-[var(--border-color)] bg-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {[
            {
              title: 'Model Evaluation & Latency Optimization',
              desc: 'Benchmarking precision against human-labeled ground truth and profiling inference speed so frames process within strict hardware budgets.',
              icon: Gauge
            },
            {
              title: 'On-Device Packaging & Local Storage',
              desc: 'Compiling TensorRT and ONNX models into iOS, Android, and industrial station apps backed by local SQLite persistence.',
              icon: Tablet
            },
            {
              title: 'Hardware & Sensor Coordination',
              desc: 'Integrating Bluetooth Low Energy (BLE) peripherals, optical line cameras, and IoT sensors into a cohesive operator experience.',
              icon: Radio
            },
            {
              title: 'Object Detection & Tracking',
              desc: 'Locating components, tools, and anatomical landmarks across continuous streams with bounding-box and spatial verification.',
              icon: Scan
            },
            {
              title: 'Field Tablet & Station Interfaces',
              desc: 'Touch-friendly operator screens designed for factory floors, gyms, and clinics where workflows cannot pause for connectivity.',
              icon: Smartphone
            },
            {
              title: 'Quality & Acceptance Gates',
              desc: 'Configurable tolerance thresholds with instant clip replays so human supervisors retain final sign-off on flagged events.',
              icon: ShieldCheck
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-6 sm:p-7 bg-[var(--bg-base)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--accent-text)]">0{idx + 1}</span>
                  <Icon className="w-4 h-4 text-[var(--accent-secondary)]" />
                </div>
                <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Expandable Technical Stack Disclosure */}
        <div className="border-t border-b border-[var(--border-color)] py-5 space-y-4">
          <button
            type="button"
            aria-expanded={showFullStack}
            onClick={() => setShowFullStack((prev) => !prev)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)] font-semibold block">
                Technical Reference
              </span>
              <span className="text-lg font-display font-bold text-[var(--text-primary)]">
                Supported Vision, Mobile &amp; Edge Hardware Stack
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[var(--accent-text)] transition-transform duration-200 ${
                showFullStack ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showFullStack && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[var(--border-color)]">
              {VISION_TECH_STACK.map((group) => (
                <div key={group.category} className="space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-[var(--accent-text)] uppercase">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </section>

      {/* 5. Bottom CTA on Ocean Depth / Light Grey */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-text)] uppercase font-bold tracking-widest block">
            Vision Feasibility Evaluation
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Ready to test a vision pipeline on your hardware?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            Share sample video, camera specifications, or target tablet/edge constraints. Our engineers will evaluate feasibility and outline latency and accuracy benchmarks.
          </ScrollText>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] font-display font-bold text-sm tracking-tight transition-all cursor-pointer shadow-md"
            >
              <span>Discuss a Vision Workflow</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
