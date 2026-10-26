import React, { useState } from 'react';
import { DownloadIcon } from './CustomIcons';
import { HORIZON_RELEASES } from '../data/horizonData';

export const DownloadView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyVerify = () => {
    navigator.clipboard.writeText('curl -sL https://github.com/gutsofpratik/Horizon/releases/download/v0.3.3/SHA256SUMS.txt | sha256sum -c');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="downloads" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-sans text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>OFFICIAL PRODUCT RELEASES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              DOWNLOAD HORIZON v0.3.3
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            Native, unsigned binary packages. No mandatory sign-in, no telemetry, no cloud subscriptions.
          </p>
        </div>

        {/* 4 Clean Download Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {HORIZON_RELEASES.map((rel) => (
            <div
              key={rel.os}
              className="sheen-card rounded-2xl p-6 flex flex-col justify-between hover:border-white/30 transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-neutral-400 block mb-2">
                  {rel.platform}
                </span>
                <h3 className="text-lg font-display font-medium text-white mb-2">
                  {rel.os === 'windows' ? 'Windows' : rel.os === 'macos' ? 'macOS' : rel.os === 'linux' ? 'Linux' : 'Source Code'}
                </h3>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed mb-6">
                  {rel.requirements}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                <a
                  href={rel.installerUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-sans font-semibold text-black bg-white hover:bg-neutral-200 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-black" />
                  <span>{rel.installerType}</span>
                </a>

                <a
                  href={rel.archiveUrl}
                  download
                  className="w-full inline-flex items-center justify-center py-2 text-xs font-sans text-neutral-400 hover:text-white rounded-xl transition-colors border border-white/[0.06] hover:border-white/20 bg-white/[0.02]"
                >
                  <span>{rel.archiveType}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal SHA Verification bar */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SHA-256 Checksums available for all published release assets.</span>
          </div>

          <button
            onClick={copyVerify}
            className="text-white hover:underline underline-offset-4 transition-colors"
          >
            {copied ? 'Copied checksum command' : 'Copy verification command'}
          </button>
        </div>

      </div>
    </section>
  );
};
