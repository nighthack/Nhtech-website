import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Point = [number, number];

const routes: Point[][] = Array.from({ length: 13 }, (_, lane) => {
  const spread = (lane - 6) * 21;
  const gap = (lane - 6) * 7;
  return [
    [-24, 262 + spread], [132 - gap, 262 + spread],
    [223 - gap, 171 + spread], [367 + gap, 171 + spread],
    [492 + gap, 296 + spread], [592 - gap, 296 + spread],
    [693 - gap, 195 + spread], [796, 195 + spread],
  ];
});

function trace(points: Point[], distance: number): Point {
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i - 1];
    const [endX, endY] = points[i];
    const length = Math.hypot(endX - x, endY - y);
    if (distance <= length) {
      const t = distance / length;
      return [x + (endX - x) * t, y + (endY - y) * t];
    }
    distance -= length;
  }
  return points[points.length - 1];
}

export function HeroSignalField() {
  const field = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = field.current;
    const hero = canvas?.closest('section');
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return;

    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const styles = getComputedStyle(canvas);
    const lineColor = styles.getPropertyValue('--accent-secondary').trim();
    const signalColor = styles.getPropertyValue('--accent-primary').trim();
    let width = 1;
    let height = 1;
    let frame = 0;
    let movingUntil = 0;
    let lastTime = 0;
    let travel = 0;
    let intensity = 0;
    let pointer: Point = [400, 240];
    let visible = false;
    let inside = false;

    function draw(time: number) {
      frame = 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;
      const active = inside && time < movingUntil;
      const target = active ? 1 : 0;
      intensity += (target - intensity) * (1 - Math.exp(-elapsed / 110));
      if (intensity < 0.002) intensity = 0;
      travel = (travel + elapsed * 0.22) % 5600;

      const ctx = context!;
      ctx.setTransform(canvas!.width / 780, 0, 0, canvas!.height / 490, 0, 0);
      ctx.clearRect(0, 0, 780, 490);
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';

      routes.forEach((route, lane) => {
        const points: Point[] = route.map(([x, y]) => {
          const pull = Math.exp(-((x - pointer[0]) ** 2 + (y - pointer[1]) ** 2) / 19000) * intensity;
          return [x + (pointer[0] - x) * pull * 0.1, y + (pointer[1] - y) * pull * 0.21];
        });
        const accent = lane === 3 || lane === 8 || lane === 10;
        ctx.strokeStyle = accent ? signalColor : lineColor;
        ctx.globalAlpha = accent ? 0.55 : 0.29;
        ctx.beginPath();
        points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.stroke();

        for (const [index, [x, y]] of points.entries()) {
          if (index === 0 || index === points.length - 1 || (index + lane) % 3 !== 0) continue;
          const proximity = Math.exp(-((x - pointer[0]) ** 2 + (y - pointer[1]) ** 2) / 9000);
          ctx.globalAlpha = Math.min(1, (accent ? 0.78 : 0.43) + proximity * intensity * 0.62);
          ctx.strokeRect(x - 2.5, y - 2.5, 5, 5);
        }

        if (accent && intensity > 0) {
          const distance = (travel + lane * 91) % 850;
          ctx.strokeStyle = signalColor;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = intensity * 0.94;
          ctx.beginPath();
          for (let offset = 0; offset <= 28; offset += 4) {
            const [x, y] = trace(points, distance + offset);
            if (offset === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      });
      ctx.globalAlpha = 1;

      if (visible && media.matches && !document.hidden && (active || intensity > 0)) {
        frame = requestAnimationFrame(draw);
      } else {
        lastTime = 0;
      }
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      inside = false;
      intensity = 0;
      lastTime = 0;
      draw(performance.now());
    }

    const resize = new ResizeObserver(([entry]) => {
      width = Math.max(1, entry.contentRect.width);
      height = Math.max(1, entry.contentRect.height);
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      if (!frame) draw(performance.now());
    });

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });

    function move(event: PointerEvent) {
      if (!visible || !media.matches || event.pointerType === 'touch' || document.hidden) return;
      const bounds = canvas!.getBoundingClientRect();
      pointer = [(event.clientX - bounds.left) * 780 / width, (event.clientY - bounds.top) * 490 / height];
      inside = true;
      movingUntil = performance.now() + 550;
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function leave() {
      inside = false;
    }

    resize.observe(canvas);
    observer.observe(hero);
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    media.addEventListener('change', stop);
    document.addEventListener('visibilitychange', stop);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      media.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', stop);
    };
  }, [theme]);

  return <canvas className="hero-signal-field" ref={field} aria-hidden="true" />;
}
