import React from 'react';
import { SkillCategory } from '../../types';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  return (
    <section id="experience" className="min-h-screen py-16 px-[5%] max-w-[1200px] mx-auto relative flex flex-col justify-center">
      <p className="text-base font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e] text-center">
        Découvrez mes
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-[2.2rem] font-semibold text-black dark:text-[#f0f6fc] text-center mb-10">
        Compétences
      </h2>

      {/* Skills Grid: 2 columns matching original about-containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex flex-col justify-between p-8 bg-[#fafafa] dark:bg-[#161b22] border border-[rgb(163,163,163)] dark:border-[#30363d] rounded-[20px] text-center shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e] mb-8">
              {category.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-left">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex items-start gap-2.5">
                  <img
                    src="/assets/icons/checkmark.webp"
                    alt=""
                    className="w-5 h-5 object-contain shrink-0 mt-0.5 dark:invert"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  />
                  <h4 className="text-base font-medium text-black dark:text-[#f0f6fc] leading-snug">
                    {skill.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Down Arrow */}
      <a
        href="#contact"
        className="mx-auto mt-12 opacity-75 hover:opacity-100 transition-opacity animate-bounce dark:invert"
        aria-label="Section suivante : Contact"
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
