import React, { useState } from 'react';
import { DailyMission, AvatarConfig } from '../types';
import { INITIAL_MISSIONS } from '../data/initialData';
import { CheckCircle2, Flame, Award, Sparkles, Shield, Gift } from 'lucide-react';

interface DailyMissionsCardProps {
  avatar: AvatarConfig;
  onClaimMissionReward: (missionId: string, xpReward: number) => void;
  onClaimDailyStreakReward: () => void;
}

export const DailyMissionsCard: React.FC<DailyMissionsCardProps> = ({
  avatar,
  onClaimMissionReward,
  onClaimDailyStreakReward,
}) => {
  const [missions, setMissions] = useState<DailyMission[]>(INITIAL_MISSIONS);
  const [streakClaimed, setStreakClaimed] = useState(false);

  const handleClaim = (mission: DailyMission) => {
    onClaimMissionReward(mission.id, mission.xpReward);
    setMissions((prev) =>
      prev.map((m) => (m.id === mission.id ? { ...m, completed: true, progress: m.target } : m))
    );
  };

  const handleStreakReward = () => {
    if (streakClaimed) return;
    setStreakClaimed(true);
    onClaimDailyStreakReward();
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left: Streak Tracker & Daily Reward */}
      <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/30 shadow-xl space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xl">
                🔥
              </span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {avatar.streakDays}-Day Learning Streak!
                </h3>
                <p className="text-[11px] text-slate-400">Keep learning every day to boost your XP multiplier</p>
              </div>
            </div>
          </div>

          {/* 7-Day Weekly Streak Dots */}
          <div className="mt-4 pt-1">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              This Week's Activity
            </span>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysOfWeek.map((day, idx) => {
                const isPassedOrToday = idx <= 6; // all 7 active for a 7-day streak
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono">{day}</span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                        isPassedOrToday
                          ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 shadow-md shadow-orange-500/30'
                          : 'bg-slate-800 text-slate-600'
                      }`}
                    >
                      {isPassedOrToday ? '🔥' : '○'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Claim daily streak bonus button */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <div className="font-bold text-white">Daily Streak Reward</div>
              <div className="text-slate-400 text-[10px]">+50 XP & +25 Learning Coins</div>
            </div>
          </div>

          <button
            type="button"
            disabled={streakClaimed}
            onClick={handleStreakReward}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              streakClaimed
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-md shadow-orange-500/20'
            }`}
          >
            {streakClaimed ? 'Claimed Today' : 'Claim Reward'}
          </button>
        </div>
      </div>

      {/* Right: Daily Mission Checklist */}
      <div className="md:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xl">
              🎯
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Today's STEM Missions</h3>
              <p className="text-[11px] text-slate-400">Complete missions to earn learning points & level up</p>
            </div>
          </div>

          <span className="text-xs text-indigo-400 font-semibold font-mono">
            {missions.filter((m) => m.progress >= m.target).length}/{missions.length} Ready
          </span>
        </div>

        <div className="space-y-2.5">
          {missions.map((m) => {
            const isReadyToClaim = m.progress >= m.target;

            return (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {m.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{m.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Progress: {m.progress} / {m.target}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-amber-400 font-bold text-[11px]">
                    +{m.xpReward} XP
                  </span>

                  {m.completed ? (
                    <span className="text-[10px] font-bold text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  ) : isReadyToClaim ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(m)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition shadow-sm"
                    >
                      Claim XP
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500 italic">In progress</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
