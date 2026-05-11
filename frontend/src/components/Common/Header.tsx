import React, { useState, useEffect } from 'react';
import { ROUTES } from '../../config/routes';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc,
  logoAlt = 'Logo',
  brandName = 'PABLO PROJECT TRACKER XXX',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-start h-16 md:h-20">
          <a href={ROUTES.HOME} className="flex items-center space-x-3 group">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-12 w-12 transition-transform group-hover:scale-105 rounded-lg"
              />
            ) : (
              <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg rotate-6 group-hover:rotate-12 transition-transform" />
            )}
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {brandName}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
