import { ArrowUpRight, Play } from 'lucide-react';
import { useRef, useState } from 'react';

interface ProductVideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  accentColor?: string;
  badge?: string;
  liveUrl?: string;
  ctaLabel?: string;
}

export function ProductVideoPlayer({
  src,
  title,
  poster,
  accentColor = 'var(--accent-primary)',
  badge,
  liveUrl,
  ctaLabel,
}: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackError(false);
    try {
      await video.play();
      video.focus({ preventScroll: true });
    } catch {
      setPlaybackError(true);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="relative aspect-video w-full bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted
          loop
          controls={hasStarted}
          tabIndex={hasStarted ? 0 : -1}
          preload="none"
          aria-label={`${title} demonstration video`}
          onPlay={() => setHasStarted(true)}
          onError={() => setPlaybackError(true)}
          className="h-full w-full object-contain focus-visible:-outline-offset-4"
        >
          Your browser does not support HTML video.
        </video>
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-3">
            <button type="button" onClick={play} className="site-button button-secondary">
              <Play aria-hidden="true" className="size-4" />
              Watch the {title} demo
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-color)] px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-sm font-bold text-[var(--text-primary)]">{title}</span>
          {badge && <span className="text-xs text-[var(--text-muted)]">{badge}</span>}
        </div>

        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="site-button button-secondary">
            {ctaLabel || `Visit ${title}`} <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        )}

        {playbackError && (
          <p role="status" className="w-full text-sm text-[var(--status-error-text)]">
            The demo could not play. You can try again or open the video directly. <a href={src} className="underline underline-offset-4">Open video</a>
          </p>
        )}
      </div>
    </div>
  );
}
