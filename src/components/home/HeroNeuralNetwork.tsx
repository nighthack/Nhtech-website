import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export type EngineeringTrack = 'embedded' | 'vision-edge' | 'custom-platforms';

const cycle = 10;
const leadIn = 1.3;

const connections = [
  { id: 'intake', path: 'M23 296 C64 291 76 312 113 310 C164 308 195 282 226 251 C250 226 271 223 295 217', start: 0, travel: 2.35, end: [295, 217] },
  { id: 'relay', path: 'M295 217 C332 204 348 161 385 151 C416 142 425 154 456 132', start: 2.35, travel: 2.23, end: [456, 132] },
  { id: 'feedback', path: 'M295 217 C333 207 349 232 372 255 C405 290 428 302 484 303', start: 2.44, travel: 2.65, end: [484, 303] },
  { id: 'upper-exit', path: 'M456 132 C484 113 503 128 534 116 C572 102 591 63 641 49', start: 4.58, travel: 2.21 },
  { id: 'lower-exit', path: 'M484 303 C521 305 542 332 577 332 C608 332 623 318 648 319', start: 5.09, travel: 2.28 },
  { id: 'return', path: 'M29 120 C66 111 92 136 132 143 C180 151 217 134 246 158 C272 178 267 201 295 217', start: 6.42, travel: 2.46, end: [295, 217] },
] as const;

const fibers = [
  'M3 279 C49 256 92 284 135 278 S192 240 226 233 S268 228 295 217',
  'M7 321 C58 310 75 338 117 334 S184 306 211 275 S264 228 295 217',
  'M16 354 C39 331 77 335 117 334 S207 307 236 279 S267 236 295 217',
  'M28 384 C78 389 130 363 152 341 C173 319 177 299 192 285',
  'M37 245 C99 254 102 231 136 233 C180 236 191 222 214 202 C243 177 268 202 295 217',
  'M22 96 C68 90 93 115 132 118 C173 121 205 113 230 135 C255 156 260 178 275 189',
  'M71 49 C106 73 141 80 172 81 C213 83 236 106 246 158',
  'M20 164 C64 174 107 150 132 143 C160 135 189 151 192 170',
  'M78 201 C102 180 111 156 132 143 C149 133 151 116 149 92',
  'M149 67 C154 92 153 115 132 143 C123 156 113 164 115 185',
  'M132 143 C151 164 179 167 196 186 S209 209 226 212',
  'M295 217 C305 188 319 172 347 161 S399 112 421 93 S458 70 477 38',
  'M295 217 C341 200 371 194 405 182 S437 146 456 132',
  'M295 217 C341 218 346 228 374 234 S423 228 449 207 S469 163 456 132',
  'M456 132 C486 149 514 155 544 148 S586 125 639 132',
  'M456 132 C485 137 503 100 522 83 S551 72 555 38',
  'M456 132 C472 121 475 104 492 89 S536 66 540 49',
  'M538 115 C554 116 571 126 579 142 S594 155 618 157',
  'M556 150 C573 158 591 169 615 173 S638 174 655 188',
  'M295 217 C325 244 320 262 339 286 S388 309 410 319 S452 315 484 303',
  'M295 217 C323 225 345 219 373 223 S417 241 433 263 S458 291 484 303',
  'M484 303 C464 276 471 255 490 239 S544 224 575 194',
  'M484 303 C514 284 531 289 560 275 S598 247 651 252',
  'M484 303 C499 321 501 341 528 357 S581 353 623 383',
  'M484 303 C472 343 451 356 430 376 S414 390 397 403',
  'M484 303 C513 316 537 320 557 320 S583 308 601 298',
  'M382 298 C392 321 384 343 403 355 S427 362 430 376',
  'M245 267 C236 292 251 309 276 326 S306 342 316 368',
  'M211 275 C200 309 209 325 231 345 S246 374 239 402',
  'M117 334 C126 348 129 365 120 389',
  'M534 116 C550 96 550 77 576 65 S603 61 610 28',
] as const;

const cells = [
  { x: 132, y: 143, transform: 'rotate(30) scale(.57)' },
  { x: 295, y: 217, transform: 'rotate(-17) scale(1.12)', track: 'embedded' },
  { x: 456, y: 132, transform: 'rotate(33) scale(.82)', track: 'vision-edge' },
  { x: 484, y: 303, transform: 'rotate(-26) scale(.7)', track: 'custom-platforms' },
] as const;

const terminals = [
  [16, 354], [37, 245], [78, 201], [71, 49], [149, 67], [239, 402],
  [316, 368], [397, 403], [477, 38], [555, 38], [610, 28], [641, 49],
  [639, 132], [615, 173], [575, 194], [651, 252], [648, 319], [623, 383],
] as const;

const membrane = 'M-28 1 C-18-3-18-12-23-22 C-15-15-9-15-3-17 C5-21 7-30 9-36 C9-24 13-19 18-13 C24-7 37-12 42-12 C30-7 25 0 25 7 C26 14 34 20 38 24 C26 18 17 17 10 22 C3 27 2 33-2 38 C-2 28-6 20-14 16 C-21 13-28 15-38 21 C-28 13-23 8-28 1Z';

function Signal({ connection }: { connection: typeof connections[number] }) {
  const arrival = connection.travel / cycle;
  const timing = {
    begin: `${connection.start - cycle - leadIn}s`,
    dur: `${cycle}s`,
    repeatCount: 'indefinite',
  };

  return (
    <>
      <g opacity="0">
        <ellipse rx="12" ry="3" fill="var(--neural-signal)" opacity=".24" />
        <path d="M-14 0H4" stroke="var(--neural-signal)" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
        <circle r="2.2" fill="var(--neural-peak)" />
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;.035;${arrival - 0.018};${arrival + 0.008};1`} {...timing} />
        <animateMotion path={connection.path} rotate="auto" calcMode="linear" keyPoints="0;1;1" keyTimes={`0;${arrival};1`} {...timing} />
      </g>
      {'end' in connection && (
        <g transform={`translate(${connection.end.join(' ')})`} opacity="0">
          <circle r="10" fill="none" stroke="var(--neural-signal)" strokeWidth="1.1">
            <animate attributeName="r" values="10;10;32;32" keyTimes={`0;${arrival};${arrival + 0.11};1`} {...timing} />
          </circle>
          <circle r="6" fill="var(--neural-peak)" />
          <animate attributeName="opacity" values="0;0;.9;0;0" keyTimes={`0;${arrival - 0.014};${arrival + 0.012};${arrival + 0.11};1`} {...timing} />
        </g>
      )}
    </>
  );
}

export function HeroNeuralNetwork({ activeTrack }: { activeTrack: EngineeringTrack }) {
  const id = useId();
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
    <div className="hero-neural-network relative">
      <svg
        id={`${id}-network`}
        ref={svgRef}
        viewBox="0 0 660 424"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none block h-auto w-full"
      >
        <defs>
          <radialGradient id={`${id}-field`}>
            <stop stopColor="var(--neural-filament)" stopOpacity=".19" />
            <stop offset=".52" stopColor="var(--neural-filament)" stopOpacity=".07" />
            <stop offset="1" stopColor="var(--neural-filament)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-cell`}>
            <stop stopColor="var(--neural-filament)" stopOpacity=".52" />
            <stop offset="1" stopColor="var(--neural-filament)" stopOpacity=".08" />
          </radialGradient>
          <radialGradient id={`${id}-warm`}>
            <stop stopColor="var(--neural-signal)" stopOpacity=".3" />
            <stop offset="1" stopColor="var(--neural-signal)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-fiber`} gradientUnits="userSpaceOnUse" x1="0" y1="350" x2="650" y2="75">
            <stop stopColor="var(--neural-filament)" stopOpacity=".12" />
            <stop offset=".4" stopColor="var(--neural-filament)" stopOpacity=".84" />
            <stop offset=".73" stopColor="var(--neural-filament)" stopOpacity=".67" />
            <stop offset="1" stopColor="var(--neural-filament)" stopOpacity=".17" />
          </linearGradient>
        </defs>

        <ellipse cx="356" cy="220" rx="303" ry="202" fill={`url(#${id}-field)`} />
        <ellipse cx="455" cy="132" rx="136" ry="105" fill={`url(#${id}-field)`} opacity=".8" />

        <g fill="none" stroke={`url(#${id}-fiber)`} strokeLinecap="round">
          {fibers.map((path, index) => (
            <path key={path} d={path} strokeWidth={index % 4 === 0 ? 1.15 : 0.75} opacity={index % 3 === 0 ? 0.84 : 0.53} />
          ))}
          {connections.map(({ id, path }) => (
            <path key={id} d={path} strokeWidth={1.6} />
          ))}
        </g>
        <g fill="var(--neural-filament)" opacity=".46">
          {terminals.map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.6" />)}
        </g>

        {cells.map(({ x, y, transform, ...cell }) => {
          const active = 'track' in cell && cell.track === activeTrack;
          return (
            <g key={x} transform={`translate(${x} ${y})`}>
              <circle r="64" fill={`url(#${id}-warm)`} opacity={active ? 0.9 : 0} className="motion-safe:transition-opacity" />
              <g transform={transform}>
                <path d={membrane} fill={`url(#${id}-cell)`} stroke={active ? 'var(--neural-signal)' : 'var(--neural-filament)'} strokeWidth="1.15" />
                <circle r="10" fill="none" stroke={active ? 'var(--neural-signal)' : 'var(--neural-filament)'} opacity=".53" />
                <circle r="4.2" fill={active ? 'var(--neural-signal)' : 'var(--neural-filament)'} />
                <circle r="1.5" fill="var(--neural-peak)" />
              </g>
            </g>
          );
        })}
        {!reducedMotion && connections.map((connection) => (
          <g key={connection.id}><Signal connection={connection} /></g>
        ))}
      </svg>

      {!reducedMotion && (
        <button
          type="button"
          aria-controls={`${id}-network`}
          className="hero-neural-toggle site-button absolute right-0 top-0 px-2.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          {paused ? 'Play animation' : 'Pause animation'}
        </button>
      )}
    </div>
  );
}
