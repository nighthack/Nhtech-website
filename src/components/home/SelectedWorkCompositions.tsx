import { useState } from 'react';
import { ArrowUpRight, Activity, Eye, Layers } from 'lucide-react';
import type { RoutePath } from '../../types';
import { SectionBackdrop } from './SectionBackdrop';
import { StageGroup } from './StageGroup';

interface SelectedWorkCompositionsProps {
  onNavigate: (path: RoutePath) => void;
}

export function SelectedWorkCompositions({ onNavigate }: SelectedWorkCompositionsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);


  const featuredStudies = [
    {
      badge: 'Embedded Teams',
      icon: Layers,
      title: 'Unifying valuation workflows into an automated production system.',
      challenge:
        'Deconstructing fragmented customer intake, PDF valuation models, and custom formulas into an automated pipeline with mandatory human sign-off gates.',
      outcomeMetric: 'Automated Hub',
      outcomeLabel: 'Straight-Through Processing & Audit Trail',
      diagramType: 'routing' as const,
      stackLine: 'PDF / SFTP Intake → Citation Grounding → Human Gate → ERP Writeback'
    },
    {
      badge: 'Vision & Edge AI',
      icon: Eye,
      title: 'Biomechanical kinematic pose extraction running 100% on-device.',
      challenge:
        'Processing live optical video feeds on standard commercial tablets to extract skeletal joint angles locally in bandwidth-constrained facilities.',
      outcomeMetric: 'On-Device Edge',
      outcomeLabel: 'Local Inference (Zero Cloud Dependency)',
      diagramType: 'vision' as const,
      stackLine: 'Tablet Camera → Pose 3D & ONNX Runtime → Local SQLite → Coach UI'
    },
    {
      badge: 'Custom Platforms',
      icon: Activity,
      title: 'Real-time temporal stream anomaly scoring in high-volume ledgers.',
      challenge:
        'Evaluating complex multi-hop transaction topologies in real-time streaming windows without false-positive cascades blocking legitimate payments.',
      outcomeMetric: 'Real-Time Scale',
      outcomeLabel: 'Continuous Distributed Stream Capacity',
      diagramType: 'ledger' as const,
      stackLine: 'Kafka Event Stream → Custom PyTorch DNN → Threshold Scoring → VPC Ledger'
    }
  ];

  const activeStudy = featuredStudies[activeIdx];

  return (
    <section
      id="selected-work-section"
      className="home-section border-b border-[var(--border-color)] bg-[var(--bg-base)] py-16 sm:py-24"
    >
      <SectionBackdrop mode={activeStudy.diagramType} />
      <div className="site-container relative z-10 space-y-10">
        <div className="border-b border-[var(--border-color)] pb-6">
          <h2 className="text-section-display max-w-2xl">
            From business bottleneck to <span className="text-[var(--accent-secondary)]">production system.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <StageGroup label="Selected deployments" className="grid content-start gap-2">
            {featuredStudies.map((study, idx) => {
              const isSelected = activeIdx === idx;
              const Icon = study.icon;
              return (
                <button
                  key={study.badge}
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="selected-work-detail"
                  data-suggested={idx === (activeIdx + 1) % featuredStudies.length}
                  onClick={() => setActiveIdx(idx)}
                  className="stage-control rounded-xl border border-[var(--border-color)] px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-secondary)]">
                    <Icon aria-hidden="true" className="stage-indicator size-4 shrink-0" />
                    {study.badge}
                  </span>
                  <span className="mt-1.5 block text-sm font-bold leading-snug text-[var(--text-primary)]">{study.title}</span>
                </button>
              );
            })}
          </StageGroup>

          <div className="space-y-5 self-end border-t border-[var(--border-color)] pt-5">
            <div id="selected-work-detail" role="status" className="space-y-2">
              <h3 className="text-card-display">{activeStudy.outcomeMetric}</h3>
              <p className="text-sm font-semibold text-[var(--accent-secondary)]">{activeStudy.outcomeLabel}</p>
              <p className="max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">{activeStudy.challenge}</p>
              <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)]">{activeStudy.stackLine}</p>
            </div>
            <button type="button" onClick={() => onNavigate('/work')} className="site-button button-secondary">
              Inspect case studies <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
