import { useState } from 'react';
import { HorizonShaderCanvas } from './components/HorizonShaderCanvas';
import { Header } from './components/Header';
import { AestheticHero } from './components/AestheticHero';
import { ProductShowcase } from './components/ProductShowcase';
import { LabGrid } from './components/LabGrid';
import { InteractiveHardwareSizer } from './components/InteractiveHardwareSizer';
import { EcosystemCards } from './components/EcosystemCards';
import { DownloadView } from './components/DownloadView';
import { MinimalFooter } from './components/MinimalFooter';
import { DownloadModal } from './components/DownloadModal';

export function App() {
  const [activePage, setActivePage] = useState<string>('horizon');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#ECECEC] font-sans selection:bg-white selection:text-black">
      {/* Living Interactive Ambient Canvas Shader */}
      <HorizonShaderCanvas />

      {/* Floating Minimal Glass Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Main Experience */}
      <main className="relative z-10">
        {/* Dynamic Metallic Hero */}
        <AestheticHero onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* Real Horizon Workspace Showcase with actual screenshots */}
        <ProductShowcase onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* The Open Source AI Lab: What We Do (Model training, tools, apps) */}
        <LabGrid />

        {/* Interactive Hardware Sizer & Model Matcher */}
        <InteractiveHardwareSizer />

        {/* The 3 Core Repositories of the Ecosystem */}
        <EcosystemCards />

        {/* Official Release Matrix v0.3.3 */}
        <DownloadView />
      </main>

      {/* Minimalist Editorial Footer */}
      <MinimalFooter />

      {/* Instant OS Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
