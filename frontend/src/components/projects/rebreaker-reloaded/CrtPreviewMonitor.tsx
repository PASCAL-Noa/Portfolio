import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../../../utils/imageUrl';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';

interface CrtPreviewMonitorProps {
  videoUrl: string;
  title: string;
  level: number;
  accent: string;
  volume: number;
  onChangeVolume: (nextVol: number) => void;
  onChangeLevel: (nextLevel: number) => void;
}

export const CrtPreviewMonitor: React.FC<CrtPreviewMonitorProps> = ({
  videoUrl,
  title,
  level,
  accent,
  volume,
  onChangeVolume,
  onChangeLevel,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const zoomVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const resolvedUrl = getAssetUrl(videoUrl);
  const isMuted = volume <= 0;

  // Keep embedded & zoomed video audio synced with TV volume knob
  useEffect(() => {
    const syncAudio = (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      vid.volume = Math.max(0, Math.min(1, volume / 100));
      vid.muted = volume <= 0;
    };
    syncAudio(videoRef.current);
    syncAudio(zoomVideoRef.current);
  }, [volume, resolvedUrl, isZoomed]);

  // Pause inline video while lightbox is open so audio doesn't play twice
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isZoomed) {
      vid.pause();
    } else if (!isPaused) {
      void vid.play().catch(() => undefined);
    }
  }, [isZoomed, isPaused]);

  useEffect(() => {
    setIsSwitching(true);
    setIsPaused(false);
    const timer = window.setTimeout(() => setIsSwitching(false), 180);
    return () => window.clearTimeout(timer);
  }, [resolvedUrl]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      void vid.play().catch(() => undefined);
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPaused(true);
    }
  };

  const toggleSound = () => {
    if (volume <= 0) {
      onChangeVolume(60);
    } else {
      onChangeVolume(0);
    }
  };

  const stepLevel = (delta: -1 | 1) => {
    const next = ((level - 1 + delta + 5) % 5) + 1;
    onChangeLevel(next);
  };

  return (
    <div className="space-y-3">
      {/* Embedded CRT Preview Viewport */}
      <div
        className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#05080f] border-2 shadow-lg group"
        style={{
          borderColor: `${accent}70`,
          boxShadow: `0 0 24px ${accent}20, inset 0 0 20px rgba(0,0,0,0.85)`,
        }}
      >
        <video
          ref={videoRef}
          key={resolvedUrl}
          src={resolvedUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.volume = Math.max(0, Math.min(1, volume / 100));
            v.muted = volume <= 0;
          }}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Minimal Level Pill */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded bg-black/75 border border-white/15 backdrop-blur-xs">
          <span
            className="rr-font-retro text-base tracking-wider leading-none"
            style={{ color: accent }}
          >
            LVL {level} / 5
          </span>
        </div>

        {/* Monitor Controls: Sound, Play/Pause, Zoom */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleSound}
            className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md border text-[11px] font-bold transition-colors cursor-pointer ${
              isMuted
                ? 'bg-black/75 hover:bg-black border-white/20 text-slate-300'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/60 text-emerald-300'
            }`}
            title={isMuted ? 'Activer le son' : 'Couper le son'}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMuted ? 'Son' : `${volume}%`}</span>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="p-1.5 rounded-md bg-black/75 hover:bg-black border border-white/20 text-white cursor-pointer"
            title={isPaused ? 'Lecture' : 'Pause'}
            aria-label={isPaused ? 'Lecture' : 'Pause'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="p-1.5 rounded-md bg-black/75 hover:bg-black border border-white/20 text-white cursor-pointer"
            title="Plein écran"
            aria-label="Plein écran"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {isPaused && (
          <div className="pointer-events-none absolute inset-0 bg-black/35 flex items-center justify-center z-10">
            <span className="px-3 py-1 rounded bg-black/80 border border-white/25 rr-font-retro text-xl text-white tracking-widest">
              PAUSED
            </span>
          </div>
        )}

        {isSwitching && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rr-static-burst opacity-60 mix-blend-screen"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Level 1 -> 5 Selector Bar */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => stepLevel(-1)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Niveau précédent"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((tier) => {
            const isActive = tier === level;
            return (
              <button
                key={tier}
                type="button"
                onClick={() => onChangeLevel(tier)}
                className="py-1.5 rounded-lg border text-center transition-all cursor-pointer rr-font-retro text-base sm:text-lg leading-none"
                style={{
                  backgroundColor: isActive ? `${accent}26` : 'rgba(255,255,255,0.03)',
                  borderColor: isActive ? accent : 'rgba(255,255,255,0.12)',
                  color: isActive ? accent : '#94a3b8',
                  boxShadow: isActive ? `0 0 12px ${accent}40` : 'none',
                }}
              >
                LVL {tier}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => stepLevel(1)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Niveau suivant"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Niveau ${level}`}
        >
          <div
            className="w-full max-w-4xl rounded-2xl border-2 bg-[#070b14] p-3 sm:p-4 space-y-3 shadow-2xl"
            style={{ borderColor: `${accent}80` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 px-1">
              <span
                className="rr-font-retro text-2xl leading-none"
                style={{ color: accent }}
              >
                {title} — LVL {level} / 5
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  <span>{isMuted ? 'Son coupé' : `${volume}%`}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-white/10">
              <video
                ref={zoomVideoRef}
                key={`zoom-${resolvedUrl}`}
                src={resolvedUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  v.volume = Math.max(0, Math.min(1, volume / 100));
                  v.muted = volume <= 0;
                }}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onChangeLevel(tier)}
                  className="px-3.5 py-1.5 rounded-lg border rr-font-retro text-lg leading-none cursor-pointer transition-all"
                  style={{
                    backgroundColor: tier === level ? `${accent}2b` : 'rgba(255,255,255,0.05)',
                    borderColor: tier === level ? accent : 'rgba(255,255,255,0.15)',
                    color: tier === level ? accent : '#cbd5e1',
                  }}
                >
                  LVL {tier}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
