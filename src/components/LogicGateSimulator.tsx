import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Lightbulb, Grid, HelpCircle, BookOpen, AlertCircle, Award, CheckCircle2, RotateCcw, Play } from 'lucide-react';

interface GateConfig {
  name: string;
  symbol: string;
  formula: string;
  icCode: string;
  description: string;
  behavior: (a: boolean, b: boolean) => boolean;
  truthTable: { a: boolean; b: boolean; y: boolean }[];
  svgIcon: React.ReactNode;
}

export default function LogicGateSimulator() {
  const [selectedGate, setSelectedGate] = useState<string>('AND');
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  // Challenge / Quiz Mode State
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizGate, setQuizGate] = useState<string>('AND');
  const [quizInputA, setQuizInputA] = useState<boolean>(false);
  const [quizInputB, setQuizInputB] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string>('');
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  const gates: Record<string, GateConfig> = {
    AND: {
      name: 'AND Gate',
      symbol: '·',
      formula: 'Y = A · B',
      icCode: '74LS08 (Quad 2-Input AND)',
      description: 'The output is HIGH (1) only if all inputs are HIGH (1). Otherwise, the output is LOW (0).',
      behavior: (a, b) => a && b,
      truthTable: [
        { a: false, b: false, y: false },
        { a: false, b: true, y: false },
        { a: true, b: false, y: false },
        { a: true, b: true, y: true },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          {/* Inputs */}
          <line x1="5" y1="15" x2="35" y2="15" />
          <line x1="5" y1="35" x2="35" y2="35" />
          {/* Body */}
          <path d="M 35,10 L 55,10 A 15,15 0 0,1 55,40 L 35,40 Z" />
          {/* Output */}
          <line x1="70" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    OR: {
      name: 'OR Gate',
      symbol: '+',
      formula: 'Y = A + B',
      icCode: '74LS32 (Quad 2-Input OR)',
      description: 'The output is HIGH (1) if at least one input is HIGH (1). It is LOW (0) only when all inputs are LOW (0).',
      behavior: (a, b) => a || b,
      truthTable: [
        { a: false, b: false, y: false },
        { a: false, b: true, y: true },
        { a: true, b: false, y: true },
        { a: true, b: true, y: true },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="15" x2="33" y2="15" />
          <line x1="5" y1="35" x2="33" y2="35" />
          {/* Curved OR shape */}
          <path d="M 25,10 C 32,10 35,10 40,10 C 55,10 68,20 73,25 C 68,30 55,40 40,40 C 35,40 32,40 25,40 C 30,28 30,22 25,10 Z" />
          <line x1="73" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    NOT: {
      name: 'NOT Gate (Inverter)',
      symbol: '̄',
      formula: 'Y = A',
      icCode: '74LS04 (Hex Inverter)',
      description: 'The output is the logical complement of the input. It inverts a 0 to a 1, and a 1 to a 0.',
      behavior: (a, _) => !a,
      truthTable: [
        { a: false, b: false, y: true },
        { a: true, b: false, y: false },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="25" x2="35" y2="25" />
          {/* Triangle */}
          <polygon points="35,12 60,25 35,38" />
          {/* Bubble */}
          <circle cx="64" cy="25" r="4" />
          <line x1="68" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    NAND: {
      name: 'NAND Gate',
      symbol: '↑',
      formula: 'Y = A · B',
      icCode: '74LS00 (Quad 2-Input NAND)',
      description: 'Universal Gate. The output is HIGH (1) if any input is LOW (0). It is the inverse of an AND operation.',
      behavior: (a, b) => !(a && b),
      truthTable: [
        { a: false, b: false, y: true },
        { a: false, b: true, y: true },
        { a: true, b: false, y: true },
        { a: true, b: true, y: false },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="15" x2="35" y2="15" />
          <line x1="5" y1="35" x2="35" y2="35" />
          <path d="M 35,10 L 52,10 A 15,15 0 0,1 52,40 L 35,40 Z" />
          <circle cx="71" cy="25" r="4" />
          <line x1="75" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    NOR: {
      name: 'NOR Gate',
      symbol: '↓',
      formula: 'Y = A + B',
      icCode: '74LS02 (Quad 2-Input NOR)',
      description: 'Universal Gate. The output is HIGH (1) only if all inputs are LOW (0). It is the inverse of an OR operation.',
      behavior: (a, b) => !(a || b),
      truthTable: [
        { a: false, b: false, y: true },
        { a: false, b: true, y: false },
        { a: true, b: false, y: false },
        { a: true, b: true, y: false },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="15" x2="30" y2="15" />
          <line x1="5" y1="35" x2="30" y2="35" />
          <path d="M 22,10 C 29,10 32,10 37,10 C 50,10 61,20 66,25 C 61,30 50,40 37,40 C 32,40 29,40 22,40 C 26,28 26,22 22,10 Z" />
          <circle cx="70" cy="25" r="4" />
          <line x1="74" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    XOR: {
      name: 'XOR Gate',
      symbol: '⊕',
      formula: 'Y = A ⊕ B',
      icCode: '74LS86 (Quad 2-Input XOR)',
      description: 'Exclusive-OR. The output is HIGH (1) only when the inputs are different (one is 1, the other is 0).',
      behavior: (a, b) => a !== b,
      truthTable: [
        { a: false, b: false, y: false },
        { a: false, b: true, y: true },
        { a: true, b: false, y: true },
        { a: true, b: true, y: false },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="15" x2="30" y2="15" />
          <line x1="5" y1="35" x2="30" y2="35" />
          {/* XOR input line curve */}
          <path d="M 17,10 C 21,22 21,28 17,40" />
          <path d="M 24,10 C 31,10 33,10 38,10 C 51,10 62,20 67,25 C 62,30 51,40 38,40 C 33,40 31,40 24,40 C 28,28 28,22 24,10 Z" />
          <line x1="67" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
    XNOR: {
      name: 'XNOR Gate',
      symbol: '⊙',
      formula: 'Y = A ⊙ B',
      icCode: '74LS266 (Quad 2-Input XNOR)',
      description: 'Exclusive-NOR. The output is HIGH (1) when the inputs are identical (both 0 or both 1).',
      behavior: (a, b) => a === b,
      truthTable: [
        { a: false, b: false, y: true },
        { a: false, b: true, y: false },
        { a: true, b: false, y: false },
        { a: true, b: true, y: true },
      ],
      svgIcon: (
        <svg viewBox="0 0 100 50" className="w-24 h-12 stroke-current fill-transparent" strokeWidth="2">
          <line x1="5" y1="15" x2="30" y2="15" />
          <line x1="5" y1="35" x2="30" y2="35" />
          <path d="M 17,10 C 21,22 21,28 17,40" />
          <path d="M 23,10 C 29,10 31,10 36,10 C 49,10 59,20 64,25 C 59,30 49,40 36,40 C 31,40 29,40 23,40 C 27,28 27,22 23,10 Z" />
          <circle cx="68" cy="25" r="4" />
          <line x1="72" y1="25" x2="95" y2="25" />
        </svg>
      )
    },
  };

  const gate = gates[selectedGate] || gates.AND;
  const output = gate.behavior(inputA, inputB);

  // Generate next quiz question
  const startNewQuizQuestion = () => {
    const gateKeys = Object.keys(gates);
    const randomGate = gateKeys[Math.floor(Math.random() * gateKeys.length)];
    const randA = Math.random() >= 0.5;
    const randB = randomGate === 'NOT' ? false : Math.random() >= 0.5;

    setQuizGate(randomGate);
    setQuizInputA(randA);
    setQuizInputB(randB);
    setQuizAnswered(false);
    setQuizFeedback('');
  };

  const launchQuizMode = () => {
    setIsQuizMode(true);
    setQuizScore(0);
    setQuizStreak(0);
    startNewQuizQuestion();
  };

  // Submit answer for quiz
  const handleQuizAnswer = (userAnswer: boolean) => {
    if (quizAnswered) return;

    const correctOutput = gates[quizGate].behavior(quizInputA, quizInputB);
    const isCorrect = userAnswer === correctOutput;

    setQuizAnswered(true);
    setQuizSuccess(isCorrect);

    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      setQuizStreak((prev) => prev + 1);
      setQuizFeedback('CORRECT! Your logic calculation matched the physical IC gates output.');
    } else {
      setQuizStreak(0);
      setQuizFeedback(`INCORRECT. The ${gates[quizGate].name} under inputs A=${quizInputA ? '1' : '0'} and B=${quizInputB ? '1' : '0'} outputs a logic level ${correctOutput ? '1' : '0'}.`);
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-850 rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto my-6" id="logic-gate-simulator">
      
      {/* 1. Trainer Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-850 flex flex-wrap justify-between items-center shadow-md">
        <div className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <Grid className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              DIGITAL LABS • MODEL DT-400
            </h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Digital IC Breadboard Logic Gate Trainer • ECE Dept, NIT Nagaland</p>
          </div>
        </div>

        {/* Console VCC and mode controllers */}
        <div className="flex items-center space-x-3 mt-3 sm:mt-0">
          <div className="text-slate-400 text-[10px] font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shadow-inner">
            VCC RAIL: <span className="text-emerald-400 font-bold">5.00 V</span> • GND: <span className="text-slate-500 font-bold">0.00 V</span>
          </div>

          <button
            onClick={isQuizMode ? () => setIsQuizMode(false) : launchQuizMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow ${
              isQuizMode 
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-indigo-100'
            }`}
          >
            {isQuizMode ? 'Exit Quiz Board' : 'Start Sessional Quiz'}
          </button>
        </div>
      </div>

      {/* 2. Main Trainer Workspace Split */}
      {isQuizMode ? (
        /* Quiz Board Interface */
        <div className="p-6 md:p-8 bg-slate-950/20 text-center space-y-6">
          <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-800 pb-3">
              <span>NIT NAGALAND VIVA CONSOLE</span>
              <span className="text-amber-400 font-bold">Score: {quizScore} pts</span>
              <span className="text-emerald-400">Streak: {quizStreak}🔥</span>
            </div>

            <div className="space-y-2">
              <span className="bg-slate-950 text-slate-400 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-slate-850">
                Sessional Question
              </span>
              <h4 className="font-display font-bold text-lg text-white">
                Given an active <span className="text-indigo-400">{gates[quizGate].name}</span>
              </h4>
            </div>

            {/* Simulated Logic Board representing the question */}
            <div className="my-6 bg-slate-950/60 p-4 rounded-xl border border-slate-850 relative flex flex-col items-center justify-center space-y-4">
              <div className="flex justify-around w-full max-w-xs font-mono text-xs">
                <div className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-slate-300">
                  Switch A = <span className="font-bold text-amber-500">{quizInputA ? '1' : '0'}</span>
                </div>
                {quizGate !== 'NOT' && (
                  <div className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-slate-300">
                    Switch B = <span className="font-bold text-amber-500">{quizInputB ? '1' : '0'}</span>
                  </div>
                )}
              </div>

              {/* Schematic Symbol */}
              <div className="text-emerald-400 bg-slate-900/80 p-4 rounded-xl border border-slate-800 drop-shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                {gates[quizGate].svgIcon}
              </div>

              <div className="text-slate-400 font-mono text-xs">
                What is the logical binary level at Output <strong className="text-white font-bold">Y</strong>?
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <button
                onClick={() => handleQuizAnswer(true)}
                disabled={quizAnswered}
                className={`py-3 rounded-xl font-mono text-sm font-bold transition-all border ${
                  quizAnswered && gates[quizGate].behavior(quizInputA, quizInputB) === true
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : quizAnswered && gates[quizGate].behavior(quizInputA, quizInputB) !== true
                    ? 'bg-slate-950 border-slate-850 text-slate-600'
                    : 'bg-slate-850 border-slate-700 hover:border-emerald-500 text-white'
                }`}
              >
                Logic 1 (HIGH)
              </button>
              <button
                onClick={() => handleQuizAnswer(false)}
                disabled={quizAnswered}
                className={`py-3 rounded-xl font-mono text-sm font-bold transition-all border ${
                  quizAnswered && gates[quizGate].behavior(quizInputA, quizInputB) === false
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : quizAnswered && gates[quizGate].behavior(quizInputA, quizInputB) !== false
                    ? 'bg-slate-950 border-slate-850 text-slate-600'
                    : 'bg-slate-850 border-slate-700 hover:border-emerald-500 text-white'
                }`}
              >
                Logic 0 (LOW)
              </button>
            </div>

            {/* Feedback Message */}
            {quizAnswered && (
              <div className="space-y-4 pt-2">
                <div className={`p-3.5 rounded-xl border text-xs font-mono font-medium ${
                  quizSuccess 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {quizFeedback}
                </div>

                <button
                  onClick={startNewQuizQuestion}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold rounded-lg transition-all shadow"
                >
                  Load Next Question
                </button>
              </div>
            )}
          </div>

          {quizStreak >= 5 && (
            <div className="max-w-md mx-auto bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-center space-x-4 shadow animate-bounce">
              <Award className="h-10 w-10 text-amber-500 shrink-0" />
              <div className="text-left">
                <h5 className="font-display font-bold text-sm text-white">Sessional Viva Mastery Awarded!</h5>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Excellent work! You have logged 5 correct calculations in a row. Your digital gates theory is sessional-approved.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Real-Time Board Trainer Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 p-2 bg-slate-950">
          
          {/* Left panel: Gate selector & Controls (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col p-2 space-y-3">
            <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl shadow-md">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1.5 font-mono">
                Active Logic Gate IC Selection
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {Object.keys(gates).map((gName) => (
                  <button
                    key={gName}
                    onClick={() => {
                      setSelectedGate(gName);
                      if (gName === 'NOT') setInputB(false);
                    }}
                    className={`py-2 px-2.5 text-xs font-mono rounded-lg border transition-all ${
                      selectedGate === gName
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    {gName}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Switches Board */}
            <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl shadow-md flex flex-col space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 font-mono">
                Hardware Switch Inputs
              </h4>

              {/* Switch A */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-850 shadow-inner">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full border transition-all ${
                      inputA ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-800 border-slate-700'
                    }`}
                  />
                  <div>
                    <span className="text-[11px] font-mono font-bold block text-slate-300">Input A (SW1)</span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      Level: {inputA ? '5V (Logic 1)' : '0V (Logic 0)'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setInputA(!inputA)}
                  className="transition-colors hover:text-emerald-400 text-slate-500"
                  title="Toggle SW1"
                >
                  {inputA ? (
                    <ToggleRight className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="h-8 w-8" />
                  )}
                </button>
              </div>

              {/* Switch B */}
              {selectedGate !== 'NOT' ? (
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-850 shadow-inner">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full border transition-all ${
                        inputB ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-800 border-slate-700'
                      }`}
                    />
                    <div>
                      <span className="text-[11px] font-mono font-bold block text-slate-300">Input B (SW2)</span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        Level: {inputB ? '5V (Logic 1)' : '0V (Logic 0)'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setInputB(!inputB)}
                    className="transition-colors hover:text-emerald-400 text-slate-500"
                    title="Toggle SW2"
                  >
                    {inputB ? (
                      <ToggleRight className="h-8 w-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="h-8 w-8" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-850 opacity-20 pointer-events-none">
                  <span className="text-[10px] font-mono text-slate-600">CH2 SWITCH DE-ACTIVATED</span>
                </div>
              )}

              {/* LCD Display panel */}
              <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl border border-slate-850 text-center font-mono shadow-inner">
                <span className="text-[8px] text-slate-500 block uppercase tracking-widest mb-0.5">Active Logic Expression</span>
                <span className="text-base font-bold text-emerald-400">{gate.formula}</span>
                <span className="text-[9px] text-slate-500 block mt-1">{gate.icCode}</span>
              </div>
            </div>
          </div>

          {/* Center panel: SVG Schematic Canvas (5 Columns) */}
          <div className="lg:col-span-5 p-2 flex flex-col justify-between bg-slate-900 border border-slate-850 rounded-xl relative overflow-hidden shadow-inner">
            
            {/* Soft phosphor green grid in canvas background */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono border-b border-slate-800 pb-1.5 px-1 relative z-10">
              <span>BREADBOARD SIMULATION DIAGRAM</span>
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>DYNAMIC SHEETS</span>
              </span>
            </div>

            {/* Dynamic Interactive SVG Wiring Schematic */}
            <div className="flex-grow flex items-center justify-center py-6 relative z-10">
              <svg viewBox="0 0 400 240" className="w-full max-w-[360px] h-auto">
                <defs>
                  {/* Glowing line filter */}
                  <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid Dot Arrays (representing Breadboard Tie points) */}
                {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map((y) => (
                  <g key={`breadboard-grid-${y}`} opacity="0.1">
                    {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((x) => (
                      <circle key={`dot-${x}-${y}`} cx={x} cy={y} r="1.5" fill="#fff" />
                    ))}
                  </g>
                ))}

                {/* 1. Wire traces from input SWs */}
                {/* Switch Input Points */}
                <circle cx="40" cy="70" r="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="35" y="55" fill="#94a3b8" className="font-mono text-[9px] font-bold">A</text>
                
                {selectedGate !== 'NOT' && (
                  <>
                    <circle cx="40" cy="170" r="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                    <text x="35" y="195" fill="#94a3b8" className="font-mono text-[9px] font-bold">B</text>
                  </>
                )}

                {/* Interactive glowing wire paths */}
                {/* Input A wire: flows to input 1 of logic gate card */}
                <path 
                  d={selectedGate === 'NOT' ? "M 40,70 L 120,70 L 120,120 L 150,120" : "M 40,70 L 120,70 L 120,105 L 150,105"} 
                  fill="transparent" 
                  stroke={inputA ? '#34d399' : '#334155'} 
                  strokeWidth="3.5" 
                  filter={inputA ? 'url(#glow-emerald)' : ''}
                  className="transition-all duration-300"
                />
                
                {/* Input B wire: flows to input 2 of logic gate card */}
                {selectedGate !== 'NOT' && (
                  <path 
                    d="M 40,170 L 120,170 L 120,135 L 150,135" 
                    fill="transparent" 
                    stroke={inputB ? '#34d399' : '#334155'} 
                    strokeWidth="3.5" 
                    filter={inputB ? 'url(#glow-emerald)' : ''}
                    className="transition-all duration-300"
                  />
                )}

                {/* 2. Logic Gate Schematic representation glass panel card */}
                {/* Border card */}
                <rect x="150" y="85" width="100" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                <text x="200" y="102" fill="#64748b" textAnchor="middle" className="font-mono text-[8px] font-bold tracking-widest uppercase">
                  {gate.icCode.split(' ')[0]}
                </text>

                {/* SVG symbol embedded inside the schematic */}
                <g transform="translate(150, 100)" className={output ? 'text-emerald-400' : 'text-slate-600'}>
                  {gate.svgIcon}
                </g>

                {/* 3. Output wire trace from card to LED */}
                <path 
                  d="M 250,120 L 330,120" 
                  fill="transparent" 
                  stroke={output ? '#34d399' : '#334155'} 
                  strokeWidth="3.5" 
                  filter={output ? 'url(#glow-emerald)' : ''}
                  className="transition-all duration-300"
                />

                {/* LED node graphic */}
                <circle cx="340" cy="120" r="10" fill={output ? '#10b981' : '#1e293b'} stroke={output ? '#34d399' : '#334155'} strokeWidth="3" className="transition-all duration-300" filter={output ? 'url(#glow-emerald)' : ''} />
                <circle cx="340" cy="120" r="4" fill="#fff" opacity={output ? '0.6' : '0.1'} />
                <text x="340" y="145" fill="#94a3b8" textAnchor="middle" className="font-mono text-[9px] font-bold">Y (LED)</text>
              </svg>
            </div>

            {/* Live sessional feedback notes */}
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-850 text-[10px] text-slate-400 flex items-start space-x-2 relative z-10">
              <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="font-mono leading-relaxed">
                <strong>IC Core Specs:</strong> {gate.description} Toggle SW1 & SW2 switches on the left panel to watch wire paths energize.
              </p>
            </div>
          </div>

          {/* Right panel: Active Truth Verification table (3 Columns) */}
          <div className="lg:col-span-3 p-2 flex flex-col">
            <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl h-full flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5 mb-3 font-mono border-b border-slate-800 pb-1.5">
                  <BookOpen className="h-4 w-4 text-slate-500" />
                  <span>State Grids</span>
                </h4>

                <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 text-slate-300">
                  <table className="w-full text-center text-[11px] font-mono">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                        <th className="py-2">SW1 (A)</th>
                        {selectedGate !== 'NOT' && <th className="py-2">SW2 (B)</th>}
                        <th className="py-2 text-emerald-400">LED (Y)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/60">
                      {gate.truthTable.map((row, idx) => {
                        const isActive =
                          row.a === inputA && (selectedGate === 'NOT' || row.b === inputB);

                        return (
                          <tr
                            key={idx}
                            className={`transition-colors duration-200 ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-2 border-emerald-500'
                                : 'text-slate-500'
                            }`}
                          >
                            <td className="py-2.5">{row.a ? '1' : '0'}</td>
                            {selectedGate !== 'NOT' && <td className="py-2.5">{row.b ? '1' : '0'}</td>}
                            <td className={`py-2.5 ${isActive ? 'text-emerald-400 font-bold' : ''}`}>
                              {row.y ? '1' : '0'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sessional tips info card */}
              <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg text-[9.5px] text-amber-300 mt-4 leading-relaxed font-sans">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 inline-block mr-1.5 -mt-0.5" />
                <strong>Breadboard Viva Key:</strong> Integrated circuits in the TTL 74LS series require standard VCC (+5.0V) and Ground wiring before gates can operate. Pin 14 is consistently VCC, and Pin 7 is GND.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
