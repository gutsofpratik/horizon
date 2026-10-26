import { useState } from 'react';
import { HorizonShaderCanvas } from './components/HorizonShaderCanvas';
import { Header } from './components/Header';
import { AestheticHero } from './components/AestheticHero';
import { WorkspaceShowcase } from './components/WorkspaceShowcase';
import { LabGrid } from './components/LabGrid';
import { EcosystemCards } from './components/EcosystemCards';
import { DownloadView } from './components/DownloadView';
import { MinimalFooter } from './components/MinimalFooter';
import { DownloadModal } from './components/DownloadModal';

export function App() {
  const [activePage, setActivePage] = useState<string>('horizon');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-[#ECECEC] font-sans selection:bg-white selection:text-black">
      {/* Living Ambient Horizon Shader Canvas in Background */}
      <HorizonShaderCanvas />

      {/* Floating Minimal Navigation */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Main Experience */}
      <main className="relative z-10">
        {/* Aesthetic Minimalist Hero */}
        <AestheticHero onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* The Flagship Showcase: Horizon Desktop */}
        <WorkspaceShowcase />

        {/* The Open Source AI Lab: What We Do */}
        <LabGrid />

        {/* The Ecosystem Trio: Horizon, Horizon-Skills, Horizon-Models */}
        <EcosystemCards />

        {/* Minimalist Download View v0.3.3 */}
        <DownloadView />
      </main>

      {/* Minimal Editorial Footer */}
      <MinimalFooter />

      {/* Clean OS Download Dialog */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
