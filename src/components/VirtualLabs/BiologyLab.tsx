import React, { useState } from 'react';
import { Sparkles, Heart, Activity, Wind, Zap, Dna, Info, CheckCircle2 } from 'lucide-react';

interface BiologyLabProps {
  onEarnXp?: (amount: number) => void;
}

interface OrganData {
  id: string;
  name: string;
  system: string;
  icon: string;
  color: string;
  svgHighlightCoords: { cx: number; cy: number; r: number };
  facts: string[];
  keyMolecules: string[];
  vitalImpact: string;
  description: string;
}

const ORGANS: OrganData[] = [
  {
    id: 'brain',
    name: 'Brain & Nervous System',
    system: 'Central Nervous System',
    icon: '🧠',
    color: '#ec4899',
    svgHighlightCoords: { cx: 200, cy: 75, r: 24 },
    facts: [
      'Contains ~86 billion neurons communicating via electrochemical synapses.',
      'Consumes 20% of the body’s total oxygen and glucose despite weighing only 2% of body mass.',
      'Cerebral cortex coordinates conscious thought, language, and sensory integration.',
    ],
    keyMolecules: ['Dopamine', 'Serotonin', 'GABA', 'Acetylcholine'],
    vitalImpact: 'Consciousness, motor coordination, EEG brainwaves (~10 Hz alpha rhythms)',
    description:
      'The central commander of the human organism, processing sensory streams and firing millisecond electrical action potentials across myelinated axons.',
  },
  {
    id: 'heart',
    name: 'Heart & Coronary Circuit',
    system: 'Cardiovascular System',
    icon: '🫀',
    color: '#ef4444',
    svgHighlightCoords: { cx: 215, cy: 165, r: 20 },
    facts: [
      'Four chambers: Right & Left Atria, Right & Left Ventricles.',
      'Sinoatrial (SA) node acts as natural pacemaker generating cardiac rhythm (~72 BPM).',
      'Left ventricle generates 120 mmHg systolic pressure to propel blood through aorta.',
    ],
    keyMolecules: ['Hemoglobin', 'Nitric Oxide', 'Cardiac Troponin', 'ATP'],
    vitalImpact: 'Cardiac Output: ~5.0 L/min, Blood Pressure: 120/80 mmHg',
    description:
      'A continuous muscular hydraulic pump beating ~100,000 times daily to supply oxygenated blood and essential nutrients to all 37 trillion human cells.',
  },
  {
    id: 'lungs',
    name: 'Lungs & Alveolar Network',
    system: 'Respiratory System',
    icon: '🫁',
    color: '#06b6d4',
    svgHighlightCoords: { cx: 185, cy: 160, r: 26 },
    facts: [
      'Over 500 million microscopic alveoli provide ~100 square meters of gas exchange surface area.',
      'Passive diffusion of O₂ into capillaries and CO₂ into alveolar space across thin membranes.',
      'Diaphragm contraction creates negative intrathoracic pressure to draw in air.',
    ],
    keyMolecules: ['Surfactant', 'Oxygen (O₂)', 'Carbon Dioxide (CO₂)'],
    vitalImpact: 'Respiration: 16 breaths/min, SpO₂: 98%',
    description:
      'The primary interface for external gas exchange, oxygenating hemoglobin and releasing metabolic carbon dioxide.',
  },
  {
    id: 'stomach',
    name: 'Stomach & Gastric Digestion',
    system: 'Gastrointestinal System',
    icon: '🫄',
    color: '#f59e0b',
    svgHighlightCoords: { cx: 220, cy: 215, r: 18 },
    facts: [
      'Secretes hydrochloric acid (HCl) producing an ultra-acidic pH between 1.5 and 2.0.',
      'Pepsin enzyme hydrolyzes dietary proteins into peptide chains.',
      'Mucus layer protects the stomach lining from self-digestion.',
    ],
    keyMolecules: ['Pepsinogen / Pepsin', 'Hydrochloric Acid (HCl)', 'Gastrin'],
    vitalImpact: 'Nutrient absorption and chemical breakdown of proteins',
    description:
      'A muscular digestive chamber that churns food into liquid chyme while sterilizing ingested pathogens with concentrated acid.',
  },
  {
    id: 'liver',
    name: 'Liver & Hepatic Metabolism',
    system: 'Metabolic & Digestive System',
    icon: '🥩',
    color: '#d97706',
    svgHighlightCoords: { cx: 180, cy: 215, r: 20 },
    facts: [
      'Largest internal organ performing over 500 vital biochemical functions.',
      'Synthesizes bile salts for lipid emulsification and stores glucose as glycogen.',
      'Detoxifies ammonia into urea and filters toxins from mesenteric blood.',
    ],
    keyMolecules: ['Glycogen', 'Albumin', 'Bile Salts', 'Cytochrome P450'],
    vitalImpact: 'Metabolic homeostasis, blood clotting factor synthesis',
    description:
      'The biochemical processing refinery of the body, controlling energy distribution and detoxifying circulation.',
  },
  {
    id: 'dna',
    name: 'Cellular Nucleus & DNA Helix',
    system: 'Genetics & Molecular Biology',
    icon: '🧬',
    color: '#8b5cf6',
    svgHighlightCoords: { cx: 200, cy: 270, r: 18 },
    facts: [
      'Double helix composed of 3.2 billion base pairs (Adenine-Thymine, Cytosine-Guanine).',
      'Transcribed into messenger RNA (mRNA) and translated by ribosomes into functional proteins.',
      'Histone proteins package 2 meters of linear DNA into a microscopic nucleus.',
    ],
    keyMolecules: ['Adenine', 'Thymine', 'Cytosine', 'Guanine', 'DNA Polymerase'],
    vitalImpact: 'Genetic inheritance, cellular replication, protein expression',
    description:
      'The fundamental operating code of life, directing cellular development, enzymatic synthesis, and biological heredity.',
  },
];

export const BiologyLab: React.FC<BiologyLabProps> = ({ onEarnXp }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganData>(ORGANS[1]); // Heart by default
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [pulseBeating, setPulseBeating] = useState<boolean>(true);

  const handleSelectOrgan = (organ: OrganData) => {
    setSelectedOrgan(organ);
    setAiExplanation(null);
  };

  const handleAiDeepDive = async () => {
    try {
      setLoadingAi(true);
      const res = await fetch('/api/lab-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labType: 'Human Body Anatomical & Physiological Explorer',
          parameters: {
            organName: selectedOrgan.name,
            system: selectedOrgan.system,
            keyMolecules: selectedOrgan.keyMolecules,
          },
          stateDescription: `Student is inspecting the ${selectedOrgan.name} in the Virtual Biology Lab.`,
        }),
      });
      const data = await res.json();
      setAiExplanation(data.explanation);
      onEarnXp?.(30);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-2xl">
            🧬
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Virtual Biology Lab: Interactive Anatomical Body Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Click on organs to examine physiological mechanics, biochemical pathways, and vital organ interactions.
            </p>
          </div>
        </div>

        {/* Live Vitals Telemetry */}
        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold">
            <Heart className={`w-3.5 h-3.5 ${pulseBeating ? 'animate-ping' : ''}`} />
            <span>72 BPM</span>
          </div>
          <div className="text-slate-700">|</div>
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <Wind className="w-3.5 h-3.5" />
            <span>16 / min</span>
          </div>
          <div className="text-slate-700">|</div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>SpO₂ 98%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Clickable Anatomical Body on Left, Organ Deep Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Anatomical Human Body SVG */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl relative items-center justify-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Click Any Organ on the Body:</span>
            <span className="text-[11px] text-indigo-400 font-mono">
              Selected: {selectedOrgan.name.split('&')[0]}
            </span>
          </div>

          <div className="relative w-full max-w-[320px] aspect-[1/1.5] flex items-center justify-center py-2">
            <svg viewBox="0 0 400 600" className="w-full h-full select-none">
              {/* Human Body Silhouette */}
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <radialGradient id="organGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Head */}
              <circle cx="200" cy="80" r="45" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2" />
              {/* Neck */}
              <rect x="188" y="122" width="24" height="20" rx="4" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2" />
              {/* Torso */}
              <path
                d="M 140,140 Q 200,130 260,140 L 270,300 Q 200,320 130,300 Z"
                fill="url(#bodyGrad)"
                stroke="#475569"
                strokeWidth="2"
              />
              {/* Shoulders & Arms */}
              <path d="M 140,140 L 95,250 L 80,360" fill="none" stroke="#475569" strokeWidth="20" strokeLinecap="round" />
              <path d="M 260,140 L 305,250 L 320,360" fill="none" stroke="#475569" strokeWidth="20" strokeLinecap="round" />
              {/* Legs */}
              <path d="M 165,305 L 155,440 L 150,570" fill="none" stroke="#475569" strokeWidth="28" strokeLinecap="round" />
              <path d="M 235,305 L 245,440 L 250,570" fill="none" stroke="#475569" strokeWidth="28" strokeLinecap="round" />

              {/* Spine skeleton line */}
              <line x1="200" y1="120" x2="200" y2="300" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />

              {/* Clickable Organ Hotspots */}
              {ORGANS.map((organ) => {
                const isSelected = selectedOrgan.id === organ.id;
                const coords = organ.svgHighlightCoords;

                return (
                  <g
                    key={organ.id}
                    onClick={() => handleSelectOrgan(organ)}
                    className="cursor-pointer group"
                  >
                    {/* Outer pulsation ring if selected */}
                    {isSelected && (
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r={coords.r + 10}
                        fill="none"
                        stroke={organ.color}
                        strokeWidth="2"
                        strokeDasharray="4 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${coords.cx}px ${coords.cy}px` }}
                      />
                    )}

                    {/* Organ Sphere */}
                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r={coords.r}
                      fill={organ.color}
                      opacity={isSelected ? 0.95 : 0.65}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-200 group-hover:scale-110"
                      style={{ transformOrigin: `${coords.cx}px ${coords.cy}px` }}
                    />

                    {/* Organ Emoji Icon in Center */}
                    <text
                      x={coords.cx}
                      y={coords.cy + 5}
                      fontSize="14"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {organ.icon}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full mt-2 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5 justify-center">
            {ORGANS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelectOrgan(o)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
                  selectedOrgan.id === o.id
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{o.icon}</span>
                <span>{o.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Organ Anatomy & Physiological Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            {/* Organ Title Card */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {selectedOrgan.icon}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedOrgan.name}</h3>
                  <span className="text-xs text-rose-400 font-semibold">{selectedOrgan.system}</span>
                </div>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {selectedOrgan.vitalImpact.split(',')[0]}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">{selectedOrgan.description}</p>

            {/* Key Facts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Physiological Mechanisms:
              </h4>
              <div className="space-y-1.5">
                {selectedOrgan.facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Molecules & Hormones */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Key Biomolecules & Enzymes:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedOrgan.keyMolecules.map((mol, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono font-semibold"
                  >
                    {mol}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Deep Dive Button */}
            <button
              type="button"
              disabled={loadingAi}
              onClick={handleAiDeepDive}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loadingAi ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  Consulting Medical & Cellular AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Ask AI to Explain {selectedOrgan.name.split(' ')[0]} Mechanisms (+30 XP)
                </>
              )}
            </button>

            {/* AI Deep Dive Content */}
            {aiExplanation && (
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 text-xs text-slate-200 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <Sparkles className="w-4 h-4" /> AI Physiological Deep Dive:
                </div>
                <div className="whitespace-pre-line leading-relaxed text-slate-300">
                  {aiExplanation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
