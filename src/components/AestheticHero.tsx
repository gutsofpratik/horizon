import React from 'react';
import { ArrowSlant, GithubLogo, DownloadIcon } from './CustomIcons';

interface AestheticHeroProps {
  onOpenDownload: () => void;
}

export const AestheticHero: React.FC<AestheticHeroProps> = ({ onOpenDownload }) => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Dynamic Cosmic Gradient Blobs in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-600/10 via-cyan-500/10 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Release Pill with Subtle Cyan Pulse */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 hover:border-white/20 transition-all duration-300">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-sans tracking-wide text-neutral-300">
            HORIZONS LAB // RELEASING HORIZON v0.3.3
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-xs text-white font-medium">Open Source AI</span>
        </div>

        {/* Master Headline with Metallic Sheen */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-white tracking-tight leading-[1.05] mb-6">
          LOCAL-FIRST INTELLIGENCE.
          <br />
          <span className="text-metallic font-normal">
            SOVEREIGN COMPUTE.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 font-sans font-light leading-relaxed mb-10">
          We are <strong className="text-white font-medium">Horizons Lab</strong> — an open-source AI collective. We build high-performance runtimes, fine-tune local models, and develop sovereign tooling. Meet <strong className="text-white font-medium">Horizon</strong>: the desktop AI workspace that runs locally on your silicon without cloud lock-in.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <DownloadIcon className="w-4 h-4 text-black" />
            <span>Download Horizon v0.3.3</span>
          </button>

          <a
            href="https://github.com/gutsofpratik/Horizon"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white font-sans text-xs font-medium hover:border-white/25 transition-all duration-300"
          >
            <GithubLogo className="w-4 h-4 text-neutral-300" />
            <span>gutsofpratik / Horizon</span>
            <ArrowSlant className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>

        {/* Hero Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-sans block mb-1">Compute</span>
            <div className="text-xs font-medium text-white">Apple Metal & CUDA</div>
          </div>
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left">
            <span className="text-[10px] text-violet-400 uppercase tracking-widest font-sans block mb-1">Skills</span>
            <div className="text-xs font-medium text-white">3,203+ Packages</div>
          </div>
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left">
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-sans block mb-1">Privacy</span>
            <div className="text-xs font-medium text-white">Zero Telemetry</div>
          </div>
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left">
            <span className="text-[10px] text-amber-400 uppercase tracking-widest font-sans block mb-1">License</span>
            <div className="text-xs font-medium text-white">100% Permissive MIT</div>
          </div>
        </div>

      </div>
    </section>
  );
};
