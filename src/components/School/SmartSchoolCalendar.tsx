import React, { useState } from 'react';
import { CalendarEvent } from '../../types';
import { SMART_CALENDAR_EVENTS } from '../../data/schoolData';
import { Calendar as CalendarIcon, Clock, MapPin, Filter, Plus, CheckCircle2 } from 'lucide-react';

export const SmartSchoolCalendar: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'exam' | 'holiday' | 'competition' | 'ptm' | 'event'>('all');
  const [events, setEvents] = useState<CalendarEvent[]>(SMART_CALENDAR_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const filtered = events.filter((e) => filter === 'all' || e.category === filter);

  const getCategoryBadge = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'exam':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'holiday':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'competition':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'ptm':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'event':
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 via-slate-900 to-indigo-950/50 border border-sky-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <CalendarIcon className="w-5 h-5 text-sky-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Unified Academic & Activity Schedule
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Smart School Calendar</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Track midterm examinations, holidays, robotic competitions, parent meetings (PTM), and campus galas in one synchronized view.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs overflow-x-auto self-start sm:self-auto">
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'exam', label: 'Exams' },
              { id: 'holiday', label: 'Holidays' },
              { id: 'competition', label: 'Competitions' },
              { id: 'ptm', label: 'PTM' },
              { id: 'event', label: 'Events' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition shrink-0 ${
                filter === cat.id
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedEvent(item)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all shadow-xl flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full border ${getCategoryBadge(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>

                <div className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>{item.time}</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-mono text-slate-300">
                <MapPin className="w-3 h-3 text-rose-400" /> {item.location}
              </span>
              <span className="font-mono text-sky-400 font-bold">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span
                className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${getCategoryBadge(
                  selectedEvent.category
                )}`}
              >
                {selectedEvent.category}
              </span>
              <span className="font-mono text-xs text-slate-400">{selectedEvent.date}</span>
            </div>

            <h3 className="text-lg font-bold text-white">{selectedEvent.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedEvent.description}</p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Time:</span>
                <span className="font-mono text-white font-bold">{selectedEvent.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-sky-300 font-semibold">{selectedEvent.location}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
