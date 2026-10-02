import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle, ArrowRight, Award } from 'lucide-react';

interface DragDropQuestionsProps {
  onEarnXp?: (amount: number) => void;
}

type ActivityType = 'photosynthesis' | 'formulas' | 'organs';

export const DragDropQuestions: React.FC<DragDropQuestionsProps> = ({ onEarnXp }) => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>('photosynthesis');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // 1. Photosynthesis Sequence
  const initialPhotosynthesisItems = [
    { id: 'p4', text: 'Calvin Cycle fixates CO₂ into triose phosphates', correctOrder: 3 },
    { id: 'p1', text: 'Chlorophyll absorbs photon energy from sunlight', correctOrder: 0 },
    { id: 'p5', text: 'Glucose and starch synthesized for energy storage', correctOrder: 4 },
    { id: 'p2', text: 'Water photolysis splits H₂O, releasing O₂ gas', correctOrder: 1 },
    { id: 'p3', text: 'Electron transport chain generates ATP & NADPH', correctOrder: 2 },
  ];
  const [photoItems, setPhotoItems] = useState(initialPhotosynthesisItems);

  // 2. Formula Matching
  const initialFormulaMatches = [
    { id: 'f1', formula: 'T = 2π√(L/g)', use: 'Simple Pendulum Harmonic Period', matchedId: null as string | null },
    { id: 'f2', formula: 'E = mc²', use: 'Mass-Energy Equivalence', matchedId: null as string | null },
    { id: 'f3', formula: 'F = ma', use: "Newton's Second Law of Motion", matchedId: null as string | null },
    { id: 'f4', formula: 'Δ = b² - 4ac', use: 'Quadratic Discriminant & Root Nature', matchedId: null as string | null },
    { id: 'f5', formula: 'PV = nRT', use: 'Ideal Gas Law State Equation', matchedId: null as string | null },
  ];
  const [formulaItems, setFormulaItems] = useState(initialFormulaMatches);
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);

  // 3. Anatomical Organ Matching
  const organTargets = [
    { id: 'slot-brain', label: 'Cranial Cavity (Head)', accepted: 'Brain' },
    { id: 'slot-heart', label: 'Thoracic Cavity (Left Chest)', accepted: 'Heart' },
    { id: 'slot-lungs', label: 'Pleural Cavity (Bilateral Chest)', accepted: 'Lungs' },
    { id: 'slot-stomach', label: 'Upper Left Abdomen', accepted: 'Stomach' },
    { id: 'slot-liver', label: 'Upper Right Abdomen', accepted: 'Liver' },
  ];
  const [organBank, setOrganBank] = useState(['Heart', 'Brain', 'Liver', 'Lungs', 'Stomach']);
  const [organSlots, setOrganSlots] = useState<{ [key: string]: string }>({});
  const [selectedOrganBankItem, setSelectedOrganBankItem] = useState<string | null>(null);

  // Reorder helper for photosynthesis
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photoItems.length) return;
    const next = [...photoItems];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setPhotoItems(next);
    setFeedback(null);
  };

  // Check Photosynthesis order
  const checkPhotosynthesis = () => {
    const isCorrect = photoItems.every((item, idx) => item.correctOrder === idx);
    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        message: '🎉 Perfect! You successfully reconstructed the full sequence of photosynthesis from light absorption to glucose production!',
      });
      onEarnXp?.(50);
    } else {
      setFeedback({
        isCorrect: false,
        message: 'Not quite in the right order yet. Remember: Light Absorption → Water Splitting → Electron Transport → Calvin Cycle → Glucose.',
      });
    }
  };

  // Check Formula matches
  const handleSelectFormula = (formulaId: string) => {
    setSelectedFormula(formulaId);
  };

  const handleMatchWithUse = (targetId: string) => {
    if (!selectedFormula) return;
    setFormulaItems((prev) =>
      prev.map((item) =>
        item.id === targetId ? { ...item, matchedId: selectedFormula } : item
      )
    );
    setSelectedFormula(null);
    setFeedback(null);
  };

  const checkFormulas = () => {
    const allMatched = formulaItems.every((item) => item.matchedId === item.id);
    if (allMatched) {
      setFeedback({
        isCorrect: true,
        message: '🎉 Outstanding! Every fundamental equation is accurately matched with its physical application.',
      });
      onEarnXp?.(50);
    } else {
      setFeedback({
        isCorrect: false,
        message: 'Some formulas are mismatched. Review pendulum period T, mass-energy E=mc², and ideal gas PV=nRT.',
      });
    }
  };

  // Organ placement helper
  const handlePlaceOrgan = (slotId: string) => {
    if (!selectedOrganBankItem) return;
    setOrganSlots((prev) => ({ ...prev, [slotId]: selectedOrganBankItem }));
    setOrganBank((prev) => prev.filter((o) => o !== selectedOrganBankItem));
    setSelectedOrganBankItem(null);
    setFeedback(null);
  };

  const checkOrgans = () => {
    const isCorrect = organTargets.every((t) => organSlots[t.id] === t.accepted);
    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        message: '🎉 Flawless anatomical mapping! All vital organs are situated in their correct anatomical cavities.',
      });
      onEarnXp?.(50);
    } else {
      setFeedback({
        isCorrect: false,
        message: 'Some organs are misplaced. Check cranial vs thoracic vs abdominal placements.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-2xl">
            🧠
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Drag & Arrange STEM Challenges
            </h3>
            <p className="text-xs text-slate-400">
              Manipulate steps, match governing formulas, and position human organs to reinforce mental models.
            </p>
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveActivity('photosynthesis');
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeActivity === 'photosynthesis'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Photosynthesis Steps
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveActivity('formulas');
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeActivity === 'formulas'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Match Formulas
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveActivity('organs');
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeActivity === 'organs'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Position Organs
          </button>
        </div>
      </div>

      {/* Activity 1: Photosynthesis Sequence */}
      {activeActivity === 'photosynthesis' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div>
            <h4 className="text-sm font-bold text-white">
              🌿 Challenge: Arrange the 5 Stages of Photosynthesis in Chronological Order
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Use the Up / Down arrows to reorder the biological cascade from first photon absorption to final carbon fixation.
            </p>
          </div>

          <div className="space-y-2.5">
            {photoItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 font-medium">{item.text}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, 'up')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={idx === photoItems.length - 1}
                    onClick={() => moveItem(idx, 'down')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setPhotoItems(initialPhotosynthesisItems);
                setFeedback(null);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Sequence
            </button>

            <button
              type="button"
              onClick={checkPhotosynthesis}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer"
            >
              Check Sequence Order (+50 XP)
            </button>
          </div>
        </div>
      )}

      {/* Activity 2: Match Formulas */}
      {activeActivity === 'formulas' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div>
            <h4 className="text-sm font-bold text-white">
              📐 Challenge: Match Equations with their Scientific Applications
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Click a formula on the left, then click its corresponding scientific definition on the right.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Formulas */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Select Formula:
              </span>
              {formulaItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectFormula(item.id)}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs font-bold transition flex items-center justify-between ${
                    selectedFormula === item.id
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-md ring-2 ring-purple-500/40'
                      : 'bg-slate-950 border-slate-800 text-sky-300 hover:bg-slate-850'
                  }`}
                >
                  <span>{item.formula}</span>
                  <span className="text-[10px] text-slate-500 font-sans">Select</span>
                </button>
              ))}
            </div>

            {/* Right: Uses / Definitions */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                2. Connect to Scientific Use:
              </span>
              {formulaItems.map((item) => {
                const matchedFormula = formulaItems.find((f) => f.id === item.matchedId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMatchWithUse(item.id)}
                    className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 text-left transition flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-200">{item.use}</span>
                    {matchedFormula ? (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {matchedFormula.formula}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-600 italic">Empty Slot</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setFormulaItems(initialFormulaMatches);
                setSelectedFormula(null);
                setFeedback(null);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Matches
            </button>

            <button
              type="button"
              onClick={checkFormulas}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer"
            >
              Verify Matches (+50 XP)
            </button>
          </div>
        </div>
      )}

      {/* Activity 3: Anatomical Organ Placement */}
      {activeActivity === 'organs' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div>
            <h4 className="text-sm font-bold text-white">
              🫀 Challenge: Position Vital Organs into Body Cavities
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an organ from the bank below, then click its correct body cavity target slot.
            </p>
          </div>

          {/* Organ Bank */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-xs font-bold text-slate-400 mb-2">Available Organ Bank:</span>
            <div className="flex flex-wrap gap-2">
              {organBank.length === 0 ? (
                <span className="text-xs text-slate-500 italic">All organs placed in cavity slots!</span>
              ) : (
                organBank.map((organ) => (
                  <button
                    key={organ}
                    type="button"
                    onClick={() => setSelectedOrganBankItem(organ)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedOrganBankItem === organ
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <span>{organ === 'Brain' ? '🧠' : organ === 'Heart' ? '🫀' : organ === 'Lungs' ? '🫁' : organ === 'Stomach' ? '🫄' : '🥩'}</span>
                    <span>{organ}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Cavity Slots */}
          <div className="space-y-2">
            {organTargets.map((target) => (
              <div
                key={target.id}
                onClick={() => handlePlaceOrgan(target.id)}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="text-xs font-bold text-slate-300">{target.label}</div>
                  <div className="text-[10px] text-slate-500">Target Cavity</div>
                </div>

                {organSlots[target.id] ? (
                  <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1">
                    {organSlots[target.id]}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-600 border border-dashed border-slate-700 px-3 py-1 rounded-lg">
                    {selectedOrganBankItem ? `Place ${selectedOrganBankItem} here` : 'Empty Slot'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setOrganBank(['Heart', 'Brain', 'Liver', 'Lungs', 'Stomach']);
                setOrganSlots({});
                setSelectedOrganBankItem(null);
                setFeedback(null);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Organs
            </button>

            <button
              type="button"
              onClick={checkOrgans}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer"
            >
              Verify Anatomical Positions (+50 XP)
            </button>
          </div>
        </div>
      )}

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs font-medium flex items-start gap-2.5 animate-fadeIn ${
            feedback.isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}
        >
          {feedback.isCorrect ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          )}
          <div>{feedback.message}</div>
        </div>
      )}
    </div>
  );
};
