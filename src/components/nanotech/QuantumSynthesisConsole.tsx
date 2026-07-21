import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Gauge, 
  Wind, 
  Atom, 
  Cpu, 
  Layers, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Zap,
  Info
} from 'lucide-react';

interface AtomNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  type: 'metal' | 'chalcogen'; // e.g. Mo (metal) or S (chalcogen) for MoS2
  phase: number;
}

interface GasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function QuantumSynthesisConsole() {
  // 1. Parameter States
  const [temperature, setTemperature] = useState<number>(850); // Kelvin (Sweet spot: 800 - 900)
  const [pressureLog, setPressureLog] = useState<number>(-5); // 10^-5 Torr (Sweet spot: -6 to -4)
  const [flowRate, setFlowRate] = useState<number>(60); // sccm (Sweet spot: 40 - 80)
  const [substrate, setSubstrate] = useState<'SiO2' | 'Sapphire' | 'Quartz'>('SiO2');
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [depositionProgress, setDepositionProgress] = useState<number>(0);
  const [synthesisLogs, setSynthesisLogs] = useState<string[]>([
    'System initialized. Vacuum chambers ready.',
    'Awaiting parameter tuning...'
  ]);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Math calculated metrics
  const tempDiff = Math.abs(temperature - 850);
  const pressDiff = Math.abs(pressureLog - (-5.5));
  const flowDiff = Math.abs(flowRate - 50);

  // Quality formula (max 100%)
  const qualityScore = Math.max(
    12,
    Math.round(100 - (tempDiff * 0.12) - (pressDiff * 10) - (flowDiff * 0.2))
  );

  // Deduce phase state
  let phaseState = 'Amorphous State';
  let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
  if (temperature < 600) {
    phaseState = 'Disordered Cluster';
    badgeColor = 'bg-yellow-50 text-yellow-700 border-yellow-200';
  } else if (temperature > 1050) {
    phaseState = 'Thermal Desorption';
    badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (qualityScore >= 85) {
    phaseState = '2H-Semiconducting (Epitaxial)';
    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (qualityScore >= 60) {
    phaseState = '1T-Metallic Phase';
    badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
  } else {
    phaseState = 'Mixed Polycrystalline';
    badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  // Precursor gas particles pool & atom nodes structure
  const atomsRef = useRef<AtomNode[]>([]);
  const particlesRef = useRef<GasParticle[]>([]);

  // Initialize the hexagonal atomic lattice coordinates
  useEffect(() => {
    const nodes: AtomNode[] = [];
    const rows = 6;
    const cols = 9;
    const spacingX = 35;
    const spacingY = 30;
    const startX = 35;
    const startY = 40;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Shift alternate rows for hexagonal layout
        const xOffset = (r % 2) * (spacingX / 2);
        const bx = startX + c * spacingX + xOffset;
        const by = startY + r * spacingY;

        // Alternate metal (Mo) and chalcogen (S)
        const type = (r + c) % 2 === 0 ? 'metal' : 'chalcogen';
        nodes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          type,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    atomsRef.current = nodes;
  }, []);

  // Live Canvas Rendering & Physics Update
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays cleanly
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const renderWidth = rect.width;
    const renderHeight = rect.height;

    const render = () => {
      ctx.clearRect(0, 0, renderWidth, renderHeight);

      // 1. Draw Substrate Layer Background
      ctx.fillStyle = '#f8fafc'; // light slate
      ctx.fillRect(0, 0, renderWidth, renderHeight);

      // Substrate bottom banner label
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, renderHeight - 20, renderWidth, 20);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText(`SUBSTRATE MATRIX: ${substrate} (CRYSTALLINE CORE)`, 12, renderHeight - 7);

      // 2. Update and Draw Atom Nodes
      const atoms = atomsRef.current;
      const tempFactor = (temperature - 300) / 900; // 0 to 1
      const vibrationAmp = Math.max(0.2, tempFactor * 4.5); // pixels of wiggle

      atoms.forEach(atom => {
        atom.phase += 0.15 + tempFactor * 0.2;
        // Thermal wiggle
        atom.x = atom.baseX + Math.sin(atom.phase) * vibrationAmp;
        atom.y = atom.baseY + Math.cos(atom.phase * 0.8) * vibrationAmp;
      });

      // Draw Bonds (lines between nearby atoms)
      ctx.lineWidth = 1;
      const bondDistanceLimit = 38;

      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a1 = atoms[i];
          const a2 = atoms[j];
          const dx = a1.x - a2.x;
          const dy = a1.y - a2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < bondDistanceLimit) {
            // High temperatures break bonds or cause instability
            if (temperature > 1050 && Math.random() < 0.15) {
              continue; // simulate cracked bond
            }
            // Dynamic bond color based on quality and state
            const opacity = Math.max(0.15, 1 - dist / bondDistanceLimit);
            ctx.strokeStyle = qualityScore > 75 
              ? `rgba(37, 99, 235, ${opacity * 0.6})` // healthy blue bonds
              : `rgba(148, 163, 184, ${opacity * 0.4})`; // weak gray bonds
            ctx.beginPath();
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(a2.x, a2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Atom Nodes (glowing circles)
      atoms.forEach(atom => {
        ctx.beginPath();
        const radius = atom.type === 'metal' ? 5 : 3.5;
        ctx.arc(atom.x, atom.y, radius, 0, Math.PI * 2);

        // Core fill colors
        if (atom.type === 'metal') {
          ctx.fillStyle = '#2563eb'; // blue
          ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
        } else {
          ctx.fillStyle = '#10b981'; // emerald
          ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
        }

        ctx.shadowBlur = qualityScore > 75 ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Process Gas Precursor Particles
      // Spawning rate matches pressure and flowRate
      const spawnChance = (flowRate / 200) * (Math.pow(10, pressureLog + 7) * 0.1);
      if (Math.random() < Math.min(0.4, spawnChance) && particlesRef.current.length < 40) {
        // Spawn gas particle from top boundary
        particlesRef.current.push({
          x: Math.random() * renderWidth,
          y: 0,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1.5 + (flowRate / 60) * 1.2,
          color: Math.random() > 0.5 ? '#f59e0b' : '#38bdf8', // yellow precursors or sky cooling gas
          size: 2.5 + Math.random() * 2
        });
      }

      // Update gas particles
      const particles = particlesRef.current;
      for (let k = particles.length - 1; k >= 0; k--) {
        const p = particles[k];
        p.x += p.vx;
        p.y += p.vy;

        // Collision check with substrate layer (bottom region) or general boundary deletion
        if (p.y > renderHeight - 24) {
          // If temperature is optimal, there is a chance of dynamic deposition
          if (temperature >= 750 && temperature <= 950 && Math.random() < 0.25) {
            // Flash some thermal absorption
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
            ctx.fill();
          }
          particles.splice(k, 1);
          continue;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [temperature, pressureLog, flowRate, substrate, qualityScore]);

  // Deposition trigger simulation
  const handleTriggerDeposition = () => {
    if (isDepositing) return;
    setIsDepositing(true);
    setDepositionProgress(0);

    // Initial log
    addLog(`Initiating Vapor Epitaxial cycle. Substrate configured to ${substrate}...`);

    let timer = 0;
    const interval = setInterval(() => {
      timer += 10;
      setDepositionProgress(timer);

      if (timer === 20) {
        addLog(`Substrate pre-heating to ${temperature} K in vacuum...`);
      }
      if (timer === 50) {
        addLog(`Introducing precursor gas stream at ${flowRate} sccm flow capacity...`);
      }
      if (timer === 80) {
        addLog(`Analyzing in-situ diagnostic spectrum. Quality Score index: ${qualityScore}%`);
      }

      if (timer >= 100) {
        clearInterval(interval);
        setIsDepositing(false);
        addLog(`Epitaxial synthesis cycle completed. Phase structure: ${phaseState}. Quality Index: ${qualityScore}%.`);
      }
    }, 300);
  };

  const addLog = (msg: string) => {
    setSynthesisLogs(prev => [msg, ...prev.slice(0, 4)]);
  };

  // Preset Buttons
  const applyPreset = (temp: number, press: number, flow: number) => {
    setTemperature(temp);
    setPressureLog(press);
    setFlowRate(flow);
    addLog(`Applied thermodynamic preset. Optimized target configuration loaded.`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-100/50 relative overflow-hidden">
      
      {/* Background glow styling */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters sliders & Preset panels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Interactive Module</span>
            <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-widest text-slate-900">
              Thermodynamic Console
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Adjust synthesis controls below to regulate the vacuum chamber atmosphere in real-time. Find the optimal sweet spot to form perfect hexagonal monolayers.
            </p>
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Optimized Presets</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyPreset(850, -5, 60)}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-slate-700 hover:text-blue-600 rounded-lg text-[9px] font-mono font-bold uppercase transition cursor-pointer"
              >
                MoS2 Monolayer
              </button>
              <button
                onClick={() => applyPreset(500, -3, 140)}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-slate-700 hover:text-blue-600 rounded-lg text-[9px] font-mono font-bold uppercase transition cursor-pointer"
              >
                Amorphous film
              </button>
              <button
                onClick={() => applyPreset(1150, -6, 20)}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-slate-700 hover:text-blue-600 rounded-lg text-[9px] font-mono font-bold uppercase transition cursor-pointer"
              >
                Desorption preset
              </button>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            {/* 1. Temperature Control */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-600 flex items-center gap-1.5 uppercase font-bold">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  Synthesis Temp
                </span>
                <span className="text-slate-900 font-bold">{temperature} K</span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="10"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase">
                <span>300K (Ambient)</span>
                <span>850K (Optimal)</span>
                <span>1200K (Max)</span>
              </div>
            </div>

            {/* 2. Pressure Control */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-600 flex items-center gap-1.5 uppercase font-bold">
                  <Gauge className="h-3.5 w-3.5 text-blue-500" />
                  Chamber Vacuum
                </span>
                <span className="text-slate-900 font-bold">10<sup>{pressureLog}</sup> Torr</span>
              </div>
              <input
                type="range"
                min="-8"
                max="-2"
                step="0.5"
                value={pressureLog}
                onChange={(e) => setPressureLog(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase">
                <span>10⁻⁸ Torr (UHV)</span>
                <span>10⁻⁵.⁵ (Optimal)</span>
                <span>10⁻² Torr (Low Vac)</span>
              </div>
            </div>

            {/* 3. Flow Rate Control */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-600 flex items-center gap-1.5 uppercase font-bold">
                  <Wind className="h-3.5 w-3.5 text-teal-500" />
                  Gas Flow Capacity
                </span>
                <span className="text-slate-900 font-bold">{flowRate} sccm</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={flowRate}
                onChange={(e) => setFlowRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase">
                <span>10 sccm</span>
                <span>50 sccm (Optimal)</span>
                <span>200 sccm</span>
              </div>
            </div>

            {/* Substrate Select */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Substrate Crystal Core</span>
              <div className="grid grid-cols-3 gap-2">
                {(['SiO2', 'Sapphire', 'Quartz'] as const).map(sub => (
                  <button
                    key={sub}
                    onClick={() => setSubstrate(sub)}
                    className={`px-3 py-1.5 text-[9px] uppercase font-bold rounded-lg transition font-mono cursor-pointer ${
                      substrate === sub 
                        ? 'bg-blue-600 text-white border border-blue-600' 
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Action Button */}
          <div className="pt-2">
            <button
              onClick={handleTriggerDeposition}
              disabled={isDepositing}
              className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-sm ${
                isDepositing 
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-md'
              }`}
            >
              {isDepositing ? (
                <>
                  <Atom className="h-4 w-4 text-blue-600 animate-spin" />
                  <span>DEPOSITION IN PROCESS ({depositionProgress}%)</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>START EPITAXIAL DEPOSITION</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Canvas Simulator & Logs Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col h-full justify-between">
          
          {/* Chamber Canvas Frame */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
            <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-10 select-none">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-white" />
                <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-wider">CVD CHAMBER VISUALIZER</span>
              </div>
              <div className="flex items-center space-x-3 text-[9px] font-mono text-slate-400">
                <span>SIM_SCALE: 1:10⁹</span>
                <span className="bg-slate-200 px-1.5 py-0.5 rounded border border-slate-300 font-bold text-slate-700">LIVE</span>
              </div>
            </div>

            {/* Canvas node element */}
            <canvas 
              ref={canvasRef} 
              className="w-full h-[240px] block"
              style={{ minHeight: '240px' }}
            />

            {/* Overlap parameters status bar on canvas */}
            <div className="absolute bottom-6 left-4 right-4 flex justify-between text-[9px] font-mono text-slate-500 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-200/50 shadow-sm pointer-events-none select-none">
              <span className="font-bold">LATTICE: MoS₂ MONOLAYER</span>
              <span className="text-slate-600">ATOMS COUNT: 54</span>
            </div>
          </div>

          {/* Calculated Output Panels Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* 1. Quality Index Gauge Card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Structural Quality</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className={`text-xl font-display font-black tracking-tight ${
                    qualityScore >= 80 ? 'text-emerald-600' : qualityScore >= 50 ? 'text-blue-600' : 'text-rose-600'
                  }`}>
                    {qualityScore}%
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Index</span>
                </div>
              </div>

              {/* Quality rating descriptor */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                {qualityScore >= 80 ? (
                  <span className="text-emerald-700 font-mono flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> PERFECT LAYOUT
                  </span>
                ) : qualityScore >= 50 ? (
                  <span className="text-blue-700 font-mono flex items-center gap-1">
                    <Info className="h-3 w-3" /> STABLE MATRIX
                  </span>
                ) : (
                  <span className="text-rose-700 font-mono flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> HIGH DEFECTS
                  </span>
                )}
              </div>
            </div>

            {/* 2. Deduced Phase Card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Deduced Phase Structure</span>
                <span className={`text-[11px] font-mono font-bold mt-1 inline-block px-2.5 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
                  {phaseState}
                </span>
              </div>

              {/* Derived metrics */}
              <div className="pt-2 border-t border-slate-100 text-[9px] font-mono text-slate-500 flex justify-between">
                <span>MOBILITY: {qualityScore > 75 ? '45' : qualityScore > 55 ? '22' : '4'} cm²/Vs</span>
              </div>
            </div>

          </div>

          {/* Live Diagnostic Logs Terminal */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 font-mono text-[10px] text-slate-350 space-y-1.5 shadow-md">
            <div className="flex justify-between items-center text-[9px] text-slate-500 border-b border-slate-800 pb-1.5 uppercase font-bold">
              <span>Diagnostic Logs Console</span>
              <span>SYSTEM: ONLINE</span>
            </div>
            <div className="space-y-1 h-[80px] overflow-y-auto scrollbar-thin">
              {synthesisLogs.map((log, index) => (
                <div key={index} className="flex items-start space-x-1">
                  <span className="text-blue-500 shrink-0 select-none">&gt;</span>
                  <span className={index === 0 ? 'text-slate-100 font-semibold' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
