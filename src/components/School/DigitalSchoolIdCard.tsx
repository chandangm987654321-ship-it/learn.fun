import React, { useState } from 'react';
import { DigitalSchoolId, AvatarConfig } from '../../types';
import { DEFAULT_STUDENT_ID } from '../../data/schoolData';
import { StudentAvatarSvg } from '../StudentAvatarSvg';
import { QrCode, ShieldCheck, Download, Sparkles, RefreshCw, Phone, Award } from 'lucide-react';

interface DigitalSchoolIdCardProps {
  avatar: AvatarConfig;
  studentIdData?: DigitalSchoolId;
}

export const DigitalSchoolIdCard: React.FC<DigitalSchoolIdCardProps> = ({
  avatar,
  studentIdData = DEFAULT_STUDENT_ID,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Header text */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Digital Smart Campus Pass</span>
        </div>
        <h2 className="text-xl font-black text-white">Student Digital Identity Card</h2>
        <p className="text-xs text-slate-400">
          Click the card to flip between credentials, security QR code, and emergency medical info.
        </p>
      </div>

      {/* ID Card Outer Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer perspective-1000 select-none group"
      >
        <div
          className={`relative w-full rounded-3xl p-6 text-white shadow-2xl transition-all duration-500 border border-slate-700/80 overflow-hidden ${
            isFlipped
              ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rotate-y-180'
              : 'bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950'
          }`}
          style={{ minHeight: '380px' }}
        >
          {/* Hologram Chip & Campus Watermark */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {!isFlipped ? (
            /* FRONT OF DIGITAL ID */
            <div className="flex flex-col justify-between h-full space-y-5">
              {/* Card Top: School Branding */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center font-black text-sm shadow-md">
                    Ω
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs tracking-wider uppercase text-sky-200">
                      Apex Academy of STEM
                    </h3>
                    <p className="text-[10px] text-slate-400">Excellence in Science & Innovation</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  VERIFIED
                </div>
              </div>

              {/* Student Photo & Vital Details */}
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl bg-slate-950">
                    <StudentAvatarSvg avatar={avatar} size={96} showBackground={true} />
                  </div>
                  <span className="absolute -bottom-2 -right-1 text-xs px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black shadow-md">
                    Lvl {avatar.level}
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <h4 className="text-base font-extrabold text-white truncate">
                    {studentIdData.studentName}
                  </h4>
                  <div className="text-xs font-mono font-bold text-sky-400">
                    ID: {studentIdData.studentId}
                  </div>
                  <div className="text-xs text-slate-300">
                    {studentIdData.grade} • {studentIdData.section}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Roll No: <span className="text-white font-bold">{studentIdData.rollNo}</span>
                  </div>
                </div>
              </div>

              {/* House & Attendance Indicators */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Assigned House
                  </div>
                  <div className="text-xs font-bold text-rose-400 mt-0.5 flex items-center gap-1">
                    <span>🔥</span> {studentIdData.house}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Live Attendance
                  </div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1 font-mono">
                    <span>📈</span> {studentIdData.attendancePct}% Present
                  </div>
                </div>
              </div>

              {/* Bottom Strip: QR Code & Chip */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-sky-400" />
                  <span className="font-mono">NFC / QR ENABLED</span>
                </div>
                <span>Academic Year: {studentIdData.academicYear}</span>
              </div>
            </div>
          ) : (
            /* BACK OF DIGITAL ID */
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Campus Access & Medical Record
                </span>
                <span className="text-xs text-indigo-400 font-mono font-bold">CLICK TO FLIP</span>
              </div>

              {/* Large QR Code Mockup */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner my-auto">
                {/* SVG QR Code pattern */}
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-slate-950">
                  {/* Corner targets */}
                  <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="12" width="14" height="14" fill="currentColor" />
                  <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="74" y="12" width="14" height="14" fill="currentColor" />
                  <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="74" width="14" height="14" fill="currentColor" />
                  {/* Central data matrix dots */}
                  <rect x="42" y="15" width="6" height="6" fill="currentColor" />
                  <rect x="52" y="25" width="6" height="6" fill="currentColor" />
                  <rect x="40" y="40" width="8" height="8" fill="currentColor" />
                  <rect x="55" y="45" width="6" height="12" fill="currentColor" />
                  <rect x="25" y="45" width="8" height="6" fill="currentColor" />
                  <rect x="40" y="70" width="10" height="6" fill="currentColor" />
                  <rect x="70" y="65" width="12" height="6" fill="currentColor" />
                  <rect x="75" y="75" width="8" height="8" fill="currentColor" />
                </svg>
                <span className="text-[10px] font-mono font-bold text-slate-900 mt-1">
                  APEX-SCAN-PASS #0914
                </span>
              </div>

              {/* Medical & Emergency Info */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="font-bold text-rose-400">{studentIdData.bloodGroup}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" /> Emergency Contact:
                  </span>
                  <span className="font-mono text-slate-200">{studentIdData.emergencyContact}</span>
                </div>
              </div>

              <p className="text-[9px] text-center text-slate-500">
                Official property of Apex Academy. Found cards should be returned to Dean's Office.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Flip ID Card
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          {downloadSuccess ? 'Downloaded to Device!' : 'Save Digital ID'}
        </button>
      </div>
    </div>
  );
};
