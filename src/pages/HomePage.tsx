import { RoutePath, CaseStudy } from '../types';
import { HeroMediaStage } from '../components/home/HeroMediaStage';
import { WhoWeWorkWithStrip } from '../components/home/WhoWeWorkWithStrip';
import { FeaturedCaseStudySection } from '../components/home/FeaturedCaseStudySection';
import { HomeTracksOverview } from '../components/home/HomeTracksOverview';
import { EditorialProofStrip } from '../components/home/EditorialProofStrip';
import { SelectedWorkCompositions } from '../components/home/SelectedWorkCompositions';
import { ClimaxCTA } from '../components/home/ClimaxCTA';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export function HomePage({ onNavigate, onSelectCaseStudy }: HomePageProps) {
  return (
    <div id="nhtech-homepage" className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-[var(--accent-primary-text)]">

      <div className="relative z-10">
        <HeroMediaStage onNavigate={onNavigate} />
      </div>

      <div className="relative z-10">
        <FeaturedCaseStudySection
          onNavigate={onNavigate}
          onSelectCaseStudy={onSelectCaseStudy}
        />
      </div>

      <div className="relative z-10">
        <WhoWeWorkWithStrip onNavigate={onNavigate} />
      </div>

      <div className="relative z-10">
        <HomeTracksOverview onNavigate={onNavigate} />
      </div>

      <div className="relative z-10">
        <EditorialProofStrip />
      </div>

      <div className="relative z-10">
        <SelectedWorkCompositions onNavigate={onNavigate} />
      </div>

      <div className="relative z-10">
        <ClimaxCTA onNavigate={onNavigate} />
      </div>
    </div>
  );
}
