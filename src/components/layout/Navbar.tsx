import React, { useState } from 'react';

interface NavbarProps {
  name: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-[1300px] h-full mx-auto px-[5%] flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="text-2xl md:text-3xl font-semibold text-black tracking-tight hover:opacity-80 transition-opacity">
          {name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0 text-xl font-normal">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-black hover:text-gray-500 hover:underline hover:decoration-gray-300 hover:underline-offset-8 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden relative">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-between w-[30px] h-[24px] bg-transparent border-none cursor-pointer p-0"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-[11px] rotate-45' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? '-translate-y-[11px] -rotate-45' : ''
              }`}
            />
          </button>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-[#e2e8f0] rounded-xl shadow-xl py-3 z-50">
              <ul className="list-none p-0 m-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 px-6 text-lg text-black hover:bg-[#f1f5f9] hover:text-gray-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
