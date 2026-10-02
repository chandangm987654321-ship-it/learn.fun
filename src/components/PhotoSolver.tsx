import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Brain, CheckCircle, AlertTriangle, ArrowRight, FileImage, RefreshCw } from 'lucide-react';
import { SAMPLE_PHOTO_QUESTIONS } from '../data/initialData';

interface PhotoSolverProps {
  onEarnXp?: (amount: number) => void;
}

export const PhotoSolver: React.FC<PhotoSolverProps> = ({ onEarnXp }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [enableHighThinking, setEnableHighThinking] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert SVG string to base64 PNG/data url
  const selectSampleQuestion = (sample: (typeof SAMPLE_PHOTO_QUESTIONS)[0]) => {
    // Generate data URL from SVG
    const svgBlob = new Blob([sample.svgPreview], { type: 'image/svg+xml;charset=utf-8' });
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setUserPrompt(sample.questionText);
      setSolution(null);
      setError(null);
    };
    reader.readAsDataURL(svgBlob);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setSolution(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSolve = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);
      setError(null);

      const mimeTypeMatch = selectedImage.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType,
          userPrompt,
          enableHighThinking,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to solve question from image');
      }

      setSolution(data.explanation);
      setModelUsed(data.modelUsed || 'gemini-3.1-pro-preview');
      onEarnXp?.(50);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with Gemini 3.1 Pro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-sky-900/50 p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Camera className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              AI Question Scanner & Step-by-Step Solver
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Snap Any Problem → Master Every Step
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Upload a photo of a textbook question, handwritten homework, or circuit/physics diagram.
            Powered by <strong className="text-sky-300">gemini-3.1-pro-preview</strong> with high-reasoning thinking mode.
          </p>
        </div>

        {/* High Thinking Mode Toggle */}
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-indigo-500/40 flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                High Thinking Mode
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                  ThinkingLevel.HIGH
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Deep step-by-step mathematical reasoning</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnableHighThinking(!enableHighThinking)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              enableHighThinking ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                enableHighThinking ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Controls on Left, Solution on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Upload / Sample selection */}
        <div className="lg:col-span-5 space-y-4">
          {/* Image Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              selectedImage
                ? 'border-indigo-500/70 bg-indigo-950/20'
                : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-800/40 bg-slate-900/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="space-y-3 w-full">
                <div className="relative rounded-xl overflow-hidden max-h-56 bg-slate-950 border border-slate-700 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Uploaded question"
                    className="max-h-56 object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/90 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Image Loaded
                  </div>
                </div>
                <p className="text-xs text-indigo-300 font-semibold hover:underline">
                  Click to replace or upload another photo
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Click or Drag & Drop Question Image</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Supports homework snapshots, textbook graphs, equations, or whiteboard photos (PNG, JPG).
                </p>
              </div>
            )}
          </div>

          {/* Optional context prompt */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Instructions / Questions (Optional):
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="e.g. 'Explain step 3 in detail', 'Find acceleration without calculus', or leave empty for full breakdown..."
              rows={2}
              className="w-full text-xs text-slate-200 bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Solve button */}
          <button
            type="button"
            disabled={!selectedImage || loading}
            onClick={handleSolve}
            className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer ${
              selectedImage && !loading
                ? 'bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600 hover:from-indigo-500 hover:to-sky-500 text-white shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                Analyzing with Gemini 3.1 Pro & High Thinking...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Analyze & Solve Step-by-Step (+50 XP)
              </>
            )}
          </button>

          {/* Quick Sample STEM Prompts */}
          <div className="pt-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Or Try A Sample STEM Problem:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_PHOTO_QUESTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSampleQuestion(sample)}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/60 text-left transition flex items-center gap-3 group"
                >
                  <div
                    className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800"
                    dangerouslySetInnerHTML={{ __html: sample.svgPreview }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition truncate">
                        {sample.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {sample.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {sample.questionText}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Step-by-Step Solution Breakdown */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Brain className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white">
                  Step-by-Step Solution & Concept Architecture
                </h3>
              </div>
              {modelUsed && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                  {modelUsed}
                </span>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 mb-4">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Error analyzing question</div>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <Brain className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Deep Reasoning with Gemini 3.1 Pro...
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Transcribing equations, verifying scientific laws, formulating step-by-step derivations, and compiling common pitfalls.
                  </p>
                </div>
              </div>
            ) : solution ? (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-slate-200">
                <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-3">
                  {solution.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('#')) {
                      return (
                        <h4
                          key={i}
                          className="text-sm font-bold text-indigo-300 pt-2 border-b border-slate-800/80 pb-1"
                        >
                          {paragraph.replace(/^#+\s*/, '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-xs"
                        >
                          {paragraph}
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="text-slate-300 whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Solution verified and broken down into core concepts
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSolution(null);
                      setSelectedImage(null);
                      setUserPrompt('');
                    }}
                    className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Scan Another Problem
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <FileImage className="w-12 h-12 mb-3 opacity-30 text-indigo-400" />
                <h4 className="text-sm font-bold text-slate-400">No Image Analyzed Yet</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Upload an image on the left or select a sample problem to receive an instant, rigorous step-by-step breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
