import React from 'react';
import { X, Download, Laptop, Apple, Cpu, Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { HORIZON_RELEASES } from '../data/horizonData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 font-mono text-neutral-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>OFFICIAL PRODUCT RELEASE</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Get Horizon Workspace v0.3.3
          </h3>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Zero telemetry. Local model loading. Sandboxed terminal. Choose your OS:
          </p>
        </div>

        {/* Download Grid */}
        <div className="space-y-3 mb-6">
          {HORIZON_RELEASES.map((rel) => {
            const Icon = rel.os === 'windows' ? Laptop : rel.os === 'macos' ? Apple : rel.os === 'linux' ? Cpu : Layers;
            return (
              <div
                key={rel.os}
                className="p-4 rounded-xl border border-white/10 bg-neutral-900/60 hover:border-white/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{rel.platform}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-sans">
                      {rel.requirements}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={rel.installerUrl}
                    download
                    className="px-3.5 py-1.5 rounded-md bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{rel.installerType}</span>
                  </a>

                  <a
                    href={rel.archiveUrl}
                    download
                    className="px-2.5 py-1.5 rounded-md border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white text-xs transition-colors"
                    title={rel.archiveType}
                  >
                    ZIP
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checksum & GitHub note */}
        <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>SHA-256 Checksums available</span>
          </div>
          <a
            href="https://github.com/gutsofpratik/Horizon/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline flex items-center gap-1"
          >
            <span>View release assets on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
