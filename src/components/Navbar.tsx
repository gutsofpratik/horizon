import React, { useState, useEffect } from 'react';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-black text-lg tracking-tighter transition-transform group-hover:scale-105 shadow-sm">
              <span className="font-mono">H</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight font-mono group-hover:text-neutral-200">
                  HORIZONS LAB
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-semibold tracking-wider">
                  Open Source
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono tracking-tight -mt-0.5">
                AI Research & Sovereign Systems
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs text-neutral-300">
            <a
              href="#product"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors"
            >
              Horizon Workspace
            </a>
            <a
              href="#ecosystem"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors"
            >
              Ecosystem
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors flex items-center gap-1.5"
            >
              Skills
              <span className="text-[10px] bg-white/10 px-1 py-0.2 rounded text-neutral-300">3,203</span>
            </a>
            <a
              href="#models"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors"
            >
              Models & Sizing
            </a>
            <a
              href="#lab"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors flex items-center gap-1"
            >
              The Lab
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>
            <a
              href="#manifesto"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-neutral-900/80 transition-colors"
            >
              Manifesto
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/gutsofpratik/Horizon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md border border-white/20 bg-neutral-900/80 hover:bg-neutral-800 text-white transition-all hover:border-white/40"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] text-neutral-400 border-l border-neutral-700 pl-2">★ Star</span>
            </a>

            <button
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-medium rounded-md bg-white hover:bg-neutral-200 text-black transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Horizon v0.3.3</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDownload}
              className="px-3 py-1 text-xs font-mono bg-white text-black rounded font-medium"
            >
              Download
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-900 border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 font-mono text-sm">
          <a
            href="#product"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            Horizon Workspace
          </a>
          <a
            href="#ecosystem"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            Ecosystem (Skills & Models)
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            Skills Catalog (3,203)
          </a>
          <a
            href="#models"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            Model Hardware Sizer
          </a>
          <a
            href="#lab"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            The Open Source Lab
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
          >
            Download Center
          </a>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://github.com/gutsofpratik/Horizon"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-xs border border-white/20 rounded bg-neutral-900 text-white"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore gutsofpratik/Horizon</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
