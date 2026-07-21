import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Handshake, 
  MapPin, 
  Globe, 
  Layers, 
  Cpu, 
  FlaskConical,
  Building,
  GraduationCap
} from 'lucide-react';
import { Collaborator } from './nanotechTypes';

export default function NanotechCollaborators() {
  const [selectedType, setSelectedType] = useState<'All' | 'Indian' | 'Foreign'>('All');

  const collaborators: Collaborator[] = useMemo(() => [
    {
      id: 'c1',
      name: 'Indian Institute of Science (IISc)',
      logoText: 'IISc',
      location: 'Bangalore, India',
      jointProject: 'Atomic Layer Deposition (ALD) synthesis parameters on monolayer MoS2 crystal matrices.',
      type: 'Indian'
    },
    {
      id: 'c2',
      name: 'Tokyo Institute of Technology (TokyoTech)',
      logoText: 'Tokyo Tech',
      location: 'Meguro, Tokyo, Japan',
      jointProject: 'Joint design of wide-bandgap gallium nitride high-electron-mobility transistors for extreme aerospace temperatures.',
      type: 'Foreign'
    },
    {
      id: 'c3',
      name: 'Indian Institute of Technology (IIT) Bombay',
      logoText: 'IITB',
      location: 'Mumbai, India',
      jointProject: 'Characterizing surface acoustic wave (SAW) micro-cavities for localized ultra-sensitive volatile organic vapor sensing.',
      type: 'Indian'
    },
    {
      id: 'c4',
      name: 'National University of Singapore (NUS)',
      logoText: 'NUS',
      location: 'Kent Ridge, Singapore',
      jointProject: 'Exploring phase conversion in 2D transition metal dichalcogenides for fast non-volatile memory cell layers.',
      type: 'Foreign'
    },
    {
      id: 'c5',
      name: 'Chiba University',
      logoText: 'Chiba',
      location: 'Chiba, Japan',
      jointProject: 'Collaborative optimization of high-responsivity solar-blind photodetectors based on beta-gallium oxide films.',
      type: 'Foreign'
    },
    {
      id: 'c6',
      name: 'Indian Institute of Technology (IIT) Guwahati',
      logoText: 'IITG',
      location: 'Guwahati, Assam, India',
      jointProject: 'Development of low-dimensional hybrid semiconductor heterostructures for advanced optoelectronic sensing arrays.',
      type: 'Indian'
    }
  ], []);

  const filteredCollaborators = useMemo(() => {
    if (selectedType === 'All') return collaborators;
    return collaborators.filter(c => c.type === selectedType);
  }, [collaborators, selectedType]);

  const indianCount = collaborators.filter(c => c.type === 'Indian').length;
  const foreignCount = collaborators.filter(c => c.type === 'Foreign').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Our Group</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            Collaborators
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase">
            Active joint ventures with distinguished Indian and Foreign research colleges based on collaborative publications.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-inner shrink-0">
          <button
            onClick={() => setSelectedType('All')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedType === 'All'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({collaborators.length})
          </button>
          <button
            onClick={() => setSelectedType('Indian')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedType === 'Indian'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Indian Colleges ({indianCount})
          </button>
          <button
            onClick={() => setSelectedType('Foreign')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedType === 'Foreign'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foreign Institutions ({foreignCount})
          </button>
        </div>
      </div>

      {/* COLLABORATORS GRID */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredCollaborators.map((partner, idx) => (
            <motion.div
              layout
              key={partner.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 hover:border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100/55 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Institution Emblem representation */}
                <div className="flex items-center justify-between">
                  <div className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-xs font-black tracking-wider text-blue-600 uppercase group-hover:bg-blue-50 group-hover:text-blue-700 transition duration-300">
                    {partner.logoText}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                    <MapPin className="h-3 w-3 text-blue-600" />
                    <span>{partner.location}</span>
                  </div>
                </div>

                {/* Institution Title & Category badge */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      partner.type === 'Indian'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {partner.type} Institution
                    </span>
                  </div>
                  <h3 className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-wider pt-1">
                    {partner.name}
                  </h3>
                </div>

                {/* Joint Project Description */}
                <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-relaxed font-normal">
                  {partner.jointProject}
                </p>

              </div>

              {/* Bottom Status panel */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-500 flex items-center space-x-1">
                  <FlaskConical className="h-3 w-3 text-blue-600" />
                  <span>MEMORANDUM ACTIVE</span>
                </span>
                <span className="text-blue-600 uppercase font-bold tracking-wider">
                  {partner.type === 'Indian' ? 'DST INDIA COLLAB' : 'INTERNATIONAL COLLAB'}
                </span>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
