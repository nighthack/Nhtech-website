import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SEOHead } from './components/common/SEOHead';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { normalisePath, routeAliases } from './config/seo';
import { ThemeProvider } from './context/ThemeContext';
import { caseStudies } from './data/caseStudies';
import { CaseStudy, RoutePath } from './types';
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const ForwardDeployedEngineeringPage = lazy(() => import('./pages/ForwardDeployedEngineeringPage').then((module) => ({ default: module.ForwardDeployedEngineeringPage })));
const OnPremAiPage = lazy(() => import('./pages/OnPremAiPage').then((module) => ({ default: module.OnPremAiPage })));
const WhatWeBuildPage = lazy(() => import('./pages/WhatWeBuildPage').then((module) => ({ default: module.WhatWeBuildPage })));
const AgenticAiPage = lazy(() => import('./pages/AgenticAiPage').then((module) => ({ default: module.AgenticAiPage })));
const DocumentIntelligencePage = lazy(() => import('./pages/DocumentIntelligencePage').then((module) => ({ default: module.DocumentIntelligencePage })));
const ComputerVisionPage = lazy(() => import('./pages/ComputerVisionPage').then((module) => ({ default: module.ComputerVisionPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((module) => ({ default: module.IndustriesPage })));
const ManufacturingPage = lazy(() => import('./pages/ManufacturingPage').then((module) => ({ default: module.ManufacturingPage })));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage').then((module) => ({ default: module.IndustryDetailPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then((module) => ({ default: module.WorkPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((module) => ({ default: module.ProductsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then((module) => ({ default: module.CareersPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage').then((module) => ({ default: module.TermsAndConditionsPage })));

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then((module) => ({ default: module.CaseStudyPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((module) => ({ default: module.PrivacyPolicyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

export default function App({ initialPath, serverPage }: { initialPath?: string; serverPage?: ReactNode } = {}) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== 'undefined') {
      const path = normalisePath(window.location.pathname);
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  const mainRef = useRef<HTMLElement>(null);
  const focusAfterNavigation = useRef(false);

  useEffect(() => {
    const canonical = routeAliases[currentPath];
    if (canonical) { window.history.replaceState({}, '', canonical); setCurrentPath(canonical); }
  }, [currentPath]);

  // Sync browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = normalisePath(window.location.pathname);
      if (path !== currentPath) {
        focusAfterNavigation.current = true;
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
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentPath(path);
  };

  const openCaseStudy = (study: CaseStudy) => {
    handleNavigate(`/work/${study.slug}`);
  };

  const renderCurrentView = () => {
    if (currentPath.startsWith('/work/')) {
      const study = caseStudies.find((item) => item.approvedForPublicWebsite && currentPath === `/work/${item.slug}`);
      return study ? <CaseStudyPage study={study} onNavigate={handleNavigate} /> : <NotFoundPage />;
    }
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
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      default:
        return <NotFoundPage />;
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
            <Suspense fallback={<div className="site-container py-36" role="status">Loading page…</div>}>{serverPage ?? renderCurrentView()}</Suspense>
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
