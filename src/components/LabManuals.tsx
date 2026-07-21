import React, { useState } from 'react';
import { Experiment } from '../types';
import { Book, Play, CheckCircle, ArrowRight, BookOpen, Layers, Cpu, CheckSquare, ListTodo, HelpCircle, Award, Compass, Eye, Info, Sparkles } from 'lucide-react';

interface LabManualsProps {
  onLaunchSimulation: (type: 'oscilloscope' | 'logic-gates') => void;
}

const experimentsData: Experiment[] = [
  {
    id: 'exp-lp',
    courseCode: 'ECE-282',
    courseName: 'Analog Electronics Lab',
    expNo: 1,
    title: 'Cutoff Frequency & Frequency Response of Passive RC Low Pass Filters',
    objective: 'To design a passive RC Low Pass Filter, plot its frequency response curve, and verify its half-power cutoff frequency ($f_c = 1 / 2\\pi RC$).',
    apparatus: [
      'DSO / Oscilloscope (50MHz)',
      'Built-in Function Generator (Sine wave source)',
      'Resistor ($R = 1\\text{k}\\Omega$)',
      'Capacitor ($C = 1.5\\mu\\text{F}$)',
      'Breadboard & connection patch cords'
    ],
    theory: 'A passive RC low-pass filter is a filter circuit that passes low-frequency signals and attenuates signal frequencies above its cutoff frequency. The cutoff frequency is defined as the frequency where the output voltage drops to 70.7% (or $-3\\text{dB}$) of the input voltage, calculated by $f_c = 1 / (2\\pi R C)$. At higher frequencies, capacitive reactance $X_C = 1 / \\omega C$ decreases, which shunts the high frequency signals to ground and lags output signal phase.',
    procedure: [
      'Connect the resistor R (1kΩ) in series with the input voltage signal (Function Generator) on your breadboard.',
      'Connect the capacitor C (1.5µF) between the output terminal and the common circuit ground.',
      'Connect DSO Channel 1 across the signal input terminals to monitor input voltage (V_in).',
      'Connect DSO Channel 2 across the capacitor terminals to monitor filtered output voltage (V_out).',
      'Set the Function Generator to output a Sine wave with 4.0V peak amplitude.',
      'Vary the signal generator frequency from 10Hz to 1000Hz and note down the peak-to-peak amplitude on Channel 2.',
      'Calculate the gain (20log(V_out/V_in)) for each frequency and identify the half-power -3dB point.'
    ],
    simulationType: 'oscilloscope'
  },
  {
    id: 'exp-hp',
    courseCode: 'ECE-282',
    courseName: 'Analog Electronics Lab',
    expNo: 2,
    title: 'High-Pass RC Filter Characteristics',
    objective: 'To analyze a passive RC High-Pass Filter circuit and evaluate its capacitive high-pass response characteristics.',
    apparatus: [
      'Digital Oscilloscope (DSO)',
      'Signal Generator',
      'Resistor ($R = 1\\text{k}\\Omega$)',
      'Capacitor ($C = 1.5\\mu\\text{F}$)',
      'Breadboard'
    ],
    theory: 'A High-Pass RC Filter allows high-frequency signal waveforms to pass through with minimum attenuation while blocking lower frequencies (DC components). The capacitor is placed in series with the input, presenting high impedance to low frequencies. As frequency increases, the capacitor impedance decreases, allowing the signal to pass directly across the resistor output.',
    procedure: [
      'Arrange the capacitor (1.5µF) in series with the signal input channel on the breadboard layout.',
      'Place the output resistor (1kΩ) between the downstream terminal and the circuit ground rail.',
      'Probe Channel 1 of the DSO across the generator output and Channel 2 across the output resistor.',
      'Observe how lowering the frequency below 100Hz significantly attenuates the output amplitude on Channel 2, while shifting the wave phase forward.'
    ],
    simulationType: 'oscilloscope'
  },
  {
    id: 'exp-halfwave',
    courseCode: 'ECE-282',
    courseName: 'Analog Electronics Lab',
    expNo: 3,
    title: 'Half-Wave Rectification with Silicon Diodes',
    objective: 'To study the operation of a semiconductor diode as a Half-Wave Rectifier and calculate voltage ripples.',
    apparatus: [
      'PN Junction Diode (1N4007)',
      'Function Generator (Sine Wave 50Hz)',
      'Load Resistor ($R_L = 10\\text{k}\\Omega$)',
      'DSO & Multimeter'
    ],
    theory: 'A half-wave rectifier exploits the unidirectional conduction of PN junction diodes. During the positive half cycle of the AC input, the diode is forward-biased and conducts current. During the negative half cycle, the diode is reverse-biased, presenting an open-circuit state. This clips negative wave phases, yielding a pulsating DC wave (minus a 0.7V silicon threshold drop).',
    procedure: [
      'Connect the diode anode to the function generator and cathode to the load resistor.',
      'Tie the other terminal of the load resistor back to the common signal ground rail.',
      'Attach DSO Channel 1 to the input and Channel 2 across the load resistor.',
      'Observe the chopped output waveform and measure Peak Output Voltage.'
    ],
    simulationType: 'oscilloscope'
  },
  {
    id: 'exp-and',
    courseCode: 'ECE-184',
    courseName: 'Digital Logic & Gate Lab',
    expNo: 4,
    title: 'Verification of Truth Tables of Basic Logic Gates (AND, OR, NOT)',
    objective: 'To realize basic logic gates using Transistor-Transistor Logic (TTL) ICs and verify their Truth Tables.',
    apparatus: [
      'Digital IC Trainer Board Console',
      'IC 74LS08 (Quad 2-Input AND gate)',
      'IC 74LS32 (Quad 2-Input OR gate)',
      'IC 74LS04 (Hex Inverter/NOT gate)',
      'Connecting single-strand wires'
    ],
    theory: 'In digital circuits, logic gates represent elementary decision blocks. The AND gate performs logical multiplication ($Y = A \\cdot B$), producing 1 only when both inputs are 1. The OR gate executes logical addition ($Y = A + B$), yielding 1 if any input is 1. The NOT gate implements boolean inversion ($Y = \\bar{A}$). All logic gates are driven by standard 5.0V TTL power rails in this laboratory.',
    procedure: [
      'Insert IC 74LS08 (AND gate) carefully into the central breadboard strip of your console.',
      'Connect Pin 14 of the IC to the +5.0V VCC rail, and Pin 7 to the common ground rail.',
      'Connect toggle switch SW1 to IC Pin 1 (Input A), and toggle switch SW2 to Pin 2 (Input B).',
      'Wire Pin 3 (Output Y) to LED indicator 1 on your trainer board.',
      'Vary the input switches through all binary combinations (00, 01, 10, 11) and record the LED state (ON/OFF).',
      'Repeat the same procedure for the OR gate (74LS32) and the NOT gate (74LS04).'
    ],
    simulationType: 'logic-gates'
  },
  {
    id: 'exp-nand',
    courseCode: 'ECE-184',
    courseName: 'Digital Logic & Gate Lab',
    expNo: 5,
    title: 'NAND & NOR as Universal Logic Building Blocks',
    objective: 'To prove that NAND and NOR gates can implement basic operations (AND, OR, NOT).',
    apparatus: [
      'IC Trainer Board Console',
      'IC 74LS00 (Quad 2-Input NAND)',
      'IC 74LS02 (Quad 2-Input NOR)'
    ],
    theory: 'NAND and NOR operations are called universal because any boolean logic can be represented using them. An Inverter is created by tieing NAND inputs together. An AND gate is formed by putting an inverter after a standard NAND gate.',
    procedure: [
      'Assemble an inverter using a single 74LS00 NAND gate by shorting Pin 1 and Pin 2 as inputs.',
      'Test states and verify that a 0 input gives a 1 output and vice-versa.',
      'Wire the remaining NAND gates to formulate AND and OR networks, validating outputs.'
    ],
    simulationType: 'logic-gates'
  }
];

// Model viva questions per experiment
const vivaQuestions: Record<string, { q: string; a: string }[]> = {
  'exp-lp': [
    { q: 'What is the cutoff frequency of an RC filter, and what is its dB value?', a: 'The cutoff frequency is defined as the point where the output voltage drops to 70.7% of the maximum input voltage, representing a half-power point which translates to -3dB on a logarithmic gain plot.' },
    { q: 'What happens to the cutoff frequency if you double the resistance R?', a: 'Because the cutoff frequency formula is fc = 1 / (2πRC), doubling the resistance R will halve the cutoff frequency (fc), causing it to filter out lower frequencies.' },
    { q: 'Why does the capacitor block DC signals?', a: 'Capacitive reactance is XC = 1 / (2πfC). For a DC signal, the frequency (f) is 0Hz, making capacitive reactance infinite (∞ ohms). Hence, the capacitor acts as an open circuit to DC.' }
  ],
  'exp-hp': [
    { q: 'How does the component placement differ between low-pass and high-pass RC filters?', a: 'In a low-pass filter, the resistor is in series with the signal and the capacitor is connected across the output load (parallel). In a high-pass filter, the capacitor is in series with the input and the resistor is across the load.' },
    { q: 'What is the phase shift at the cutoff frequency for high-pass filters?', a: 'At the cutoff frequency (fc), the output signal leads the input signal by exactly +45 degrees (+π/4 radians).' }
  ],
  'exp-halfwave': [
    { q: 'What is the peak inverse voltage (PIV) rating of a diode in a half-wave rectifier?', a: 'In a half-wave rectifier, the PIV is equal to the peak value of the input voltage (Vm). The diode must be rated to withstand this negative voltage without breaking down.' },
    { q: 'Why is there a small amplitude drop at the positive peak of the output?', a: 'Silicon PN junction diodes require a threshold forward-bias voltage of approximately 0.7V to begin conducting. This barrier voltage is subtracted from the peak input voltage.' }
  ],
  'exp-and': [
    { q: 'What are the IC code numbers for Quad 2-input AND, OR, and Hex NOT gates?', a: 'AND is 74LS08, OR is 74LS32, and NOT (Inverter) is 74LS04.' },
    { q: 'Explain the function of VCC and GND pins on TTL digital chips.', a: 'Pin 14 (VCC) is connected to +5.0V DC to power the internal transistor logic, while Pin 7 (GND) is wired to the 0.0V common reference ground.' }
  ],
  'exp-nand': [
    { q: 'Why are NAND and NOR gates called universal gates?', a: 'Because any of the primary boolean operators (AND, OR, NOT) can be fully synthesized and constructed using only NAND gates or only NOR gates.' },
    { q: 'How do you configure a NAND gate as an inverter?', a: 'By tieing both input pins of the NAND gate together so they receive the identical input signal. Thus, a HIGH input gives a LOW output, and a LOW input gives a HIGH output.' }
  ]
};

export default function LabManuals({ onLaunchSimulation }: LabManualsProps) {
  const [selectedExpId, setSelectedExpId] = useState<string>('exp-lp');
  const [activeTab, setActiveTab] = useState<'details' | 'checklist' | 'viva'>('details');
  
  // Track checklist progress
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>({
    'exp-lp': Array(experimentsData[0].procedure.length).fill(false),
    'exp-hp': Array(experimentsData[1].procedure.length).fill(false),
    'exp-halfwave': Array(experimentsData[2].procedure.length).fill(false),
    'exp-and': Array(experimentsData[3].procedure.length).fill(false),
    'exp-nand': Array(experimentsData[4].procedure.length).fill(false),
  });

  // Track revealed viva answers
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});

  const selectedExp = experimentsData.find((e) => e.id === selectedExpId) || experimentsData[0];
  const steps = selectedExp.procedure;
  const currentChecked = checkedSteps[selectedExpId] || Array(steps.length).fill(false);

  // Toggle procedure check state
  const handleToggleStep = (index: number) => {
    const updated = [...currentChecked];
    updated[index] = !updated[index];
    setCheckedSteps({
      ...checkedSteps,
      [selectedExpId]: updated
    });
  };

  const handleResetChecklist = () => {
    setCheckedSteps({
      ...checkedSteps,
      [selectedExpId]: Array(steps.length).fill(false)
    });
  };

  // Calculate completion percentage
  const completedCount = currentChecked.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100) || 0;

  // Toggle viva reveal
  const toggleVivaReveal = (vIndex: number) => {
    const key = `${selectedExpId}-${vIndex}`;
    setRevealedViva({
      ...revealedViva,
      [key]: !revealedViva[key]
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-6 px-4 font-sans" id="lab-manuals-section">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
          <BookOpen className="h-3 w-3 animate-pulse" />
          <span>Sessional Resource</span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
          ECE Laboratory Instruction Manuals
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto text-left md:text-justify">
          Access complete curriculum guide files, apparatus checklists, theoretical proofs, and interactive step-by-step experiment instructions approved by NIT Nagaland syllabus panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Experiment Index List (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="font-display font-semibold text-sm flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 uppercase tracking-wider">
              <Compass className="h-5 w-5 text-amber-500" />
              <span>Manuals Navigator</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Select an experiment outline to load its visual sessional worksheet. Complete the procedure tracker as you configure the simulator.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold px-3 py-2 block font-mono border-b border-slate-100 mb-1">
              Curriculum Checklist
            </span>

            {experimentsData.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  setSelectedExpId(exp.id);
                  setActiveTab('details'); // default back to details tab
                }}
                className={`w-full text-left p-3 rounded-xl text-xs transition-all border flex items-start space-x-2.5 ${
                  selectedExpId === exp.id
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md font-semibold'
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`p-1.5 rounded font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                  selectedExpId === exp.id ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  Exp {exp.expNo}
                </div>
                <div className="truncate">
                  <span className={`text-[9px] block font-mono uppercase truncate ${
                    selectedExpId === exp.id ? 'text-slate-400' : 'text-slate-400'
                  }`}>{exp.courseName}</span>
                  <span className="block truncate font-display font-medium text-[11.5px] mt-0.5">{exp.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Dynamic Experiment Manual viewer (8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
            
            {/* Header Block with launcher */}
            <div className="bg-slate-50 border-b border-slate-200 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="bg-slate-200/80 text-slate-700 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-300">
                  {selectedExp.courseCode} • {selectedExp.courseName}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-slate-900 mt-3 leading-snug">
                  Experiment {selectedExp.expNo}: {selectedExp.title}
                </h3>
              </div>
              
              {selectedExp.simulationType && selectedExp.simulationType !== 'none' && (
                <button
                  onClick={() => onLaunchSimulation(selectedExp.simulationType as any)}
                  className="shrink-0 flex items-center space-x-1.5 px-4.5 py-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold font-display hover:bg-amber-400 transition shadow-md hover:shadow-lg active:translate-y-0"
                >
                  <Play className="h-4 w-4 fill-current text-slate-950" />
                  <span>Launch Simulator</span>
                </button>
              )}
            </div>

            {/* Folder Tabs Navigation (Ultra high-end UI) */}
            <div className="bg-slate-100 px-6 border-b border-slate-200 flex space-x-1">
              {[
                { id: 'details', label: 'Theory & Inventory', icon: <BookOpen className="h-4 w-4" /> },
                { id: 'checklist', label: 'Interactive Procedure', icon: <ListTodo className="h-4 w-4" /> },
                { id: 'viva', label: 'Viva Preparation', icon: <HelpCircle className="h-4 w-4" /> },
              ].map((tb) => (
                <button
                  key={tb.id}
                  onClick={() => setActiveTab(tb.id as any)}
                  className={`flex items-center space-x-2 px-4.5 py-3.5 text-xs font-mono font-semibold border-t-2 transition-all relative top-[1px] ${
                    activeTab === tb.id
                      ? 'bg-white border-slate-900 text-slate-900 border-b-2 border-b-white z-10'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tb.icon}
                  <span>{tb.label}</span>
                </button>
              ))}
            </div>

            {/* Folder Body */}
            <div className="p-6 md:p-8 flex-grow space-y-6">
              
              {activeTab === 'details' && (
                <div className="space-y-6 text-sm leading-relaxed text-slate-700 animate-fadeIn">
                  
                  {/* Objective */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-150 shadow-inner">
                    <h4 className="font-display font-bold text-slate-950 text-xs uppercase tracking-widest flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>Aim / Objective</span>
                    </h4>
                    <p className="text-slate-600 text-xs pl-6 leading-relaxed font-medium">{selectedExp.objective}</p>
                  </div>

                  {/* Apparatus */}
                  <div className="space-y-2.5">
                    <h4 className="font-display font-bold text-slate-950 text-xs uppercase tracking-widest flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Apparatus & Components Required</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                      {selectedExp.apparatus.map((app, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theory */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-5">
                    <h4 className="font-display font-bold text-slate-950 text-xs uppercase tracking-widest flex items-center space-x-2">
                      <Book className="h-4 w-4 text-emerald-500" />
                      <span>Theoretical Backdrop & Formulas</span>
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs leading-relaxed text-justify">
                      {selectedExp.theory}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'checklist' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Progress Tracker Bar */}
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500">EXPERIMENT COMPLETED STEPS:</span>
                      <span className="text-emerald-600 font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                      <span>{completedCount} of {steps.length} actions complete</span>
                      <button 
                        onClick={handleResetChecklist}
                        className="text-slate-500 hover:text-rose-500 font-bold transition-colors"
                      >
                        Reset Sheet
                      </button>
                    </div>
                  </div>

                  {/* Checklist Elements */}
                  <div className="space-y-2.5">
                    <h4 className="font-display font-bold text-slate-950 text-xs uppercase tracking-widest block font-mono border-b pb-2">
                      Laboratory Workbench Checklist Steps
                    </h4>
                    <div className="space-y-2">
                      {steps.map((step, idx) => {
                        const isChecked = currentChecked[idx];
                        return (
                          <div
                            key={idx}
                            onClick={() => handleToggleStep(idx)}
                            className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-50/40 border-emerald-200 text-slate-750 font-medium'
                                : 'bg-white border-slate-150 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <button className="shrink-0 mt-0.5">
                              {isChecked ? (
                                <CheckCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-50" />
                              ) : (
                                <div className="h-4.5 w-4.5 rounded border-2 border-slate-300 bg-white" />
                              )}
                            </button>
                            <span className="text-xs leading-relaxed text-justify">
                              <strong>Step {idx + 1}:</strong> {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {progressPercent === 100 && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4.5 rounded-xl text-center space-y-2 animate-bounce">
                      <Award className="h-8 w-8 text-emerald-500 mx-auto" />
                      <h5 className="font-display font-bold text-sm text-emerald-800">Sessional Setup Fully Prepared!</h5>
                      <p className="text-xs text-emerald-600">
                        Awesome workspace practice! You have gone through all critical configuration steps. Launch the virtual simulator to verify outputs.
                      </p>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'viva' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs flex items-start space-x-2.5">
                    <Info className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-slate-500 leading-relaxed font-mono">
                      <strong>Model Viva-Voce:</strong> Study these common sessional interview questions related to Experiment {selectedExp.expNo}. Click on each query to reveal the ideal response model.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {vivaQuestions[selectedExpId]?.map((viva, idx) => {
                      const isRevealed = revealedViva[`${selectedExpId}-${idx}`];
                      return (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm">
                          {/* Question strip */}
                          <div 
                            onClick={() => toggleVivaReveal(idx)}
                            className="bg-slate-50 hover:bg-slate-100/60 p-4 flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <h5 className="font-display font-semibold text-slate-800 text-xs pr-4 leading-normal">
                              Q{idx + 1}: {viva.q}
                            </h5>
                            <button className="text-indigo-600 font-mono text-[10px] font-bold shrink-0">
                              {isRevealed ? 'HIDE' : 'REVEAL ANSWER'}
                            </button>
                          </div>
                          
                          {/* Answer body */}
                          {isRevealed && (
                            <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed text-justify font-sans">
                              <strong>Ideal Viva Answer:</strong> {viva.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom active status bar */}
            {selectedExp.simulationType && selectedExp.simulationType !== 'none' && (
              <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs mt-auto">
                <div className="flex items-center space-x-2 text-slate-600 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Configured for active simulation modeling</span>
                </div>
                <button
                  onClick={() => onLaunchSimulation(selectedExp.simulationType as any)}
                  className="text-amber-600 font-bold hover:text-amber-500 flex items-center space-x-1 transition font-mono"
                >
                  <span>Open Workshop Simulator</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
