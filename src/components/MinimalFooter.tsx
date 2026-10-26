import React from 'react';
import { HorizonLogo, GithubLogo, ArrowSlant } from './CustomIcons';

export const MinimalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] py-16 bg-black relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center text-white">
              <HorizonLogo className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-medium text-white text-sm tracking-tight">
                HORIZONS LAB
              </div>
              <div className="text-xs text-neutral-400 font-sans font-light">
                Open source AI research and sovereign compute.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-neutral-400">
            <a
              href="https://github.com/gutsofpratik/Horizon"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Horizon</span>
              <ArrowSlant className="w-3 h-3 text-neutral-600" />
            </a>
            <a
              href="https://github.com/gutsofpratik/Horizon-Skills"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Skills (3.2k)</span>
              <ArrowSlant className="w-3 h-3 text-neutral-600" />
            </a>
            <a
              href="https://github.com/gutsofpratik/Horizon-Models"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Models</span>
              <ArrowSlant className="w-3 h-3 text-neutral-600" />
            </a>
            <a
              href="https://github.com/gutsofpratik"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GithubLogo className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={scrollToTop}
              className="text-white hover:underline underline-offset-4 ml-auto sm:ml-4"
            >
              Top ↑
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-neutral-400">
          <div>
            © 2026 Horizons Lab. Released under the MIT License.
          </div>
          <div className="flex items-center gap-4">
            <span>Local Compute</span>
            <span>·</span>
            <span>Zero Telemetry</span>
            <span>·</span>
            <span>Built in the Open</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
