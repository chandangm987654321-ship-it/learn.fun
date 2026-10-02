import React, { useState } from 'react';
import { TrophyCabinetItem } from '../../types';
import { TROPHY_CABINET_ITEMS } from '../../data/schoolData';
import { Trophy, Award, Medal, Sparkles, Filter, ShieldCheck, Star } from 'lucide-react';

export const SchoolAchievementWall: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Robotics' | 'Sports' | 'Academics' | 'Cultural'>('All');
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyCabinetItem | null>(null);

  const filteredItems = TROPHY_CABINET_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-5 h-5 text-amber-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              School Digital Trophy Cabinet & Hall of Fame
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Honoring Excellence, Grit & Discovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Celebrating national robotics victories, state championship athletics, academic olympiads, and arts galas.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs self-start sm:self-auto overflow-x-auto">
          {(['All', 'Robotics', 'Sports', 'Academics', 'Cultural'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trophy Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTrophy(item)}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            {/* Top Badge & Year */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 block mb-1">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.category}</span>
                </div>
              </div>

              {/* Title & Rank */}
              <div className="space-y-1.5 mb-3">
                <div className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                  {item.rank}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                  {item.title}
                </h3>
                <div className="text-xs text-sky-400 font-medium">{item.competition}</div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Record
              </span>
              <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition text-[11px]">
                Inspect Trophy →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Trophy Modal Preview */}
      {selectedTrophy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl p-6 text-center space-y-4">
            <span className="text-6xl p-4 rounded-3xl bg-slate-950 border border-slate-800 inline-block shadow-xl">
              {selectedTrophy.icon}
            </span>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                {selectedTrophy.category} • {selectedTrophy.year}
              </span>
              <h3 className="text-xl font-black text-white">{selectedTrophy.title}</h3>
              <p className="text-xs text-sky-400 font-semibold">{selectedTrophy.competition}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed text-left">
              {selectedTrophy.description}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setSelectedTrophy(null)}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
