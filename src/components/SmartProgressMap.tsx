import React, { useState } from 'react';
import { Subject } from '../types';
import { CheckCircle2, AlertCircle, Clock, BarChart3, BookOpen } from 'lucide-react';

interface TopicMastery {
  name: string;
  status: 'mastered' | 'learning' | 'practice';
  progress: number;
}

const SUBJECT_MASTERY_DATA: Record<string, TopicMastery[]> = {
  Maths: [
    { name: 'Real Numbers & Radicals', status: 'mastered', progress: 100 },
    { name: 'Polynomials & Factoring', status: 'mastered', progress: 100 },
    { name: 'Triangles & Trigonometry', status: 'learning', progress: 65 },
    { name: 'Circles & Conic Sections', status: 'practice', progress: 30 },
    { name: 'Calculus Derivatives & Limits', status: 'learning', progress: 55 },
  ],
  Physics: [
    { name: 'Newton’s Laws of Motion', status: 'mastered', progress: 100 },
    { name: 'Simple Harmonic Motion (Pendulum)', status: 'mastered', progress: 100 },
    { name: 'Gravitation & Planetary Orbits', status: 'learning', progress: 75 },
    { name: 'Electromagnetism & Induction', status: 'practice', progress: 40 },
    { name: 'Thermodynamics & Heat Engines', status: 'learning', progress: 60 },
  ],
  Chemistry: [
    { name: 'Atomic Structure & Periodic Trends', status: 'mastered', progress: 100 },
    { name: 'Covalent & Ionic Bonding', status: 'mastered', progress: 100 },
    { name: 'Chemical Equilibrium (Kc)', status: 'learning', progress: 70 },
    { name: 'Acids, Bases & pH Calculations', status: 'practice', progress: 35 },
    { name: 'Organic Functional Groups', status: 'learning', progress: 50 },
  ],
  Biology: [
    { name: 'Cellular Respiration & ATP Cycle', status: 'mastered', progress: 100 },
    { name: 'Cardiovascular Circulatory System', status: 'mastered', progress: 100 },
    { name: 'Photosynthesis & Light Reactions', status: 'learning', progress: 80 },
    { name: 'Genetics & Mendelian Inheritance', status: 'practice', progress: 45 },
    { name: 'Central Nervous System & Neurons', status: 'learning', progress: 65 },
  ],
};

export const SmartProgressMap: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<string>('Maths');

  const topics = SUBJECT_MASTERY_DATA[activeSubject] || SUBJECT_MASTERY_DATA.Maths;

  const totalMastery = Math.round(
    topics.reduce((acc, t) => acc + t.progress, 0) / topics.length
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 text-2xl">
            📊
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Smart Curriculum Progress Map
            </h3>
            <p className="text-xs text-slate-400">
              Diagnostic diagnostic breakdown of syllabus mastery, active learning topics, and areas needing revision.
            </p>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          {Object.keys(SUBJECT_MASTERY_DATA).map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setActiveSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSubject === sub
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Mastery Overview Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white">{activeSubject} Syllabus Completion</h4>
            <p className="text-xs text-slate-400 mt-0.5">Based on lessons completed, quizzes passed, and lab trials.</p>
          </div>
          <span className="text-xl font-bold font-mono text-sky-400">{totalMastery}% Mastery</span>
        </div>

        {/* Overall Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${totalMastery}%` }}
          />
        </div>

        {/* Topic Breakdown List */}
        <div className="space-y-3 pt-2">
          {topics.map((topic, idx) => {
            const isMastered = topic.status === 'mastered';
            const isLearning = topic.status === 'learning';
            const isPractice = topic.status === 'practice';

            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {isMastered ? '✅' : isLearning ? '🟡' : '🔴'}
                  </span>
                  <div>
                    <div className="font-bold text-white">{topic.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {isMastered
                        ? 'Mastered — Verified in Quiz & Lab'
                        : isLearning
                        ? `In Progress — ${topic.progress}% Completed`
                        : 'Needs Practice — Recommend Reviewing Lesson'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-48">
                  <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isMastered
                          ? 'bg-emerald-400'
                          : isLearning
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-slate-300 font-bold w-10 text-right">
                    {topic.progress}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
