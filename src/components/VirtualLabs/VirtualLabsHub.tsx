import React, { useState } from 'react';
import { PhysicsLab } from './PhysicsLab';
import { ChemistryLab } from './ChemistryLab';
import { MathsLab } from './MathsLab';
import { BiologyLab } from './BiologyLab';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface VirtualLabsHubProps {
  onEarnXp?: (amount: number) => void;
  initialLab?: 'physics' | 'chemistry' | 'maths' | 'biology';
}

export const VirtualLabsHub: React.FC<VirtualLabsHubProps> = ({
  onEarnXp,
  initialLab = 'physics',
}) => {
  const [activeLab, setActiveLab] = useState<'physics' | 'chemistry' | 'maths' | 'biology'>(
    initialLab
  );

  const [visitedLabs, setVisitedLabs] = useState<string[]>([initialLab]);

  const handleSelectLab = (lab: 'physics' | 'chemistry' | 'maths' | 'biology') => {
    setActiveLab(lab);
    if (!visitedLabs.includes(lab)) {
      const next = [...visitedLabs, lab];
      setVisitedLabs(next);
      onEarnXp?.(25);
    }
  };

  const tabs = [
    {
      id: 'physics',
      name: 'Physics Lab',
      icon: '⏱️',
      subtitle: 'Pendulum & Celestial Gravity',
      color: 'from-sky-500 to-blue-600',
    },
    {
      id: 'chemistry',
      name: 'Chemistry Lab',
      icon: '🧪',
      subtitle: 'Molecule Builder & Octet Rules',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'maths',
      name: 'Maths Lab',
      icon: '📐',
      subtitle: 'Graph Manipulation & Tangents',
      color: 'from-indigo-500 to-violet-600',
    },
    {
      id: 'biology',
      name: 'Biology Lab',
      icon: '🧬',
      subtitle: 'Clickable Human Body & Vitals',
      color: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Lab Switcher Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const isActive = activeLab === tab.id;
          const isVisited = visitedLabs.includes(tab.id);

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectLab(tab.id as any)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  {tab.icon}
                </span>
                {isVisited && (
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Visited
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{tab.name}</h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{tab.subtitle}</p>
              </div>

              {isActive && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Render Active Virtual Lab */}
      <div className="transition-all animate-fadeIn">
        {activeLab === 'physics' && <PhysicsLab onEarnXp={onEarnXp} />}
        {activeLab === 'chemistry' && <ChemistryLab onEarnXp={onEarnXp} />}
        {activeLab === 'maths' && <MathsLab onEarnXp={onEarnXp} />}
        {activeLab === 'biology' && <BiologyLab onEarnXp={onEarnXp} />}
      </div>
    </div>
  );
};
