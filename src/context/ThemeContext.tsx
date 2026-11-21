import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = typeof window !== 'undefined' ? readStoredTheme() : null;
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-changing');
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;

    try {
      localStorage.setItem('nhtech-theme', theme);
    } catch {
      // Theme changes still apply when storage is unavailable.
    }

    let restoreFrame = 0;
    const paintFrame = requestAnimationFrame(() => {
      restoreFrame = requestAnimationFrame(() => root.classList.remove('theme-changing'));
    });
    return () => {
      cancelAnimationFrame(paintFrame);
      cancelAnimationFrame(restoreFrame);
      root.classList.remove('theme-changing');
    };
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function readStoredTheme() {
  try {
    return localStorage.getItem('nhtech-theme');
  } catch {
    return null;
  }
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
      setTheme: () => {}
    };
  }
  return context;
}
