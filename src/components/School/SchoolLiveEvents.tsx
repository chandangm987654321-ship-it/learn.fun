import React, { useState } from 'react';
import { LiveEventItem } from '../../types';
import { LIVE_SCHOOL_EVENTS } from '../../data/schoolData';
import { Radio, Calendar, MapPin, Ticket, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const SchoolLiveEvents: React.FC = () => {
  const [events, setEvents] = useState<LiveEventItem[]>(LIVE_SCHOOL_EVENTS);
  const [registeredSuccessId, setRegisteredSuccessId] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: true } : e))
    );
    setRegisteredSuccessId(id);
    setTimeout(() => setRegisteredSuccessId(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Radio className="w-5 h-5 text-purple-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Campus Live Events & Galas
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Annual Day, Sports & STEM Galas</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Live broadcasts, spectator passes, and schedules for the Annual Day, Inter-House Sports Championship, and the National Robotics Exhibition.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Season 2026/27 Active
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                  {evt.status}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> {evt.date}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" /> {evt.time}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{evt.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                {evt.description}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Venue: {evt.venue}</span>
              </div>
            </div>

            {/* Pass / Register Action */}
            <div className="shrink-0 flex flex-col items-end justify-center">
              {evt.registered ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Digital Pass Issued (#APEX-PASS)</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRegister(evt.id)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <Ticket className="w-4 h-4" /> Claim Free Spectator Pass
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
