import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  Atom, 
  Briefcase, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
// Reference static path to avoid build failure
const chinnamuthuImg = "/Dr. P. Chinnamuthu.jpg";

export default function NanotechGroupLeader() {
  const leaderInfo = {
    name: "Dr. P. Chinnamuthu",
    title: "Associate Professor",
    photoUrl: chinnamuthuImg, 
    email: "chinnamuthu@nitnagaland.ac.in",
    bio: "Dr. P. Chinnamuthu is an Associate Professor in the Department of Electronics and Communication Engineering at NIT Nagaland. His research focus encompasses fabrication of 1D metal and metal oxide semiconductor nanostructures, combinatorial synthesis of high-k materials, and nano-electronics & optoelectronic device fabrication.",
    education: [
      "2013 - Ph.D., National Institute of Technology, Agartala",
      "2010 - M.Tech., Pondicherry Engineering College"
    ],
    experience: [
      "2022 - Present: Associate Professor, Department of Electronics and Communication Engineering, National Institute of Technology, Nagaland",
      "2015 - 2022: Assistant Professor, Department of Electronics and Communication Engineering, National Institute of Technology, Nagaland"
    ],
    interests: [
      "1D Metal & Metal Oxide Nanostructures",
      "Combinatorial Synthesis of High-k Materials",
      "Nano-electronics Device Fabrication",
      "Optoelectronics & Sensor Architectures"
    ],
    Honours_and_Awards: [
      "2019 - Young Scientist SERB, DST, Govt. of India (International Travel Support Award)"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Our Group</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            Group Leader 
          </h2>
        </div>
        <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
          
        </span>
      </div>

      {/* CORE PROFILE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Avatar & Core Coordinates */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center text-center space-y-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 shadow-md shadow-slate-100/50"
        >
          {/* Subtle neon glow back overlay */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-all" />

          {/* Profile Photo Container with crisp outlines and tech framing */}
          <div className="relative p-1.5 rounded-3xl border border-slate-200/50 bg-slate-50/50 transition-all duration-500 group-hover:border-blue-500/30">
            {/* Tech crosshairs for scientific blueprint visual styling */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-600/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-600/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-600/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-600/60" />

            {/* Glowing ring outline */}
            <div className="relative w-44 h-44 rounded-2xl overflow-hidden bg-white flex items-center justify-center outline outline-offset-4 outline-2 outline-blue-600/40 group-hover:outline-blue-500 transition-all duration-500 shadow-md">
              <img 
                src={leaderInfo.photoUrl} 
                alt={leaderInfo.name} 
                className="w-full h-full object-cover object-top select-none"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parentNode = target.parentNode;
                  if (parentNode) {
                    const fallback = parentNode.querySelector('.fallback-avatar') as HTMLDivElement;
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback visual avatar */}
              <div className="fallback-avatar absolute inset-0 bg-slate-100 hidden items-center justify-center flex-col text-center z-10">
                <Atom className="h-12 w-12 text-blue-600 animate-spin-slow mb-1" />
                <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider">Faculty Leader</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-slate-900 text-base uppercase tracking-wider">{leaderInfo.name}</h3>
            <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">{leaderInfo.title}</p>
          </div>

          <div className="w-full border-t border-slate-100 pt-4 space-y-3 font-mono text-left text-xs">
            <div className="flex items-center space-x-2.5 text-slate-600">
              <Mail className="h-4 w-4 text-blue-600 shrink-0" />
              <a href={`mailto:${leaderInfo.email.trim()}`} className="hover:text-blue-600 transition truncate">
                {leaderInfo.email}
              </a>
            </div>
            <div className="flex items-start space-x-2.5 text-slate-600">
              <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span> NIT Nagaland</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Bio, Education, Research, Experience */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Biography */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3.5"
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>Academic Overview</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
              {leaderInfo.bio}
            </p>
          </motion.section>

          {/* Research Interests */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Active Research Priorities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {leaderInfo.interests.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-white border border-slate-200 hover:border-blue-500/20 rounded-xl flex items-center space-x-3 transition group shadow-sm"
                >
                  <Atom className="h-4 w-4 text-blue-600 shrink-0 group-hover:animate-spin-slow" />
                  <span className="text-[11px] font-sans text-slate-700 font-bold leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Honours and Awards */}
          {leaderInfo.Honours_and_Awards && leaderInfo.Honours_and_Awards.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-4"
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span>Honours & Awards</span>
              </h4>
              <div className="space-y-3">
                {leaderInfo.Honours_and_Awards.map((award, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/20 border border-blue-100 rounded-xl flex items-center space-x-3 shadow-sm"
                  >
                    <Award className="h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-[11px] font-sans text-slate-800 font-semibold leading-relaxed">{award}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education & Experience in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
            
            {/* Education Timeline */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center space-x-2">
                <GraduationCap className="h-4.5 w-4.5 text-blue-600" />
                <span>Credentials</span>
              </h4>
              <div className="space-y-4 border-l border-slate-200 pl-4 relative">
                {leaderInfo.education.map((item, idx) => (
                  <div key={idx} className="relative text-xs">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white" />
                    <p className="font-sans font-medium text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Professional Experience */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>Research Positions</span>
              </h4>
              <div className="space-y-4 border-l border-slate-200 pl-4 relative">
                {leaderInfo.experience.map((item, idx) => (
                  <div key={idx} className="relative text-xs">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-white" />
                    <p className="font-sans font-medium text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

        </div>

      </div>

    </div>
  );
}
