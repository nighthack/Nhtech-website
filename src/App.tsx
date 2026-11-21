import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import { RoutePath, CaseStudy } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SEOHead } from './components/common/SEOHead';
import { HomePage } from './pages/HomePage';
import { ForwardDeployedEngineeringPage } from './pages/ForwardDeployedEngineeringPage';
import { OnPremAiPage } from './pages/OnPremAiPage';
import { WhatWeBuildPage } from './pages/WhatWeBuildPage';
import { AgenticAiPage } from './pages/AgenticAiPage';
import { DocumentIntelligencePage } from './pages/DocumentIntelligencePage';
import { ComputerVisionPage } from './pages/ComputerVisionPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { WorkPage } from './pages/WorkPage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const focusAfterNavigation = useRef(false);

  // Sync browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      if (path !== currentPath) {
        focusAfterNavigation.current = true;
        setSelectedCaseStudy(null);
        setCurrentPath(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPath]);

  useLayoutEffect(() => {
    if (!focusAfterNavigation.current) return;
    focusAfterNavigation.current = false;
    if (!document.querySelector('dialog:modal')) mainRef.current?.focus({ preventScroll: true });
  }, [currentPath]);

  const handleNavigate = (path: RoutePath) => {
    if (path === currentPath) {
      if (window.location.hash) window.history.replaceState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'instant' });
      mainRef.current?.focus({ preventScroll: true });
      return;
    }

    focusAfterNavigation.current = true;
    if (path !== '/work') setSelectedCaseStudy(null);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentPath(path);
  };

  const openCaseStudy = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    handleNavigate('/work');
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCaseStudy={openCaseStudy}
          />
        );
      case '/fde':
      case '/forward-deployed-engineering':
        return <ForwardDeployedEngineeringPage onNavigate={handleNavigate} />;
      case '/on-prem-ai':
      case '/sovereign-models':
      case '/sovereign-ai':
        return <OnPremAiPage onNavigate={handleNavigate} />;
      case '/what-we-build':
        return <WhatWeBuildPage onNavigate={handleNavigate} />;
      case '/agentic-ai':
        return <AgenticAiPage onNavigate={handleNavigate} />;
      case '/document-intelligence':
        return <DocumentIntelligencePage onNavigate={handleNavigate} />;
      case '/computer-vision':
        return <ComputerVisionPage onNavigate={handleNavigate} />;
      case '/industries':
        return <IndustriesPage onNavigate={handleNavigate} />;
      case '/industries/manufacturing':
        return <ManufacturingPage onNavigate={handleNavigate} />;
      case '/industries/enterprise':
        return <IndustryDetailPage slug="enterprise" onNavigate={handleNavigate} />;
      case '/industries/fintech':
        return <IndustryDetailPage slug="fintech" onNavigate={handleNavigate} />;
      case '/industries/retail':
        return <IndustryDetailPage slug="retail" onNavigate={handleNavigate} />;
      case '/industries/startups':
        return <IndustryDetailPage slug="startups" onNavigate={handleNavigate} />;
      case '/work':
        return (
          <WorkPage
            onNavigate={handleNavigate}
            selectedCaseStudy={selectedCaseStudy}
            onSelectCaseStudy={setSelectedCaseStudy}
          />
        );
      case '/products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case '/terms-and-conditions':
        return <TermsAndConditionsPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCaseStudy={openCaseStudy}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SEOHead currentPath={currentPath} />
        <div id="nhtech-app-root" className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col font-sans">
          <a href="#main-content" className="skip-link site-button button-primary">Skip to main content</a>
          <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
          <main id="main-content" tabIndex={-1} ref={mainRef} className="flex-1 focus-visible:outline-none">
            {renderCurrentView()}
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
