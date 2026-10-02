import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface ChemistryLabProps {
  onEarnXp?: (amount: number) => void;
}

interface AtomItem {
  id: string;
  symbol: 'H' | 'C' | 'N' | 'O' | 'Na' | 'Cl';
  x: number;
  y: number;
}

interface BondItem {
  id: string;
  fromId: string;
  toId: string;
  order: 1 | 2 | 3;
}

const ELEMENT_INFO = {
  H: { name: 'Hydrogen', maxValence: 1, color: '#f8fafc', textColor: '#0f172a', radius: 18 },
  C: { name: 'Carbon', maxValence: 4, color: '#334155', textColor: '#f8fafc', radius: 24 },
  N: { name: 'Nitrogen', maxValence: 3, color: '#3b82f6', textColor: '#f8fafc', radius: 22 },
  O: { name: 'Oxygen', maxValence: 2, color: '#ef4444', textColor: '#f8fafc', radius: 22 },
  Na: { name: 'Sodium', maxValence: 1, color: '#a855f7', textColor: '#f8fafc', radius: 26 },
  Cl: { name: 'Chlorine', maxValence: 1, color: '#10b981', textColor: '#f8fafc', radius: 26 },
};

const PRESET_MOLECULES = [
  {
    name: 'Water (H₂O)',
    formula: 'H₂O',
    atoms: [
      { symbol: 'O', x: 250, y: 160 },
      { symbol: 'H', x: 190, y: 220 },
      { symbol: 'H', x: 310, y: 220 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
    info: 'Polar covalent bond with 104.5° bond angle creating life-giving universal solvent.',
  },
  {
    name: 'Methane (CH₄)',
    formula: 'CH₄',
    atoms: [
      { symbol: 'C', x: 250, y: 180 },
      { symbol: 'H', x: 250, y: 100 },
      { symbol: 'H', x: 170, y: 180 },
      { symbol: 'H', x: 330, y: 180 },
      { symbol: 'H', x: 250, y: 260 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    info: 'Tetrahedral geometry with sp³ hybridization; primary component of natural gas.',
  },
  {
    name: 'Carbon Dioxide (CO₂)',
    formula: 'CO₂',
    atoms: [
      { symbol: 'C', x: 250, y: 180 },
      { symbol: 'O', x: 140, y: 180 },
      { symbol: 'O', x: 360, y: 180 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
    ],
    info: 'Linear geometry with two double covalent bonds; essential greenhouse gas.',
  },
  {
    name: 'Table Salt (NaCl)',
    formula: 'NaCl',
    atoms: [
      { symbol: 'Na', x: 200, y: 180 },
      { symbol: 'Cl', x: 300, y: 180 },
    ],
    bonds: [{ from: 0, to: 1, order: 1 }],
    info: 'Ionic electrostatic lattice bond where Na transfers 1 electron to Cl.',
  },
];

export const ChemistryLab: React.FC<ChemistryLabProps> = ({ onEarnXp }) => {
  const [atoms, setAtoms] = useState<AtomItem[]>([
    { id: 'a1', symbol: 'O', x: 250, y: 160 },
    { id: 'a2', symbol: 'H', x: 190, y: 220 },
    { id: 'a3', symbol: 'H', x: 310, y: 220 },
  ]);

  const [bonds, setBonds] = useState<BondItem[]>([
    { id: 'b1', fromId: 'a1', toId: 'a2', order: 1 },
    { id: 'b2', fromId: 'a1', toId: 'a3', order: 1 },
  ]);

  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [bondTypeToCreate, setBondTypeToCreate] = useState<1 | 2 | 3>(1);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Count bonded valence per atom
  const getAtomBondCount = (atomId: string) => {
    let count = 0;
    bonds.forEach((b) => {
      if (b.fromId === atomId || b.toId === atomId) {
        count += b.order;
      }
    });
    return count;
  };

  // Add new atom to workspace
  const handleAddAtom = (symbol: AtomItem['symbol']) => {
    const newId = `a-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newAtom: AtomItem = {
      id: newId,
      symbol,
      x: 180 + Math.random() * 160,
      y: 120 + Math.random() * 120,
    };
    setAtoms((prev) => [...prev, newAtom]);
  };

  // Handle clicking an atom: if none selected, select it; if another selected, toggle bond!
  const handleAtomClick = (clickedId: string) => {
    if (!selectedAtomId) {
      setSelectedAtomId(clickedId);
      return;
    }

    if (selectedAtomId === clickedId) {
      setSelectedAtomId(null);
      return;
    }

    // Check if bond already exists between the two
    const existingIndex = bonds.findIndex(
      (b) =>
        (b.fromId === selectedAtomId && b.toId === clickedId) ||
        (b.fromId === clickedId && b.toId === selectedAtomId)
    );

    if (existingIndex >= 0) {
      // Toggle bond order or remove
      const existing = bonds[existingIndex];
      if (existing.order < 3) {
        const updated = [...bonds];
        updated[existingIndex] = { ...existing, order: (existing.order + 1) as 1 | 2 | 3 };
        setBonds(updated);
      } else {
        // remove bond
        setBonds(bonds.filter((_, idx) => idx !== existingIndex));
      }
    } else {
      // Create new bond
      const newBond: BondItem = {
        id: `b-${Date.now()}`,
        fromId: selectedAtomId,
        toId: clickedId,
        order: bondTypeToCreate,
      };
      setBonds([...bonds, newBond]);
    }

    setSelectedAtomId(null);
  };

  const handleClear = () => {
    setAtoms([]);
    setBonds([]);
    setSelectedAtomId(null);
    setAiExplanation(null);
  };

  const handleLoadPreset = (preset: (typeof PRESET_MOLECULES)[0]) => {
    const idMap: { [key: number]: string } = {};
    const newAtoms: AtomItem[] = preset.atoms.map((a, i) => {
      const id = `preset-${i}-${Date.now()}`;
      idMap[i] = id;
      return { id, symbol: a.symbol as AtomItem['symbol'], x: a.x, y: a.y };
    });

    const newBonds: BondItem[] = preset.bonds.map((b, i) => ({
      id: `preset-bond-${i}-${Date.now()}`,
      fromId: idMap[b.from],
      toId: idMap[b.to],
      order: b.order as 1 | 2 | 3,
    }));

    setAtoms(newAtoms);
    setBonds(newBonds);
    setSelectedAtomId(null);
    setAiExplanation(preset.info);
    onEarnXp?.(20);
  };

  // Determine current formula summary
  const getFormulaSummary = () => {
    const counts: { [key: string]: number } = {};
    atoms.forEach((a) => {
      counts[a.symbol] = (counts[a.symbol] || 0) + 1;
    });

    const order = ['C', 'H', 'N', 'O', 'Na', 'Cl'];
    const parts = order
      .filter((sym) => counts[sym])
      .map((sym) => `${sym}${counts[sym] > 1 ? counts[sym] : ''}`);

    return parts.join('') || 'Empty';
  };

  // Check valence satisfaction
  const isAllValenceSatisfied = atoms.length > 0 && atoms.every((a) => {
    const current = getAtomBondCount(a.id);
    const max = ELEMENT_INFO[a.symbol].maxValence;
    return current === max;
  });

  const handleAiAnalyze = async () => {
    try {
      setLoadingAi(true);
      const res = await fetch('/api/lab-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labType: 'Chemistry Molecule Builder & Octet Satisfaction',
          parameters: {
            formula: getFormulaSummary(),
            atomCount: atoms.length,
            bondCount: bonds.length,
            allValenceSatisfied: isAllValenceSatisfied,
          },
          stateDescription: `Current molecule has formula ${getFormulaSummary()} with ${
            atoms.length
          } atoms and ${bonds.length} covalent/ionic bonds.`,
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
          <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-2xl">
            🧪
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Virtual Chemistry Lab: Molecule Builder & Bond Mechanics
            </h3>
            <p className="text-xs text-slate-400">
              Combine elements, connect single/double/triple bonds, and test octet stability.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Clear Workspace"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Builder Canvas on Left, Element Tools on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl relative min-h-[440px]">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-mono text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                Formula: {getFormulaSummary()}
              </span>
              {isAllValenceSatisfied ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Stable Octet
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Incomplete Valence
                </span>
              )}
            </div>

            <span className="text-slate-400 text-[11px]">
              {selectedAtomId ? 'Click another atom to connect bond' : 'Click atom to start bond'}
            </span>
          </div>

          {/* SVG Workspace */}
          <div className="flex-1 w-full relative overflow-hidden rounded-xl bg-slate-950 border border-slate-800/60">
            <svg viewBox="0 0 500 360" className="w-full h-full select-none">
              <defs>
                <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid dots */}
              <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="#334155" opacity="0.6" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />

              {/* Draw Bonds */}
              {bonds.map((bond) => {
                const a1 = atoms.find((a) => a.id === bond.fromId);
                const a2 = atoms.find((a) => a.id === bond.toId);
                if (!a1 || !a2) return null;

                const dx = a2.x - a1.x;
                const dy = a2.y - a1.y;
                const dist = Math.hypot(dx, dy);
                if (dist === 0) return null;

                // Normal vector for multiple parallel bond lines
                const nx = -dy / dist;
                const ny = dx / dist;

                if (bond.order === 1) {
                  return (
                    <line
                      key={bond.id}
                      x1={a1.x}
                      y1={a1.y}
                      x2={a2.x}
                      y2={a2.y}
                      stroke="#94a3b8"
                      strokeWidth={4}
                      strokeLinecap="round"
                    />
                  );
                }

                if (bond.order === 2) {
                  const offset = 4;
                  return (
                    <g key={bond.id}>
                      <line
                        x1={a1.x + nx * offset}
                        y1={a1.y + ny * offset}
                        x2={a2.x + nx * offset}
                        y2={a2.y + ny * offset}
                        stroke="#94a3b8"
                        strokeWidth={3}
                        strokeLinecap="round"
                      />
                      <line
                        x1={a1.x - nx * offset}
                        y1={a1.y - ny * offset}
                        x2={a2.x - nx * offset}
                        y2={a2.y - ny * offset}
                        stroke="#94a3b8"
                        strokeWidth={3}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                }

                if (bond.order === 3) {
                  const offset = 6;
                  return (
                    <g key={bond.id}>
                      <line
                        x1={a1.x}
                        y1={a1.y}
                        x2={a2.x}
                        y2={a2.y}
                        stroke="#94a3b8"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                      <line
                        x1={a1.x + nx * offset}
                        y1={a1.y + ny * offset}
                        x2={a2.x + nx * offset}
                        y2={a2.y + ny * offset}
                        stroke="#94a3b8"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                      <line
                        x1={a1.x - nx * offset}
                        y1={a1.y - ny * offset}
                        x2={a2.x - nx * offset}
                        y2={a2.y - ny * offset}
                        stroke="#94a3b8"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                }

                return null;
              })}

              {/* Draw Atoms */}
              {atoms.map((atom) => {
                const info = ELEMENT_INFO[atom.symbol];
                const currentValence = getAtomBondCount(atom.id);
                const isSatisfied = currentValence === info.maxValence;
                const isSelected = selectedAtomId === atom.id;

                return (
                  <g
                    key={atom.id}
                    onClick={() => handleAtomClick(atom.id)}
                    className="cursor-pointer group"
                    style={{ transition: 'transform 0.15s ease' }}
                  >
                    {/* Glow when selected */}
                    {isSelected && (
                      <circle
                        cx={atom.x}
                        cy={atom.y}
                        r={info.radius + 10}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={2.5}
                        strokeDasharray="4 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${atom.x}px ${atom.y}px` }}
                      />
                    )}

                    {/* Atom sphere */}
                    <circle
                      cx={atom.x}
                      cy={atom.y}
                      r={info.radius}
                      fill={info.color}
                      stroke={isSelected ? '#38bdf8' : isSatisfied ? '#10b981' : '#f59e0b'}
                      strokeWidth={2.5}
                    />

                    {/* Atom symbol */}
                    <text
                      x={atom.x}
                      y={atom.y + 5}
                      fill={info.textColor}
                      fontWeight="bold"
                      fontSize={info.radius > 22 ? '14' : '12'}
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {atom.symbol}
                    </text>

                    {/* Small valence badge */}
                    <circle
                      cx={atom.x + info.radius - 4}
                      cy={atom.y - info.radius + 4}
                      r={6}
                      fill={isSatisfied ? '#059669' : '#d97706'}
                    />
                    <text
                      x={atom.x + info.radius - 4}
                      y={atom.y - info.radius + 7}
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {currentValence}/{info.maxValence}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Tip: Click atom 1, then atom 2 to build or toggle single, double, & triple bonds.</span>
            <span>Atoms: {atoms.length}</span>
          </div>
        </div>

        {/* Right: Atom Palette, Presets, and AI Analysis */}
        <div className="lg:col-span-4 space-y-4">
          {/* Add Elements Palette */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Add Atom to Builder
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(ELEMENT_INFO) as (keyof typeof ELEMENT_INFO)[]).map((sym) => {
                const el = ELEMENT_INFO[sym];
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => handleAddAtom(sym)}
                    className="p-2.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 flex flex-col items-center justify-center transition hover:border-indigo-500/50"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1"
                      style={{ backgroundColor: el.color, color: el.textColor }}
                    >
                      {sym}
                    </span>
                    <span className="text-[11px] font-bold text-white">{el.name}</span>
                    <span className="text-[9px] text-slate-400 font-mono">Valence {el.maxValence}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Sample Molecules
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_MOLECULES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadPreset(preset)}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-left border border-slate-700/70 transition"
                >
                  <div className="text-xs font-bold text-white">{preset.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">{preset.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Bond Analysis */}
          <button
            type="button"
            disabled={loadingAi || atoms.length === 0}
            onClick={handleAiAnalyze}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition cursor-pointer ${
              atoms.length > 0 && !loadingAi
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {loadingAi ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                Analyzing Valence & Orbital Hybridization...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Explain Chemical Reaction & Stability (+30 XP)
              </>
            )}
          </button>

          {/* AI Explanation Box */}
          {aiExplanation && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs text-slate-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4" /> Molecular Analysis:
              </div>
              <div className="whitespace-pre-line leading-relaxed text-slate-300">
                {aiExplanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
