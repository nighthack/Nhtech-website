import { useEffect, useRef } from 'react';

/** Move the decorative layer from input scoped to its own section. */
export function useBackdropMotion() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.parentElement;
    if (!layer || !section) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let listening = false;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - rect.top - rect.height / 2) / ((window.innerHeight + rect.height) / 2);
      const x = pointer ? (pointer.x - rect.left) / rect.width - 0.5 : 0;
      const y = pointer ? (pointer.y - rect.top) / rect.height - 0.5 : 0;
      layer.style.setProperty('--backdrop-x', `${x * 34}px`);
      layer.style.setProperty('--backdrop-y', `${y * 24 + progress * 28}px`);
      layer.style.setProperty('--backdrop-scroll', `${progress * 55}px`);
    };

    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      requestPaint();
    };

    const onLeave = () => {
      pointer = null;
      requestPaint();
    };

    const sync = () => {
      const active = visible && !preference.matches && !document.hidden;
      if (active === listening) return;
      listening = active;

      if (active) {
        section.dataset.motionActive = '';
        section.addEventListener('pointermove', onPointer, { passive: true });
        section.addEventListener('pointerleave', onLeave);
        window.addEventListener('scroll', requestPaint, { passive: true });
        window.addEventListener('resize', requestPaint);
        requestPaint();
      } else {
        delete section.dataset.motionActive;
        section.removeEventListener('pointermove', onPointer);
        section.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('scroll', requestPaint);
        window.removeEventListener('resize', requestPaint);
        cancelAnimationFrame(frame);
        frame = 0;
        pointer = null;
        layer.style.removeProperty('--backdrop-x');
        layer.style.removeProperty('--backdrop-y');
        layer.style.removeProperty('--backdrop-scroll');
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      visible = false;
      sync();
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return layerRef;
}

type BackdropMode = 'routing' | 'vision' | 'platforms' | 'sectors' | 'ledger' | 'convergence';
type Point = readonly [number, number];

interface Diagram {
  traces: readonly string[];
  signal: string;
  nodes: readonly Point[];
}

const diagrams: Record<BackdropMode, Diagram> = {
  routing: {
    traces: [
      'M25 100H320Q386 100 386 166V201Q386 245 430 245H1400',
      'M96 186H265Q303 186 321 224L348 283Q369 330 403 330H616Q684 330 684 266V245',
      'M520 245V159Q520 121 558 121H737Q775 121 775 159V245',
      'M870 245V350Q870 392 912 392H1203Q1245 392 1245 350V245',
      'M684 245V288Q684 344 740 344H802Q834 344 834 311V245',
      'M983 245V183Q983 137 1029 137H1438',
      'M1100 245V305Q1100 343 1138 343H1475',
      'M520 121V66M775 121V77M870 392V452M1245 392V448',
    ],
    signal: 'M380 245H516Q520 245 520 241V159Q520 121 558 121H737Q775 121 775 159V245H1400',
    nodes: [[386, 201], [520, 245], [684, 245], [775, 245], [870, 245], [983, 245], [1100, 245], [1245, 245]],
  },
  vision: {
    traces: [
      'M93 258L1286 43V477Z', 'M184 258L1105 94V424Z', 'M300 258L937 151V366Z',
      'M840 178L1064 123L1227 187L1001 242Z', 'M840 178V350L1001 416V242L1227 187V365L1001 416',
      'M840 350L1064 295V123M1064 295L1227 365', 'M1064 123L1001 416M840 178L1227 365',
      'M1154 98V446M1308 111V423M705 186V330',
    ],
    signal: 'M93 258L1227 187L1001 242V416L1227 365',
    nodes: [[93, 258], [705, 220], [840, 178], [1001, 242], [1064, 123], [1227, 187], [1227, 365], [1001, 416]],
  },
  platforms: {
    traces: [
      'M475 130L953 44L1299 157L821 244Z', 'M475 199L953 113L1299 226L821 313Z',
      'M475 268L953 182L1299 295L821 382Z', 'M475 337L953 251L1299 364L821 451Z',
      'M475 130V337M953 44V251M1299 157V364M821 244V451',
      'M636 101V308M794 72V280M1109 96V302M642 185V391M1138 186V393M986 213V421',
      'M265 178L475 199M151 288L475 268M1078 382L1475 452M1299 226L1440 203',
    ],
    signal: 'M151 288L475 268L821 382L1299 295V157L953 44L475 130',
    nodes: [[475, 130], [475, 268], [821, 244], [821, 382], [953, 44], [953, 182], [1299, 295], [1299, 157]],
  },
  sectors: {
    traces: [
      'M5 285H480C710 285 796 86 1033 86H1420', 'M5 285H480C702 285 797 172 1033 172H1420',
      'M5 285H1420', 'M5 285H480C704 285 797 385 1033 385H1420',
      'M5 285H480C704 285 798 463 1033 463H1420',
      'M580 268C661 247 761 231 872 231H1420M714 303C846 301 911 328 1033 328H1420',
    ],
    signal: 'M5 285H480C710 285 796 86 1033 86H1420',
    nodes: [[480, 285], [1033, 86], [1033, 172], [1033, 285], [1033, 385], [1033, 463]],
  },
  ledger: {
    traces: [
      'M50 380H1410M50 315H1410M50 250H1410M50 185H1410M50 120H1410',
      'M375 40V480M569 40V480M763 40V480M957 40V480M1151 40V480M1345 40V480',
      'M375 380H569V315H763V250H957V185H1151V120H1410',
      'M569 380V415H957V380M763 315V344H1151V315M957 250V277H1345V250',
    ],
    signal: 'M50 380H569V315H763V250H957V185H1151V120H1410',
    nodes: [[569, 380], [763, 315], [957, 250], [1151, 185], [1345, 120]],
  },
  convergence: {
    traces: [
      'M0 119H316C505 119 527 252 720 252C926 252 962 119 1124 119H1440',
      'M0 176H316C505 176 541 252 720 252C922 252 967 176 1124 176H1440',
      'M0 252H1440',
      'M0 328H316C504 328 541 252 720 252C923 252 967 328 1124 328H1440',
      'M0 385H316C505 385 527 252 720 252C926 252 962 385 1124 385H1440',
      'M194 63V440M1246 63V440',
    ],
    signal: 'M0 119H316C505 119 527 252 720 252C926 252 962 385 1124 385H1440',
    nodes: [[194, 119], [194, 385], [720, 252], [1246, 119], [1246, 385]],
  },
};

export function SectionBackdrop({ mode }: { mode: BackdropMode }) {
  const layerRef = useBackdropMotion();
  const diagram = diagrams[mode];

  return (
    <div ref={layerRef} aria-hidden="true" className={`home-backdrop home-backdrop--${mode}`}>
      <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="home-backdrop__art" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {diagram.traces.map((path) => <path key={path} d={path} />)}
          <path className="home-backdrop__signal" d={diagram.signal} pathLength="100" />
          {diagram.nodes.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="7" />
              <circle cx={x} cy={y} r="2.3" className="home-backdrop__node" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
