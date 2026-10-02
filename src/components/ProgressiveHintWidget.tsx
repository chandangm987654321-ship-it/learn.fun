import React, { useState } from 'react';
import { Lightbulb, ChevronRight, HelpCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface ProgressiveHintWidgetProps {
  question: string;
  hint1?: string;
  hint2?: string;
  hint3?: string; // Explanation
  hint4?: string; // Full Answer
  onStepUnlocked?: (step: number) => void;
  className?: string;
}

export const ProgressiveHintWidget: React.FC<ProgressiveHintWidgetProps> = ({
  question,
  hint1: initialHint1,
  hint2: initialHint2,
  hint3: initialHint3,
  hint4: initialHint4,
  onStepUnlocked,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = not started, 1 = hint1, 2 = hint2, 3 = explanation, 4 = answer
  const [hints, setHints] = useState<{ [key: number]: string }>({
    1: initialHint1 || '',
    2: initialHint2 || '',
    3: initialHint3 || '',
    4: initialHint4 || '',
  });
  const [loading, setLoading] = useState(false);

  const fetchAiHint = async (targetStep: number) => {
    // If already pre-provided, just advance
    if (hints[targetStep]) {
      setCurrentStep(targetStep);
      onStepUnlocked?.(targetStep);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/get-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          step: targetStep,
          previousHints: [hints[1], hints[2], hints[3]].filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.hint) {
        setHints((prev) => ({ ...prev, [targetStep]: data.hint }));
        setCurrentStep(targetStep);
        onStepUnlocked?.(targetStep);
      }
    } catch (err) {
      console.error('Failed to fetch hint:', err);
    } finally {
      setLoading(false);
    }
  };

  const stepsConfig = [
    {
      step: 1,
      title: 'Hint 1: Gentle Nudge',
      desc: 'Point yourself in the right direction without spoiling formulas',
      icon: '🌱',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      step: 2,
      title: 'Hint 2: Key Formula & Strategy',
      desc: 'Identify the exact governing law, equation, and variables',
      icon: '📐',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    },
    {
      step: 3,
      title: 'Detailed Guided Explanation',
      desc: 'Walk through intermediate steps and logical transitions',
      icon: '🧠',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      step: 4,
      title: 'Complete Final Answer',
      desc: 'Verified final solution and verification steps',
      icon: '🎯',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Progressive Socratic Hint System
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Anti-Spoiler
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Reveal hints one tier at a time to build genuine mastery instead of rushing to the answer.
            </p>
          </div>
        </div>

        {currentStep > 0 && (
          <span className="text-xs font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
            Step {currentStep} of 4 Unlocked
          </span>
        )}
      </div>

      {/* Start Button if 0 */}
      {currentStep === 0 ? (
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-slate-300 mb-3 max-w-sm">
            Stuck on this problem? Don't give up! Let our AI tutor gently nudge your thinking without giving away the answer.
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={() => fetchAiHint(1)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" /> Need Help? Reveal Hint 1 →
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {/* Progress Path Indicator */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {stepsConfig.map((s) => {
              const isCurrent = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <div
                  key={s.step}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-indigo-600/20 border-indigo-500/80 shadow-sm'
                      : isPast
                      ? 'bg-slate-800/80 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-40'
                  }`}
                >
                  <div className="text-base mb-1">{s.icon}</div>
                  <div className="text-[11px] font-bold truncate">
                    {s.step === 1 && 'Hint 1'}
                    {s.step === 2 && 'Hint 2'}
                    {s.step === 3 && 'Explanation'}
                    {s.step === 4 && 'Answer'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Render Unlocked Hints */}
          {stepsConfig.map((s) => {
            if (currentStep < s.step) return null;
            return (
              <div
                key={s.step}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 shadow-inner animate-fadeIn"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.icon}</span>
                    <span className="text-xs font-bold text-white">{s.title}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>
                    Tier {s.step}
                  </span>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line pl-6 border-l-2 border-slate-700/60 ml-2">
                  {hints[s.step] || (loading && currentStep === s.step ? (
                    <span className="text-slate-400 italic flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> Formulating progressive hint...
                    </span>
                  ) : (
                    'Ready to reveal.'
                  ))}
                </div>
              </div>
            );
          })}

          {/* Advance to next step button */}
          {currentStep < 4 && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Still need a deeper push?
              </span>
              <button
                type="button"
                disabled={loading}
                onClick={() => fetchAiHint(currentStep + 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              >
                {loading ? 'Consulting AI Tutor...' : (
                  <>
                    Unlock {stepsConfig[currentStep].title.split(':')[0]} <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Full problem breakdown unlocked. Great effort working through each tier!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
