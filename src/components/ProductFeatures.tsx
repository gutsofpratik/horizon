import React from 'react';
import { 
  Cpu, 
  Terminal, 
  FileSpreadsheet, 
  Layers, 
  Workflow, 
  MousePointer2, 
  Sparkles
} from 'lucide-react';

export const ProductFeatures: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Local-First Model Loading',
      badge: 'llama.cpp Core',
      description: 'Run state-of-the-art open-weights models (Qwen 3.5, Bonsai 2, Qwen Coder, gpt-oss) locally on Apple Silicon Metal or Nvidia CUDA. Connect cloud providers only when you choose.'
    },
    {
      icon: Layers,
      title: 'Editable Artifacts Engine',
      badge: 'Live Split-View',
      description: 'Work stays visible. Code, diagrams, markdown, and web components render in real time with side-by-side preview and source code views, complete with version history.'
    },
    {
      icon: Terminal,
      title: 'Real Sandboxed Terminal',
      badge: 'Granular Approvals',
      description: 'Execute actual shell commands within your workspace directory. An explicit permission selector ensures you approve shell execution, file mutations, and network requests.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Binary Office & PDF Synthesis',
      badge: 'Zero Cloud Converters',
      description: 'Generate real Word (.docx), Excel spreadsheets (.xlsx with calculated formulas and native charts), PowerPoint slides (.pptx), and formatted vector PDFs entirely on your machine.'
    },
    {
      icon: MousePointer2,
      title: 'Computer Tools & Interaction',
      badge: 'OS Level Access',
      description: 'Interact with desktop windows, capture screenshots, and automate web browsers with isolated cookies and sessions on Windows, macOS, and supported Linux environments.'
    },
    {
      icon: Workflow,
      title: 'Multi-Agent Teams & Automations',
      badge: 'Autonomous Swarms',
      description: 'Delegate complex research and engineering workflows to teams of specialized subagents working concurrently in shared scratchpads with scheduled recurring cron triggers.'
    }
  ];

  return (
    <section id="product" className="py-24 relative bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>HORIZON CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-mono tracking-tight mb-4">
            ENGINEERED FOR WORK. NOT JUST CHAT.
          </h2>
          <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed">
            Unlike web chat wrappers that lock your files in someone else's cloud, Horizon gives your AI models hands, a real terminal, file-creation capabilities, and raw silicon access.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl border border-white/10 bg-neutral-950 hover:border-white/30 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-mono mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-neutral-400 text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <span>Architecture node 0{idx + 1}</span>
                  <span className="ml-auto">● Active</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
