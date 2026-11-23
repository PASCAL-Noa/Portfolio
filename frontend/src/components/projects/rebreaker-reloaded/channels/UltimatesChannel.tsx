import React, { useState } from 'react';
import { getPreviewVideoUrl, ULTIMATES } from '../data';
import { CrtPreviewMonitor } from '../CrtPreviewMonitor';

interface UltimatesChannelProps {
  volume: number;
  onChangeVolume: (nextVol: number) => void;
  onPlayBlip?: () => void;
}

export const UltimatesChannel: React.FC<UltimatesChannelProps> = ({
  volume,
  onChangeVolume,
  onPlayBlip,
}) => {
  const [selectedUltId, setSelectedUltId] = useState<'plasma' | 'disco' | 'rain'>('plasma');
  const [ultLevel, setUltLevel] = useState<number>(1);

  const activeUlt = ULTIMATES.find((u) => u.id === selectedUltId) ?? ULTIMATES[0];
  const activeLevelDescription = activeUlt.levelDetails[ultLevel - 1];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* 3 Selectable Ultimate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ULTIMATES.map((ult) => {
          const isSelected = ult.id === activeUlt.id;
          return (
            <button
              key={ult.id}
              type="button"
              onClick={() => {
                setSelectedUltId(ult.id);
                onPlayBlip?.();
              }}
              className="text-left rounded-xl p-3.5 border transition-all cursor-pointer space-y-1"
              style={{
                backgroundColor: isSelected ? `${ult.color}1e` : 'rgba(255,255,255,0.02)',
                borderColor: isSelected ? ult.color : 'rgba(255,255,255,0.1)',
                boxShadow: isSelected ? `0 0 18px ${ult.color}28` : 'none',
              }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: ult.color }}
              >
                {ult.category}
              </div>
              <h2 className="rr-font-retro text-3xl text-white leading-none">{ult.name}</h2>
            </button>
          );
        })}
      </div>

      {/* Live Video Preview + Exact Per-Level Stats */}
      <div
        className="rounded-xl border p-4 sm:p-5 bg-[#0e1320] grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        style={{ borderColor: `${activeUlt.color}55` }}
      >
        <div className="lg:col-span-7">
          <CrtPreviewMonitor
            videoUrl={getPreviewVideoUrl(activeUlt.previewSlug, ultLevel)}
            title={activeUlt.name}
            level={ultLevel}
            accent={activeUlt.color}
            volume={volume}
            onChangeVolume={onChangeVolume}
            onChangeLevel={(lvl) => {
              setUltLevel(lvl);
              onPlayBlip?.();
            }}
          />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <h3 className="rr-font-retro text-3xl text-white leading-none">
              {activeUlt.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeUlt.description}
            </p>
          </div>

          {/* Dynamic Per-Level Description */}
          <div
            className="rounded-lg border p-3.5 bg-black/40 space-y-1.5"
            style={{ borderColor: `${activeUlt.color}45` }}
          >
            <div
              className="rr-font-retro text-xl leading-none"
              style={{ color: activeUlt.color }}
            >
              NIVEAU {ultLevel} / 5
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              {activeLevelDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
