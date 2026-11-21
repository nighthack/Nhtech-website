import { useEffect, useId, useRef, type RefObject } from 'react';
import './HeroSystemIllustration.css';

export type SpatialSystemMode = 'embedded' | 'vision-edge' | 'custom-platforms';

const stageTwist = { embedded: 0, 'vision-edge': 0.9, 'custom-platforms': -0.72 };
const fins = Array.from({ length: 72 }, (_, i) => {
  const t = i / 71;
  return { t, x: 52 + t * 540, y: 215 - t * 50 + 36 * Math.sin(t * Math.PI * 2) };
});

// Each cross-section is a slender foil. Varying its pitch reveals the whole surface.
function profile(t: number, phase: number, pressure: number) {
  const envelope = 0.42 + 0.58 * Math.sin(Math.PI * t);
  const pitch = t * 5.2 - 1.3 + phase;
  const reach = envelope * (76 + 50 * Math.cos(pitch));
  const rise = envelope * (82 + 61 * Math.sin(pitch)) + pressure;
  return `M ${-reach} ${rise}
    C ${-reach * 0.5} ${rise + 14}, -22 ${-rise * 0.78}, ${reach} ${-rise}
    C ${reach + 6} ${-rise - 1}, ${reach + 6} ${-rise + 7}, ${reach + 2} ${-rise + 9}
    C -11 ${-rise * 0.43}, ${-reach * 0.47} ${rise + 26}, ${-reach} ${rise} Z`;
}

export function HeroSystemIllustration({ activeMode, heroRef }: {
  activeMode: SpatialSystemMode;
  heroRef: RefObject<HTMLElement | null>;
}) {
  const ink = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const targetTwist = useRef(stageTwist[activeMode]);

  useEffect(() => { targetTwist.current = stageTwist[activeMode]; }, [activeMode]);

  useEffect(() => {
    const svg = svgRef.current;
    const hero = heroRef.current;
    if (!svg || !hero) return;
    const paths: SVGPathElement[] = Array.from(svg.querySelectorAll('path'));
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let twist = targetTwist.current;
    let aim = 0.5;
    let cursor = aim;
    let targetPressure = 0;
    let pressure = 0;

    function draw(now: number) {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      time += dt;
      const blend = 1 - Math.exp(-dt * 5);
      twist += (targetTwist.current - twist) * blend;
      cursor += (aim - cursor) * blend;
      pressure += (targetPressure - pressure) * blend;
      fins.forEach(({ t }, i) => {
        const local = Math.exp(-24 * (t - cursor) ** 2);
        const phase = twist + 0.38 * Math.sin(time * 0.46 - t * 3.6);
        paths[i].setAttribute('d', profile(t, phase, local * pressure));
      });
      frame = requestAnimationFrame(draw);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden && !preference.matches) frame = requestAnimationFrame(draw);
    }
    function steer(e: PointerEvent) {
      if (!svg || preference.matches) return;
      const box = svg.getBoundingClientRect();
      aim = Math.max(0, Math.min(1, (e.clientX - box.left) / box.width));
      targetPressure = 55 * Math.max(-1, Math.min(1, 1 - 2 * (e.clientY - box.top) / box.height));
    }
    const release = () => { targetPressure = 0; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(svg);
    hero.addEventListener('pointermove', steer, { passive: true });
    hero.addEventListener('pointerdown', steer, { passive: true });
    hero.addEventListener('pointerleave', release);
    hero.addEventListener('pointerup', release);
    hero.addEventListener('pointercancel', release);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener('pointermove', steer);
      hero.removeEventListener('pointerdown', steer);
      hero.removeEventListener('pointerleave', release);
      hero.removeEventListener('pointerup', release);
      hero.removeEventListener('pointercancel', release);
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [heroRef]);

  return (
    <svg ref={svgRef} viewBox="-65 -10 805 420" className="hero-foil" aria-hidden="true">
      <defs>
        <linearGradient id={ink} x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor="var(--foil-shadow)" />
          <stop offset=".32" stopColor="var(--accent-primary)" />
          <stop offset=".48" stopColor="var(--foil-edge)" />
          <stop offset=".62" stopColor="var(--foil-mid)" />
          <stop offset="1" stopColor="var(--foil-shadow)" />
        </linearGradient>
      </defs>
      <g fill={`url(#${ink})`} stroke="var(--foil-edge)" strokeOpacity=".5" strokeWidth=".55">
        {fins.map(({ t, x, y }) => <path key={t} transform={`translate(${x} ${y})`} d={profile(t, 0, 0)} />)}
      </g>
    </svg>
  );
}
