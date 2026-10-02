import React, { useState } from 'react';
import { ProjectShowcaseItem } from '../../types';
import { PROJECT_SHOWCASES } from '../../data/schoolData';
import { Rocket, Plus, Users, Cpu, CheckCircle2, Video, Sparkles, X } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [projects, setProjects] = useState<ProjectShowcaseItem[]>(PROJECT_SHOWCASES);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New project state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectShowcaseItem['category']>('Robotics');
  const [newTeam, setNewTeam] = useState('Alex Explorer, Sophia Chen');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newResults, setNewResults] = useState('');
  const [newTech, setNewTech] = useState('ROS2, Python, Computer Vision');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: ProjectShowcaseItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      team: newTeam.split(',').map((s) => s.trim()).filter(Boolean),
      problem: newProblem || 'Engineering challenge addressed by the team.',
      solution: newSolution || 'Hardware and software implementation designed.',
      results: newResults || 'Tested and validated under simulated conditions.',
      techStack: newTech.split(',').map((s) => s.trim()).filter(Boolean),
      status: 'In Progress',
      accentColor: 'border-indigo-500/50 from-indigo-950/30',
    };

    setProjects([created, ...projects]);
    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewProblem('');
    setNewSolution('');
    setNewResults('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-sky-950/60 border border-indigo-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Rocket className="w-5 h-5 text-indigo-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              STEM & Robotics Innovation Portfolio
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Student Project Showcases</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Structured engineering records: Problem Statement → Technological Solution → Simulation Demo → Results.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Submit New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-6 rounded-2xl bg-slate-900 border ${proj.accentColor} shadow-2xl space-y-5 transition`}
          >
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                    {proj.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
              </div>

              {/* Team Members */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Team: </span>
                <span className="font-semibold text-slate-200">{proj.team.join(', ')}</span>
              </div>
            </div>

            {/* Structured Engineering Flow: Problem -> Solution -> Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Problem */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block">
                  1. The Real-World Problem
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.problem}</p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block">
                  2. Engineered Solution
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.solution}</p>
              </div>

              {/* Results */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                  3. Measured Results & Impact
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.results}</p>
              </div>
            </div>

            {/* Tech Stack & Demo Badges */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-bold mr-1 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Stack:
                </span>
                {proj.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Simulation Video Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Project Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-lg">🚀</span>
                <h3 className="text-base font-bold text-white">Submit Student STEM Project</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Autonomous Solar Tracking Heliostat"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Robotics">Robotics</option>
                    <option value="AI & IoT">AI & IoT</option>
                    <option value="Green STEM">Green STEM</option>
                    <option value="Biotech">Biotech</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Team Members (comma-separated)</label>
                  <input
                    type="text"
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">1. Problem Statement</label>
                <textarea
                  rows={2}
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="What limitation or challenge does this solve?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">2. Engineering Solution</label>
                <textarea
                  rows={2}
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  placeholder="How was the circuit, CAD, algorithm, or chassis built?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">3. Measurable Results</label>
                <textarea
                  rows={2}
                  value={newResults}
                  onChange={(e) => setNewResults(e.target.value)}
                  placeholder="Metrics, speeds, efficiencies, or competition placement."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="e.g. Arduino, LiDAR, Computer Vision, Fusion 360"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Publish Project Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
