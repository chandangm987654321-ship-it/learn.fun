import React, { useState } from 'react';
import { AvatarConfig, Badge } from '../types';
import { StudentAvatarSvg } from './StudentAvatarSvg';
import { X, Check, Sparkles, Award, Lock, Palette, User, Shield } from 'lucide-react';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: AvatarConfig;
  badges: Badge[];
  onSaveAvatar: (newConfig: AvatarConfig) => void;
  onOpenShop: () => void;
}

const SKIN_TONES = [
  { name: 'Fair', value: '#FDDFD0' },
  { name: 'Peach', value: '#F3C59D' },
  { name: 'Golden', value: '#E0A370' },
  { name: 'Caramel', value: '#B27A4B' },
  { name: 'Deep Bronze', value: '#79472B' },
  { name: 'Espresso', value: '#4A2A18' },
];

const HAIR_COLORS = [
  { name: 'Jet Black', value: '#242424' },
  { name: 'Dark Brown', value: '#4A3728' },
  { name: 'Chestnut', value: '#7B3F00' },
  { name: 'Golden Blonde', value: '#D4AF37' },
  { name: 'Cyber Cyan', value: '#06b6d4' },
  { name: 'Neon Purple', value: '#a855f7' },
];

const HAIR_STYLES: { id: AvatarConfig['hairStyle']; name: string }[] = [
  { id: 'space-fade', name: 'Space Fade' },
  { id: 'curly', name: 'Curly Waves' },
  { id: 'short', name: 'Smart Part' },
  { id: 'long', name: 'Flowing Locks' },
  { id: 'buzz', name: 'Cosmic Buzz' },
];

const OUTFITS: { id: AvatarConfig['outfit']; name: string; icon: string }[] = [
  { id: 'lab-coat', name: 'Physicist Lab Coat', icon: '🥼' },
  { id: 'space-suit', name: 'Astronaut EVA Suit', icon: '🧑‍🚀' },
  { id: 'cyber-hoodie', name: 'Quantum Cyber Hoodie', icon: '🧥' },
  { id: 'scholar-robe', name: 'Alchemist Scholar Robe', icon: '🧙‍♂️' },
  { id: 'varsity', name: 'STEM Varsity Jacket', icon: '🎽' },
];

const ACCESSORIES: { id: AvatarConfig['accessory']; name: string; icon: string }[] = [
  { id: 'none', name: 'None', icon: '✖️' },
  { id: 'glasses', name: 'STEM Optics Glasses', icon: '👓' },
  { id: 'vr-headset', name: 'Holo-Lab VR Visor', icon: '🥽' },
  { id: 'space-helmet', name: 'Bubble Space Helmet', icon: '🪖' },
  { id: 'drone-pet', name: 'AI Companion Drone', icon: '🛸' },
];

const BACKGROUNDS: { id: AvatarConfig['background']; name: string; icon: string }[] = [
  { id: 'quantum-lab', name: 'Quantum Particle Lab', icon: '⚛️' },
  { id: 'cosmos', name: 'Deep Space Nebula', icon: '🌌' },
  { id: 'observatory', name: 'Mauna Kea Observatory', icon: '🔭' },
  { id: 'bio-dome', name: 'Martian Bio-Dome', icon: '🌿' },
  { id: 'cyber-campus', name: 'Neo-Tokyo Campus', icon: '🌆' },
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  avatar,
  badges,
  onSaveAvatar,
  onOpenShop,
}) => {
  const [current, setCurrent] = useState<AvatarConfig>({ ...avatar });
  const [activeTab, setActiveTab] = useState<'look' | 'gear' | 'badges'>('look');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveAvatar(current);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xl">
              🧑‍🚀
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Student Avatar Lab
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Level {current.level} Scholar
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Customize your STEM avatar, equip unlocked lab gear, and showcase your badges.
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

        {/* Content Body: Left Preview, Right Controls */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Avatar Preview Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
            <div className="relative mb-4 group">
              <StudentAvatarSvg avatar={current} size={180} />
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-900/90 text-amber-300 border border-amber-500/40 shadow-lg flex items-center gap-1.5">
                  🔥 {current.streakDays}-Day Streak
                </span>
              </div>
            </div>

            <div className="w-full mt-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Explorer Handle
              </label>
              <input
                type="text"
                value={current.name}
                onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                className="w-full text-center font-bold text-slate-100 bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Student Name"
              />
            </div>

            {/* Quick Level & XP Bar */}
            <div className="w-full mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-left">
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>Science Explorer</span>
                <span className="text-indigo-400">{current.xp} / 500 XP</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (current.xp / 500) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">🪙 {current.coins} Learning Coins</span>
                <button
                  type="button"
                  onClick={onOpenShop}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Visit Reward Shop →
                </button>
              </div>
            </div>
          </div>

          {/* Customization Tabs & Selectors */}
          <div className="md:col-span-7 flex flex-col">
            {/* Tab navigation */}
            <div className="flex gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('look')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition ${
                  activeTab === 'look'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" /> Appearance
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gear')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition ${
                  activeTab === 'gear'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" /> Gear & Lab
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('badges')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition ${
                  activeTab === 'badges'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Badges ({badges.filter((b) => b.unlocked).length})
              </button>
            </div>

            {/* Tab 1: Appearance */}
            {activeTab === 'look' && (
              <div className="space-y-4">
                {/* Skin tone */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Skin Tone</label>
                  <div className="flex flex-wrap gap-2.5">
                    {SKIN_TONES.map((tone) => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() => setCurrent({ ...current, skinTone: tone.value })}
                        className={`w-9 h-9 rounded-full transition-transform border-2 relative ${
                          current.skinTone === tone.value
                            ? 'scale-110 border-indigo-400 shadow-md ring-2 ring-indigo-500/50'
                            : 'border-slate-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: tone.value }}
                        title={tone.name}
                      >
                        {current.skinTone === tone.value && (
                          <Check className="w-4 h-4 text-slate-900 absolute inset-0 m-auto stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Style */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Hair Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {HAIR_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setCurrent({ ...current, hairStyle: style.id })}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                          current.hairStyle === style.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Hair Color</label>
                  <div className="flex flex-wrap gap-2.5">
                    {HAIR_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setCurrent({ ...current, hairColor: c.value })}
                        className={`w-9 h-9 rounded-full transition-transform border-2 relative ${
                          current.hairColor === c.value
                            ? 'scale-110 border-white shadow-md ring-2 ring-indigo-500/50'
                            : 'border-slate-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      >
                        {current.hairColor === c.value && (
                          <Check className="w-4 h-4 text-white absolute inset-0 m-auto stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Gear & Lab Backgrounds */}
            {activeTab === 'gear' && (
              <div className="space-y-4">
                {/* Outfits */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Outfit</label>
                  <div className="grid grid-cols-2 gap-2">
                    {OUTFITS.map((out) => {
                      const isUnlocked = current.unlockedOutfits.includes(out.id);
                      return (
                        <button
                          key={out.id}
                          type="button"
                          onClick={() => isUnlocked && setCurrent({ ...current, outfit: out.id })}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                            current.outfit === out.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                              : isUnlocked
                              ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                              : 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{out.icon}</span>
                            <span className="text-xs">{out.name}</span>
                          </div>
                          {!isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-500" />
                          ) : current.outfit === out.id ? (
                            <Check className="w-4 h-4 text-indigo-400 stroke-[3]" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Headgear & Accessories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ACCESSORIES.map((acc) => {
                      const isUnlocked = current.unlockedAccessories.includes(acc.id);
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => isUnlocked && setCurrent({ ...current, accessory: acc.id })}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                            current.accessory === acc.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                              : isUnlocked
                              ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                              : 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{acc.icon}</span>
                            <span className="text-xs">{acc.name}</span>
                          </div>
                          {!isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-500" />
                          ) : current.accessory === acc.id ? (
                            <Check className="w-4 h-4 text-indigo-400 stroke-[3]" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Backgrounds */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Lab & Space Backdrop</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BACKGROUNDS.map((bg) => {
                      const isUnlocked = current.unlockedBackgrounds.includes(bg.id);
                      return (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => isUnlocked && setCurrent({ ...current, background: bg.id })}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                            current.background === bg.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                              : isUnlocked
                              ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                              : 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{bg.icon}</span>
                            <span className="text-xs">{bg.name}</span>
                          </div>
                          {!isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-500" />
                          ) : current.background === bg.id ? (
                            <Check className="w-4 h-4 text-indigo-400 stroke-[3]" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Badges */}
            {activeTab === 'badges' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Earn learning badges by taking quizzes, maintaining daily streaks, and running virtual experiments!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {badges.map((b) => (
                    <div
                      key={b.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                        b.unlocked
                          ? 'bg-slate-800/80 border-slate-700 shadow-sm'
                          : 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
                          b.unlocked ? `bg-gradient-to-br ${b.color}` : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {b.unlocked ? b.icon : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{b.name}</h4>
                          {b.unlocked && (
                            <span className="text-[10px] text-emerald-400 font-semibold">Unlocked</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenShop}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Unlock more gear in Reward Shop
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
