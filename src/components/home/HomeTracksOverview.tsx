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
      title: 'Embedded teams',
      route: '/fde' as RoutePath,
      summary:
        'Senior product and AI engineers deployed alongside your domain team to turn bottlenecks into production software. from workflow discovery through live enterprise integration.',
      highlights: [
        'Embedded engineering pods working directly inside your codebase and infrastructure',
        'Deterministic state machines with mandatory human review gates and full audit logs',
        'Small Language Models and frontier models matched cleanly to cost and latency targets'
      ],
      cta: 'How embedded teams work'
    },
    {
      id: 'vision-edge',
      visualMode: 'vision' as const,
      title: 'Vision & edge AI',
      route: '/computer-vision' as RoutePath,
      summary:
        'Computer vision, kinematic movement tracking, and industrial defect inspection running locally on commercial tablets, cameras, and edge hardware with local processing.',
      highlights: [
        'Real-time biomechanical skeletal tracking & precision surface defect detection',
        'On-device inference executing locally in real time with offline SQLite storage',
        'Optimised TensorRT, ONNX Runtime, and Vision-Language-Action (OpenVLA) pipelines'
      ],
      cta: 'How vision & edge AI works'
    },
    {
      id: 'custom-platforms',
      visualMode: 'platforms' as const,
      title: 'Private AI',
      route: '/on-prem-ai' as RoutePath,
      summary:
        'Search over your documents, fine-tune a model for your domain, or build a smaller model. Run it on your servers or private cloud.',
      highlights: [
        'Search and source citations for your internal documents',
        'Model evaluation, fine-tuning and smaller models matched to your workload',
        'Cloud, private VPC, or on-premises deployments with ownership of the code and model'
      ],
      cta: 'How private AI works'
    }
  ];

  return (
    <section id="three-core-tracks-overview" className="border-b border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
      <div className="site-container flex flex-wrap items-end justify-between gap-6 py-14 sm:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-section-display">Three ways to work with us.</h2>
          <p className="site-lead">
            Start with your operational problem. We combine embedded teams, vision and private AI around what the work needs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/what-we-build')}
          className="site-button button-secondary"
        >
          See all services <ArrowRight aria-hidden="true" className="size-4" />
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
