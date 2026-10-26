import React, { useState } from 'react';
import { Cpu, ExternalLink } from 'lucide-react';
import { CURATED_MODELS } from '../data/horizonData';

export const HardwareCalculator: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      label: '8 GB Memory',
      hardware: 'Entry-level Mac / 4-6GB GPU Laptop',
      model: CURATED_MODELS[3], // Qwen 3.5 4B
      recommendation: 'Perfect for fast background coding, rapid agent checks, and basic tool calls with 4B parameters.',
      ctxWindow: '16,384 tokens'
    },
    {
      id: 1,
      label: '16 GB Memory',
      hardware: 'MacBook Air/Pro 16GB / RTX 4060/4070',
      model: CURATED_MODELS[0], // Qwen 3.5 9B
      recommendation: 'The sweet spot for everyday reasoning, multimodal vision, coding, and artifact synthesis at 55+ t/s.',
      ctxWindow: '32,768 tokens'
    },
    {
      id: 2,
      label: '24 GB VRAM',
      hardware: 'Nvidia RTX 3090 / 4090 or 32GB Mac',
      model: CURATED_MODELS[2], // Qwen 3 Coder 30B
      recommendation: 'Full-stack software engineering beast. Capable of deep multi-file refactoring and AST manipulation.',
      ctxWindow: '32,768 tokens'
    },
    {
      id: 3,
      label: '36-64 GB Unified',
      hardware: 'Apple Silicon M2/M3/M4 Max',
      model: CURATED_MODELS[1], // Bonsai 2 27B / Coder
      recommendation: 'Compact large reasoning models with complex math, architecture planning, and long-horizon tasks.',
      ctxWindow: '65,536 tokens'
    },
    {
      id: 4,
      label: '128 GB+ Workstation',
      hardware: 'Dual RTX 4090 / Mac Studio Ultra',
      model: CURATED_MODELS[4], // gpt-oss 20B / 70B+ FP16
      recommendation: 'Unrestricted research lab setup. Run unquantized 70B+ models and multi-agent swarm loops locally.',
      ctxWindow: '131,072 tokens'
    }
  ];

  const current = tiers[selectedTier];

  return (
    <section id="models" className="py-24 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
              <Cpu className="w-3.5 h-3.5 text-white" />
              <span>HORIZON-MODELS REPOSITORY COMPANION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-mono tracking-tight">
              HARDWARE SIZING & MODEL MATCHER
            </h2>
          </div>
          <a
            href="https://github.com/gutsofpratik/Horizon-Models"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white underline underline-offset-4"
          >
            <span>View full machine-readable catalog.json</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tier Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-10 font-mono text-xs">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedTier === tier.id
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)] font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="text-xs">{tier.label}</div>
              <div className={`text-[10px] truncate mt-1 ${selectedTier === tier.id ? 'text-neutral-700' : 'text-neutral-500'}`}>
                {tier.model.name}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Tier Breakdown Box */}
        <div className="rounded-xl border border-white/15 bg-neutral-950 p-6 sm:p-8 font-mono">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Model & Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-wider text-neutral-400">Recommended Model</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px] font-bold">
                    {current.model.quant}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {current.model.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Target: {current.hardware}
                </p>
              </div>

              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {current.recommendation}
              </p>

              {/* Metric grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-900">
                <div className="p-3 rounded bg-neutral-900/60 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block mb-1">DOWNLOAD SIZE</span>
                  <span className="text-sm font-bold text-white">{current.model.downloadSize}</span>
                </div>
                <div className="p-3 rounded bg-neutral-900/60 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block mb-1">VRAM / RAM</span>
                  <span className="text-sm font-bold text-white">{current.model.vram}</span>
                </div>
                <div className="p-3 rounded bg-neutral-900/60 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block mb-1">SPEED</span>
                  <span className="text-sm font-bold text-emerald-400">{current.model.tokensPerSec}</span>
                </div>
                <div className="p-3 rounded bg-neutral-900/60 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block mb-1">CONTEXT WINDOW</span>
                  <span className="text-sm font-bold text-white">{current.ctxWindow}</span>
                </div>
              </div>
            </div>

            {/* Right: Horizon Integration Box */}
            <div className="lg:col-span-5 p-6 rounded-lg bg-black border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold text-white">HORIZON ENGINE MAPPING</span>
                <span className="text-[10px] text-emerald-400">Verified locally</span>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Execution Backend:</span>
                  <span className="text-white">llama.cpp GGUF loader</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Acceleration:</span>
                  <span className="text-white">Apple Metal / CUDA 12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Offline Usability:</span>
                  <span className="text-white">100% (No Internet needed)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Fallback Provider:</span>
                  <span className="text-white">OpenRouter / Anthropic API</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800">
                <div className="p-2.5 rounded bg-neutral-900/80 border border-white/5 text-[11px] text-neutral-400 leading-snug">
                  <span className="text-white font-medium">Empirical Note:</span> {current.model.tradeoff}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
