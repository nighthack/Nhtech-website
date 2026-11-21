import { ArrowRight, Users, Eye, Layers } from 'lucide-react';
import { RoutePath } from '../../types';
import { RouteLink } from '../common/RouteLink';
import { OfferingTrackVisual } from '../visuals/WorkflowVisuals';

interface HomeTracksOverviewProps {
  onNavigate: (path: RoutePath) => void;
}

export function HomeTracksOverview({ onNavigate }: HomeTracksOverviewProps) {
  const offerings = [
    {
      id: 'embedded-teams',
      visualMode: 'embedded' as const,
      number: '01',
      badge: 'Forward Deployed Engineering',
      title: 'Embedded Engineering Teams',
      route: '/fde' as RoutePath,
      icon: Users,
      imageCaption: 'Workflow State Routing & Human Review Gates',
      summary:
        'Senior product and AI engineers deployed alongside your domain team to turn bottlenecks into production software—from workflow discovery through live enterprise integration.',
      highlights: [
        'Embedded engineering pods working directly inside your codebase and infrastructure',
        'Deterministic state machines with mandatory human review gates and full audit logs',
        'Small Language Models and frontier models matched cleanly to cost and latency targets'
      ],
      cta: 'Explore Embedded Engineering'
    },
    {
      id: 'vision-edge',
      visualMode: 'vision-edge' as const,
      number: '02',
      badge: 'Physical Perception & Edge',
      title: 'Vision & Edge AI Systems',
      route: '/computer-vision' as RoutePath,
      icon: Eye,
      imageCaption: 'On-Device Edge Inference · Zero Cloud Latency',
      summary:
        'Computer vision, kinematic movement tracking, and industrial defect inspection running locally on commercial tablets, cameras, and edge hardware with zero cloud latency.',
      highlights: [
        'Real-time biomechanical skeletal tracking & precision surface defect detection',
        'On-device inference executing locally in real time with offline SQLite storage',
        'Optimized TensorRT, ONNX Runtime, and Vision-Language-Action (OpenVLA) pipelines'
      ],
      cta: 'Explore Vision & Edge AI'
    },
    {
      id: 'custom-platforms',
      visualMode: 'custom-platforms' as const,
      number: '03',
      badge: 'Enterprise Systems & Workflows',
      title: 'Custom AI Platforms & Workflow Systems',
      route: '/what-we-build' as RoutePath,
      icon: Layers,
      imageCaption: 'Private VPC, On-Premises & Custom Platforms',
      summary:
        'Bespoke enterprise applications, document intelligence, and high-throughput data platforms—integrating ERP, CRM, payments, loyalty, and compliance pipelines with full IP retention.',
      highlights: [
        'Enterprise Resource Planning, payments, loyalty, CRM, and compliance systems',
        'Document intelligence with bounding-box spatial source citations inside every record',
        'Cloud, private VPC, or on-premises deployments with 100% client IP ownership'
      ],
      cta: 'Explore Custom Platforms'
    }
  ];

  return (
    <section
      id="three-core-tracks-overview"
      className="py-16 sm:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[var(--border-color)]">
          <div className="space-y-3 max-w-2xl text-left">
            <h2 className="text-section-display">
              Three ways we deliver production AI.
            </h2>
            <p className="text-body text-[var(--text-secondary)]">
              Every engagement starts with your operational constraint—combining embedded engineering teams, edge perception, and custom enterprise architecture.
            </p>
          </div>

          <RouteLink href="/what-we-build" onNavigate={onNavigate}
            className="ui-action hero-secondary self-start sm:self-end shrink-0"
          >
            <span>Explore all capabilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </RouteLink>
        </div>

        {/* Alternating Asymmetric Editorial Chapters (Zero identical card walls) */}
        <div className="space-y-16 sm:space-y-20">
          {offerings.map((offering, idx) => {
            const Icon = offering.icon;
            const isEven = idx % 2 === 1;

            return (
              <article
                key={offering.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left"
              >
                {/* Purposeful Live Architecture Diagram (alternates left/right on desktop) */}
                <div
                  className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onNavigate(offering.route)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(offering.route);
                      }
                    }}
                    className="group cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] transition-transform duration-300 hover:-translate-y-0.5"
                    aria-label={`${offering.title} — ${offering.cta}`}
                  >
                    <OfferingTrackVisual
                      mode={offering.visualMode}
                      indexNumber={offering.number}
                      badge={offering.badge}
                      caption={offering.imageCaption}
                    />
                  </div>
                </div>

                {/* Unboxed Editorial Copy & Deliverables */}
                <div
                  className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent-text)] font-bold uppercase tracking-wider">
                    <Icon className="w-4 h-4" />
                    <span>Offering {offering.number}</span>
                    <span className="text-[var(--border-hover)]">/</span>
                    <span className="text-[var(--accent-secondary)] font-normal">{offering.badge}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-card-display text-[var(--text-primary)]">
                      {offering.title}
                    </h3>
                    <p className="text-body text-[var(--text-secondary)]">
                      {offering.summary}
                    </p>
                  </div>

                  {/* Clean Hairline List instead of boxed checkmarks */}
                  <ul className="divide-y divide-[var(--border-color)] border-t border-b border-[var(--border-color)]">
                    {offering.highlights.map((item, hIdx) => (
                      <li
                        key={hIdx}
                        className="py-3.5 flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <span className="font-mono text-xs font-bold text-[var(--accent-text)] tabular-nums mt-0.5">
                          0{hIdx + 1}
                        </span>
                        <span className="leading-snug text-[var(--text-primary)]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate(offering.route)}
                      className="inline-flex items-center gap-3 text-sm font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer group"
                    >
                      <span>{offering.cta}</span>
                      <span className="w-8 h-8 rounded-full border border-[var(--border-hover)] group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--accent-primary-text)] flex items-center justify-center transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
