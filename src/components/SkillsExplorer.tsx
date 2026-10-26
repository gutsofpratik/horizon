import React, { useState } from 'react';
import { Box, Search, Copy, Check, ExternalLink, ArrowRight, Star, Terminal } from 'lucide-react';
import { SAMPLE_SKILLS } from '../data/horizonData';

export const SkillsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Development', 'Agents', 'Data & ML', 'Productivity', 'Research'];

  const filteredSkills = SAMPLE_SKILLS.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="skills" className="py-24 relative bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase mb-3">
              <Box className="w-3.5 h-3.5 text-white" />
              <span>HORIZON-SKILLS REGISTRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-mono tracking-tight">
              3,203+ MODULAR AGENT SKILLS
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="text-xs font-mono text-neutral-400">
              Distributed via <code className="text-white">catalog.json</code> & MIT packages
            </span>
            <a
              href="https://github.com/gutsofpratik/Horizon-Skills"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline underline-offset-4"
            >
              <span>Explore gutsofpratik/Horizon-Skills</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter 3,203 skills..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-lg border border-white/10 bg-neutral-950/80 hover:border-white/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                    {skill.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                    <Star className="w-3 h-3 text-white fill-white" />
                    <span>{skill.stars}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white font-mono mb-2 group-hover:text-neutral-200">
                  {skill.name}
                </h3>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skill.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900/60 text-neutral-500">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Install button */}
              <button
                onClick={() => handleCopy(skill.installCommand, skill.id)}
                className="w-full mt-2 py-2 px-3 rounded bg-neutral-900 border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-[11px] flex items-center justify-between transition-colors"
                title="Click to copy install command"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{skill.installCommand}</span>
                </div>
                {copiedId === skill.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-500 shrink-0 ml-1" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* View all 3,203 skills callout */}
        <div className="p-6 rounded-xl border border-white/10 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            <h4 className="text-white text-base font-bold">Looking for all 3,203 packaged skills?</h4>
            <p className="text-neutral-400 text-xs font-sans mt-0.5">
              Browse the complete repository containing instructions, unit tests, scripts, and upstream license notices.
            </p>
          </div>
          <a
            href="https://github.com/gutsofpratik/Horizon-Skills"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Open Horizon-Skills Repository</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
