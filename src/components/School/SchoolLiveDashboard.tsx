import React from 'react';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_HOMEWORK,
  UPCOMING_EXAMS,
  DEFAULT_STUDENT_ID,
} from '../../data/schoolData';
import {
  Users,
  Bell,
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Flame,
} from 'lucide-react';

interface SchoolLiveDashboardProps {
  onNavigateTab?: (tabName: string) => void;
  onOpenExamPrep?: (subject: string) => void;
}

export const SchoolLiveDashboard: React.FC<SchoolLiveDashboardProps> = ({
  onNavigateTab,
  onOpenExamPrep,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Welcome & Campus Pulse Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-sky-950/60 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              🏫
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Campus Live Intelligence Center
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Welcome, {DEFAULT_STUDENT_ID.studentName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {DEFAULT_STUDENT_ID.grade} • {DEFAULT_STUDENT_ID.section} | Term 1 Academic Session
          </p>
        </div>

        {/* Live Attendance & House Stat Badges */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/40 text-left">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Today's Campus Attendance
            </div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              97.4% Present
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/40 text-left">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              House Standings
            </div>
            <div className="text-lg font-bold text-rose-400 font-mono mt-0.5 flex items-center gap-1">
              <span>🔥</span> 1st Place
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Announcements & Exams), Right Column (Homework & Achievements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Announcements & Upcoming Exams */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live School Announcements */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Bell className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white">Daily Campus Circulars & News</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Live Broadcast</span>
            </div>

            <div className="space-y-3">
              {INITIAL_ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{ann.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ann.badgeColor}`}
                    >
                      {ann.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                  <span className="text-[10px] text-slate-500 font-mono block">{ann.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Examinations Countdown */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Calendar className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white">Upcoming Examinations Timetable</h3>
              </div>
              <span className="text-[11px] text-sky-400 font-semibold">Midterm Term 1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {UPCOMING_EXAMS.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-sky-500/40 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold text-[10px]">
                        {exam.subject}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {exam.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">{exam.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      Syllabus: {exam.syllabus}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">{exam.room}</span>
                    <button
                      type="button"
                      onClick={() => onOpenExamPrep?.(exam.subject)}
                      className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
                    >
                      Revise →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Pending Homework & School Achievements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Homework Tracker */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white">Homework Pending</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                2 Pending
              </span>
            </div>

            <div className="space-y-3">
              {INITIAL_HOMEWORK.map((hw) => {
                const isSubmitted = hw.status === 'submitted';

                return (
                  <div
                    key={hw.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 hover:border-indigo-500/40 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate">{hw.title}</span>
                      {isSubmitted ? (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Submitted
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> Due Soon
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {hw.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>Due: {hw.dueDate}</span>
                      <span className="font-semibold text-slate-300">{hw.assignedBy}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* School Achievement Highlight Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-xl">🏆</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                School Pride
              </span>
            </div>

            <h4 className="text-sm font-bold text-white">
              National Robotics Champions 2026
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Apex Academy ranked #1 in national autonomous robotics research. Visit our Project Showcase & Trophy Cabinet to inspect student innovations!
            </p>

            <button
              type="button"
              onClick={() => onNavigateTab?.('trophy-cabinet')}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Trophy className="w-3.5 h-3.5" /> Open Digital Trophy Cabinet →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
