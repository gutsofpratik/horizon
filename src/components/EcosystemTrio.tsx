import React from 'react';
import { ArrowUpRight, Cpu, Terminal, Box } from 'lucide-react';
import { GithubIcon } from './Icons';

export const EcosystemTrio: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 relative bg-[#050505]">
      {/* Background dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>THE HORIZONS LAB ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              THREE PILLARS OF SOVEREIGN AI
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-sans leading-relaxed">
            From the local desktop workspace to curated hardware catalogs and 3,200+ agent skill packages, our ecosystem is built purely in the open.
          </p>
        </div>

        {/* 3 Large Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Horizon Workspace */}
          <div className="group rounded-xl border border-white/15 bg-neutral-950 p-8 flex flex-col justify-between hover:border-white/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal className="w-28 h-28 text-white stroke-[1]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded bg-white text-black font-mono text-xs font-bold uppercase tracking-wider">
                  Flagship Product
                </span>
                <span className="text-xs font-mono text-neutral-400">v0.3.3 Stable</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-mono mb-2 group-hover:text-neutral-200">
                Horizon
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                gutsofpratik / Horizon
              </p>

              <p className="text-neutral-300 text-sm font-sans leading-relaxed mb-6">
                A local-first AI workspace with built-in model loading, editable artifacts, live Office & PDF generation, a real sandboxed terminal, and autonomous agent orchestration.
              </p>

              <div className="space-y-2 mb-8 font-mono text-xs text-neutral-400">
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Target Platforms:</span>
                  <span className="text-white">Win, macOS, Linux</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Engine:</span>
                  <span className="text-white">llama.cpp / Native</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>License:</span>
                  <span className="text-white">MIT License</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="https://github.com/gutsofpratik/Horizon"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-medium border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Repository</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Card 2: Horizon-Skills */}
          <div className="group rounded-xl border border-white/15 bg-neutral-950 p-8 flex flex-col justify-between hover:border-white/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Box className="w-28 h-28 text-white stroke-[1]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 font-mono text-xs font-bold uppercase tracking-wider border border-white/10">
                  Agent Skills Library
                </span>
                <span className="text-xs font-mono text-neutral-400">3,203 Packages</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-mono mb-2 group-hover:text-neutral-200">
                Horizon-Skills
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                gutsofpratik / Horizon-Skills
              </p>

              <p className="text-neutral-300 text-sm font-sans leading-relaxed mb-6">
                A massive public catalog of 3,203+ reusable AI instructions, developer workflows, and toolkits with machine-readable discovery entries and full source provenance.
              </p>

              <div className="space-y-2 mb-8 font-mono text-xs text-neutral-400">
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Packaged Skills:</span>
                  <span className="text-white">3,203 verified</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Format:</span>
                  <span className="text-white">SKILL.md + Scripts</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Format Discovery:</span>
                  <span className="text-white">catalog.json</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="https://github.com/gutsofpratik/Horizon-Skills"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-medium border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4" />
                  <span>Browse 3,203 Skills</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Card 3: Horizon-Models */}
          <div className="group rounded-xl border border-white/15 bg-neutral-950 p-8 flex flex-col justify-between hover:border-white/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-28 h-28 text-white stroke-[1]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 font-mono text-xs font-bold uppercase tracking-wider border border-white/10">
                  Hardware & Weights
                </span>
                <span className="text-xs font-mono text-neutral-400">Curated Catalog</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-mono mb-2 group-hover:text-neutral-200">
                Horizon-Models
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                gutsofpratik / Horizon-Models
              </p>

              <p className="text-neutral-300 text-sm font-sans leading-relaxed mb-6">
                A practical guide and machine-readable catalog for local model selection: what to download, which runtime to choose, and how to size your computer memory and GPU.
              </p>

              <div className="space-y-2 mb-8 font-mono text-xs text-neutral-400">
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Covered Runtimes:</span>
                  <span className="text-white">llama.cpp, MLC, PTQ</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Quantization:</span>
                  <span className="text-white">Q4_K_M, PTQ1_0, FP16</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span>Hardware Tiers:</span>
                  <span className="text-white">8GB to 128GB VRAM</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="https://github.com/gutsofpratik/Horizon-Models"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-medium border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4" />
                  <span>Explore Model Specs</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
