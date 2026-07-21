import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import { Alumnus } from './nanotechTypes';

// Reference static paths to avoid build failures on deleted files
const salamImg = "/Salam Jimkeli Singh.jpg";
const heigrujamImg = "/Heigrujam Manas Singh.jpg";
const poojaImg = "/Pheiroijam Pooja.jpg";
const stacyImg = "/Stacy A. Lynrah.png";
const monalisaImg = "/Monalisa Hazarika.png";
const kamalImg = "/Kamal Kant Kashyap.jpg";

export default function NanotechAlumni() {
  const alumni: Alumnus[] = [
    {
      id: 'a5',
      name: 'Dr. Salam Jimkeli Singh',
      gradYear: '2024',
      roleInLab: 'PhD Graduate',
      currentPosition: 'Assistant Professor',
      currentAffiliation: 'National Institute of Technology (NIT), Nagaland',
      photoUrl: salamImg
    },
    {
      id: 'a6',
      name: 'Dr. Heigrujam Manas Singh',
      gradYear: '2024',
      roleInLab: 'PhD Graduate',
      currentPosition: 'Postdoctoral Fellow',
      currentAffiliation: 'Indian Institute of Science (IISc), Bangalore',
      photoUrl: heigrujamImg
    },
    {
      id: 'a7',
      name: 'Dr. Pheiroijam Pooja',
      gradYear: '2023',
      roleInLab: 'PhD Graduate',
      currentPosition: 'Senior Scientist (Nanofabrication)',
      currentAffiliation: 'Semi-Conductor Laboratory (SCL), Mohali',
      photoUrl: poojaImg
    },
    {
      id: 'a8',
      name: 'Dr. Stacy A. Lynrah',
      gradYear: '2023',
      roleInLab: 'PhD Graduate',
      currentPosition: 'Assistant Professor',
      currentAffiliation: 'North-Eastern Hill University (NEHU), Shillong',
      photoUrl: stacyImg
    },
    {
      id: 'a9',
      name: 'Dr. Monalisa Hazarika',
      gradYear: '2022',
      roleInLab: 'PhD Graduate',
      currentPosition: 'Postdoctoral Scholar',
      currentAffiliation: 'Kyoto University, Japan',
      photoUrl: monalisaImg
    },
    {
      id: 'a10',
      name: 'Dr. Kamal Kant Kashyap',
      gradYear: '2022',
      roleInLab: 'PhD Graduate',
      currentPosition: 'R&D Device Engineer',
      currentAffiliation: 'Applied Materials, Bangalore',
      photoUrl: kamalImg
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">Our Group</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-widest text-slate-900 mt-1">
            Alumni
          </h2>
        </div>
        <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
          Placements
        </span>
      </div>

      {/* ALUMNI DENSE LIST */}
      <div className="space-y-4">
        {alumni.map((alum, idx) => (
          <motion.div
            key={alum.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="bg-white border border-slate-200 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
          >
            {/* Soft accent */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-transparent" />

            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 relative shadow-sm">
                {/* Fallback avatar behind the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white flex flex-col items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-slate-400" />
                </div>
                {alum.photoUrl && (
                  <img 
                    src={alum.photoUrl} 
                    alt={alum.name} 
                    className="absolute inset-0 w-full h-full object-cover z-10 bg-white" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-wider">
                    {alum.name}
                  </h3>
                  <span className="text-[9px] font-mono text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Class of {alum.gradYear}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                  <span>ROLE: {alum.roleInLab}</span>
                </p>
              </div>
            </div>

            {/* Placement coordinates */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3.5 sm:min-w-[340px] max-w-full">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 min-w-0">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Current Coordinates</span>
                <p className="text-[11px] text-slate-800 font-sans font-bold leading-tight uppercase truncate">
                  {alum.currentPosition}
                </p>
                <p className="text-[10px] text-slate-600 font-sans truncate">
                  {alum.currentAffiliation}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}
