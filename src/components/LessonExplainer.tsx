import React, { useState } from 'react';
import { Lesson, Subject } from '../types';
import { CURATED_LESSONS } from '../data/initialData';
import { Sparkles, Brain, BookOpen, Volume2, VolumeX, ArrowRight, Compass, Search, Filter } from 'lucide-react';

interface LessonExplainerProps {
  onEarnXp?: (amount: number) => void;
  onOpenLab?: (labType: 'physics' | 'chemistry' | 'maths' | 'biology') => void;
  onOpenTutorWithTopic?: (topic: string) => void;
}

export const LessonExplainer: React.FC<LessonExplainerProps> = ({
  onEarnXp,
  onOpenLab,
  onOpenTutorWithTopic,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURATED_LESSONS[0]);
  const [searchTopic, setSearchTopic] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Class 9' | 'Intermediate' | 'Advanced'>('All');
  const [customTopic, setCustomTopic] = useState('');
  const [customSubject, setCustomSubject] = useState<Subject>('Physics');
  const [enableHighThinking, setEnableHighThinking] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter lessons
  const filteredLessons = CURATED_LESSONS.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
      l.summary.toLowerCase().includes(searchTopic.toLowerCase()) ||
      l.subject.toLowerCase().includes(searchTopic.toLowerCase());
    return matchesSearch;
  });

  // Text to speech
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = selectedLesson.contentMarkdown || selectedLesson.summary;
    const cleanText = textToRead
      .replace(/[*_#`$]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Generate custom AI lesson
  const handleGenerateCustomLesson = async (presetDifficulty?: string) => {
    const topicToUse = customTopic.trim();
    if (!topicToUse || isGenerating) return;

    try {
      setIsGenerating(true);
      const res = await fetch('/api/explain-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          subject: customSubject,
          difficulty: presetDifficulty || (difficultyFilter === 'Class 9' ? 'Grade 9 High School' : 'Intermediate'),
          enableHighThinking,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate lesson');

      const newLesson: Lesson = {
        id: `custom-${Date.now()}`,
        title: topicToUse,
        subject: customSubject,
        difficulty: 'Intermediate',
        summary: `AI deep-dive explanation on ${topicToUse} generated with Gemini reasoning.`,
        icon: '💡',
        contentMarkdown: data.lessonContent,
      };

      setSelectedLesson(newLesson);
      setCustomTopic('');
      onEarnXp?.(40);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error generating lesson');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Generator Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-sky-950/60 p-6 rounded-2xl border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                AI Interactive Lesson Explainer
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Any STEM Topic → Vivid Intuition & Core Laws
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Enter any concept (e.g. "Quantum Entanglement", "CRISPR-Cas9", "Fourier Series", "Photoelectric Effect") and let our High-Thinking AI generate an interactive lesson breakdown.
            </p>
          </div>

          {/* High Thinking Toggle */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-indigo-500/40 flex items-center gap-3 shrink-0">
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-white">High Thinking Mode</div>
              <div className="text-[10px] text-slate-400">gemini-3.1-pro-preview</div>
            </div>
            <button
              type="button"
              onClick={() => setEnableHighThinking(!enableHighThinking)}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                enableHighThinking ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  enableHighThinking ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          {/* Subject Dropdown */}
          <select
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value as Subject)}
            className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl px-3 py-3 focus:outline-none focus:border-indigo-500"
          >
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
            <option value="Biology">Biology</option>
            <option value="Computer Science">Computer Science</option>
          </select>

          {/* Topic input */}
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateCustomLesson()}
            placeholder="Enter any STEM topic (e.g., 'Special Relativity', 'Enzyme Kinetics', 'Matrix Eigenvalues')..."
            className="flex-1 w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              disabled={!customTopic.trim() || isGenerating}
              onClick={() => handleGenerateCustomLesson()}
              className={`flex-1 sm:flex-none py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                customTopic.trim() && !isGenerating
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Explain Lesson
                </>
              )}
            </button>

            {/* "Explain like I'm in Class 9" button */}
            <button
              type="button"
              disabled={!customTopic.trim() || isGenerating}
              onClick={() => handleGenerateCustomLesson('Explain like I am in Class 9 (age 14-15)')}
              className={`py-3 px-3 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition ${
                customTopic.trim() && !isGenerating
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
              title="Explains using Class 9 concepts and friendly daily-life analogies"
            >
              💡 <span className="hidden sm:inline">Explain for</span> Class 9
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Curated Lesson List on Left, Active Lesson Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lesson Index */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curated Master Lessons
            </h3>
            <span className="text-xs text-indigo-400 font-semibold">
              {filteredLessons.length} Lessons
            </span>
          </div>

          {/* Search filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Search lessons..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Lesson items */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-2xl p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                    {lesson.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate">{lesson.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {lesson.summary}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-semibold font-mono">
                        {lesson.subject}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{lesson.difficulty}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Lesson Reader */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          {/* Lesson Reader Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                {selectedLesson.icon}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLesson.title}</h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                  <span className="text-indigo-400 font-semibold">{selectedLesson.subject}</span>
                  <span>•</span>
                  <span>{selectedLesson.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Read Aloud */}
              <button
                type="button"
                onClick={toggleSpeech}
                className={`p-2.5 rounded-xl border transition ${
                  isSpeaking
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title={isSpeaking ? 'Stop voice explanation' : 'Listen to voice explanation'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Open related virtual lab button */}
              {selectedLesson.relatedLab && onOpenLab && (
                <button
                  type="button"
                  onClick={() => onOpenLab(selectedLesson.relatedLab!)}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" /> Launch {selectedLesson.subject} Lab →
                </button>
              )}
            </div>
          </div>

          {/* Lesson Content Markdown */}
          <div className="flex-1 overflow-y-auto pr-1 text-slate-200 space-y-4 leading-relaxed text-xs sm:text-sm">
            <div className="whitespace-pre-line prose prose-invert max-w-none">
              {selectedLesson.contentMarkdown || selectedLesson.summary}
            </div>

            {/* Sample Question & Ask OmniTutor Prompt */}
            {selectedLesson.sampleQuestion && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Practice Challenge for this Lesson:
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  "{selectedLesson.sampleQuestion}"
                </p>
                {onOpenTutorWithTopic && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenTutorWithTopic(
                        `I am studying the lesson "${selectedLesson.title}". Can you help me solve this practice question step-by-step: "${selectedLesson.sampleQuestion}"?`
                      )
                    }
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Solve with OmniTutor AI & Progressive Hints →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
