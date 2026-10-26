import React from 'react';
import { ModelIcon, TerminalIcon, SovereignIcon, SkillsIcon } from './CustomIcons';

export const LabGrid: React.FC = () => {
  const labTracks = [
    {
      num: '01',
      title: 'Model Training & PTQ',
      icon: ModelIcon,
      tagline: 'Extreme Quantization',
      desc: 'Fine-tuning domain-specific open weights and researching sub-4-bit post-training quantization to maximize reasoning depth on consumer GPUs.'
    },
    {
      num: '02',
      title: 'High-Performance Systems',
      icon: TerminalIcon,
      tagline: 'Low-Latency IPC',
      desc: 'Developing zero-copy inter-process communication pipelines, native C++/Rust runtimes, and local toolchains for autonomous agents.'
    },
    {
      num: '03',
      title: 'Sovereign Desktop Apps',
      icon: SovereignIcon,
      tagline: 'Offline Runtimes',
      desc: 'Engineering native applications like Horizon that run entirely on your hardware with zero telemetry and zero external dependency.'
    },
    {
      num: '04',
      title: 'Community & Open Weights',
      icon: SkillsIcon,
      tagline: '3,200+ Skills',
      desc: 'Publishing machine-readable skill catalogs, empirical hardware sizing benchmarks, and permissive MIT tooling for the developer collective.'
    }
  ];

  return (
    <section id="lab" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 block mb-2">
              Inside Horizons Lab
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              THE RESEARCH LAB
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            We don't build closed cloud wrappers. We experiment with model fine-tuning, native systems code, and open-source tooling.
          </p>
        </div>

        {/* 4 Clean Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labTracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.num}
                className="group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-display text-neutral-400">{track.num}</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:border-white/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-sans uppercase tracking-wider text-neutral-400 block mb-1">
                    {track.tagline}
                  </span>
                  <h3 className="text-xl font-display font-medium text-white mb-3">
                    {track.title}
                  </h3>
                  <p className="text-neutral-400 font-sans text-xs sm:text-sm font-light leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-sans text-neutral-400">
                  <span>Experimental Track</span>
                  <span className="text-neutral-300 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
