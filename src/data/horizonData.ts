export interface ReleaseDownload {
  platform: string;
  os: 'windows' | 'macos' | 'linux' | 'source';
  installerType: string;
  installerUrl: string;
  installerName: string;
  archiveType: string;
  archiveUrl: string;
  archiveName: string;
  instructions: string;
  requirements: string;
}

export const HORIZON_RELEASES: ReleaseDownload[] = [
  {
    platform: 'Windows x64',
    os: 'windows',
    installerType: 'Setup Installer',
    installerUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-windows-x64-setup.exe',
    installerName: 'Horizon-0.3.3-windows-x64-setup.exe',
    archiveType: 'Portable ZIP',
    archiveUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-windows-x64-portable.zip',
    archiveName: 'Horizon-0.3.3-windows-x64-portable.zip',
    instructions: 'Run the installer for desktop shortcuts, or extract portable ZIP and launch Horizon.exe.',
    requirements: 'Windows 10/11 x64, WebView2 runtime (bundled), 8GB+ RAM'
  },
  {
    platform: 'macOS Apple Silicon',
    os: 'macos',
    installerType: 'DMG Disk Image',
    installerUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-macos-arm64.dmg',
    installerName: 'Horizon-0.3.3-macos-arm64.dmg',
    archiveType: 'Application ZIP',
    archiveUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-darwin-arm64.zip',
    archiveName: 'Horizon-0.3.3-darwin-arm64.zip',
    instructions: 'Mount DMG and drag Horizon into Applications. Requires Screen Recording & Accessibility for desktop actions.',
    requirements: 'macOS 14+ (Sonoma or Sequoia), Apple Silicon (M1/M2/M3/M4)'
  },
  {
    platform: 'Linux x64 (Ubuntu 24.04+)',
    os: 'linux',
    installerType: 'Debian Package (.deb)',
    installerUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-linux-x64.deb',
    installerName: 'Horizon-0.3.3-linux-x64.deb',
    archiveType: 'AppImage Standalone',
    archiveUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-linux-x64.AppImage',
    archiveName: 'Horizon-0.3.3-linux-x64.AppImage',
    instructions: 'Run `sudo apt install ./Horizon-*.deb` or `chmod +x Horizon-*.AppImage && ./Horizon-*.AppImage`.',
    requirements: 'Ubuntu 24.04 LTS / Debian 12 / Arch, X11 or Wayland with XWayland'
  },
  {
    platform: 'Source Snapshot',
    os: 'source',
    installerType: 'Source ZIP',
    installerUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-source.zip',
    installerName: 'Horizon-0.3.3-source.zip',
    archiveType: 'Source tar.gz',
    archiveUrl: 'https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/Horizon-0.3.3-source.tar.gz',
    archiveName: 'Horizon-0.3.3-source.tar.gz',
    instructions: 'Extract archive, install Node.js v20+ and Python 3.11+, run `npm install` and `npm run dev`.',
    requirements: 'Node.js 20+, C++ build tools (optional for local llama.cpp bindings)'
  }
];

export interface ModelRecommendation {
  name: string;
  size: string;
  quant: string;
  vram: string;
  tokensPerSec: string;
  bestFor: string;
  tradeoff: string;
  downloadSize: string;
  recommendedHardware: string;
}

export const CURATED_MODELS: ModelRecommendation[] = [
  {
    name: 'Qwen 3.5 9B',
    size: '9 Billion',
    quant: 'Q4_K_M',
    vram: '6.5 GB VRAM / 10 GB RAM',
    tokensPerSec: '52-68 t/s',
    bestFor: 'Everyday Assistant, General Coding, Multimodal',
    tradeoff: 'Fast inference, excellent reasoning with minimal memory footprint.',
    downloadSize: '5.4 GB',
    recommendedHardware: '8GB - 16GB RAM or 6GB GPU'
  },
  {
    name: 'Bonsai 2 27B',
    size: '27 Billion',
    quant: 'PTQ1_0 Low-Bit',
    vram: '14 GB VRAM / 20 GB RAM',
    tokensPerSec: '28-36 t/s',
    bestFor: 'Complex Deep Reasoning, Math, Architecture',
    tradeoff: 'High reasoning density in compact quantized weights; needs specialized runtime.',
    downloadSize: '12.8 GB',
    recommendedHardware: '16GB - 24GB Unified Memory or RTX 4080'
  },
  {
    name: 'Qwen 3 Coder 30B',
    size: '30 Billion A3B',
    quant: 'Instruct Q4_K_M',
    vram: '18.5 GB VRAM / 26 GB RAM',
    tokensPerSec: '24-32 t/s',
    bestFor: 'Large Codebases, Refactoring, Full Stack',
    tradeoff: 'High coding specialization; larger download weights, requires 18GB+ VRAM.',
    downloadSize: '18.56 GB',
    recommendedHardware: '24GB VRAM (RTX 3090/4090) or 32GB Mac'
  },
  {
    name: 'Qwen 3.5 4B',
    size: '4 Billion',
    quant: 'Q4_K_M',
    vram: '3.2 GB VRAM / 6 GB RAM',
    tokensPerSec: '85-110 t/s',
    bestFor: 'Ultra-light laptops, rapid background agent tasks',
    tradeoff: 'Extremely fast and lightweight; multi-hop tool chains require simpler prompts.',
    downloadSize: '2.6 GB',
    recommendedHardware: 'Entry-level laptop or 4GB GPU'
  },
  {
    name: 'gpt-oss 20B',
    size: '20 Billion',
    quant: 'Harmony Formatted',
    vram: '13 GB VRAM / 18 GB RAM',
    tokensPerSec: '34-45 t/s',
    bestFor: 'Text Reasoning, Harmony Protocol, Research Chains',
    tradeoff: 'Open-weights architecture with strict adherence to structured formats.',
    downloadSize: '11.2 GB',
    recommendedHardware: '16GB+ VRAM or 32GB Unified RAM'
  }
];

export interface SkillItem {
  id: string;
  name: string;
  category: 'Development' | 'Agents' | 'Data & ML' | 'Productivity' | 'Research';
  description: string;
  installCommand: string;
  stars: number;
  tags: string[];
}

export const SAMPLE_SKILLS: SkillItem[] = [
  {
    id: 'skill-react-architecture',
    name: 'react-architecture',
    category: 'Development',
    description: 'Enforces clean component boundaries, modular hooks, state hygiene, and performance audits.',
    installCommand: 'horizon skill install react-architecture',
    stars: 840,
    tags: ['react', 'typescript', 'architecture']
  },
  {
    id: 'skill-agent-swarm',
    name: 'agent-swarm-orchestrator',
    category: 'Agents',
    description: 'Coordinate multi-agent subtasks with shared scratchpads, approval steps, and auto-rollback.',
    installCommand: 'horizon skill install agent-swarm-orchestrator',
    stars: 1240,
    tags: ['agents', 'swarms', 'orchestration']
  },
  {
    id: 'skill-office-generator',
    name: 'office-doc-synthesizer',
    category: 'Productivity',
    description: 'Generate production-ready Word (.docx), Excel spreadsheets with verified formulas, and PowerPoint decks.',
    installCommand: 'horizon skill install office-doc-synthesizer',
    stars: 960,
    tags: ['office', 'excel', 'word', 'powerpoint']
  },
  {
    id: 'skill-docker-hardener',
    name: 'container-security-audit',
    category: 'Development',
    description: 'Scans Dockerfiles, builds rootless multi-stage containers, and eliminates unnecessary attack surfaces.',
    installCommand: 'horizon skill install container-security-audit',
    stars: 620,
    tags: ['docker', 'security', 'devops']
  },
  {
    id: 'skill-lora-tuning',
    name: 'local-lora-trainer',
    category: 'Data & ML',
    description: 'Prepare JSONL instruction pairs, calculate memory budget, and run unsloth/PEFT fine-tuning locally.',
    installCommand: 'horizon skill install local-lora-trainer',
    stars: 1100,
    tags: ['fine-tuning', 'lora', 'training']
  },
  {
    id: 'skill-browser-automation',
    name: 'headless-browser-pilot',
    category: 'Agents',
    description: 'Drive Chromium instances with session state persistence, cookie isolation, and selector resilience.',
    installCommand: 'horizon skill install headless-browser-pilot',
    stars: 780,
    tags: ['browser', 'scraping', 'automation']
  },
  {
    id: 'skill-arxiv-synthesizer',
    name: 'arxiv-literature-digest',
    category: 'Research',
    description: 'Queries arXiv, downloads preprints, extracts mathematical formulations, and prepares comparative matrices.',
    installCommand: 'horizon skill install arxiv-literature-digest',
    stars: 890,
    tags: ['research', 'arxiv', 'papers']
  },
  {
    id: 'skill-sql-optimizer',
    name: 'sql-query-profiler',
    category: 'Data & ML',
    description: 'Analyzes query execution plans, indexes, partition pruning, and detects anti-patterns.',
    installCommand: 'horizon skill install sql-query-profiler',
    stars: 540,
    tags: ['sql', 'database', 'optimization']
  }
];

export interface LabInitiative {
  title: string;
  tagline: string;
  category: 'Model Research' | 'Developer Tooling' | 'Autonomous Systems' | 'Open Source Community';
  status: 'Active Lab Experiment' | 'Production Deployed' | 'Public RFC';
  description: string;
  stats: string;
  githubUrl: string;
}

export const LAB_INITIATIVES: LabInitiative[] = [
  {
    title: 'Horizon Sovereign Workspace',
    tagline: 'The local-first AI operating environment',
    category: 'Autonomous Systems',
    status: 'Production Deployed',
    description: 'Full desktop workspace bundling model runtimes, terminal sandboxing, live editable artifacts, and computer use tools.',
    stats: 'v0.3.3 Published · Windows, macOS, Linux',
    githubUrl: 'https://github.com/gutsofpratik/Horizon'
  },
  {
    title: 'Horizon-Skills Registry',
    tagline: '3,203+ modular instructions for AI agents',
    category: 'Developer Tooling',
    status: 'Production Deployed',
    description: 'A global machine-readable catalog of packaged instructions, tool definitions, and verified prompt packages with license provenance.',
    stats: '3,203 Packages · MIT / Open Source',
    githubUrl: 'https://github.com/gutsofpratik/Horizon-Skills'
  },
  {
    title: 'Horizon-Models Hardware Catalog',
    tagline: 'Empirical local model guidance & benchmarks',
    category: 'Model Research',
    status: 'Production Deployed',
    description: 'Curated quantizations, VRAM memory sizing curves, and runtime compatibility matrix across Apple Silicon and Nvidia RTX.',
    stats: 'Verified Catalog · Zero Telemetry Benchmarks',
    githubUrl: 'https://github.com/gutsofpratik/Horizon-Models'
  },
  {
    title: 'Low-Bit Quantization & Cognitive Preservation',
    tagline: 'Crazy experiments in sub-4-bit weights',
    category: 'Model Research',
    status: 'Active Lab Experiment',
    description: 'Investigating novel post-training quantization schemes that preserve reasoning trace perplexity on consumer 8GB-16GB machines.',
    stats: 'Lab RFC #14 · Training Runs Ongoing',
    githubUrl: 'https://github.com/gutsofpratik'
  },
  {
    title: 'Zero-Copy Local IPC Engine',
    tagline: 'Ultra low latency model-to-tool pipe',
    category: 'Developer Tooling',
    status: 'Active Lab Experiment',
    description: 'C++ and Rust shared-memory primitives allowing instant passing of multi-gigabyte context and terminal buffers between agent processes.',
    stats: '< 1.2ms Transfer · Open RFC',
    githubUrl: 'https://github.com/gutsofpratik/Horizon'
  },
  {
    title: 'Open Source Community Contributions',
    tagline: 'Giving back to the hacker collective',
    category: 'Open Source Community',
    status: 'Production Deployed',
    description: 'Contributing upstream fixes to llama.cpp, modern web toolkits, and releasing open datasets for agent alignment.',
    stats: '100% Permissive · Community Driven',
    githubUrl: 'https://github.com/gutsofpratik'
  }
];
