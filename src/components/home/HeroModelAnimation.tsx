import { Pause, Play } from 'lucide-react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HomeMotionContext } from './HomeMotionContext';

export type EngineeringTrack = 'embedded' | 'vision-edge' | 'custom-platforms';

export function HeroModelAnimation() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { paused, togglePaused } = useContext(HomeMotionContext);
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const initialTheme = useRef(theme);

  const send = useCallback((message: Record<string, unknown>) => {
    frameRef.current?.contentWindow?.postMessage({ type: 'nhtech-hero', ...message }, window.location.origin);
  }, []);

  // A prerendered iframe may finish loading before React hydrates. Send state
  // immediately as well as on either side's ready/load event.
  const sendState = useCallback(() => {
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
  }, [send, theme, paused, visible, reducedMotion]);

  useEffect(() => {
    const onReady = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frameRef.current?.contentWindow && event.data?.type === 'nhtech-hero-ready') sendState();
    };
    window.addEventListener('message', onReady);
    sendState();
    return () => window.removeEventListener('message', onReady);
  }, [sendState]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => {
      preference.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const section = frameRef.current?.closest<HTMLElement>('.home-hero');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = frameRef.current?.closest<HTMLElement>('.home-hero');
    if (!section || !visible || paused || reducedMotion) return;
    let scrollFrame = 0;

    const pointer = (event: PointerEvent) => {
      if (!event.isPrimary || (event.type === 'pointerdown' && event.button !== 0)) return;
      const rect = frameRef.current!.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        send({ action: 'leave' });
        return;
      }
      send({ action: 'pointer', x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, down: event.type === 'pointerdown' });
    };
    const leave = () => send({ action: 'leave' });
    const release = (event: PointerEvent) => {
      if (event.isPrimary && event.pointerType !== 'mouse') leave();
    };
    const scroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const rect = section.getBoundingClientRect();
        send({ action: 'scroll', y: Math.max(0, -rect.top), max: rect.height });
      });
    };
    scroll();
    section.addEventListener('pointermove', pointer, { passive: true });
    section.addEventListener('pointerdown', pointer, { passive: true });
    // Passive listeners keep touch scrolling and foreground controls native.
    section.addEventListener('pointerup', release, { passive: true });
    section.addEventListener('pointercancel', leave, { passive: true });
    section.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrame);
      section.removeEventListener('pointermove', pointer);
      section.removeEventListener('pointerdown', pointer);
      section.removeEventListener('pointerup', release);
      section.removeEventListener('pointercancel', leave);
      section.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', scroll);
    };
  }, [send, visible, paused, reducedMotion]);

  return (
    <>
      <div className="hero-model-animation" aria-hidden="true">
        <iframe
          ref={frameRef}
          src={`/animations/llm-internals.html?theme=${initialTheme.current}`}
          title="Animated language model internals"
          tabIndex={-1}
          onLoad={sendState}
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
