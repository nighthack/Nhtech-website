import { useState } from 'react';
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
  tabLabel: string;
  offeringTitle: string;
  targetRoute: RoutePath;
  routeLabel: string;
  architectureLine: string;
  proofDetail: string;
  icon: typeof Users;
}

const STAGES: OfferingStage[] = [
  {
    id: 'embedded',
    tabLabel: 'Embedded Teams',
    offeringTitle: 'Embedded Engineering Teams',
    targetRoute: '/fde',
    routeLabel: 'Explore Forward Deployed Engineering',
    architectureLine: 'Intake → State Machine → Human Gate → ERP Write',
    proofDetail: 'Senior product & AI engineers shipping directly inside your stack',
    icon: Users
  },
  {
    id: 'vision-edge',
    tabLabel: 'Vision & Edge AI',
    offeringTitle: 'Vision & Edge AI Systems',
    targetRoute: '/computer-vision',
    routeLabel: 'Explore Vision & Edge AI',
    architectureLine: 'Camera → ONNX / TensorRT → Kinematics → Operator UI',
    proofDetail: 'Zero-cloud-latency kinematics & defect inspection on edge hardware',
    icon: Eye
  },
  {
    id: 'custom-platforms',
    tabLabel: 'Custom AI Systems',
    offeringTitle: 'Custom AI Platforms & Workflows',
    targetRoute: '/what-we-build',
    routeLabel: 'Explore What We Build',
    architectureLine: 'Streams & Docs → Tuned SLMs → Citations → Private VPC',
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
      className="relative overflow-hidden border-b border-[var(--border-color)] pt-[calc(var(--header-height)+2.25rem)] pb-12 sm:pb-16 lg:pt-[calc(var(--header-height)+4.5rem)] lg:pb-20"
    >
      <div className="site-container relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <h1 className="text-hero-display text-[var(--text-primary)]">
            We turn complex business operations into{' '}
            <span className="text-[var(--accent-secondary)]">production&#8209;ready AI systems.</span>
          </h1>
          <p className="site-lead mt-5 max-w-[56ch]">
            Senior engineering teams embedded alongside your domain experts—building deterministic workflow automation, edge computer vision, and enterprise AI platforms deployed inside infrastructure you control.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate('/contact')} className="site-button button-primary">
              Discuss a business workflow <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <button type="button" onClick={() => onNavigate('/work')} className="site-button button-secondary">
              Explore selected work <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div role="group" aria-label="Engineering tracks" className="mt-8 grid grid-cols-3 gap-2 border-t border-[var(--border-color)] pt-3 sm:gap-3">
            {STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="hero-system-readout"
                  onClick={() => setActiveStage(stage.id)}
                  className="flex min-w-0 flex-col items-start gap-2 rounded-lg border border-transparent p-2 text-left text-xs font-semibold leading-snug text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] aria-pressed:border-[var(--border-control)] aria-pressed:bg-[var(--bg-surface)] aria-pressed:text-[var(--text-primary)] sm:p-3 sm:text-sm"
                >
                  <Icon aria-hidden="true" className={`size-4 shrink-0 ${isActive ? 'text-[var(--accent-orange-text)]' : 'text-[var(--accent-secondary)]'}`} />
                  <span>{stage.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative h-[clamp(14rem,65vw,23rem)] w-full lg:h-[clamp(23rem,32vw,29rem)]">
            <NeuralSystemsCore3D activeMode={activeStage} />
          </div>
          <div id="hero-system-readout" className="mt-2 border-t border-[var(--border-color)] pt-4">
            <div aria-live="polite" aria-atomic="true" className="space-y-1">
              <h2 className="text-card-display">{currentStage.offeringTitle}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{currentStage.proofDetail}</p>
              <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)]">{currentStage.architectureLine}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(currentStage.targetRoute)}
              className="inline-flex min-h-11 items-center gap-2 text-left text-sm font-bold text-[var(--accent-orange-text)] underline-offset-4 hover:underline"
            >
              {currentStage.routeLabel} <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
