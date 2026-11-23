import { useState } from 'react';
import { ScrollProgressRail } from '../components/common/ScrollMotion';
import { ClimaxCTA } from '../components/home/ClimaxCTA';
import { EditorialProofStrip } from '../components/home/EditorialProofStrip';
import { FeaturedCaseStudySection } from '../components/home/FeaturedCaseStudySection';
import { HeroMediaStage } from '../components/home/HeroMediaStage';
import { HomeMotionContext } from '../components/home/HomeMotionContext';
import { HomeTracksOverview } from '../components/home/HomeTracksOverview';
import { SelectedWorkCompositions } from '../components/home/SelectedWorkCompositions';
import { WhoWeWorkWithStrip } from '../components/home/WhoWeWorkWithStrip';
import { CaseStudy, RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export function HomePage({ onNavigate, onSelectCaseStudy }: HomePageProps) {
  const [paused, setPaused] = useState(false);

  return (
    <HomeMotionContext.Provider value={{ paused, togglePaused: () => setPaused((value) => !value) }}>
      <div id="nhtech-homepage" className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative">
        <ScrollProgressRail />
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

        {/* 4. THREE CORE OFFERINGS: Embedded teams, Vision & edge AI, Custom AI Platforms */}
        <div className="relative z-10">
          <HomeTracksOverview onNavigate={onNavigate} />
        </div>

        {/* 5. DEFENSIBLE PRODUCTION PROOF */}
        <div className="relative z-10">
          <EditorialProofStrip onNavigate={onNavigate} />
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
    </HomeMotionContext.Provider>
  );
}
