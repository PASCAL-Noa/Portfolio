import React from 'react';
import { ChannelId, TV_CHANNELS } from './data';
import { ChevronLeft, ChevronRight, Power, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface RetroTvChassisProps {
  activeChannel: ChannelId;
  volume: number;
  crtFxEnabled: boolean;
  isBooting: boolean;
  showPowerPrompt: boolean;
  isPoweringOff: boolean;
  onSelectChannel: (id: ChannelId) => void;
  onStepChannel: (delta: 1 | -1) => void;
  onChangeVolume: (nextVol: number) => void;
  onToggleCrtFx: () => void;
  onPressPower: () => void;
  children: React.ReactNode;
}

export const RetroTvChassis: React.FC<RetroTvChassisProps> = ({
  activeChannel,
  volume,
  crtFxEnabled,
  isBooting,
  showPowerPrompt,
  isPoweringOff,
  onSelectChannel,
  onStepChannel,
  onChangeVolume,
  onToggleCrtFx,
  onPressPower,
  children,
}) => {
  const activeIndex = Math.max(
    0,
    TV_CHANNELS.findIndex((c) => c.id === activeChannel)
  );
  const activeMeta = TV_CHANNELS[activeIndex] ?? TV_CHANNELS[0];
  // Symmetric 270deg arc across the 4 channels
  const channelStepDeg = 270 / Math.max(1, TV_CHANNELS.length - 1);
  const channelKnobAngle = activeIndex * channelStepDeg - 135;
  // Continuous 270deg arc matching MenuScene.cpp
  const volumeKnobAngle = (volume / 100) * 270 - 135;
  const activeLeds = Math.round((volume / 100) * 10);

  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 10 : -10;
    onChangeVolume(Math.max(0, Math.min(100, volume + delta)));
  };

  const handleChannelWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    onStepChannel(e.deltaY > 0 ? 1 : -1);
  };

  return (
    <div className="rr-crt-root rr-wood-cabinet relative min-h-screen lg:h-screen w-full flex flex-col lg:overflow-hidden select-none">
      {/* 4 Metallic Corner Screws (Desktop) */}
      <div className="hidden lg:block pointer-events-none" aria-hidden="true">
        {[
          'top-3.5 left-3.5',
          'top-3.5 right-3.5',
          'bottom-3.5 left-3.5',
          'bottom-3.5 right-3.5',
        ].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-3.5 h-3.5 rounded-full bg-[#a0a5af] border border-[#2b2f38] shadow-inner flex items-center justify-center z-20`}
          >
            <div className="w-2.5 h-[1.5px] bg-[#282d37] rotate-45" />
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Compact Top TV Bezel */}
      <div className="lg:hidden flex items-center justify-between gap-2 px-3.5 pt-3 pb-2">
        <div className="px-3 py-1 rounded border border-[#dcb446] bg-[#2a2212] text-center shadow-sm">
          <span className="rr-font-retro text-base sm:text-lg text-[#ffd73c] tracking-widest">
            REBREAKER RELOADED
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChangeVolume(volume === 0 ? 60 : 0)}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer ${
              volume > 0
                ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                : 'bg-[#20242c] border-[#373e4b] text-slate-400'
            }`}
            title={volume === 0 ? 'Activer le son' : 'Couper le son'}
            aria-label={volume === 0 ? 'Activer le son' : 'Couper le son'}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onToggleCrtFx}
            className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
              crtFxEnabled
                ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                : 'bg-[#20242c] border-[#373e4b] text-slate-400'
            }`}
            title="Activer / Désactiver les effets CRT"
          >
            CRT
          </button>
          <button
            type="button"
            onClick={onPressPower}
            className="w-8 h-8 rounded-full bg-[#b4282d] border border-[#f05055] text-white flex items-center justify-center shadow-[0_0_12px_rgba(240,80,85,0.45)] cursor-pointer"
            aria-label="Éteindre la TV CRT et retourner au portfolio"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main TV Body: CRT Screen + Right Brushed Gunmetal Control Panel */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-6">
        {/* Left/Center: Curved CRT Viewport */}
        <div className="flex-1 min-w-0 min-h-[540px] lg:min-h-0 flex flex-col">
          {children}
        </div>

        {/* Right: Authentic 1980s Control Panel (Desktop) */}
        <aside
          className="hidden lg:flex w-[264px] xl:w-[286px] shrink-0 rr-control-panel rounded-2xl p-4 flex-col gap-3.5"
          aria-label="Panneau de contrôle du téléviseur CRT"
        >
          {/* 1. Engraved Gold Brand Plaque */}
          <div className="rounded-lg bg-[#2a2212] border-2 border-[#dcb446] py-2.5 px-3 text-center shadow-[inset_0_0_14px_rgba(220,180,70,0.2)]">
            <div className="rr-font-retro text-xl xl:text-2xl text-[#ffd73c] tracking-[0.14em] leading-none">
              REBREAKER RELOADED
            </div>
            <div className="text-[9px] uppercase tracking-[0.26em] text-[#dcb446]/80 mt-1">
              MODEL C++20 · SFML-3
            </div>
          </div>

          <div className="rr-panel-divider" />

          {/* 2. Recessed CHANNEL Tuner Bay */}
          <div
            className="rounded-xl bg-[#12151c] border border-[#2c3340] p-3.5 flex flex-col items-center gap-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.65)]"
            onWheel={handleChannelWheel}
          >
            {/* Mini Digital Channel Readout */}
            <div className="w-full rounded-md bg-[#070a10] border border-[#262d3a] px-2.5 py-1.5 flex items-center justify-between gap-2">
              <span
                className="rr-font-retro text-lg leading-none"
                style={{
                  color: activeMeta.color,
                  textShadow: `0 0 8px ${activeMeta.color}88`,
                }}
              >
                {activeMeta.code}
              </span>
              <span className="rr-font-retro text-base text-slate-200 tracking-wider leading-none truncate">
                {activeMeta.title}
              </span>
            </div>

            {/* Stepped Rotary Dial + Arrows */}
            <div className="flex items-center gap-3.5 py-0.5">
              <button
                type="button"
                onClick={() => onStepChannel(-1)}
                className="w-8 h-8 rounded-md bg-[#1a1f29] hover:bg-[#2a3140] border border-[#3a4252] text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Chaîne précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onStepChannel(1)}
                className="relative w-24 h-24 rounded-full bg-[#0c0f15] border-2 border-[#3d4657] shadow-[inset_0_4px_12px_rgba(0,0,0,0.92),0_6px_14px_rgba(0,0,0,0.55)] flex items-center justify-center cursor-pointer group"
                title="Cliquer ou scroller pour changer de chaîne"
                aria-label="Molette de sélection de chaîne"
              >
                {/* Radial Detent Marks */}
                {TV_CHANNELS.map((ch, idx) => {
                  const deg = idx * channelStepDeg - 135;
                  const isCurrent = ch.id === activeChannel;
                  return (
                    <span
                      key={ch.id}
                      className="pointer-events-none absolute w-1.5 h-2 rounded-full"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-41px)`,
                        backgroundColor: isCurrent ? ch.color : '#475569',
                        boxShadow: isCurrent ? `0 0 8px ${ch.color}` : 'none',
                      }}
                    />
                  );
                })}
                {/* Rotating Knob Cap */}
                <span
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#39404d] via-[#222730] to-[#12151b] border border-[#566075] shadow-md flex items-start justify-center pt-2 transition-transform duration-200 ease-out group-hover:border-[#50dcff]/60"
                  style={{ transform: `rotate(${channelKnobAngle}deg)` }}
                >
                  <span
                    className="w-1.5 h-4 rounded-full"
                    style={{
                      backgroundColor: activeMeta.color,
                      boxShadow: `0 0 8px ${activeMeta.color}`,
                    }}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => onStepChannel(1)}
                className="w-8 h-8 rounded-md bg-[#1a1f29] hover:bg-[#2a3140] border border-[#3a4252] text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Chaîne suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[9px] font-bold tracking-[0.26em] text-slate-400">
              CHANNEL
            </span>
          </div>

          {/* 3. Recessed VOLUME Bay */}
          <div
            className="rounded-xl bg-[#12151c] border border-[#2c3340] p-3.5 flex flex-col gap-2.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.65)]"
            onWheel={handleVolumeWheel}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.22em] text-slate-300">
                VOLUME
              </span>
              <button
                type="button"
                onClick={() => onChangeVolume(volume === 0 ? 60 : 0)}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-300 hover:text-white cursor-pointer"
                title={volume === 0 ? 'Activer le son (TV & vidéos)' : 'Couper le son'}
              >
                {volume === 0 ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-rose-300">MUTE</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">{volume}%</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChangeVolume(volume >= 100 ? 0 : volume + 20)}
                className="relative w-14 h-14 shrink-0 rounded-full bg-[#0c0f15] border-2 border-[#3d4657] flex items-center justify-center cursor-pointer shadow-inner"
                title="Cliquer ou scroller pour régler le volume"
                aria-label="Molette de volume"
              >
                <span
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39404d] via-[#222730] to-[#12151b] border border-[#566075] flex items-start justify-center pt-1 transition-transform duration-150"
                  style={{ transform: `rotate(${volumeKnobAngle}deg)` }}
                >
                  <span className="w-1 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
                </span>
              </button>

              {/* 10-LED Volume Bar */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-1 bg-[#070a10] p-1.5 rounded border border-[#262d3a]">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const lit = idx < activeLeds;
                    const color = idx >= 8 ? '#f54173' : idx >= 6 ? '#ffd73c' : '#32e18c';
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onChangeVolume((idx + 1) * 10)}
                        className="flex-1 h-4 rounded-[2px] transition-all cursor-pointer"
                        style={{
                          backgroundColor: lit ? color : '#1c222e',
                          boxShadow: lit ? `0 0 6px ${color}` : 'none',
                        }}
                        aria-label={`Volume ${(idx + 1) * 10}%`}
                      />
                    );
                  })}
                </div>
                <span className="text-[9px] text-slate-500 text-center">
                  TV &amp; Vidéos · Molette
                </span>
              </div>
            </div>
          </div>

          {/* 4. Utility Switches: CRT FX + Master POWER & LED */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onToggleCrtFx}
              className={`rounded-xl border px-3 py-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                crtFxEnabled
                  ? 'bg-amber-500/12 border-amber-400/50 text-amber-200'
                  : 'bg-[#12151c] border-[#2c3340] text-slate-400 hover:text-slate-200'
              }`}
              title="Activer / Désactiver le filtre CRT"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.16em]">CRT FX</span>
              <span
                className={`px-2 py-0.5 rounded text-[9px] font-bold leading-none ${
                  crtFxEnabled ? 'bg-amber-400 text-black' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {crtFxEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            <div className="rounded-xl bg-[#12151c] border border-[#2c3340] px-3 py-2.5 flex flex-col items-center justify-center gap-1.5">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onPressPower}
                  className="w-10 h-10 rounded-full bg-[#0b0d12] border border-[#303641] flex items-center justify-center p-1 group cursor-pointer shadow-inner"
                  title="Éteindre la TV CRT et revenir au portfolio"
                  aria-label="Bouton Power"
                >
                  <span className="w-full h-full rounded-full bg-[#b4282d] group-hover:bg-[#cf3036] border-2 border-[#f05055] flex items-center justify-center text-white shadow-[0_0_14px_rgba(240,80,85,0.45)] transition-all group-active:scale-95">
                    <Power className="w-3.5 h-3.5" />
                  </span>
                </button>
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-black/80 transition-all ${
                    isPoweringOff
                      ? 'bg-slate-700'
                      : showPowerPrompt
                      ? 'bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse'
                      : isBooting
                      ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-pulse'
                      : 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                  }`}
                  title="Voyant d'alimentation"
                />
              </div>
              <span className="text-[10px] font-bold tracking-[0.18em] text-slate-300">
                POWER
              </span>
            </div>
          </div>

          <div className="rr-panel-divider" />

          {/* 5. Vintage Speaker Grille (fills remaining vertical height cleanly) */}
          <div
            className="rr-speaker-grille flex-1 min-h-[64px] rounded-xl border border-[#11141a] bg-[#14171e] shadow-[inset_0_3px_12px_rgba(0,0,0,0.8)]"
            aria-hidden="true"
          />
        </aside>
      </div>

      {/* Mobile / Tablet Bottom Portable TV Channel Bar */}
      <nav
        className="lg:hidden sticky bottom-0 z-30 bg-[#1a1d24]/95 backdrop-blur-md border-t border-[#373e4b] px-2.5 py-2"
        aria-label="Sélecteur de chaînes TV"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {TV_CHANNELS.map((ch) => {
            const isActive = ch.id === activeChannel;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onSelectChannel(ch.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'font-bold'
                    : 'bg-[#12151c] border-[#2e3440] text-slate-400'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${ch.color}20`,
                        borderColor: ch.color,
                        color: ch.color,
                      }
                    : undefined
                }
              >
                <div className="rr-font-retro text-sm leading-none">{ch.code}</div>
                <div className="text-[10px] uppercase tracking-wider truncate max-w-[84px]">
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
