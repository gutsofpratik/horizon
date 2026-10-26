import React, { useState, useEffect } from 'react';
import { HorizonLogo, GithubLogo, ArrowSlant } from './CustomIcons';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenDownload
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'horizon', label: 'Horizon' },
    { id: 'lab', label: 'The Lab' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'downloads', label: 'Downloads' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-xl border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Lab Mark */}
          <button
            onClick={() => setActivePage('horizon')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center text-white group-hover:border-white transition-all duration-300">
              <HorizonLogo className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-white text-sm tracking-tight">
                HORIZONS LAB
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-neutral-300 px-1.5 py-0.5 rounded-full border border-white/10">
                Open Source
              </span>
            </div>
          </button>

          {/* Minimal Floating Page Switcher */}
          <nav className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1 text-xs font-sans tracking-normal rounded-full transition-all duration-300 ${
                  activePage === item.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gutsofpratik/Horizon"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <GithubLogo className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowSlant className="w-3 h-3 text-neutral-500" />
            </a>

            <button
              onClick={onOpenDownload}
              className="px-4 py-1.5 text-xs font-sans font-medium text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Get v0.3.3
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
