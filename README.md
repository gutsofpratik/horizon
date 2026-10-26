# Horizons Lab — Official Landing Page

> **Sovereign Intelligence. Unrestricted Creation.**  
> The official, high-performance, black-and-white minimalist landing page for **Horizons Lab** and its flagship product **Horizon** (v0.3.3).

---

## 🏛️ About Horizons Lab

**Horizons Lab** is an open-source AI research and engineering collective. We build local-first desktop operating environments, experiment with extreme low-bit post-training quantization (PTQ) and model fine-tuning, develop zero-copy systems tools, and contribute permissive tooling back to the open source community.

### The Horizon Ecosystem
* **[Horizon](https://github.com/gutsofpratik/Horizon)**: A local-first AI workspace for creating files, editing artifacts, running shell commands, and orchestrating models directly on your hardware.
* **[Horizon-Skills](https://github.com/gutsofpratik/Horizon-Skills)**: A public registry of **3,203+ packaged AI skills**, agent workflows, and verified developer prompts.
* **[Horizon-Models](https://github.com/gutsofpratik/Horizon-Models)**: Empirical hardware guidance, model recommendations, and memory sizing catalogs for consumer GPUs and Apple Silicon.

---

## 🎨 Aesthetics & Design Philosophy

* **Ultra-Clean Monochrome / Black & White**: Pure deep blacks (`#050505`), crisp whites (`#ffffff`), hairline borders (`rgba(255,255,255,0.1)`), and subtle dot-matrix patterns.
* **Brutalist Yet Refined Typography**: Dual-font design pairing `Inter` (geometric readability) with `Geist Mono` (code, terminals, metrics, and parameters).
* **Live Interactive Simulations**: Instead of static screenshots, visitors can interact with a live simulated Horizon desktop:
  1. **Editable Artifacts Engine**: Side-by-side preview and source code views with live state reflection.
  2. **Sandboxed Shell**: Terminal emulator with interactive preset commands (`horizon model status`, `horizon skills list`, `horizon agent swarm`) and command input.
  3. **Local Model Engine**: Interactive VRAM and throughput inspecter for Qwen 3.5 9B, Bonsai 2 27B, and Qwen 3 Coder 30B.
  4. **Office & PDF Studio**: Live document synthesizer preview for `.docx`, `.xlsx` (with calculated formula chains), and PDFs.
* **Interactive Hardware Sizer**: Visitors select their RAM/VRAM (8GB, 16GB, 24GB, 32GB-64GB, 128GB+) to instantly discover their ideal local model and expected tokens/second.
* **Searchable Skills Registry**: Real-time filtering across the 3,203+ skills catalog with 1-click install command copier.
* **Download Center v0.3.3**: Direct release links for Windows (Setup & Portable), macOS (Apple Silicon DMG & ZIP), Linux (Ubuntu 24.04 DEB & AppImage), and Source Code snapshots with SHA-256 verification.

---

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js** v20+ 
* **npm** v10+

### 2. Development Server
Clone or enter the directory, install dependencies, and launch Vite:

```bash
git clone https://github.com/gutsofpratik/Horizon.git
cd horizon
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Production Build
Build the optimized static bundle:

```bash
npm run build
```

The production assets will be output to `./dist`. You can preview the production build locally with:

```bash
npm run preview
```

---

## 📦 Project Structure

```
horizon/
├── dist/                      # Production build assets
├── src/
│   ├── assets/                # Logos and vectors
│   ├── components/
│   │   ├── DownloadModal.tsx  # Quick OS download selector modal
│   │   ├── DownloadSection.tsx# Full v0.3.3 installer & SHA-256 matrix
│   │   ├── EcosystemTrio.tsx  # Horizon, Horizon-Skills, Horizon-Models showcase
│   │   ├── Footer.tsx         # Comprehensive lab footer & dispatch signup
│   │   ├── HardwareCalculator.tsx # Interactive RAM/VRAM model matcher
│   │   ├── Hero.tsx           # Monochrome hero with clone snippet & metrics
│   │   ├── Icons.tsx          # SVG icons (GitHub, brand marks)
│   │   ├── InteractiveShowcase.tsx # Live simulated Horizon workspace
│   │   ├── LabManifesto.tsx   # 4 core open-source principles
│   │   ├── Navbar.tsx         # Sticky header with logo and navigation
│   │   ├── ProductFeatures.tsx# 6 architectural pillars of Horizon
│   │   ├── SkillsExplorer.tsx # Searchable 3,203+ skills registry
│   │   └── TheLabSection.tsx  # Experimental research & crazy projects
│   ├── data/
│   │   └── horizonData.ts     # Release binaries, model specs, skills data
│   ├── App.tsx                # Master page layout
│   ├── index.css              # Tailwind v4 setup & monochrome variables
│   └── main.tsx               # React 19 entrypoint
├── index.html                 # Document metadata & Google Fonts
├── vite.config.ts             # Vite + React + Tailwind CSS v4 plugin
└── package.json
```

---

## 📜 Upstream Repositories & Links

* **Product Repository**: [https://github.com/gutsofpratik/Horizon](https://github.com/gutsofpratik/Horizon)
* **Skills Catalog**: [https://github.com/gutsofpratik/Horizon-Skills](https://github.com/gutsofpratik/Horizon-Skills)
* **Models Catalog**: [https://github.com/gutsofpratik/Horizon-Models](https://github.com/gutsofpratik/Horizon-Models)
* **Organization / Developer**: [https://github.com/gutsofpratik](https://github.com/gutsofpratik)

---

## ⚖️ License

Distributed under the **MIT License**. Built with pride by the **Horizons Lab** collective.
