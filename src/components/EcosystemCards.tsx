import React from 'react';
import { ArrowSlant, GithubLogo, ArtifactIcon, SkillsIcon, ModelIcon } from './CustomIcons';

export const EcosystemCards: React.FC = () => {
  const pillars = [
    {
      name: 'Horizon',
      repo: 'gutsofpratik/Horizon',
      category: 'Flagship Workspace',
      badge: 'Release v0.3.3',
      icon: ArtifactIcon,
      desc: 'The sovereign desktop AI workspace. Built-in model loading, editable live artifacts, sandboxed terminal execution, and native Office/PDF synthesis.',
      url: 'https://github.com/gutsofpratik/Horizon'
    },
    {
      name: 'Horizon-Skills',
      repo: 'gutsofpratik/Horizon-Skills',
      category: 'Agent Skills Library',
      badge: '3,203 Packages',
      icon: SkillsIcon,
      desc: 'A massive public catalog of reusable AI skills, agent instructions, and tool definitions with machine-readable discovery entries.',
      url: 'https://github.com/gutsofpratik/Horizon-Skills'
    },
    {
      name: 'Horizon-Models',
      repo: 'gutsofpratik/Horizon-Models',
      category: 'Hardware & Weights',
      badge: 'Hardware Sizer',
      icon: ModelIcon,
      desc: 'Empirical model selection guide, local quantization benchmarks, and memory sizing curves across Apple Silicon and Nvidia RTX.',
      url: 'https://github.com/gutsofpratik/Horizon-Models'
    }
  ];

  return (
    <section id="ecosystem" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 block mb-2">
              Three Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              OPEN SOURCE ECOSYSTEM
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            All code, model catalogs, and skill packages are distributed openly under permissive MIT licensing.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300">
                      {item.badge}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-2xl font-display font-medium text-white mb-1 group-hover:text-neutral-200">
                    {item.name}
                  </h3>
                  <div className="text-xs text-neutral-400 font-sans mb-4">
                    {item.repo}
                  </div>

                  <p className="text-neutral-400 font-sans text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-sans text-neutral-400 group-hover:text-white transition-colors">
                  <div className="flex items-center gap-1.5">
                    <GithubLogo className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </div>
                  <ArrowSlant className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
