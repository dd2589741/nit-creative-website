import React, { useState, useEffect, useRef } from 'react';
import { Activity, Radio, Info, Play, Pause, RefreshCw, Zap, Sliders, Camera, AlertCircle, Eye, EyeOff, Sparkles, HelpCircle } from 'lucide-react';

interface SignalConfig {
  waveform: 'sine' | 'square' | 'triangle' | 'sawtooth';
  frequency: number; // in Hz
  amplitude: number; // in V (peak)
  offset: number;    // in V
  phase: number;     // in degrees
}

export default function OscilloscopeSimulator() {
  // Signal Generator (Channel 1)
  const [sig1, setSig1] = useState<SignalConfig>({
    waveform: 'sine',
    frequency: 120,
    amplitude: 3.5,
    offset: 0,
    phase: 0,
  });

  // Signal Generator (Channel 2 - Independent source)
  const [sig2, setSig2] = useState<SignalConfig>({
    waveform: 'sine',
    frequency: 240,
    amplitude: 2.5,
    offset: 0,
    phase: 90, // Phase shifted by default
  });

  // Circuit Experiment Mode
  const [circuitMode, setCircuitMode] = useState<'none' | 'lowpass' | 'highpass' | 'halfwave' | 'fullwave'>('none');
  const [filterR, setFilterR] = useState<number>(1000); // 1k ohm
  const [filterC, setFilterC] = useState<number>(1.5);  // 1.5 uF

  // Scope Controls
  const [timeDiv, setTimeDiv] = useState<number>(1); // ms per division
  const [ch1VoltsDiv, setCh1VoltsDiv] = useState<number>(2); // Volts per division
  const [ch2VoltsDiv, setCh2VoltsDiv] = useState<number>(2); // Volts per division
  const [ch1Offset, setCh1Offset] = useState<number>(0); // Vertical offset in Volts
  const [ch2Offset, setCh2Offset] = useState<number>(0); // Vertical offset in Volts
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [coupling, setCoupling] = useState<'AC' | 'DC'>('DC');
  
  // Advanced Visuals
  const [ch1Enabled, setCh1Enabled] = useState<boolean>(true);
  const [ch2Enabled, setCh2Enabled] = useState<boolean>(true);
  const [noiseLevel, setNoiseLevel] = useState<number>(0.05); // Realistic fuzz (0 to 0.5V)
  const [isXYMode, setIsXYMode] = useState<boolean>(false); // Lissajous mode
  const [glowIntensity, setGlowIntensity] = useState<number>(6); // Glowing trace effect
  const [triggerLevel, setTriggerLevel] = useState<number>(0); // Trigger level in Volts
  const [activePreset, setActivePreset] = useState<string>('default');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Constants
  const NUM_DIVS_X = 10;
  const NUM_DIVS_Y = 8;

  // Presets selector
  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    setIsXYMode(false);
    setCircuitMode('none');
    setCh1Enabled(true);
    setCh2Enabled(true);

    switch (preset) {
      case 'default':
        setSig1({ waveform: 'sine', frequency: 120, amplitude: 3.5, offset: 0, phase: 0 });
        setSig2({ waveform: 'sine', frequency: 240, amplitude: 2.5, offset: 0, phase: 90 });
        setTimeDiv(1);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        break;
      case 'lissajous-circle':
        setSig1({ waveform: 'sine', frequency: 100, amplitude: 3.0, offset: 0, phase: 0 });
        setSig2({ waveform: 'sine', frequency: 100, amplitude: 3.0, offset: 0, phase: 90 });
        setTimeDiv(2);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        setIsXYMode(true);
        break;
      case 'lissajous-ratio':
        setSig1({ waveform: 'sine', frequency: 100, amplitude: 3.0, offset: 0, phase: 0 });
        setSig2({ waveform: 'sine', frequency: 200, amplitude: 3.0, offset: 0, phase: 45 });
        setTimeDiv(2);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        setIsXYMode(true);
        break;
      case 'lissajous-complex':
        setSig1({ waveform: 'sine', frequency: 150, amplitude: 3.0, offset: 0, phase: 0 });
        setSig2({ waveform: 'sine', frequency: 250, amplitude: 3.0, offset: 0, phase: 30 });
        setTimeDiv(2);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        setIsXYMode(true);
        break;
      case 'lowpass-exp':
        setSig1({ waveform: 'sine', frequency: 300, amplitude: 4.0, offset: 0, phase: 0 });
        setCircuitMode('lowpass');
        setFilterR(1500);
        setFilterC(1.0);
        setTimeDiv(1);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        break;
      case 'rectifier-exp':
        setSig1({ waveform: 'sine', frequency: 50, amplitude: 5.0, offset: 0, phase: 0 });
        setCircuitMode('fullwave');
        setTimeDiv(5);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        setCh1Offset(0);
        setCh2Offset(0);
        break;
      case 'noisy-square':
        setSig1({ waveform: 'square', frequency: 80, amplitude: 3.0, offset: 0, phase: 0 });
        setNoiseLevel(0.35);
        setTimeDiv(2);
        setCh1VoltsDiv(2);
        setCh2VoltsDiv(2);
        break;
    }
  };

  // Compute actual circuit effects on Channel 2
  const getChannel2Signal = (t: number, ch1Value: number, rawNoise: number) => {
    // If circuit experiment mode is OFF, return the independent CH2 generator signal
    if (circuitMode === 'none') {
      return generateRawSignal(t, sig2, rawNoise, false);
    }

    // Frequency in radians/sec
    const f = sig1.frequency;
    const omega = 2 * Math.PI * f;
    const R = filterR;
    const C = filterC * 1e-6; // microfarads
    const XC = 1 / (omega * C || 1);
    const Z = Math.sqrt(R * R + XC * XC);

    switch (circuitMode) {
      case 'lowpass': {
        const attenuation = XC / Z;
        const phaseLag = -Math.atan(omega * R * C);
        const tShifted = t + phaseLag / omega;
        
        return generateRawSignal(tShifted, {
          ...sig1,
          amplitude: sig1.amplitude * attenuation,
        }, rawNoise, true);
      }
      case 'highpass': {
        const attenuation = R / Z;
        const phaseLead = Math.atan(XC / R);
        const tShifted = t + phaseLead / omega;
        
        return generateRawSignal(tShifted, {
          ...sig1,
          amplitude: sig1.amplitude * attenuation,
        }, rawNoise, true);
      }
      case 'halfwave': {
        const drop = 0.7; // Silicon diode drop
        const value = ch1Value - drop;
        const outVal = value > 0 ? value : 0;
        // Add minimal noise if conducting
        return outVal + (outVal > 0 ? rawNoise * 0.3 : 0);
      }
      case 'fullwave': {
        const drop = 1.4; // Bridge rectifier (2 diode drops)
        const value = Math.abs(ch1Value) - drop;
        const outVal = value > 0 ? value : 0;
        return outVal + (outVal > 0 ? rawNoise * 0.3 : 0);
      }
      default:
        return ch1Value;
    }
  };

  const generateRawSignal = (t: number, config: SignalConfig, rawNoise: number, isFiltered: boolean): number => {
    const f = config.frequency;
    const A = config.amplitude;
    const phi = (config.phase * Math.PI) / 180;
    const dc = config.offset;

    let value = 0;
    const angle = 2 * Math.PI * f * t + phi;

    switch (config.waveform) {
      case 'sine':
        value = Math.sin(angle);
        break;
      case 'square':
        value = Math.sin(angle) >= 0 ? 1 : -1;
        break;
      case 'triangle':
        value = (2 / Math.PI) * Math.asin(Math.sin(angle));
        break;
      case 'sawtooth':
        value = 2 * (t * f + (config.phase / 360) - Math.floor(t * f + (config.phase / 360) + 0.5));
        break;
    }

    // Combine base signal with coupling and noise
    const baseValue = value * A + (coupling === 'DC' ? dc : 0);
    
    // Low pass filter slightly filters out high-frequency noise
    const noiseFactor = isFiltered && circuitMode === 'lowpass' ? 0.3 : 1;
    return baseValue + rawNoise * noiseFactor;
  };

  // Canvas drawing loop
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Premium Retro CRT dark slate background
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal & vertical graticule grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.9)'; // deep slate
        ctx.lineWidth = 0.5;

        // Vertical division grid lines
        for (let i = 0; i <= NUM_DIVS_X; i++) {
          const x = (width / NUM_DIVS_X) * i;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();

          // Sub-division tick marks on center axes
          if (i === NUM_DIVS_X / 2) {
            ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)'; // middle slate
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(30, 41, 59, 0.9)';
            ctx.lineWidth = 0.5;

            // Draw ticks on center vertical axis
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
            for (let ty = 0; ty < height; ty += 10) {
              ctx.beginPath();
              ctx.moveTo(x - 4, ty);
              ctx.lineTo(x + 4, ty);
              ctx.stroke();
            }
          }
        }

        // Horizontal division grid lines
        for (let i = 0; i <= NUM_DIVS_Y; i++) {
          const y = (height / NUM_DIVS_Y) * i;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();

          // Center horizontal axis line
          if (i === NUM_DIVS_Y / 2) {
            ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(30, 41, 59, 0.9)';
            ctx.lineWidth = 0.5;

            // Draw ticks on center horizontal axis
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
            for (let tx = 0; tx < width; tx += 10) {
              ctx.beginPath();
              ctx.moveTo(tx, y - 4);
              ctx.lineTo(tx, y + 4);
              ctx.stroke();
            }
          }
        }
      }

      const halfHeight = height / 2;
      const halfWidth = width / 2;

      const ch1VoltsPerPx = ch1VoltsDiv / (height / NUM_DIVS_Y);
      const ch2VoltsPerPx = ch2VoltsDiv / (height / NUM_DIVS_Y);

      // Increment scroll timer for moving wave effect
      if (!isPaused) {
        // Adjust scroll rate to match frequency nicely
        const speedMultiplier = timeDiv < 0.5 ? 0.3 : timeDiv < 2 ? 1 : 2;
        timeRef.current += 0.00015 * speedMultiplier;
      }

      const tStart = timeRef.current;

      // Render Lissajous Patterns (XY Mode)
      if (isXYMode) {
        // XY Mode plots CH1 Voltage on X, CH2 Voltage on Y
        const numPoints = 1200;
        const xyPoints: { x: number; y: number }[] = [];

        // Scale factors: center of screen is (halfWidth, halfHeight)
        // Max voltage span is determined by Volts/Div * Divs (e.g., 2V/div * 10div = 20V total screen)
        // X-Scale: width px / (ch1VoltsDiv * 10) = px per Volt
        const xVoltsPerPx = ch1VoltsDiv / (width / NUM_DIVS_X);
        const yVoltsPerPx = ch2VoltsDiv / (height / NUM_DIVS_Y);

        // We sweep time to plot a closed curve or moving Lissajous
        const sweepPeriod = 0.08; // Seconds of data

        for (let i = 0; i < numPoints; i++) {
          const relativeTime = (i / numPoints) * sweepPeriod;
          const t = tStart + relativeTime;

          // Generate simulated noise values
          const rawNoise1 = (Math.random() - 0.5) * noiseLevel;
          const rawNoise2 = (Math.random() - 0.5) * noiseLevel;

          const v1 = generateRawSignal(t, sig1, rawNoise1, false);
          const v2 = getChannel2Signal(t, v1, rawNoise2);

          // Translate to screen coords (centered, with offsets added)
          const pxX = halfWidth + ((v1 + ch1Offset) / xVoltsPerPx);
          const pxY = halfHeight - ((v2 + ch2Offset) / yVoltsPerPx);

          xyPoints.push({ x: pxX, y: pxY });
        }

        // Draw Lissajous Figure in Emerald Glowing phosphor
        ctx.beginPath();
        ctx.strokeStyle = '#10b981'; // emerald green
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = glowIntensity;
        ctx.lineWidth = 3;

        for (let i = 0; i < xyPoints.length; i++) {
          const pt = xyPoints[i];
          if (pt.x >= 0 && pt.x <= width && pt.y >= 0 && pt.y <= height) {
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw HUD overlay for XY Mode
        ctx.fillStyle = '#10b981';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`XY LISSAJOUS MODE`, 15, 25);
        ctx.fillText(`Ratio X(CH1):Y(CH2) ≈ ${(sig1.frequency / (sig2.frequency || 1)).toFixed(2)}`, 15, 40);

      } else {
        // Standard Time-Domain sweep mode (YT Mode)
        const totalTimeSpan = NUM_DIVS_X * (timeDiv * 1e-3); // total screen time in seconds
        
        const ch1Points: { x: number; y: number }[] = [];
        const ch2Points: { x: number; y: number }[] = [];

        for (let px = 0; px < width; px++) {
          const relativeTime = (px / width) * totalTimeSpan;
          const t = tStart + relativeTime;

          // Generate simulated noise
          const rawNoise1 = (Math.random() - 0.5) * noiseLevel;
          const rawNoise2 = (Math.random() - 0.5) * noiseLevel;

          // Channel 1 Signal Voltage
          const v1 = generateRawSignal(t, sig1, rawNoise1, false);
          // Pixel Y calculation (invert for graphics coordinate standard)
          const y1 = halfHeight - ((v1 + ch1Offset) / ch1VoltsPerPx);
          ch1Points.push({ x: px, y: y1 });

          // Channel 2 Signal Voltage (filtered or independent)
          const v2 = getChannel2Signal(t, v1, rawNoise2);
          const y2 = halfHeight - ((v2 + ch2Offset) / ch2VoltsPerPx);
          ch2Points.push({ x: px, y: y2 });
        }

        // Render Channel 1 Trace (Golden Amber Glow)
        if (ch1Enabled) {
          ctx.beginPath();
          ctx.strokeStyle = '#f59e0b'; // Amber-500
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = glowIntensity;
          ctx.lineWidth = 2.5;

          let isFirst = true;
          for (let i = 0; i < ch1Points.length; i++) {
            const pt = ch1Points[i];
            if (pt.y >= 0 && pt.y <= height) {
              if (isFirst) {
                ctx.moveTo(pt.x, pt.y);
                isFirst = false;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              isFirst = true; // reset path if segment goes out of bounds
            }
          }
          ctx.stroke();
        }

        // Render Channel 2 Trace (Neon Cyan Glow)
        if (ch2Enabled) {
          ctx.beginPath();
          ctx.strokeStyle = '#06b6d4'; // Cyan-500
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = glowIntensity;
          ctx.lineWidth = 2.5;

          let isFirst = true;
          for (let i = 0; i < ch2Points.length; i++) {
            const pt = ch2Points[i];
            if (pt.y >= 0 && pt.y <= height) {
              if (isFirst) {
                ctx.moveTo(pt.x, pt.y);
                isFirst = false;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              isFirst = true;
            }
          }
          ctx.stroke();
        }

        // Reset glowing trace filters
        ctx.shadowBlur = 0;

        // Draw Trigger Level Indicator line if adjusted
        if (Math.abs(triggerLevel) < 8) {
          const trigY = halfHeight - (triggerLevel / ch1VoltsPerPx);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // soft red
          ctx.lineWidth = 0.8;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(0, trigY);
          ctx.lineTo(width, trigY);
          ctx.stroke();
          ctx.setLineDash([]); // clear dash

          // Draw small trig indicator text
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(`T: ${triggerLevel.toFixed(1)}V`, width - 50, trigY - 3);
        }
      }

      // Render HUD readout panels
      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '10px "JetBrains Mono", monospace';
      
      // Bottom Calibration Overlays
      if (ch1Enabled) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`CH1: ${ch1VoltsDiv}V/Div`, 15, height - 15);
      }
      if (ch2Enabled) {
        ctx.fillStyle = '#06b6d4';
        const ch2Text = circuitMode !== 'none' ? `CH2(Filtr): ${ch2VoltsDiv}V/Div` : `CH2(Ind): ${ch2VoltsDiv}V/Div`;
        ctx.fillText(ch2Text, 130, height - 15);
      }
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`M: ${timeDiv}ms/Div`, width - 110, height - 15);

      // Top corner active experiment circuit overlay
      if (circuitMode !== 'none') {
        ctx.fillStyle = '#22d3ee'; // bright cyan
        ctx.fillText(`ACTIVE DEPT MODULE: ${circuitMode.toUpperCase()}`, 15, 20);
      }

      // Trigger locked status light
      ctx.fillStyle = '#10b981'; // emerald green
      ctx.beginPath();
      ctx.arc(width - 25, 20, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.fillText("TRIG'D LOCK", width - 105, 23);

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [sig1, sig2, circuitMode, filterR, filterC, timeDiv, ch1VoltsDiv, ch2VoltsDiv, ch1Offset, ch2Offset, isPaused, showGrid, coupling, ch1Enabled, ch2Enabled, noiseLevel, isXYMode, glowIntensity, triggerLevel]);

  // Calculations for active diagnostic tables
  const vppCh1 = sig1.amplitude * 2;
  const vmaxCh1 = sig1.amplitude + sig1.offset;
  const vrmsCh1 = sig1.waveform === 'sine' ? sig1.amplitude / Math.sqrt(2) : sig1.waveform === 'square' ? sig1.amplitude : sig1.amplitude / Math.sqrt(3);
  const periodCh1 = (1 / sig1.frequency) * 1000; // in ms

  const vppCh2 = circuitMode === 'none' ? sig2.amplitude * 2 : sig1.amplitude * 2 * (circuitMode.startsWith('low') ? 0.6 : 0.9); // estimate
  const fCutoff = circuitMode === 'lowpass' || circuitMode === 'highpass' 
    ? 1 / (2 * Math.PI * filterR * (filterC * 1e-6))
    : 0;

  // Screenshot capture handler
  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `NIT_Nagaland_DSO_Capture_${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  // Helper function to render a realistic rotating dial SVG
  const renderRotaryDial = (label: string, value: string | number, angle: number) => {
    return (
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-slate-400 font-mono font-medium block uppercase tracking-wider mb-1.5">{label}</span>
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-b from-slate-750 to-slate-850 border border-slate-700 flex items-center justify-center shadow-md shadow-black/40">
          {/* Inner ticks */}
          <div 
            className="absolute w-10 h-10 rounded-full border border-dashed border-slate-800/40" 
            style={{ transform: `rotate(${angle}deg)` }}
          >
            {/* The tick mark */}
            <div className="absolute top-1 left-1/2 -ml-0.5 w-1 h-2 bg-amber-500 rounded-sm" />
          </div>
          {/* Center core */}
          <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center shadow-inner">
            <span className="text-[7px] text-slate-500 font-mono">DSO</span>
          </div>
        </div>
        <span className="text-[10px] text-amber-400 font-mono font-bold mt-1.5">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-850 rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto my-6" id="dso-simulator">
      
      {/* 1. Instrument Front Bezel Header */}
      <div className="bg-slate-950 px-6 py-4 flex flex-wrap items-center justify-between border-b border-slate-850 shadow-md">
        <div className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <Activity className="h-6 w-6 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              NAGALAND INSTRUMENTS • DSO-8024SX
            </h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Dual-Channel Digital Storage Oscilloscope • Lab Station #4</p>
          </div>
        </div>

        {/* Preset selections styled as visual console keys */}
        <div className="flex flex-wrap gap-1.5 mt-3 lg:mt-0 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider px-2 py-1 self-center">Presets:</span>
          {[
            { id: 'default', label: 'YT Scope Default' },
            { id: 'lissajous-circle', label: 'XY Circle' },
            { id: 'lissajous-ratio', label: 'XY Ratio 1:2' },
            { id: 'lissajous-complex', label: 'XY Complex' },
            { id: 'lowpass-exp', label: 'RC Low Pass' },
            { id: 'rectifier-exp', label: 'Full Rectifier' },
          ].map((ps) => (
            <button
              key={ps.id}
              onClick={() => applyPreset(ps.id)}
              className={`px-2 py-1 text-[9px] font-mono rounded transition-colors ${
                activePreset === ps.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {ps.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Instrument Layout: Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-slate-950 p-2">
        
        {/* Left Hand: DSO Display Screen Grid (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col p-2 space-y-2.5">
          
          {/* Phosphor CRT-LCD Screen Frame */}
          <div className="relative aspect-video w-full rounded-xl bg-slate-950 border-4 border-slate-850 shadow-inner overflow-hidden shadow-black/80 ring-1 ring-slate-800">
            {/* Screen Inner Glare Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none z-20" />
            
            {/* Real Canvas */}
            <canvas
              ref={canvasRef}
              width={720}
              height={440}
              className="w-full h-full block relative z-10"
            />
          </div>

          {/* Liquid Crystal Display Diagnostic Readouts */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-2.5 text-slate-200 font-mono text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">CH1 Max (Vmax)</span>
              <span className="text-sm font-bold text-amber-400">{vmaxCh1.toFixed(2)} V</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">CH1 Pk-to-Pk (Vpp)</span>
              <span className="text-sm font-bold text-amber-400">{vppCh1.toFixed(2)} V</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">CH1 Freq (1/T)</span>
              <span className="text-sm font-bold text-amber-400">
                {sig1.frequency >= 1000 ? `${(sig1.frequency/1000).toFixed(2)} kHz` : `${sig1.frequency} Hz`}
              </span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">CH1 RMS Volt</span>
              <span className="text-sm font-bold text-amber-400">{vrmsCh1.toFixed(2)} V</span>
            </div>
          </div>
        </div>

        {/* Right Hand: Scope Hardware Dial Board (4 Columns) */}
        <div className="lg:col-span-4 p-3 flex flex-col space-y-4 text-slate-300 max-h-[520px] overflow-y-auto custom-scrollbar bg-slate-900/40 rounded-xl border border-slate-850/60">
          
          {/* Quick Screen Tools (Screenshot, XY Mode, Grid) */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
            <button
              onClick={handleScreenshot}
              className="px-3 py-2 bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-200 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center space-x-1.5 transition-all hover:bg-slate-850 hover:text-white"
            >
              <Camera className="h-3.5 w-3.5 text-amber-500" />
              <span>Capture Screen</span>
            </button>
            <button
              onClick={() => setIsXYMode(!isXYMode)}
              className={`px-3 py-2 border rounded-lg text-[11px] font-mono font-bold flex items-center justify-center space-x-1.5 transition-all ${
                isXYMode 
                  ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>XY (Lissajous)</span>
            </button>
          </div>

          {/* Hardware Section: Channel Toggles & Traces Info */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2 mb-3 border-b border-slate-800 pb-2">
              <Eye className="h-4 w-4 text-amber-500" />
              <span>Signal Trace Channels</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCh1Enabled(!ch1Enabled)}
                className={`p-2.5 rounded-lg border text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                  ch1Enabled 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold shadow-[0_0_8px_rgba(245,158,11,0.15)]' 
                    : 'bg-slate-950 border-slate-850 text-slate-600'
                }`}
              >
                <span>CH1 Trace</span>
                <span>{ch1Enabled ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => setCh2Enabled(!ch2Enabled)}
                className={`p-2.5 rounded-lg border text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                  ch2Enabled 
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold shadow-[0_0_8px_rgba(6,182,212,0.15)]' 
                    : 'bg-slate-950 border-slate-850 text-slate-600'
                }`}
              >
                <span>CH2 Trace</span>
                <span>{ch2Enabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Hardware Section: Function Generator CH1 Controls */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2 mb-1 border-b border-slate-800 pb-2">
              <Radio className="h-4 w-4 text-amber-500" />
              <span>Function Generator (CH1)</span>
            </h4>

            {/* Waveform Selector buttons */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
              {(['sine', 'square', 'triangle', 'sawtooth'] as const).map((wv) => (
                <button
                  key={wv}
                  onClick={() => setSig1({ ...sig1, waveform: wv })}
                  className={`py-1 text-[9px] font-mono capitalize rounded transition ${
                    sig1.waveform === wv
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {wv}
                </button>
              ))}
            </div>

            {/* Simulated Dials / Knobs representation */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-2 rounded-lg">
              {renderRotaryDial("Frequency", `${sig1.frequency} Hz`, (sig1.frequency - 10) / 990 * 270 - 135)}
              {renderRotaryDial("Amplitude", `${sig1.amplitude.toFixed(1)} Vp`, (sig1.amplitude - 0.5) / 7.5 * 270 - 135)}
            </div>

            {/* Precise Slider inputs */}
            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Fine Frequency:</span>
                  <span className="text-amber-400">{sig1.frequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={sig1.frequency}
                  onChange={(e) => setSig1({ ...sig1, frequency: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Fine Amplitude:</span>
                  <span className="text-amber-400">{sig1.amplitude.toFixed(1)} Vp</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={sig1.amplitude}
                  onChange={(e) => setSig1({ ...sig1, amplitude: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>CH1 DC Offset:</span>
                  <span className="text-amber-400">{sig1.offset.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="-4.0"
                  max="4.0"
                  step="0.1"
                  value={sig1.offset}
                  onChange={(e) => setSig1({ ...sig1, offset: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Hardware Section: Independent Channel 2 Source (Visible in XY mode or YT raw) */}
          {circuitMode === 'none' && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3.5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2 mb-1 border-b border-slate-800 pb-2">
                <Radio className="h-4 w-4 text-cyan-400" />
                <span>Function Generator (CH2)</span>
              </h4>

              <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                {(['sine', 'square', 'triangle', 'sawtooth'] as const).map((wv) => (
                  <button
                    key={wv}
                    onClick={() => setSig2({ ...sig2, waveform: wv })}
                    className={`py-1 text-[9px] font-mono capitalize rounded transition ${
                      sig2.waveform === wv
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {wv}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-2 rounded-lg">
                {renderRotaryDial("Frequency", `${sig2.frequency} Hz`, (sig2.frequency - 10) / 990 * 270 - 135)}
                {renderRotaryDial("Phase Shift", `${sig2.phase}°`, (sig2.phase / 360) * 270 - 135)}
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>CH2 Frequency:</span>
                    <span className="text-cyan-400">{sig2.frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="5"
                    value={sig2.frequency}
                    onChange={(e) => setSig2({ ...sig2, frequency: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>CH2 Phase Shift:</span>
                    <span className="text-cyan-400">{sig2.phase}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={sig2.phase}
                    onChange={(e) => setSig2({ ...sig2, phase: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hardware Section: Sessional Experiment Module Circuits */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2 mb-1 border-b border-slate-800 pb-2">
              <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>Sessional Experiment Circuits</span>
            </h4>

            <select
              value={circuitMode}
              onChange={(e) => {
                const mode = e.target.value as any;
                setCircuitMode(mode);
                if (mode !== 'none') {
                  setIsXYMode(false); // disable XY mode automatically for YT filter sweeps
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs py-2 px-2.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="none">Independent Channels (CH1 + CH2)</option>
              <option value="lowpass">Passive RC Low Pass Filter</option>
              <option value="highpass">Passive RC High Pass Filter</option>
              <option value="halfwave">Silicon Diode Half-Wave Rectifier</option>
              <option value="fullwave">Bridge Full-Wave Rectifier</option>
            </select>

            {/* RC Filter Slider parameters */}
            {(circuitMode === 'lowpass' || circuitMode === 'highpass') && (
              <div className="space-y-2.5 bg-slate-950 p-3 rounded-lg border border-slate-850 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Resistor (R):</span>
                  <span className="text-cyan-400 font-bold">{filterR >= 1000 ? `${(filterR/1000).toFixed(1)} kΩ` : `${filterR} Ω`}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={filterR}
                  onChange={(e) => setFilterR(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-cyan-500"
                />

                <div className="flex justify-between text-slate-400">
                  <span>Capacitor (C):</span>
                  <span className="text-cyan-400 font-bold">{filterC.toFixed(1)} uF</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={filterC}
                  onChange={(e) => setFilterC(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-cyan-500"
                />

                <div className="text-[10px] pt-2 border-t border-slate-800 flex justify-between">
                  <span className="text-slate-500">Cut-off Freq ($f_c$):</span>
                  <span className="text-cyan-400 font-bold">
                    {fCutoff >= 1000 ? `${(fCutoff/1000).toFixed(2)} kHz` : `${fCutoff.toFixed(1)} Hz`}
                  </span>
                </div>
              </div>
            )}

            {circuitMode !== 'none' && (
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-850/40 text-[9.5px] text-slate-400 leading-relaxed font-sans">
                {circuitMode === 'lowpass' && "CH1 represents Input Voltage. CH2 tracks Output Voltage across the capacitor. Increase signal frequency to see phase lag lag and signal amplitude attenuation."}
                {circuitMode === 'highpass' && "Capacitor series config blocks DC components. Try lowering generator frequency below 50Hz to watch output attenuation and leading phase."}
                {circuitMode === 'halfwave' && "The diode acts as a valve clipping negative wave phases. Note the remaining positive pulse (diminished by a 0.7V silicon threshold)."}
                {circuitMode === 'fullwave' && "Full-wave conducting bridge flips the negative loop into positive space. Measures rectified DC output."}
              </div>
            )}
          </div>

          {/* Hardware Section: Oscilloscope Display Adjustments */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2 mb-1 border-b border-slate-800 pb-2">
              <Sliders className="h-4 w-4 text-slate-400" />
              <span>Console Sweep Adjustments</span>
            </h4>

            {/* Coupling */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Coupling Type:</span>
              <div className="bg-slate-950 p-0.5 rounded border border-slate-800 flex">
                {(['AC', 'DC'] as const).map((cp) => (
                  <button
                    key={cp}
                    onClick={() => setCoupling(cp)}
                    className={`px-3 py-1 text-[10px] font-mono rounded-md ${
                      coupling === cp ? 'bg-slate-850 text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {cp}
                  </button>
                ))}
              </div>
            </div>

            {/* Timebase Selection */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Time base (Horizontal):</span>
                <span className="text-white font-bold">{timeDiv} ms/Div</span>
              </div>
              <select
                value={timeDiv}
                onChange={(e) => setTimeDiv(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs py-1.5 px-2 rounded-lg focus:outline-none font-mono"
              >
                <option value="0.2">0.2 ms/Div</option>
                <option value="0.5">0.5 ms/Div</option>
                <option value="1">1.0 ms/Div (Default)</option>
                <option value="2">2.0 ms/Div</option>
                <option value="5">5.0 ms/Div</option>
                <option value="10">10.0 ms/Div</option>
              </select>
            </div>

            {/* CH1 Scale */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>CH1 Scale (Vertical):</span>
                <span className="text-amber-500 font-bold">{ch1VoltsDiv} V/Div</span>
              </div>
              <select
                value={ch1VoltsDiv}
                onChange={(e) => setCh1VoltsDiv(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-amber-500 text-xs py-1.5 px-2 rounded-lg focus:outline-none font-mono"
              >
                <option value="0.5">0.5 V/Div</option>
                <option value="1">1.0 V/Div</option>
                <option value="2">2.0 V/Div</option>
                <option value="5">5.0 V/Div</option>
              </select>
            </div>

            {/* Position Y offset sliders */}
            <div className="space-y-2 text-xs font-mono pt-1">
              <div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>CH1 Vertical Shift:</span>
                  <span className="text-amber-500">{ch1Offset > 0 ? `+${ch1Offset.toFixed(1)}` : ch1Offset.toFixed(1)}V</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.2"
                  value={ch1Offset}
                  onChange={(e) => setCh1Offset(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {ch1Enabled && ch2Enabled && (
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>CH2 Vertical Shift:</span>
                    <span className="text-cyan-400">{ch2Offset > 0 ? `+${ch2Offset.toFixed(1)}` : ch2Offset.toFixed(1)}V</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.2"
                    value={ch2Offset}
                    onChange={(e) => setCh2Offset(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              )}

              {/* Noise Level */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Trace Noise (Fuzz):</span>
                  <span className="text-slate-300">{(noiseLevel * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.02"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-slate-400"
                />
              </div>

              {/* Phosphor Glow Intensity */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Glow Intensity:</span>
                  <span className="text-slate-300">{glowIntensity}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-slate-400"
                />
              </div>

              {/* Trigger Level */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Trigger Level:</span>
                  <span className="text-rose-400">{triggerLevel.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={triggerLevel}
                  onChange={(e) => setTriggerLevel(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 justify-center py-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-5 py-2.5 w-full rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                isPaused 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30' 
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
              }`}
            >
              {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
              <span>{isPaused ? 'SCOPE RUN' : 'SCOPE FREEZE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Diagnostic Footer info bar */}
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-850 flex flex-col md:flex-row md:items-center justify-between text-slate-500 text-xs gap-2">
        <div className="flex items-center space-x-2">
          <Info className="h-4 w-4 text-amber-500 shrink-0" />
          <span>
            <strong>Lissajous Experiment (XY Mode):</strong> Set independent frequencies with an integer ratio (e.g. 100Hz and 200Hz for 1:2) to study elegant geometric patterns.
          </span>
        </div>
        <div className="flex items-center space-x-4 self-end md:self-auto text-[10px] font-mono text-slate-600">
          <span>ADC RESOLUTION: 12-BIT</span>
          <span>SAMP_RATE: 1.25 GSa/s</span>
        </div>
      </div>
    </div>
  );
}
