import React, { useState } from 'react';
import { LeaderboardEntry, AvatarConfig } from '../types';
import { INITIAL_LEADERBOARD } from '../data/initialData';
import { X, Trophy, Eye, EyeOff, Shield, Award, Flame } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: AvatarConfig;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  avatar,
}) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  if (!isOpen) return null;

  // Sync current user entry with live avatar data
  const entries: LeaderboardEntry[] = INITIAL_LEADERBOARD.map((e) =>
    e.isCurrentUser
      ? {
          ...e,
          name: isPrivate ? 'Anonymous Scholar (You)' : `${avatar.name} (You)`,
          level: avatar.level,
          xp: avatar.xp,
          streak: avatar.streakDays,
          badgesCount: avatar.unlockedBadges.length,
        }
      : e
  ).sort((a, b) => b.xp - a.xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xl">
              🏅
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Classroom Leaderboard
              </h2>
              <p className="text-xs text-slate-400">
                Friendly academic rankings honoring curiosity, streak consistency, and lab mastery.
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

        {/* Privacy Toggle Bar */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            Anti-Pressure Mode: Hide real name from public classroom board
          </span>

          <button
            type="button"
            onClick={() => setIsPrivate(!isPrivate)}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition ${
              isPrivate
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isPrivate ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {isPrivate ? 'Private Mode Active' : 'Public Profile'}
          </button>
        </div>

        {/* Leaderboard Table List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2.5">
          {entries.map((entry, idx) => {
            const isTop3 = idx < 3;
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;

            return (
              <div
                key={entry.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition ${
                  entry.isCurrentUser
                    ? 'bg-indigo-950/40 border-indigo-500/70 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                {/* Rank & User Info */}
                <div className="flex items-center gap-3">
                  <span className="w-7 text-center font-bold font-mono text-sm text-slate-400">
                    {medal || `#${idx + 1}`}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                    {entry.avatarOutfit === 'space-suit'
                      ? '🧑‍🚀'
                      : entry.avatarOutfit === 'cyber-hoodie'
                      ? '🧥'
                      : '🥼'}
                  </div>

                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{entry.name}</span>
                      {entry.isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Level {entry.level} Scholar</span>
                      <span>•</span>
                      <span className="text-amber-400 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-amber-500" /> {entry.streak}d streak
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Badges */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold text-sky-400 text-sm">{entry.xp} XP</div>
                    <div className="text-[10px] text-slate-500">{entry.badgesCount} Badges</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
