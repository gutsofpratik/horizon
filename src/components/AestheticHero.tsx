import React from 'react';
import { ArrowSlant, GithubLogo, DownloadIcon } from './CustomIcons';

interface AestheticHeroProps {
  onOpenDownload: () => void;
}

export const AestheticHero: React.FC<AestheticHeroProps> = ({ onOpenDownload }) => {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Subtle radial light bloom behind headline */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.035] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Minimalist Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 hover:border-white/20 transition-all duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-soft-pulse" />
          <span className="text-[11px] font-sans tracking-wide text-neutral-300">
            HORIZONS LAB // RELEASING HORIZON v0.3.3
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-white tracking-tight leading-[1.04] mb-8">
          SOVEREIGN INTELLIGENCE.
          <br />
          <span className="text-neutral-500 font-normal">
            UNRESTRICTED.
          </span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-400 font-sans font-light leading-relaxed mb-12">
          An open-source AI lab engineering local-first intelligence. We train lightweight model architectures, build high-performance developer tools, and craft <strong className="text-white font-medium">Horizon</strong>—the desktop workspace for sovereign compute.
        </p>

        {/* Primary Minimal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.18)]"
          >
            <DownloadIcon className="w-4 h-4 text-black" />
            <span>Download Horizon v0.3.3</span>
          </button>

          <a
            href="https://github.com/gutsofpratik/Horizon"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white font-sans text-xs font-medium hover:border-white/25 transition-all duration-300"
          >
            <GithubLogo className="w-4 h-4 text-neutral-300" />
            <span>gutsofpratik / Horizon</span>
            <ArrowSlant className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>

        {/* Whisper-Quiet Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-sans text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span>100% Local-First Silicon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span>3,203+ Packaged Skills</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span>Zero Cloud Telemetry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span>MIT Permissive License</span>
          </div>
        </div>

      </div>
    </section>
  );
};
