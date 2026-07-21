import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Settings, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  Zap,
  GitCommit,
  Radio,
  Gauge
} from 'lucide-react';

// Resistor band colors
const BAND_COLORS = [
  { name: 'Black', hex: '#000000', value: 0, multiplier: 1, text: 'text-white' },
  { name: 'Brown', hex: '#8B4513', value: 1, multiplier: 10, text: 'text-white' },
  { name: 'Red', hex: '#FF0000', value: 2, multiplier: 100, text: 'text-white' },
  { name: 'Orange', hex: '#FF8C00', value: 3, multiplier: 1000, text: 'text-slate-900' },
  { name: 'Yellow', hex: '#FFD700', value: 4, multiplier: 10000, text: 'text-slate-900' },
  { name: 'Green', hex: '#228B22', value: 5, multiplier: 100000, text: 'text-white' },
  { name: 'Blue', hex: '#0000FF', value: 6, multiplier: 1000000, text: 'text-white' },
  { name: 'Violet', hex: '#8A2BE2', value: 7, multiplier: 10000000, text: 'text-white' },
  { name: 'Gray', hex: '#808080', value: 8, multiplier: 100000000, text: 'text-white' },
  { name: 'White', hex: '#FFFFFF', value: 9, multiplier: 1000000000, text: 'text-slate-900' }
];

const TOLERANCE_BANDS = [
  { name: 'Gold', hex: '#D4AF37', tolerance: 5 },
  { name: 'Silver', hex: '#C0C0C0', tolerance: 10 },
  { name: 'Brown', hex: '#8B4513', tolerance: 1 },
  { name: 'Red', hex: '#FF0000', tolerance: 2 }
];

export default function InteractiveEceBench() {
  // State for logic gate analyzer
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('AND');
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(true);

  // Resistor calculator state
  const [band1, setBand1] = useState(2); // Red (2)
  const [band2, setBand2] = useState(7); // Violet (7)
  const [band3, setBand3] = useState(3); // Orange (1K multiplier)
  const [tolerance, setTolerance] = useState(0); // Gold (5%)

  // Probe multimeter state
  const [probeActive, setProbeActive] = useState(false);
  const [measuredVolts, setMeasuredVolts] = useState<number>(3.32);
  const [probePos, setProbePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute logic output
  const computeLogic = (): boolean => {
    if (gateType === 'AND') return inputA && inputB;
    if (gateType === 'OR') return inputA || inputB;
    if (gateType === 'XOR') return inputA !== inputB;
    return false;
  };

  const outputY = computeLogic();

  // Compute resistor value
  const calculateResistance = () => {
    const val = (BAND_COLORS[band1].value * 10 + BAND_COLORS[band2].value) * BAND_COLORS[band3].multiplier;
    const tol = TOLERANCE_BANDS[tolerance].tolerance;

    if (val >= 1e9) {
      return { text: `${(val / 1e9).toFixed(1)} GΩ`, tol };
    }
    if (val >= 1e6) {
      return { text: `${(val / 1e6).toFixed(1)} MΩ`, tol };
    }
    if (val >= 1e3) {
      return { text: `${(val / 1e3).toFixed(1)} kΩ`, tol };
    }
    return { text: `${val} Ω`, tol };
  };

  const { text: resistanceText, tol: toleranceVal } = calculateResistance();

  // Mouse hover listener to simulate multimeter probe reading coordinates
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!probeActive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Relative coordinates
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;
      setProbePos({ x: rx, y: ry });

      // Generate simulated circuit voltage based on mouse position
      const noise = Math.sin(e.clientX * 0.05) * Math.cos(e.clientY * 0.05) * 0.15;
      const baseValue = (Math.abs(Math.sin((e.clientX + e.clientY) * 0.005)) * 4.8).toFixed(3);
      setMeasuredVolts(Number((parseFloat(baseValue) + noise).toFixed(3)));
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [probeActive]);

  return (
    <div 
      ref={containerRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 relative z-10"
    >
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Interactive ECE Bench</span>
          <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            Diagnostic & Logic Testing Suite
          </h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            Simulate real-world electrical lab equipment & schematic validations.
          </p>
        </div>

        {/* Dynamic multimeter activation button */}
        <button
          onClick={() => setProbeActive(!probeActive)}
          className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase transition flex items-center space-x-1.5 cursor-pointer shadow-sm ${
            probeActive 
              ? 'bg-amber-500 text-white border-amber-600 animate-pulse' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
        >
          <Radio className="h-3.5 w-3.5" />
          <span>{probeActive ? 'PROBE ACTIVE (Hover Screen)' : 'ENABLE MULTIMETER PROBE'}</span>
        </button>
      </div>

      {/* BENCH UTILITIES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. LOGIC ANALYZER GATE BOX (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Module 01 / Gate Inspector</span>
                <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider">Logic Gate Waveform Analyzer</h3>
              </div>

              {/* Selector */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-[9px] font-mono font-bold border border-slate-200">
                {(['AND', 'OR', 'XOR'] as const).map(gate => (
                  <button
                    key={gate}
                    onClick={() => setGateType(gate)}
                    className={`px-2.5 py-1 rounded-md uppercase transition cursor-pointer ${
                      gateType === gate 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {gate}
                  </button>
                ))}
              </div>
            </div>

            {/* Schematic Graphic Layout */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 h-[150px] relative flex items-center justify-center select-none">
              
              {/* Left Inputs Nodes */}
              <div className="absolute left-6 space-y-10">
                {/* Input A */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setInputA(!inputA)}
                    className={`w-7 h-7 rounded-lg font-mono text-[10px] font-bold border transition flex items-center justify-center cursor-pointer ${
                      inputA 
                        ? 'bg-blue-500 text-white border-blue-600 shadow' 
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {inputA ? '1' : '0'}
                  </button>
                  <span className="text-[9px] font-mono text-slate-400">PIN_A</span>
                </div>

                {/* Input B */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setInputB(!inputB)}
                    className={`w-7 h-7 rounded-lg font-mono text-[10px] font-bold border transition flex items-center justify-center cursor-pointer ${
                      inputB 
                        ? 'bg-blue-500 text-white border-blue-600 shadow' 
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {inputB ? '1' : '0'}
                  </button>
                  <span className="text-[9px] font-mono text-slate-400">PIN_B</span>
                </div>
              </div>

              {/* Central Schematic Line Connectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Connection lines to gate */}
                <line x1="60" y1="50" x2="115" y2="50" stroke={inputA ? '#3b82f6' : '#cbd5e1'} strokeWidth="1.5" />
                <line x1="60" y1="100" x2="115" y2="100" stroke={inputB ? '#3b82f6' : '#cbd5e1'} strokeWidth="1.5" />
                
                {/* Output lines from gate */}
                <line x1="185" y1="75" x2="240" y2="75" stroke={outputY ? '#10b981' : '#cbd5e1'} strokeWidth="1.5" />
              </svg>

              {/* Dynamic Gate Symbol */}
              <div className="relative z-10 w-20 h-14 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center font-mono font-black text-sm text-slate-800 shadow-sm uppercase tracking-widest">
                {gateType}
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-200 rounded-full border border-slate-400 flex items-center justify-center text-[7px] font-bold">Y</div>
              </div>

              {/* Right Output Node Y */}
              <div className="absolute right-6 flex items-center space-x-2">
                <span className="text-[9px] font-mono text-slate-400">OUT_Y</span>
                <div className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center font-mono text-xs font-black shadow-inner ${
                  outputY 
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-200' 
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  {outputY ? '1' : '0'}
                </div>
              </div>

            </div>

            {/* Dynamic Truth Table Display */}
            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[8px] text-slate-500 border border-slate-100 rounded-xl p-2.5 bg-slate-50/50">
              <div className="border-r border-slate-100">
                <span className="block font-bold text-slate-400">PIN_A</span>
                <span className={inputA ? 'text-blue-600 font-bold' : ''}>{inputA ? 'HIGH' : 'LOW'}</span>
              </div>
              <div className="border-r border-slate-100">
                <span className="block font-bold text-slate-400">PIN_B</span>
                <span className={inputB ? 'text-blue-600 font-bold' : ''}>{inputB ? 'HIGH' : 'LOW'}</span>
              </div>
              <div className="border-r border-slate-100">
                <span className="block font-bold text-slate-400">GATE</span>
                <span className="text-slate-800 font-bold">{gateType}</span>
              </div>
              <div>
                <span className="block font-bold text-slate-400">OUTPUT_Y</span>
                <span className={outputY ? 'text-emerald-600 font-bold' : 'text-slate-500'}>{outputY ? 'HIGH' : 'LOW'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* 2. RESISTOR SPECTROMETER BAND CALCULATOR (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-md">
          
          <div className="space-y-4">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Module 02 / Color rings</span>
              <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider">Resistor Spectrometer</h3>
            </div>

            {/* Visual Resistor Body Graphic */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 h-[90px] relative flex items-center justify-center select-none">
              
              {/* Conducting wire background */}
              <div className="w-[85%] h-1 bg-slate-300 absolute" />

              {/* Main Ceramic beige body */}
              <div className="w-[140px] h-8 bg-[#eedca5] rounded-lg border border-[#dfca8d] relative z-10 flex justify-between items-center px-4 overflow-hidden shadow-sm">
                
                {/* 1st Digit Band */}
                <div 
                  className="w-2.5 h-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: BAND_COLORS[band1].hex }}
                />

                {/* 2nd Digit Band */}
                <div 
                  className="w-2.5 h-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: BAND_COLORS[band2].hex }}
                />

                {/* Multiplier Band */}
                <div 
                  className="w-2.5 h-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: BAND_COLORS[band3].hex }}
                />

                {/* Gap placeholder */}
                <div className="w-4 h-full" />

                {/* Tolerance Band */}
                <div 
                  className="w-2.5 h-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: TOLERANCE_BANDS[tolerance].hex }}
                />

              </div>

            </div>

            {/* Tactical Color Selectors row */}
            <div className="grid grid-cols-4 gap-2">
              
              {/* Band 1 Selector */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Band 1</span>
                <select
                  value={band1}
                  onChange={(e) => setBand1(Number(e.target.value))}
                  className="w-full text-[9px] font-mono p-1 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-bold text-slate-700"
                >
                  {BAND_COLORS.slice(0, 9).map((b, idx) => (
                    <option key={b.name} value={idx}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Band 2 Selector */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Band 2</span>
                <select
                  value={band2}
                  onChange={(e) => setBand2(Number(e.target.value))}
                  className="w-full text-[9px] font-mono p-1 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-bold text-slate-700"
                >
                  {BAND_COLORS.map((b, idx) => (
                    <option key={b.name} value={idx}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Multiplier Band Selector */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Multiplier</span>
                <select
                  value={band3}
                  onChange={(e) => setBand3(Number(e.target.value))}
                  className="w-full text-[9px] font-mono p-1 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-bold text-slate-700"
                >
                  {BAND_COLORS.slice(0, 8).map((b, idx) => (
                    <option key={b.name} value={idx}>10^{idx}</option>
                  ))}
                </select>
              </div>

              {/* Tolerance Selector */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Tolerance</span>
                <select
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full text-[9px] font-mono p-1 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-bold text-slate-700"
                >
                  {TOLERANCE_BANDS.map((t, idx) => (
                    <option key={t.name} value={idx}>±{t.tolerance}%</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Calculated Result Output Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex justify-between items-center">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase font-bold block">Calculated Resistance</span>
                <span className="text-sm font-mono font-black text-blue-600 uppercase tracking-tight">{resistanceText}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-mono text-slate-400 uppercase font-bold block">Accuracy Limit</span>
                <span className="text-[10px] font-mono text-slate-700 font-bold uppercase">±{toleranceVal}%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FLOATING DIGITAL MULTIMETER BOX (Overlay tracking probe active state) */}
      <AnimatePresence>
        {probeActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-6 right-6 w-[200px] bg-amber-500 border border-amber-600 rounded-2xl p-4 shadow-2xl text-slate-900 z-50 flex flex-col space-y-3"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Handheld DMM Header */}
            <div className="flex justify-between items-center text-[8px] font-mono font-black border-b border-amber-600 pb-1.5 uppercase">
              <span>AIST_FLUKE_97</span>
              <span className="text-amber-950 animate-pulse">● CAL_ON</span>
            </div>

            {/* CRT Display Output (glowing dark liquid crystal) */}
            <div className="bg-[#1e293b] text-[#10b981] p-2.5 rounded-lg font-mono text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-1 left-1.5 text-[6px] text-emerald-600/60 uppercase">AUTO_DCV</div>
              <div className="text-lg font-black tracking-widest mt-1">
                {measuredVolts.toFixed(3)} V
              </div>
              <div className="flex justify-between text-[6px] text-emerald-600/60 uppercase mt-1">
                <span>RANGE: 10.0V</span>
                <span>RMS_SAMPLE</span>
              </div>
            </div>

            {/* Handheld tactile switch representation */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-amber-600 bg-amber-600 flex items-center justify-center relative">
                <div className="w-1 h-5 bg-slate-900 rounded-full absolute -top-1" />
                <div className="w-4 h-4 bg-slate-800 rounded-full" />
              </div>
            </div>

            <div className="text-[7px] font-mono text-center uppercase tracking-tight text-amber-950">
              Hover cursor over background elements to inspect localized voltage points!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multimeter lead line tracing */}
      {probeActive && (
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-40">
          <path
            d={`M ${probePos.x},${probePos.y} Q ${probePos.x + 80},${probePos.y + 120} ${window.innerWidth - 100},${window.innerHeight - 100}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 3"
            className="animate-pulse"
          />
          <circle cx={probePos.x} cy={probePos.y} r="4" fill="#ef4444" />
        </svg>
      )}

    </div>
  );
}
