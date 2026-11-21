import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function StageGroup({ label, className, children }: { label: string; className: string; children: ReactNode }) {
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

  return <div ref={groupRef} role="group" aria-label={label} className={className}>{children}</div>;
}
