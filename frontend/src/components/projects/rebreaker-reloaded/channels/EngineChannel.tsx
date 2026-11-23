import React, { useState } from 'react';
import { ENGINE_MODULES } from '../data';

export const EngineChannel: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('engine');
  const activeMod = ENGINE_MODULES.find((m) => m.id === selectedId) ?? ENGINE_MODULES[0];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Module Selector + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#0d121d] p-4 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pb-0.5">
            Modules CMake
          </div>

          <div className="space-y-2">
            {ENGINE_MODULES.map((mod) => {
              const isSelected = mod.id === activeMod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setSelectedId(mod.id)}
                  className="w-full text-left rounded-lg px-3 py-2.5 border transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? `${mod.color}18` : 'rgba(255,255,255,0.02)',
                    borderColor: isSelected ? mod.color : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: mod.color }}
                      />
                      <span className="rr-font-retro text-xl text-white leading-none">
                        {mod.name}
                      </span>
                    </div>
                    <code className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                      {mod.cmakeTarget} · {mod.targetType}
                    </code>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {mod.deps.length > 0 ? `→ ${mod.deps.join(' · ')}` : 'Aucune dépendance interne'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="lg:col-span-7 rounded-xl border p-5 bg-[#0e1420] flex flex-col justify-between gap-4"
          style={{ borderColor: `${activeMod.color}45` }}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-baseline gap-2.5">
                <h2 className="rr-font-retro text-3xl text-white leading-none">
                  {activeMod.name}
                </h2>
                <code className="text-xs text-slate-400">
                  {activeMod.directory} ({activeMod.targetType})
                </code>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeMod.links.map((dep) => (
                  <code
                    key={dep}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                  >
                    {dep}
                  </code>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeMod.summary}
            </p>

            <ul className="space-y-2">
              {activeMod.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs text-slate-200 bg-black/25 border border-white/5 rounded-lg px-3 py-2.5 leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: activeMod.color }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Classes &amp; headers clés
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeMod.keyClasses.map((cls) => (
                  <code
                    key={cls}
                    className="text-[11px] px-2 py-0.5 rounded bg-black/35 border border-white/10"
                    style={{ color: activeMod.color }}
                  >
                    {cls}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testing & Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#0d1420] p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Tests unitaires (doctest)
            </span>
            <span className="rr-font-retro text-xl text-emerald-300 leading-none">
              155 tests · 2 122 assertions
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Couverture de l&apos;ECS Sparse-Set, des collisions, des règles de power-ups, de la sérialisation JSON et des leaderboards.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0d1420] p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#50dcff]">
              Smoke-test E2E
            </span>
            <code className="text-[11px] text-slate-300">--smoke-test</code>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enchaîne automatiquement <code className="text-slate-200">MenuScene → GameScene → EndlessScene → MenuScene</code> pour vérifier les transitions, FBO et destructions RAII.
          </p>
        </div>
      </div>
    </div>
  );
};
