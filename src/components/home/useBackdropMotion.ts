import { useContext, useEffect, useRef } from 'react';
import { HomeMotionContext } from './HomeMotionContext';

export function useBackdropMotion() {
  const { paused } = useContext(HomeMotionContext);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.parentElement;
    const svg = layer?.querySelector('svg');
    if (!layer || !section || !svg) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    svg.pauseAnimations();

    let visible = false;
    let active = false;
    let frame = 0;
    let previousTime: number | null = null;
    let animationTime = svg.getCurrentTime();
    let bounds: DOMRect | null = null;
    let pointer: { x: number; y: number } | null = null;
    let energy = 0;
    let x = parseFloat(layer.style.getPropertyValue('--backdrop-x')) || 0;
    let y = parseFloat(layer.style.getPropertyValue('--backdrop-y')) || 0;
    let paintedX = x;
    let paintedY = y;

    const invalidateBounds = () => { bounds = null; };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (pointer) {
        const distance = Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y);
        energy = Math.min(.85, energy + distance * .014);
      }
      pointer = { x: event.clientX, y: event.clientY };
    };

    const onLeave = () => { pointer = null; };

    const paint = (now: number) => {
      const dt = previousTime === null ? 0 : Math.min((now - previousTime) / 1000, .05);
      previousTime = now;
      energy *= Math.exp(-3.2 * dt);
      animationTime += dt * (1 + energy);
      svg.setCurrentTime(animationTime);

      bounds ??= section.getBoundingClientRect();
      const progress = (window.innerHeight - 2 * bounds.top - bounds.height) / (window.innerHeight + bounds.height);
      const pointerX = pointer ? Math.max(-.5, Math.min(.5, (pointer.x - bounds.left) / bounds.width - .5)) : 0;
      const pointerY = pointer ? Math.max(-.5, Math.min(.5, (pointer.y - bounds.top) / bounds.height - .5)) : 0;
      const easing = 1 - Math.exp(-6 * dt);
      x += (pointerX * 46 - x) * easing;
      y += (pointerY * 32 + progress * 18 - y) * easing;
      if (Math.abs(x - paintedX) > .08 || Math.abs(y - paintedY) > .08) {
        layer.style.setProperty('--backdrop-x', `${x}px`);
        layer.style.setProperty('--backdrop-y', `${y}px`);
        paintedX = x;
        paintedY = y;
      }

      frame = requestAnimationFrame(paint);
    };

    const sync = () => {
      const inView = visible && !preference.matches && !document.hidden;
      section.toggleAttribute('data-motion-active', inView);
      const shouldAnimate = inView && !paused;
      if (shouldAnimate === active) return;
      active = shouldAnimate;

      if (active) {
        invalidateBounds();
        section.addEventListener('pointermove', onPointer, { passive: true });
        section.addEventListener('pointerleave', onLeave);
        window.addEventListener('scroll', invalidateBounds, { passive: true });
        frame = requestAnimationFrame(paint);
      } else {
        section.removeEventListener('pointermove', onPointer);
        section.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('scroll', invalidateBounds);
        cancelAnimationFrame(frame);
        previousTime = null;
        pointer = null;
        energy = 0;
      }
    };

    const onPreferenceChange = () => {
      if (preference.matches) {
        svg.setCurrentTime(0);
        animationTime = 0;
        layer.style.removeProperty('--backdrop-x');
        layer.style.removeProperty('--backdrop-y');
        x = y = paintedX = paintedY = 0;
      }
      sync();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resizeObserver = new ResizeObserver(invalidateBounds);
    observer.observe(section);
    resizeObserver.observe(section);
    window.addEventListener('resize', invalidateBounds);
    preference.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', sync);
    if (preference.matches) onPreferenceChange();

    return () => {
      visible = false;
      sync();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', invalidateBounds);
      preference.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused]);

  return layerRef;
}
