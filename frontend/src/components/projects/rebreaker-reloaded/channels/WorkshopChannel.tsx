import React, { useState } from 'react';
import {
  BRICK_ARCHETYPES,
  BrickArchetype,
  getPreviewVideoUrl,
  POWER_UPS,
  PowerUpCategory,
} from '../data';
import { getAssetUrl } from '../../../../utils/imageUrl';
import { CrtPreviewMonitor } from '../CrtPreviewMonitor';

interface WorkshopChannelProps {
  volume: number;
  onChangeVolume: (nextVol: number) => void;
  onPlayBlip?: () => void;
}

const BrickVisual: React.FC<{ brick: BrickArchetype }> = ({ brick }) => {
  const isSpecial = brick.id === 'special';
  const isMetal = brick.id === 'metal';
  const isBomb = brick.id === 'bomb';
  const isLantern = brick.id === 'lantern';
  const isTurret = brick.id === 'turret';

  return (
    <div
      className="relative h-8 w-24 rounded-[5px] border-2 overflow-hidden shrink-0 flex items-center justify-center"
      style={{
        background: isSpecial
          ? 'linear-gradient(120deg, #ff28f0 0%, #c846ff 45%, #50dcff 100%)'
          : isMetal
          ? 'linear-gradient(180deg, #cfdbe6 0%, #9fb0c2 55%, #7c8ea1 100%)'
          : `linear-gradient(180deg, ${brick.color} 0%, ${brick.color}cc 100%)`,
        borderColor: brick.border,
        boxShadow: isLantern
          ? `0 0 18px ${brick.color}99, inset 0 2px 0 rgba(255,255,255,0.55)`
          : `0 0 12px ${brick.color}45, inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.35)`,
      }}
      aria-hidden="true"
    >
      {/* Inner metallic recessed plate (matching GameScene.cpp) */}
      {isMetal && (
        <span className="w-[74px] h-4 rounded-[2px] border border-[#4e6074]/80 bg-white/10" />
      )}

      {/* Glowing core dot for Bomb and Lantern (matching GameScene.cpp) */}
      {(isBomb || isLantern) && (
        <span
          className="rounded-full"
          style={{
            width: isLantern ? 12 : 10,
            height: isLantern ? 12 : 10,
            backgroundColor: isLantern ? '#fff9d6' : '#fff5b4',
            boxShadow: isLantern
              ? '0 0 12px 4px rgba(255, 245, 180, 0.95)'
              : '0 0 10px 2px rgba(255, 180, 50, 0.9)',
          }}
        />
      )}

      {/* Downward turret cannon notch */}
      {isTurret && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: '#ffe0e6' }}
        />
      )}
    </div>
  );
};

export const WorkshopChannel: React.FC<WorkshopChannelProps> = ({
  volume,
  onChangeVolume,
  onPlayBlip,
}) => {
  const [activeTab, setActiveTab] = useState<'powerups' | 'bricks'>('powerups');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PowerUpCategory>('all');
  const [selectedPowerUpId, setSelectedPowerUpId] = useState<string>(POWER_UPS[0].id);
  const [upgradeLevel, setUpgradeLevel] = useState<number>(1);

  const filteredPowerUps =
    categoryFilter === 'all'
      ? POWER_UPS
      : POWER_UPS.filter((p) => p.category === categoryFilter);

  const activePowerUp =
    POWER_UPS.find((p) => p.id === selectedPowerUpId) ?? POWER_UPS[0];

  const activeLevelDescription = activePowerUp.levelDetails[upgradeLevel - 1];

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Sub-Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('powerups');
            onPlayBlip?.();
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
            activeTab === 'powerups'
              ? 'bg-[#ffd73c]/20 border-[#ffd73c] text-[#ffd73c]'
              : 'bg-black/30 border-white/15 text-slate-300 hover:text-white'
          }`}
        >
          Power-Ups
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('bricks');
            onPlayBlip?.();
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
            activeTab === 'bricks'
              ? 'bg-[#ffd73c]/20 border-[#ffd73c] text-[#ffd73c]'
              : 'bg-black/30 border-white/15 text-slate-300 hover:text-white'
          }`}
        >
          Briques
        </button>
      </div>

      {activeTab === 'powerups' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* Left Column: Power-Up Selection Grid */}
          <div className="xl:col-span-5 rounded-xl border border-white/10 bg-[#0d121d] p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', label: 'Tous' },
                  { id: 'ball', label: 'Balle' },
                  { id: 'paddle', label: 'Raquette' },
                  { id: 'tactical', label: 'Tactique' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(cat.id);
                    onPlayBlip?.();
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-[#ffd73c] text-black border-[#ffd73c]'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {filteredPowerUps.map((p) => {
                const isSelected = p.id === activePowerUp.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPowerUpId(p.id);
                      onPlayBlip?.();
                    }}
                    className="group rounded-lg p-2.5 border text-center transition-all cursor-pointer flex flex-col items-center gap-2"
                    style={{
                      backgroundColor: isSelected ? `${p.accent}20` : 'rgba(255,255,255,0.02)',
                      borderColor: isSelected ? p.accent : 'rgba(255,255,255,0.1)',
                      boxShadow: isSelected ? `0 0 14px ${p.accent}30` : 'none',
                    }}
                  >
                    <img
                      src={getAssetUrl(p.sprite)}
                      alt={p.name}
                      className="w-11 h-11 object-contain group-hover:scale-110 transition-transform"
                      loading="lazy"
                    />
                    <div className="text-[11px] font-bold text-white truncate w-full">
                      {p.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Video Preview & Dynamic Level Specs */}
          <div
            className="xl:col-span-7 rounded-xl border p-4 sm:p-5 bg-[#101521] space-y-4"
            style={{ borderColor: `${activePowerUp.accent}55` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-lg border flex items-center justify-center shrink-0"
                style={{
                  borderColor: `${activePowerUp.accent}70`,
                  backgroundColor: `${activePowerUp.accent}18`,
                }}
              >
                <img
                  src={getAssetUrl(activePowerUp.sprite)}
                  alt={activePowerUp.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h2 className="rr-font-retro text-3xl text-white leading-none truncate">
                  {activePowerUp.name}
                </h2>
                <p className="text-xs text-slate-300 mt-1">{activePowerUp.effect}</p>
              </div>
            </div>

            <CrtPreviewMonitor
              videoUrl={getPreviewVideoUrl(activePowerUp.previewSlug, upgradeLevel)}
              title={activePowerUp.name}
              level={upgradeLevel}
              accent={activePowerUp.accent}
              volume={volume}
              onChangeVolume={onChangeVolume}
              onChangeLevel={(lvl) => {
                setUpgradeLevel(lvl);
                onPlayBlip?.();
              }}
            />

            {/* Dynamic Per-Level Stat Box */}
            <div
              className="rounded-lg border p-3.5 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              style={{ borderColor: `${activePowerUp.accent}40` }}
            >
              <span
                className="rr-font-retro text-xl leading-none shrink-0"
                style={{ color: activePowerUp.accent }}
              >
                NIVEAU {upgradeLevel}
              </span>
              <span className="text-xs sm:text-sm text-slate-100 font-medium sm:text-right">
                {activeLevelDescription}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Brick Archetypes Grid (8 authentic game bricks) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {BRICK_ARCHETYPES.map((brick) => (
            <div
              key={brick.id}
              className="rounded-xl border border-white/10 bg-[#0d1320] p-4 flex flex-col justify-between gap-3"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <BrickVisual brick={brick} />
                  <div className="text-right shrink-0">
                    <div className="rr-font-retro text-lg text-white leading-none">
                      {brick.hp}
                    </div>
                    <div className="text-[10px] text-slate-400">{brick.score}</div>
                  </div>
                </div>

                <div>
                  <h3 className="rr-font-retro text-2xl text-white leading-none">
                    {brick.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {brick.description}
                  </p>
                </div>
              </div>

              {brick.tierColors && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Paliers Endless
                  </span>
                  <div className="flex items-center gap-1.5">
                    {brick.tierColors.map((hex, idx) => (
                      <span
                        key={hex}
                        className="w-3.5 h-2 rounded-[2px] border border-white/25"
                        style={{ backgroundColor: hex }}
                        title={`Palier ${idx}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
