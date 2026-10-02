import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RefreshCw, Eye, EyeOff, Activity, Compass } from 'lucide-react';

interface MathsLabProps {
  onEarnXp?: (amount: number) => void;
}

type CurveType = 'quadratic' | 'sine' | 'cubic' | 'exponential';

export const MathsLab: React.FC<MathsLabProps> = ({ onEarnXp }) => {
  const [curveType, setCurveType] = useState<CurveType>('quadratic');

  // Parameters
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-2);
  const [paramC, setParamC] = useState<number>(-3);
  const [paramD, setParamD] = useState<number>(0);

  const [hoverX, setHoverX] = useState<number | null>(null);
  const [showTangent, setShowTangent] = useState<boolean>(true);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Math evaluations
  const evaluateF = (x: number) => {
    switch (curveType) {
      case 'quadratic':
        return paramA * x * x + paramB * x + paramC;
      case 'sine':
        return paramA * Math.sin(paramB * x + paramC);
      case 'cubic':
        return paramA * x * x * x + paramB * x * x + paramC * x + paramD;
      case 'exponential':
        return paramA * Math.exp(paramB * x);
    }
  };

  const evaluateDerivative = (x: number) => {
    switch (curveType) {
      case 'quadratic':
        return 2 * paramA * x + paramB;
      case 'sine':
        return paramA * paramB * Math.cos(paramB * x + paramC);
      case 'cubic':
        return 3 * paramA * x * x + 2 * paramB * x + paramC;
      case 'exponential':
        return paramA * paramB * Math.exp(paramB * x);
    }
  };

  // Automated feature calculations for quadratic
  let roots: number[] = [];
  let vertex = { x: 0, y: 0 };
  let discriminant = 0;
  if (curveType === 'quadratic' && paramA !== 0) {
    discriminant = paramB * paramB - 4 * paramA * paramC;
    vertex.x = -paramB / (2 * paramA);
    vertex.y = evaluateF(vertex.x);
    if (discriminant > 0) {
      roots = [
        (-paramB - Math.sqrt(discriminant)) / (2 * paramA),
        (-paramB + Math.sqrt(discriminant)) / (2 * paramA),
      ];
    } else if (discriminant === 0) {
      roots = [vertex.x];
    }
  }

  // Draw coordinate plane and function curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = 25; // pixels per unit

    // Background Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = originX % scale; x < width; x += scale) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = originY % scale; y < height; y += scale) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    for (let i = -10; i <= 10; i += 2) {
      if (i === 0) continue;
      ctx.fillText(i.toString(), originX + i * scale - 6, originY + 14);
      ctx.fillText((-i).toString(), originX + 6, originY + i * scale + 4);
    }

    // Function Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;

    for (let px = 0; px < width; px += 2) {
      const mathX = (px - originX) / scale;
      const mathY = evaluateF(mathX);
      const py = originY - mathY * scale;

      if (py >= -200 && py <= height + 200) {
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Highlight Vertex if quadratic
    if (curveType === 'quadratic') {
      const vPx = originX + vertex.x * scale;
      const vPy = originY - vertex.y * scale;
      if (vPx >= 0 && vPx <= width && vPy >= 0 && vPy <= height) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(vPx, vPy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`V(${vertex.x.toFixed(1)}, ${vertex.y.toFixed(1)})`, vPx + 8, vPy - 6);
      }

      // Highlight Roots
      roots.forEach((root, idx) => {
        const rPx = originX + root * scale;
        const rPy = originY;
        if (rPx >= 0 && rPx <= width) {
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(rPx, rPy, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = 'bold 10px monospace';
          ctx.fillText(`x=${root.toFixed(1)}`, rPx - 10, rPy + 16);
        }
      });
    }

    // Draw Tangent line at hover position
    if (hoverX !== null && showTangent) {
      const hPx = originX + hoverX * scale;
      const hoverY = evaluateF(hoverX);
      const hPy = originY - hoverY * scale;
      const slope = evaluateDerivative(hoverX);

      // Tangent point
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(hPx, hPy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Tangent line segment
      const lineLen = 80;
      const angle = Math.atan(-slope);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(hPx - Math.cos(angle) * lineLen, hPy - Math.sin(angle) * lineLen);
      ctx.lineTo(hPx + Math.cos(angle) * lineLen, hPy + Math.sin(angle) * lineLen);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tooltip
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(hPx + 10, hPy - 36, 120, 30);
      ctx.strokeStyle = '#ec4899';
      ctx.strokeRect(hPx + 10, hPy - 36, 120, 30);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px monospace';
      ctx.fillText(`x: ${hoverX.toFixed(2)}, y: ${hoverY.toFixed(2)}`, hPx + 14, hPy - 22);
      ctx.fillText(`f'(x) slope: ${slope.toFixed(2)}`, hPx + 14, hPy - 10);
    }
  }, [curveType, paramA, paramB, paramC, paramD, hoverX, showTangent]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const scale = 25;
    const mathX = (px - canvas.width / 2) / scale;
    setHoverX(mathX);
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  const handleAiExplain = async () => {
    try {
      setLoadingAi(true);
      const res = await fetch('/api/lab-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labType: 'Maths Graph Manipulation & Calculus Derivatives',
          parameters: {
            curveType,
            equation:
              curveType === 'quadratic'
                ? `f(x) = ${paramA}x² + ${paramB}x + ${paramC}`
                : curveType === 'sine'
                ? `f(x) = ${paramA}sin(${paramB}x + ${paramC})`
                : `f(x) = ${paramA}x³ + ${paramB}x² + ${paramC}x + ${paramD}`,
            vertex: curveType === 'quadratic' ? `(${vertex.x.toFixed(2)}, ${vertex.y.toFixed(2)})` : null,
            discriminant: curveType === 'quadratic' ? discriminant : null,
            roots: curveType === 'quadratic' ? roots : null,
          },
          stateDescription: `Current curve is ${curveType} with parameters a=${paramA}, b=${paramB}, c=${paramC}.`,
        }),
      });
      const data = await res.json();
      setAiExplanation(data.explanation);
      onEarnXp?.(30);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-2xl">
            📐
          </span>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Virtual Maths Lab: Graph Manipulation & Tangent Slopes
            </h3>
            <p className="text-xs text-slate-400">
              Transform polynomial and trigonometric functions in real time, inspect roots, and track instantaneous derivatives.
            </p>
          </div>
        </div>

        {/* Function type buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'quadratic', label: 'Quadratic ax²+bx+c' },
            { id: 'sine', label: 'Sine Wave a·sin(bx+c)' },
            { id: 'cubic', label: 'Cubic ax³+bx²+...' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurveType(item.id as CurveType);
                if (item.id === 'sine') {
                  setParamA(2);
                  setParamB(1);
                  setParamC(0);
                } else if (item.id === 'quadratic') {
                  setParamA(1);
                  setParamB(-2);
                  setParamC(-3);
                }
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                curveType === item.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Canvas on Left, Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Graph View */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2 text-xs">
            <span className="font-mono text-sky-400 font-bold text-sm">
              {curveType === 'quadratic' &&
                `f(x) = ${paramA}x² ${paramB >= 0 ? `+ ${paramB}` : `- ${Math.abs(paramB)}`}x ${
                  paramC >= 0 ? `+ ${paramC}` : `- ${Math.abs(paramC)}`
                }`}
              {curveType === 'sine' && `f(x) = ${paramA} · sin(${paramB}x ${paramC >= 0 ? `+ ${paramC}` : paramC})`}
              {curveType === 'cubic' && `f(x) = ${paramA}x³ + ${paramB}x² + ${paramC}x`}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTangent(!showTangent)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition ${
                  showTangent
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Tangent f'(x)
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={560}
              height={380}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-auto rounded-xl cursor-crosshair"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Hover cursor anywhere along the curve to trace tangent slopes and coordinates.</span>
            <span className="font-mono text-slate-300">Scale: 1 unit = 25px</span>
          </div>
        </div>

        {/* Sliders & Analytical Telemetry */}
        <div className="lg:col-span-4 space-y-4">
          {/* Sliders */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Curve Parameters
            </span>

            {/* Parameter A */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Leading Coeff (a)</span>
                <span className="font-mono text-sky-400">{paramA}</span>
              </div>
              <input
                type="range"
                min={-4}
                max={4}
                step={0.5}
                value={paramA}
                onChange={(e) => setParamA(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Parameter B */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Linear Coeff (b)</span>
                <span className="font-mono text-sky-400">{paramB}</span>
              </div>
              <input
                type="range"
                min={-6}
                max={6}
                step={0.5}
                value={paramB}
                onChange={(e) => setParamB(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Parameter C */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Constant Shift (c)</span>
                <span className="font-mono text-sky-400">{paramC}</span>
              </div>
              <input
                type="range"
                min={-8}
                max={8}
                step={0.5}
                value={paramC}
                onChange={(e) => setParamC(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Analytical Properties for Quadratic */}
          {curveType === 'quadratic' && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Algebraic Properties
              </h4>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 font-mono">
                <span className="text-slate-400">Vertex:</span>
                <span className="text-amber-400 font-bold">
                  ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 font-mono">
                <span className="text-slate-400">Discriminant (Δ):</span>
                <span className="text-sky-400 font-bold">{discriminant.toFixed(1)}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 font-mono">
                <span className="text-slate-400">Roots (x-intercepts):</span>
                <span className="text-emerald-400 font-bold">
                  {roots.length === 0
                    ? 'None (Complex)'
                    : roots.map((r) => r.toFixed(2)).join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* AI Explanation Button */}
          <button
            type="button"
            disabled={loadingAi}
            onClick={handleAiExplain}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {loadingAi ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                Analyzing Mathematical Topology...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Explain Curve Topology & Derivatives (+30 XP)
              </>
            )}
          </button>

          {/* AI Explanation Box */}
          {aiExplanation && (
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs text-slate-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4" /> Mathematical Insights:
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
