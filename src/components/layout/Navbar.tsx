import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import type { RoutePath } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { BrandLogo } from '../common/BrandLogo';
import { RouteLink } from '../common/RouteLink';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

type Destination = { label: string; href: RoutePath; aliases?: string[] };
type Group = { label: string; links: Destination[] };

const navigation: (Destination | Group)[] = [
  {
    label: 'What we build',
    links: [
      { label: 'All capabilities', href: '/what-we-build', aliases: ['/agentic-ai', '/document-intelligence'] },
      { label: 'Forward Deployed Engineering', href: '/fde', aliases: ['/forward-deployed-engineering'] },
      { label: 'Vision & Edge AI', href: '/computer-vision' },
      { label: 'On-Prem AI', href: '/on-prem-ai', aliases: ['/sovereign-models', '/sovereign-ai'] },
    ],
  },
  {
    label: 'Industries',
    links: [
      { label: 'All industries', href: '/industries' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Enterprise', href: '/industries/enterprise' },
      { label: 'FinTech & BFSI', href: '/industries/fintech' },
      { label: 'Retail & Commerce', href: '/industries/retail' },
      { label: 'Tech Startups', href: '/industries/startups' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Products', href: '/products' },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    ],
  },
];

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const groupButton = useRef<HTMLButtonElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const close = () => {
      setOpenGroup(null);
      setMobileOpen(false);
    };
    const onOutside = (event: Event) => {
      if (!header.current?.contains(event.target as Node)) close();
    };
    const desktop = window.matchMedia('(min-width: 64rem)');
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    window.addEventListener('popstate', close);
    desktop.addEventListener('change', close);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
      window.removeEventListener('popstate', close);
      desktop.removeEventListener('change', close);
    };
  }, []);

  function navigate(path: RoutePath) {
    setOpenGroup(null);
    setMobileOpen(false);
    onNavigate(path);
  }

  function isCurrent(item: Destination) {
    return currentPath === item.href || item.aliases?.includes(currentPath);
  }

  function link(item: Destination) {
    return (
      <RouteLink key={item.href} href={item.href} onNavigate={navigate} className="nav-link"
        aria-current={isCurrent(item) ? 'page' : undefined}>
        {item.label}
      </RouteLink>
    );
  }

  return (
    <header
      id="main-navigation-bar"
      ref={header}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        if (openGroup) {
          setOpenGroup(null);
          groupButton.current?.focus();
        } else if (mobileOpen) {
          setMobileOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="site-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RouteLink href="/" onNavigate={navigate} className="nav-logo" aria-label="NHTech Home"
          aria-current={currentPath === '/' ? 'page' : undefined}>
          <BrandLogo variant="combination" heightClass="h-6" />
        </RouteLink>

        <button
          type="button"
          id="nav-mobile-menu-toggle"
          ref={menuButton}
          className="ui-action nav-icon nav-mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-navigation"
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenGroup(null);
          }}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" aria-label="Primary" className="site-nav" data-open={mobileOpen}>
          {navigation.map((item, index) => {
            if ('href' in item) return link(item);
            const open = openGroup === item.label;
            const id = `nav-group-${index}`;
            return (
              <div className="nav-group" key={item.label}>
                <button
                  type="button"
                  className="nav-link"
                  data-current={item.links.some(isCurrent)}
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={(event) => {
                    groupButton.current = event.currentTarget;
                    setOpenGroup(open ? null : item.label);
                  }}
                >
                  {item.label}
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
                <div className="nav-panel" id={id} hidden={!open}>
                  {item.links.map(link)}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            id="theme-toggle-button"
            onClick={toggleTheme}
            className="ui-action nav-icon"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <RouteLink id="nav-talk-to-us-cta" href="/contact" onNavigate={navigate} className="ui-action nav-contact"
            aria-current={currentPath === '/contact' ? 'page' : undefined}>
            Talk to us
            <ArrowUpRight size={15} aria-hidden="true" />
          </RouteLink>
        </div>
      </div>
    </header>
  );
}
