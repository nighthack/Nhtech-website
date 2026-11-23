import {
ArrowRight,
ArrowUpRight,
Eye,
Layers,
Users
} from 'lucide-react';
import { useState } from 'react';
import { RoutePath } from '../../types';
import type { EngineeringTrack } from './HeroModelAnimation';
import { HeroModelAnimation } from './HeroModelAnimation';
import { StageGroup } from './StageGroup';

interface HeroMediaStageProps {
  onNavigate: (path: RoutePath) => void;
}

interface OfferingStage {
  id: EngineeringTrack;
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
    tabLabel: 'Embedded teams',
    offeringTitle: 'Embedded teams',
    targetRoute: '/fde',
    routeLabel: 'How embedded teams work',
    architectureLine: 'Intake → State Machine → Human Gate → ERP Write',
    proofDetail: 'Senior product & AI engineers shipping directly inside your stack',
    icon: Users
  },
  {
    id: 'vision-edge',
    tabLabel: 'Vision & edge AI',
    offeringTitle: 'Vision & edge AI',
    targetRoute: '/computer-vision',
    routeLabel: 'How vision & edge AI works',
    architectureLine: 'Camera → ONNX / TensorRT → Kinematics → Operator UI',
    proofDetail: 'Kinematics and defect inspection running on edge hardware',
    icon: Eye
  },
  {
    id: 'custom-platforms',
    tabLabel: 'Private AI',
    offeringTitle: 'Private AI',
    targetRoute: '/on-prem-ai',
    routeLabel: 'How private AI works',
    architectureLine: 'Streams & Docs → Tuned SLMs → Citations → Private VPC',
    proofDetail: 'Document search and models running on your infrastructure',
    icon: Layers
  }
];

export function HeroMediaStage({ onNavigate }: HeroMediaStageProps) {
  const [activeStage, setActiveStage] = useState<EngineeringTrack>('embedded');
  const currentIndex = STAGES.findIndex((stage) => stage.id === activeStage);
  const currentStage = STAGES[currentIndex];
  const nextStage = STAGES[(currentIndex + 1) % STAGES.length];

  return (
    <section
      id="hero-section"
      className="home-hero relative isolate overflow-hidden border-b border-[var(--border-color)] pt-[calc(var(--header-height)+2.25rem)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+5.5rem)] lg:pb-24"
    >
      <div className="site-container hero-model-grid">
        <div className="hero-model-copy relative z-10 min-w-0">
          <p className="mb-4 text-sm font-medium text-[var(--text-secondary)]">Applied AI engineering</p>
          <h1 className="text-hero-display text-[var(--text-primary)]">
            We build AI that runs inside complex operations.
          </h1>
          <p className="site-lead mt-5 max-w-[56ch]">
            Senior engineers work with your domain experts to build workflow automation, edge computer vision and custom AI platforms. Everything runs on infrastructure you control.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate('/contact')} className="site-button button-primary">
              Talk to us <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <button type="button" onClick={() => onNavigate('/work')} className="site-button button-secondary">
              See our work <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </div>

        </div>

        <HeroModelAnimation />

        <StageGroup label="Engineering tracks" className="hero-model-tracks relative z-10 grid grid-cols-3 gap-2 border-t border-[var(--border-color)] pt-3 sm:gap-3">
          {STAGES.map((stage) => {
            const isActive = activeStage === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                type="button"
                aria-pressed={isActive}
                aria-controls="hero-system-readout"
                data-suggested={nextStage.id === stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="stage-control flex min-w-0 flex-col items-start gap-2 rounded-lg border border-transparent p-2 text-left text-xs font-semibold leading-snug text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] aria-pressed:border-[var(--border-control)] aria-pressed:bg-[var(--bg-surface)] aria-pressed:text-[var(--text-primary)] sm:p-3 sm:text-sm"
              >
                <Icon aria-hidden="true" className={`stage-indicator size-4 shrink-0 ${isActive ? 'text-[var(--accent-orange-text)]' : 'text-[var(--accent-secondary)]'}`} />
                <span>{stage.tabLabel}</span>
              </button>
            );
          })}
        </StageGroup>

        <div className="hero-model-readout relative z-10 min-w-0">
          <div id="hero-system-readout" className="hero-system-readout border-t border-[var(--border-color)] pt-4">
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
