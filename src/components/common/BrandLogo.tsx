import { useTheme } from '../../context/ThemeContext';

interface BrandLogoProps {
  variant?: 'combination' | 'monochrome' | 'icon';
  className?: string;
  heightClass?: string;
}

/** Chooses a cobalt or monochrome NHTech mark for the current theme. */
export function BrandLogo({
  variant = 'combination',
  className = '',
  heightClass = 'h-6',
}: BrandLogoProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (variant === 'icon') {
    const src = isLight
      ? '/assets/aistudio/Dark_291c432f.svg'
      : '/assets/aistudio/Color_ccf7e745.svg';
    return (
      <img
        src={src}
        alt="NHTech"
        className={`${heightClass} w-auto object-contain shrink-0 select-none ${className}`}
      />
    );
  }

  if (variant === 'monochrome') {
    const src = isLight
      ? '/assets/aistudio/Dark-logo_920ad84f.svg'
      : '/assets/aistudio/Light-logo_17c03ddc.svg';
    return (
      <img
        src={src}
        alt="NHTech"
        className={`${heightClass} w-auto object-contain shrink-0 select-none ${className}`}
      />
    );
  }

  const src = isLight
    ? '/assets/aistudio/Combination-logo-dark_c081fc70.svg'
    : '/assets/aistudio/Combination-logo_a73c3654.svg';

  return (
    <img
      src={src}
      alt="NHTech"
      className={`${heightClass} w-auto object-contain shrink-0 select-none ${className}`}
    />
  );
}
