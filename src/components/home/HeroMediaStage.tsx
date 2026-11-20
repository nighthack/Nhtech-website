import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  Users,
  Eye,
  Layers
} from 'lucide-react';
import { RoutePath } from '../../types';
import { NeuralSystemsCore3D, SpatialSystemMode } from './NeuralSystemsCore3D';

interface HeroMediaStageProps {
  onNavigate: (path: RoutePath) => void;
}

interface OfferingStage {
  id: SpatialSystemMode;
  index: string;
  tabLabel: string;
  offeringTitle: string;
  targetRoute: RoutePath;
  routeLabel: string;
  architectureLine: string;
  proofMetric: string;
  proofDetail: string;
  icon: typeof Users;
}

const STAGES: OfferingStage[] = [
  {
    id: 'embedded',
    index: '01',
    tabLabel: 'Embedded Teams',
    offeringTitle: 'Embedded Engineering Teams',
    targetRoute: '/fde',
    routeLabel: 'Explore Forward Deployed Engineering',
    architectureLine: 'Intake → State Machine → Human Gate → ERP Write',
    proofMetric: 'Embedded Pods',
    proofDetail: 'Senior product & AI engineers shipping directly inside your stack',
    icon: Users
  },
  {
    id: 'vision-edge',
    index: '02',
    tabLabel: 'Vision & Edge AI',
    offeringTitle: 'Vision & Edge AI Systems',
    targetRoute: '/computer-vision',
    routeLabel: 'Explore Vision & Edge AI',
    architectureLine: 'Camera → ONNX / TensorRT → Kinematics → Operator UI',
    proofMetric: 'On-Device Edge',
    proofDetail: 'Zero-cloud-latency kinematics & defect inspection on edge hardware',
    icon: Eye
  },
  {
    id: 'custom-platforms',
    index: '03',
    tabLabel: 'Custom AI Systems',
    offeringTitle: 'Custom AI Platforms & Workflows',
    targetRoute: '/what-we-build',
    routeLabel: 'Explore What We Build',
    architectureLine: 'Streams & Docs → Tuned SLMs → Citations → Private VPC',
    proofMetric: 'Private VPC',
    proofDetail: 'Sovereign enterprise workflows, anomaly scoring & 100% client IP',
    icon: Layers
  }
];

export function HeroMediaStage({ onNavigate }: HeroMediaStageProps) {
  const [activeStage, setActiveStage] = useState<SpatialSystemMode>('embedded');
  const currentStage = STAGES.find((s) => s.id === activeStage) ?? STAGES[0];

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-14 sm:pb-20 overflow-hidden border-b border-[var(--border-color)]"
    >
      {/* Subtle architectural radial Ocean sheen behind the 3D stage (unboxed) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[10%] w-[640px] h-[640px] rounded-full opacity-25 dark:opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(50,107,134,0.18) 0%, rgba(255,90,31,0.04) 42%, rgba(6,20,33,0) 72%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Positioning & Actions */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-[var(--accent-orange-text)] font-semibold"
            >
              <span className="inline-block w-6 h-[1.5px] bg-[#FF5A1F]" aria-hidden="true" />
              <span>Applied AI &amp; Production Systems Engineering</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h1 className="text-hero-display text-[var(--text-primary)] leading-[1.12] text-balance">
                We turn complex business operations into{' '}
                <span className="text-[var(--accent-secondary)]">
                  production&#8209;ready AI systems.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-xl leading-[1.68]">
                Senior engineering teams embedded alongside your domain experts—building deterministic workflow automation, edge computer vision, and enterprise AI platforms deployed inside infrastructure you control.
              </p>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#E0440E] text-[#061421] font-display font-bold text-sm tracking-tight active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <span>Discuss a business workflow</span>
                <ArrowRight className="w-4 h-4 text-[#061421]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-transparent hover:bg-[var(--bg-surface)] border border-[var(--border-hover)] text-[var(--text-primary)] text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore selected work</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </motion.div>

            {/* Unboxed Hairline Index Selector for the 3 Core Offerings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(stage.id)}
                    className="text-left group cursor-pointer space-y-1.5 relative pt-2"
                  >
                    <div
                      className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                        isActive ? 'w-full bg-[#FF5A1F]' : 'w-0 group-hover:w-8 bg-[var(--accent-secondary)]'
                      }`}
                    />
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={isActive ? 'text-[var(--accent-orange-text)] font-bold' : 'text-[var(--text-muted)]'}>
                        {stage.index}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? 'text-[var(--accent-orange-text)]' : 'text-[var(--accent-secondary)]'
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xs font-display font-bold transition-colors ${
                        isActive
                          ? 'text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {stage.offeringTitle}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                      {stage.proofMetric}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Unobstructed Interactive 3D Spatial Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col justify-between"
          >
            {/* 100% Unobstructed 3D Viewport */}
            <div className="relative w-full h-[310px] sm:h-[420px] lg:h-[480px]">
              {/* Corner Calibration Labels */}
              <div className="pointer-events-none absolute top-2 left-0 sm:left-2 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 z-10">
                <span>Interactive 3D Core</span>
                <span className="text-[var(--border-hover)]">/</span>
                <span>Drag to Orbit</span>
              </div>
              <div className="pointer-events-none absolute top-2 right-0 sm:right-2 text-[10px] font-mono text-[var(--accent-orange-text)] font-semibold uppercase tracking-widest z-10 tabular-nums">
                {currentStage.proofMetric}
              </div>

              <NeuralSystemsCore3D activeMode={activeStage} />
            </div>

            {/* Grounded Editorial Readout Strip (no backdrop-filter over WebGL; crisp solid/rgba surface) */}
            <div
              className="mt-3 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
            >
              <div className="space-y-1 min-w-0">
                <div className="text-[11px] font-mono text-[var(--accent-secondary)] uppercase tracking-wider leading-relaxed">
                  {currentStage.architectureLine}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {currentStage.proofDetail}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(currentStage.targetRoute)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-orange-text)] hover:underline cursor-pointer shrink-0 whitespace-nowrap"
              >
                <span>{currentStage.routeLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
