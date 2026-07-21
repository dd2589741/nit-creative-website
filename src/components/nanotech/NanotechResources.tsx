import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  RefreshCw,
  Search,
  Activity,
  Layers,
  Wrench,
  BookOpen,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SimpleResource {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  fallbackUrl: string;
  category: 'Synthesis' | 'Metrology' | 'Utility';
  applications: string[];
  specs: { label: string; value: string }[];
  operatingSteps: string[];
}

const resourcesData: SimpleResource[] = [
  {
    id: 'EQ-01',
    name: 'Muffle Furnace',
    description: 'Supports high-temperature thermal calcination, chemical vapor crystallization, and material sintering processes under controlled atmospheric metrics.',
    imageUrl: '/Muffle Furnace.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
    category: 'Synthesis',
    applications: [
      'Thermal oxidation of silicon substrates',
      'Sintering of ceramic nanoparticles & catalyst powders',
      'High-temperature calcination and solid-state reaction synthesis'
    ],
    specs: [
      { label: 'Max Temperature', value: '1200°C' },
      { label: 'Heating Rate', value: 'Up to 20°C/min' },
      { label: 'Controlled Atmosphere', value: 'Air, Nitrogen, Argon purging' },
      { label: 'Chamber Volume', value: '7.2 Liters' }
    ],
    operatingSteps: [
      'Load sample into a high-purity alumina or quartz crucible.',
      'Program the temperature ramp profile on the PID micro-controller.',
      'Ensure the vent is clear if organic binders are being burned out.',
      'Cool down below 100°C before retrieving the heat-treated specimen.'
    ]
  },
  {
    id: 'EQ-02',
    name: 'Ultrasonic Cleaner',
    description: 'Applies localized cavitation pulses to completely cleanse silicon substrates, quartz channels, and micro-needles of organic debris.',
    imageUrl: '/Ultrasonic Cleaner.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    category: 'Utility',
    applications: [
      'Silicon & quartz wafer degreasing cycles',
      'Ultrasonic dispersion of carbon nanotubes and nanopowders',
      'Deep purification of microfluidic channels and capillaries'
    ],
    specs: [
      { label: 'Ultrasonic Frequency', value: '40 kHz / 80 kHz Dual-Freq' },
      { label: 'Heating Power', value: '300W (Adjustable up to 80°C)' },
      { label: 'Transducer Type', value: 'Cavitation-resistant Industrial BLT' },
      { label: 'Tank Material', value: 'SUS304 Grade Stainless Steel' }
    ],
    operatingSteps: [
      'Fill tank with deionized water up to the indicated fill-line.',
      'Add micro-cleaning surfactant or organic solvent for specific residues.',
      'Initiate the degas cycle to evacuate microbubbles from the bath.',
      'Immerse samples in the wire mesh basket and run sweep-frequency cycles.'
    ]
  },
  {
    id: 'EQ-03',
    name: 'Contact Angle Meter',
    description: 'Examines dynamic contact angle thresholds and surface energy coefficients of localized nanostructures to inspect hydrophobic behavior.',
    imageUrl: '/contact angle meter.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1517055720413-77a0bf443f61?auto=format&fit=crop&w=600&q=80',
    category: 'Metrology',
    applications: [
      'Hydrophobic/hydrophilic coating characterization',
      'Self-Assembled Monolayer (SAM) quality testing',
      'Surface energy evaluation of lithographic templates'
    ],
    specs: [
      { label: 'Measurement Range', value: '0° to 180° (±0.1° resolution)' },
      { label: 'Dispenser Unit', value: 'Software-controlled automated syringe' },
      { label: 'Optical Zoom', value: '6.5x Zoom with LED Backlight' },
      { label: 'Fitting Methods', value: 'Sessile drop, Pendant drop, Circle/Polynomial' }
    ],
    operatingSteps: [
      'Mount sample on the multi-axis goniometer stage.',
      'Deliver an ultra-precise 2-microliter droplet of analytical water.',
      'Capture high-speed CMOS images of the drop profile interface.',
      'Apply Young-Laplace fitting to output contact angles.'
    ]
  },
  {
    id: 'EQ-04',
    name: 'Electron Beam Evaporator (EBE)',
    description: 'Deposits high-purity thin films of noble metals (Au, Ag, Pt) and dielectrics with nanometer precision on semiconductor device wafers.',
    imageUrl: '/Electron Beam Evaporation System.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    category: 'Synthesis',
    applications: [
      'Ohmic & Schottky metal contact vapor deposition',
      'Optical interference filter multi-stack synthesis',
      'Ultrathin superconducting barrier layers'
    ],
    specs: [
      { label: 'Electron Gun Power', value: '6 kW with High-Voltage Sweep' },
      { label: 'Crucible Carousel', value: '4-pocket Rotary Pocket Hearth' },
      { label: 'Thickness Feedback', value: 'Quartz Crystal Microbalance (QCM)' },
      { label: 'Substrate Temp', value: 'Integrated Radiant Heating (up to 400°C)' }
    ],
    operatingSteps: [
      'Load high-purity source material into the copper hearth pocket.',
      'Secure substrates onto the rotating planetary holder dome.',
      'Evacuate the deposition chamber below high-vacuum thresholds.',
      'Energize emission beam, adjust sweep pattern, and cycle shutters.'
    ]
  },
  {
    id: 'EQ-05',
    name: 'EBE Vacuum Coating System',
    description: 'Advanced vacuum coating chamber that allows multiple source crucibles to evaporate under intense high-vacuum, producing precise nanometer layers.',
    imageUrl: '/Electron Beam Evaporation (EBE) Vacuum Coating System(full view).jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    category: 'Synthesis',
    applications: [
      'Co-deposition of multi-component alloys',
      'High-throughput thin film physical vapor deposition',
      'Micro-electro-mechanical systems (MEMS) sacrificial coats'
    ],
    specs: [
      { label: 'Base Pressure', value: '5 × 10^-7 Torr within 30 mins' },
      { label: 'Pumping Stack', value: 'High-speed Cryo-pump + Dry roughing pump' },
      { label: 'Coating Chamber', value: 'SUS304 spherical chamber (D: 500mm)' },
      { label: 'Rate Controller', value: 'Inficon QCM Dual-channel controller' }
    ],
    operatingSteps: [
      'Perform high-vacuum bake-out to evacuate gaseous molecules.',
      'Enter specific target density and Z-match into the thickness monitor.',
      'Confirm continuous chiller circulation before high-power emission.',
      'Initiate automated deposition sequence for multilayer oxide structures.'
    ]
  },
  {
    id: 'EQ-06',
    name: 'Electronic Analytical Balance',
    description: 'Provides ultra-precise weight measurements of chemical samples, nanomaterial powders, and substrates down to the sub-milligram range.',
    imageUrl: '/Electronic Analytical Balance.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    category: 'Utility',
    applications: [
      'Catalytic material precursor stoichiometric weighing',
      'Standard reference buffer solution preparation',
      'Substrate mass differentiation following physical etching'
    ],
    specs: [
      { label: 'Readability', value: '0.01 mg (5-decimal places)' },
      { label: 'Max Capacity', value: '220 g' },
      { label: 'Calibration', value: 'isoCAL Automatic Internal Calibration' },
      { label: 'Stabilization Time', value: '< 3.0 seconds' }
    ],
    operatingSteps: [
      'Confirm balance alignment via the integrated leveling bubble.',
      'Close draft shields and press tare to establish zero baseline.',
      'Using a micro-spatula, slowly dispense powders onto a weigh boat.',
      'Allow reading to settle, wait for stability star, and record.'
    ]
  },
  {
    id: 'EQ-07',
    name: 'Hitachi UH4150 UV-vis-NIR Spectrophotometer',
    description: 'High-performance double-monochromator spectrophotometer designed to measure absolute reflectance and transmittance of solid-state nanostructures and optical thin films.',
    imageUrl: '/Hitachi UH4150 UV-vis-NIR spectrophotometer.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80',
    category: 'Metrology',
    applications: [
      'Semiconductor bandgap energy estimation',
      'Plasmonic absorption spectra of gold/silver nanoparticles',
      'Refractive index of optical interference coatings'
    ],
    specs: [
      { label: 'Wavelength Range', value: '240 nm to 2600 nm' },
      { label: 'Optical Layout', value: 'Double Monochromator / Double Beam' },
      { label: 'Light Sources', value: 'Deuterium & Halogen lamps with auto-switch' },
      { label: 'Detector Array', value: 'Photomultiplier tube + Cooled PbS cell' }
    ],
    operatingSteps: [
      'Power on instrument and warm up optical lamps for 20 minutes.',
      'Run baseline calibration with reference standard substrate.',
      'Set scanning parameters: step size, slit width, and scan speed.',
      'Acquire absorption profile, process curves, and export data.'
    ]
  },
  {
    id: 'EQ-08',
    name: 'Spectrophotometer Chamber',
    description: 'Inner sample chamber view of the Hitachi UH4150, showcasing high-precision mounts, integrated integrating sphere, and optoelectronic alignment tools.',
    imageUrl: '/Hitachi UH4150 UV-vis-NIR spectrophotometer(inside view).jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80',
    category: 'Metrology',
    applications: [
      'Diffuse reflectance of powdery nanostructures',
      'Variable-angle reflectance measurements of solar coatings',
      'Solid-state transmission in localized sample spots'
    ],
    specs: [
      { label: 'Integrating Sphere', value: '60mm diameter internal BaSO4 lining' },
      { label: 'Sample Stage', value: 'Spring-loaded solid sample clip with tilt controls' },
      { label: 'Beam Aperture', value: 'Adjustable rectangular mask selectors' },
      { label: 'Optical Path', value: 'Dual-path reflecting configuration' }
    ],
    operatingSteps: [
      'Slide open the light-shielded sample compartment lid.',
      'Position solid substrate flush against the collection port.',
      'Clamp the specimen safely using the spring-tensioned clip.',
      'Seal the compartment lid completely before starting the photon scan.'
    ]
  },
  {
    id: 'EQ-09',
    name: 'Laboratory Fume Hood',
    description: 'Ventilated enclosure designed to limit exposure to hazardous or toxic fumes, vapors, or dusts during chemical synthesis and nanomaterial processing.',
    imageUrl: '/laboratory fume hood with several instruments used for nano technology,chemistry and material research.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900dfae?auto=format&fit=crop&w=600&q=80',
    category: 'Utility',
    applications: [
      'Acid etching of silicon wafers (BOE, HF recipes)',
      'Organometallic solution-gel nanoparticle synthesis',
      'Toxic solvent wash cycles & spin-coating preparations'
    ],
    specs: [
      { label: 'Exhaust Flow Velocity', value: '100 fpm at certified sash height' },
      { label: 'Baffle Design', value: 'Triple-baffle exhaust balancing' },
      { label: 'Interior Shell', value: 'Acid/alkali-resistant laminate' },
      { label: 'Utilities', value: 'Built-in DI water, gaseous N2, and vacuum lines' }
    ],
    operatingSteps: [
      'Check facial velocity readout to confirm exhaust performance.',
      'Adjust safety sash glass window at or below the indicator line.',
      'Carry out solvent manipulations at least 6 inches inside the hood.',
      'Keep sash lowered to minimal clearance when reactions are unattended.'
    ]
  },
  {
    id: 'EQ-10',
    name: 'Laboratory Hot Plate Magnetic Stirrer',
    description: 'Delivers uniform thermal heating and magnetic agitation for chemical solutions, sol-gel mixtures, and nanoparticle dispersions.',
    imageUrl: '/Laboratory Hot Plate Magnetic Stirrer.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    category: 'Synthesis',
    applications: [
      'Synthesis of colloidal quantum dots & metal nanoparticles',
      'Sol-gel polymerization and matrix fluid blending',
      'Continuous dissolution of polymer binders in volatile solvents'
    ],
    specs: [
      { label: 'Temperature Range', value: 'Ambient to 340°C' },
      { label: 'Speed Range', value: '100 to 1500 RPM' },
      { label: 'Plate Material', value: 'High thermal conductivity Ceramic-Coated Aluminum' },
      { label: 'Temperature Control', value: 'PID feedback control with external probe' }
    ],
    operatingSteps: [
      'Immerse a compatible Teflon-coated magnetic stirrer bar in the flask.',
      'Position the vessel directly over the center of the plate outline.',
      'Deploy the external temperature sensor probe in the solution.',
      'Gradually increase the RPM dial to prevent stirrer decoupling.'
    ]
  },
  {
    id: 'EQ-11',
    name: 'Laminar Air Flow Workstation',
    description: 'Creates a dust-free, sterile working environment by drawing air through a filtration system and exhausting it across the work surface in a unidirectional stream.',
    imageUrl: '/Laminar Air Flow Workstation.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    category: 'Utility',
    applications: [
      'Microfluidic chip assembly and optical alignment bonding',
      'Dust-free micro-electronic device packaging',
      'Sterile preparation of cell culture platforms'
    ],
    specs: [
      { label: 'Filter Class', value: 'HEPA Filter (99.99% retention at 0.3 µm)' },
      { label: 'Air Speed', value: '0.45 m/s laminar velocity' },
      { label: 'Material', value: 'Highly-polished SUS304 seamless work table' },
      { label: 'Safety Systems', value: 'UV-C germicidal light with safety sensor' }
    ],
    operatingSteps: [
      'Power on blower motor 15 minutes prior to entering the clean area.',
      'Sanitize the internal working layout with 70% ethanol spray.',
      'Arrange tools in a line to avoid interrupting the laminar stream.',
      'Ensure UV light is completely off before introducing gloved hands.'
    ]
  }
];

interface DraggableCardProps {
  item: SimpleResource;
  index: number;
  onSwipe: () => void;
  key?: React.Key;
}

function DraggableCard({ item, index, onSwipe }: DraggableCardProps) {
  const isTop = index === 0;
  const [currentSrc, setCurrentSrc] = useState(item.imageUrl);
  const [imageError, setImageError] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    setCurrentSrc(item.imageUrl);
    setImageError(false);
  }, [item]);

  const handleImageError = () => {
    if (currentSrc === item.imageUrl && item.fallbackUrl) {
      setCurrentSrc(item.fallbackUrl);
    } else {
      setImageError(true);
    }
  };
  
  // Custom drag transforms for rotation and fade effects
  const rotate = useTransform(x, [-180, 180], [-15, 15]);
  const opacity = useTransform(x, [-180, -120, 0, 120, 180], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_event: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : index * 2.5,
        opacity: isTop ? opacity : 1 - index * 0.18,
        zIndex: 50 - index,
        transformOrigin: "bottom center"
      }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 12,
        x: isTop ? undefined : index * 4,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
      className={`absolute inset-0 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl flex flex-col justify-end select-none ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* Background Image / Tech Fallback */}
      {!imageError ? (
        <img 
          src={currentSrc} 
          alt={item.name}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-8 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 animate-pulse">
            <span className="text-sm font-mono text-indigo-400 font-bold">{item.id}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 tracking-wider text-center uppercase">
            Image Loading / Custom asset
          </span>
        </div>
      )}
      
      {/* High-Contrast Gradient Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-10" />

      {/* Info Overlay (Directly on top card) */}
      <div className="relative z-20 p-6 text-white space-y-1.5 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
            {item.id}
          </span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-500/30 border border-blue-400/20 text-blue-300 uppercase tracking-wider">
            {item.category}
          </span>
        </div>
        <h3 className="text-lg font-display font-black tracking-wide uppercase line-clamp-2">
          {item.name}
        </h3>
        <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function NanotechResources() {
  const [items, setItems] = useState<SimpleResource[]>(resourcesData);
  const [autoCycle, setAutoCycle] = useState(false);

  // Search & filter state for the deep spec explorer
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('EQ-01'); // default open the first

  // Send the current top card to the back of the deck
  const handleNext = () => {
    setItems(prev => {
      const next = [...prev];
      const top = next.shift();
      if (top) next.push(top);
      return next;
    });
  };

  // Bring the bottom card to the front of the deck
  const handlePrev = () => {
    setItems(prev => {
      const next = [...prev];
      const bottom = next.pop();
      if (bottom) next.unshift(bottom);
      return next;
    });
  };

  // Randomize the order of items in the deck
  const shuffleDeck = () => {
    setItems(prev => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  // Automated slideshow toggle
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  // Filtering for deep understanding catalog list
  const filteredCatalog = resourcesData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Synthesis', 'Metrology', 'Utility'];

  const activeCategory = items[0]?.category || 'Synthesis';

  const getAmbientColors = (cat: 'Synthesis' | 'Metrology' | 'Utility') => {
    switch (cat) {
      case 'Synthesis':
        return {
          glowPrimary: 'bg-amber-400/10',
          glowSecondary: 'bg-orange-300/8',
          borderColor: 'border-amber-200/45',
          textColor: 'text-amber-500/30',
          accentBg: 'bg-amber-500/10',
        };
      case 'Metrology':
        return {
          glowPrimary: 'bg-blue-400/10',
          glowSecondary: 'bg-sky-300/8',
          borderColor: 'border-blue-200/45',
          textColor: 'text-blue-500/30',
          accentBg: 'bg-blue-500/10',
        };
      case 'Utility':
        return {
          glowPrimary: 'bg-emerald-400/10',
          glowSecondary: 'bg-teal-300/8',
          borderColor: 'border-emerald-200/45',
          textColor: 'text-emerald-500/30',
          accentBg: 'bg-emerald-500/10',
        };
      default:
        return {
          glowPrimary: 'bg-indigo-400/10',
          glowSecondary: 'bg-purple-300/8',
          borderColor: 'border-indigo-200/45',
          textColor: 'text-indigo-500/30',
          accentBg: 'bg-indigo-500/10',
        };
    }
  };

  const themeColors = getAmbientColors(activeCategory);

  return (
    <div className="relative w-full min-h-screen bg-slate-50/20 overflow-hidden py-12 transition-colors duration-500">
      
      {/* 1. Scientific Graph/Dot Matrix Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Coordinate Grid Lines & Framing borders */}
      <div className="absolute inset-x-0 top-12 z-0 border-t border-slate-200/40 pointer-events-none flex justify-between px-6 text-[8px] font-mono text-slate-400 select-none">
        <span>[ GRID REF: LN-402 ]</span>
        <span>[ SCALE: 1:1.2 ]</span>
      </div>
      <div className="absolute inset-x-0 bottom-12 z-0 border-b border-slate-200/40 pointer-events-none flex justify-between px-6 text-[8px] font-mono text-slate-400 select-none">
        <span>[ NANOMETER RESOLUTION ]</span>
        <span>[ HARDWARE COMPONENT STACK ]</span>
      </div>

      {/* Crosshair indicators on margins */}
      <div className="absolute top-6 left-6 z-0 font-mono text-slate-300/80 text-[11px] select-none pointer-events-none">+</div>
      <div className="absolute top-6 right-6 z-0 font-mono text-slate-300/80 text-[11px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-6 left-6 z-0 font-mono text-slate-300/80 text-[11px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-6 right-6 z-0 font-mono text-slate-300/80 text-[11px] select-none pointer-events-none">+</div>

      {/* 3. Adaptive Ambient Glow Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-in-out">
        <div className={`w-full h-full rounded-full transition-colors duration-700 ${themeColors.glowPrimary}`} />
      </div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-in-out">
        <div className={`w-full h-full rounded-full transition-colors duration-700 ${themeColors.glowSecondary}`} />
      </div>

      {/* Tech line markings */}
      <div className="absolute left-1/2 top-[15%] -translate-x-1/2 h-[70%] w-px border-l border-dashed border-slate-200/25 pointer-events-none z-0" />

      {/* Core content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 flex flex-col items-center">
      
      {/* Header Block */}
      <div className="text-center space-y-2 max-w-lg">
        <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">
          Equipment Catalog
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900">
          Laboratory Resources
        </h2>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">
          Swipe or drag the cards below to preview our nanolithography & analytical hardware.
        </p>
      </div>

      {/* STACK VIEWER CONTAINER */}
      <div className="w-full max-w-[340px] space-y-6">
        <div className="h-[430px] w-full relative">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => {
              // Only render top 3 cards for optimized performance
              if (idx > 2) return null;
              return (
                <DraggableCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onSwipe={handleNext}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel Deck Navigation Controls */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-2xl border border-slate-150 shadow-sm">
            <button
              onClick={handlePrev}
              className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              title="Previous Card"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-500 px-4 uppercase tracking-widest">
              Navigate Stack
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              title="Next Card"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Secondary Deck Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={shuffleDeck}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-[10px] font-mono font-bold uppercase rounded-xl transition cursor-pointer shadow-xs"
            >
              <Shuffle className="h-3 w-3 text-blue-600" />
              <span>Shuffle</span>
            </button>
            
            <button
              onClick={() => setAutoCycle(!autoCycle)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 border text-[10px] font-mono font-bold uppercase rounded-xl transition cursor-pointer shadow-xs ${
                autoCycle 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <RefreshCw className={`h-3 w-3 ${autoCycle ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
              <span>{autoCycle ? "Autoplay ON" : "Autoplay OFF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED VIEW - EXCEL SHEETS / SCIENTIFIC OVERVIEW */}
      <div className="w-full border-t border-slate-100 pt-16 space-y-10">
        
        {/* Dynamic Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md mb-2">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Active Spec Sheet</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-slate-900">
              Deep Understanding & Specifications
            </h3>
            <p className="text-xs text-slate-500 font-sans max-w-xl">
              Inspect full resolution photo, key technical metrics, customized applications, and standard operating procedures (SOP) for the active hardware.
            </p>
          </div>

          {/* Quick-Jump Selector Pills */}
          <div className="flex flex-col space-y-2 items-start md:items-end">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Quick Selector
            </span>
            <div className="flex flex-wrap gap-1.5 max-w-md md:justify-end">
              {resourcesData.map((item) => {
                const isActive = (items[0]?.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setItems(prev => {
                        const index = prev.findIndex(p => p.id === item.id);
                        if (index === -1) return prev;
                        const next = [...prev];
                        const target = next.splice(index, 1)[0];
                        next.unshift(target);
                        return next;
                      });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Item Deep Spec Block */}
        {items[0] && (
          <AnimatePresence mode="wait">
            <motion.div
              key={items[0].id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-white rounded-2xl border border-slate-200 ring-1 ring-indigo-500/10 shadow-md overflow-hidden"
            >
              {/* Header Spec Sheet Banner */}
              <div className="p-6 md:p-8 bg-slate-50/70 border-b border-slate-200 flex flex-col md:flex-row gap-8 items-start md:items-center">
                {/* Visual Asset Block */}
                <div className="w-full md:w-64 h-48 sm:h-52 rounded-xl overflow-hidden border border-slate-200 relative shrink-0 bg-slate-900 shadow-sm">
                  <img
                    src={items[0].imageUrl}
                    alt={items[0].name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (items[0] && target.src !== items[0].fallbackUrl) {
                        target.src = items[0].fallbackUrl;
                      }
                    }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-xs text-[9px] font-mono font-bold text-white tracking-widest border border-slate-700">
                    {items[0].id}
                  </div>
                </div>

                {/* Brief Title and Info Block */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                      items[0].category === 'Synthesis' 
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : items[0].category === 'Metrology'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {items[0].category}
                    </span>
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold uppercase tracking-wider">
                      ACTIVE HARDWARE
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xl sm:text-2xl font-display font-black uppercase text-slate-950 tracking-wide">
                      {items[0].name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
                      {items[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Content Column Sheets */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans bg-white">
                
                {/* Column 1: Technical Specifications */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-2">
                    <Activity className="h-4 w-4 text-indigo-600" />
                    <h5 className="font-display font-black uppercase tracking-wider text-xs">Technical Metrics</h5>
                  </div>
                  <div className="space-y-2.5">
                    {items[0].specs.map((spec, sidx) => (
                      <div key={sidx} className="flex flex-col space-y-0.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
                        <span className="font-mono text-[11px] font-bold text-slate-800">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Nanotech Applications */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-2">
                    <Layers className="h-4 w-4 text-emerald-600" />
                    <h5 className="font-display font-black uppercase tracking-wider text-xs">Nanotech Applications</h5>
                  </div>
                  <ul className="space-y-2.5">
                    {items[0].applications.map((app, aidx) => (
                      <li key={aidx} className="flex items-start space-x-2.5 bg-slate-50/30 p-2.5 rounded-lg border border-slate-100/60">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 leading-relaxed text-[11px]">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Micro-Operating Guidelines (SOP) */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-2">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                    <h5 className="font-display font-black uppercase tracking-wider text-xs">Operation SOP</h5>
                  </div>
                  <div className="space-y-3 font-sans">
                    {items[0].operatingSteps.map((step, oidx) => (
                      <div key={oidx} className="flex space-x-3 items-start bg-slate-50/20 p-2 rounded-lg border border-slate-100/40">
                        <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                          {oidx + 1}
                        </div>
                        <p className="text-slate-600 leading-relaxed text-[11px]">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

    </div>
  </div>
  );
}

