import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { HomeMotionContext } from './HomeMotionContext';
import { useTheme } from '../../context/ThemeContext';

export type EngineeringTrack = 'embedded' | 'vision-edge' | 'custom-platforms';

export function HeroModelAnimation() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { paused, togglePaused } = useContext(HomeMotionContext);
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const initialTheme = useRef(theme);

  const send = useCallback((message: Record<string, unknown>) => {
    frameRef.current?.contentWindow?.postMessage({ type: 'nhtech-hero', ...message }, window.location.origin);
  }, []);

  useEffect(() => {
    const onReady = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frameRef.current?.contentWindow && event.data?.type === 'nhtech-hero-ready') {
        setReady(true);
      }
    };
    window.addEventListener('message', onReady);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => {
      window.removeEventListener('message', onReady);
      preference.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const section = frameRef.current?.closest('.home-hero');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const style = getComputedStyle(document.documentElement);
    send({
      action: 'state', theme, paused, visible, reducedMotion,
      palette: {
        bg: 'transparent',
        p: style.getPropertyValue('--accent-orange-text').trim(),
        n: style.getPropertyValue('--accent-secondary').trim(),
        hi: style.getPropertyValue('--text-primary').trim(),
        card: style.getPropertyValue('--bg-surface').trim(),
      },
    });
  }, [send, ready, theme, paused, visible, reducedMotion]);

  useEffect(() => {
    const section = frameRef.current?.closest('.home-hero');
    if (!section || !ready || !visible || paused || reducedMotion) return;
    let scrollFrame = 0;

    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = frameRef.current!.getBoundingClientRect();
      send({ action: 'pointer', x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, down: event.type === 'pointerdown' });
    };
    const leave = () => send({ action: 'leave' });
    const scroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const rect = section.getBoundingClientRect();
        send({ action: 'scroll', y: Math.max(0, -rect.top), max: rect.height });
      });
    };
    scroll();
    section.addEventListener('pointermove', pointer as EventListener, { passive: true });
    section.addEventListener('pointerdown', pointer as EventListener, { passive: true });
    section.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrame);
      section.removeEventListener('pointermove', pointer as EventListener);
      section.removeEventListener('pointerdown', pointer as EventListener);
      section.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', scroll);
    };
  }, [send, ready, visible, paused, reducedMotion]);

  return (
    <>
      <div className="hero-model-animation" aria-hidden="true">
        <iframe
          ref={frameRef}
          src={`/animations/llm-internals.html?theme=${initialTheme.current}`}
          title="Animated language model internals"
          tabIndex={-1}
          onLoad={() => setReady(true)}
        />
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
