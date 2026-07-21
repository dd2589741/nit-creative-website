import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Settings, 
  Activity, 
  RefreshCw, 
  Maximize2 
} from 'lucide-react';

export default function InteractiveOscilloscope() {
  const [signalType, setSignalType] = useState<'sine' | 'square' | 'triangular'>('sine');
  const [frequency, setFrequency] = useState<number>(50); // Hz
  const [amplitude, setAmplitude] = useState<number>(4); // Volts (V)
  const [phaseShift, setPhaseShift] = useState<number>(0);
  const [noise, setNoise] = useState<number>(5); // Percentage noise level

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Support sharp display scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // 1. Draw Oscilloscope Grid Backdrop (Dark neon green CRT tube style)
      ctx.fillStyle = '#0b0f19'; // deep cosmic blue-black
      ctx.fillRect(0, 0, width, height);

      // Major grid divisions (green dotted lines)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;

      // Vertical grids
      const divisionX = width / 10;
      for (let x = divisionX; x < width; x += divisionX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grids
      const divisionY = height / 8;
      for (let y = divisionY; y < height; y += divisionY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw horizontal & vertical center axes (thicker lines with tick marks)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      
      // Horizontal center
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Vertical center
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Center axis tick marks
      ctx.fillStyle = '#475569';
      for (let x = 10; x < width; x += 10) {
        ctx.fillRect(x - 0.5, height / 2 - 3, 1, 6);
      }
      for (let y = 10; y < height; y += 10) {
        ctx.fillRect(width / 2 - 3, y - 0.5, 6, 1);
      }

      // 2. Generate and Render Waveform Points
      ctx.beginPath();
      ctx.strokeStyle = '#10b981'; // Neon emerald green
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;

      const centerY = height / 2;
      const points: Array<{ x: number; y: number }> = [];

      for (let x = 0; x < width; x++) {
        // Map pixel x coordinate to angular phase
        const normalizedX = x / width;
        const angularFreq = (frequency / 10) * Math.PI * 2;
        const timeShift = frame * 0.05 + phaseShift;

        let waveVal = 0;
        
        // Compute base periodic function
        const basePhase = normalizedX * angularFreq - timeShift;
        if (signalType === 'sine') {
          waveVal = Math.sin(basePhase);
        } else if (signalType === 'square') {
          waveVal = Math.sign(Math.sin(basePhase));
        } else if (signalType === 'triangular') {
          // Sawtooth triangle formulation
          waveVal = (2 / Math.PI) * Math.asin(Math.sin(basePhase));
        }

        // Apply amplitude scaling (Map Volt metrics to viewport height)
        const voltPixels = (amplitude / 10) * (height * 0.38);
        
        // Add electronic thermal noise component
        const noiseVal = (Math.random() - 0.5) * (noise / 100) * (height * 0.15);

        const y = centerY + (waveVal * voltPixels) + noiseVal;
        points.push({ x, y });
      }

      // Draw Waveform curve
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      // Reset shadow glow
      ctx.shadowBlur = 0;

      // 3. Draw On-Screen DSO HUD metrics (analog readout style)
      ctx.fillStyle = '#10b981';
      ctx.font = '8px monospace';
      ctx.fillText(`CH1 1.00V~  M 5.00ms  A CH1 0.00V`, 10, 15);
      ctx.fillText(`FREQ: ${(frequency * 1.5).toFixed(2)} Hz`, 10, height - 25);
      ctx.fillText(`Vpp: ${(amplitude * 2).toFixed(2)} V`, 10, height - 12);
      ctx.fillText(`NOISE: ${noise}%`, width - 70, height - 12);
      ctx.fillText(`RUNNING`, width - 55, 15);

      // Draw trigger cursor notch on right axis
      ctx.beginPath();
      ctx.moveTo(width - 5, centerY);
      ctx.lineTo(width, centerY - 4);
      ctx.lineTo(width, centerY + 4);
      ctx.closePath();
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [signalType, frequency, amplitude, phaseShift, noise]);

  const handleResetControls = () => {
    setSignalType('sine');
    setFrequency(50);
    setAmplitude(4);
    setNoise(5);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-[300px] shadow-md shadow-slate-100/50 overflow-hidden relative">
      <div className="space-y-4">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Activity className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">
                ECE DSO Bench
              </h4>
              <p className="text-[8px] text-slate-500 font-mono uppercase">Live Signal Monitor</p>
            </div>
          </div>

          <div className="flex space-x-1">
            {(['sine', 'square', 'triangular'] as const).map(type => (
              <button
                key={type}
                onClick={() => setSignalType(type)}
                className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded border transition cursor-pointer ${
                  signalType === type 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Live CRT Signal Box */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
          <canvas 
            ref={canvasRef} 
            className="w-full h-[125px] block bg-[#0b0f19]"
            style={{ minHeight: '125px' }}
          />
        </div>

        {/* Tactile control knobs (Sliders) */}
        <div className="grid grid-cols-3 gap-4 text-[9px] font-mono">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-tight block">Freq (Hz)</span>
            <input
              type="range"
              min="10"
              max="150"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-tight block">Amplitude (V)</span>
            <input
              type="range"
              min="1"
              max="10"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-tight block">Noise Component</span>
            <input
              type="range"
              min="0"
              max="25"
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

      </div>

      {/* Footer trigger control reset */}
      <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[9px] font-mono text-slate-400">
        <span className="uppercase">CH1: 50Ω COUPLING</span>
        <button 
          onClick={handleResetControls}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-bold uppercase transition cursor-pointer"
        >
          <RefreshCw className="h-2.5 w-2.5" />
          <span>Reset DSO</span>
        </button>
      </div>

    </div>
  );
}
