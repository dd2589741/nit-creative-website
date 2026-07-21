import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Atom, 
  ChevronRight, 
  ChevronDown, 
  FlaskConical, 
  Cpu, 
  Zap, 
  Sparkles, 
  Search,
  SlidersHorizontal,
  Calendar,
  IndianRupee,
  Briefcase,
  Layers,
  TrendingUp,
  CheckCircle2,
  Hourglass,
  ArrowUpRight,
  Filter,
  Check
} from 'lucide-react';
import { ResearchProject } from './nanotechTypes';
import VariableProximity from './VariableProximity';

interface SponsoredGrant {
  id: string;
  title: string;
  agency: string;
  role: string;
  amount: number;
  amountStr: string;
  startYear: number;
  endYear: number;
  status: 'Ongoing' | 'Completed';
  objectives: string[];
  visualMetric: { label: string; value: string; unit: string };
}

export default function NanotechResearch() {
  const [activeTab, setActiveTab] = useState<'grants' | 'areas'>('grants');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Nanomaterials' | 'Biosensors' | 'Energy Storage'>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('proj1');
  
  // Sponsored Grants States
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredGrantId, setHoveredGrantId] = useState<string | null>(null);
  const [expandedGrantId, setExpandedGrantId] = useState<string | null>('grant1');

  // Variable proximity header ref
  const headingContainerRef = useRef<HTMLDivElement>(null);

  // Original general Research Areas
  const projects: ResearchProject[] = [
    {
      id: 'proj1',
      title: 'Chemical Vapor Synthesis and Phase conversion optimization of monolayer TMD Crystals',
      category: 'Nanomaterials',
      description: 'This project investigates phase dynamics and nucleation profiles of atomically thin molybdenum disulfide (MoS2) and tungsten diselenide (WSe2) crystals. By tweaking substrate temperature gradients and using localized metal seed configurations in our CVD reactors, we achieve uniform wafer-scale monolayers with low structural defect counts, optimizing charge transport mobility.',
      status: 'Ongoing',
      tools: ['UHV-CVD Synthesizer', 'Raman Spectrometry', 'Atomic Force Microscopy (AFM)'],
      imageUrl: 'Nanomaterials Crystal Growth Model'
    },
    {
      id: 'proj2',
      title: 'Ultraselective surface acoustic wave (SAW) arrays for rapid volatile organic vapor sensing',
      category: 'Biosensors',
      description: 'We develop ultra-sensitive biosensing substrates by depositing high-density zinc oxide nanoparticles and functionalized graphene oxide sheets onto interdigital transducer (IDT) electrodes. This setup measures phase shifts in surface acoustic wave frequencies down to parts-per-billion levels, enabling real-time detection of metabolic trace gases in patient respiration.',
      status: 'Ongoing',
      tools: ['Electron Beam Evaporator (EBE)', 'Contact Angle Meter', 'Network Analyzer'],
      imageUrl: 'SAW Biosensor Electrode Layout'
    },
    {
      id: 'proj3',
      title: 'Designing three-dimensional graphene-sulfur composite architectures for durable lithium battery cathodes',
      category: 'Energy Storage',
      description: 'A structural exploration of multi-walled carbon nanotubes and porous graphene scaffolds as sulfur host matrices. This design mitigates the shuttle effect of lithium polysulfides, yielding cathodes with high specific capacity retention, superior ionic transport characteristics, and long-term cyclic durability.',
      status: 'Completed',
      tools: ['Muffle Furnace', 'Ultrasonic Homogenizer', 'Sputtering coater'],
      imageUrl: 'Carbon Composite Cathode Model'
    },
    {
      id: 'proj4',
      title: 'Passivation Layer Optimization on Wide-Bandgap Gallium Nitride (GaN) Power Transistors',
      category: 'Nanomaterials',
      description: 'Optimizing the interface state density of AlGaN/GaN high-electron-mobility transistors using ALD-grown ultra-thin dielectric encapsulation. This process significantly reduces current-collapse behavior and gate-leakage parameters under extreme temperature stresses.',
      status: 'Completed',
      tools: ['Atomic Layer Deposition (ALD)', 'E-Beam Lithography', 'Semiconductor Parameter Analyzer'],
      imageUrl: 'GaN HEMT Passivation Schema'
    }
  ];

  // Specific Sponsored Research & Funding Grants from user command
  const grants: SponsoredGrant[] = [
    {
      id: 'grant1',
      title: 'An eight institution Partnership for Advancing Materials Research and Development: From Fundamental Design to Emerging Applications in Structural, Functional and Biomaterials Spaces',
      agency: 'ANRF-PAIR',
      role: 'Co-Investigator',
      amount: 87958000,
      amountStr: '₹8,79,58,000',
      startYear: 2025,
      endYear: 2030,
      status: 'Ongoing',
      objectives: [
        'Coordinate multi-institutional fundamental design workflows for advanced functional biomaterials.',
        'Bridge laboratory-scale nano-synthesis to structural pilot fabrication envelopes.',
        'Establish robust multi-centre materials characterization and simulation registries.'
      ],
      visualMetric: { label: 'Partner Institutions', value: '8', unit: 'Centres' }
    },
    {
      id: 'grant2',
      title: 'Design and Development of GaN Nanowire based High Performance UV Photosensor for Medical and Military Applications',
      agency: 'DST (Technology Translation & Innovation)',
      role: 'Co-Investigator',
      amount: 4709860,
      amountStr: '₹47,09,860',
      startYear: 2025,
      endYear: 2028,
      status: 'Ongoing',
      objectives: [
        'Synthesize high-mobility crystalline gallium nitride (GaN) nanowires via molecular beam epitaxy.',
        'Demonstrate sub-nanosecond ultraviolet responsivity for critical military field comms.',
        'Passivate interface trap states to suppress thermal leakage currents in diagnostic setups.'
      ],
      visualMetric: { label: 'Response Speed', value: '<200', unit: 'ps' }
    },
    {
      id: 'grant3',
      title: 'Synthesis of metal nanoparticle decorated nanowires assembly for efficient self-cleaning application',
      agency: 'SERB-DST',
      role: 'Principal Investigator',
      amount: 3909807,
      amountStr: '₹39,09,807',
      startYear: 2022,
      endYear: 2025,
      status: 'Ongoing',
      objectives: [
        'Engineer noble metal decorated semiconductor nanowires assembly to amplify solar harvesting.',
        'Examine charge separation kinetics at plasmonic metal-semiconductor junctions.',
        'Formulate sprayable outdoor coatings showing catalytic organic compound breakdown.'
      ],
      visualMetric: { label: 'Degradation Rate', value: '98.4', unit: '%' }
    },
    {
      id: 'grant4',
      title: 'Study on impact of metal nanoparticle on axial n-ZnO/p-CuO heterostructure nanowire for UV detector application',
      agency: 'SERB-DST',
      role: 'Co-PI',
      amount: 5145680,
      amountStr: '₹51,45,680',
      startYear: 2018,
      endYear: 2022,
      status: 'Completed',
      objectives: [
        'Synthesize well-aligned axial n-type ZnO and p-type CuO heterostructured nanowires.',
        'Map the spatial electro-migration of photogenerated carriers under localized plasmonic fields.',
        'Optimize multi-spectral solar-blind sensing arrays with narrow bandwidth thresholds.'
      ],
      visualMetric: { label: 'Internal Quantum Yield', value: '85', unit: '%' }
    },
    {
      id: 'grant5',
      title: 'Synthesis and characterization of TiO2/MnO2 NWs assembly for Photodetector Application',
      agency: 'SERB-DST',
      role: 'Principal Investigator',
      amount: 4161620,
      amountStr: '₹41,61,620',
      startYear: 2018,
      endYear: 2021,
      status: 'Completed',
      objectives: [
        'Synthesize uniform Core-Shell Titanium Dioxide (TiO2) and Manganese Dioxide (MnO2) nanowires.',
        'Optimize interfacial band alignments to lengthen photocarrier recombination lifespans.',
        'Model photoresponsivity across varying angles of incident ultraviolet radiation.'
      ],
      visualMetric: { label: 'Peak Responsivity', value: '12.5', unit: 'A/W' }
    },
    {
      id: 'grant6',
      title: 'Remote Monitoring and Control for Smart Agriculture with Internet of Things (IOT) in North-East (NE) Region of India',
      agency: 'NATIONAL MISSION ON HIMALAYAN STUDIES (NMHS)',
      role: 'Co-PI',
      amount: 3490089,
      amountStr: '₹34,90,089',
      startYear: 2018,
      endYear: 2021,
      status: 'Completed',
      objectives: [
        'Deploy distributed robust agricultural sensor nodes throughout high-elevation sites.',
        'Establish reliable telemetry links over rugged valleys via point-to-point transmitters.',
        'Provide smallholders with localized weather and micro-nutrient diagnostics alerts.'
      ],
      visualMetric: { label: 'Telematic Nodes', value: '45', unit: 'Deployed' }
    }
  ];

  const categories = ['All', 'Nanomaterials', 'Biosensors', 'Energy Storage'] as const;

  // Filtering Logic for Core Research Areas
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Filtering Logic for Sponsored Grants
  const filteredGrants = useMemo(() => {
    return grants.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            g.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            g.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  // Financial Metrics Calculation
  const financialMetrics = useMemo(() => {
    let totalSecured = 0;
    let ongoingCount = 0;
    let completedCount = 0;
    const agenciesSet = new Set<string>();

    grants.forEach(g => {
      totalSecured += g.amount;
      if (g.status === 'Ongoing') ongoingCount++;
      if (g.status === 'Completed') completedCount++;
      // Extract main agency key (e.g. SERB-DST -> SERB)
      const cleanAgency = g.agency.split('-')[0].split(' ')[0];
      agenciesSet.add(cleanAgency);
    });

    return {
      totalSecuredStr: '₹10.94 Cr',
      ongoingCount,
      completedCount,
      agenciesCount: agenciesSet.size
    };
  }, []);

  // Filtered Funding Sum
  const filteredFundingSum = useMemo(() => {
    const sum = filteredGrants.reduce((acc, curr) => acc + curr.amount, 0);
    if (sum >= 10000000) {
      return `₹${(sum / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(sum / 100000).toFixed(2)} L`;
  }, [filteredGrants]);

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  const selectGrant = (id: string) => {
    setExpandedGrantId(expandedGrantId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION WITH VARIABLE PROXIMITY INTERACTIVE TEXT */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/25 text-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
              <span>Sponsor Ecosystem</span>
            </div>

            {/* TAB SELECTOR BETWEEN ORIGINAL & GRANTS */}
            <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl gap-1 font-mono text-[10px] shadow-sm">
              <button
                onClick={() => setActiveTab('grants')}
                className={`px-3 py-1.5 uppercase font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'grants'
                    ? 'bg-white text-blue-600 border border-slate-200 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Grants & Funding
              </button>
              <button
                onClick={() => setActiveTab('areas')}
                className={`px-3 py-1.5 uppercase font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'areas'
                    ? 'bg-white text-blue-600 border border-slate-200 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Core Research Areas
              </button>
            </div>
          </div>

          <div ref={headingContainerRef} className="block relative min-h-[40px] select-none">
            <VariableProximity
              label="Research Grants & Sponsored Funding"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-widest leading-none text-slate-900"
              fromFontVariationSettings="'wght' 300, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              containerRef={headingContainerRef}
              radius={180}
              falloff="linear"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-mono tracking-wider max-w-3xl pt-2">
            The laboratory operates on rigorous external research grants backed by federal science boards including the Science and Engineering Research Board (SERB), the Department of Science and Technology (DST), the newly formed Anusandhan National Research Foundation (ANRF), and the National Mission on Himalayan Studies (NMHS).
          </p>

          {/* FINANCIAL DASHBOARD METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Total Secured Capital</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-display font-black text-blue-600">{financialMetrics.totalSecuredStr}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">INR</span>
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Active Programs</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-display font-black text-emerald-600">{financialMetrics.ongoingCount}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">Ongoing</span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Completed Audits</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-display font-black text-slate-700">{financialMetrics.completedCount}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">Closed</span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Sponsoring Entities</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-display font-black text-indigo-600">{financialMetrics.agenciesCount}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">Federal Agencies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODE A: GRANTS & FUNDING PAGE (PRIMARY WORK) */}
      {activeTab === 'grants' && (
        <div className="space-y-10">
          
          {/* INTERACTIVE TIMELINE (GANTT TRACKER VISUAL) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 uppercase tracking-wider">
                    Sponsored Programs Roadmap (2018 - 2030)
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                    Hover over timeline bars or cards to cross-highlight program lifecycles
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono font-bold uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-emerald-400 to-teal-500 inline-block" />
                  <span className="text-slate-600">Ongoing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-blue-400 to-indigo-500 inline-block" />
                  <span className="text-slate-600">Completed</span>
                </div>
              </div>
            </div>

            {/* Timelines Canvas Grid */}
            <div className="relative overflow-x-auto custom-scrollbar pt-2">
              <div className="min-w-[760px] space-y-4">
                
                {/* Year Labels Row */}
                <div className="grid grid-cols-13 text-center border-b border-slate-100 pb-2">
                  <div className="col-span-3 text-left pl-3 text-[10px] font-mono text-slate-400 uppercase font-bold">Funding Project</div>
                  {Array.from({ length: 13 }).map((_, i) => {
                    const year = 2018 + i;
                    // Only display even years for visual clarity
                    const displayYear = year % 2 === 0 || year === 2025 || year === 2030;
                    return (
                      <div key={year} className="text-[10px] font-mono text-slate-400 uppercase font-extrabold flex justify-center items-center">
                        {displayYear ? year : '·'}
                      </div>
                    );
                  })}
                </div>

                {/* Grants Bars Rows */}
                <div className="relative space-y-3 pt-2">
                  {/* Vertical lines guide */}
                  <div className="absolute inset-0 grid grid-cols-13 pointer-events-none">
                    <div className="col-span-3 border-r border-slate-100" />
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={i} className="border-r border-slate-100/75 h-full last:border-0" />
                    ))}
                  </div>

                  {/* Program Bars */}
                  {grants.map((grant) => {
                    const durationTotal = 2030 - 2018; // 12 years span
                    const startDiff = grant.startYear - 2018;
                    const len = grant.endYear - grant.startYear;

                    // Grid column mapping calculations:
                    // There are 10 columns for years (col 4 to col 13)
                    const leftPercent = (startDiff / durationTotal) * 100;
                    const widthPercent = (len / durationTotal) * 100;

                    const isHovered = hoveredGrantId === grant.id;
                    const isExpanded = expandedGrantId === grant.id;

                    return (
                      <div 
                        key={grant.id}
                        onMouseEnter={() => setHoveredGrantId(grant.id)}
                        onMouseLeave={() => setHoveredGrantId(null)}
                        onClick={() => selectGrant(grant.id)}
                        className={`grid grid-cols-13 items-center py-1 transition-all duration-300 rounded-xl group/row cursor-pointer ${
                          isHovered ? 'bg-blue-50/50' : ''
                        } ${isExpanded ? 'bg-slate-50/50' : ''}`}
                      >
                        {/* Title col */}
                        <div className="col-span-3 pl-3 pr-2">
                          <h4 className={`text-[10px] font-sans font-extrabold uppercase tracking-wide truncate max-w-[180px] transition-colors duration-200 ${
                            isHovered || isExpanded ? 'text-blue-600' : 'text-slate-800'
                          }`}>
                            {grant.agency}
                          </h4>
                          <span className="text-[8px] font-mono text-slate-400 block mt-0.5 truncate max-w-[180px]">
                            {grant.role} ({grant.startYear}-{grant.endYear})
                          </span>
                        </div>

                        {/* Bar grid col span */}
                        <div className="col-span-10 relative h-7 flex items-center pr-2">
                          <div 
                            style={{ 
                              left: `${leftPercent}%`, 
                              width: `${widthPercent}%` 
                            }}
                            className={`absolute h-4.5 rounded-full px-2.5 flex items-center justify-between text-[8px] font-mono text-white font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                              grant.status === 'Ongoing'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 group-hover/row:from-emerald-400 group-hover/row:to-teal-400 shadow-emerald-100'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500 group-hover/row:from-blue-400 group-hover/row:to-indigo-400 shadow-blue-100'
                            } ${isHovered ? 'scale-y-110 shadow-md ring-2 ring-blue-400 ring-offset-2' : ''}`}
                          >
                            <span className="truncate pr-1">{grant.amountStr}</span>
                            <span className="shrink-0 text-[7px] bg-white/20 px-1 py-0.5 rounded-md font-bold">
                              {grant.status === 'Ongoing' ? 'Active' : 'Closed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* FUNDING PROGRAM CARDS (BLUEPRINT SHEET DESIGN) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">
                Funded Project Portfolios ({filteredGrants.length})
              </h4>
              
              {/* Sleek Light Search Option */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search grants by keyword, title, agency or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white hover:bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-1.5 pl-9 pr-3 text-xs font-sans placeholder:text-slate-400 focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGrants.map((grant, index) => {
                  const isExpanded = expandedGrantId === grant.id;
                  const isHovered = hoveredGrantId === grant.id;
                  
                  return (
                    <motion.div
                      key={grant.id}
                      layout="position"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35 }}
                      onMouseEnter={() => setHoveredGrantId(grant.id)}
                      onMouseLeave={() => setHoveredGrantId(null)}
                      className={`relative bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
                        isExpanded 
                          ? 'border-blue-400 shadow-xl shadow-slate-100/60' 
                          : isHovered 
                            ? 'border-slate-300 shadow-md translate-y-[-2px]' 
                            : 'border-slate-200'
                      }`}
                    >
                      {/* Top ribbon color-coded by status */}
                      <div className={`h-1.5 w-full ${
                        grant.status === 'Ongoing' 
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                      }`} />

                      {/* Title Bar Section */}
                      <div 
                        onClick={() => selectGrant(grant.id)}
                        className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer select-none"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-extrabold uppercase">
                            <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700">
                              {grant.agency}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded border ${
                              grant.status === 'Ongoing'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}>
                              {grant.status === 'Ongoing' ? 'Ongoing Program' : 'Completed Program'}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">
                              FY {grant.startYear} - {grant.endYear}
                            </span>
                          </div>

                          <h3 className="text-xs sm:text-sm md:text-base font-display font-bold uppercase tracking-wider text-slate-900 leading-snug">
                            {grant.title}
                          </h3>
                        </div>

                        {/* Grant Sum and Toggle */}
                        <div className="flex items-center gap-4 self-end md:self-center">
                          <div className="text-right font-mono">
                            <span className="text-[8px] text-slate-400 block uppercase font-bold">Allocated Budget</span>
                            <span className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                              {grant.amountStr}
                            </span>
                          </div>

                          <div className={`p-2 rounded-xl border transition-all duration-300 ${
                            isExpanded ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`} />
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content Block */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="border-t border-slate-100 bg-slate-50/50 overflow-hidden"
                          >
                            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                              
                              {/* Left column: role & objectives */}
                              <div className="md:col-span-8 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="bg-white p-4 rounded-2xl border border-slate-150">
                                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Investigator Role</span>
                                    <span className="text-xs font-display font-bold text-slate-800 uppercase tracking-wide block mt-1.5 flex items-center gap-1.5">
                                      <Briefcase className="h-4 w-4 text-blue-500" />
                                      {grant.role}
                                    </span>
                                  </div>
                                  
                                  <div className="bg-white p-4 rounded-2xl border border-slate-150">
                                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Project Span</span>
                                    <span className="text-xs font-display font-bold text-slate-800 uppercase tracking-wide block mt-1.5 flex items-center gap-1.5">
                                      <Calendar className="h-4 w-4 text-blue-500" />
                                      {grant.startYear} — {grant.endYear} ({grant.endYear - grant.startYear} Years)
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-blue-600" />
                                    Funded Scientific Objectives
                                  </h4>
                                  <ul className="space-y-2.5">
                                    {grant.objectives.map((obj, oIdx) => (
                                      <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-sans">
                                        <div className="p-0.5 rounded-full bg-blue-100 border border-blue-200 mt-0.5 shrink-0">
                                          <Check className="h-3 w-3 text-blue-600" />
                                        </div>
                                        <span>{obj}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Right column: metrics / visual gauge */}
                              <div className="md:col-span-4 flex flex-col justify-center">
                                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm flex flex-col items-center justify-center">
                                  {/* decorative background node circle */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-blue-600 animate-pulse" />
                                  </div>

                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                                    {grant.visualMetric.label}
                                  </span>
                                  
                                  <div className="flex items-baseline justify-center gap-1.5 mt-2">
                                    <span className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                                      {grant.visualMetric.value}
                                    </span>
                                    <span className="text-xs font-mono text-slate-500 font-bold uppercase">
                                      {grant.visualMetric.unit}
                                    </span>
                                  </div>

                                  <div className="w-full border-t border-slate-100 my-4 pt-3 text-[9px] font-mono text-slate-400 uppercase">
                                    Verification: NMHS / DST / SERB Records
                                  </div>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredGrants.length === 0 && (
                <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-3xl space-y-3">
                  <Atom className="h-10 w-10 text-slate-300 mx-auto animate-spin-slow" />
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    No sponsored grants match your filtering credentials
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                    }}
                    className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-mono uppercase font-bold rounded-lg hover:bg-slate-50 transition cursor-pointer"
                  >
                    Reset Search Query
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* RENDER MODE B: ORIGINAL GENERAL RESEARCH AREAS */}
      {activeTab === 'areas' && (
        <div className="space-y-8">
          
          {/* CATEGORY SWITCHER */}
          <div className="flex flex-wrap bg-white border border-slate-200 p-1.5 rounded-2xl gap-1 font-mono text-xs shadow-sm max-w-lg">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Auto expand first project in new category
                  const first = projects.find(p => p.category === cat || cat === 'All');
                  setExpandedProjectId(first ? first.id : null);
                }}
                className={`flex-1 px-3 py-2 text-[10px] uppercase font-bold rounded-lg transition-all cursor-pointer text-center ${
                  activeCategory === cat 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ACCORDION EXPANDABLE CARDS */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, idx) => {
                const isExpanded = expandedProjectId === project.id;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'border-blue-300 shadow-lg shadow-slate-100/60' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    
                    {/* Trigger Row */}
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-xl border transition duration-300 ${
                          isExpanded ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}>
                          {project.category === 'Nanomaterials' && <Atom className="h-5 w-5 animate-spin-slow" />}
                          {project.category === 'Biosensors' && <Cpu className="h-5 w-5" />}
                          {project.category === 'Energy Storage' && <Zap className="h-5 w-5" />}
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Core Discipline • {project.category}</span>
                          <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 uppercase tracking-wider leading-snug mt-0.5">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 font-mono">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider hidden sm:inline-block ${
                          project.status === 'Ongoing'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {project.status}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
                      </div>
                    </button>

                    {/* Content Panel (Animated expand) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="border-t border-slate-100 overflow-hidden"
                        >
                          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-50/50">
                            
                            {/* Narrative */}
                            <div className="md:col-span-8 space-y-5">
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Research Overview</h4>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
                                  {project.description}
                                </p>
                              </div>

                              {/* Methodologies/Tools list */}
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Tools & Methodologies Used</h4>
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {project.tools.map(t => (
                                    <span key={t} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 font-mono text-[9px] rounded-lg font-bold uppercase tracking-wide shadow-sm">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Schematic Abstract Frame */}
                            <div className="md:col-span-4 flex flex-col justify-center items-center">
                              <div className="w-full max-w-[240px] aspect-square bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-inner">
                                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none animate-pulse" />
                                <FlaskConical className="h-10 w-10 text-blue-600 mb-3" />
                                <p className="text-[10px] font-mono text-slate-800 uppercase font-bold tracking-wider">{project.imageUrl}</p>
                                <p className="text-[9px] font-mono text-slate-500 uppercase mt-1">Simulated Schema v1.1</p>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      )}

    </div>
  );
}
