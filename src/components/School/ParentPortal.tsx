import React, { useState } from 'react';
import { DEFAULT_STUDENT_ID, INITIAL_HOMEWORK, UPCOMING_EXAMS } from '../../data/schoolData';
import { Users, CheckCircle2, Clock, Calendar, Mail, Send, Award, Phone } from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const [parentMsg, setParentMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const examReportCard = [
    { subject: 'Physics', midterm: '96%', grade: 'A+', teacherRemarks: 'Exceptional intuition in harmonic motion and mechanics.' },
    { subject: 'Chemistry', midterm: '94%', grade: 'A', teacherRemarks: 'Great mastery of covalent bonding and octet rules.' },
    { subject: 'Maths', midterm: '98%', grade: 'A+', teacherRemarks: 'Top score in quadratic equations and graph manipulation.' },
    { subject: 'Biology', midterm: '92%', grade: 'A', teacherRemarks: 'Active participant in anatomy and physiological simulations.' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMsg.trim()) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setParentMsg('');
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-indigo-950/50 border border-teal-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Users className="w-5 h-5 text-teal-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Guardian & Family Access
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Parent Portal</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Live overview for guardians of <strong className="text-white">{DEFAULT_STUDENT_ID.studentName}</strong> ({DEFAULT_STUDENT_ID.grade} • {DEFAULT_STUDENT_ID.section}).
          </p>
        </div>

        {/* Quick Contact & Verified Tag */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-teal-500/40 text-xs">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Linked Student ID
          </div>
          <div className="text-teal-300 font-mono font-bold mt-0.5">
            {DEFAULT_STUDENT_ID.studentId}
          </div>
        </div>
      </div>

      {/* Grid: Attendance & Exam Report Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Academic Report Card & Teacher Remarks */}
        <div className="lg:col-span-8 space-y-6">
          {/* Exam Results & Progress */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-400" /> Midterm Academic Performance & Grades
              </h3>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                GPA: 3.96 / 4.0
              </span>
            </div>

            <div className="space-y-3">
              {examReportCard.map((rec) => (
                <div
                  key={rec.subject}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{rec.subject}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono font-bold text-[10px]">
                        {rec.midterm} ({rec.grade})
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Teacher Remark: "{rec.teacherRemarks}"
                    </p>
                  </div>

                  <span className="text-emerald-400 font-bold text-xs shrink-0 self-start sm:self-auto">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Message Teacher Form */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" /> Direct Message Class Teacher (Dr. Evelyn Reed)
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
              <textarea
                rows={3}
                required
                value={parentMsg}
                onChange={(e) => setParentMsg(e.target.value)}
                placeholder="Ask about homework, schedule a 1-on-1 consultation, or request an absence leave..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100"
              />

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Send Message to Faculty
              </button>
            </form>

            {msgSent && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Message successfully delivered. Dr. Reed usually responds within 2-4 business hours.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Attendance Overview & Homework Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Attendance Stats */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Attendance Meter</h3>
              <span className="font-mono text-emerald-400 font-bold text-sm">96.8%</span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '96.8%' }} />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Days Open:</span>
                <span className="font-mono text-white font-bold">120 Days</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Days Present:</span>
                <span className="font-mono text-emerald-400 font-bold">116 Days</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Excused Absences:</span>
                <span className="font-mono text-amber-400 font-bold">4 Days</span>
              </div>
            </div>
          </div>

          {/* Quick Homework Status */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Homework Tracker
            </h4>
            <div className="space-y-2">
              {INITIAL_HOMEWORK.map((hw) => (
                <div
                  key={hw.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-white truncate">{hw.title}</div>
                    <div className="text-[10px] text-slate-500">{hw.dueDate}</div>
                  </div>
                  {hw.status === 'submitted' ? (
                    <span className="text-[10px] text-emerald-400 font-bold shrink-0">Submitted</span>
                  ) : (
                    <span className="text-[10px] text-amber-400 font-bold shrink-0">Due Soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
