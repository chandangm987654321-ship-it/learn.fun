import React, { useState } from 'react';
import { AvatarConfig, ShopItem } from '../types';
import { SHOP_ITEMS } from '../data/initialData';
import { X, Sparkles, Check, Lock, ShoppingBag } from 'lucide-react';

interface RewardShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: AvatarConfig;
  onUnlockItem: (item: ShopItem) => void;
}

export const RewardShopModal: React.FC<RewardShopModalProps> = ({
  isOpen,
  onClose,
  avatar,
  onUnlockItem,
}) => {
  const [filter, setFilter] = useState<'all' | 'outfit' | 'background' | 'accessory'>('all');

  if (!isOpen) return null;

  const items = SHOP_ITEMS.filter((item) => filter === 'all' || item.category === filter);

  const isUnlocked = (item: ShopItem) => {
    if (item.category === 'outfit') return avatar.unlockedOutfits.includes(item.value);
    if (item.category === 'background') return avatar.unlockedBackgrounds.includes(item.value);
    if (item.category === 'accessory') return avatar.unlockedAccessories.includes(item.value);
    return false;
  };

  const getRarityBadge = (rarity: ShopItem['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Rare':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xl">
              🎁
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Scholar Reward Shop
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  Earn points by learning
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Redeem your hard-earned learning coins for legendary suits, VR visors, and futuristic labs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-amber-500/30 text-amber-300 font-bold text-sm flex items-center gap-1.5 shadow-inner">
              🪙 <span>{avatar.coins} Coins</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex gap-2">
            {(['all', 'outfit', 'accessory', 'background'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                  filter === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Rewards' : `${cat}s`}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400">
            {items.length} items available
          </span>
        </div>

        {/* Item grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => {
            const unlocked = isUnlocked(item);
            const canAfford = avatar.coins >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  unlocked
                    ? 'bg-slate-900/60 border-slate-800/80'
                    : 'bg-slate-800/40 border-slate-700/80 hover:border-amber-500/40 hover:bg-slate-800/70 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                      {item.icon}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRarityBadge(
                        item.rarity
                      )}`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    🪙 {item.cost}
                  </div>

                  {unlocked ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Owned
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onUnlockItem(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {!canAfford ? <Lock className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                      {canAfford ? 'Unlock' : 'Need Coins'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Tip: Completing daily missions and answering quizzes awards bonus coins!
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-semibold"
          >
            Close Shop
          </button>
        </div>
      </div>
    </div>
  );
};
