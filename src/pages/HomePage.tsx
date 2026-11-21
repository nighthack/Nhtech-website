import { RoutePath, CaseStudy } from '../types';
import { ScrollProgressRail } from '../components/common/ScrollMotion';
import { IntelligenceCore3D } from '../components/home/IntelligenceCore3D';
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
    <div id="nhtech-homepage" className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative">
      <ScrollProgressRail />
      {/* 0. Ambient Subtle Ocean & Signal Light Field */}
      <IntelligenceCore3D />

      {/* 1. HERO: We turn complex business operations into production-ready AI systems */}
      <div className="relative z-10">
        <HeroMediaStage onNavigate={onNavigate} />
      </div>

      {/* 2. WHO WE WORK WITH: Verified Industry & Company Strip */}
      <div className="relative z-10">
        <WhoWeWorkWithStrip onNavigate={onNavigate} />
      </div>

      {/* 3. FEATURED REAL CASE STUDY NEAR TOP: Problem -> Solution -> Outcome */}
      <div className="relative z-10">
        <FeaturedCaseStudySection
          onNavigate={onNavigate}
          onSelectCaseStudy={onSelectCaseStudy}
        />
      </div>

      {/* 4. THREE CORE OFFERINGS: Embedded Engineering Teams, Vision & Edge AI, Custom AI Platforms */}
      <div className="relative z-10">
        <HomeTracksOverview onNavigate={onNavigate} />
      </div>

      {/* 5. DEFENSIBLE PRODUCTION PROOF */}
      <div className="relative z-10">
        <EditorialProofStrip />
      </div>

      {/* 6. SELECTED WORK ACROSS ALL THREE TRACKS */}
      <div className="relative z-10">
        <SelectedWorkCompositions onNavigate={onNavigate} />
      </div>

      {/* 7. CTA: Discuss a business workflow */}
      <div className="relative z-10">
        <ClimaxCTA onNavigate={onNavigate} />
      </div>
    </div>
  );
}
