import { useBackdropMotion } from './useBackdropMotion';

type BackdropMode = 'valuation' | 'routing' | 'vision' | 'platforms' | 'document' | 'kinematic' | 'defect' | 'physical' | 'stream' | 'meridian' | 'convergence';
type Point = readonly [number, number];

function Packet({ path, offset = 0 }: { path: string; offset?: number }) {
  return (
    <circle className="home-backdrop__packet" r="3.5">
      <animateMotion path={path} dur="5s" begin={`-${offset + 1}s`} repeatCount="indefinite" />
    </circle>
  );
}

function Routing({ activeStage }: { activeStage?: number }) {
  const stages: Point[] = [[90, 180], [218, 130], [347, 230], [470, 173]];

  return (
    <>
      <ellipse cx="280" cy="180" rx="202" ry="94" opacity=".56" />
      {stages.slice(0, -1).map(([x, y], index) => {
        const [nextX, nextY] = stages[index + 1];
        const middle = (x + nextX) / 2;
        const path = `M${x} ${y} C${middle} ${y} ${middle} ${nextY} ${nextX} ${nextY}`;
        return (
          <g key={path}>
            <path d={path} className={index === 1 ? 'home-backdrop__accent' : undefined} />
            <Packet path={path} offset={index * 1.6} />
          </g>
        );
      })}
      {stages.map(([x, y], index) => {
        const active = index === (activeStage ?? 2);
        return (
          <g key={x} className={active ? 'home-backdrop__accent' : undefined} transform={`translate(${x} ${y})`}>
            {activeStage === undefined ? <circle r={active ? 20 : 16} className="home-backdrop__node" /> : <rect x="-16" y="-16" width="32" height="32" rx="7" className="home-backdrop__node" />}
            <circle r={active ? 5 : 4} fill="currentColor" />
          </g>
        );
      })}
    </>
  );
}

const joints: Point[] = [[283, 110], [282, 133], [252, 142], [308, 142], [230, 168], [331, 166], [234, 196], [325, 136], [280, 186], [258, 224], [302, 224], [252, 258], [308, 258]];
const bones = [[0, 1], [1, 2], [1, 3], [2, 4], [4, 6], [3, 5], [5, 7], [1, 8], [8, 9], [9, 11], [8, 10], [10, 12]];

function Vision({ kinematic }: { kinematic: boolean }) {
  return (
    <>
      {kinematic ? (
        <path d="M177 118A115 115 0 0 1 383 118" opacity=".7" />
      ) : (
        <>
          <rect x="100" y="65" width="360" height="230" opacity=".64" />
          <path d="M100 81V65H116 M444 65H460V81 M100 279V295H116 M444 295H460V279" className="home-backdrop__accent" />
          <path d="M100 65V295" className="home-backdrop__accent" opacity=".72">
            <animateTransform attributeName="transform" type="translate" values="0 0;360 0;0 0" dur="10s" repeatCount="indefinite" />
          </path>
        </>
      )}
      <g strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" values="-5 280 186;5 280 186;-5 280 186" dur="6s" repeatCount="indefinite" />
        {bones.map(([from, to]) => (
          <path key={`${from}-${to}`} d={`M${joints[from].join(' ')}L${joints[to].join(' ')}`} />
        ))}
        {joints.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 6 || index === 7 || index === 8 ? 4.6 : 3.2} fill="currentColor" className={index === 6 || index === 7 || index === 8 ? 'home-backdrop__accent' : undefined} />
        ))}
      </g>
    </>
  );
}

// The original inspection boxes and spatial reticles, scaled into the section SVG.
function OpticalInspection() {
  return (
    <>
      <path d="M45 180H515" opacity=".3" />
      <path d="M78 50V302" className="home-backdrop__accent">
        <animateTransform attributeName="transform" type="translate" values="0 0;404 0;0 0" dur="9s" repeatCount="indefinite" />
      </path>
      <rect x="134" y="158" width="92" height="68" />
      <rect x="269" y="173" width="110" height="74" className="home-backdrop__accent" />
      <rect x="269" y="173" width="110" height="74" fill="currentColor" opacity=".12" className="home-backdrop__accent" />
      <rect x="381" y="130" width="84" height="60" />
    </>
  );
}

function SpatialReticle() {
  return (
    <>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 280 180" to="360 280 180" dur="18s" repeatCount="indefinite" />
        <circle cx="280" cy="180" r="96" strokeDasharray="422 182" />
      </g>
      <g className="home-backdrop__accent">
        <animateTransform attributeName="transform" type="rotate" from="0 280 180" to="-360 280 180" dur="18s" repeatCount="indefinite" />
        <circle cx="280" cy="180" r="58" strokeDasharray="200 165" />
      </g>
      <path d="M256 180H304 M280 156V204" />
    </>
  );
}

const columns = [112, 196, 280, 364, 448];
const layers = [97, 180, 263];

function Platforms() {
  return (
    <>
      {columns.map((x, index) => {
        const path = `M${x} 263V97`;
        return (
          <g key={x}>
            <path d={path} opacity=".63" />
            <Packet path={path} offset={index * .8} />
          </g>
        );
      })}
      {layers.map((y, index) => (
        <g key={y} className={index === 0 ? 'home-backdrop__accent' : undefined}>
          <path d={`M112 ${y}H448`} />
          {columns.map((x) => <circle key={x} cx={x} cy={y} r="6" className="home-backdrop__node" />)}
        </g>
      ))}
    </>
  );
}

function DocumentScan() {
  return (
    <>
      <rect x="90" y="56" width="380" height="245" opacity=".72" />
      {[78, 108, 138, 168, 198].map((y, index) => (
        <rect key={y} x="110" y={y} width={index === 4 ? 270 : 340} height="14" fill="currentColor" opacity=".2" className={index === 2 ? 'home-backdrop__accent' : undefined} />
      ))}
      <rect x="107" y="136" width="346" height="18" rx="2" className="home-backdrop__accent" />
      <path d="M80 56H480" className="home-backdrop__accent">
        <animateTransform attributeName="transform" type="translate" values="0 0;0 245;0 0" dur="9s" repeatCount="indefinite" />
      </path>
    </>
  );
}

const waveform = Array.from({ length: 145 }, (_, index) => {
  const phase = (index % 72) * .25;
  const spike = Math.abs(Math.sin(phase * .35)) > .94 ? Math.sin(phase * 3.1) * 52 : Math.sin(phase) * 18 + Math.cos(phase * 1.7) * 9;
  return `${index * 560 / 72},${216 - Math.abs(spike)}`;
}).join(' ');

function Stream() {
  return (
    <svg viewBox="0 0 560 360" width="560" height="360">
      <path d="M0 90H560 M0 180H560 M0 270H560" opacity=".28" />
      <g>
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-560 0" dur="13s" repeatCount="indefinite" />
        <polyline points={waveform} />
        {[215, 329, 775, 889].map((x) => (
          <g key={x} className="home-backdrop__accent">
            <path d={`M${x} 169V242`} opacity=".75" />
            <circle cx={x} cy="169" r="4.5" fill="currentColor" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function SectionBackdrop({ mode, activeStage }: { mode: BackdropMode; activeStage?: number }) {
  const layerRef = useBackdropMotion();
  const ring = mode === 'meridian' || mode === 'convergence';

  const illustrations = {
    valuation: <Routing activeStage={activeStage ?? 0} />,
    routing: <Routing />,
    vision: <Vision kinematic={false} />,
    kinematic: <Vision kinematic />,
    defect: <OpticalInspection />,
    physical: <SpatialReticle />,
    platforms: <Platforms />,
    document: <DocumentScan />,
    stream: <Stream />,
  };

  return (
    <div ref={layerRef} aria-hidden="true" className={`home-backdrop home-backdrop--${mode}`}>
      <svg viewBox={mode === 'convergence' ? '0 0 1200 600' : '0 0 1200 500'} focusable="false">
        <g className="home-backdrop__art" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          {mode === 'meridian' && (
            <>
              <circle cx="980" cy="120" r="320" opacity=".65" />
              <circle cx="980" cy="120" r="460" strokeDasharray="5 9" className="home-backdrop__accent">
                <animate attributeName="stroke-dashoffset" values="0;-42" dur="12s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          {mode === 'convergence' && (
            <>
              <circle cx="600" cy="640" r="360" opacity=".65" />
              <circle cx="600" cy="640" r="500" strokeDasharray="4 10" className="home-backdrop__accent">
                <animate attributeName="stroke-dashoffset" values="0;-42" dur="12s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="640" r="640" opacity=".45" />
            </>
          )}
          {!ring && (
            <g className="home-backdrop__placement">
              <g transform="translate(485 4) scale(1.34)">
                {illustrations[mode]}
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
