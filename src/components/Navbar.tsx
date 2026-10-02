import React, { useState } from 'react';
import { AvatarConfig } from '../types';
import { StudentAvatarSvg } from './StudentAvatarSvg';
import {
  BookOpen,
  Camera,
  Compass,
  Bot,
  Swords,
  Brain,
  Map,
  BarChart2,
  Gift,
  Trophy,
  Users,
  Flame,
  LayoutDashboard,
  ShieldCheck,
  Rocket,
  Calendar,
  Radio,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export type NavTab =
  // School Campus Tabs
  | 'school-dashboard'
  | 'digital-id'
  | 'projects'
  | 'trophy-cabinet'
  | 'calendar'
  | 'live-events'
  | 'teacher-center'
  | 'parent-portal'
  // STEM & Virtual Lab Tabs
  | 'lessons'
  | 'photo-solver'
  | 'virtual-labs'
  | 'omni-tutor'
  | 'challenges'
  | 'drag-drop'
  | 'adventure'
  | 'progress';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  avatar: AvatarConfig;
  onOpenAvatarModal: () => void;
  onOpenShopModal: () => void;
  onOpenLeaderboardModal: () => void;
  onOpenLiveClassModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  avatar,
  onOpenAvatarModal,
  onOpenShopModal,
  onOpenLeaderboardModal,
  onOpenLiveClassModal,
}) => {
  // Determine if active tab belongs to school or stem
  const isSchoolTab = [
    'school-dashboard',
    'digital-id',
    'projects',
    'trophy-cabinet',
    'calendar',
    'live-events',
    'teacher-center',
    'parent-portal',
  ].includes(currentTab);

  const [activeSection, setActiveSection] = useState<'school' | 'stem'>(
    isSchoolTab ? 'school' : 'stem'
  );

  const schoolTabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'school-dashboard', label: 'Live Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'digital-id', label: 'Digital ID', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Robotics Showcase', icon: <Rocket className="w-3.5 h-3.5" /> },
    { id: 'trophy-cabinet', label: 'Trophy Cabinet', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'calendar', label: 'School Calendar', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'live-events', label: 'Live Events', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'teacher-center', label: 'Teacher Center', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'parent-portal', label: 'Parent Portal', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  const stemTabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'lessons', label: 'Lessons', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'photo-solver', label: 'Snap & Solve', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 'virtual-labs', label: 'Virtual Labs', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'omni-tutor', label: 'OmniTutor AI', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'challenges', label: 'Arena & Quizzes', icon: <Swords className="w-3.5 h-3.5" /> },
    { id: 'drag-drop', label: 'Drag & Drop', icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'adventure', label: 'Adventure Map', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'progress', label: 'Progress Map', icon: <BarChart2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & Section Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-indigo-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/25">
            Ω
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-tight">
                Apex<span className="text-sky-400">Academy</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-300 font-mono font-bold border border-sky-500/20 hidden sm:inline">
                CAMPUS & LABS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Digital School ID • Live Dashboard • STEM Labs & Trophies
            </p>
          </div>
        </div>

        {/* Center Section Mode Toggle: School Campus vs STEM Virtual Labs */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-700/80 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveSection('school');
              onSelectTab('school-dashboard');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeSection === 'school'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏫</span>
            <span>School Campus</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveSection('stem');
              onSelectTab('lessons');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeSection === 'stem'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🧪</span>
            <span>STEM & Virtual Labs</span>
          </button>
        </div>

        {/* Global Student Stats & Modals */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Flame */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-orange-500/30 text-amber-300 font-bold text-xs shadow-inner"
            title={`${avatar.streakDays}-Day Learning Streak!`}
          >
            <span className="text-base">🔥</span>
            <span>{avatar.streakDays}d</span>
          </div>

          {/* Coins */}
          <button
            type="button"
            onClick={onOpenShopModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-bold text-xs hover:border-amber-400 transition"
            title="Learning Coins - Click to visit Reward Shop"
          >
            <span>🪙</span>
            <span>{avatar.coins}</span>
          </button>

          {/* Quick Links: Leaderboard & Live Class */}
          <button
            type="button"
            onClick={onOpenLeaderboardModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            title="Classroom Leaderboard"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
          </button>

          <button
            type="button"
            onClick={onOpenLiveClassModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            title="Live Classroom Room"
          >
            <Users className="w-4 h-4 text-sky-400" />
          </button>

          {/* Avatar Preview Button */}
          <button
            type="button"
            onClick={onOpenAvatarModal}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-400 transition cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
              <StudentAvatarSvg avatar={avatar} size={28} showBackground={false} />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition truncate max-w-[100px]">
                {avatar.name.split(' ')[0]}
              </div>
              <div className="text-[10px] text-indigo-400 font-semibold font-mono">
                Lvl {avatar.level}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation Bar (Dynamic by Section) */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1.5">
          {(activeSection === 'school' ? schoolTabs : stemTabs).map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  isActive
                    ? activeSection === 'school'
                      ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
