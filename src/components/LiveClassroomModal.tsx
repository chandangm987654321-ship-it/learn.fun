import React, { useState } from 'react';
import { X, Users, Play, Sparkles, CheckCircle2, Clock, Send, Shield } from 'lucide-react';
import { QuizQuestion } from '../types';
import { DEFAULT_QUIZ_POOL } from '../data/initialData';

interface LiveClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnXp?: (amount: number) => void;
}

export const LiveClassroomModal: React.FC<LiveClassroomModalProps> = ({
  isOpen,
  onClose,
  onEarnXp,
}) => {
  const [roomCode, setRoomCode] = useState('CLASS-7429');
  const [joined, setJoined] = useState(false);
  const [isTeacherHost, setIsTeacherHost] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const mockStudents = [
    { name: 'Alex Explorer (You)', score: 320, answered: submitted },
    { name: 'Sophia Chen', score: 410, answered: true },
    { name: 'Marcus Vance', score: 290, answered: true },
    { name: 'Priya Sharma', score: 350, answered: true },
    { name: 'Liam O’Connor', score: 240, answered: false },
  ];

  const currentQ = DEFAULT_QUIZ_POOL[activeQuestionIndex] || DEFAULT_QUIZ_POOL[0];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    setJoined(true);
  };

  const handleAnswer = (idx: number) => {
    if (submitted) return;
    setSelectedAnswer(idx);
    setSubmitted(true);
    if (idx === currentQ.correctIndex) {
      onEarnXp?.(40);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xl">
              🏫
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Live Classroom Quiz Room
                {joined && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                    PIN: {roomCode}
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Join your teacher’s live session or host interactive classroom STEM competitions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Join / Host Screen */}
        {!joined ? (
          <div className="p-8 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto text-3xl">
              📡
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Enter Classroom Game PIN</h3>
              <p className="text-xs text-slate-400">
                Ask your teacher or enter the room code to join real-time STEM buzzer competitions.
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-3">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="e.g. CLASS-7429"
                className="w-full text-center text-lg font-mono font-bold tracking-widest bg-slate-950 border border-slate-700 text-sky-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                Join Live Classroom Room →
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-center gap-2">
              <Users className="w-3.5 h-3.5" /> Sample PIN preset ready to test
            </div>
          </div>
        ) : (
          /* Live Session View */
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Live Question on Left */}
            <div className="md:col-span-8 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-bold text-sky-400">
                    Question {activeQuestionIndex + 1} • Live Classroom Feed
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                    <Clock className="w-3.5 h-3.5" /> 18s Remaining
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = submitted && idx === currentQ.correctIndex;

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleAnswer(idx)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-indigo-600/40 border-indigo-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 font-bold">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fadeIn">
                    <span className="font-bold text-emerald-400">Answer Recorded! </span>
                    {currentQ.explanation}
                  </div>
                )}
              </div>
            </div>

            {/* Live Student Scores on Right */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" /> Class Standings
                </span>
                <span className="text-[10px] text-slate-400 font-mono">5 Active</span>
              </div>

              <div className="space-y-2">
                {mockStudents.map((st, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-slate-500 font-bold text-[10px]">
                        #{i + 1}
                      </span>
                      <span className="text-slate-200 font-medium truncate">{st.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-amber-400">{st.score}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          st.answered ? 'bg-emerald-400' : 'bg-slate-600'
                        }`}
                        title={st.answered ? 'Answered' : 'Thinking'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
