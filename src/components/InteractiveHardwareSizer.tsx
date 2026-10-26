import React, { useState } from 'react';
import { CURATED_MODELS } from '../data/horizonData';
import { ArrowSlant } from './CustomIcons';

export const InteractiveHardwareSizer: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      label: '8 GB RAM',
      device: 'Entry Mac / 4GB-6GB GPU Laptop',
      model: CURATED_MODELS[3], // Qwen 3.5 4B
      speed: 95,
      speedText: '85-110 t/s',
      vramPercent: 35,
      vramText: '3.2 GB / 8 GB'
    },
    {
      id: 1,
      label: '16 GB RAM',
      device: 'MacBook 16GB / RTX 4060/4070',
      model: CURATED_MODELS[0], // Qwen 3.5 9B
      speed: 65,
      speedText: '52-68 t/s',
      vramPercent: 42,
      vramText: '6.5 GB / 16 GB'
    },
    {
      id: 2,
      label: '24 GB VRAM',
      device: 'Nvidia RTX 3090/4090 / 32GB Mac',
      model: CURATED_MODELS[2], // Qwen 3 Coder 30B
      speed: 40,
      speedText: '24-32 t/s',
      vramPercent: 78,
      vramText: '18.5 GB / 24 GB'
    },
    {
      id: 3,
      label: '36-64 GB Unified',
      device: 'Apple Silicon M2/M3/M4 Max',
      model: CURATED_MODELS[1], // Bonsai 2 27B
      speed: 48,
      speedText: '28-36 t/s',
      vramPercent: 38,
      vramText: '14 GB / 36-64 GB'
    },
    {
      id: 4,
      label: '128 GB+ Station',
      device: 'Dual RTX 4090 / Mac Studio Ultra',
      model: CURATED_MODELS[4], // gpt-oss 20B
      speed: 55,
      speedText: '34-45 t/s',
      vramPercent: 20,
      vramText: '13 GB / 128 GB'
    }
  ];

  const current = tiers[selectedTier];

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-sans text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HORIZON-MODELS COMPANION TOOL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              HARDWARE & MODEL MATCHER
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            Find the optimal local model for your silicon. Verified empirically across Nvidia GPUs and Apple Silicon.
          </p>
        </div>

        {/* Hardware Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans whitespace-nowrap transition-all duration-300 ${
                selectedTier === t.id
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]'
                  : 'text-neutral-400 hover:text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/20'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Matching Result Box */}
        <div className="sheen-card rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-wider text-neutral-400 block mb-1">
                  Target: {current.device}
                </span>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-4xl font-display font-medium text-white">
                    {current.model.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium border border-white/20">
                    {current.model.quant}
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">
                {current.model.tradeoff}
              </p>

              {/* Live Metric Bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-neutral-400">VRAM Allocation</span>
                    <span className="text-white font-medium">{current.vramText}</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
                      style={{ width: `${current.vramPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-neutral-400">Generation Throughput</span>
                    <span className="text-emerald-400 font-medium">{current.speedText}</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
                      style={{ width: `${current.speed}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card Callout */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-black/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs">
                <span className="text-white font-medium">Horizon Execution Node</span>
                <span className="text-cyan-400">Metal / CUDA Ready</span>
              </div>

              <div className="space-y-2 text-xs font-sans text-neutral-400">
                <div className="flex justify-between">
                  <span>Download Weight:</span>
                  <span className="text-white">{current.model.downloadSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best For:</span>
                  <span className="text-white text-right max-w-[200px] truncate">{current.model.bestFor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Telemetry:</span>
                  <span className="text-emerald-400">Zero (Completely Offline)</span>
                </div>
              </div>

              <a
                href="https://github.com/gutsofpratik/Horizon-Models"
                target="_blank"
                rel="noreferrer"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-sans text-white transition-colors"
              >
                <span>View Full Hardware Catalog</span>
                <ArrowSlant className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
