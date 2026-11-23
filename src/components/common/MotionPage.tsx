import { Pause, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { HomeMotionContext } from '../home/HomeMotionContext';

export function MotionPage({ children, id }: { children: ReactNode; id: string }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <HomeMotionContext.Provider value={{ paused, togglePaused: () => setPaused((value) => !value) }}>
      <div id={id} className="detail-page relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        {!reduced && (
          <button type="button" className="page-motion-toggle site-button button-secondary" onClick={() => setPaused((value) => !value)}>
            {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
            {paused ? 'Play backgrounds' : 'Pause backgrounds'}
          </button>
        )}
        {children}
      </div>
    </HomeMotionContext.Provider>
  );
}
