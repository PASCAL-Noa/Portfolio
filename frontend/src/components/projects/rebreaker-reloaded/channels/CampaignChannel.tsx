import React from 'react';
import { EVOLUTION_COMPARISON } from '../data';
import { getAssetUrl } from '../../../../utils/imageUrl';
import { GithubIcon } from '../../../common/SocialIcons';
import { BookOpen } from 'lucide-react';

interface CampaignChannelProps {
  githubUrl: string;
}

const GAME_MODES = [
  {
    title: 'Campagne',
    accent: '#50dcff',
    desc: 'Niveaux construits à la main avec progression Workshop et scores enregistrés.',
  },
  {
    title: 'Endless',
    accent: '#ffd73c',
    desc: 'Vagues infinies à difficulté croissante, briques renforcées et leaderboard dédié.',
  },
  {
    title: 'Level Maker',
    accent: '#a569ff',
    desc: 'Éditeur intégré pour placer briques et événements, puis tester immédiatement.',
  },
];

export const CampaignChannel: React.FC<CampaignChannelProps> = ({ githubUrl }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Hero Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-7 rounded-xl overflow-hidden border border-[#50dcff]/35 bg-[#070b14]">
          <img
            src={getAssetUrl('/assets/RebreakerReloaded/banner.jpg')}
            alt="Rebreaker Reloaded"
            className="w-full h-full object-cover aspect-video"
          />
        </div>

        <div className="xl:col-span-5 rounded-xl border border-white/10 bg-[#0f1624]/90 p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <h1 className="rr-font-retro text-4xl text-white leading-none tracking-wider">
              REBREAKER RELOADED
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-[#50dcff]">
              C++20 · SFML 3.0.2 · Solo · 2026
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              Réécriture complète en solo de mon projet de Bachelor <strong className="text-white">Rebreaker</strong>.
              L&apos;interface prend la forme d&apos;une télévision CRT des années 80, portée par un moteur ECS maison,
              9 shaders GLSL, 12 power-ups améliorables et 3 ultimates.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#50dcff] hover:bg-[#7ae7ff] text-[#050912] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={`${githubUrl}/tree/main/Docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 text-slate-100 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#50dcff]" />
              <span>Documentation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {GAME_MODES.map((mode) => (
          <div
            key={mode.title}
            className="rounded-xl border border-white/10 bg-[#0d1420] p-4 space-y-1"
          >
            <div
              className="rr-font-retro text-2xl leading-none"
              style={{ color: mode.accent }}
            >
              {mode.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{mode.desc}</p>
          </div>
        ))}
      </div>

      {/* Rebreaker (2025) -> Reloaded (2026) */}
      <div className="rounded-xl border border-white/10 bg-[#0c121e] overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 border-b border-white/10 bg-[#10192b] text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="col-span-3">Aspect</div>
          <div className="col-span-4">Rebreaker (2025)</div>
          <div className="col-span-5 text-[#50dcff]">Reloaded (2026)</div>
        </div>

        <div className="divide-y divide-white/5">
          {EVOLUTION_COMPARISON.map((row) => (
            <div
              key={row.metric}
              className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-2 px-4 py-2.5 text-xs items-center"
            >
              <div className="md:col-span-3 font-semibold text-slate-300">
                {row.metric}
              </div>
              <div className="md:col-span-4 text-slate-400">{row.original}</div>
              <div className="md:col-span-5 text-slate-100">{row.reloaded}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
