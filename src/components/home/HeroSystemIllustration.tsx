import { useEffect, useId, useRef, type CSSProperties, type RefObject } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import './HeroSystemIllustration.css';

export type SpatialSystemMode = 'embedded' | 'vision-edge' | 'custom-platforms';

const center = { x: 408, y: 185 };
const fragments = [
  'const', 'pipeline', '=', 'async', '() => {',
  'await', 'ingest', '(input)', ';',
  'return', 'model', '.run', '(data)', ';',
  '}', '[]', '<>', '::',
];
const codePositions = [
  [92, 107], [150, 107], [230, 107], [250, 107], [308, 107],
  [125, 144], [184, 144], [248, 144], [315, 144],
  [125, 181], [191, 181], [243, 181], [285, 181], [343, 181],
  [92, 218], [138, 255], [194, 280], [247, 246],
];
const shapePaths = [
  'M 0 -8 A 8 8 0 1 0 0 8 A 8 8 0 1 0 0 -8 Z',
  'M -5 -7 H 5 Q 7 -7 7 -5 V 5 Q 7 7 5 7 H -5 Q -7 7 -7 5 V -5 Q -7 -7 -5 -7 Z',
  'M 0 -9 Q 1 -9 2 -7 L 8 5 Q 9 7 6 7 H -6 Q -9 7 -8 5 L -2 -7 Q -1 -9 0 -9 Z',
  'M -7 0 H 7 M 0 -7 V 7',
];
const tilt: Record<SpatialSystemMode, number> = {
  embedded: -12,
  'vision-edge': 14,
  'custom-platforms': 36,
};

export function HeroSystemIllustration({ activeMode, heroRef }: {
  activeMode: SpatialSystemMode;
  heroRef: RefObject<HTMLElement | null>;
}) {
  const washId = useId();
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const driftX = useSpring(x, { stiffness: 85, damping: 24 });
  const driftY = useSpring(y, { stiffness: 85, damping: 24 });

  useEffect(() => {
    const hero = heroRef.current;
    const field = fieldRef.current;
    if (!hero || !field) return;

    const observer = new IntersectionObserver(([entry]) => {
      field.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(field);

    const reset = () => {
      x.set(0);
      y.set(0);
    };
    const steer = (clientX: number, clientY: number) => {
      if (reduceMotion) return;
      const bounds = hero.getBoundingClientRect();
      const horizontal = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
      const vertical = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
      x.set((horizontal - 0.5) * 46);
      y.set((vertical - 0.5) * 34);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') steer(event.clientX, event.clientY);
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (event.touches.length === 1) steer(touch.clientX, touch.clientY);
      else reset();
    };

    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', reset);
    hero.addEventListener('touchstart', onTouch, { passive: true });
    hero.addEventListener('touchmove', onTouch, { passive: true });
    hero.addEventListener('touchend', reset);
    hero.addEventListener('touchcancel', reset);
    return () => {
      observer.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', reset);
      hero.removeEventListener('touchstart', onTouch);
      hero.removeEventListener('touchmove', onTouch);
      hero.removeEventListener('touchend', reset);
      hero.removeEventListener('touchcancel', reset);
      reset();
    };
  }, [heroRef, reduceMotion, x, y]);

  return (
    <div className="relative aspect-[1.72] w-full min-w-0" aria-hidden="true">
      <div
        ref={fieldRef}
        style={{ '--synthesis-tilt': `${tilt[activeMode]}deg` } as CSSProperties}
        className="hero-synthesis pointer-events-none absolute inset-y-[-12%] -inset-x-[7%] grid place-items-center lg:left-[-19%] lg:right-[-10%]"
      >
        <motion.svg
          viewBox="0 0 700 370"
          className="block w-full overflow-visible"
          style={{ x: reduceMotion ? 0 : driftX, y: reduceMotion ? 0 : driftY }}
          fill="none"
        >
          <defs>
            <radialGradient id={washId}>
              <stop stopColor="var(--accent-primary)" stopOpacity="0.15" />
              <stop offset="1" stopColor="var(--accent-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx={center.x} cy={center.y} rx="244" ry="160" fill={`url(#${washId})`} />
          <g transform={`translate(${center.x} ${center.y})`}>
            <g className="hero-synthesis-orientation">
              <g className="hero-synthesis-atom" stroke="var(--accent-primary)">
                {[0, 60, 120].map((angle) => (
                  <ellipse key={angle} rx="131" ry="47" strokeWidth="1.15" transform={`rotate(${angle})`} />
                ))}
                <circle r="22" strokeOpacity=".35" />
                <circle r="8" fill="var(--accent-primary)" fillOpacity=".46" />
              </g>
            </g>
          </g>
          {fragments.map((fragment, index) => {
            const [codeX, codeY] = codePositions[index];
            // A deterministic angle and uneven radii give the dispersal an irregular arrangement.
            const angle = index * 2.39996;
            const radius = 135 + ((index * 37) % 125);
            const orbitAngle = (index % 3) * Math.PI / 3;
            const ellipseX = Math.cos(angle) * 131;
            const ellipseY = Math.sin(angle) * 47;
            const orbitX = ellipseX * Math.cos(orbitAngle) - ellipseY * Math.sin(orbitAngle);
            const orbitY = ellipseX * Math.sin(orbitAngle) + ellipseY * Math.cos(orbitAngle);
            const shapeX = center.x + Math.cos(angle) * radius;
            const shapeY = center.y + Math.sin(angle) * radius * 0.56;
            const travel = {
              '--code': `translate(${codeX}px, ${codeY}px)`,
              '--gather': `translate(${center.x}px, ${center.y}px) rotate(var(--synthesis-tilt)) translate(${orbitX * 0.26}px, ${orbitY * 0.26}px)`,
              '--orbit': `translate(${center.x}px, ${center.y}px) rotate(var(--synthesis-tilt)) translate(${orbitX}px, ${orbitY}px)`,
              '--shape': `translate(${shapeX}px, ${shapeY}px) rotate(${(index * 47) % 120 - 60}deg)`,
              '--size': 0.55 + (index % 4) * 0.21,
            } as CSSProperties;

            return (
              <g key={index} className="hero-synthesis-fragment" style={travel}>
                <text className="hero-synthesis-code" fill="var(--accent-secondary)" fontSize="17" fontFamily="var(--font-mono)">
                  {fragment}
                </text>
                <circle className="hero-synthesis-electron" r={2 + index % 3 * 0.7} fill="var(--accent-primary)" />
                <path
                  className="hero-synthesis-shape"
                  d={shapePaths[index % shapePaths.length]}
                  stroke={index % 3 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'}
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </motion.svg>
      </div>
    </div>
  );
}
