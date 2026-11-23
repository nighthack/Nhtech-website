import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { MouseEvent } from 'react';
import { brand } from '../../config/brand';
import { RoutePath } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <footer id="global-site-footer" className="bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] py-10 sm:py-14 text-[var(--text-primary)] text-xs relative overflow-hidden z-20">
      <div className="site-container space-y-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[var(--border-color)]">

          {/* Brand & Editorial Positioning */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/" onClick={handleNav('/')}
              className="inline-flex min-h-11 items-center rounded-lg"
              aria-label="NHTech Home"
            >
              <BrandLogo variant="combination" heightClass="h-6" />
            </a>

            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed font-normal">
              NHTech turns complex business operations into production-ready AI systems. We combine product engineering, agentic workflows, document intelligence and computer vision, deployed within infrastructure you control.
            </p>

            {/* OpenAI Partner Metadata */}
            {brand.partnerships.openai.confirmed && <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-ocean)] shrink-0" />
              <span className="font-semibold text-[var(--text-primary)]">{brand.partnerships.openai.status}</span>
              <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
              <span>{brand.partnerships.openai.specialization}</span>
            </div>}
          </div>

          {/* Systems Column */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)]">
              Services
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/fde" onClick={handleNav('/fde')} className="text-[var(--text-primary)] font-semibold hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer text-left">
                  Embedded teams
                </a>
              </li>
              <li>
                <a href="/computer-vision" onClick={handleNav('/computer-vision')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Vision &amp; edge AI
                </a>
              </li>
              <li>
                <a href="/what-we-build" onClick={handleNav('/what-we-build')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Services
                </a>
              </li>
              <li>
                <a href="/agentic-ai" onClick={handleNav('/agentic-ai')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  AI agents
                </a>
              </li>
              <li>
                <a href="/document-intelligence" onClick={handleNav('/document-intelligence')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Document intelligence
                </a>
              </li>
              <li>
                <a href="/on-prem-ai" onClick={handleNav('/on-prem-ai')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Private AI
                </a>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)]">
              Industries
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/industries/manufacturing" onClick={handleNav('/industries/manufacturing')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="/industries/enterprise" onClick={handleNav('/industries/enterprise')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Enterprise &amp; Ops
                </a>
              </li>
              <li>
                <a href="/industries/fintech" onClick={handleNav('/industries/fintech')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  FinTech &amp; BFSI
                </a>
              </li>
              <li>
                <a href="/industries/retail" onClick={handleNav('/industries/retail')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Retail &amp; Commerce
                </a>
              </li>
              <li>
                <a href="/industries/startups" onClick={handleNav('/industries/startups')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left">
                  Tech Startups
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Inquiries Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)]">
                Legal
              </h2>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a
                    id="footer-legal-terms-link"
                    href="/terms-and-conditions" onClick={handleNav('/terms-and-conditions')}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer text-left"
                  >
                    Terms and payments
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy" onClick={handleNav('/privacy-policy')}
                    className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer text-left text-xs"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)]">
                Engineering direct
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                Discuss technical constraints or private deployment topologies directly.
              </p>

              <div className="pt-1">
                <a
                  href="/contact" onClick={handleNav('/contact')}
                  className="site-button button-primary"
                >
                  <span>Discuss a business workflow</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-current" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Entity & Global Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            <span>© {new Date().getFullYear()} {brand.displayName}. Legal Entity: </span>
            <span className="text-[var(--text-primary)] font-bold">{brand.legalName}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
            <a href="/about" onClick={handleNav('/about')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              About
            </a>
            <a href="/work" onClick={handleNav('/work')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Selected work
            </a>
            <a href="/products" onClick={handleNav('/products')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Products
            </a>
            <a href="/careers" onClick={handleNav('/careers')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Careers
            </a>
            <a href="/contact" onClick={handleNav('/contact')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Contact
            </a>
            <a
              id="footer-link-terms"
              href="/terms-and-conditions" onClick={handleNav('/terms-and-conditions')}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer font-bold sm:border-l sm:border-[var(--border-color)] sm:pl-4"
            >
              Terms and payments
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
