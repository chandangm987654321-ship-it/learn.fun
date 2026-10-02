import React from 'react';
import { AdventureNode } from '../types';
import { ADVENTURE_NODES } from '../data/initialData';
import { CheckCircle2, Lock, Sparkles, Trophy, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface LearningAdventureProps {
  onStartNode: (node: AdventureNode) => void;
}

export const LearningAdventure: React.FC<LearningAdventureProps> = ({ onStartNode }) => {
  const chapters = [1, 2, 3];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              🗺️
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              STEM Learning Adventure Map
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Chapter Map & Boss Battles
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Journey from classical kinematics to the quantum atom and molecular genetics. Defeat Chapter Boss Quizzes to unlock cosmic avatar gear!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-xs font-bold text-white">Adventure Mastery</div>
            <div className="text-[11px] text-slate-400">2 / 7 Missions Completed</div>
          </div>
        </div>
      </div>

      {/* Chapters Journey Path */}
      <div className="space-y-8 relative">
        {chapters.map((chapterNum) => {
          const nodes = ADVENTURE_NODES.filter((n) => n.chapter === chapterNum);
          const chapterTitle =
            chapterNum === 1
              ? 'Chapter 1: Foundations of Classical Force & Kinematics'
              : chapterNum === 2
              ? 'Chapter 2: The Quantum Atom & Molecular Architecture'
              : 'Chapter 3: The Secret Machinery of Life & Genetics';

          return (
            <div
              key={chapterNum}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                    C{chapterNum}
                  </span>
                  <h3 className="text-sm font-bold text-white">{chapterTitle}</h3>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {nodes.filter((n) => n.completed).length}/{nodes.length} Done
                </span>
              </div>

              {/* Node Sequence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {nodes.map((node) => {
                  const isBoss = node.type === 'boss';

                  return (
                    <div
                      key={node.id}
                      onClick={() => !node.locked && onStartNode(node)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        node.locked
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                          : isBoss
                          ? 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/50 hover:border-amber-400 shadow-md cursor-pointer group'
                          : node.completed
                          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 shadow-sm cursor-pointer group'
                          : 'bg-slate-800/60 border-indigo-500/50 hover:border-indigo-400 cursor-pointer group'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                            {node.icon}
                          </span>
                          {node.completed ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                          ) : node.locked ? (
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px] flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          ) : isBoss ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center gap-1 border border-amber-500/30">
                              <Flame className="w-3 h-3 text-amber-400" /> Boss Battle
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-[10px]">
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                          {node.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{node.subtitle}</p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="font-mono text-amber-400 font-bold">+{node.xp} XP</span>
                        {!node.locked && (
                          <span className="text-indigo-400 font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition">
                            Enter Mission <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
