import { ArrowUpRight, ChevronDown, Eye, Menu, Moon, Server, Sun, Terminal, X } from 'lucide-react';
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { RoutePath } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

interface NavItem {
  label: string;
  path: RoutePath;
  description?: string;
  mobileLabel?: string;
  icon?: typeof Terminal;
  related?: string[];
}

const desktopStart: NavItem[] = [
  { label: 'Services', path: '/what-we-build', related: ['/agentic-ai', '/document-intelligence'] },
  { label: 'Embedded teams', mobileLabel: 'Embedded teams', path: '/fde', icon: Terminal, related: ['/forward-deployed-engineering'] },
  { label: 'Vision & edge AI', path: '/computer-vision', icon: Eye },
  { label: 'Private AI', path: '/on-prem-ai', icon: Server, related: ['/sovereign-models', '/sovereign-ai'] },
];

const desktopEnd: NavItem[] = [
  { label: 'Work', mobileLabel: 'Work & Case Studies', path: '/work' },
  { label: 'Products', path: '/products' },
];

const industries: NavItem[] = [
  { label: 'All industries', path: '/industries' },
  { label: 'Manufacturing', path: '/industries/manufacturing', description: 'Vision, edge intelligence & industrial automation' },
  { label: 'Enterprise', path: '/industries/enterprise', description: 'Workflow intelligence & system orchestration' },
  { label: 'FinTech & bfsi', path: '/industries/fintech', description: 'Anomaly detection, document pipelines & compliance' },
  { label: 'Retail & commerce', path: '/industries/retail', description: 'Forecasting, visual commerce & shelf segmentation' },
  { label: 'Tech startups', path: '/industries/startups', description: 'Applied AI engineering & core engine builds' },
];

const company: NavItem[] = [
  { label: 'About', path: '/about', description: 'Our team, engineering thesis and pedigree' },
  { label: 'Careers', path: '/careers', description: 'Join our forward-deployed systems pods' },
  { label: 'Contact', path: '/contact', description: 'Architecture consultation and pod feasibility' },
  { label: 'Privacy policy', path: '/privacy-policy', description: 'How we handle your data' },
  { label: 'Terms and payments', path: '/terms-and-conditions', description: 'Legal terms, billing policies & data privacy' },
];

const navItem = 'flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)]';
const navItemActive = 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]';

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [mobileOpen]);

  const route = (path: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  const isActive = (item: NavItem) => currentPath === item.path || (item.path === '/work' && currentPath.startsWith('/work/')) || item.related?.includes(currentPath);

  const renderLink = (item: NavItem, mobile = false) => {
    const Icon = item.icon;
    return (
      <a
        key={item.path}
        href={item.path}
        onClick={route(item.path)}
        aria-current={currentPath === item.path ? 'page' : undefined}
        className={`${navItem} ${isActive(item) ? navItemActive : ''}`}
      >
        {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-[var(--accent-ocean)]" />}
        {mobile ? item.mobileLabel ?? item.label : item.label}
      </a>
    );
  };

  const closeMobileOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !mobileOpen) return;
    setMobileOpen(false);
    mobileToggleRef.current?.focus();
  };

  return (
    <header
      id="main-navigation-bar"
      ref={headerRef}
      onKeyDown={closeMobileOnEscape}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
      }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-base)]"
    >
      <div className="site-container flex h-[var(--header-height)] items-center justify-between gap-3">
        <a id="nav-brand-logo" href="/" onClick={route('/')} className="inline-flex min-h-11 shrink-0 items-center rounded-lg" aria-label="NHTech home">
          <BrandLogo variant="combination" heightClass="h-6" />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 whitespace-nowrap xl:flex">
          {desktopStart.map((item) => renderLink(item))}
          <NavDisclosure id="nav-industries" label="Industries" items={industries} currentPath={currentPath} route={route} />
          {desktopEnd.map((item) => renderLink(item))}
          <NavDisclosure id="nav-company" label="Company" items={company} currentPath={currentPath} route={route} />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            id="theme-toggle-button"
            onClick={toggleTheme}
            className="site-button button-secondary size-11 p-0"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" className="size-4 text-[var(--accent-orange-text)]" /> : <Moon aria-hidden="true" className="size-4" />}
          </button>

          <a id="nav-talk-to-us-cta" href="/contact" onClick={route('/contact')} className="site-button button-primary inline-flex whitespace-nowrap px-3 text-xs sm:text-sm">
            Talk to us <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>

          <button
            type="button"
            id="nav-mobile-menu-toggle"
            ref={mobileToggleRef}
            onClick={() => setMobileOpen((open) => !open)}
            className="site-button button-secondary size-11 p-0 xl:hidden"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-drawer"
          >
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="nav-mobile-drawer"
        aria-label="Mobile navigation"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-[var(--border-color)] xl:hidden"
      >
        {mobileOpen && (
          <div className="site-container space-y-1 py-4 pb-6">
            {[...desktopStart, ...desktopEnd].map((item) => renderLink(item, true))}
            <NavDisclosure id="mobile-industries" label="Industries" items={industries} currentPath={currentPath} route={route} mobile />
            <NavDisclosure id="mobile-company" label="Company" items={company} currentPath={currentPath} route={route} mobile />
            <a href="/contact" onClick={route('/contact')} className="site-button button-primary mt-3 w-full">
              Talk to us <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

interface NavDisclosureProps {
  id: string;
  label: string;
  items: NavItem[];
  currentPath: string;
  route: (path: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => void;
  mobile?: boolean;
}

function NavDisclosure({ id, label, items, currentPath, route, mobile = false }: NavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const disclosureRef = useRef<HTMLDivElement>(null);
  const active = items.some((item) => item.path === currentPath);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!disclosureRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !open) return;
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={disclosureRef} className="relative" onBlur={onBlur} onKeyDown={onKeyDown}>
      <button
        type="button"
        id={`${id}-trigger`}
        ref={triggerRef}
        onClick={() => setOpen((value) => !value)}
        className={`${navItem} ${open || active ? navItemActive : ''} ${mobile ? 'w-full justify-between text-left' : ''} cursor-pointer`}
        aria-expanded={open}
        aria-controls={`${id}-links`}
      >
        {label}
        <ChevronDown aria-hidden="true" className={`size-4 motion-safe:transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul
        id={`${id}-links`}
        hidden={!open}
        className={mobile
          ? 'ml-3 mt-1 space-y-1 border-l border-[var(--border-color)] pl-2'
          : 'absolute right-0 top-full mt-2 w-72 space-y-1 whitespace-normal rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-2 shadow-lg'}
      >
        {items.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              onClick={(event) => {
                route(item.path)(event);
                if (event.defaultPrevented) setOpen(false);
              }}
              aria-current={currentPath === item.path ? 'page' : undefined}
              className={`${navItem} flex-col items-start justify-center gap-0.5 py-2 ${currentPath === item.path ? navItemActive : ''}`}
            >
              <span className="font-semibold text-[var(--text-primary)]">{item.label}</span>
              {!mobile && item.description && <span className="text-xs leading-snug text-[var(--text-muted)]">{item.description}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
