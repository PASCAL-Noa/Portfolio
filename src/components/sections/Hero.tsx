import React from 'react';
import { PersonalInfo } from '../../types';

interface HeroProps {
  info: PersonalInfo;
}

export const Hero: React.FC<HeroProps> = ({ info }) => {
  return (
    <section
      id="profile"
      className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-20 max-w-[1200px] mx-auto px-[5%] py-12 relative"
    >
      {/* Profile Picture */}
      <div className="w-[min(280px,70vw)] md:w-[400px] aspect-square flex items-center justify-center shrink-0">
        <img
          src="/assets/Utils/profile.webp"
          alt={`Portrait professionnel de ${info.name}`}
          className="w-full h-full object-contain rounded-2xl"
          fetchPriority="high"
        />
      </div>

      {/* Hero Text */}
      <div className="flex flex-col items-center md:items-start">
        <p className="text-base font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e] mb-1">
          Bonjour, je suis
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-[3rem] font-semibold text-black dark:text-[#f0f6fc] tracking-tight mb-2">
          {info.name}
        </h1>

        <p className="text-2xl md:text-[1.75rem] font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e] mb-6 text-center md:text-left">
          Étudiant en Informatique
        </p>

        {/* Buttons (Original Pill Design) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          <a
            href={info.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold text-[0.95rem] py-3.5 px-6 min-w-[8.5rem] rounded-full border border-[rgb(53,53,53)] dark:border-gray-500 text-black dark:text-white bg-transparent hover:bg-[rgb(53,53,53)] dark:hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
          >
            Télécharger mon CV
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center font-semibold text-[0.95rem] py-3.5 px-6 min-w-[8.5rem] rounded-full border border-[rgb(53,53,53)] dark:border-gray-300 bg-[rgb(53,53,53)] dark:bg-[#f0f6fc] text-white dark:text-black hover:bg-black dark:hover:bg-white hover:border-black transition-all cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={info.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:opacity-75 transition-opacity dark:bg-white/10 dark:p-1.5"
            aria-label="Profil LinkedIn"
          >
            <img
              src="/assets/icons/linkedin.webp"
              alt="LinkedIn"
              className="w-8 h-8 object-contain cursor-pointer"
              width="32"
              height="32"
            />
          </a>

          <a
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:opacity-75 transition-opacity dark:bg-white/10 dark:p-1.5"
            aria-label="Profil GitHub"
          >
            <img
              src="/assets/icons/github.webp"
              alt="GitHub"
              className="w-8 h-8 object-contain cursor-pointer"
              width="32"
              height="32"
            />
          </a>
        </div>
      </div>

      {/* Down Arrow */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-75 hover:opacity-100 transition-opacity animate-bounce dark:invert"
        aria-label="Section suivante : À propos"
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
