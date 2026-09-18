import React from 'react';
import { PersonalInfo } from '../../types';

interface ContactProps {
  info: PersonalInfo;
}

export const Contact: React.FC<ContactProps> = ({ info }) => {
  return (
    <section
      id="contact"
      className="min-h-screen py-16 px-[5%] max-w-[1200px] mx-auto flex flex-col justify-between items-center"
    >
      <div className="w-full flex flex-col items-center justify-center flex-1">
        <p className="text-base font-semibold text-[rgb(85,85,85)] dark:text-[#8b949e] text-center">
          Actuellement en recherche d' Alternance
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-[2.2rem] font-semibold text-black dark:text-[#f0f6fc] text-center mb-8">
          Contactez Moi
        </h2>

        {/* Contact Upper Container (Original DA) */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-8 border border-[rgb(163,163,163)] dark:border-[#30363d] rounded-[20px] bg-[#fafafa] dark:bg-[#161b22] max-w-[600px] w-full shadow-sm">
          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="dark:p-1.5 dark:bg-white/10 dark:rounded-full">
              <img
                src="/assets/icons/email.webp"
                alt=""
                className="w-8 h-8 object-contain"
                width="32"
                height="32"
                aria-hidden="true"
              />
            </div>
            <p className="text-lg font-medium">
              <a
                href={`mailto:${info.email}`}
                className="text-black dark:text-[#f0f6fc] hover:text-gray-500 dark:hover:text-gray-400 hover:underline transition-colors"
              >
                {info.email}
              </a>
            </p>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <div className="dark:p-1.5 dark:bg-white/10 dark:rounded-full">
              <img
                src="/assets/icons/linkedin.webp"
                alt=""
                className="w-8 h-8 object-contain"
                width="32"
                height="32"
                aria-hidden="true"
              />
            </div>
            <p className="text-lg font-medium">
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-[#f0f6fc] hover:text-gray-500 dark:hover:text-gray-400 hover:underline transition-colors"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pt-8 pb-4 text-center border-t border-[#e2e8f0] dark:border-[#30363d]">
        <p className="text-sm text-[rgb(85,85,85)] dark:text-[#8b949e]">
          Copyright &#169; {new Date().getFullYear()} {info.name}. Tous droits réservés.
        </p>
      </footer>
    </section>
  );
};
