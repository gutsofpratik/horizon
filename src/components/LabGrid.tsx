import React from 'react';
import { ModelIcon, TerminalIcon, SovereignIcon, SkillsIcon, ArrowSlant } from './CustomIcons';

export const LabGrid: React.FC = () => {
  const labTracks = [
    {
      num: '01',
      title: 'Model Training & PTQ',
      accent: 'cyan',
      badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50',
      glow: 'group-hover:border-cyan-500/30',
      icon: ModelIcon,
      tagline: 'Extreme Quantization',
      desc: 'Fine-tuning domain-specific open weights and researching sub-4-bit post-training quantization (PTQ1_0) to retain complex reasoning on consumer 8GB-24GB GPUs.',
      highlights: ['LoRA & PEFT Adapters', 'Synthetic Reasoning Chains', 'llama.cpp GGUF Integration']
    },
    {
      num: '02',
      title: 'High-Performance Tooling',
      accent: 'violet',
      badgeColor: 'text-violet-400 bg-violet-950/40 border-violet-800/50',
      glow: 'group-hover:border-violet-500/30',
      icon: TerminalIcon,
      tagline: 'Low-Latency Systems',
      desc: 'Building zero-copy inter-process communication pipelines, native C++/Rust runtimes, and sandboxed execution engines with microsecond overhead.',
      highlights: ['Zero-Copy IPC (< 1.2ms)', 'Sandboxed Shell Gates', 'Native C++ Assets']
    },
    {
      num: '03',
      title: 'Sovereign Desktop Apps',
      accent: 'emerald',
      badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50',
      glow: 'group-hover:border-emerald-500/30',
      icon: SovereignIcon,
      tagline: 'Local-First Runtimes',
      desc: 'Engineering native desktop applications like Horizon that run entirely on user silicon: local profile encryption, binary Office generation, and offline artifacts.',
      highlights: ['Offline Autonomy', 'Zero Telemetry', 'Multi-Profile Security']
    },
    {
      num: '04',
      title: 'Developer Community & RFCs',
      accent: 'amber',
      badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/50',
      glow: 'group-hover:border-amber-500/30',
      icon: SkillsIcon,
      tagline: 'Open Source Collective',
      desc: 'Publishing over 3,200+ reusable skill packages, public hardware sizing matrices, and contributing upstream patches to the open source AI ecosystem.',
      highlights: ['3,203 MIT Packages', 'Machine-Readable Catalogs', 'Upstream Contributions']
    }
  ];

  return (
    <section id="lab" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-sans text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>THE RESEARCH LAB // WHAT WE DO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              CRAZY EXPERIMENTS & LOW-LEVEL CODE
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            We don't build closed corporate API wrappers. We experiment with the raw edge of local intelligence, custom runtimes, and developer tooling.
          </p>
        </div>

        {/* 4 Rich High-Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labTracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.num}
                className={`group sheen-card rounded-2xl p-8 flex flex-col justify-between ${track.glow} transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-display text-neutral-400">{track.num}</span>
                    <span className={`text-[11px] font-sans px-3 py-1 rounded-full border ${track.badgeColor}`}>
                      {track.tagline}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-white">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-neutral-400 font-sans text-sm font-light leading-relaxed mb-6">
                    {track.desc}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {track.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-sans bg-white/[0.03] border border-white/[0.06] text-neutral-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-sans text-neutral-400 group-hover:text-white transition-colors">
                  <span>Explore Research Track</span>
                  <ArrowSlant className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
