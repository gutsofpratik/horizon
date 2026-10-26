import React, { useState } from 'react';
import { Download, Check, ShieldCheck, Copy, Laptop, Apple, Layers, Cpu } from 'lucide-react';
import { HORIZON_RELEASES } from '../data/horizonData';

export const DownloadSection: React.FC = () => {
  const [selectedOs, setSelectedOs] = useState<'windows' | 'macos' | 'linux' | 'source'>('windows');
  const [copiedSha, setCopiedSha] = useState(false);

  const activeRelease = HORIZON_RELEASES.find(r => r.os === selectedOs) || HORIZON_RELEASES[0];

  const copyShaCommand = () => {
    navigator.clipboard.writeText('curl -sL https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/SHA256SUMS.txt | sha256sum -c');
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <section id="download" className="py-24 relative bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
            <Download className="w-3.5 h-3.5 text-white" />
            <span>OFFICIAL RELEASES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight mb-4">
            DOWNLOAD HORIZON v0.3.3
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
            Choose the native binary package for your operating system. Packaged without telemetry, DRM, or forced account registration.
          </p>
        </div>

        {/* OS Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-neutral-950 border border-white/10 font-mono text-xs">
            <button
              onClick={() => setSelectedOs('windows')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                selectedOs === 'windows'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Windows x64</span>
            </button>
            <button
              onClick={() => setSelectedOs('macos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                selectedOs === 'macos'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>macOS Apple Silicon</span>
            </button>
            <button
              onClick={() => setSelectedOs('linux')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                selectedOs === 'linux'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Linux x64</span>
            </button>
            <button
              onClick={() => setSelectedOs('source')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                selectedOs === 'source'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Source Snapshot</span>
            </button>
          </div>
        </div>

        {/* Download Card Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-neutral-950 p-6 sm:p-10 font-mono">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-neutral-900 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <span>TARGET ARCHITECTURE:</span>
                <span className="text-white font-bold">{activeRelease.platform}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Horizon Release 0.3.3
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Requirements: {activeRelease.requirements}
              </p>
            </div>

            {/* Direct download primary button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={activeRelease.installerUrl}
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{activeRelease.installerType}</span>
              </a>

              <a
                href={activeRelease.archiveUrl}
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-white/20 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-all"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>{activeRelease.archiveType}</span>
              </a>
            </div>
          </div>

          {/* Installation Details */}
          <div className="py-6 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Installation & First Run
            </h4>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              {activeRelease.instructions}
            </p>

            {/* Release Asset Filenames */}
            <div className="p-3.5 rounded-lg bg-black border border-white/10 text-xs space-y-1.5 text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Primary Binary:</span>
                <a href={activeRelease.installerUrl} className="text-white hover:underline truncate max-w-xs sm:max-w-none">
                  {activeRelease.installerName}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Standalone Archive:</span>
                <a href={activeRelease.archiveUrl} className="text-neutral-300 hover:underline truncate max-w-xs sm:max-w-none">
                  {activeRelease.archiveName}
                </a>
              </div>
            </div>
          </div>

          {/* Checksum verification command */}
          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Verify SHA-256 Checksums:</span>
              <a
                href="https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/SHA256SUMS.txt"
                target="_blank"
                rel="noreferrer"
                className="text-white underline underline-offset-2"
              >
                SHA256SUMS.txt
              </a>
            </div>

            <button
              onClick={copyShaCommand}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSha ? 'Copied check command' : 'Copy verification command'}</span>
            </button>
          </div>

        </div>

        {/* GitHub Releases footer note */}
        <div className="text-center mt-12 text-xs font-mono text-neutral-400">
          Looking for older builds or git tags?{' '}
          <a
            href="https://github.com/gutsofpratik/Horizon/releases"
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4"
          >
            Browse all GitHub Releases
          </a>
        </div>

      </div>
    </section>
  );
};
