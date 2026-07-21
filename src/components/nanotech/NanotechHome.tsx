import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Mail, 
  Atom, 
  Quote, 
  ArrowRight,
  Shield, 
  Cpu, 
  Activity,
  User
} from 'lucide-react';
import { NanoView } from './NanotechLayout';
import EceBackgroundTraces from './EceBackgroundTraces';
import Stack from './Stack';
// Reference static paths to avoid build failures on deleted files
const chinnamuthuImg = "/Dr. P. Chinnamuthu.jpg";
const labImg2 = "/lab img 2.jpeg";
const labImg7 = "/lab img 7.jpeg";
const labImg9 = "/lab img 9.jpeg";
const labImg10 = "/lab img 10.jpeg";
const labImg12 = "/lab img 12.jpeg";
const labImg16 = "/lab img 16.jpeg";

const LAB_IMAGES = [
  labImg2,
  labImg7,
  labImg9,
  labImg10,
  labImg12,
  labImg16
];

interface NanotechHomeProps {
  onNavigate: (view: NanoView) => void;
}

export default function NanotechHome({ onNavigate }: NanotechHomeProps) {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Absolute PCB blueprint / ECE waveform background canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <EceBackgroundTraces />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* 1. HERO SEGMENT */}
      <div className="relative text-center py-12 md:py-20 flex flex-col items-center">
        {/* Soft background grid glowing elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-xs text-blue-600 font-mono tracking-wider uppercase mb-6 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>Atoms to Architectures • Advanced Device Physics</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 max-w-4xl"
        >
          NIT Nagaland - Department of ECE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 font-mono tracking-widest max-w-2xl text-center uppercase"
        >
          Engineering the Quantum Frontier with Molecular Precision
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mt-8"
        />
      </div>

      {/* 2. DESCRIPTION SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-widest text-slate-900 border-l-4 border-blue-600 pl-4">
            Our Department & Laboratory
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-normal">
            Well-equipped laboratories provide hands-on experience in core areas such as Basic Electronics, Digital Electronics, Analog Electronics, Communication Systems, VLSI, Embedded Systems, and Microprocessors & Microcontrollers. Equipped with modern instruments, the labs support practical learning, innovation, project development, and research while enhancing students' technical and problem-solving skills.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('research')}
              className="inline-flex items-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition shadow-lg shadow-blue-500/15 cursor-pointer"
            >
              <span>Explore Research Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center space-x-2 px-5 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition cursor-pointer shadow-sm"
            >
              <span>View Lab Equipment</span>
            </button>
          </div>
        </motion.div>

        {/* Interactive ECE Lab Image Stack Deck */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div className="w-full max-w-[280px] sm:max-w-[320px] relative" style={{ height: 320 }}>
            <Stack
              randomRotation={true}
              sensitivity={160}
              sendToBackOnClick={true}
              images={LAB_IMAGES}
              autoplay={true}
              autoplayDelay={3500}
              pauseOnHover={true}
            />
          </div>
        </motion.div>
      </div>

      {/* 3. GREETINGS FROM THE LABORATORY */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-md shadow-slate-100/50"
      >
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Quote bubble column */}
          <div className="md:col-span-8 space-y-4">
            <Quote className="h-8 w-8 text-blue-600 opacity-80" />
            <h3 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-widest text-slate-900">
              Greetings from the Laboratory
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-sans font-medium">
              &quot;Welcome to the Department of Electronics and Communication Engineering at NIT Nagaland. Our work is centered on understanding electronic interfaces at the absolute scale limit. Every breakthrough in tomorrow's semiconductor nodes or ultra-selective chemical detectors begins with the precise configuration of atoms in our synthesizers. Our students and researchers collaborate inside an ecosystem designed to challenge conventional scientific limits, driving impactful patents and sessional innovations.&quot;
            </p>
            <div className="pt-2">
              <p className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Dr. P. Chinnamuthu</p>
              <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mt-0.5">Associate Professor</p>
            </div>
          </div>

          {/* Dr. Chinnamuthu Photo Column */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 w-full max-w-[240px] aspect-square shadow-md hover:border-blue-500/40 transition-colors duration-300 bg-white flex items-center justify-center">
              {chinnamuthuImg ? (
                <img 
                  src={chinnamuthuImg} 
                  alt="Dr.P.Chinnamuthu" 
                  className="w-full h-full object-cover object-top bg-white"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-slate-100 flex flex-col items-center justify-center text-center p-4';
                      fallback.innerHTML = `
                        <svg class="h-12 w-12 text-blue-600 animate-pulse mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block"><circle cx="12" cy="12" r="10"/><path d="M12 8l-4 8h8z"/></svg>
                        <p class="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold">Dr. P. Chinnamuthu</p>
                        <p class="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Associate Professor</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                  <User className="h-12 w-12 text-slate-400 mb-2" />
                  <p className="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold">Dr. P. Chinnamuthu</p>
                  <p className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Associate Professor</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>

      {/* 4. CONTACT INFORMATION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-slate-200 p-8 rounded-3xl relative overflow-hidden shadow-md shadow-slate-100/50"
      >
        <div className="absolute top-0 right-0 w-44 h-44 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <h3 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-widest text-slate-900 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Contact Coordinates</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have inquiries about collaborative research opportunities, doctoral fellowships, or instrument testing slots? Get in touch with our team directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:min-w-[400px]">
            {/* Address Info */}
            <div className="flex items-start space-x-3 font-mono">
              <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Laboratory Location</span>
                <p className="text-[11px] text-slate-800 font-sans leading-normal">
                   NIT Nagaland, Chumukedima, 797103
                </p>
              </div>
            </div>

            {/* Email Info */}
            <div className="flex items-start space-x-3 font-mono">
              <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Team Leader Email</span>
                <a href="mailto:chinnamuthu@nitnagaland.ac.in" className="text-[11px] text-blue-600 font-sans hover:underline block leading-normal pt-0.5 break-all">
                  chinnamuthu@nitnagaland.ac.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

    </div>
    </div>
  );
}
