import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types';
import { GithubIcon } from '../common/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');

  const categories = [
    { key: 'all', label: 'Tous les projets' },
    { key: 'game', label: 'Jeux vidéo' },
    { key: 'software', label: 'Logiciel' },
    { key: 'web', label: 'Web' },
    { key: 'other', label: 'Autre' }
  ] as const;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="min-h-screen py-24 px-6 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="text-center space-y-2 mb-12">
        <p className="text-base font-semibold text-[rgb(85,85,85)]">
          Découvrez mes différents
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
          Projets
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setFilter(cat.key);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
              filter === cat.key
                ? 'bg-[rgb(53,53,53)] text-white shadow-sm scale-105'
                : 'bg-[#fafafa] text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid avec transition fluide progressive par carte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <article
            key={`${filter}-${project.id}`}
            style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
            className="animate-project-fade-in group flex flex-col bg-[#fafafa] border border-[rgb(163,163,163)]/70 hover:border-gray-400 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5 sm:p-6"
          >
            {/* Image banner 16:9 nette */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 rounded-xl mb-4 sm:mb-5">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Content body avec aération mobile renforcée */}
            <div className="flex-1 flex flex-col justify-between space-y-4 sm:space-y-5 px-1 sm:px-0">
              <div className="space-y-2.5">
                <h3 className="text-xl font-semibold text-black group-hover:text-gray-700 transition-colors leading-snug">
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
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-200/80 text-[rgb(53,53,53)] border border-gray-300/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card actions avec boutons stylisés et accents */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 shadow-xs group/btn"
                    >
                      <GithubIcon className="w-4 h-4 text-gray-700 group-hover/btn:text-white transition-colors" />
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-full border border-[#007bff]/30 bg-[#007bff]/10 text-[#0069d9] hover:bg-[#007bff] hover:text-white hover:border-[#007bff] transition-all duration-200 ml-auto shadow-xs group/link"
                    >
                      Voir le site
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {project.detailUrl && !project.liveUrl && (
                    <a
                      href={project.detailUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-full border border-[#007bff]/30 bg-[#007bff]/10 text-[#0069d9] hover:bg-[#007bff] hover:text-white hover:border-[#007bff] transition-all duration-200 ml-auto shadow-xs group/link"
                    >
                      En savoir plus
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Down Arrow */}
      <a
        href="#experience"
        className="mx-auto mt-12 opacity-75 hover:opacity-100 transition-opacity animate-bounce"
        aria-label="Section suivante : Compétences"
      >
        <img
          src="/assets/icons/arrow.webp"
          alt=""
          className="w-6 h-6 object-contain"
          width="24"
          height="24"
        />
      </a>
    </section>
  );
};
