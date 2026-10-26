import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { EcosystemTrio } from './components/EcosystemTrio';
import { ProductFeatures } from './components/ProductFeatures';
import { HardwareCalculator } from './components/HardwareCalculator';
import { SkillsExplorer } from './components/SkillsExplorer';
import { TheLabSection } from './components/TheLabSection';
import { LabManifesto } from './components/LabManifesto';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

export function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f4] font-sans selection:bg-white selection:text-black">
      {/* Sticky Top Navigation */}
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Hero Banner with Announcement & Clone Snippet */}
        <Hero onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* Live Interactive Workspace Simulator (Artifacts, Terminal, Sizer, Office) */}
        <InteractiveShowcase />

        {/* The 3 Core Pillars: Horizon Workspace, Horizon-Skills, Horizon-Models */}
        <EcosystemTrio />

        {/* Deep Dive into Horizon Architectural Features */}
        <ProductFeatures />

        {/* Interactive Hardware Sizing & Model Matcher (Horizon-Models companion) */}
        <HardwareCalculator />

        {/* Searchable 3,203+ Agent Skills Explorer (Horizon-Skills companion) */}
        <SkillsExplorer />

        {/* The Open Source AI Lab: Model training, developer tools, native apps */}
        <TheLabSection />

        {/* The 4 Principles of Horizons Lab */}
        <LabManifesto />

        {/* Comprehensive Download Center v0.3.3 */}
        <DownloadSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Modal for Instant OS Download Selection */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
