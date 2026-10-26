import React from 'react';
import { Flame } from 'lucide-react';

export const LabManifesto: React.FC = () => {
  const tenets = [
    {
      num: '01',
      title: 'LOCAL SOVEREIGNTY',
      subtitle: 'Your silicon. Your memory. Your data.',
      desc: 'We reject the modern premise that all intelligence must be leased through cloud tollbooths. Horizons Lab builds software that runs natively on your machine, with zero telemetry and zero secret exfiltration.'
    },
    {
      num: '02',
      title: 'PRAGMATIC TOOLS OVER HYPE',
      subtitle: 'Making real files and executing real work.',
      desc: 'Chat windows are not enough. Real work requires creating Word & Excel files, compiling software in a real terminal, automating browser sessions, and managing persistent multi-agent project memories.'
    },
    {
      num: '03',
      title: 'PURE OPEN SOURCE ETHOS',
      subtitle: 'No artificial paywalls or closed weights.',
      desc: 'Our code, benchmarks, and 3,200+ skill packages are published under permissive licenses. If you build it, you own it. We build in the open so the developer community can inspect and improve every layer.'
    },
    {
      num: '04',
      title: 'COMMUNITY & CRAZY EXPERIMENTS',
      subtitle: 'Pushing the edge of low-bit intelligence.',
      desc: 'We are hackers, researchers, and tinkerers. We love experimenting with 3-bit cognitive quantization, zero-copy IPC pipes, local agent swarms, and high-performance desktop runtimes.'
    }
  ];

  return (
    <section id="manifesto" className="py-24 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>THE HORIZONS LAB MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight mb-4">
            WHY WE BUILD IN THE OPEN
          </h2>
          <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed">
            The future of artificial intelligence should not belong to a handful of cloud monopolies. We are engineering the infrastructure for local, independent, sovereign intelligence.
          </p>
        </div>

        {/* 4 Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          {tenets.map((tenet, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-white/10 bg-neutral-950 flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-white">{tenet.num}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">PRINCIPLE</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {tenet.title}
                </h3>
                <h4 className="text-xs text-neutral-400 font-mono mb-4">
                  {tenet.subtitle}
                </h4>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                  {tenet.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
