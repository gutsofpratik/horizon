import React, { useState } from 'react';
import { DownloadIcon, ArrowSlant } from './CustomIcons';

interface ProductView {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  tags: string[];
}

export const ProductShowcase: React.FC<{ onOpenDownload: () => void }> = ({ onOpenDownload }) => {
  const views: ProductView[] = [
    {
      id: 'workspace',
      name: 'Workspace & Chat',
      tagline: 'Main Operating Desktop',
      image: '/images/06-workspace-home.png',
      description: 'The native workspace after profile and model setup. Sidebar keeps your chats, creations, artifacts, and projects organized without clutter.',
      tags: ['Local History', 'File Previews', 'Task Progress']
    },
    {
      id: 'models',
      name: 'Local Model Manager',
      tagline: 'GGUF & llama.cpp Runner',
      image: '/images/04-local-model.png',
      description: 'Download, import, and mount open-weights models directly on your GPU or unified memory. Full support for Qwen, Bonsai, and custom GGUF weights.',
      tags: ['Zero Cloud APIs', 'Metal / CUDA Offload', 'Hardware Verification']
    },
    {
      id: 'skills',
      name: '3,203+ Installed Skills',
      tagline: 'Modular AI Instructions',
      image: '/images/07-installed-skills.png',
      description: 'Browse, inspect, and install thousands of verified skills from the Horizon registry. Equip your assistant with specialized workflows in one click.',
      tags: ['Machine-Readable', 'License Provenance', 'Instant Injection']
    },
    {
      id: 'teams',
      name: 'Multi-Agent Teams',
      tagline: 'Autonomous Coordination',
      image: '/images/08-teams-workspace.png',
      description: 'Delegate complex engineering objectives across teams of specialized agents with shared directories, persistent memory, and approval checkpoints.',
      tags: ['Collaborative Swarms', 'Scheduled Automations', 'Sandboxed Shell']
    }
  ];

  const [activeTab, setActiveTab] = useState<number>(0);
  const active = views[activeTab];

  return (
    <section id="horizon" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-sans text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>FLAGSHIP PRODUCT // v0.3.3</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              INSIDE HORIZON WORKSPACE
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-sans font-light leading-relaxed">
            Real software running on real silicon. Explore the native desktop interface designed for developers who value autonomy.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/[0.08]">
          {views.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeTab === idx ? 'bg-cyan-500' : 'bg-neutral-600'}`} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Big Interactive Showcase Frame */}
        <div className="sheen-card rounded-2xl p-4 sm:p-6 overflow-hidden relative">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-neutral-400 font-sans ml-3 hidden sm:inline">
                Horizon Desktop — {active.tagline}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300">
                Local Session
              </span>
              <button
                onClick={onOpenDownload}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white hover:underline underline-offset-4 font-sans"
              >
                <span>Download Build</span>
                <ArrowSlant className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Screenshot Container with subtle depth glow */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black group">
            {/* The Actual Real Horizon Screenshot */}
            <img
              src={active.image}
              alt={active.name}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Gradient Vignette Overlay for aesthetic polish */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom floating telemetry chips */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full text-[11px] font-sans bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-sans bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 backdrop-blur-md">
                ● Live Hardware Offload
              </span>
            </div>
          </div>

          {/* Bottom Description Strip */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-display font-medium text-white">
                {active.name}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light mt-0.5 max-w-2xl leading-relaxed">
                {active.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://github.com/gutsofpratik/Horizon"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                Inspect Source
              </a>
              <button
                onClick={onOpenDownload}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Get Horizon</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
