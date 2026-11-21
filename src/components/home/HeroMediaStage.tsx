import { useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  Users,
  Eye,
  Layers
} from 'lucide-react';
import { RoutePath } from '../../types';
import { HeroSystemIllustration, SpatialSystemMode } from './HeroSystemIllustration';

interface HeroMediaStageProps {
  onNavigate: (path: RoutePath) => void;
}

interface OfferingStage {
  id: SpatialSystemMode;
  index: string;
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
  const heroRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<SpatialSystemMode>('embedded');
  const currentStage = STAGES.find((s) => s.id === activeStage) ?? STAGES[0];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={heroRef}
        id="hero-section"
        className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-14 sm:pb-20 overflow-hidden border-b border-[var(--border-color)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Editorial Positioning & Actions */}
            <div className="relative z-10 lg:col-span-6 space-y-8 text-left">
              <div className="space-y-5">
                <h1 className="text-hero-display text-[var(--text-primary)] leading-[1.12] text-balance">
                  We turn complex business operations into{' '}
                  production&#8209;ready AI systems.
                </h1>

                <p className="page-intro">
                  Senior engineering teams embedded alongside your domain experts—building deterministic workflow automation, edge computer vision, and enterprise AI platforms deployed inside infrastructure you control.
                </p>
              </div>

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
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] font-display font-bold text-sm tracking-tight active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                >
                  <span>Discuss a business workflow</span>
                  <ArrowRight className="w-4 h-4 text-current" />
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
                      aria-pressed={isActive}
                      aria-controls="hero-offering-details"
                      onClick={() => setActiveStage(stage.id)}
                      className="text-left group cursor-pointer space-y-1.5 relative pt-2"
                    >
                      <div
                        className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                          isActive ? 'w-full bg-[var(--accent-primary)]' : 'w-0 group-hover:w-8 bg-[var(--accent-secondary)]'
                        }`}
                      />
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={isActive ? 'text-[var(--accent-text)] font-bold' : 'text-[var(--text-muted)]'}>
                          {stage.index}
                        </span>
                        <Icon
                          className={`w-3.5 h-3.5 transition-colors ${
                            isActive ? 'text-[var(--accent-text)]' : 'text-[var(--accent-secondary)]'
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

            <div className="lg:col-span-6 relative flex flex-col">
              <HeroSystemIllustration activeMode={activeStage} heroRef={heroRef} />

              <div
                id="hero-offering-details"
                className="relative mt-3 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-text)] hover:underline cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>{currentStage.routeLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
