import React from 'react';
import { TimelineItem, TimelineCategory } from '../../types';
import { GraduationCap, Briefcase, Globe, Code2, ExternalLink } from 'lucide-react';

interface AboutProps {
  items: TimelineItem[];
}

export const About: React.FC<AboutProps> = ({ items }) => {
  // Mapping du flag/type vers l'icône Lucide et la couleur de la pastille (extensible backend)
  const getIconAndBadge = (type: TimelineCategory) => {
    switch (type) {
      case 'edu':
        return {
          icon: <GraduationCap className="w-4 h-4 text-[#00d1ff]" />,
          dotBorder: 'border-[#00d1ff]',
          dotShadow: 'shadow-[0_0_8px_#00d1ff]',
          badgeBg: 'bg-[#00d1ff]/10 text-[#008db3] border-[#00d1ff]/30'
        };
      case 'pro':
        return {
          icon: <Briefcase className="w-4 h-4 text-[#e83720]" />,
          dotBorder: 'border-[#e83720]',
          dotShadow: 'shadow-[0_0_8px_#e83720]',
          badgeBg: 'bg-[#e83720]/10 text-[#c12510] border-[#e83720]/30'
        };
      case 'online':
        return {
          icon: <Globe className="w-4 h-4 text-[#bd00ff]" />,
          dotBorder: 'border-[#bd00ff]',
          dotShadow: 'shadow-[0_0_8px_#bd00ff]',
          badgeBg: 'bg-[#bd00ff]/10 text-[#8800b8] border-[#bd00ff]/30'
        };
      case 'tech':
        return {
          icon: <Code2 className="w-4 h-4 text-[#ff9800]" />,
          dotBorder: 'border-[#ff9800]',
          dotShadow: 'shadow-[0_0_8px_#ff9800]',
          badgeBg: 'bg-[#ff9800]/10 text-[#c77700] border-[#ff9800]/30'
        };
    }
  };

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-16">
        <p className="text-xs uppercase tracking-widest text-[#007bff] font-semibold">
          Apprenez-en davantage
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
          Mon Parcours
        </h2>
        <div className="w-12 h-1 bg-[#007bff] mx-auto rounded-full mt-2" />
      </div>

      {/* Timeline unilatérale (élégante, lisible et avec images en valeur) */}
      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-32 space-y-12">
        {items.map((item) => {
          const config = getIconAndBadge(item.type);

          return (
            <div key={item.id} className="relative pl-8 group">
              {/* Bullet / Pastille avec icône */}
              <div
                className={`absolute -left-[17px] top-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center transition-transform group-hover:scale-110 z-10 ${config.dotBorder} ${config.dotShadow}`}
              >
                {config.icon}
              </div>

              {/* Date sur la gauche pour les écrans larges */}
              <span className="md:absolute md:-left-36 md:top-3 text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 md:mb-0 md:text-right md:w-28">
                {item.period}
              </span>

              {/* Card blanche soignée avec image mise en valeur */}
              <div className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Image mise en valeur (format 16:9 soigné) */}
                  {item.image && (
                    <div className="w-full sm:w-48 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Contenu textuel */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-black group-hover:text-[#007bff] transition-colors">
                        {item.title}
                      </h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${config.badgeBg}`}>
                        {item.period}
                      </span>
                    </div>

                    {item.subtitle && (
                      <p className="text-xs font-semibold text-gray-500">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#007bff] hover:underline font-semibold pt-1"
                      >
                        <span>{item.linkText || 'En savoir plus'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
