import React from 'react';
import { TvChannelMeta } from './data';
import { Power, Volume2, VolumeX } from 'lucide-react';

interface CrtScreenProps {
  channel: TvChannelMeta;
  crtFxEnabled: boolean;
  isBooting: boolean;
  isStaticBurst: boolean;
  isPoweringOff: boolean;
  showPowerPrompt: boolean;
  volume: number;
  showVolumeOsd: boolean;
  onSkipBoot: () => void;
  onConfirmPowerOff: () => void;
  onCancelPowerOff: () => void;
  children: React.ReactNode;
}

export const CrtScreen: React.FC<CrtScreenProps> = ({
  channel,
  crtFxEnabled,
  isBooting,
  isStaticBurst,
  isPoweringOff,
  showPowerPrompt,
  volume,
  showVolumeOsd,
  onSkipBoot,
  onConfirmPowerOff,
  onCancelPowerOff,
  children,
}) => {
  const activeLeds = Math.round((volume / 100) * 10);

  return (
    <div className="rr-crt-bezel relative flex-1 min-h-0 rounded-[24px] sm:rounded-[32px] p-2.5 sm:p-4 lg:p-5 flex flex-col">
      {/* Curved Inner Tube */}
      <div
        className={`rr-crt-tube relative flex-1 min-h-0 rounded-[18px] sm:rounded-[24px] overflow-hidden border border-white/10 flex flex-col ${
          crtFxEnabled ? '' : 'rr-fx-off'
        }`}
      >
        {/* Top Phosphor OSD Bar */}
        <header className="relative z-20 shrink-0 flex items-center gap-3 px-3.5 sm:px-5 py-2.5 bg-[#060910]/90 border-b border-white/10 backdrop-blur-xs">
          <span
            className="rr-font-retro text-lg sm:text-xl px-2 py-0.5 rounded border leading-none shrink-0"
            style={{
              color: channel.color,
              borderColor: `${channel.color}80`,
              backgroundColor: `${channel.color}18`,
              textShadow: `0 0 10px ${channel.color}99`,
            }}
          >
            {channel.code}
          </span>
          <div
            className="rr-font-retro text-xl sm:text-2xl leading-none tracking-wider truncate"
            style={{
              color: '#f2f7ff',
              textShadow: crtFxEnabled ? `0 0 8px ${channel.color}66` : 'none',
            }}
          >
            {channel.title}
          </div>
        </header>

        {/* Scrollable Channel Viewport */}
        <div className="rr-crt-scroll relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3.5 sm:px-6 py-4 sm:py-6">
          {children}
        </div>

        {/* Temporary Volume OSD Overlay */}
        {showVolumeOsd && (
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-lg bg-[#05080f]/92 border border-emerald-400/50 shadow-[0_0_24px_rgba(50,225,140,0.3)] flex items-center gap-3">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
            <span className="rr-font-retro text-lg text-emerald-300 tracking-wider">VOL</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 10 }).map((_, idx) => {
                const lit = idx < activeLeds;
                const barColor =
                  idx >= 8 ? '#f54173' : idx >= 6 ? '#ffd73c' : '#32e18c';
                return (
                  <span
                    key={idx}
                    className="w-2 h-4 rounded-[2px] transition-all"
                    style={{
                      backgroundColor: lit ? barColor : 'rgba(255,255,255,0.1)',
                      boxShadow: lit ? `0 0 8px ${barColor}` : 'none',
                    }}
                  />
                );
              })}
            </div>
            <span className="rr-font-retro text-lg text-slate-200 w-9 text-right">
              {volume}%
            </span>
          </div>
        )}

        {/* CRT Power-On Boot Sequence */}
        {isBooting && (
          <button
            type="button"
            onClick={onSkipBoot}
            className="rr-boot-overlay absolute inset-0 z-50 bg-[#03050a] flex items-center justify-center overflow-hidden cursor-pointer text-center"
            aria-label="Démarrage du téléviseur CRT"
          >
            {/* Expanding Cathode Warm-Up Flash */}
            <div
              className="rr-boot-beam pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-100 via-white to-cyan-100 shadow-[0_0_60px_20px_rgba(80,220,255,0.85)]"
              aria-hidden="true"
            />

            {/* Boot Title & Loading Bar */}
            <div className="rr-boot-content relative z-10 px-6 flex flex-col items-center gap-3">
              <div
                className="rr-font-retro text-4xl sm:text-6xl text-white tracking-[0.14em] leading-none"
                style={{
                  textShadow:
                    '0 0 18px rgba(80,220,255,0.65), -2px 0 rgba(245,65,115,0.55), 2px 0 rgba(80,220,255,0.55)',
                }}
              >
                REBREAKER RELOADED
              </div>
              <div className="rr-font-retro text-xl sm:text-2xl text-[#ffd73c] tracking-[0.2em]">
                by PASCAL Noa
              </div>

              <div className="mt-3 w-52 sm:w-64 h-2.5 rounded-sm border border-[#50dcff]/50 bg-[#091220] p-0.5 overflow-hidden shadow-[0_0_16px_rgba(80,220,255,0.2)]">
                <div className="rr-boot-bar h-full rounded-[1px] bg-gradient-to-r from-[#50dcff] via-[#32e18c] to-[#ffd73c]" />
              </div>
            </div>
          </button>
        )}

        {/* Channel Switch Static Snow & Sync Tearing Burst */}
        {isStaticBurst && (
          <div
            className="pointer-events-none absolute inset-0 z-40 overflow-hidden bg-[#0a0e16]/70"
            aria-hidden="true"
          >
            <div className="rr-static-burst absolute inset-0 opacity-80 mix-blend-screen" />
            <div className="rr-vhold-bar absolute inset-x-0 top-0" />
            <div className="absolute top-6 right-6 rr-font-retro text-3xl text-emerald-300 drop-shadow-[0_0_10px_rgba(50,225,140,0.9)]">
              {channel.code}
            </div>
          </div>
        )}

        {/* Authentic CRT Power-Off Confirmation Dialog */}
        {showPowerPrompt && !isPoweringOff && (
          <div
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rr-power-title"
          >
            <div className="w-full max-w-md rounded-xl border-2 border-[#f05055]/70 bg-[#0c111c] p-6 shadow-[0_0_40px_rgba(240,80,85,0.28)] text-center space-y-5">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#b4282d]/20 border border-[#f05055] flex items-center justify-center">
                <Power className="w-6 h-6 text-[#f05055]" />
              </div>
              <div className="space-y-1.5">
                <h2
                  id="rr-power-title"
                  className="rr-font-retro text-3xl text-white tracking-wider"
                >
                  POWER OFF REBREAKER?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Éteindre le tube cathodique et revenir à la section Projets du portfolio ?
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onCancelPowerOff}
                  className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 transition-colors cursor-pointer"
                >
                  NON — RESTER
                </button>
                <button
                  type="button"
                  onClick={onConfirmPowerOff}
                  className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#b4282d] hover:bg-[#d63339] border border-[#f05055] text-white shadow-[0_0_18px_rgba(240,80,85,0.45)] transition-colors cursor-pointer"
                >
                  OUI — ÉTEINDRE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Authentic 3-Phase CRT Power-Off Collapse Animation */}
        {isPoweringOff && (
          <div
            className="absolute inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
            aria-label="Extinction du téléviseur CRT"
          >
            <div className="rr-poweroff-beam w-full h-full bg-gradient-to-b from-cyan-100 via-white to-cyan-100 shadow-[0_0_60px_20px_rgba(255,255,255,0.9)]" />
          </div>
        )}

        {/* Non-interactive CRT Optical Overlays */}
        {crtFxEnabled && (
          <>
            <div
              className="rr-crt-scanlines pointer-events-none absolute inset-0 z-30 opacity-60"
              aria-hidden="true"
            />
            <div
              className="rr-crt-vignette pointer-events-none absolute inset-0 z-30"
              aria-hidden="true"
            />
            <div
              className="rr-crt-glass-sheen pointer-events-none absolute inset-0 z-30"
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </div>
  );
};
