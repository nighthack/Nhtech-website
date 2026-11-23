interface BrandLogoProps { variant?: 'combination' | 'monochrome' | 'icon'; className?: string; heightClass?: string; }

// Both official assets are present from the first paint; CSS selects the theme.
export function BrandLogo({ variant = 'combination', className = '', heightClass = 'h-6' }: BrandLogoProps) {
  const dark = variant === 'icon' ? 'Color_ccf7e745.svg' : variant === 'monochrome' ? 'Light-logo_17c03ddc.svg' : 'Combination-logo_a73c3654.svg';
  const light = variant === 'icon' ? 'Dark_291c432f.svg' : 'Dark-logo_920ad84f.svg';
  return <span role="img" aria-label="NHTech" className={`inline-flex shrink-0 select-none ${className}`}>
    <img aria-hidden="true" alt="" src={`/assets/aistudio/${dark}`} className={`brand-logo-dark ${heightClass} w-auto object-contain`} />
    <img aria-hidden="true" alt="" src={`/assets/aistudio/${light}`} className={`brand-logo-light ${heightClass} w-auto object-contain`} />
  </span>;
}
