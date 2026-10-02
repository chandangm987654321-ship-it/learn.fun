import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ModelTier } from '../types';
import { Send, Bot, User, Brain, Zap, Sparkles, Volume2, VolumeX, Mic, MicOff, RotateCcw, Copy, Check } from 'lucide-react';

interface OmniTutorChatProps {
  onEarnXp?: (amount: number) => void;
}

const ROLES = [
  {
    id: 'school',
    name: 'AI School Assistant',
    icon: '🏫',
    instruction:
      'You are the official AI School Assistant for Apex Academy. You help students, teachers, and parents with daily campus life: answering when exams take place, listing pending homework, checking Sports Day or Annual Day schedules, and explaining lessons for Class 9 students.',
  },
  {
    id: 'socratic',
    name: 'Socratic Mentor',
    icon: '🎓',
    instruction:
      'You are a patient Socratic STEM tutor. Instead of directly blurting out answers, guide the student with thoughtful questions, intuitive analogies, and progressive clues that help them reach the "aha!" moment themselves.',
  },
  {
    id: 'class9',
    name: "Explain Like I'm in Class 9",
    icon: '💡',
    instruction:
      'You explain STEM and AI topics specifically for a 9th grade student (ages 14-15). Avoid unneeded jargon, use vivid daily-life analogies (smartphones, sports, cooking, video games), and keep tone fun, energetic, and crystal clear.',
  },
  {
    id: 'formula',
    name: 'Fast Formula & Math Solver',
    icon: '🧮',
    instruction:
      'You are a precise, rigorous STEM formula specialist. Provide exact mathematical derivations, unit analysis, and numbered solution steps for equations in physics, chemistry, and calculus.',
  },
  {
    id: 'lab',
    name: 'Virtual Lab Director',
    icon: '🔬',
    instruction:
      'You are the Virtual Lab Director. You guide simulated experiments, explain what happens when variables like gravity, string length, or chemical bonds change, and predict experimental outcomes.',
  },
];

export const OmniTutorChat: React.FC<OmniTutorChatProps> = ({ onEarnXp }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Hello explorer! I'm **OmniTutor AI**, your personalized STEM companion. Ask me to break down any lesson, explain complex physics, construct chemical equations, or solve math problems step-by-step. What would you like to explore today?",
      timestamp: Date.now(),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [modelTier, setModelTier] = useState<ModelTier>('general'); // fast, general, pro
  const [enableHighThinking, setEnableHighThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Speech Recognition (Voice Learning)
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = text
      .replace(/[*_#`$]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (overridePrompt?: string) => {
    const promptToSend = overridePrompt || input;
    if (!promptToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: promptToSend.trim(),
      timestamp: Date.now(),
    };

    const newThread = [...messages, userMsg];
    setMessages(newThread);
    setInput('');
    setLoading(true);

    try {
      const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newThread.map((m) => ({ role: m.role, content: m.content })),
          systemInstruction: currentRoleObj.instruction,
          modelTier,
          enableHighThinking,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Chat request failed');
      }

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I could not generate an answer.',
        timestamp: Date.now(),
        modelUsed: data.modelUsed,
        thinkingEnabled: data.thinkingEnabled,
      };

      setMessages((prev) => [...prev, botMsg]);
      onEarnXp?.(15);

      if (autoSpeak) {
        speakText(botMsg.content);
      }
    } catch (err: any) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Error: ${err.message || 'Unable to reach Gemini API. Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[78vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Top Bar: Role Selector, Model Tier, Thinking Mode */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3">
        {/* Role buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
                selectedRole === role.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{role.icon}</span>
              <span>{role.name}</span>
            </button>
          ))}
        </div>

        {/* Model Tier & High Thinking Toggles */}
        <div className="flex items-center gap-2">
          {/* Model tier selector */}
          <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setModelTier('fast');
                setEnableHighThinking(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                modelTier === 'fast' && !enableHighThinking
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-3.1-flash-lite (Fast tasks)"
            >
              <Zap className="w-3 h-3" /> Fast
            </button>
            <button
              type="button"
              onClick={() => {
                setModelTier('general');
                setEnableHighThinking(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                modelTier === 'general' && !enableHighThinking
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-3.5-flash (General tasks)"
            >
              <Sparkles className="w-3 h-3" /> General
            </button>
            <button
              type="button"
              onClick={() => setModelTier('pro')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                modelTier === 'pro' || enableHighThinking
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-3.1-pro-preview (Complex tasks)"
            >
              <Brain className="w-3 h-3" /> Pro
            </button>
          </div>

          {/* High Thinking Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !enableHighThinking;
              setEnableHighThinking(next);
              if (next) setModelTier('pro');
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              enableHighThinking
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Uses gemini-3.1-pro-preview with ThinkingLevel.HIGH for complex queries"
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thinking:</span>
            <span>{enableHighThinking ? 'HIGH' : 'Normal'}</span>
          </button>

          {/* Auto voice output toggle */}
          <button
            type="button"
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2 rounded-xl border transition ${
              autoSpeak
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={autoSpeak ? 'Auto Voice Read-Aloud ON' : 'Auto Voice Read-Aloud OFF'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Messages Scrollable Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isBot = m.role === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-md text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-slate-800/90 border border-slate-700 text-slate-200'
                    : 'bg-indigo-600 text-white font-medium'
                }`}
              >
                <div className="whitespace-pre-line prose prose-invert max-w-none">
                  {m.content}
                </div>

                {isBot && (
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/60 text-[10px] text-slate-400">
                    <span className="font-mono">
                      {m.modelUsed || 'gemini-3.5-flash'}
                      {m.thinkingEnabled && ' • Thinking: HIGH'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(m.content)}
                        className="hover:text-sky-300 transition"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(m.id, m.content)}
                        className="hover:text-sky-300 transition"
                        title="Copy text"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>OmniTutor is thinking with {enableHighThinking ? 'gemini-3.1-pro-preview' : 'Gemini'}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-bold shrink-0">Quick Starters:</span>
        {[
          "When is the next exam?",
          "Show my homework.",
          "Explain photosynthesis like I'm in Class 9.",
          "When is Sports Day?",
          "What is today's school announcement?",
          "Explain Newton's third law with an astronaut example",
        ].map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0 truncate max-w-xs transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form with Voice Mic & Send */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-750'
            }`}
            title="Voice Input (Speech-to-Text)"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening
                ? 'Listening to your voice... Speak now!'
                : "Ask any STEM question, e.g., 'Derive kinetic energy equation'..."
            }
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-3 rounded-xl font-bold transition flex items-center justify-center cursor-pointer ${
              input.trim() && !loading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
