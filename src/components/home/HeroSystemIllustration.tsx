import { useId } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export type SpatialSystemMode = 'embedded' | 'vision-edge' | 'custom-platforms';

const contours = Array.from({ length: 25 }, (_, index) => index - 12);

function contourPath(mode: SpatialSystemMode, offset: number) {
  switch (mode) {
    case 'vision-edge':
      return `M 22 ${104 + offset * 6} C 182 ${53 + offset * 8}, 208 ${209 + offset * 3}, 312 ${218 + offset * 1.5} S 483 ${131 + offset * 7}, 618 ${167 + offset * 6}`;
    case 'custom-platforms':
      return `M 22 ${221 + offset * 4} C 132 ${262 + offset * 7}, 189 ${109 + offset * 5}, 315 ${120 + offset * 3} S 444 ${274 + offset * 7}, 618 ${241 + offset * 5}`;
    case 'embedded':
      return `M 22 ${194 + offset * 3} C 155 ${234 + offset * 5}, 201 ${98 + offset * 7}, 326 ${146 + offset * 4} S 473 ${285 + offset * 6}, 618 ${207 + offset * 4}`;
  }
}

export function HeroSystemIllustration({ activeMode }: { activeMode: SpatialSystemMode }) {
  const washId = useId();
  const strokeId = useId();
  const accentId = useId();
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 100, damping: 25, mass: 0.8 };
  const driftX = useSpring(x, spring);
  const driftY = useSpring(y, spring);

  return (
    <div
      data-hero-illustration
      aria-hidden="true"
      className="relative grid w-full min-w-0 place-items-center"
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== 'mouse') return;
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - left) / width - 0.5) * 20);
        y.set(((event.clientY - top) / height - 0.5) * 14);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.svg
        viewBox="0 0 640 380"
        className="block w-full overflow-visible pointer-events-none"
        style={{ x: reduceMotion ? 0 : driftX, y: reduceMotion ? 0 : driftY }}
        fill="none"
      >
        <defs>
          <radialGradient id={washId}>
            <stop stopColor="var(--accent-primary)" stopOpacity="0.13" />
            <stop offset="0.58" stopColor="var(--accent-secondary)" stopOpacity="0.07" />
            <stop offset="1" stopColor="var(--accent-secondary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={strokeId} gradientUnits="userSpaceOnUse" x1="22" x2="618">
            <stop stopColor="var(--accent-secondary)" stopOpacity="0" />
            <stop offset="0.3" stopColor="var(--accent-secondary)" stopOpacity="0.46" />
            <stop offset="0.58" stopColor="var(--accent-secondary)" stopOpacity="0.68" />
            <stop offset="1" stopColor="var(--accent-secondary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={accentId} gradientUnits="userSpaceOnUse" x1="22" x2="618">
            <stop stopColor="var(--accent-primary)" stopOpacity="0" />
            <stop offset="0.45" stopColor="var(--accent-primary)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="324" cy="191" rx="332" ry="164" fill={`url(#${washId})`} />
        {contours.map((offset) => (
          <motion.path
            key={offset}
            initial={false}
            animate={{ d: contourPath(activeMode, offset) }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.32, 0, 0.2, 1] }}
            stroke={`url(#${offset === 0 ? accentId : strokeId})`}
            strokeWidth={offset === 0 ? 1.7 : 0.85}
            strokeLinecap="round"
            opacity={1 - Math.abs(offset) * 0.038}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </motion.svg>
    </div>
  );
}
