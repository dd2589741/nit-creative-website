import React, { useState } from 'react';
import { Laboratory } from '../types';
import { Layers, Cpu, Radio, Network, Laptop, Calendar, User, Hammer, MapPin, Search, Grid, CheckCircle, Info, Sparkles } from 'lucide-react';
import ImageTrail from './ImageTrail';

const labImages = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517055720413-77a0bf443f61?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80'
];

const labsData: Laboratory[] = [
  {
    id: 'analog',
    name: 'Analog Electronics & Device Lab',
    code: 'ECE-102',
    roomNo: 'Room 102, Ground Floor',
    facultyInCharge: 'Dr. Debendra Chandra Baruah',
    technician: 'Mr. Kezhalelhou Belho',
    description: 'This laboratory introduces students to core solid-state semiconductor devices, design of discrete amplifier stages, operational amplifiers (Op-Amps), active filters, and multi-vibrators.',
    experimentsCount: 10,
    equipment: [
      { id: 'an-1', name: 'Digital Storage Oscilloscope (DSO, 50MHz)', category: 'Instrument', quantity: 15, status: 'Functional', location: 'Benches 1-15' },
      { id: 'an-2', name: 'Function Generator (3MHz, Sine/Square/Tri)', category: 'Instrument', quantity: 15, status: 'Functional', location: 'Benches 1-15' },
      { id: 'an-3', name: 'Dual DC Regulated Power Supply (0-30V, 2A)', category: 'Instrument', quantity: 18, status: 'Functional', location: 'Benches 1-15' },
      { id: 'an-4', name: 'Analog Electronic Devices Trainer Kit', category: 'Trainer Kit', quantity: 12, status: 'Functional', location: 'Almirah A' },
      { id: 'an-5', name: 'Digital Multimeters', category: 'Instrument', quantity: 25, status: 'Functional', location: 'Central Table' },
      { id: 'an-6', name: 'Op-Amp Application Development Board', category: 'Trainer Kit', quantity: 10, status: 'Maintenance', location: 'Almirah B' }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Electronics & Logic Design Lab',
    code: 'ECE-104',
    roomNo: 'Room 104, Ground Floor',
    facultyInCharge: 'Dr. Manoj Kumar',
    technician: 'Ms. Amenla Jamir',
    description: 'Dedicated to logic design experiments, digital IC parameters, combinatorial and sequential circuits. Students assemble circuits using TTL/CMOS ICs on high-grade breadboard consoles.',
    experimentsCount: 12,
    equipment: [
      { id: 'dg-1', name: 'Digital Logic Gate IC Trainer Board', category: 'Trainer Kit', quantity: 15, status: 'Functional', location: 'Benches 1-15' },
      { id: 'dg-2', name: 'Logic Analyzers (16-Channel)', category: 'Instrument', quantity: 5, status: 'Functional', location: 'Central Rack' },
      { id: 'dg-3', name: 'Multiplexer/Demultiplexer Training Panel', category: 'Trainer Kit', quantity: 8, status: 'Functional', location: 'Almirah C' },
      { id: 'dg-4', name: 'Sequential Shift Register Development Board', category: 'Trainer Kit', quantity: 10, status: 'Functional', location: 'Almirah D' },
      { id: 'dg-5', name: 'Logic Probe & Pulser Kits', category: 'Component', quantity: 20, status: 'Functional', location: 'Cabinet 2' },
      { id: 'dg-6', name: 'IC Tester (Digital & Linear)', category: 'Instrument', quantity: 2, status: 'Faulty', location: 'Technician Desk' }
    ]
  },
  {
    id: 'embedded',
    name: 'Microprocessor & Microcontroller Lab',
    code: 'ECE-201',
    roomNo: 'Room 201, First Floor',
    facultyInCharge: 'Prof. R. Kumar',
    technician: 'Mr. Vekhoto Luruo',
    description: 'Focuses on low-level instruction set assembly language, hardware interface layouts, and embedded C architectures. Workspaces support 8085, 8086, 8051, and modern ARM/Arduino SDK integration.',
    experimentsCount: 10,
    equipment: [
      { id: 'em-1', name: '8085 Microprocessor Trainer Kit (LCD)', category: 'Trainer Kit', quantity: 12, status: 'Functional', location: 'Benches 1-12' },
      { id: 'em-2', name: '8086 Microprocessor Trainer Kit', category: 'Trainer Kit', quantity: 12, status: 'Functional', location: 'Benches 1-12' },
      { id: 'em-3', name: '8051 Microcontroller Development Board', category: 'Trainer Kit', quantity: 15, status: 'Functional', location: 'Almirah E' },
      { id: 'em-4', name: 'Arduino Uno Starter Kits', category: 'Component', quantity: 25, status: 'Functional', location: 'Lab Trays' },
      { id: 'em-5', name: 'DAC/ADC Hardware Interface Card', category: 'Component', quantity: 10, status: 'Functional', location: 'Cabinet 5' },
      { id: 'em-6', name: 'Stepper Motor & DC Motor Interface Board', category: 'Component', quantity: 8, status: 'Maintenance', location: 'Cabinet 6' }
    ]
  },
  {
    id: 'comm',
    name: 'Communication Systems & RF Lab',
    code: 'ECE-203',
    roomNo: 'Room 203, First Floor',
    facultyInCharge: 'Dr. Jayanta Dey',
    technician: 'Mr. Toshiakum Longkumer',
    description: 'Covers modern radiofrequency communication, modulation techniques (AM/FM, FSK, QPSK, PCM), fiber optic links, antenna wave propagation, and microwave bench parameters.',
    experimentsCount: 11,
    equipment: [
      { id: 'cm-1', name: 'Microwave Test Bench (X-Band Gunn Source)', category: 'Instrument', quantity: 6, status: 'Functional', location: 'RF Tables 1-6' },
      { id: 'cm-2', name: 'Analog Communication modulation Trainer Kit', category: 'Trainer Kit', quantity: 10, status: 'Functional', location: 'Almirah F' },
      { id: 'cm-3', name: 'Digital Modulation & Demodulation kit', category: 'Trainer Kit', quantity: 10, status: 'Functional', location: 'Almirah G' },
      { id: 'cm-4', name: 'Fiber Optic Communication Trainer System', category: 'Trainer Kit', quantity: 8, status: 'Functional', location: 'Almirah H' },
      { id: 'cm-5', name: 'Spectrum Analyzer (3.2GHz)', category: 'Instrument', quantity: 2, status: 'Functional', location: 'Special Bench' },
      { id: 'cm-6', name: 'RF Signal Generator (9kHz - 1.5GHz)', category: 'Instrument', quantity: 3, status: 'Functional', location: 'Special Bench' }
    ]
  },
  {
    id: 'vlsi',
    name: 'VLSI Design & DSP Computing Lab',
    code: 'ECE-301',
    roomNo: 'Room 301, Second Floor',
    facultyInCharge: 'Dr. Chumendem Ozukum',
    technician: 'Mr. Neisazo Khruo',
    description: 'High-performance computing cluster supporting VLSI simulation, FPGA hardware synthesis, digital signal routing, and microchip routing layouts. Fully equipped with modern EDA and CAD suites.',
    experimentsCount: 12,
    equipment: [
      { id: 'vl-1', name: 'Intel Xeon Workstations (64GB RAM)', category: 'Instrument', quantity: 30, status: 'Functional', location: 'Computing Benches' },
      { id: 'vl-2', name: 'Basys-3 Artix-7 FPGA Development Board', category: 'Trainer Kit', quantity: 15, status: 'Functional', location: 'Almirah I' },
      { id: 'vl-3', name: 'Xilinx Vivado System Design Suite (Site License)', category: 'Software', quantity: 30, status: 'Functional', location: 'Server Install' },
      { id: 'vl-4', name: 'Cadence EDA Chip Design tools', category: 'Software', quantity: 10, status: 'Functional', location: 'Workstations 1-10' },
      { id: 'vl-5', name: 'DSP TMS320C6748 Starter Kit (LCD)', category: 'Trainer Kit', quantity: 12, status: 'Functional', location: 'Almirah J' },
      { id: 'vl-6', name: 'MATLAB & Simulink Suite', category: 'Software', quantity: 30, status: 'Functional', location: 'Server Install' }
    ]
  }
];

const scheduleData = [
  { day: 'Monday', morning: 'B.Tech Sem VI (VLSI Lab)', afternoon: 'B.Tech Sem IV (Analog Electronics)' },
  { day: 'Tuesday', morning: 'B.Tech Sem IV (Digital Logic)', afternoon: 'M.Tech Comm (RF Lab)' },
  { day: 'Wednesday', morning: 'B.Tech Sem VIII (Project Sessions)', afternoon: 'B.Tech Sem VI (Microprocessor Lab)' },
  { day: 'Thursday', morning: 'B.Tech Sem IV (Analog Electronics)', afternoon: 'B.Tech Sem VI (VLSI Lab)' },
  { day: 'Friday', morning: 'B.Tech Sem VI (Microprocessor Lab)', afternoon: 'Research & PhD Scholars Use' }
];

export default function LabDetails() {
  const [activeLabId, setActiveLabId] = useState<string>('analog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [trailVariant, setTrailVariant] = useState<number>(1);

  const selectedLab = labsData.find((l) => l.id === activeLabId) || labsData[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'analog':
        return <Layers className="h-4 w-4" />;
      case 'digital':
        return <Cpu className="h-4 w-4" />;
      case 'embedded':
        return <Calendar className="h-4 w-4" />;
      case 'comm':
        return <Radio className="h-4 w-4" />;
      case 'vlsi':
        return <Laptop className="h-4 w-4" />;
      default:
        return <Layers className="h-4 w-4" />;
    }
  };

  // Filter equipment based on search queries
  const filteredEquipment = selectedLab.equipment.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          eq.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || eq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate live bench occupancy grid based on static parameters for visual flavor
  const getOccupancyState = (benchId: number) => {
    // Generate organic occupancies for benches 1 to 15
    const occupiedBenches: Record<string, number[]> = {
      analog: [1, 3, 5, 8, 9, 12, 14],
      digital: [2, 4, 6, 7, 10, 11, 15],
      embedded: [1, 2, 5, 8, 11, 12, 13],
      comm: [3, 4, 6, 9, 10],
      vlsi: [1, 5, 6, 12, 14, 15]
    };
    return occupiedBenches[selectedLab.id]?.includes(benchId) ? 'Occupied' : 'Available';
  };

  return (
    <div className="max-w-6xl mx-auto my-6 px-4" id="lab-details-directory">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
          <Sparkles className="h-3 w-3" />
          <span>Research Infrastructure</span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
          ECE Core Laboratory Stations
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto text-left md:text-justify">
          The Department of Electronics & Communication Engineering at NIT Nagaland features state-of-the-art laboratory benches equipped with high-performance storage oscilloscopes, hardware training consoles, and professional EDA simulation systems.
        </p>
      </div>

      {/* Interactive Gallery Visual Trail Showcase */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 mb-10 overflow-hidden relative shadow-2xl">
        <div className="relative z-20 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span>Interactive Visualizer</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white tracking-tight">
            Laboratory Instrument & Hardware Trail
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed text-left md:text-justify">
            Move your mouse or drag your touch across the dark stage below to trace high-resolution captures of core ECE instruments, nanolithography machinery, and diagnostic waveforms.
          </p>

          {/* Variant Selector */}
          <div className="flex flex-wrap gap-1.5 mt-4 items-center">
            <span className="text-[10px] font-mono text-slate-500 mr-1.5">ANIMATION PATTERN:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((variantNum) => (
              <button
                key={variantNum}
                onClick={() => setTrailVariant(variantNum)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-all ${
                  trailVariant === variantNum
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                V{variantNum}
              </button>
            ))}
          </div>
        </div>

        {/* The ImageTrail Stage */}
        <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden h-[280px] sm:h-[340px] cursor-crosshair group flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="absolute z-10 text-center select-none pointer-events-none opacity-40 group-hover:opacity-10 transition-opacity">
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
              [ Hover / Touch & Drag Over This Stage ]
            </p>
            <p className="text-[9px] font-mono text-slate-500 mt-1">
              Currently using variant {trailVariant}
            </p>
          </div>

          <ImageTrail key={trailVariant} items={labImages} variant={trailVariant} />
        </div>
      </div>

      {/* 2. Horizontal Lab selector console */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-slate-200 pb-6">
        {labsData.map((lab) => (
          <button
            key={lab.id}
            onClick={() => {
              setActiveLabId(lab.id);
              setSearchQuery('');
              setCategoryFilter('All');
            }}
            className={`flex items-center space-x-2.5 px-4.5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 font-mono border font-semibold ${
              activeLabId === lab.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {getIcon(lab.id)}
            <span>{lab.code}</span>
          </button>
        ))}
      </div>

      {/* 3. Primary Dashboard Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Sessional Room Sidebar (5 Columns) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 p-6 md:p-8 flex flex-col justify-between border-r border-slate-850">
          <div className="space-y-6">
            <div>
              <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold border border-amber-400">
                Active Station Desk
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-4 leading-tight">
                {selectedLab.name}
              </h3>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-sans text-justify">
              {selectedLab.description}
            </p>

            <div className="border-t border-slate-800/80 pt-6 space-y-3.5 font-mono text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-400 font-medium">Room coordinates:</strong><br />
                  <span className="text-slate-200">{selectedLab.roomNo}</span>
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <User className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-400 font-medium">Faculty-In-Charge:</strong><br />
                  <span className="text-slate-200">{selectedLab.facultyInCharge}</span>
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Hammer className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-400 font-medium">Lab Technician:</strong><br />
                  <span className="text-slate-200">{selectedLab.technician}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-850 bg-slate-950/50 -mx-6 -mb-6 p-6 space-y-3 font-mono">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">
              Sessional Timetable Status
            </span>
            <div className="space-y-1 text-xs">
              <p className="text-slate-300">
                Weekly Batches: <span className="text-emerald-400 font-bold">{selectedLab.experimentsCount} Registered Exp.</span>
              </p>
              <p className="text-slate-400 text-[10.5px] leading-relaxed">
                Free Practical Bench Access: Monday to Friday (3:30 PM - 5:00 PM) for individual hardware routing checks and open sessional practice.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Registry Search & Schedule (7 Columns) */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-8">
          
          {/* Equipment Registry Section */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <h4 className="font-display font-bold text-slate-800 text-base uppercase tracking-wider">
                Laboratory Inventory Registry
              </h4>
              <span className="text-slate-500 text-xs font-mono bg-slate-105 px-2.5 py-1 rounded border">
                {filteredEquipment.length} Items Found
              </span>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search item name or bench location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-700"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-600 font-mono"
              >
                <option value="All">All Categories</option>
                <option value="Instrument">Instruments Only</option>
                <option value="Trainer Kit">Trainer Kits</option>
                <option value="Component">Discrete Parts</option>
                <option value="Software">Software licenses</option>
              </select>
            </div>

            {/* Interactive Registry Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-150 shadow-inner max-h-[280px] custom-scrollbar">
              <table className="w-full text-left text-xs text-slate-600">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[9px] font-bold sticky top-0 z-10">
                    <th className="py-2.5 px-3.5">Apparatus & Specifications</th>
                    <th className="py-2.5 px-2">Type</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-3.5 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredEquipment.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                        No equipment matched your filters in this laboratory.
                      </td>
                    </tr>
                  ) : (
                    filteredEquipment.map((eq) => (
                      <tr key={eq.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-2.5 px-3.5">
                          <span className="font-semibold text-slate-800 block">{eq.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Storage Rack: {eq.location}</span>
                        </td>
                        <td className="py-2.5 px-2">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-slate-100 border text-slate-600 font-semibold uppercase">
                            {eq.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono font-bold">
                          {eq.quantity}
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                              eq.status === 'Functional'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : eq.status === 'Maintenance'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {eq.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphical Live Bench Occupancy View (Extremely Visual & Advanced) */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3.5">
            <h4 className="font-display font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Grid className="h-4 w-4 text-slate-400" />
                <span>Live Bench Layout Occupancy Status</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase">Interactive Grid</span>
            </h4>
            
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {Array.from({ length: 15 }, (_, i) => i + 1).map((benchNum) => {
                const status = getOccupancyState(benchNum);
                return (
                  <div
                    key={`bench-lay-${benchNum}`}
                    className={`p-2 rounded border text-center transition-all ${
                      status === 'Occupied'
                        ? 'bg-rose-50 border-rose-150 text-rose-700 shadow-sm'
                        : 'bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm'
                    }`}
                    title={`Bench ${benchNum}: ${status}`}
                  >
                    <span className="font-mono text-[9px] font-bold block">{benchNum}</span>
                    <span className="text-[7px] font-mono uppercase tracking-widest block opacity-70">
                      {status === 'Occupied' ? 'OCC' : 'AV'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-4 text-[9px] font-mono text-slate-500 justify-end pt-1">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-emerald-500" />
                <span>Bench Available</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-rose-500" />
                <span>In-Use / Booked</span>
              </span>
            </div>
          </div>

          {/* Sessional Calendar grid */}
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-3">
            <h4 className="font-display font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Weekly Sessional Calendar Schedules</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {scheduleData.map((sch, i) => (
                <div key={i} className="bg-slate-55 border border-slate-200/80 p-2.5 rounded-xl text-center shadow-inner hover:border-slate-300 transition-colors">
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200 pb-1.5 mb-1.5">
                    {sch.day.substring(0, 3)}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold block leading-tight truncate" title={sch.morning}>
                    {sch.morning.split(' (')[0]}
                  </span>
                  <span className="text-[8px] text-slate-300 block font-mono my-1">•</span>
                  <span className="text-[10px] text-slate-600 font-semibold block leading-tight truncate font-sans" title={sch.afternoon}>
                    {sch.afternoon.split(' (')[0]}
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
