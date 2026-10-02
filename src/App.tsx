/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AvatarConfig, Badge, ShopItem, AdventureNode } from './types';
import { INITIAL_AVATAR, INITIAL_BADGES } from './data/initialData';
import { Navbar, NavTab } from './components/Navbar';
import { LessonExplainer } from './components/LessonExplainer';
import { PhotoSolver } from './components/PhotoSolver';
import { VirtualLabsHub } from './components/VirtualLabs/VirtualLabsHub';
import { OmniTutorChat } from './components/OmniTutorChat';
import { ChallengeMode } from './components/ChallengeMode';
import { DragDropQuestions } from './components/DragDropQuestions';
import { LearningAdventure } from './components/LearningAdventure';
import { SmartProgressMap } from './components/SmartProgressMap';
import { DailyMissionsCard } from './components/DailyMissionsCard';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { RewardShopModal } from './components/RewardShopModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { LiveClassroomModal } from './components/LiveClassroomModal';

// School Campus Components
import { SchoolLiveDashboard } from './components/School/SchoolLiveDashboard';
import { DigitalSchoolIdCard } from './components/School/DigitalSchoolIdCard';
import { ProjectShowcase } from './components/School/ProjectShowcase';
import { SchoolAchievementWall } from './components/School/SchoolAchievementWall';
import { SmartSchoolCalendar } from './components/School/SmartSchoolCalendar';
import { SchoolLiveEvents } from './components/School/SchoolLiveEvents';
import { TeacherCommandCenter } from './components/School/TeacherCommandCenter';
import { ParentPortal } from './components/School/ParentPortal';

import { Sparkles, Trophy, Award, Flame, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('school-dashboard');
  const [activeLabType, setActiveLabType] = useState<'physics' | 'chemistry' | 'maths' | 'biology'>('physics');

  // Avatar state with local storage fallback
  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    try {
      const saved = localStorage.getItem('omni_avatar');
      return saved ? JSON.parse(saved) : INITIAL_AVATAR;
    } catch {
      return INITIAL_AVATAR;
    }
  });

  // Badges state with local storage fallback
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('omni_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Modals state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isLiveClassModalOpen, setIsLiveClassModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('omni_avatar', JSON.stringify(avatar));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [avatar]);

  useEffect(() => {
    try {
      localStorage.setItem('omni_badges', JSON.stringify(badges));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [badges]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // XP & Coins handling
  const handleEarnXp = (amount: number) => {
    setAvatar((prev) => {
      const newXp = prev.xp + amount;
      const currentLevelThreshold = prev.level * 200;
      let newLevel = prev.level;

      if (newXp >= currentLevelThreshold) {
        newLevel += 1;
        showToast(`🎉 Level Up! You reached Level ${newLevel} Scholar! (+50 Bonus Coins)`);
      } else {
        showToast(`✨ +${amount} XP Earned!`);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        coins: prev.coins + (newLevel > prev.level ? 50 : 5),
      };
    });
  };

  const handleEarnCoins = (amount: number) => {
    setAvatar((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const handleUnlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          showToast(`🏆 Badge Unlocked: ${b.name}!`);
          setAvatar((a) => ({
            ...a,
            unlockedBadges: Array.from(new Set([...a.unlockedBadges, badgeId])),
            coins: a.coins + 100,
          }));
          return { ...b, unlocked: true, unlockedAt: 'Just now' };
        }
        return b;
      })
    );
  };

  const handleUnlockShopItem = (item: ShopItem) => {
    if (avatar.coins < item.cost) return;

    setAvatar((prev) => {
      const newCoins = prev.coins - item.cost;
      const nextOutfits =
        item.category === 'outfit'
          ? Array.from(new Set([...prev.unlockedOutfits, item.value]))
          : prev.unlockedOutfits;
      const nextBg =
        item.category === 'background'
          ? Array.from(new Set([...prev.unlockedBackgrounds, item.value]))
          : prev.unlockedBackgrounds;
      const nextAcc =
        item.category === 'accessory'
          ? Array.from(new Set([...prev.unlockedAccessories, item.value]))
          : prev.unlockedAccessories;

      return {
        ...prev,
        coins: newCoins,
        unlockedOutfits: nextOutfits,
        unlockedBackgrounds: nextBg,
        unlockedAccessories: nextAcc,
      };
    });

    showToast(`🎁 Unlocked ${item.name}! Check your Avatar Customizer.`);
  };

  const handleSaveAvatar = (newAvatar: AvatarConfig) => {
    setAvatar(newAvatar);
    showToast('🧑‍🚀 Avatar configuration saved!');
  };

  const handleClaimDailyStreakReward = () => {
    handleEarnXp(50);
    handleEarnCoins(25);
    showToast('🔥 Claimed daily streak reward! +50 XP & +25 Coins');
  };

  const handleClaimMissionReward = (missionId: string, xpReward: number) => {
    handleEarnXp(xpReward);
    handleEarnCoins(15);
  };

  const handleOpenLab = (labType: 'physics' | 'chemistry' | 'maths' | 'biology') => {
    setActiveLabType(labType);
    setCurrentTab('virtual-labs');
  };

  const handleStartAdventureNode = (node: AdventureNode) => {
    if (node.type === 'lab') {
      const mapped =
        node.subject === 'Physics'
          ? 'physics'
          : node.subject === 'Chemistry'
          ? 'chemistry'
          : node.subject === 'Biology'
          ? 'biology'
          : 'maths';
      handleOpenLab(mapped);
    } else if (node.type === 'boss' || node.type === 'quiz') {
      setCurrentTab('challenges');
    } else {
      setCurrentTab('lessons');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 p-3.5 rounded-2xl bg-indigo-600/90 text-white font-bold text-xs shadow-2xl backdrop-blur-md border border-indigo-400 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        avatar={avatar}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
        onOpenShopModal={() => setIsShopModalOpen(true)}
        onOpenLeaderboardModal={() => setIsLeaderboardModalOpen(true)}
        onOpenLiveClassModal={() => setIsLiveClassModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* ============ SCHOOL CAMPUS VIEWS ============ */}
        {currentTab === 'school-dashboard' && (
          <div className="space-y-8">
            <SchoolLiveDashboard
              onNavigateTab={(tab) => setCurrentTab(tab as NavTab)}
              onOpenExamPrep={(subject) => setCurrentTab('lessons')}
            />
            {/* Daily Mission Card */}
            <DailyMissionsCard
              avatar={avatar}
              onClaimMissionReward={handleClaimMissionReward}
              onClaimDailyStreakReward={handleClaimDailyStreakReward}
            />
          </div>
        )}

        {currentTab === 'digital-id' && (
          <DigitalSchoolIdCard avatar={avatar} />
        )}

        {currentTab === 'projects' && (
          <ProjectShowcase />
        )}

        {currentTab === 'trophy-cabinet' && (
          <SchoolAchievementWall />
        )}

        {currentTab === 'calendar' && (
          <SmartSchoolCalendar />
        )}

        {currentTab === 'live-events' && (
          <SchoolLiveEvents />
        )}

        {currentTab === 'teacher-center' && (
          <TeacherCommandCenter />
        )}

        {currentTab === 'parent-portal' && (
          <ParentPortal />
        )}

        {/* ============ STEM & VIRTUAL LAB VIEWS ============ */}
        {currentTab === 'lessons' && (
          <div className="space-y-8">
            <LessonExplainer
              onEarnXp={handleEarnXp}
              onOpenLab={handleOpenLab}
              onOpenTutorWithTopic={(topic) => {
                setCurrentTab('omni-tutor');
              }}
            />
            <DailyMissionsCard
              avatar={avatar}
              onClaimMissionReward={handleClaimMissionReward}
              onClaimDailyStreakReward={handleClaimDailyStreakReward}
            />
          </div>
        )}

        {currentTab === 'photo-solver' && (
          <PhotoSolver onEarnXp={handleEarnXp} />
        )}

        {currentTab === 'virtual-labs' && (
          <VirtualLabsHub
            onEarnXp={handleEarnXp}
            initialLab={activeLabType}
          />
        )}

        {currentTab === 'omni-tutor' && (
          <OmniTutorChat onEarnXp={handleEarnXp} />
        )}

        {currentTab === 'challenges' && (
          <ChallengeMode
            onEarnXp={handleEarnXp}
            onEarnCoins={handleEarnCoins}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {currentTab === 'drag-drop' && (
          <DragDropQuestions onEarnXp={handleEarnXp} />
        )}

        {currentTab === 'adventure' && (
          <LearningAdventure onStartNode={handleStartAdventureNode} />
        )}

        {currentTab === 'progress' && (
          <SmartProgressMap />
        )}
      </main>

      {/* Modals */}
      <AvatarCustomizerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        avatar={avatar}
        badges={badges}
        onSaveAvatar={handleSaveAvatar}
        onOpenShop={() => {
          setIsAvatarModalOpen(false);
          setIsShopModalOpen(true);
        }}
      />

      <RewardShopModal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
        avatar={avatar}
        onUnlockItem={handleUnlockShopItem}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        avatar={avatar}
      />

      <LiveClassroomModal
        isOpen={isLiveClassModalOpen}
        onClose={() => setIsLiveClassModalOpen(false)}
        onEarnXp={handleEarnXp}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">Apex Academy of STEM</span>
            <span>• Digital Campus, Smart Portals & Virtual Labs</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Powered by Gemini 3.1 Pro High-Thinking & AI School Assistant</span>
            <span>•</span>
            <span>4-Tier Socratic Hint Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
