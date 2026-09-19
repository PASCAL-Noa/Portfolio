import React from 'react';
import { TimelineItem, TimelineCategory } from '../../types';
import { GraduationCap, Briefcase, Globe, Code2, ExternalLink } from 'lucide-react';

interface AboutProps {
  items: TimelineItem[];
}

export const About: React.FC<AboutProps> = ({ items }) => {
  // Mapping du flag/type vers l'icône Lucide et la couleur de la pastille (accents préservés)
  const getIconAndBadge = (type: TimelineCategory) => {
    switch (type) {
      case 'edu':
        return {
          icon: <GraduationCap className="w-4 h-4 text-[#00d1ff]" />,
          dotBorder: 'border-[#00d1ff]',
          dotShadow: 'shadow-[0_0_10px_rgba(0,209,255,0.4)]'
        };
      case 'pro':
        return {
          icon: <Briefcase className="w-4 h-4 text-[#e83720]" />,
          dotBorder: 'border-[#e83720]',
          dotShadow: 'shadow-[0_0_10px_rgba(232,55,32,0.4)]'
        };
      case 'online':
        return {
          icon: <Globe className="w-4 h-4 text-[#bd00ff]" />,
          dotBorder: 'border-[#bd00ff]',
          dotShadow: 'shadow-[0_0_10px_rgba(189,0,255,0.4)]'
        };
      case 'tech':
        return {
          icon: <Code2 className="w-4 h-4 text-[#ff9800]" />,
          dotBorder: 'border-[#ff9800]',
          dotShadow: 'shadow-[0_0_10px_rgba(255,152,0,0.4)]'
        };
    }
  };

  return (
    <section id="about" className="min-h-screen py-24 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center space-y-2 mb-16">
        <p className="text-base font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e]">
          Apprenez-en davantage
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-[#f0f6fc] tracking-tight">
          Sur moi
        </h2>
      </div>

      {/* Timeline unilatérale */}
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-36 space-y-12">
        {items.map((item) => {
          const config = getIconAndBadge(item.type);

          return (
            <div key={item.id} className="relative pl-8 group">
              {/* Bullet / Pastille avec icône colorée & bordure assortie */}
              <div
                className={`absolute -left-[17px] top-3 w-8 h-8 rounded-full bg-white dark:bg-[#161b22] border-2 flex items-center justify-center transition-transform group-hover:scale-110 z-10 ${config.dotBorder} ${config.dotShadow}`}
              >
                {config.icon}
              </div>

              {/* Date à gauche de la ligne */}
              <span className="md:absolute md:-left-40 md:top-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2 md:mb-0 md:text-right md:w-32">
                {item.period}
              </span>

              {/* Card soignée */}
              <div className="bg-[#fafafa] dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] hover:border-gray-300 dark:hover:border-gray-600 rounded-2xl p-6 md:p-7 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Image agrandie (format 16:9) */}
                  {item.image && (
                    <div className="w-full lg:w-72 aspect-video shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Contenu textuel */}
                  <div className="space-y-2.5 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-black dark:text-[#f0f6fc] group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <p className="text-sm md:text-[0.95rem] text-gray-600 dark:text-[#8b949e] leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:underline font-semibold pt-1"
                      >
                        <span>{item.linkText || 'En savoir plus'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Down Arrow */}
      <a
        href="#projects"
        className="mx-auto mt-12 opacity-75 hover:opacity-100 transition-opacity animate-bounce dark:invert"
        aria-label="Section suivante : Projets"
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
