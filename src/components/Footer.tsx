import React, { useState } from 'react';
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-neutral-400 font-mono text-xs border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-base">
                <span>H</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                HORIZONS LAB
              </span>
              <a
                href="https://github.com/gutsofpratik/Horizon"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-white transition-colors ml-1"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

            <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-sm">
              An open-source AI laboratory dedicated to sovereign, local-first intelligence. We build desktop workspaces, research low-bit models, and create high-performance developer tools.
            </p>

            {/* Newsletter Dispatch */}
            <div className="pt-2">
              <span className="text-neutral-300 font-bold block mb-2">LAB DISPATCH // RESEARCH UPDATES</span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@domain.com"
                  className="w-full px-3 py-2 bg-neutral-950 border border-white/10 rounded-l-md text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black font-semibold rounded-r-md hover:bg-neutral-200 transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Horizons Lab updates.</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 1: Ecosystem & Repos */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Open Source Repos
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/gutsofpratik/Horizon"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Horizon Workspace</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gutsofpratik/Horizon-Skills"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Horizon-Skills (3.2k)</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gutsofpratik/Horizon-Models"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Horizon-Models</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gutsofpratik"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Lab GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Workspace Features */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Product Features
            </div>
            <ul className="space-y-2">
              <li><a href="#interactive-demo" className="hover:text-white transition-colors">Editable Artifacts</a></li>
              <li><a href="#interactive-demo" className="hover:text-white transition-colors">Sandboxed Shell</a></li>
              <li><a href="#interactive-demo" className="hover:text-white transition-colors">Office & PDF Generator</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Local Model Loading</a></li>
              <li><a href="#download" className="hover:text-white transition-colors">Release Matrix v0.3.3</a></li>
            </ul>
          </div>

          {/* Column 3: The Lab & Community */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Research & Lab
            </div>
            <ul className="space-y-2">
              <li><a href="#lab" className="hover:text-white transition-colors">Model Training & PTQ</a></li>
              <li><a href="#lab" className="hover:text-white transition-colors">Zero-Copy Local IPC</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">Lab Manifesto</a></li>
              <li>
                <a
                  href="https://github.com/gutsofpratik/Horizon/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Issue Tracker</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors text-left"
                >
                  Back to Top ↑
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Horizons Lab. All contributions licensed under MIT.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Zero Cloud Telemetry</span>
            </span>
            <span>·</span>
            <span>Local-First Sovereign AI</span>
            <span>·</span>
            <a
              href="https://github.com/gutsofpratik/Horizon"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline"
            >
              gutsofpratik/Horizon
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
