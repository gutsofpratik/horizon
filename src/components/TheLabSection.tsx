import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { LAB_INITIATIVES } from '../data/horizonData';

export const TheLabSection: React.FC = () => {
  return (
    <section id="lab" className="py-24 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lab Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>EXPERIMENTAL RESEARCH & ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              INSIDE HORIZONS LAB
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-sans leading-relaxed">
            We don’t build closed API wrappers. We do the crazy stuff: training models, engineering native runtimes, writing low-level systems code, and empowering developers worldwide.
          </p>
        </div>

        {/* 4 Crazy Pillars of the Lab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 font-mono">
          
          <div className="p-8 rounded-xl border border-white/10 bg-neutral-950 flex flex-col justify-between group hover:border-white/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neutral-400 uppercase tracking-wider">LAB DIRECTIVE 01</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">WEIGHTS & RUNTIMES</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200">
                Model Training & Extreme Quantization
              </h3>
              <p className="text-neutral-400 text-sm font-sans leading-relaxed mb-6">
                Pushing the boundaries of how much intelligence fits onto consumer silicon. We experiment with domain-specific LoRA adapters, synthetic alignment traces, and low-bit PTQ quantization schemes that retain reasoning depth on 8GB-24GB machines.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-400 flex items-center justify-between">
              <span>llama.cpp · Unsloth · PTQ1_0</span>
              <span className="text-emerald-400">● Active Benchmarks</span>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-white/10 bg-neutral-950 flex flex-col justify-between group hover:border-white/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neutral-400 uppercase tracking-wider">LAB DIRECTIVE 02</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">SYSTEMS PROGRAMMING</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200">
                High-Performance Developer Tools
              </h3>
              <p className="text-neutral-400 text-sm font-sans leading-relaxed mb-6">
                Creating zero-copy inter-process communication (IPC) pipelines, isolated execution sandboxes, and native C++/Rust bindings so that AI agents can interact with system shells and compilers without network roundtrips or security vulnerabilities.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-400 flex items-center justify-between">
              <span>C++ · Rust · TypeScript · Unix Domain Sockets</span>
              <span className="text-emerald-400">● &lt;1.2ms Latency</span>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-white/10 bg-neutral-950 flex flex-col justify-between group hover:border-white/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neutral-400 uppercase tracking-wider">LAB DIRECTIVE 03</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">SOVEREIGN SOFTWARE</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200">
                Native Desktop Applications
              </h3>
              <p className="text-neutral-400 text-sm font-sans leading-relaxed mb-6">
                Building products like Horizon that restore digital sovereignty. Everything runs locally on Windows, macOS, and Linux: binary Office file creation, editable living artifacts, computer interaction, and profile encryption without cloud subscriptions.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-400 flex items-center justify-between">
              <span>Windows x64 · macOS Apple Silicon · Linux DEB/AppImage</span>
              <span className="text-white">● v0.3.3 Published</span>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-white/10 bg-neutral-950 flex flex-col justify-between group hover:border-white/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neutral-400 uppercase tracking-wider">LAB DIRECTIVE 04</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">RADICAL TRANSPARENCY</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200">
                Open Source & Community Ecosystem
              </h3>
              <p className="text-neutral-400 text-sm font-sans leading-relaxed mb-6">
                Everything we build is released under permissive open source licenses (MIT/Apache). We curate over 3,200+ reusable AI skills, publish hardware compatibility tables, and actively collaborate with developers across the globe.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-400 flex items-center justify-between">
              <span>3,203 Skills · MIT Licensed · Open RFCs</span>
              <span className="text-white">● 100% Free</span>
            </div>
          </div>

        </div>

        {/* Live Lab Initiatives List */}
        <div className="p-8 rounded-xl border border-white/15 bg-neutral-950">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h4 className="text-lg font-bold text-white font-mono">ACTIVE LAB WORKSTREAMS & RFCs</h4>
              <p className="text-xs text-neutral-400 font-sans">Current code repositories and experimental research tracks.</p>
            </div>
            <a
              href="https://github.com/gutsofpratik"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-white flex items-center gap-1.5 hover:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/gutsofpratik</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {LAB_INITIATIVES.slice(0, 3).map((item, idx) => (
              <a
                key={idx}
                href={item.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-lg bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-neutral-400">{item.category}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{item.status}</span>
                  </div>
                  <h5 className="text-white font-bold mb-1 group-hover:text-neutral-200">
                    {item.title}
                  </h5>
                  <p className="text-neutral-400 font-sans text-xs mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>{item.stats}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
