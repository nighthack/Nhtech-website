import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useBackdropMotion } from './SectionBackdrop';

export type EngineeringTrack = 'embedded' | 'vision-edge' | 'custom-platforms';

type Point = readonly [number, number];

const reservoirs: { id: EngineeringTrack; center: Point; radius: Point; seed: number }[] = [
  { id: 'embedded', center: [742, 357], radius: [168, 157], seed: 0.45 },
  { id: 'vision-edge', center: [991, 223], radius: [151, 144], seed: 1.5 },
  { id: 'custom-platforms', center: [1048, 470], radius: [174, 148], seed: 2.8 },
];

function reservoirNodes(center: Point, radius: Point, seed: number) {
  return Array.from({ length: 27 }, (_, index): Point => {
    const angle = index * Math.PI * (3 - Math.sqrt(5)) + seed;
    const distance = Math.sqrt(index / 26);
    return [
      center[0] + Math.cos(angle) * radius[0] * distance,
      center[1] + Math.sin(angle) * radius[1] * distance,
    ];
  });
}

function reservoirEdges(nodes: Point[]) {
  return nodes.flatMap(([x, y], index) =>
    nodes
      .map(([neighborX, neighborY], other) => ({ other, distance: Math.hypot(x - neighborX, y - neighborY) }))
      .filter(({ other }) => other > index)
      .sort((first, second) => first.distance - second.distance)
      .slice(0, 2)
      .filter(({ distance }) => distance < 135)
      .map(({ other }) => {
        const [endX, endY] = nodes[other];
        return `M${x} ${y} Q${(x + endX) / 2 + (endY - y) * .15} ${(y + endY) / 2} ${endX} ${endY}`;
      }),
  );
}

const clusters = reservoirs.map(({ id, center, radius, seed }) => {
  const nodes = reservoirNodes(center, radius, seed);
  return { id, center, radius, nodes, edges: reservoirEdges(nodes) };
});

const channels = [
  'M0 184H286C459 184 486 260 590 293S678 332 742 357',
  'M0 246H208C417 246 453 299 552 329S660 345 742 357',
  'M0 364H219C421 364 443 391 583 382S671 363 742 357',
  'M0 471H240C348 471 508 491 596 438S696 372 742 357',
  'M0 541H292C486 541 566 474 648 422S700 385 742 357',
  'M742 357C801 331 855 341 896 276S961 231 991 223',
  'M742 357C844 342 852 407 919 433S1006 462 1048 470',
  'M991 223C1089 207 1156 316 1116 389S1070 454 1048 470',
  'M1048 470C1013 557 886 616 796 560S738 458 742 357',
  'M991 223C966 151 837 174 781 220S737 307 742 357',
  'M991 223C1139 104 1198 158 1291 180H1440',
  'M991 223C1103 251 1150 230 1234 243S1311 258 1440 258',
  'M1048 470C1165 420 1228 336 1301 331H1440',
  'M1048 470C1162 484 1220 411 1310 416H1440',
  'M1048 470C1198 544 1240 505 1322 500H1440',
] as const;

const packets = [
  { channel: 1, start: 0, duration: 2.6, end: reservoirs[0].center },
  { channel: 3, start: 0.58, duration: 2.02 },
  { channel: 5, start: 2.6, duration: 1.65, end: reservoirs[1].center },
  { channel: 6, start: 2.72, duration: 2.05, end: reservoirs[2].center },
  { channel: 7, start: 4.25, duration: 2.5, end: reservoirs[2].center },
  { channel: 10, start: 4.25, duration: 2.18 },
  { channel: 12, start: 4.77, duration: 2.1 },
  { channel: 14, start: 6.75, duration: 2.1 },
  { channel: 8, start: 6.75, duration: 2.74, end: reservoirs[0].center },
] as const;

const cycle = 11;

function Signal({ packet }: { packet: typeof packets[number] }) {
  const arrival = packet.duration / cycle;
  const timing = { begin: `${packet.start - cycle - 1.1}s`, dur: `${cycle}s`, repeatCount: 'indefinite' };

  return (
    <>
      <g opacity="0">
        <path d="M-18 0H3" stroke="var(--neural-signal)" strokeWidth="2" strokeLinecap="round" opacity=".72" />
        <circle r="3" fill="var(--neural-peak)" />
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;.025;${arrival - .018};${arrival + .01};1`} {...timing} />
        <animateMotion path={channels[packet.channel]} rotate="auto" calcMode="linear" keyPoints="0;1;1" keyTimes={`0;${arrival};1`} {...timing} />
      </g>
      {'end' in packet && (
        <g transform={`translate(${packet.end.join(' ')})`} opacity="0">
          <circle r="5" fill="var(--neural-peak)" />
          <circle r="9" fill="none" stroke="var(--neural-signal)" strokeWidth="1.4">
            <animate attributeName="r" values="9;9;34;34" keyTimes={`0;${arrival};${arrival + .11};1`} {...timing} />
          </circle>
          <animate attributeName="opacity" values="0;0;.83;0;0" keyTimes={`0;${arrival - .01};${arrival + .012};${arrival + .11};1`} {...timing} />
        </g>
      )}
    </>
  );
}

export function HeroNeuralNetwork({ activeTrack }: { activeTrack: EngineeringTrack }) {
  const id = useId();
  const layerRef = useBackdropMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) return;

    const bounds = svg.getBoundingClientRect();
    let visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    const syncPlayback = () => {
      if (visible && !document.hidden && !paused) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };

    syncPlayback();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(svg);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [paused, reducedMotion]);

  return (
    <>
      <div ref={layerRef} className="hero-neural-network" aria-hidden="true">
        <svg
          id={`${id}-network`}
          ref={svgRef}
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id={`${id}-field`}>
              <stop stopColor="var(--neural-filament)" stopOpacity=".19" />
              <stop offset=".58" stopColor="var(--neural-filament)" stopOpacity=".07" />
              <stop offset="1" stopColor="var(--neural-filament)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${id}-warm`}>
              <stop stopColor="var(--neural-signal)" stopOpacity=".29" />
              <stop offset="1" stopColor="var(--neural-signal)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${id}-channel`}>
              <stop stopColor="var(--neural-filament)" stopOpacity=".27" />
              <stop offset=".55" stopColor="var(--neural-filament)" stopOpacity=".68" />
              <stop offset="1" stopColor="var(--neural-filament)" stopOpacity=".35" />
            </linearGradient>
          </defs>

          <g className="hero-neural-network__layout">
            <ellipse cx="941" cy="349" rx="530" ry="342" fill={`url(#${id}-field)`} />
            <g fill="none" stroke={`url(#${id}-channel)`} strokeWidth="1.4" strokeLinecap="round">
              {channels.map((path) => <path key={path} d={path} />)}
            </g>

            {clusters.map(({ id: track, center: [centerX, centerY], radius: [radiusX, radiusY], nodes, edges }) => {
              const active = track === activeTrack;
              return (
                <g key={track} className="hero-neural-network__cluster" data-active={active}>
                  <ellipse cx={centerX} cy={centerY} rx={radiusX} ry={radiusY} fill={`url(#${id}-field)`} />
                  <ellipse className="hero-neural-network__highlight" cx={centerX} cy={centerY} rx={radiusX} ry={radiusY} fill={`url(#${id}-warm)`} />
                  <g className="hero-neural-network__connections" fill="none" strokeWidth="1.15">
                    {edges.map((path) => <path key={path} d={path} />)}
                  </g>
                  <g className="hero-neural-network__nodes">
                    {nodes.map(([x, y], index) => <circle key={x} cx={x} cy={y} r={index === 0 ? 6 : index % 4 === 0 ? 3.5 : 2.2} />)}
                  </g>
                  <circle cx={centerX} cy={centerY} r="12" fill="none" stroke="var(--neural-filament)" opacity=".65" />
                </g>
              );
            })}

            <g fill="var(--neural-filament)" opacity=".72">
              {[180, 258, 331, 416, 500].map((y) => <rect key={y} x="1357" y={y - 4} width="8" height="8" rx="2" />)}
            </g>
            {!reducedMotion && packets.map((packet) => (
              <g key={packet.channel}><Signal packet={packet} /></g>
            ))}
          </g>
        </svg>
      </div>
      {!reducedMotion && (
        <button
          type="button"
          aria-controls={`${id}-network`}
          className="hero-neural-toggle site-button"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          {paused ? 'Play animation' : 'Pause animation'}
        </button>
      )}
    </>
  );
}
