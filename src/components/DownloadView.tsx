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
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 block mb-2">
              Official Builds
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              GET HORIZON v0.3.3
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-400 font-sans font-light leading-relaxed">
            Native, unsigned binary packages. No mandatory sign-in, no telemetry, no subscription lock-in.
          </p>
        </div>

        {/* 4 Clean Download Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {HORIZON_RELEASES.map((rel) => (
            <div
              key={rel.os}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-neutral-400 block mb-2">
                  {rel.platform}
                </span>
                <h3 className="text-lg font-display font-medium text-white mb-2">
                  {rel.os === 'windows' ? 'Windows' : rel.os === 'macos' ? 'macOS' : rel.os === 'linux' ? 'Linux' : 'Source'}
                </h3>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed mb-6">
                  {rel.requirements}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                <a
                  href={rel.installerUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-sans font-medium text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-black" />
                  <span>{rel.installerType}</span>
                </a>

                <a
                  href={rel.archiveUrl}
                  download
                  className="w-full inline-flex items-center justify-center py-1.5 text-[11px] font-sans text-neutral-400 hover:text-white rounded-full transition-colors"
                >
                  <span>{rel.archiveType}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal SHA Verification bar */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
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
