export type Subject = 'Physics' | 'Chemistry' | 'Maths' | 'Biology' | 'Computer Science';

export type ModelTier = 'fast' | 'general' | 'pro';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  modelUsed?: string;
  thinkingEnabled?: boolean;
}

export interface AvatarConfig {
  name: string;
  skinTone: string;
  hairStyle: 'short' | 'curly' | 'long' | 'buzz' | 'space-fade';
  hairColor: string;
  outfit: 'lab-coat' | 'space-suit' | 'cyber-hoodie' | 'scholar-robe' | 'varsity';
  accessory: 'none' | 'glasses' | 'vr-headset' | 'space-helmet' | 'drone-pet';
  background: 'cosmos' | 'quantum-lab' | 'observatory' | 'bio-dome' | 'cyber-campus';
  level: number;
  xp: number;
  coins: number;
  streakDays: number;
  unlockedBadges: string[];
  unlockedOutfits: string[];
  unlockedBackgrounds: string[];
  unlockedAccessories: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  icon: string;
  contentMarkdown?: string;
  relatedLab?: 'physics' | 'chemistry' | 'maths' | 'biology';
  sampleQuestion?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint1: string; // Nudge
  hint2: string; // Formula/Strategy
  hint3: string; // Guided Walkthrough
  hint4: string; // Full Answer
  subject?: Subject;
}

export interface DailyMission {
  id: string;
  title: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
  icon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'outfit' | 'background' | 'accessory';
  value: string;
  cost: number;
  icon: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface AdventureNode {
  id: string;
  chapter: number;
  title: string;
  subtitle: string;
  type: 'lesson' | 'lab' | 'quiz' | 'boss';
  completed: boolean;
  locked: boolean;
  xp: number;
  icon: string;
  subject: Subject;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarOutfit: string;
  avatarBg: string;
  level: number;
  xp: number;
  streak: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

// School Features Types
export interface DigitalSchoolId {
  studentName: string;
  studentId: string;
  grade: string;
  section: string;
  rollNo: number;
  house: 'Newton Phoenix' | 'Curie Cosmos' | 'Turing Titans' | 'Galileo Guardians';
  houseColor: string;
  attendancePct: number;
  academicYear: string;
  bloodGroup: string;
  emergencyContact: string;
  qrCodeData: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'Urgent' | 'Academic' | 'Robotics' | 'Sports' | 'Cultural';
  content: string;
  badgeColor: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  subject: Subject;
  dueDate: string;
  assignedBy: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description: string;
}

export interface UpcomingExam {
  id: string;
  subject: Subject;
  title: string;
  date: string;
  time: string;
  syllabus: string;
  room: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: 'Robotics' | 'AI & IoT' | 'Green STEM' | 'Biotech';
  team: string[];
  problem: string;
  solution: string;
  results: string;
  techStack: string[];
  status: 'Completed - 1st Prize' | 'In Progress' | 'Exhibition Winner';
  accentColor: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: 'exam' | 'holiday' | 'competition' | 'ptm' | 'event';
  location: string;
  description: string;
}

export interface TrophyCabinetItem {
  id: string;
  title: string;
  competition: string;
  category: 'Robotics' | 'Sports' | 'Academics' | 'Cultural';
  year: string;
  rank: '1st Place Gold' | 'State Champions' | 'National Finalist' | 'Best Innovation';
  description: string;
  icon: string;
  badgeColor: string;
}

export interface LiveEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: 'Live Now' | 'Upcoming' | 'Concluded';
  description: string;
  registered: boolean;
}

export interface TeacherAssignment {
  id: string;
  title: string;
  subject: Subject;
  grade: string;
  dueDate: string;
  submittedCount: number;
  totalStudents: number;
}

