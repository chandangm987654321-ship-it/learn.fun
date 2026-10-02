import React, { useState } from 'react';
import { TeacherAssignment } from '../../types';
import { TEACHER_ASSIGNMENTS_DATA } from '../../data/schoolData';
import { GraduationCap, Plus, Users, BookOpen, Send, CheckCircle2, Sparkles, FileText, Bell } from 'lucide-react';

export const TeacherCommandCenter: React.FC = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(TEACHER_ASSIGNMENTS_DATA);
  const [activeTab, setActiveTab] = useState<'assignments' | 'students' | 'announcements'>('assignments');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<'Physics' | 'Chemistry' | 'Maths' | 'Biology'>('Physics');
  const [newDueDate, setNewDueDate] = useState('Oct 10, 2026');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [announcementSent, setAnnouncementSent] = useState(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: TeacherAssignment = {
      id: `asg-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      grade: 'Class 9-A',
      dueDate: newDueDate,
      submittedCount: 0,
      totalStudents: 32,
    };

    setAssignments([created, ...assignments]);
    setNewTitle('');
  };

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setAnnouncementSent(true);
    setTimeout(() => {
      setAnnouncementSent(false);
      setBroadcastMsg('');
    }, 2500);
  };

  const studentRoster = [
    { name: 'Alex Explorer', rollNo: 14, attendance: '96.8%', avgScore: '94%', streak: '7d' },
    { name: 'Sophia Chen', rollNo: 8, attendance: '98.5%', avgScore: '98%', streak: '15d' },
    { name: 'Marcus Vance', rollNo: 21, attendance: '92.0%', avgScore: '88%', streak: '11d' },
    { name: 'Priya Sharma', rollNo: 19, attendance: '95.4%', avgScore: '92%', streak: '6d' },
    { name: 'Liam O’Connor', rollNo: 11, attendance: '91.2%', avgScore: '84%', streak: '4d' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/50 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Faculty Management Console
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Teacher Command Center</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Class 9-A STEM Honors • Manage assignments, evaluate lab reports, broadcast instant announcements, and monitor academic progress.
          </p>
        </div>

        {/* Console Nav Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('assignments')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'assignments'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Assignments
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'students'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Roster
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'announcements'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Broadcast Notice
          </button>
        </div>
      </div>

      {/* Tab 1: Assignments */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Assignment Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> Create Class Assignment
            </h3>

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Physics Lab: Pendulum Oscillation Data"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Maths">Maths</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                Publish Assignment to Class 9-A
              </button>
            </form>
          </div>

          {/* Active Assignments List */}
          <div className="lg:col-span-7 space-y-3">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sky-400 font-bold text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {asg.subject}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">Due: {asg.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{asg.title}</h4>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400 text-sm">
                    {asg.submittedCount} / {asg.totalStudents}
                  </div>
                  <div className="text-[10px] text-slate-500">Submissions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Students Performance Roster */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Class 9-A STEM Honors Academic Roster
            </h3>
            <span className="text-xs text-slate-400 font-mono">32 Enrolled</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold">
                  <th className="pb-3">Roll #</th>
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Attendance</th>
                  <th className="pb-3">Lab & Quiz Average</th>
                  <th className="pb-3">Learning Streak</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {studentRoster.map((s) => (
                  <tr key={s.rollNo} className="hover:bg-slate-950/40">
                    <td className="py-3 font-mono font-bold text-slate-400">{s.rollNo}</td>
                    <td className="py-3 font-bold text-white">{s.name}</td>
                    <td className="py-3 font-mono text-emerald-400">{s.attendance}</td>
                    <td className="py-3 font-mono text-sky-400 font-bold">{s.avgScore}</td>
                    <td className="py-3 text-amber-400 font-bold">🔥 {s.streak}</td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Broadcast Announcement */}
      {activeTab === 'announcements' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 max-w-xl mx-auto">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Broadcast Announcement to Class 9</h3>
          </div>

          <form onSubmit={handleBroadcastAnnouncement} className="space-y-3 text-xs">
            <textarea
              rows={4}
              required
              value={broadcastMsg}
              onChange={(e) => setBroadcastMsg(e.target.value)}
              placeholder="e.g. Please bring your physics lab notebooks tomorrow. We will be analyzing pendulum data collected in the Virtual Lab."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100"
            />

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <Send className="w-4 h-4" /> Send Instant Notification
            </button>
          </form>

          {announcementSent && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Notice successfully dispatched to all 32 students and linked parent portals!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
