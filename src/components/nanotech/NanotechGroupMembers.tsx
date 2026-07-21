import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Mail, 
  FlaskConical, 
  Atom, 
  Cpu, 
  User, 
  Sparkles, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Gauge, 
  Zap, 
  TrendingUp,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { NanoMember } from './nanotechTypes';
// Reference static paths to avoid build failures on deleted files
const shanchoImg = "/Shancho Tungoe.jpg";
const wangkhemImg = "/Wangkhem Roji Chanu.jpeg";
const thsaripongImg = "/Thsaripong Thonger.jpeg";
const lanusuboImg = "/Lanusubo walling.png";
const abdulsumerImg = "/MOHD ABDUL SUMER.jpg";
const anubhagatImg = "/Anu Bhagat.jpg";
const shaikrasoolImg = "/SHAIK RASOOL.jpg";
const saketjangidImg = "/Saket Jangid.jpg";
const ragulImg = "/RAGUL T.jpg";

export default function NanotechGroupMembers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const members: NanoMember[] = [
    {
      id: 'm0',
      name: 'Shancho Tungoe',
      role: 'PhD Research Scholar',
      photoUrl: shanchoImg,
      bio: 'Shancho is researching next-generation non-volatile memory cell architectures. His core research focuses on design and optimization of Spin-Transfer Torque (STT) and Spin-Orbit Torque (SOT) Magnetoresistive Random-Access Memory (MRAM) devices, utilizing advanced magnetic thin-film nanomaterials.',
      email: 'shancho.tungoe_phd24@nitnagaland.ac.in',
      project: 'MRAM / Spintronics & Thin-Film Memory'
    },

    {
      id: 'm5',
      name: 'Wangkhem Roji Chanu',
      role: 'PhD Research Scholar',
      photoUrl: wangkhemImg,
      bio: 'Wangkhem is studying the quantum physics of Giant Magnetoresistance (GMR) in metallic multilayers. Her research focuses on the optimization of spin-dependent scattering in ferromagnet/non-magnet superlattices, exploring spintronic applications and magnetic nanomaterials.',
      email: 'wangkhem.roji_phd24@nitnagaland.ac.in',
      project: 'Giant Magnetoresistance (GMR) & Spintronics'
    },
    {
      id: 'm6',
      name: 'Thsaripong A Sangtam',
      role: 'PhD Research Scholar',
      photoUrl: thsaripongImg,
      bio: 'Thsaripong is developing high-sensitivity semiconductor photodetectors using optimized metal-oxide and hybrid 2D-nanomaterial thin films. His research aims to maximize spectral responsiveness and transient photocarrier generation speeds for next-generation light-sensing applications.',
      email: 'thsaripong.sangtam_phd24@nitnagaland.ac.in',
      project: 'Optoelectronic Photodetectors & Nanomaterials'
    },
    {
      id: 'm7',
      name: 'Lanusubo Walling',
      role: 'PhD Research Scholar',
      photoUrl: lanusuboImg,
      bio: 'Lanusubo is specializing in the advanced chemical synthesis and shape-directed fabrication of 0D, 1D, and 2D nanostructures. His research targets surface tension tuning and interfacial surface engineering for superhydrophobic, self-cleaning protective coatings, supported by state-of-the-art AI/ML predictive informatics.',
      email: 'lanusubo.walling_phd24@nitnagaland.ac.in',
      project: 'Fabrication of Nanostructures & Materials AI/ML'
    },
    {
      id: 'm8',
      name: 'MOHD ABDUL SUMER',
      role: 'PhD Research Scholar',
      photoUrl: abdulsumerImg,
      bio: 'Abdul Sumer focuses on high-precision engineering and micro-nanofabrication of solid-state device structures. His research explores the chemical-sensing response kinetics of semiconductor nanowires and nanofilms configured as ultra-selective, real-time hazardous gas detection platforms.',
      email: 'mohd.abdul_phd24@nitnagaland.ac.in',
      project: 'Nanoscale Gas Sensors & Microdevices'
    },
    {
      id: 'm9',
      name: 'Anu Bhagat',
      role: 'PhD Research Scholar',
      photoUrl: anubhagatImg,
      bio: 'Anu is designing machine learning algorithms for structural materials design. Her research integrates neural networks and multi-objective optimization to predict electro-mechanical properties and optimize the lifetime performance of low-power micro-sensors.',
      email: 'anu.bhagat_phd24@nitnagaland.ac.in',
      project: 'ML-Driven Micro-Sensor Optimization'
    },
    {
      id: 'm10',
      name: 'SHAIK RASOOL',
      role: 'PhD Research Scholar',
      photoUrl: shaikrasoolImg,
      bio: 'Shaik Rasool focuses on physical vapor deposition and chemical nanofabrication of 1D/2D metal-oxide semiconductors. He investigates surface charge transfer mechanics, interfacial band bending, and carrier concentration tuning in highly-sensitive chemiresistive gas sensor chips.',
      email: 'shaik.rasool_phd24@nitnagaland.ac.in',
      project: '1D/2D Metal-Oxide Semiconductor Devices'
    },
    {
      id: 'm11',
      name: 'Saket Jangid',
      role: 'PhD Research Scholar',
      photoUrl: saketjangidImg,
      bio: 'Saket is researching solid-state gas sensors using nanostructured metal oxides. His work concentrates on catalyst doping (Pt, Pd, Au) to lower operational temperatures and improve selective detection thresholds for hazardous industrial VOCs.',
      email: 'saket.jangid_phd24@nitnagaland.ac.in',
      project: 'Doped Metal-Oxide Gas Sensor Arrays'
    },
    {
      id: 'm12',
      name: 'Ragul T',
      role: 'PhD Research Scholar',
      photoUrl: ragulImg,
      bio: 'Ragul is specialized in the fabrication of advanced solid-state devices and thin-film materials. His core research interests include Nanoelectronics, Nanomaterials, Physical Vapor Deposition (PVD) Thin Films, Nanofabrication, and next-generation Semiconductor Devices.',
      email: 'ragul.t_phd24@nitnagaland.ac.in',
      project: 'Nanoelectronics & Semiconductor Devices'
    }
  ];

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + members.length) % members.length);
  };

  const activeMember = members[activeIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold block">ECE Laboratory Members</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            Research Group Members
          </h2>
        </div>
        <div className="flex items-center space-x-3 font-mono">
          <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            {members.length} Core Scholars
          </span>
        </div>
      </div>

      {/* HORIZONTAL INTERACTIVE CARD STACK CONTAINER */}
      <div className="flex flex-col items-center space-y-4">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest animate-pulse">
          ← Click cards on the sides to browse scholars →
        </span>

        <div className="relative w-full max-w-4xl h-[380px] flex items-center justify-center overflow-visible mt-4">
          <AnimatePresence initial={false}>
            {members.map((member, idx) => {
              const diff = idx - activeIndex;
              const isCenter = diff === 0;

              // Tight overlapping horizontal stack variables!
              const xOffset = isMobile ? diff * 45 : diff * 85; 
              const zIndex = 30 - Math.abs(diff);
              const scale = isMobile 
                ? (isCenter ? 1.0 : 0.8) 
                : 1 - Math.abs(diff) * 0.12;
              
              const rotateY = isMobile ? 0 : diff * -18; // 3D angled look
              const opacity = 1 - Math.abs(diff) * 0.35;

              return (
                <motion.div
                  key={member.id}
                  style={{
                    zIndex,
                    perspective: 1000,
                  }}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    rotateY: rotateY,
                    opacity: Math.max(0.2, opacity),
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-64 sm:w-80 h-[320px] rounded-3xl bg-white border cursor-pointer select-none overflow-hidden transition-all duration-300 ${
                    isCenter 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/10 ring-4 ring-blue-500/5' 
                      : 'border-slate-200/90 hover:border-slate-300 shadow-md shadow-slate-100/50 hover:shadow-lg'
                  }`}
                >
                  {/* Subtle Grid overlay for that technical theme */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Top lab branding band */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500" />
                  
                  <div className="p-5 flex flex-col justify-between h-full pb-8">
                    
                    {/* Header info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Atom className={`h-3 w-3 ${isCenter ? 'text-blue-600 animate-spin-slow' : 'text-slate-400'}`} />
                        <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">NITN • ECE TEAM</span>
                      </div>
                      {isCenter && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[8px] font-mono font-bold tracking-wider uppercase animate-pulse">
                          Active Center
                        </span>
                      )}
                    </div>

                    {/* Member Profile block */}
                    <div className="flex flex-col items-center text-center my-auto space-y-3">
                      {/* Avatar with concentric micro rings */}
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-2xl border ${isCenter ? 'border-blue-500/30 animate-ping' : 'border-transparent'}`} />
                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-200/80 relative shadow-md">
                          {/* Fallback avatar behind the image */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white flex flex-col items-center justify-center">
                            <User className={`h-10 w-10 ${isCenter ? 'text-blue-500/30' : 'text-slate-300'}`} />
                            <span className="text-[7px] font-mono text-slate-400 mt-1 uppercase">ECE TEAM</span>
                          </div>

                          {member.photoUrl && (
                            <img 
                              src={member.photoUrl} 
                              alt={member.name}
                              className="absolute inset-0 w-full h-full object-cover object-top z-10 bg-white"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-display font-extrabold text-slate-900 tracking-wider uppercase">
                          {member.name}
                        </h3>
                        <p className="text-[9px] font-mono text-blue-600 uppercase tracking-widest font-semibold">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Footer mini project tag */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-center space-x-1.5 text-slate-500">
                        <FlaskConical className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="text-[8.5px] font-mono text-slate-600 font-bold uppercase tracking-wide truncate max-w-[200px]">
                          {member.project}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel buttons to augment touch/click behavior */}
        <div className="flex items-center space-x-4 pt-1">
          <button 
            onClick={handlePrev}
            className="p-2 border border-slate-200 rounded-full bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 transition shadow-sm"
            title="Previous Scholar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Indicator dots */}
          <div className="flex items-center space-x-1.5">
            {members.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-5 bg-blue-600' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-2 border border-slate-200 rounded-full bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 transition shadow-sm"
            title="Next Scholar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* DETAILED ACTIVE SCHOLAR BIOGRAPHY */}
      <motion.div
        key={activeMember.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto w-full mt-8"
      >
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md shadow-slate-100/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-500 h-full" />
          
          {/* Large Visible Member Image in the Dossier */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-500 animate-pulse opacity-15 -m-1" />
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center shadow-lg relative z-10 transition-transform duration-300 hover:scale-105">
                {/* Fallback avatar behind the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white flex flex-col items-center justify-center">
                  <User className="h-16 w-16 text-slate-300" />
                  <span className="text-[9px] font-mono text-slate-400 mt-2 uppercase tracking-wider font-bold">Scholar Photo</span>
                </div>

                {activeMember.photoUrl && (
                   <img 
                     src={activeMember.photoUrl} 
                     alt={activeMember.name}
                     className="absolute inset-0 w-full h-full object-cover object-top z-10"
                     referrerPolicy="no-referrer"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                     }}
                   />
                )}
              </div>
            </div>
            
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-[9px] font-mono text-blue-600 uppercase tracking-widest font-bold block">Scholar Dossier</span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 uppercase tracking-wider leading-tight">
                {activeMember.name}
              </h3>
              <p className="text-[11px] font-mono text-emerald-600 uppercase tracking-wider font-bold">
                {activeMember.role}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-100 pb-1.5">Biography</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
              {activeMember.bio}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-100 pb-1.5">Contact Coordinates</h4>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-700">
              <Mail className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <a href={`mailto:${activeMember.email}`} className="hover:text-blue-600 transition truncate underline decoration-blue-200">
                {activeMember.email}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-700">
              <FlaskConical className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Active Project: {activeMember.project}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
