import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  Code, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  ShieldAlert, 
  Table, 
  Eye, 
  FileCode, 
  Zap
} from 'lucide-react';

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'artifacts' | 'terminal' | 'models' | 'office'>('artifacts');
  const [artifactView, setArtifactView] = useState<'preview' | 'code'>('preview');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '[*] Horizon Core v0.3.3 initialized on local device.',
    '[*] Local provider connected: llama.cpp engine [Apple Silicon Metal backend].',
    '[*] Model mounted: Qwen3.5-9B-Instruct-Q4_K_M (Memory: 6.2GB VRAM mapped).',
    '[*] Ready for sovereign execution.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isSimulatingCommand, setIsSimulatingCommand] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'qwen9b' | 'bonsai27b' | 'coder30b'>('qwen9b');

  const runPresetCommand = (cmd: string, responseLines: string[]) => {
    if (isSimulatingCommand) return;
    setIsSimulatingCommand(true);
    setTerminalHistory(prev => [...prev, `$ ${cmd}`]);
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < responseLines.length) {
        const line = responseLines[currentIdx];
        setTerminalHistory(prev => [...prev, line]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsSimulatingCommand(false);
      }
    }, 180);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim() || isSimulatingCommand) return;
    const cmd = terminalInput.trim();
    setTerminalInput('');

    if (cmd === 'clear') {
      setTerminalHistory(['[*] Terminal screen cleared. Horizon local shell active.']);
      return;
    }

    if (cmd.startsWith('horizon skills')) {
      runPresetCommand(cmd, [
        '[skills] Querying local skills repository (3,203 indexed)...',
        '  → found: react-architecture (v1.2.0)',
        '  → found: local-lora-trainer (v2.0.4)',
        '  → found: office-doc-synthesizer (v0.9.1)',
        '[skills] Skill engine ready for dynamic injection.'
      ]);
    } else if (cmd.startsWith('horizon model')) {
      runPresetCommand(cmd, [
        '[model] Switching active local context...',
        '[model] Unloading idle weights... freed 4.1GB.',
        '[model] Loading weights into GPU compute buffers...',
        '[model] Verification OK: 58.4 tokens/sec average on current silicon.'
      ]);
    } else {
      runPresetCommand(cmd, [
        `[exec] Executing '${cmd}' in isolated sandbox...`,
        '[sandbox] Permission check: PASSED (read/write limited to workspace).',
        '[sandbox] Process exited with status code 0 (success).'
      ]);
    }
  };

  return (
    <section id="interactive-demo" className="py-20 relative bg-[#080808] border-y border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
            <Zap className="w-3 h-3 text-white" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono mb-4">
            EXPERIENCE THE HORIZON WORKSPACE
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-sans">
            Test the core workflows of Horizon right here: editable artifacts, autonomous terminal sandboxing, local model allocation, and live document compilation.
          </p>
        </div>

        {/* Mock Window Container */}
        <div className="rounded-xl border border-white/15 bg-neutral-950 shadow-2xl overflow-hidden font-mono">
          
          {/* Top Window Titlebar */}
          <div className="px-4 py-3 bg-[#0d0d0d] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">
            
            {/* Window controls & profile */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 hover:bg-red-500/80 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 hover:bg-yellow-500/80 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 hover:bg-emerald-500/80 transition-colors cursor-pointer" />
              </div>

              <div className="h-4 w-px bg-neutral-800 mx-1" />

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="font-semibold text-white">Horizon v0.3.3</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400">profile: pratik (local)</span>
              </div>
            </div>

            {/* Hardware badge in titlebar */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Cpu className="w-3 h-3 text-white" />
                <span>Qwen 3.5 9B Q4_K_M</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/50">
                ● 54.2 t/s Local
              </span>
            </div>
          </div>

          {/* Navigation Sub-bar / Mode Tabs */}
          <div className="px-4 py-2 bg-[#121212] border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('artifacts')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'artifacts'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Editable Artifacts</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Sandboxed Terminal</span>
              </button>

              <button
                onClick={() => setActiveTab('models')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'models'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Local Model Sizer</span>
              </button>

              <button
                onClick={() => setActiveTab('office')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'office'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Office & PDF Studio</span>
              </button>
            </div>

            <div className="text-[11px] text-neutral-400 hidden sm:block">
              Workspace: <span className="text-neutral-300">~/projects/horizons-lab</span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-4 sm:p-6 min-h-[420px] bg-[#070707]">

            {/* TAB 1: ARTIFACTS */}
            {activeTab === 'artifacts' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left side: Context prompt and artifacts list */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-white/10 text-xs">
                    <div className="text-neutral-400 mb-1 flex items-center justify-between">
                      <span>USER PROMPT</span>
                      <span className="text-[10px] text-neutral-400">14:02:18</span>
                    </div>
                    <p className="text-neutral-200 font-sans leading-relaxed">
                      "Synthesize an autonomous monitoring widget for our local GPU clusters with active VRAM allocation, throughput, and error boundaries."
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-900/40 border border-white/10 text-xs space-y-2">
                    <div className="text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                      Generated Artifacts in Session
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-white/15 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-white" />
                        <div>
                          <div className="text-white font-medium">ClusterMonitor.tsx</div>
                          <div className="text-[10px] text-neutral-400">React + Tailwind · Rev 3</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800">
                        Active
                      </span>
                    </div>

                    <div className="p-2 rounded bg-neutral-950/40 border border-white/5 flex items-center justify-between opacity-70">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-400" />
                        <div>
                          <div className="text-neutral-300 font-medium">hardware_spec.pdf</div>
                          <div className="text-[10px] text-neutral-400">Compiled PDF report · 42 KB</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/30 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-medium mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-white" />
                      <span>Permission Approval: Passed</span>
                    </div>
                    Live editable artifacts stay synchronized with your local workspace directory.
                  </div>
                </div>

                {/* Right side: Live Artifact Canvas */}
                <div className="lg:col-span-8 flex flex-col rounded-lg border border-white/10 bg-[#0c0c0c] overflow-hidden">
                  
                  {/* Artifact controls */}
                  <div className="px-4 py-2.5 bg-neutral-900/80 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-white font-semibold">ClusterMonitor.tsx</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-[11px] text-neutral-400">v0.3.3 Artifact Engine</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black p-0.5 rounded border border-white/10">
                      <button
                        onClick={() => setArtifactView('preview')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all ${
                          artifactView === 'preview' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Interactive Preview</span>
                      </button>
                      <button
                        onClick={() => setArtifactView('code')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all ${
                          artifactView === 'code' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Code className="w-3 h-3" />
                        <span>Source Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Artifact View Body */}
                  <div className="p-5 flex-1 min-h-[300px] flex flex-col justify-center">
                    {artifactView === 'preview' ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-neutral-950 border border-white/10">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                            <div>
                              <h4 className="text-white font-bold text-sm tracking-tight">SILICON ALLOCATION MATRIX</h4>
                              <p className="text-[11px] text-neutral-400 font-sans">Node 01 // Local Horizon Backend Daemon</p>
                            </div>
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Healthy
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="p-3 rounded bg-neutral-900/50 border border-white/5">
                              <span className="text-[10px] text-neutral-400 block mb-1">VRAM ALLOCATED</span>
                              <span className="text-base font-bold text-white">6.42 GB</span>
                              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-white h-full w-[40%]" />
                              </div>
                            </div>
                            <div className="p-3 rounded bg-neutral-900/50 border border-white/5">
                              <span className="text-[10px] text-neutral-400 block mb-1">INFERENCE SPEED</span>
                              <span className="text-base font-bold text-white">58.4 t/s</span>
                              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-white h-full w-[78%]" />
                              </div>
                            </div>
                            <div className="p-3 rounded bg-neutral-900/50 border border-white/5">
                              <span className="text-[10px] text-neutral-400 block mb-1">KV CACHE TOKENS</span>
                              <span className="text-base font-bold text-white">8,192 / 32k</span>
                              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-white h-full w-[25%]" />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-2 text-neutral-400 font-mono">
                            <span>Status: Ready for tool call injection</span>
                            <span className="text-white">llama.cpp + Metal</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-400">
                          <span>Artifact saved to: <code className="text-neutral-300">workspace/artifacts/ClusterMonitor.tsx</code></span>
                          <span className="text-emerald-400">● Live Reload Active</span>
                        </div>
                      </div>
                    ) : (
                      <pre className="text-xs text-neutral-300 overflow-x-auto p-3 bg-black rounded border border-white/5 leading-relaxed">
{`export const ClusterMonitor: React.FC = () => {
  const { vram, tokensPerSec, contextTokens } = useHorizonRuntime();
  
  return (
    <div className="p-4 bg-neutral-950 border border-white/10 rounded-lg">
      <h4 className="text-white font-mono font-bold">SILICON MATRIX</h4>
      <div className="grid grid-cols-3 gap-3">
        <Metric label="VRAM" value={\`\${vram.used} GB / \${vram.total} GB\`} />
        <Metric label="Throughput" value={\`\${tokensPerSec} t/s\`} />
        <Metric label="Context" value={\`\${contextTokens} / 32768\`} />
      </div>
    </div>
  );
};`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TERMINAL */}
            {activeTab === 'terminal' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <TerminalIcon className="w-4 h-4 text-white" />
                    <span>Horizon Sandboxed Shell (PowerShell / Zsh / Bash)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">Presets:</span>
                    <button
                      onClick={() => runPresetCommand('horizon model status', [
                        '[engine] Active model: Qwen3.5 9B Q4_K_M',
                        '[engine] GPU layer offload: 33/33 layers (100% on VRAM)',
                        '[engine] KV cache mode: FP16 · Memory footprint: 6.42 GB',
                        '[engine] Device throughput: 56.8 tokens/sec'
                      ])}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[11px] text-neutral-300 hover:text-white hover:border-white/30"
                    >
                      $ horizon model status
                    </button>
                    <button
                      onClick={() => runPresetCommand('horizon skills list --top', [
                        '[skills] Loaded catalog: 3,203 skills available.',
                        '  - react-architecture (v1.2.0) [Installed]',
                        '  - local-lora-trainer (v2.0.4) [Installed]',
                        '  - agent-swarm-orchestrator (v3.0.1) [Ready]',
                        '[skills] All skills audited for security provenance.'
                      ])}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[11px] text-neutral-300 hover:text-white hover:border-white/30"
                    >
                      $ horizon skills list
                    </button>
                    <button
                      onClick={() => runPresetCommand('horizon agent swarm --tasks 3', [
                        '[swarm] Spawning 3 autonomous subagents...',
                        '  → Agent #1 [Code Auditor]: inspecting ./src for memory leaks',
                        '  → Agent #2 [Doc Generator]: compiling Markdown reference',
                        '  → Agent #3 [Benchmark]: running 100-token prompt test',
                        '[swarm] Task execution complete. All changes logged to history.'
                      ])}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[11px] text-neutral-300 hover:text-white hover:border-white/30"
                    >
                      $ horizon agent swarm
                    </button>
                  </div>
                </div>

                {/* Shell Window */}
                <div className="p-4 rounded-lg bg-black border border-white/15 min-h-[300px] max-h-[360px] overflow-y-auto space-y-1.5 text-xs text-neutral-300">
                  {terminalHistory.map((line, idx) => (
                    <div
                      key={idx}
                      className={`${
                        line.startsWith('$')
                          ? 'text-white font-bold'
                          : line.includes('PASSED') || line.includes('OK') || line.includes('Healthy')
                          ? 'text-emerald-400'
                          : line.includes('Warning') || line.includes('Permission')
                          ? 'text-neutral-400'
                          : 'text-neutral-300'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  {isSimulatingCommand && (
                    <div className="text-neutral-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>

                {/* Terminal Input */}
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-xs">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type a command (e.g. 'horizon skills search', 'horizon model run', 'clear')..."
                      className="w-full pl-7 pr-4 py-2 bg-neutral-900 border border-white/10 rounded-md text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSimulatingCommand}
                    className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-md hover:bg-neutral-200 transition-all font-mono disabled:opacity-50"
                  >
                    Execute
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: MODELS */}
            {activeTab === 'models' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    onClick={() => setSelectedModel('qwen9b')}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedModel === 'qwen9b'
                        ? 'border-white bg-neutral-900 text-white'
                        : 'border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Qwen 3.5 9B</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white">Q4_K_M</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-3 font-sans">
                      Balanced everyday assistant with multimodal & coding capabilities.
                    </p>
                    <div className="text-xs font-mono space-y-1 text-neutral-300">
                      <div>VRAM: <strong className="text-white">6.5 GB</strong></div>
                      <div>Speed: <strong className="text-emerald-400">55-68 t/s</strong></div>
                      <div>Weights: <strong className="text-white">5.4 GB GGUF</strong></div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedModel('bonsai27b')}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedModel === 'bonsai27b'
                        ? 'border-white bg-neutral-900 text-white'
                        : 'border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Bonsai 2 27B</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white">PTQ1_0</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-3 font-sans">
                      Compact large reasoning model with high-density architectural planning.
                    </p>
                    <div className="text-xs font-mono space-y-1 text-neutral-300">
                      <div>VRAM: <strong className="text-white">14.0 GB</strong></div>
                      <div>Speed: <strong className="text-emerald-400">28-36 t/s</strong></div>
                      <div>Weights: <strong className="text-white">12.8 GB PTQ</strong></div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedModel('coder30b')}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedModel === 'coder30b'
                        ? 'border-white bg-neutral-900 text-white'
                        : 'border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Qwen 3 Coder 30B</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white">Instruct</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-3 font-sans">
                      Deep software engineering & multi-file refactoring engine.
                    </p>
                    <div className="text-xs font-mono space-y-1 text-neutral-300">
                      <div>VRAM: <strong className="text-white">18.5 GB</strong></div>
                      <div>Speed: <strong className="text-emerald-400">24-32 t/s</strong></div>
                      <div>Weights: <strong className="text-white">18.56 GB GGUF</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-white font-bold block mb-1">Local Hardware Compatibility Check</span>
                    <span className="text-neutral-400 font-sans">
                      Horizon checks GPU memory, CPU architecture, and driver capabilities before model mounting.
                    </span>
                  </div>
                  <a
                    href="https://github.com/gutsofpratik/Horizon-Models"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-neutral-200 transition-colors shrink-0"
                  >
                    View Horizon-Models Repo
                  </a>
                </div>
              </div>
            )}

            {/* TAB 4: OFFICE */}
            {activeTab === 'office' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-sm">Native Document & Sheet Synthesis</h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Horizon generates actual binary Office formats locally without requiring Microsoft Office or online converters:
                  </p>
                  
                  <ul className="space-y-2 text-xs text-neutral-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span><strong>Word (.docx)</strong>: Headers, styles, formatted tables, code snippets, and automated table of contents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span><strong>Excel (.xlsx)</strong>: Formula calculation chains (SUM, VLOOKUP, INDEX-MATCH), cell formatting, and native charts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span><strong>PDF Documents</strong>: Crisp vector typography, pagination, headers/footers, and print-ready margins.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-black border border-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="text-white font-mono">Q3_financial_projection.xlsx</span>
                    <span className="text-emerald-400 text-[11px]">Calculated 14 Formulas</span>
                  </div>
                  <div className="overflow-x-auto text-[11px] font-mono">
                    <table className="w-full text-left text-neutral-300">
                      <thead>
                        <tr className="border-b border-neutral-800 text-neutral-500">
                          <th className="py-1">Quarter</th>
                          <th className="py-1">Local Compute (GPU)</th>
                          <th className="py-1">API Cost Saved</th>
                          <th className="py-1">Formula</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900">
                        <tr>
                          <td className="py-1.5 text-white">Q1 2026</td>
                          <td className="py-1.5">$480.00</td>
                          <td className="py-1.5 text-emerald-400">$3,420.00</td>
                          <td className="py-1.5 text-neutral-400">=SUM(B2*7.125)</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 text-white">Q2 2026</td>
                          <td className="py-1.5">$520.00</td>
                          <td className="py-1.5 text-emerald-400">$4,850.00</td>
                          <td className="py-1.5 text-neutral-400">=SUM(B3*9.32)</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 text-white">Q3 2026</td>
                          <td className="py-1.5">$560.00</td>
                          <td className="py-1.5 text-emerald-400">$6,100.00</td>
                          <td className="py-1.5 text-neutral-400">=SUM(B4*10.89)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom status indicator bar */}
          <div className="px-4 py-2 bg-[#0c0c0c] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Horizon Engine Active
              </span>
              <span>·</span>
              <span>Sandbox: Strict isolation</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Token stream: 0ms latency</span>
              <span>Local storage: encrypted-profile</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
