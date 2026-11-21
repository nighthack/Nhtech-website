import { ArrowRight } from 'lucide-react';
import { RoutePath } from '../../types';
import { SectionBackdrop } from './SectionBackdrop';

interface HomeTracksOverviewProps {
  onNavigate: (path: RoutePath) => void;
}

export function HomeTracksOverview({ onNavigate }: HomeTracksOverviewProps) {
  const offerings = [
    {
      id: 'embedded-teams',
      visualMode: 'routing' as const,
      title: 'Embedded Engineering Teams',
      route: '/fde' as RoutePath,
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
      visualMode: 'vision' as const,
      title: 'Vision & Edge AI Systems',
      route: '/computer-vision' as RoutePath,
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
      visualMode: 'platforms' as const,
      title: 'Custom AI Platforms & Workflow Systems',
      route: '/what-we-build' as RoutePath,
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
    <section id="three-core-tracks-overview" className="border-b border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
      <div className="site-container flex flex-wrap items-end justify-between gap-6 py-14 sm:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-section-display">Three ways we deliver production AI.</h2>
          <p className="site-lead">
            Every engagement starts with your operational constraint—combining embedded engineering teams, edge perception, and custom enterprise architecture.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/what-we-build')}
          className="site-button button-secondary"
        >
          Explore all capabilities <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>

      {offerings.map((offering, index) => (
        <article
          key={offering.id}
          className={`home-section home-offering border-t border-[var(--border-color)] py-12 sm:py-16 lg:py-20 ${index % 2 === 1 ? 'home-section--reverse' : ''}`}
        >
          <SectionBackdrop mode={offering.visualMode} />
          <div className={`site-container relative z-10 flex ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
            <div className="w-full space-y-5 lg:max-w-[33rem]">
              <h3 className="text-section-display">{offering.title}</h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">{offering.summary}</p>
              <ul className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
                {offering.highlights.map((item) => (
                  <li key={item} className="py-3 text-sm leading-relaxed text-[var(--text-primary)]">{item}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onNavigate(offering.route)}
                className="site-button button-secondary"
              >
                {offering.cta} <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
