import React from 'react';
import { DownloadIcon, HorizonLogo } from './CustomIcons';
import { HORIZON_RELEASES } from '../data/horizonData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-[#090909] border border-white/15 rounded-3xl p-8 font-sans text-neutral-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center text-white">
            <HorizonLogo className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-display font-medium text-white tracking-tight">
              Horizon Desktop v0.3.3
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              Choose your operating system binary package.
            </p>
          </div>
        </div>

        {/* Binary Choices */}
        <div className="space-y-3 mb-8">
          {HORIZON_RELEASES.map((rel) => (
            <div
              key={rel.os}
              className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-sm font-medium text-white">
                  {rel.platform}
                </div>
                <div className="text-xs text-neutral-400 font-light mt-0.5">
                  {rel.requirements}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={rel.installerUrl}
                  download
                  className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center gap-1.5"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-black" />
                  <span>{rel.installerType}</span>
                </a>

                <a
                  href={rel.archiveUrl}
                  download
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  ZIP
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer Note */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <span>Unsigned packages · MIT Licensed</span>
          <a
            href="https://github.com/gutsofpratik/Horizon/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline underline-offset-4"
          >
            All GitHub Assets →
          </a>
        </div>

      </div>
    </div>
  );
};
