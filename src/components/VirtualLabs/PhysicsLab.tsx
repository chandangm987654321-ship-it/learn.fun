import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Orbit, Gauge, Zap, Compass } from 'lucide-react';

interface PhysicsLabProps {
  onEarnXp?: (amount: number) => void;
}

const GRAVITY_PRESETS = [
  { name: 'Earth', g: 9.8, icon: '🌍' },
  { name: 'Moon', g: 1.62, icon: '🌕' },
  { name: 'Mars', g: 3.72, icon: '🪐' },
  { name: 'Jupiter', g: 24.79, icon: '⚡' },
];

export const PhysicsLab: React.FC<PhysicsLabProps> = ({ onEarnXp }) => {
  const [mode, setMode] = useState<'pendulum' | 'projectile'>('pendulum');

  // Pendulum state
  const [length, setLength] = useState<number>(2.0); // meters
  const [mass, setMass] = useState<number>(1.5); // kg
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2
  const [damping, setDamping] = useState<number>(0.02); // air friction
  const [initialAngleDeg, setInitialAngleDeg] = useState<number>(35); // degrees
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Live simulation variables
  const angleRef = useRef<number>((35 * Math.PI) / 180);
  const angularVelocityRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Energy & measurements display
  const [currentAngleDeg, setCurrentAngleDeg] = useState<number>(35);
  const [kineticEnergy, setKineticEnergy] = useState<number>(0);
  const [potentialEnergy, setPotentialEnergy] = useState<number>(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Theoretical period T = 2 * pi * sqrt(L / g)
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(length / gravity);
  const theoreticalFrequency = 1 / theoreticalPeriod;

  // Reset pendulum to initial angle
  const handleReset = () => {
    angleRef.current = (initialAngleDeg * Math.PI) / 180;
    angularVelocityRef.current = 0;
    setCurrentAngleDeg(initialAngleDeg);
  };

  useEffect(() => {
    handleReset();
  }, [length, gravity, initialAngleDeg]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05); // cap dt
      lastTime = time;

      if (isRunning) {
        // Simple harmonic motion angular acceleration: alpha = - (g / L) * sin(theta) - damping * omega
        const alpha = -(gravity / length) * Math.sin(angleRef.current) - damping * angularVelocityRef.current;
        angularVelocityRef.current += alpha * dt;
        angleRef.current += angularVelocityRef.current * dt;

        // Calculations
        const deg = (angleRef.current * 180) / Math.PI;
        setCurrentAngleDeg(deg);

        // Velocity at bob = omega * L
        const v = angularVelocityRef.current * length;
        const ke = 0.5 * mass * v * v;
        // Height h = L * (1 - cos(theta))
        const h = length * (1 - Math.cos(angleRef.current));
        const pe = mass * gravity * h;

        setKineticEnergy(ke);
        setPotentialEnergy(pe);
      }

      // Draw simulation on canvas
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Pivot coordinate
      const pivotX = width / 2;
      const pivotY = 50;

      // Scaling pixels per meter
      const pxPerMeter = 90;
      const bobX = pivotX + length * pxPerMeter * Math.sin(angleRef.current);
      const bobY = pivotY + length * pxPerMeter * Math.cos(angleRef.current);

      // Background grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw equilibrium vertical dashed reference line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, pivotY + length * pxPerMeter + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw angle sector arc
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 40, Math.PI / 2, Math.PI / 2 + angleRef.current, angleRef.current < 0);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw rod / cord
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw pivot stand
      ctx.fillStyle = '#475569';
      ctx.fillRect(pivotX - 25, pivotY - 10, 50, 10);
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Bob size scales with mass
      const bobRadius = 14 + mass * 3;
      // Bob glow
      const grad = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, bobRadius);
      grad.addColorStop(0, '#67e8f9');
      grad.addColorStop(0.6, '#0284c7');
      grad.addColorStop(1, '#0c4a6e');

      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bob velocity vector arrow
      const vVectorScale = 12;
      const vx = -angularVelocityRef.current * length * Math.cos(angleRef.current) * vVectorScale;
      const vy = angularVelocityRef.current * length * Math.sin(angleRef.current) * vVectorScale;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bobX, bobY);
      ctx.lineTo(bobX + vx, bobY + vy);
      ctx.stroke();

      // Velocity label
      if (Math.abs(angularVelocityRef.current) > 0.1) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px monospace';
        ctx.fillText(`v: ${(angularVelocityRef.current * length).toFixed(2)} m/s`, bobX + 15, bobY - 10);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isRunning, length, gravity, mass, damping]);

  // Request AI Lab Explanation
  const handleExplainState = async () => {
    try {
      setAiLoading(true);
      const res = await fetch('/api/lab-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labType: 'Pendulum & Gravity Harmonic Oscillation',
          parameters: {
            stringLength: `${length} m`,
            bobMass: `${mass} kg`,
            gravity: `${gravity} m/s²`,
            dampingFriction: damping,
            initialAngle: `${initialAngleDeg}°`,
            theoreticalPeriod: `${theoreticalPeriod.toFixed(3)} s`,
          },
          stateDescription: `Pendulum oscillating with L=${length}m under g=${gravity}m/s² with current PE=${potentialEnergy.toFixed(
            2
          )}J, KE=${kineticEnergy.toFixed(2)}J, current angle=${currentAngleDeg.toFixed(1)}°.`,
        }),
      });
      const data = await res.json();
      setAiExplanation(data.explanation);
      onEarnXp?.(30);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 text-2xl">
            ⏱️
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Virtual Physics Lab: Simple Harmonic Motion & Gravity
            </h3>
            <p className="text-xs text-slate-400">
              Manipulate length, mass, and celestial gravitational fields to explore conservation of energy in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              isRunning
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-emerald-600 text-white shadow-lg'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause Sim' : 'Resume Sim'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Reset to Initial Angle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Telemetry & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas simulation view */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80 mb-2">
            <span className="font-mono text-sky-400 font-semibold flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5" /> Real-Time Kinematics Canvas
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Angle: {currentAngleDeg.toFixed(1)}°
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center min-h-[360px]">
            <canvas
              ref={canvasRef}
              width={540}
              height={380}
              className="w-full h-auto max-h-[380px] rounded-xl"
            />
          </div>

          {/* Real-time Energy Transfer Bars */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                Kinetic Energy (KE): {kineticEnergy.toFixed(2)} J
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                Potential Energy (PE): {potentialEnergy.toFixed(2)} J
              </span>
            </div>
            {/* Split Energy Bar */}
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
              <div
                className="bg-emerald-500 transition-all duration-75"
                style={{
                  width: `${Math.min(
                    100,
                    (kineticEnergy / Math.max(0.1, kineticEnergy + potentialEnergy)) * 100
                  )}%`,
                }}
              />
              <div
                className="bg-amber-500 transition-all duration-75"
                style={{
                  width: `${Math.min(
                    100,
                    (potentialEnergy / Math.max(0.1, kineticEnergy + potentialEnergy)) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Controls & Lab Director AI */}
        <div className="lg:col-span-5 space-y-4">
          {/* Celestial Gravity Selector */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              Gravitational Field (g):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GRAVITY_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setGravity(p.g)}
                  className={`py-2 px-2 rounded-xl text-center border transition ${
                    Math.abs(gravity - p.g) < 0.1
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-base">{p.icon}</div>
                  <div className="text-[11px] font-bold mt-0.5">{p.name}</div>
                  <div className="text-[9px] text-slate-400 font-mono">{p.g} m/s²</div>
                </button>
              ))}
            </div>
          </div>

          {/* Parameter Sliders */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            {/* String Length L */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>String Length (L)</span>
                <span className="font-mono text-sky-400">{length.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3.5}
                step={0.1}
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Mass m */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Bob Mass (m)</span>
                <span className="font-mono text-sky-400">{mass.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={4.0}
                step={0.5}
                value={mass}
                onChange={(e) => setMass(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 italic">
                Notice: Period T does not depend on mass!
              </span>
            </div>

            {/* Initial Angle */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Release Angle (θ₀)</span>
                <span className="font-mono text-sky-400">{initialAngleDeg}°</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={initialAngleDeg}
                onChange={(e) => setInitialAngleDeg(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Air Damping */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Air Resistance (Damping)</span>
                <span className="font-mono text-sky-400">
                  {damping === 0 ? 'Vacuum (None)' : damping.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={0.1}
                step={0.01}
                value={damping}
                onChange={(e) => setDamping(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Governing Physics Readout */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Governing Equation & Period
            </h4>
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 text-center">
              T = 2π √(L / g) = <strong>{theoreticalPeriod.toFixed(3)} s</strong>
            </div>
            <div className="flex justify-between text-xs text-slate-400 pt-1">
              <span>Oscillation Frequency (f):</span>
              <span className="font-mono text-slate-200">{theoreticalFrequency.toFixed(3)} Hz</span>
            </div>
          </div>

          {/* AI Lab Director Button */}
          <button
            type="button"
            disabled={aiLoading}
            onClick={handleExplainState}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {aiLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                Analyzing with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Ask AI Lab Director to Explain This State (+30 XP)
              </>
            )}
          </button>

          {/* AI Explanation Output */}
          {aiExplanation && (
            <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/40 text-xs text-slate-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Sparkles className="w-4 h-4" /> Lab Director's Analysis:
              </div>
              <div className="whitespace-pre-line leading-relaxed text-slate-300">
                {aiExplanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
