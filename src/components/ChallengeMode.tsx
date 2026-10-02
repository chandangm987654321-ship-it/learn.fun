import React, { useState, useEffect } from 'react';
import { QuizQuestion, Subject } from '../types';
import { DEFAULT_QUIZ_POOL } from '../data/initialData';
import { ProgressiveHintWidget } from './ProgressiveHintWidget';
import { Timer, Zap, Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, RefreshCw, Dice5 } from 'lucide-react';

interface ChallengeModeProps {
  onEarnXp?: (amount: number) => void;
  onEarnCoins?: (amount: number) => void;
  onUnlockBadge?: (badgeId: string) => void;
}

type QuizMode = 'standard' | '30sec' | 'surprise';

export const ChallengeMode: React.FC<ChallengeModeProps> = ({
  onEarnXp,
  onEarnCoins,
  onUnlockBadge,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUIZ_POOL);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [mode, setMode] = useState<QuizMode>('standard');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [loadingAiQuiz, setLoadingAiQuiz] = useState(false);
  const [showHintWidget, setShowHintWidget] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (quizFinished || isAnswerSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizFinished, isAnswerSubmitted, currentIndex, mode]);

  const handleTimeExpired = () => {
    setIsAnswerSubmitted(true);
  };

  const handleStartMode = async (selectedMode: QuizMode) => {
    setMode(selectedMode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setShowHintWidget(false);

    if (selectedMode === '30sec') {
      setTimeLeft(30);
      setQuestions(DEFAULT_QUIZ_POOL.slice(0, 3));
    } else if (selectedMode === 'surprise') {
      setTimeLeft(45);
      await generateSurpriseQuiz();
    } else {
      setTimeLeft(60);
      setQuestions(DEFAULT_QUIZ_POOL);
    }
  };

  const generateSurpriseQuiz = async () => {
    try {
      setLoadingAiQuiz(true);
      const subjects: Subject[] = ['Physics', 'Chemistry', 'Maths', 'Biology'];
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: randomSubject,
          topic: 'High School & Class 9 Core Concepts',
          count: 3,
        }),
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error('Failed to generate surprise quiz:', err);
      setQuestions(DEFAULT_QUIZ_POOL);
    } finally {
      setLoadingAiQuiz(false);
    }
  };

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      onEarnXp?.(20);
      onEarnCoins?.(15);
      if (timeLeft > 20) {
        onUnlockBadge?.('fast-learner');
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHintWidget(false);
      setTimeLeft(mode === '30sec' ? 30 : 60);
    } else {
      setQuizFinished(true);
      onEarnXp?.(score * 25);
      onEarnCoins?.(score * 20);
      if (score === questions.length) {
        onUnlockBadge?.('quiz-master');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mode Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-2xl">
            ⚔️
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              STEM Challenge Arena & Quick Quiz
            </h3>
            <p className="text-xs text-slate-400">
              Test your recall under timed pressure, earn XP multipliers, and use progressive hints when stuck.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => handleStartMode('standard')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              mode === 'standard'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard (60s)
          </button>
          <button
            type="button"
            onClick={() => handleStartMode('30sec')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition ${
              mode === '30sec'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3" /> 30-Sec Sprint
          </button>
          <button
            type="button"
            onClick={() => handleStartMode('surprise')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition ${
              mode === 'surprise'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dice5 className="w-3.5 h-3.5" /> Surprise Me!
          </button>
        </div>
      </div>

      {loadingAiQuiz ? (
        <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <h4 className="text-base font-bold text-white">Generating AI Surprise Challenge...</h4>
          <p className="text-xs text-slate-400">
            Formulating progressive questions and multi-tier hints with Gemini...
          </p>
        </div>
      ) : quizFinished ? (
        /* Results Screen */
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center mx-auto text-4xl shadow-xl shadow-amber-500/20">
            🏆
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">Challenge Completed!</h3>
            <p className="text-xs text-slate-400">
              You scored {score} out of {questions.length} correct.
            </p>
          </div>

          {/* Reward Badges */}
          <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around text-xs">
            <div>
              <div className="font-bold text-amber-400 text-lg">+{score * 25}</div>
              <div className="text-slate-400 text-[11px]">XP Earned</div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <div className="font-bold text-yellow-300 text-lg">+{score * 20}</div>
              <div className="text-slate-400 text-[11px]">Coins Won</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleStartMode(mode)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Play Again
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          {/* Question Header & Timer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white">
                Question {currentIndex + 1} of {questions.length}
              </span>
              {currentQ.subject && (
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono">
                  {currentQ.subject}
                </span>
              )}
            </div>

            {/* Countdown timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                timeLeft <= 10
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                  : 'bg-slate-950 text-amber-400 border-slate-800'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = isAnswerSubmitted && idx === currentQ.correctIndex;
              const isWrongSelection = isAnswerSubmitted && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isCorrectAnswer
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : isWrongSelection
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono flex items-center justify-center font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isWrongSelection && <XCircle className="w-4 h-4 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 animate-fadeIn">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Explanation & Scientific Law:
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Footer Controls: Progressive Hint Button + Submit / Next */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {!isAnswerSubmitted && (
              <button
                type="button"
                onClick={() => setShowHintWidget(!showHintWidget)}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5"
              >
                💡 {showHintWidget ? 'Hide Progressive Hints' : 'Need Help? (4-Step Hint System)'}
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  {currentIndex < questions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    'View Final Score →'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Progressive Hint Drawer */}
          {showHintWidget && !isAnswerSubmitted && (
            <div className="pt-4 border-t border-slate-800 animate-fadeIn">
              <ProgressiveHintWidget
                question={currentQ.question}
                hint1={currentQ.hint1}
                hint2={currentQ.hint2}
                hint3={currentQ.hint3}
                hint4={currentQ.hint4}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
