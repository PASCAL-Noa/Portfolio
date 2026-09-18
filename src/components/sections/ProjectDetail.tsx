import React, { useState, useEffect } from 'react';
import { ProjectDetailData } from '../../data/projectDetails';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, FileText, X } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';

interface ProjectDetailProps {
  data: ProjectDetailData;
  githubUrl?: string;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ data, githubUrl, onBack }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Reset media index when project changes
  useEffect(() => {
    setActiveMediaIndex(0);
    setZoomedImage(null);
  }, [data.projectId]);

  const totalMedia = data.media.length;

  const handlePrev = () => {
    setActiveMediaIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveMediaIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1));
  };

  const currentMedia = data.media[activeMediaIndex] || data.media[0];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb / Back button */}
      <nav className="mb-8" aria-label="Retour à l'accueil">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-[#fafafa] dark:bg-[#161b22] transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux projets</span>
        </button>
      </nav>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Media Gallery & Downloads */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Carousel Display */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/90 dark:bg-black/60 border border-gray-200 dark:border-[#30363d] shadow-sm flex items-center justify-center group">
            {currentMedia?.type === 'video' ? (
              <iframe
                src={currentMedia.src}
                title={`Vidéo de démonstration - ${data.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : currentMedia?.src ? (
              <img
                src={currentMedia.src}
                alt={currentMedia.alt || data.title}
                onClick={() => setZoomedImage(currentMedia.src)}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="text-gray-400">Aucun média disponible</div>
            )}

            {/* Navigation Chevrons */}
            {totalMedia > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 dark:bg-[#161b22]/80 dark:hover:bg-[#161b22] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Média précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 dark:bg-[#161b22]/80 dark:hover:bg-[#161b22] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Média suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {totalMedia > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto p-2 scrollbar-thin">
              {data.media.map((item, idx) => {
                const thumbSrc = data.thumbnails[idx] || item.src;
                const isActive = idx === activeMediaIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative shrink-0 w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-blue-500 scale-105 shadow-md ring-2 ring-blue-500/30'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <img
                      src={thumbSrc}
                      alt={item.alt || `Miniature ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Action / Download Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {data.downloadUrl && (
              <a
                href={data.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-[rgb(53,53,53)] dark:bg-[#f0f6fc] text-white dark:text-[#0d1117] hover:bg-black dark:hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {data.downloadLabel || 'Télécharger le projet'}
              </a>
            )}

            {data.docUrl && (
              <a
                href={data.docUrl}
                download
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#21262d] dark:hover:border-gray-500 transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                {data.docLabel || 'Télécharger le document'}
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#21262d] dark:hover:border-gray-500 transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                Dépôt GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Project Details & Meta */}
        <article className="lg:col-span-5 bg-[#fafafa] dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          {/* Banner Image */}
          {data.banner && (
            <div className="w-full flex items-center justify-start">
              <img
                src={data.banner}
                alt={`Bannière ${data.title}`}
                className="w-full max-h-56 sm:max-h-64 object-contain rounded-xl"
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-[#f0f6fc] tracking-tight">
              {data.title}
            </h1>
          </div>

          {/* Description */}
          <div
            className="text-gray-700 dark:text-[#8b949e] text-sm sm:text-base leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* Metadata Box */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3 text-sm">
            {data.duration && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-black dark:text-[#f0f6fc]">Temps : </span>
                {data.duration}
              </p>
            )}

            {data.team && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-black dark:text-[#f0f6fc]">Développement : </span>
                {data.team}
              </p>
            )}

            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-semibold text-black dark:text-[#f0f6fc]">Tags :</span>
                {data.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      tag.variant === 'purple'
                        ? 'bg-[#bd00ff]/15 text-[#bd00ff] border border-[#bd00ff]/30 dark:bg-[#bd00ff]/25 dark:text-[#d280ff] dark:border-[#bd00ff]/45'
                        : 'bg-gray-200/80 text-gray-800 border border-gray-300/60 dark:bg-white/10 dark:text-[#f0f6fc] dark:border-white/20'
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-xs"
        >
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            aria-label="Fermer le zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedImage}
            alt="Agrandissement"
            className="max-w-[92vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
