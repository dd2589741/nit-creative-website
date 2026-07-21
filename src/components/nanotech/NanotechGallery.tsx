import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Atom, 
  Camera, 
  Layers, 
  Cpu, 
  Users,
  ArrowDown,
  Sparkles,
  FlaskConical
} from 'lucide-react';
import { GalleryItem } from './nanotechTypes';
import CircularGallery from './CircularGallery';

// Reference static paths to avoid build failures on deleted files
const circularItemsWithDetails = [
  { 
    image: '/Muffle Furnace.jpg', 
    text: 'Muffle Furnace',
    category: 'Synthesis',
    description: 'High-temperature thermal calcination, chemical vapor crystallization, and material sintering system under controlled atmospheric metrics.',
    details: [
      { label: 'Max Temperature', value: '1200°C' },
      { label: 'Heating Rate', value: 'Up to 20°C/min' },
      { label: 'Atmosphere', value: 'Air, Nitrogen, Argon' },
      { label: 'Chamber Volume', value: '7.2 Liters' }
    ]
  },
  { 
    image: '/Ultrasonic Cleaner.jpg', 
    text: 'Ultrasonic Cleaner',
    category: 'Utility',
    description: 'Applies localized high-frequency cavitation pulses to thoroughly cleanse silicon substrates, quartz channels, and microfluidic templates of organic debris.',
    details: [
      { label: 'Frequency', value: '40 kHz / 80 kHz Dual-Freq' },
      { label: 'Heating Power', value: '300W (up to 80°C)' },
      { label: 'Transducer', value: 'Industrial Cavitation-Resistant' },
      { label: 'Material', value: 'SUS304 Stainless Steel' }
    ]
  },
  { 
    image: '/contact angle meter.jpg', 
    text: 'Contact Angle Meter',
    category: 'Metrology',
    description: 'Examines dynamic contact angle thresholds and surface energy coefficients of localized nanostructures to inspect hydrophobic or hydrophilic behavior.',
    details: [
      { label: 'Measurement Range', value: '0° to 180° (±0.1°)' },
      { label: 'Dispenser Unit', value: 'Software-controlled syringe' },
      { label: 'Optical Zoom', value: '6.5x Zoom with LED Backlight' },
      { label: 'Methods', value: 'Sessile drop, Pendant drop' }
    ]
  },
  { 
    image: '/Electron Beam Evaporation System.jpg', 
    text: 'E-Beam Evaporator',
    category: 'Synthesis',
    description: 'Deposits high-purity thin films of noble metals (Au, Ag, Pt) and dielectrics with nanometer precision on semiconductor device wafers.',
    details: [
      { label: 'Gun Power', value: '6 kW with High-Voltage Sweep' },
      { label: 'Crucible Hearth', value: '4-pocket Rotary Carousel' },
      { label: 'Rate Control', value: 'Quartz Crystal Microbalance' },
      { label: 'Substrate Temp', value: 'Radiant heating up to 400°C' }
    ]
  },
  { 
    image: '/Electron Beam Evaporation (EBE) Vacuum Coating System(full view).jpg', 
    text: 'EBE Vacuum Coater',
    category: 'Synthesis',
    description: 'Advanced dual-channel physical vapor deposition chamber designed for uniform multi-stack thin-film coatings under deep vacuum conditions.',
    details: [
      { label: 'Base Pressure', value: '5 × 10^-7 Torr' },
      { label: 'Pumping Stack', value: 'Cryo-pump + Dry roughing pump' },
      { label: 'Chamber Material', value: 'SUS304 Spherical Chamber' },
      { label: 'Controller', value: 'Inficon QCM Dual-channel' }
    ]
  },
  { 
    image: '/Electronic Analytical Balance.jpg', 
    text: 'Analytical Balance',
    category: 'Utility',
    description: 'Provides ultra-precise weight measurements of chemical precursors, nanomaterial powders, and microscale substrates down to sub-milligram levels.',
    details: [
      { label: 'Readability', value: '0.01 mg (5-decimal places)' },
      { label: 'Max Capacity', value: '220 g' },
      { label: 'Calibration', value: 'isoCAL Automatic Internal' },
      { label: 'Settle Time', value: '< 3.0 seconds' }
    ]
  },
  { 
    image: '/Hitachi UH4150 UV-vis-NIR spectrophotometer.jpg', 
    text: 'Hitachi Spectrometer',
    category: 'Metrology',
    description: 'High-performance double-monochromator spectrophotometer designed to measure absolute reflectance and transmittance of solid-state structures and thin films.',
    details: [
      { label: 'Wavelength Range', value: '240 nm to 2600 nm' },
      { label: 'Optical Layout', value: 'Double Beam Monochromator' },
      { label: 'Light Sources', value: 'Deuterium & Halogen lamps' },
      { label: 'Detector Array', value: 'PMT + Cooled PbS cell' }
    ]
  },
  { 
    image: '/Hitachi UH4150 UV-vis-NIR spectrophotometer(inside view).jpg', 
    text: 'UH4150 Sample Chamber',
    category: 'Metrology',
    description: 'Inner sample chamber view of the Hitachi UH4150, showcasing high-precision mounts, integrated BaSO4 integrating sphere, and optoelectronic alignment tools.',
    details: [
      { label: 'Integrating Sphere', value: '60mm diameter internal BaSO4' },
      { label: 'Sample Stage', value: 'Spring-loaded clip with tilt controls' },
      { label: 'Beam Aperture', value: 'Adjustable rectangular mask' },
      { label: 'Optical Path', value: 'Dual-path reflecting' }
    ]
  },
  { 
    image: '/laboratory fume hood with several instruments used for nano technology,chemistry and material research.jpg', 
    text: 'Laboratory Fume Hood',
    category: 'Utility',
    description: 'Specially engineered high-exhaust safety hood designed for risk-free chemical handling, wet etching, and volatile solvent micro-manipulations.',
    details: [
      { label: 'Exhaust Velocity', value: '100 fpm at certified sash height' },
      { label: 'Baffle Design', value: 'Triple-baffle exhaust balancing' },
      { label: 'Interior Shell', value: 'Acid/alkali-resistant laminate' },
      { label: 'Utilities', value: 'DI water, gaseous N2, vacuum lines' }
    ]
  },
  { 
    image: '/Laboratory Hot Plate Magnetic Stirrer.jpg', 
    text: 'Hot Plate Stirrer',
    category: 'Synthesis',
    description: 'Delivers uniform thermal heating and highly synchronized magnetic agitation for colloidal solutions, sol-gel mixtures, and nanoparticle dispersions.',
    details: [
      { label: 'Temp Range', value: 'Ambient to 340°C' },
      { label: 'Speed Range', value: '100 to 1500 RPM' },
      { label: 'Plate Material', value: 'Ceramic-Coated Aluminum' },
      { label: 'Temp Control', value: 'PID feedback external probe' }
    ]
  },
  { 
    image: '/Laminar Air Flow Workstation.jpg', 
    text: 'Laminar Air Workstation',
    category: 'Utility',
    description: 'Creates a dust-free sterile microenvironment by exhausting unidirectional HEPA-filtered clean air across the high-precision work surface.',
    details: [
      { label: 'Filter Class', value: 'HEPA Filter (99.99% at 0.3 µm)' },
      { label: 'Air Speed', value: '0.45 m/s laminar velocity' },
      { label: 'Work Table', value: 'Highly-polished SUS304 seamless' },
      { label: 'Sterilization', value: 'UV-C germicidal safety source' }
    ]
  },
  { 
    image: '/FPGA PCIPCIe Development Board (Terasic FPGA board with cooling fan).jpg', 
    text: 'FPGA PCI/PCIe',
    category: 'Hardware',
    description: 'Terasic high-bandwidth PCI and PCI Express (PCIe) development board, equipped with high-density FPGA fabrics, active fan cooling, and low-latency transceivers for high-performance computing.',
    details: [
      { label: 'High-Speed interface', value: 'PCIe Gen2 / Gen3 Gen' },
      { label: 'Logic Elements', value: 'High-Density FPGA fabric' },
      { label: 'Thermal Solution', value: 'Active heatsink cooling fan' },
      { label: 'Primary Use', value: 'Parallel processing co-accelerator' }
    ]
  },
  { 
    image: '/FPGA Development Board with IO connectors and cooling fan.jpg', 
    text: 'FPGA IO Board',
    category: 'Hardware',
    description: 'A high-performance FPGA prototyping system featuring various expansion I/O headers, peripheral connectors, onboard memory blocks, and active fan cooling for thermal safety under continuous execution.',
    details: [
      { label: 'Peripherals', value: 'High-density dual-row GPIO headers' },
      { label: 'Memory Profile', value: 'Onboard DDR3 / SRAM blocks' },
      { label: 'Main FPGA', value: 'Intel Cyclone / Stratix Series' },
      { label: 'Fan Controller', value: 'PWM-regulated multi-stage cooling' }
    ]
  },
  { 
    image: '/Terasic Altera Nios Development Board (Nios Embedded Processor Development Kit).jpg', 
    text: 'Altera Nios Kit',
    category: 'Embedded',
    description: 'Terasic Altera Nios Embedded Processor Development Kit designed for prototyping system-on-a-programmable-chip (SOPC) environments and soft-core microcontroller architectures.',
    details: [
      { label: 'CPU Core', value: 'Nios II soft-core processor' },
      { label: 'Flash Memory', value: 'Parallel CFI flash & EPCS device' },
      { label: 'Software IDE', value: 'Quartus Prime & Nios II SBT' },
      { label: 'Connectivity', value: 'Ethernet, RS-232, and JTAG' }
    ]
  },
  { 
    image: '/Terasic DE2 Development Board with LCD display.jpg', 
    text: 'DE2 LCD Board',
    category: 'Education',
    description: 'Terasic DE2 Development Board integrated with a character LCD display module, rich switches, LEDs, memory units, and digital-to-analog converters for interactive hardware labs.',
    details: [
      { label: 'Core FPGA', value: 'Cyclone II EP2C35F672C6' },
      { label: 'Display Type', value: '16x2 Character LCD Module' },
      { label: 'Audio/Video', value: '24-bit DAC video out & Audio CODEC' },
      { label: 'IO Interfaces', value: 'USB Blaster, RS-232, PS/2 ports' }
    ]
  },
  { 
    image: '/Terasic DE2 Development Board with LCD touchscreen.jpg', 
    text: 'DE2 Touch Board',
    category: 'Embedded',
    description: 'DE2 Altera evaluation platform expanded with an interactive liquid-crystal color touchscreen module, ideal for testing graphical user interfaces and touchscreen-driven systems.',
    details: [
      { label: 'Panel Type', value: 'TFT LCD with resistive touchscreen' },
      { label: 'Interface', value: 'SPI / Parallel Display Bus' },
      { label: 'Host System', value: 'Terasic DE2 Series platform' },
      { label: 'Application', value: 'Human-Machine Interface prototyping' }
    ]
  },
  { 
    image: '/Terasic TR4 FPGA Development Board.jpg', 
    text: 'Terasic TR4 Board',
    category: 'Hardware',
    description: 'Enterprise-grade Terasic TR4 FPGA development board with high-speed serial transceivers, extensive memory bandwidth, and high-performance expansion slots designed for system verification.',
    details: [
      { label: 'Core FPGA', value: 'Altera Stratix IV GX device' },
      { label: 'Transceiver Speed', value: 'Up to 8.5 Gbps per channel' },
      { label: 'External Memory', value: 'DDR3 SO-DIMM and SSRAM blocks' },
      { label: 'FMC Connectors', value: 'High-pin-count expansion slots' }
    ]
  },
  { 
    image: '/Terasic MAX 10 NEEK (Network Embedded Evaluation Kit) or similar MAX-series FPGA board.jpg', 
    text: 'MAX 10 NEEK Kit',
    category: 'Embedded',
    description: 'Terasic MAX 10 Network Embedded Evaluation Kit (NEEK), showcasing a non-volatile dual-boot FPGA integrated with 5-point capacitive multi-touch LCD panel, camera modules, and ethernet.',
    details: [
      { label: 'Processor chip', value: 'Intel MAX 10 Dual-ADC FPGA' },
      { label: 'Touchscreen', value: '5-point Capacitive Multi-touch' },
      { label: 'Multimedia', value: '8MP camera, HDMI out, Audio IN/OUT' },
      { label: 'Network', value: 'Gigabit Ethernet, Wi-Fi expansion' }
    ]
  },
  { 
    image: '/Terasic MTL2 LCD Touch Display Module (LCD touchscreen expansion board).jpg', 
    text: 'MTL2 Touch Board',
    category: 'Peripherals',
    description: 'Terasic Multi-touch LCD touchscreen expansion board (MTL2), delivering premium graphical output and responsive interactive sensing via standard IDE/GPIO ribbons for various FPGA platforms.',
    details: [
      { label: 'Resolution', value: '800 x 480 widescreen resolution' },
      { label: 'Display Area', value: '7-inch active display panel' },
      { label: 'Touch Engine', value: '5-point Multi-touch sensor' },
      { label: 'Compatibility', value: 'DE1-SoC, DE2-115, and DE10-Standard' }
    ]
  }
];

const extraItemsWithDetails = [
  {
    image: '/arjun_college_students.jpeg',
    text: 'ACT Nanotech Internship',
    category: 'Internship',
    description: "Students from Arjun College of Technology successfully attended a Nanotechnology and Fabrication Internship at NIT Nagaland, gaining valuable hands-on experience in advanced research techniques, laboratory practices, and modern fabrication technologies. The internship provided an excellent platform to enhance technical knowledge, develop practical skills, and interact with experienced faculty and researchers, contributing to the students' academic and professional growth.",
    details: [
      { label: 'Institution', value: 'Arjun College of Technology' },
      { label: 'Host Institute', value: 'NIT Nagaland' },
      { label: 'Focus Area', value: 'Nanotech & Fabrication' },
      { label: 'Program Goal', value: 'Hands-on advanced research' }
    ]
  },
  {
    image: '/IMG_5210.png',
    text: 'Cultural Fest 2024',
    category: 'Cultural',
    description: 'A vibrant showcase of rich heritage, traditional dances, musical performances, and ethnic apparel at the annual Elysium cultural fest of NIT Nagaland.',
    details: [
      { label: 'Event', value: 'Elysium Cultural Festival' },
      { label: 'Theme', value: 'Unity in Diversity' },
      { label: 'Performances', value: 'Traditional folk, modern ensemble' },
      { label: 'Location', value: 'Main Campus Quadrangle' }
    ]
  },
  {
    image: '/IMG_5214.png',
    text: 'Sports Championship',
    category: 'Athletics',
    description: 'Dynamic inter-departmental athletic championships and track events, fostering peak physical conditioning, discipline, and competitive spirit.',
    details: [
      { label: 'Meet Name', value: 'Annual Athletic Meet' },
      { label: 'Featured Sports', value: '100m Sprint, Relay, High Jump' },
      { label: 'Active Teams', value: '6 Academic Departments' },
      { label: 'Trophy Winner', value: 'ECE Relay Contingent' }
    ]
  },
  {
    image: '/IMG_5222.png',
    text: 'Technical Seminar',
    category: 'Academics',
    description: 'Interactive presentation sessions, paper exhibitions, and national tech forums showcasing student designs, micro-circuits, and embedded innovations.',
    details: [
      { label: 'Event', value: 'National ECE Tech-Symposium' },
      { label: 'Theme', value: 'Next-Gen Semiconductor Prototyping' },
      { label: 'Presentations', value: '15 student design briefs' },
      { label: 'Venue', value: 'Seminar Hall' }
    ]
  },
  {
    image: '/IMG_5229.png',
    text: 'Student Orientation',
    category: 'Orientation',
    description: 'Induction program for the incoming undergraduate and postgraduate scholars, offering detailed campus tours and specialized laboratory briefings.',
    details: [
      { label: 'Program', value: 'Freshers Orientation & Induction' },
      { label: 'Beneficiaries', value: 'B.Tech & M.Tech Class of 2024' },
      { label: 'Coordinators', value: 'ECE Student Activity Council' },
      { label: 'Keynote Venue', value: 'Auditorium' }
    ]
  }
];

interface NanotechGalleryProps {
  initialTab?: 'laboratory' | 'extra';
  onTabChange?: (tab: 'laboratory' | 'extra') => void;
}

export default function NanotechGallery({ initialTab = 'laboratory', onTabChange }: NanotechGalleryProps) {
  const [activeTab, setActiveTab] = useState<'laboratory' | 'extra'>(initialTab);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Synchronize internal state when prop changes
  React.useEffect(() => {
    setActiveTab(initialTab);
    setActiveIndex(0);
    setLightboxIndex(null);
  }, [initialTab]);

  const handleTabChange = (tab: 'laboratory' | 'extra') => {
    setActiveTab(tab);
    setActiveIndex(0);
    setLightboxIndex(null);
    onTabChange?.(tab);
  };

  const currentItems = activeTab === 'laboratory' ? circularItemsWithDetails : extraItemsWithDetails;

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % currentItems.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + currentItems.length) % currentItems.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Visual Archives</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            {activeTab === 'laboratory' ? 'Laboratory Gallery' : 'Extra Curriculum Gallery'}
          </h2>
        </div>

        {/* Tab Switcher inside the page */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-inner shrink-0">
          <button
            onClick={() => handleTabChange('laboratory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'laboratory'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Laboratory
          </button>
          <button
            onClick={() => handleTabChange('extra')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'extra'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Extra Curriculum
          </button>
        </div>
      </div>

      {/* 3D INTERACTIVE CAROUSEL */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Hologram details */}
        <div className="absolute top-4 left-6 flex items-center space-x-2 font-mono text-[9px] text-blue-600 uppercase tracking-widest pointer-events-none z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>WebGL 3D Interactive Carousel</span>
        </div>
        <div className="absolute top-4 right-6 font-mono text-[9px] text-slate-400 uppercase tracking-widest pointer-events-none hidden sm:block z-20">
          SCAN_MOD: CONTINUOUS • REFR: 60Hz
        </div>
        
        <div style={{ height: '480px', position: 'relative' }} className="w-full">
          {/* We add a unique key here based on activeTab so the component forces a fresh WebGL clean context when tabs switch */}
          <CircularGallery
            key={activeTab}
            items={currentItems}
            bend={1.2}
            textColor="#0f172a"
            borderRadius={0.06}
            scrollEase={0.05}
            fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
            font="bold 28px Orbitron"
            scrollSpeed={2}
            onActiveIndexChange={(idx) => {
              // Clamp index safely just in case
              if (currentItems[idx]) {
                setActiveIndex(idx);
              }
            }}
          />
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-20">
          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
            Drag to spin • Scroll wheel to rotate the live samples
          </span>
        </div>
      </div>

      {/* QUICK DESCRIPTION AND SPECIFICATION CARD DIRECTLY BELOW THE CIRCULAR GALLERY */}
      {currentItems[activeIndex] && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden"
        >
          {/* Subtle design grid lines background */}
          <div className="absolute inset-y-0 right-1/4 w-px bg-slate-100/80 pointer-events-none hidden md:block" />
          
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-[9px] font-mono font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-150 uppercase tracking-wider">
                {currentItems[activeIndex].category}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Item {activeIndex + 1} of {currentItems.length}
              </span>
            </div>
            <h4 className="text-base font-display font-black text-slate-900 uppercase tracking-widest">
              {currentItems[activeIndex].text}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentItems[activeIndex].description}
            </p>
            
            {/* Mini Specifications Readout */}
            <div className="flex flex-wrap gap-2 pt-1.5">
              {currentItems[activeIndex].details.map((detail, idx) => (
                <span key={idx} className="text-[9px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-150">
                  <span className="font-bold uppercase text-[8px] text-blue-600 mr-1">{detail.label}:</span>
                  <span className="text-slate-800">{detail.value}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              const element = document.getElementById('detailed-spotlight');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="shrink-0 self-start md:self-center flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg rounded-xl transition duration-200 text-xs font-mono font-bold cursor-pointer"
          >
            <span>SCROLL TO ANALYSIS</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        </motion.div>
      )}

      {/* ACTIVE SPECIMEN SPOTLIGHT / FEATURED LARGE PREVIEW PANEL */}
      <div id="detailed-spotlight" className="border-t border-slate-100 pt-8 scroll-mt-24">
        <div className="mb-6">
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Interactive Analysis</span>
          <h3 className="text-xl font-display font-black uppercase tracking-wider text-slate-900 mt-1">
            {activeTab === 'laboratory' ? 'Active Specimen Spotlight' : 'Active Curricular Spotlight'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-mono uppercase">
            Drag or scroll the carousel above to inspect other live elements.
          </p>
        </div>

        {currentItems[activeIndex] && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            {/* Decorative subtle backdrop gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/20 rounded-full blur-3xl pointer-events-none -z-10" />
            
            {/* Left Column: Big Image Display Frame */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center group shadow-inner">
                
                {/* Simulated scan headers */}
                <div className="absolute top-3 left-3 flex items-center space-x-2 font-mono text-[9px] text-slate-700 uppercase tracking-widest z-20 bg-white/95 px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  <span>SPECIMEN ID: 0{activeIndex + 1}</span>
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest z-20 bg-white/95 px-2 py-0.5 rounded border border-slate-200 shadow-sm hidden sm:block">
                  MAGNIFICATION: {(activeIndex + 1) * 12.5} KX • LIVE_LINK
                </div>

                {/* Dynamic Image with Framer Motion (Fade & Zoom transition) */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeTab}-${activeIndex}`}
                    src={currentItems[activeIndex].image}
                    alt={currentItems[activeIndex].text}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Action: Expand image in lightbox */}
                <div 
                  onClick={() => setLightboxIndex(activeIndex)}
                  className="absolute bottom-4 right-4 p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 transition shadow-lg cursor-pointer flex items-center space-x-2 text-xs font-mono font-bold select-none z-20"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">FULL RESOLUTION</span>
                </div>
              </div>
            </div>

            {/* Right Column: Specimen Metadata & Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded border border-blue-150 uppercase tracking-widest">
                    {currentItems[activeIndex].category}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    AZIMUTH ROTATION: {(activeIndex * 30)}°
                  </span>
                </div>

                <h4 className="text-2xl font-display font-black text-slate-900 uppercase tracking-widest">
                  {currentItems[activeIndex].text}
                </h4>

                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    {currentItems[activeIndex].description}
                  </p>
                </div>
              </div>

              {/* Specimen Technical Specs read-out */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3 font-mono text-xs text-slate-700 shadow-inner">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200">
                  {activeTab === 'laboratory' ? 'LABORATORY SPECIFICATION LOG' : 'CURRICULAR ACTIVITY DETAIL LOG'}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {currentItems[activeIndex].details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider">{detail.label}</span>
                      <span className="text-slate-800 font-bold text-right text-[11px]">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Top Bar inside modal */}
            <div className="flex justify-between items-center w-full max-w-5xl mx-auto font-mono text-xs text-slate-400">
              <span className="uppercase tracking-widest font-bold">
                SPECIMEN CAPTURE: 0{lightboxIndex + 1} / 0{currentItems.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Central Slide Container */}
            <div className="flex-grow flex items-center justify-center w-full max-w-5xl mx-auto relative">
              {/* Previous control button */}
              <button
                onClick={prevSlide}
                className="absolute left-2 p-3 bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 rounded-full transition z-10 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Large immersive display */}
              <div className="max-w-4xl w-full max-h-[70vh] rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900">
                <img
                  src={currentItems[lightboxIndex].image}
                  alt={currentItems[lightboxIndex].text}
                  className="w-full h-full max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next control button */}
              <button
                onClick={nextSlide}
                className="absolute right-2 p-3 bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 rounded-full transition z-10 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom details of lightbox */}
            <div className="w-full max-w-3xl mx-auto text-center space-y-2 pb-4">
              <div className="flex justify-center">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold bg-blue-950/50 px-3 py-1 rounded border border-blue-900/30">
                  {currentItems[lightboxIndex].category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-widest">
                {currentItems[lightboxIndex].text}
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                {currentItems[lightboxIndex].description}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
