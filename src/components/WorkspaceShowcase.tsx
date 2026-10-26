import React, { useState } from 'react';
import { ArtifactIcon, TerminalIcon, ModelIcon } from './CustomIcons';

export const WorkspaceShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'artifacts' | 'terminal' | 'models'>('artifacts');
  const [previewMode, setPreviewMode] = useState<'preview' | 'code'>('preview');
  const [activeChip, setActiveChip] = useState<string>('bench');
  const [streamingOutput, setStreamingOutput] = useState<string>('Local Apple Metal acceleration active · 58.4 tokens/sec on Qwen 3.5 9B.');

  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    if (chip === 'bench') {
      setStreamingOutput('Local Apple Metal acceleration active · 58.4 tokens/sec on Qwen 3.5 9B.');
    } else if (chip === 'skills') {
      setStreamingOutput('Indexed 3,203 local skills · All verified with source provenance.');
    } else {
      setStreamingOutput('Sandbox integrity verified · Shell execution gated to workspace root.');
    }
  };

  return (
    <section id="horizon" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 block mb-2">
            The Sovereign AI Workspace
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight mb-4">
            HORIZON IN ACTION
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans font-light">
            An offline-capable environment for creating files, editing artifacts, and running local models on your silicon.
          </p>
        </div>

        {/* Minimal Glass Mockup Container */}
        <div className="rounded-2xl border border-white/10 bg-[#090909]/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500">
          
          {/* Minimal Window Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="text-xs text-neutral-400 font-sans ml-3">Horizon Workspace // Local Session</span>
            </div>

            {/* Tab Pill Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <button
                onClick={() => setActiveTab('artifacts')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  activeTab === 'artifacts'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ArtifactIcon className="w-3.5 h-3.5" />
                <span>Artifacts</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  activeTab === 'terminal'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Sandbox</span>
              </button>

              <button
                onClick={() => setActiveTab('models')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  activeTab === 'models'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ModelIcon className="w-3.5 h-3.5" />
                <span>Models</span>
              </button>
            </div>
          </div>

          {/* Window Canvas Body */}
          <div className="p-6 sm:p-10 min-h-[380px] flex flex-col justify-center">

            {/* TAB 1: ARTIFACTS */}
            {activeTab === 'artifacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white font-medium">NeuralVisualizer.tsx</span>
                    <span className="text-[11px] text-neutral-400 font-sans">· Living Editable Component</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewMode('preview')}
                      className={`px-3 py-0.5 rounded-full text-[11px] font-sans transition-all ${
                        previewMode === 'preview'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setPreviewMode('code')}
                      className={`px-3 py-0.5 rounded-full text-[11px] font-sans transition-all ${
                        previewMode === 'code'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Source
                    </button>
                  </div>
                </div>

                {previewMode === 'preview' ? (
                  <div className="p-6 rounded-xl border border-white/[0.06] bg-black/60 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-display font-medium text-white">AUTONOMOUS SILICON MATRIX</div>
                        <div className="text-xs text-neutral-400 font-sans mt-0.5">Real-time local GPU load allocation</div>
                      </div>
                      <span className="text-[11px] text-white px-2.5 py-1 rounded-full border border-white/20 bg-white/[0.04]">
                        ● 58.4 t/s
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                      <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                        <span className="text-neutral-400 block mb-1">VRAM ALLOCATED</span>
                        <span className="text-lg font-medium text-white">6.42 GB</span>
                        <div className="w-full bg-neutral-900 h-1 rounded-full mt-3 overflow-hidden">
                          <div className="bg-white h-full w-[40%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                        <span className="text-neutral-400 block mb-1">THROUGHPUT</span>
                        <span className="text-lg font-medium text-white">58.4 t/s</span>
                        <div className="w-full bg-neutral-900 h-1 rounded-full mt-3 overflow-hidden">
                          <div className="bg-white h-full w-[75%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                        <span className="text-neutral-400 block mb-1">KV CONTEXT</span>
                        <span className="text-lg font-medium text-white">32,768</span>
                        <div className="w-full bg-neutral-900 h-1 rounded-full mt-3 overflow-hidden">
                          <div className="bg-white h-full w-[25%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="p-5 rounded-xl border border-white/[0.06] bg-black text-xs font-mono text-neutral-300 leading-relaxed overflow-x-auto">
{`// Horizon Living Artifact
export const SiliconMatrix = () => {
  const { vram, throughput } = useHorizonRuntime();
  return <ClusterMonitor vram={vram} speed={throughput} />;
};`}
                  </pre>
                )}
              </div>
            )}

            {/* TAB 2: TERMINAL */}
            {activeTab === 'terminal' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-white font-medium">Sandboxed Terminal Execution</span>
                  <span className="text-[11px] text-neutral-400 font-sans">Zero Cloud Telemetry</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-sans">
                  <button
                    onClick={() => handleChipClick('bench')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeChip === 'bench'
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:text-white'
                    }`}
                  >
                    $ horizon benchmark
                  </button>
                  <button
                    onClick={() => handleChipClick('skills')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeChip === 'skills'
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:text-white'
                    }`}
                  >
                    $ horizon skills sync
                  </button>
                  <button
                    onClick={() => handleChipClick('audit')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeChip === 'audit'
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:text-white'
                    }`}
                  >
                    $ horizon sandbox audit
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-white/[0.06] bg-black font-mono text-xs text-neutral-300 space-y-2">
                  <div className="text-white flex items-center gap-2">
                    <span className="text-neutral-500">$</span>
                    <span>horizon {activeChip === 'bench' ? 'benchmark' : activeChip === 'skills' ? 'skills sync' : 'sandbox audit'}</span>
                  </div>
                  <div className="text-neutral-400 pl-4 border-l border-neutral-800">
                    {streamingOutput}
                  </div>
                  <div className="text-neutral-400 text-[11px] pt-1">
                    Process completed with exit code 0.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MODELS */}
            {activeTab === 'models' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-white font-medium">Local Model Loading</span>
                  <span className="text-[11px] text-neutral-400 font-sans">llama.cpp Engine</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
                  <div className="p-4 rounded-xl border border-white/20 bg-white/[0.04] text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">Qwen 3.5 9B</span>
                      <span className="text-[10px] text-neutral-400">Q4_K_M</span>
                    </div>
                    <div className="text-neutral-400 text-xs mb-3">6.5 GB VRAM · 58 t/s</div>
                    <div className="text-[11px] text-neutral-300">Everyday chat, reasoning & code.</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.01] text-neutral-400 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-white">Bonsai 2 27B</span>
                      <span className="text-[10px] text-neutral-400">PTQ1_0</span>
                    </div>
                    <div className="text-neutral-400 text-xs mb-3">14 GB VRAM · 32 t/s</div>
                    <div className="text-[11px] text-neutral-300">Deep math & system architecture.</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.01] text-neutral-400 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-white">Coder 30B</span>
                      <span className="text-[10px] text-neutral-400">Instruct</span>
                    </div>
                    <div className="text-neutral-400 text-xs mb-3">18.5 GB VRAM · 28 t/s</div>
                    <div className="text-[11px] text-neutral-300">Multi-file codebase refactoring.</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom subtle status bar */}
          <div className="px-5 py-3 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[11px] font-sans text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Horizon Core v0.3.3
            </span>
            <span className="hidden sm:inline">Offline Sovereign Mode</span>
          </div>

        </div>

      </div>
    </section>
  );
};
