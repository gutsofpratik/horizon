import React from 'react';
import { ArrowSlant, GithubLogo, ArtifactIcon, SkillsIcon, ModelIcon } from './CustomIcons';

export const EcosystemCards: React.FC = () => {
  const pillars = [
    {
      name: 'Horizon',
      repo: 'gutsofpratik/Horizon',
      category: 'Flagship Desktop App',
      badge: 'Release v0.3.3',
      badgeClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50',
      icon: ArtifactIcon,
      desc: 'The sovereign local-first AI workspace. Run models locally via llama.cpp, edit live artifacts, generate Word/Excel files, and automate terminal commands.',
      meta: 'Win · macOS · Linux',
      url: 'https://github.com/gutsofpratik/Horizon'
    },
    {
      name: 'Horizon-Skills',
      repo: 'gutsofpratik/Horizon-Skills',
      category: 'Agent Skills Library',
      badge: '3,203 Packages',
      badgeClass: 'text-violet-400 bg-violet-950/40 border-violet-800/50',
      icon: SkillsIcon,
      desc: 'A massive public catalog of 3,203+ reusable AI instructions, developer workflows, and toolkits with machine-readable catalog.json and upstream licenses.',
      meta: 'Machine-Readable JSON',
      url: 'https://github.com/gutsofpratik/Horizon-Skills'
    },
    {
      name: 'Horizon-Models',
      repo: 'gutsofpratik/Horizon-Models',
      category: 'Hardware Sizing & Weights',
      badge: 'Quantization Guide',
      badgeClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50',
      icon: ModelIcon,
      desc: 'Empirical model guide for Horizon: what to download, which runtime to choose, and how to size computer memory and GPU across Apple Silicon and Nvidia RTX.',
      meta: 'Empirical Benchmarks',
      url: 'https://github.com/gutsofpratik/Horizon-Models'
    }
  ];

  return (
    <section id="ecosystem" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-sans text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>THE HORIZONS LAB ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              THREE OPEN SOURCE REPOSITORIES
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            All three projects are developed openly on GitHub by the Horizons Lab team under permissive open licenses.
          </p>
        </div>

        {/* 3 Large Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group sheen-card rounded-2xl p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[11px] font-sans px-3 py-1 rounded-full border ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-medium text-white mb-1 group-hover:text-neutral-200">
                    {item.name}
                  </h3>
                  <div className="text-xs text-neutral-400 font-sans mb-4">
                    {item.repo}
                  </div>

                  <p className="text-neutral-400 font-sans text-sm font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-sans text-neutral-400 group-hover:text-white transition-colors">
                  <div className="flex items-center gap-1.5">
                    <GithubLogo className="w-3.5 h-3.5 text-neutral-300" />
                    <span>{item.meta}</span>
                  </div>
                  <ArrowSlant className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
