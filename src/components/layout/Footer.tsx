import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { brand } from '../../config/brand';
import { RoutePath } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: RoutePath) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="global-site-footer" className="bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] pt-16 pb-12 text-[var(--text-primary)] text-xs relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[var(--border-color)]">
          
          {/* Brand & Editorial Positioning */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => handleNav('/')}
              className="inline-flex items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5A1F] rounded-lg"
              aria-label="NHTech Home"
            >
              <BrandLogo variant="combination" heightClass="h-6" />
            </button>

            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed font-normal">
              NHTech turns complex business operations into production-ready AI systems. We combine product engineering, agentic workflows, document intelligence and computer vision, deployed within infrastructure you control.
            </p>

            {/* OpenAI Partner Metadata */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-secondary)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-ocean)] shrink-0" />
              <span className="font-semibold text-[var(--text-primary)]">{brand.partnerships.openai.status}</span>
              <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
              <span>{brand.partnerships.openai.specialization}</span>
            </div>
          </div>

          {/* Systems Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Engineering Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/fde')} className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer text-left">
                  Forward Deployed
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/computer-vision')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Vision &amp; Edge AI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/what-we-build')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  What We Build
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/agentic-ai')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Agentic Workflows
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/document-intelligence')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Document Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/on-prem-ai')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  On-Prem AI
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Industries
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/industries/manufacturing')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Manufacturing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/industries/enterprise')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Enterprise &amp; Ops
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/industries/fintech')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  FinTech &amp; BFSI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/industries/retail')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Retail &amp; Commerce
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/industries/startups')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Tech Startups
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Inquiries Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Legal &amp; Compliance
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button 
                    id="footer-legal-terms-link"
                    onClick={() => handleNav('/terms-and-conditions')} 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('/terms-and-conditions')} 
                    className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer text-left text-[11px]"
                  >
                    Online Payments &amp; Refund Policy
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Engineering Direct
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-normal">
                Discuss technical constraints or private deployment topologies directly.
              </p>
              
              <div className="pt-1">
                <button
                  onClick={() => handleNav('/contact')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A45] text-[#061421] text-xs font-display font-bold tracking-tight transition-all cursor-pointer shadow-sm"
                >
                  <span>Discuss a business workflow</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-current" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Entity & Global Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)] font-mono">
          <div>
            <span>© {new Date().getFullYear()} {brand.displayName}. Legal Entity: </span>
            <span className="text-[var(--text-primary)] font-bold">{brand.legalName}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => handleNav('/about')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => handleNav('/work')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Selected Work
            </button>
            <button onClick={() => handleNav('/products')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Products
            </button>
            <button onClick={() => handleNav('/careers')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Careers
            </button>
            <button onClick={() => handleNav('/contact')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Contact
            </button>
            <button 
              id="footer-link-terms"
              onClick={() => handleNav('/terms-and-conditions')} 
              className="text-[var(--text-secondary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer font-bold sm:border-l sm:border-[var(--border-color)] sm:pl-4"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
