import { useContext, useEffect, useRef } from 'react';
import { HomeMotionContext } from './HomeMotionContext';
import type { ReactNode } from 'react';

export function StageGroup({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const { paused } = useContext(HomeMotionContext);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = groupRef.current?.querySelectorAll('.stage-control');
    if (!controls?.length) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute('data-stage-in-view', entry.intersectionRatio >= 0.5);
      }
    }, { threshold: 0.5 });
    controls.forEach((control) => observer.observe(control));
    return () => observer.disconnect();
  }, []);

  return <div ref={groupRef} role="group" aria-label={label} data-motion-active={paused ? undefined : ""} className={className}>{children}</div>;
}
