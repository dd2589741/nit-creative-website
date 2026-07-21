import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ExternalLink, 
  Calendar, 
  User, 
  BookOpen, 
  Filter,
  Search,
  Sparkles,
  Award,
  Cpu,
  Layers,
  Flame,
  TrendingUp,
  Bookmark,
  Share2
} from 'lucide-react';
import { Publication } from './nanotechTypes';
import SplitText from './SplitText';
import LineSidebar from '../LineSidebar';

export default function NanotechPublications() {
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publications: Publication[] = useMemo(() => [
    {
      id: 'p1',
      title: 'Enhancing ultraviolet photodetection by incorporating CeO2 thin film between Gd2O3 layers',
      authors: 'Meitei P.N.; Mayanglambam F.; Meitei S.R.; Singh N.K.; Chinnamuthu P.; Singh Y.S.',
      journal: 'Applied Physics A Materials Science and Processing, Volume 132',
      year: 2026,
      doi: '10.1007/s00339-026-09751-4'
    },
    {
      id: 'p2',
      title: 'Glancing angle deposition of TiO2vertical nanopillars on poly(3,4-ethylenedioxythiophene): poly(styrenesulfonate) with enhanced optical and charge transfer characteristics',
      authors: 'Singh S.J.; Walling L.; Chinnamuthu P.; Kar A.K.',
      journal: 'Thin Solid Films, Volume 834',
      year: 2026,
      doi: '10.1016/j.tsf.2026.140856'
    },
    {
      id: 'p3',
      title: 'Highly Efficient Zinc-Based Metal-Organic Framework for Adsorptive Removal of Congo Red: Experimental Investigation and AI-Driven Validation',
      authors: 'Imchen S.; Walling L.; Chetia R.; Pamei M.; Borah L.; Chinnamuthu P.; Puzari A.',
      journal: 'Journal of Chemical Information and Modeling, Volume 66, Pages 3814-3829',
      year: 2026,
      doi: '10.1021/acs.jcim.5c02371'
    },
    {
      id: 'p4',
      title: 'Novel resilient solar photovoltaic power extraction strategy for rural AC micro grids with enhanced incremental conductance based MPPT',
      authors: 'Parthiban Shanmugam, M. Mohammadha Hussaini, Vanchinathan Kumarasamy, Jayakumar Thangavel, Suresh Mu...',
      journal: 'Scientific Reports, Volume 15, Pages 41846',
      year: 2025,
      doi: '10.1038/s41598-025-25915-3'
    },
    {
      id: 'p5',
      title: 'Thick or Ultra-Thin Films? Gate Oxide Scaling Trade-Offs in HfO2 MOSFETs',
      authors: 'Dandu Y.; Reddy A.J.; Lynrah S.A.; Chinnamuthu P.',
      journal: 'Conference Proceedings 2025 IEEE Silchar Subsection Conference IEEE Silcon 2025',
      year: 2025,
      doi: '10.1109/SILCON67893.2025.11327131'
    },
    {
      id: 'p6',
      title: 'Message from: The General Chair',
      authors: 'Chinnamuthu P.',
      journal: 'Conference Proceedings 2025 IEEE Silchar Subsection Conference IEEE Silcon 2025',
      year: 2025,
      doi: '10.1109/SILCON67893.2025.11326995'
    },
    {
      id: 'p7',
      title: 'Self-cleaning properties of sol-gel spin-coated In2O3 thin films with varying molarity',
      authors: 'Walling L.; Chinnamuthu P.; Borah J.P.; Elayaperumal A.; Singh S.J.',
      journal: 'Current Applied Physics, Volume 80, Pages 17-25',
      year: 2025,
      doi: '10.1016/j.cap.2025.08.011'
    },
    {
      id: 'p8',
      title: 'The role of annealing temperature on the structure and optical properties of nanostructured Au-NP aligned TiO2-NW',
      authors: 'Kashyap K.K.; Jire L.H.J.; Chinnamuthu P.',
      journal: 'Applied Physics A Materials Science and Processing, Volume 130',
      year: 2024,
      doi: '10.1007/s00339-024-07630-4'
    },
    {
      id: 'p9',
      title: 'Wearable flexible memristor based on titanium dioxide (TiO2)-Zinc oxide (ZnO) embedded in polyvinyl alcohol (PVA) matrix',
      authors: 'Manisha; Pathania S.; Chinnamuthu P.; Kumar D.; Kumar T.; Singh V.; Jha R.; Hmar J.J.L.',
      journal: 'Materials Science in Semiconductor Processing, Volume 170',
      year: 2024,
      doi: '10.1016/j.mssp.2023.107953'
    },
    {
      id: 'p10',
      title: 'Investigating the impact of structural defects in MWCNT/MnFe2O4 nanocomposite for efficient photodegradation of cationic dye',
      authors: 'Hazarika M.; Sellaiyan S.; Singh S.J.; Borah J.P.; Kumar N.; Chinnamuthu P.',
      journal: 'Physica B Condensed Matter, Volume 675',
      year: 2024,
      doi: '10.1016/j.physb.2023.415598'
    },
    {
      id: 'p11',
      title: 'Preparation of Metal Oxide Semiconductor Nanostructure and Their Structural Properties',
      authors: 'Chinnamuthu P.; Biswas I.; Mondal A.',
      journal: 'Book Chapter: Hybrid Nanostructures as Solid State Sensors for Iot, Pages 16-38',
      year: 2024,
      doi: '10.1201/9781003464211-2'
    },
    {
      id: 'p12',
      title: 'Surface functionalization of MnO2 NW embellished with metal nanoparticles for self-cleaning applications',
      authors: 'Lynrah S.A.; Chinnamuthu P.; Rajkumari R.; Lim Y.Y.; Walling L.; Vigneash L.',
      journal: 'Applied Nanoscience Switzerland, Volume 14, Pages 519-529',
      year: 2024,
      doi: '10.1007/s13204-024-03032-3'
    },
    {
      id: 'p13',
      title: 'Smart sensor systems for military and aerospace applications',
      authors: 'Raturi P.; Choudhuri B.; Chinnamuthu P.',
      journal: 'Book Chapter: Sensors for Next Generation Electronic Systems and Technologies, Pages 239-254',
      year: 2023,
      doi: '10.1201/9781003288633-9'
    },
    {
      id: 'p14',
      title: 'Magnetically recoverable Cu(1−x)CexO nanoparticles for photodegradation of tetracycline',
      authors: 'Singh S.J.; Chinnamuthu P.',
      journal: 'Colloids and Surfaces A Physicochemical and Engineering Aspects, Volume 656',
      year: 2023,
      doi: '10.1016/j.colsurfa.2022.130404'
    },
    {
      id: 'p15',
      title: 'Improved Capacitive Memory in Glancing Angle Electron-Beam Synthesized Isotropic Bilayer n-TiO2/In2O3Nanowires Array',
      authors: 'Pooja P.; Chinnamuthu P.',
      journal: 'IEEE Transactions on Nanotechnology, Volume 22, Pages 70-75',
      year: 2023,
      doi: '10.1109/TNANO.2023.3243112'
    },
    {
      id: 'p16',
      title: 'Synthesis and characterization of CuO/gC3N4 nanocomposite for efficient photocatalytic activities under natural sunlight',
      authors: 'Singh S.J.; Sellaiyan S.; Chinnamuthu P.',
      journal: 'Physica B Condensed Matter, Volume 650',
      year: 2023,
      doi: '10.1016/j.physb.2022.414543'
    },
    {
      id: 'p17',
      title: 'TiO2-CeO2 assisted heterostructures for photocatalytic mitigation of environmental pollutants: A comprehensive study on band gap engineering and mechanistic aspects',
      authors: 'Kumari V.; Sharma A.; Kumar N.; Sillanpää M.; Makgwane P.R.; Ahmaruzzaman M.; Hosseini-Bandegharaei A.; et al.',
      journal: 'Inorganic Chemistry Communications, Volume 151',
      year: 2023,
      doi: '10.1016/j.inoche.2023.110564'
    },
    {
      id: 'p18',
      title: 'Magnetically Stimulated Bio- and Electrochemical Systems: State-of-the-Art, Applications, and Future Directions',
      authors: 'Melo A.F.A.A.; Singh S.J.; Chinnamuthu P.; Crespilho F.N.; Rydzek G.',
      journal: 'Chemnanomat, Volume 9',
      year: 2023,
      doi: '10.1002/cnma.202300192'
    },
    {
      id: 'p19',
      title: 'Enhancing Self-Cleaning Capabilities: Synthesis of Au Nanoparticle-Decorated MnO2 Thin Film with Photohydrophobic Behavior',
      authors: 'Walling L.; Lynrah S.A.; Chinnamuthu P.; Borah J.P.; Kumar Y.M.; Bhavana P.T.S.S.; Chanu P.R.',
      journal: 'Conference Paper: IEEE Region 10 Annual International Conference Proceedings TENCON, Pages 1283-1288',
      year: 2023,
      doi: '10.1109/TENCON58879.2023.10322399'
    },
    {
      id: 'p20',
      title: 'A perspective study on Au-nanoparticle adorned TiO2-nanowire for non-volatile memory devices',
      authors: 'Kashyap K.K.; Jire L.H.J.; Chinnamuthu P.',
      journal: 'Materials Today Communications, Volume 33',
      year: 2022,
      doi: '10.1016/j.mtcomm.2022.104469'
    },
    {
      id: 'p21',
      title: 'Enhanced photocatalytic efficiency of MWCNT/NiFe2O4 nanocomposites',
      authors: 'Hazarika M.; Chinnamuthu P.; Borah J.P.',
      journal: 'Physica E Low Dimensional Systems and Nanostructures, Volume 139',
      year: 2022,
      doi: '10.1016/j.physe.2022.115177'
    },
    {
      id: 'p22',
      title: 'Temperature dependency on Ce-doped CuO nanoparticles: a comparative study via XRD line broadening analysis',
      authors: 'Singh S.J.; Lim Y.Y.; Hmar J.J.L.; Chinnamuthu P.',
      journal: 'Applied Physics A Materials Science and Processing, Volume 128',
      year: 2022,
      doi: '10.1007/s00339-022-05334-1'
    },
    {
      id: 'p23',
      title: 'Titanium Dioxide (TiO2) Sensitized Zinc Oxide (ZnO)/Conducting Polymer Nanocomposites for Improving Performance of Hybrid Flexible Solar Cells',
      authors: 'Pathania S.; Hmar J.J.L.; Verma B.; Majumder T.; Kumar V.; Chinnamuthu P.',
      journal: 'Journal of Electronic Materials, Volume 51, Pages 5986-6001',
      year: 2022,
      doi: '10.1007/s11664-022-09815-0'
    },
    {
      id: 'p24',
      title: 'Spectral response of the MnO2 thin-film photodetector based at room temperature',
      authors: 'Lynrah S.A.; Chinnamuthu P.',
      journal: 'Conference Paper: Materials Today Proceedings, Volume 68, Pages 256-261',
      year: 2022,
      doi: '10.1016/j.matpr.2022.09.262'
    },
    {
      id: 'p25',
      title: 'Investigation on the effect of metal contacts on the vertical MnO2 nanowire array-based Schottky barrier diodes',
      authors: 'Lynrah S.A.; Chinnamuthu P.',
      journal: 'Journal of Materials Science Materials in Electronics, Volume 33, Pages 23910-23917',
      year: 2022,
      doi: '10.1007/s10854-021-07373-5'
    },
    {
      id: 'p26',
      title: 'Synthesis of metallic surface plasmon-sensitized TiO2 nanowire for wettability application',
      authors: 'Kashyap K.K.; Hazarika M.; Dhayal S.S.; Chinnamuthu P.',
      journal: 'Journal of Materials Science Materials in Electronics, Volume 33, Pages 8674-8682',
      year: 2022,
      doi: '10.1007/s10854-021-06770-0'
    },
    {
      id: 'p27',
      title: 'Sensing of environmental contaminants using advanced nanomaterial',
      authors: 'Raturi P.; Choudhuri B.; Chinnamuthu P.',
      journal: 'Book Chapter: Advanced Materials for A Sustainable Environment Development Strategies and Applications, Pages 57-76',
      year: 2022,
      doi: '10.1201/9781003206385-3'
    },
    {
      id: 'p28',
      title: 'Scrutinizing and Collating the Broadband Photo-Detection Properties of Isotype n-MnO/TiO Nanostructure',
      authors: 'Lynrah S.A.; Pooja P.; Chinnamuthu P.',
      journal: 'IEEE Sensors Journal, Volume 21, Pages 1485-1492',
      year: 2021,
      doi: '10.1109/JSEN.2020.3020644'
    },
    {
      id: 'p29',
      title: 'Electrical and dielectric parameters in TiO2-NW/Ge-NW heterostructure MOS device synthesized by glancing angle deposition technique',
      authors: 'Singh H.M.; Lim Y.Y.; Chinnamuthu P.',
      journal: 'Scientific Reports, Volume 11',
      year: 2021,
      doi: '10.1038/s41598-021-99354-1'
    },
    {
      id: 'p30',
      title: 'Highly efficient natural-sunlight-driven photodegradation of organic dyes with combustion derived Ce-doped CuO nanoparticles',
      authors: 'Singh S.J.; Chinnamuthu P.',
      journal: 'Colloids and Surfaces A Physicochemical and Engineering Aspects, Volume 625',
      year: 2021,
      doi: '10.1016/j.colsurfa.2021.126864'
    },
    {
      id: 'p31',
      title: 'Impact of au and ag contact on the electrical parameters of MnO2 nanowires grown by glancing angle deposition technique',
      authors: 'Lynrah S.A.; Chinnamuthu P.',
      journal: 'Conference Paper: Proceedings of 4th International Conference on Devices for Integrated Circuit, Pages 435-437',
      year: 2021,
      doi: '10.1109/DevIC50843.2021.9455792'
    },
    {
      id: 'p32',
      title: 'Corrigendum to “Annealed n-TiO2/In2O3 nanowire metal-insulator-semiconductor for highly photosensitive low-noise ultraviolet photodetector”',
      authors: 'Pooja P.; Chinnamuthu P.',
      journal: 'Journal of Alloys and Compounds, Volume 861',
      year: 2021,
      doi: '10.1016/j.jallcom.2021.158594'
    },
    {
      id: 'p33',
      title: 'Annealed n-TiO2/In2O3 nanowire metal-insulator-semiconductor for highly photosensitive low-noise ultraviolet photodetector',
      authors: 'Pooja P.; Chinnamuthu P.',
      journal: 'Journal of Alloys and Compounds, Volume 854',
      year: 2021,
      doi: '10.1016/j.jallcom.2020.157229'
    },
    {
      id: 'p34',
      title: 'Reduction of interface state density in coaxial TiO2/Ge nanowire assembly-based heterostructure and superior photodetection',
      authors: 'Manas S.H.; Choudhuri B.; Chinnamuthu P.',
      journal: 'Journal of Alloys and Compounds, Volume 853',
      year: 2021,
      doi: '10.1016/j.jallcom.2020.157344'
    },
    {
      id: 'p35',
      title: 'Investigation on the effect of interface state density and series resistance in Ag/Ge-NW/Si (MS) device synthesized by glancing angle deposition technique',
      authors: 'Manas Singh H.; Chinnamuthu P.',
      journal: 'Materials Letters, Volume 300',
      year: 2021,
      doi: '10.1016/j.matlet.2021.130183'
    }
  ], []);

  // Classify publication domain/sub-topic helper
  const getDomain = (pub: Publication): string => {
    const text = (pub.title + ' ' + pub.journal).toLowerCase();
    if (text.includes('photodetect') || text.includes('photosens')) return 'Photodetectors';
    if (text.includes('nanowire') || text.includes('nanopillar') || text.includes('nw')) return 'Nanowires & Nanostructures';
    if (text.includes('thin film') || text.includes('oxide') || text.includes('monolayer')) return 'Thin Films & Oxides';
    if (text.includes('photocataly') || text.includes('photodegrad') || text.includes('adsorpt') || text.includes('removal') || text.includes('dye')) return 'Photocatalysis & Chemistry';
    if (text.includes('memristor') || text.includes('mosfet') || text.includes('memory') || text.includes('dielectric') || text.includes('schottky')) return 'Electronics & Memory';
    if (text.includes('solar') || text.includes('photovoltaic') || text.includes('power')) return 'Energy & Solar';
    return 'General Nanomaterials';
  };

  // Extract type of article helper
  const getDocType = (pub: Publication): { label: string; bg: string; text: string } => {
    const journalLower = pub.journal.toLowerCase();
    if (journalLower.includes('conference') || journalLower.includes('proceedings')) {
      return { label: 'Conference Paper', bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-600' };
    }
    if (journalLower.includes('book chapter')) {
      return { label: 'Book Chapter', bg: 'bg-purple-50 text-purple-700 border-purple-200', text: 'text-purple-600' };
    }
    if (journalLower.includes('review') || pub.title.toLowerCase().includes('review') || pub.title.toLowerCase().includes('perspective')) {
      return { label: 'Review Paper', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-600' };
    }
    if (journalLower.includes('corrigendum') || journalLower.includes('erratum')) {
      return { label: 'Erratum', bg: 'bg-rose-50 text-rose-700 border-rose-200', text: 'text-rose-600' };
    }
    return { label: 'Journal Article', bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'text-blue-600' };
  };

  const domains = ['All', 'Photodetectors', 'Nanowires & Nanostructures', 'Thin Films & Oxides', 'Photocatalysis & Chemistry', 'Electronics & Memory', 'Energy & Solar'];
  const years = ['All', 2026, 2025, 2024, 2023, 2022, 2021];

  const sidebarItems = useMemo(() => {
    return years.map(y => {
      const count = y === 'All' 
        ? publications.length 
        : publications.filter(p => p.year === y).length;
      return y === 'All' ? `All Years (${count})` : `${y} (${count})`;
    });
  }, [years, publications]);

  const activeYearIndex = useMemo(() => {
    const idx = years.indexOf(selectedYear as any);
    return idx !== -1 ? idx : 0;
  }, [years, selectedYear]);

  const publicationTypes = [
    { id: 'All', label: 'All Types' },
    { id: 'Journal Article', label: 'Journal Articles' },
    { id: 'Conference Paper', label: 'Conference Papers' },
    { id: 'Book Chapter', label: 'Book Chapters' }
  ];

  const getTypeCount = (typeId: string): number => {
    if (typeId === 'All') return publications.length;
    return publications.filter(p => {
      const docLabel = getDocType(p).label;
      if (typeId === 'Journal Article') {
        return ['Journal Article', 'Review Paper', 'Erratum'].includes(docLabel);
      }
      return docLabel === typeId;
    }).length;
  };

  // Dynamically compute counts for domains based on selection
  const domainStats = useMemo(() => {
    const counts: Record<string, number> = {};
    domains.forEach(d => { counts[d] = 0; });
    publications.forEach(p => {
      const d = getDomain(p);
      if (counts[d] !== undefined) counts[d]++;
      else counts['General Nanomaterials'] = (counts['General Nanomaterials'] || 0) + 1;
    });
    return counts;
  }, [publications]);

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesYear = selectedYear === 'All' || pub.year === selectedYear;
      const matchesDomain = selectedDomain === 'All' || getDomain(pub) === selectedDomain;
      
      const docLabel = getDocType(pub).label;
      const matchesType = selectedType === 'All' || 
        (selectedType === 'Journal Article' && ['Journal Article', 'Review Paper', 'Erratum'].includes(docLabel)) ||
        (selectedType === 'Conference Paper' && docLabel === 'Conference Paper') ||
        (selectedType === 'Book Chapter' && docLabel === 'Book Chapter');

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        pub.title.toLowerCase().includes(query) || 
        pub.authors.toLowerCase().includes(query) || 
        pub.journal.toLowerCase().includes(query) || 
        pub.doi.toLowerCase().includes(query) ||
        getDomain(pub).toLowerCase().includes(query) ||
        docLabel.toLowerCase().includes(query);

      return matchesYear && matchesDomain && matchesType && matchesSearch;
    });
  }, [publications, selectedYear, selectedDomain, selectedType, searchQuery]);

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Nano-Tech Scientific Background Design */}
      <div className="absolute inset-0 bg-slate-50/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_80%,transparent_100%)] opacity-35 pointer-events-none" />
      
      {/* Decorative Floating Nano Nodes */}
      <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[10%] left-[15%] w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '15s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 z-10">
        
        {/* HEADER SECTION WITH ELEGANT LIGHT THEME */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/20 text-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
              <span>Research & Publication Corpus</span>
            </div>
            
            <SplitText
              text="Scholarly Publications"
              className="text-3xl sm:text-4xl font-display font-black uppercase tracking-widest leading-tight text-slate-900 block"
              delay={35}
              duration={1.0}
              ease="power3.out"
              splitType="chars"
              textAlign="left"
              tag="h2"
            />

            <p className="text-xs sm:text-sm text-slate-600 font-mono tracking-wider max-w-2xl pt-1">
              Explore {publications.length} peer-reviewed works in high-impact journals, focusing on nanostructure synthesis, ultraviolet photodetectors, memory units, and semiconductor devices.
            </p>
          
          {/* RESEARCH METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-medium">Total Papers</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-display text-slate-900">{publications.length}</span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">+86 Total</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-medium">Top Domains</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-display text-slate-900">6+</span>
                <span className="text-[10px] font-mono text-blue-600 font-bold">Classified</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-medium">Current Year</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-display text-slate-900">3</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">for 2026</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-medium">Avg Citations</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-display text-emerald-600 animate-pulse">High</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND QUICK DOMAIN FILTER STRIP */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Search Input Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Title, Author, DOI, Journal, or Keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-mono text-slate-800 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200 px-1.5 py-0.5 rounded"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>Showing <strong className="text-slate-800">{filteredPublications.length}</strong> of {publications.length} papers</span>
          </div>
        </div>

        {/* Horizontal Domain Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">Quick-Filter by Research Domain:</span>
          <div className="flex flex-wrap gap-1.5">
            {domains.map(dom => {
              const count = dom === 'All' 
                ? publications.length 
                : publications.filter(p => getDomain(p) === dom).length;
              const isSelected = selectedDomain === dom;
              
              return (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {dom} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Publication Type Tabs */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">Filter by Publication Type:</span>
          <div className="flex flex-wrap gap-1.5">
            {publicationTypes.map(type => {
              const count = getTypeCount(type.id);
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/10'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {type.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT: Sidebar (Left) + Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR - YEAR NAVIGATION & METRIC WIDGETS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Year Selector Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Filter className="h-3.5 w-3.5 text-blue-600" />
                <span>Filter By Year</span>
              </h4>
              
              <div className="py-2 overflow-x-auto lg:overflow-visible scrollbar-none">
                <LineSidebar
                  items={sidebarItems}
                  accentColor="#2563eb"
                  textColor="#475569"
                  markerColor="#cbd5e1"
                  showIndex={true}
                  showMarker={true}
                  proximityRadius={80}
                  maxShift={12}
                  falloff="smooth"
                  markerLength={18}
                  itemGap={6}
                  fontSize={0.75}
                  defaultActive={activeYearIndex}
                  onItemClick={(index) => {
                    const y = years[index];
                    setSelectedYear(y as any);
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Topic Distribution Sidebar Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm hidden lg:block">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Layers className="h-3.5 w-3.5 text-emerald-500" />
                <span>Topic Focus</span>
              </h4>
              <div className="space-y-3">
                {Object.entries(domainStats)
                  .filter(([name]) => name !== 'All')
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([name, countVal]) => {
                    const count = countVal as number;
                    const percentage = Math.round((count / publications.length) * 100);
                    return (
                      <div key={name} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-600 truncate max-w-[150px]">{name}</span>
                          <span className="text-slate-900 font-bold">{count} ({percentage}%)</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Highlighted Breakthrough Box */}
            <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 shadow-md shadow-indigo-100/30 hover:shadow-indigo-100/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-emerald-100 opacity-10 blur-sm group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative bg-gradient-to-br from-white to-slate-50/80 text-slate-900 rounded-[15px] p-5 space-y-4 overflow-hidden border border-white/50">
                {/* Background decorative vector details */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header with icon and shining star */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold">
                    <Sparkles className="h-3 w-3 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Featured Breakthrough</span>
                  </div>
                  <Award className="h-4 w-4 text-amber-500 animate-pulse" />
                </div>
                
                {/* Title */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-sans font-extrabold leading-relaxed text-slate-900 uppercase tracking-wide group-hover:text-blue-700 transition-colors duration-200">
                    "Enhancing ultraviolet photodetection by incorporating CeO2 thin film between Gd2O3 layers"
                  </h5>
                  <p className="text-[9px] font-mono text-slate-500 italic">
                    Published in Applied Physics A, 2026
                  </p>
                </div>
                
                {/* Authors */}
                <p className="text-[9px] font-mono text-slate-400 border-t border-slate-200/60 pt-2.5">
                  Meitei P.N.; Mayanglambam F.; Meitei S.R.; Chinnamuthu P.; et al.
                </p>

                {/* Interactive Action inside Breakthrough card */}
                <button
                  onClick={() => {
                    setSearchQuery('Enhancing ultraviolet photodetection');
                    setSelectedYear('All');
                    setSelectedDomain('All');
                    setSelectedType('All');
                    
                    // Delay slightly to allow filter animation to complete before scroll
                    setTimeout(() => {
                      const el = document.getElementById('p1');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add a temporary glow effect to the card
                        el.classList.add('ring-2', 'ring-blue-500', 'scale-[1.01]');
                        setTimeout(() => {
                          el.classList.remove('ring-2', 'ring-blue-500', 'scale-[1.01]');
                        }, 2000);
                      }
                    }, 100);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[9px] font-mono uppercase tracking-wider font-extrabold rounded-lg transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>Locate & Focus Paper</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT - PUBLICATIONS TIMELINE */}
        <div className="lg:col-span-3">
          <div className="relative border-l border-slate-200 pl-6 sm:pl-8 space-y-6">
            
            <AnimatePresence mode="popLayout">
              {filteredPublications.map((pub, idx) => {
                const docType = getDocType(pub);
                const domainTag = getDomain(pub);
                
                return (
                  <motion.div
                    key={pub.id}
                    id={pub.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="relative group transition-all duration-300"
                  >
                    {/* Timeline Node Ring with Hover Pulsing */}
                    <span className="absolute -left-[31px] sm:-left-[39px] top-5 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 shadow-[0_0_4px_rgba(37,99,235,0.2)] group-hover:bg-blue-600 group-hover:scale-110 transition duration-300" />

                    <div className="bg-white border border-slate-200 hover:border-blue-500/35 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-4 shadow-sm hover:shadow-lg relative overflow-hidden">
                      {/* Subtle hover background highlight gradient */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-blue-600 via-emerald-500 to-transparent opacity-75" />

                      {/* Top Header Row of Card */}
                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Year Badge Button */}
                          <button
                            onClick={() => setSelectedYear(pub.year)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-blue-600 hover:text-white rounded-md font-bold text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow active:scale-95 group/year-badge"
                            title={`Click to filter publications by Year ${pub.year}`}
                          >
                            <Calendar className="h-3 w-3 text-emerald-400 group-hover/year-badge:text-white transition-colors" />
                            <span className="group-hover/year-badge:underline">{pub.year}</span>
                          </button>
                          
                          {/* Document Classification Badge */}
                          <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${docType.bg}`}>
                            {docType.label}
                          </span>
                        </div>
                        
                        {/* Domain Label */}
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {domainTag}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-display font-black text-slate-900 uppercase tracking-wider leading-snug group-hover:text-blue-700 transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-500 italic uppercase">
                          {pub.journal}
                        </p>
                      </div>

                      {/* Authors Segment with Highlighted Group Leader */}
                      <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] font-mono text-slate-600">
                        <User className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px] mb-0.5">Author Group:</span>
                          <span>
                            {pub.authors.split(';').map((author, index) => {
                              const trimmed = author.trim();
                              const isLeader = trimmed.includes('Chinnamuthu P.');
                              return (
                                <React.Fragment key={index}>
                                  {index > 0 && '; '}
                                  <span className={isLeader ? 'text-blue-600 font-extrabold underline decoration-blue-500/40' : ''}>
                                    {trimmed}
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Lower Actions & Interactive DOI Row */}
                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                          <Cpu className="h-3.5 w-3.5 text-slate-400" />
                          <span>
                            DOI: {' '}
                            <a 
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-all cursor-pointer select-all"
                            >
                              {pub.doi}
                            </a>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Share button */}
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`https://doi.org/${pub.doi}`);
                              alert('DOI Link copied to clipboard!');
                            }}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer"
                            title="Copy DOI Link"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          
                          {/* Main Link Button */}
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-[9px] font-mono tracking-widest uppercase font-bold shadow-sm hover:shadow transition duration-200 cursor-pointer"
                          >
                            <span>Open Article</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredPublications.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <FileText className="h-12 w-12 text-slate-300 mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-slate-700">No Publications Match Filter Criteria</p>
                  <p className="text-[11px] font-mono text-slate-400">Try modifying your search query or reset filters.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedYear('All');
                    setSelectedDomain('All');
                    setSelectedType('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-mono uppercase tracking-wider rounded-xl cursor-pointer transition"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}

          </div>
        </div>

      </div>

    </div>

  </div>
  );
}
