import React, { useState } from 'react';
import { Project } from '../../types';
import { GithubIcon } from '../common/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<'all' | 'engine' | 'game' | 'web'>('all');

  const categories = [
    { key: 'all', label: 'Tous les projets' },
    { key: 'engine', label: 'Moteurs 3D & Audio' },
    { key: 'game', label: 'Jeux Vidéo' },
    { key: 'web', label: 'Web' }
  ] as const;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2 mb-12">
        <p className="text-xs uppercase tracking-widest text-[#007bff] font-semibold">
          Portfolio & Réalisations
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
          Mes Projets
        </h2>
        <div className="w-12 h-1 bg-[#007bff] mx-auto rounded-full mt-2" />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === cat.key
                ? 'bg-black text-white shadow-md'
                : 'bg-[#fafafa] text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid (version moderne avec cartes blanches et tags) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col bg-white border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image banner 16:9 */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
              {project.featured && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black text-white shadow-md">
                  Vedette
                </span>
              )}
            </div>

            {/* Content body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-black group-hover:text-[#007bff] transition-colors">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-2">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f1f5f9] text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#007bff] hover:underline ml-auto"
                    >
                      Voir le site
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.detailUrl && !project.liveUrl && (
                    <a
                      href={project.detailUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#007bff] hover:underline ml-auto"
                    >
                      En savoir plus
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
