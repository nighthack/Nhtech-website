import { useContext, useEffect, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { HomeMotionContext } from './HomeMotionContext';
import { useBackdropMotion } from './useBackdropMotion';

export type EngineeringTrack = 'embedded' | 'vision-edge' | 'custom-platforms';

const cycle = 12;
const modelLayers = [
  { x: 236, y: 131, fire: 2.45 },
  { x: 379, y: 122, fire: 3.72, track: 'embedded' },
  { x: 522, y: 113, fire: 4.99, track: 'vision-edge' },
  { x: 665, y: 104, fire: 6.26, track: 'custom-platforms' },
] as const;

const inputs = [
  'M-25 103 C73 83 149 116 185 155 S223 170 246 177',
  'M-27 162 C60 116 136 155 176 184 S216 190 246 198',
  'M-25 225 C69 196 149 209 182 213 S217 224 246 221',
  'M-25 273 C64 270 101 239 145 244 S208 237 246 246',
] as const;

const fragments = [
  'M-10-4 Q-13-10-4-12 Q3-15 7-6 L13-2 Q14 7 7 8 L1 12 Q-8 12-7 6Z',
  'M-11-6 Q-8-14-1-9 L6-12 Q14-10 10-1 Q14 7 5 11 L-7 7 Q-15 6-11-6Z',
  'M-12 0 L-8-8 Q-6-13 1-9 L9-8 Q13-6 8 0 L12 6 L4 11 Q0 13-5 8Z',
  'M-9-7 L0-12 Q7-10 10-5 L6 1 Q12 10 3 11 Q-2 7-7 9 L-12 2Z',
] as const;

const scatteredFragments = [
  [33, 112, .65], [54, 154, .95], [95, 129, .42], [116, 178, .55],
  [151, 151, .72], [62, 213, .6], [110, 233, .85], [31, 263, .45],
  [79, 268, .62], [184, 215, .49], [205, 177, .37], [168, 248, .59],
] as const;

const outputs = [
  { kind: 'document', x: 20, y: 365, routeY: 420, gateY: 427 },
  { kind: 'graph', x: 114, y: 395, routeY: 450, gateY: 410 },
  { kind: 'chart', x: 208, y: 395, routeY: 450, gateY: 393 },
  { kind: 'insight', x: 302, y: 365, routeY: 420, gateY: 376 },
] as const;

function timing(start: number) {
  return { begin: `${start - cycle}s`, dur: `${cycle}s`, repeatCount: 'indefinite' };
}

function MovingSignal({ path, start, duration, children }: { path: string; start: number; duration: number; children: ReactNode }) {
  const end = duration / cycle;
  return (
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;.025;${end - .02};${end};1`} {...timing(start)} />
      <animateMotion path={path} rotate="auto" calcMode="linear" keyPoints="0;1;1" keyTimes={`0;${end};1`} {...timing(start)} />
      {children}
    </g>
  );
}

function Pulse({ start, duration, children }: { start: number; duration: number; children: ReactNode }) {
  return (
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0;0" keyTimes={`0;.026;${duration / cycle};1`} {...timing(start)} />
      {children}
    </g>
  );
}

function SignalHead() {
  return (
    <>
      <path d="M-15 0H1" fill="none" stroke="var(--model-signal)" strokeWidth="1.4" strokeLinecap="round" opacity=".58" />
      <circle r="3.2" fill="var(--model-bright)" stroke="var(--model-signal)" strokeWidth="1.4" />
    </>
  );
}

function Layer({ index, selected, animate }: { index: number; selected: boolean; animate: boolean }) {
  const layer = modelLayers[index];
  const face = 'M0 23L78 0V187L0 210Z';
  const cells = Array.from({ length: 24 }, (_, cell) => ({
    x: 12 + (cell % 4) * 15,
    y: 36 + Math.floor(cell / 4) * 24 - (cell % 4) * 4.5,
    opacity: (index === 1 || index === 2) && cell % 4 > Math.floor(cell / 4)
      ? .14
      : [.29, .4, .65, .35, .83, .48, .56][(cell * 3 + index * 4) % 7],
  }));

  return (
    <g transform={`translate(${layer.x} ${layer.y})`} data-model-layer={index + 1}>
      <path d="M0 23L12 15L90 -8L78 0Z M78 0L90 -8V179L78 187Z M0 210L78 187L90 179L12 202Z"
        fill="var(--model-depth)" stroke="var(--model-line)" strokeWidth="1" />
      <path d={face} fill="var(--model-surface)" fillOpacity=".97" stroke={selected ? 'var(--model-signal)' : 'var(--model-line)'} strokeWidth={selected ? 1.65 : 1} />
      <path d="M9 25L69 7 M9 201L69 183" fill="none" stroke="var(--model-line)" strokeOpacity=".6" />
      {cells.map(({ x, y, opacity }, cell) => (
        <rect key={cell} x={x} y={y} width="8" height="8" rx="1.5" transform={`skewY(-16) translate(0 ${x * .286})`} fill={(cell + index * 2) % 7 === 0 ? 'var(--model-signal)' : 'var(--model-line)'} opacity={opacity} />
      ))}
      {animate && (
        <Pulse start={layer.fire} duration={1.6}>
          <path d={face} fill="var(--model-signal)" fillOpacity=".21" stroke="var(--model-bright)" strokeWidth="1.4" />
          {(index === 1 || index === 2) && (
            <path d="M16 40Q73 43 16 113Q57 112 31 134 M16 64Q77 73 46 128" fill="none" stroke="var(--model-bright)" strokeOpacity=".58" />
          )}
          {cells.filter((_, cell) => (cell + index) % 3 === 0).map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1.5" fill="var(--model-bright)" opacity=".92" transform={`skewY(-16) translate(0 ${x * .286})`} />
          ))}
        </Pulse>
      )}
    </g>
  );
}

const channels = modelLayers.slice(0, -1).map((layer, index) => {
  const next = modelLayers[index + 1];
  const links = [
    [43, 44], [69, 116], [93, 79], [118, 49], [143, 147], [166, 101],
  ];

  return links.map(([row, nextRow], link) => {
    const from = layer.x + 88;
    const to = next.x + 4;
    const middle = (from + to) / 2;
    const path = `M${from} ${layer.y + row} C${middle} ${layer.y + row} ${middle} ${next.y + nextRow} ${to} ${next.y + nextRow}`;
    return { path, accented: link === 2 || link === 4, start: layer.fire + link * .09 };
  });
});

function QubitOrbit({ x, y, angle, animate }: { x: number; y: number; angle: number; animate: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} fill="none" stroke="var(--model-line)">
      <circle r="24" strokeOpacity=".7" />
      <ellipse rx="24" ry="8.4" strokeOpacity=".62" />
      <ellipse rx="9" ry="24" strokeOpacity=".4" />
      <path d="M0-27V27 M-20 15L17-16" strokeDasharray="2 3" strokeOpacity=".55" />
      <path d="M0 0L13-15L7-14 M13-15L12-9" stroke="var(--model-signal)" strokeWidth="1.25" />
      {animate && (
        <circle r="2.6" fill="var(--model-bright)" stroke="none">
          <animateMotion path="M-24 0a24 8.4 0 1 0 48 0a24 8.4 0 1 0-48 0" dur="6s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function Output({ kind, x, y, animate, arrival }: { kind: typeof outputs[number]['kind']; x: number; y: number; animate: boolean; arrival: number }) {
  return (
    <g transform={`translate(${x} ${y})`} data-model-output={kind} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4H65Q71 4 71 10V50Q71 56 65 56H6Q0 56 0 50V10Q0 4 6 4Z" transform="translate(3 3)" fill="var(--model-depth)" stroke="var(--model-line)" opacity=".55" />
      <rect x="0" y="0" width="70" height="55" rx="6" fill="var(--model-surface)" stroke="var(--model-line)" />
      {kind === 'document' && (
        <g stroke="var(--model-line)">
          <path d="M23 10H41L48 17V44H23Z M41 10V17H48 M28 25H42 M28 31H42 M28 37H38" />
          <path d="M28 19H34" stroke="var(--model-signal)" strokeWidth="2" />
        </g>
      )}
      {kind === 'graph' && (
        <g stroke="var(--model-line)">
          <path d="M16 32L31 17L44 29L55 16 M16 32L32 42L44 29L54 39 M31 17L32 42" />
          {[[16, 32], [31, 17], [44, 29], [55, 16], [32, 42], [54, 39]].map(([cx, cy]) => (
            <circle key={cx + '-' + cy} cx={cx} cy={cy} r="3.2" fill={cx === 44 ? 'var(--model-signal)' : 'var(--model-surface)'} />
          ))}
        </g>
      )}
      {kind === 'chart' && (
        <g stroke="var(--model-line)">
          <path d="M13 13V43H57 M20 37V31H27V37 M32 37V24H39V37 M44 37V18H51V37" />
          <path d="M20 25L33 18L46 11L53 12" stroke="var(--model-signal)" />
        </g>
      )}
      {kind === 'insight' && (
        <g stroke="var(--model-line)">
          <path d="M13 35H58 M13 41H43 M32 14H57 M32 22H49" />
          <path d="M20 11L22 18L29 20L22 22L20 29L18 22L11 20L18 18Z" stroke="var(--model-signal)" fill="var(--model-surface)" />
          <circle cx="54" cy="24" r="2" fill="var(--model-signal)" stroke="none" />
        </g>
      )}
      {animate && (
        <Pulse start={arrival} duration={1.45}>
          <rect width="70" height="55" rx="6" stroke="var(--model-signal)" strokeWidth="2" fill="var(--model-signal)" fillOpacity=".15" />
        </Pulse>
      )}
    </g>
  );
}

export function HeroModelAnimation({ activeTrack }: { activeTrack: EngineeringTrack }) {
  const id = useId();
  const { paused, togglePaused } = useContext(HomeMotionContext);
  const layerRef = useBackdropMotion('.home-hero');
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return (
    <>
      <div ref={layerRef} className="hero-model-animation" aria-hidden="true">
        <svg viewBox="0 0 820 485" focusable="false">
          <defs>
            <radialGradient id={`${id}-model-field`}>
              <stop stopColor="var(--model-line)" stopOpacity=".19" />
              <stop offset="1" stopColor="var(--model-line)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="493" cy="213" rx="330" ry="208" fill={`url(#${id}-model-field)`} />

          <g fill="none" stroke="var(--model-line)" strokeLinecap="round">
            <path d="M-25 90C92 62 176 105 230 130 M-26 292C95 299 168 259 236 277" strokeWidth=".85" strokeDasharray="2 8" opacity=".56" />
            {inputs.map((path) => <path key={path} d={path} opacity=".36" />)}
            <path d="M428 122V76H459 M565 113V55H606" strokeDasharray="2 5" opacity=".48" />
          </g>

          {scatteredFragments.map(([x, y, scale], index) => (
            <path key={x} d={fragments[index % fragments.length]} transform={`translate(${x} ${y}) rotate(${index * 27}) scale(${scale})`} fill="var(--model-surface)" stroke={index % 5 === 0 ? 'var(--model-signal)' : 'var(--model-line)'} opacity={index % 3 === 0 ? .68 : .46} />
          ))}
          {!reducedMotion && inputs.map((path, index) => (
            <g key={path}>
              {[0, 1, 2].map((batch) => (
                <g key={batch}>
                  <MovingSignal path={path} start={4 * batch + index * .26} duration={2.45 - index * .13}>
                    <path d={fragments[(index + batch) % fragments.length]} transform={`scale(${.67 + batch * .12})`} fill="var(--model-depth)" stroke={index % 3 === 0 ? 'var(--model-signal)' : 'var(--model-line)'} />
                  </MovingSignal>
                </g>
              ))}
            </g>
          ))}

          <QubitOrbit x={482} y={76} angle={-23} animate={!reducedMotion} />
          <QubitOrbit x={630} y={55} angle={31} animate={!reducedMotion} />

          {outputs.map(({ kind, x, y, routeY, gateY }, index) => {
            const start = 6.93 + index * .24;
            const duration = 3.34 - index * .32;
            const path = `M748 ${236 + index * 18} C787 ${236 + index * 18} 798 ${gateY - 45} 753 ${gateY} S${x + 114} ${routeY} ${x + 70} ${y + 27}`;
            return (
              <g key={kind}>
                <path d={path} fill="none" stroke={index === 0 ? 'var(--model-signal)' : 'var(--model-line)'} strokeWidth="1.2" opacity={index === 0 ? .62 : .46} />
                {!reducedMotion && (
                  <MovingSignal path={path} start={start} duration={duration}><SignalHead /></MovingSignal>
                )}
                <Output kind={kind} x={x} y={y} arrival={start + duration} animate={!reducedMotion} />
              </g>
            );
          })}

          {channels.map((links, index) => (
            <g key={modelLayers[index].x}>
              {links.map(({ path, accented, start }) => (
                <g key={path}>
                  <path d={path} fill="none" stroke={accented ? 'var(--model-signal)' : 'var(--model-line)'} strokeWidth="1.15" opacity={accented ? .78 : .58} />
                  {!reducedMotion && accented && (
                    <MovingSignal path={path} start={start} duration={1.27}><SignalHead /></MovingSignal>
                  )}
                </g>
              ))}
            </g>
          ))}

          {modelLayers.map((layer, index) => (
            <g key={layer.x}>
              <Layer index={index} selected={'track' in layer && layer.track === activeTrack} animate={!reducedMotion} />
            </g>
          ))}
        </svg>
      </div>

      {!reducedMotion && (
        <button type="button" className="hero-model-toggle site-button" onClick={togglePaused}>
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          {paused ? 'Play backgrounds' : 'Pause backgrounds'}
        </button>
      )}
    </>
  );
}
