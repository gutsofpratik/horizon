import React, { useState } from 'react';
import { Download, Terminal, Copy, Check, ArrowRight, ShieldCheck, Cpu, Box, Flame } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  const [copied, setCopied] = useState(false);
  const cloneCommand = 'git clone https://github.com/gutsofpratik/Horizon.git';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative vertical hairline borders */}
      <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-px bg-white/[0.04] pointer-events-none" />
      <div className="hidden lg:block absolute right-12 top-0 bottom-0 w-px bg-white/[0.04] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Lab Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-neutral-950/80 backdrop-blur-md mb-8 group hover:border-white/30 transition-all">
          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-neutral-300">
            HORIZONS LAB // PRODUCT RELEASE v0.3.3
          </span>
          <span className="text-neutral-500">|</span>
          <a
            href="https://github.com/gutsofpratik/Horizon/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-white flex items-center gap-1 hover:underline"
          >
            Release Notes
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-mono leading-[1.08]">
          LOCAL-FIRST INTELLIGENCE.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-600">
            UNRESTRICTED CREATION.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed font-sans">
          We are <strong className="text-white font-medium">Horizons Lab</strong> — an open-source AI collective. We build high-performance local runtimes, fine-tune models, and develop sovereign tools. Our flagship workspace, <strong className="text-white font-medium">Horizon</strong>, runs local LLMs directly on your GPU, manages editable live artifacts, handles Office/PDF generation, and executes real sandboxed terminal tasks.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-white text-black font-mono text-sm font-semibold hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Download Horizon v0.3.3</span>
          </button>

          <a
            href="https://github.com/gutsofpratik/Horizon"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/20 bg-neutral-900/60 hover:bg-neutral-800 text-white font-mono text-sm font-medium hover:border-white/40 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Star gutsofpratik/Horizon</span>
          </a>

          <a
            href="#interactive-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white font-mono text-sm transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>Live Workspace Demo</span>
          </a>
        </div>

        {/* Clone snippet */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-neutral-950 border border-white/10 text-xs font-mono text-neutral-300 shadow-inner">
            <div className="flex items-center gap-2 overflow-x-auto text-left py-0.5">
              <span className="text-neutral-500 select-none">$</span>
              <span className="text-white font-medium">{cloneCommand}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-3 p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Spec Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left font-mono">
          <div className="p-4 rounded-lg border border-white/10 bg-neutral-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
              <Cpu className="w-3.5 h-3.5 text-white" />
              <span>LOCAL RUNTIME</span>
            </div>
            <div className="text-lg font-bold text-white">Zero Telemetry</div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Weights stay on your silicon</p>
          </div>

          <div className="p-4 rounded-lg border border-white/10 bg-neutral-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
              <Box className="w-3.5 h-3.5 text-white" />
              <span>SKILLS LIBRARY</span>
            </div>
            <div className="text-lg font-bold text-white">3,203+ Packages</div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Modular agent instructions</p>
          </div>

          <div className="p-4 rounded-lg border border-white/10 bg-neutral-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>SOVEREIGN ARCH</span>
            </div>
            <div className="text-lg font-bold text-white">Sandboxed Shell</div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Approval-gated execution</p>
          </div>

          <div className="p-4 rounded-lg border border-white/10 bg-neutral-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
              <Flame className="w-3.5 h-3.5 text-white" />
              <span>OPEN SOURCE</span>
            </div>
            <div className="text-lg font-bold text-white">MIT Licensed</div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Auditable and hackable</p>
          </div>
        </div>
      </div>
    </section>
  );
};
