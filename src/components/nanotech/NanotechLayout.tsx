import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Atom, 
  ChevronDown, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Award,
  Globe,
  FileText,
  User,
  Users,
  Handshake,
  GraduationCap,
  FlaskConical,
  FlameKindling,
  Sparkles,
  Info
} from 'lucide-react';

import NanotechHome from './NanotechHome';
import NanotechGroupLeader from './NanotechGroupLeader';
import NanotechGroupMembers from './NanotechGroupMembers';
import NanotechCollaborators from './NanotechCollaborators';
import NanotechAlumni from './NanotechAlumni';
import NanotechPublications from './NanotechPublications';
import NanotechResearch from './NanotechResearch';
import NanotechResources from './NanotechResources';
import NanotechGallery from './NanotechGallery';
// Logo replaced with premium inline SVG crest below

export type NanoView = 
  | 'home' 
  | 'group-leader' 
  | 'group-members' 
  | 'collaborators' 
  | 'alumni' 
  | 'publications' 
  | 'research' 
  | 'resources' 
  | 'gallery';

interface NanotechLayoutProps {
  onBackToIntro: () => void;
}

export default function NanotechLayout({ onBackToIntro }: NanotechLayoutProps) {
  const [currentView, setCurrentView] = useState<NanoView>('home');
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<'laboratory' | 'extra'>('laboratory');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const galleryDropdownRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGroupDropdownOpen(false);
      }
      if (galleryDropdownRef.current && !galleryDropdownRef.current.contains(event.target as Node)) {
        setIsGalleryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Molecular network background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const numParticles = 45;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.55)'; // beautiful royal/electric blue
        ctx.fill();

        // Connect particles within proximity
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity based on proximity
            const opacity = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleGroupSubNav = (view: NanoView) => {
    setCurrentView(view);
    setIsGroupDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGroupActive = ['group-leader', 'group-members', 'collaborators', 'alumni'].includes(currentView);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Dynamic Nano Molecule Network Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
      />

<<<<<<< HEAD
      {/* Top Latest Update Banner - Swiping from Middle Right to Left */}
      <div 
        onClick={() => window.dispatchEvent(new CustomEvent('open-latest-updates'))}
        className="w-full bg-slate-900 hover:bg-slate-850 border-b border-slate-800 py-2.5 px-4 overflow-hidden z-50 relative select-none shrink-0 cursor-pointer transition-colors group/banner"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <span className="bg-blue-500 text-white px-2.5 py-0.5 rounded font-black uppercase tracking-wider text-[9px] shrink-0 mr-3 animate-pulse">
            Latest Update
          </span>
          <div className="flex-1 overflow-hidden relative flex items-center h-5">
            <div className="animate-marquee-swipe absolute left-0 text-slate-200 font-medium tracking-wide text-[11px] group-hover/banner:text-white">
              ✨ <span className="text-blue-400 font-bold">NIT NAGALAND - DEPARTMENT OF ECE:</span> Admissions are open for Ph.D. and M.Tech programs 2026-27 • Virtual lab simulators now live for Analog DSO & Digital Logic Trainer kits • Dr. P. Chinnamuthu published a new research paper on advanced biomaterial sensors • Sponsored grants and collaborative research projects updated for the sessional semester!
            </div>
          </div>
          <span className="text-[10px] text-blue-400 font-bold ml-3 shrink-0 opacity-80 group-hover/banner:opacity-100 flex items-center space-x-1">
            <span>View Details</span>
            <span>↗</span>
          </span>
        </div>
      </div>

=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
      {/* FIXED NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/85 shadow-sm shadow-slate-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={onBackToIntro}
                className="flex items-center space-x-2.5 text-left group cursor-pointer"
                title="Return to the Portal Intro"
              >
                <div className="p-1 bg-white rounded-xl border border-slate-200/80 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300 flex items-center justify-center shadow-sm w-12 h-12 overflow-hidden relative">
                  <img 
                    src="/National_Institute_of_Technology,_Nagaland_Logo.png" 
                    alt="NIT Nagaland Logo" 
                    className="h-10 w-10 object-contain absolute z-10"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const svgSibling = target.nextElementSibling as HTMLElement;
                      if (svgSibling) {
                        svgSibling.classList.remove('hidden');
                        svgSibling.classList.add('block');
                      }
                    }}
                  />
                  <svg className="h-10 w-10 text-blue-600 animate-spin-slow absolute hidden" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5L15 20V50C15 72.5 50 95 50 95C50 95 85 72.5 85 50V20L50 5Z" fill="#2563EB" fillOpacity="0.08" stroke="#2563EB" strokeWidth="4" strokeLinejoin="round"/>
                    <circle cx="50" cy="50" r="16" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="3 3"/>
                    <path d="M50 25V35M50 65V75M25 50H35M65 50H75" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="5" fill="#10B981" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-sm tracking-tight text-slate-900 leading-none">
                    NIT Nagaland
                  </span>
                  <span className="text-[9.5px] text-blue-600 font-mono tracking-tight font-black leading-none uppercase mt-1">
                    Department of ECE
                  </span>
                </div>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-1.5 h-full">
              
              {/* Home Tab */}
              <button
                onClick={() => { setCurrentView('home'); setIsGroupDropdownOpen(false); }}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg relative cursor-pointer ${
                  currentView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Home
                {currentView === 'home' && (
                  <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                )}
              </button>

              {/* Our Group with Dropdown */}
              <div className="relative h-full flex items-center" ref={dropdownRef}>
                <button
                  onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
                  className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg flex items-center space-x-1 cursor-pointer ${
                    isGroupActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <span>Our Group</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isGroupDropdownOpen ? 'rotate-180' : ''}`} />
                  {isGroupActive && (
                    <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  )}
                </button>

                {/* Dropdown Menu (Slide down effect) */}
                <AnimatePresence>
                  {isGroupDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-16 left-0 w-52 bg-white border border-slate-200/80 rounded-xl shadow-xl p-2 z-50 flex flex-col space-y-1.5"
                    >
                      <button
                        onClick={() => handleGroupSubNav('group-leader')}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'group-leader' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <User className="h-3.5 w-3.5" />
                        <span>Group Leader</span>
                      </button>

                      <button
                        onClick={() => handleGroupSubNav('group-members')}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'group-members' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>Group Members</span>
                      </button>

                      <button
                        onClick={() => handleGroupSubNav('collaborators')}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'collaborators' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Handshake className="h-3.5 w-3.5" />
                        <span>Collaborators</span>
                      </button>

                      <button
                        onClick={() => handleGroupSubNav('alumni')}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'alumni' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Alumni</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Publications Tab */}
              <button
                onClick={() => { setCurrentView('publications'); setIsGroupDropdownOpen(false); }}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg relative cursor-pointer ${
                  currentView === 'publications' ? 'text-blue-600 bg-blue-550/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Publications
                {currentView === 'publications' && (
                  <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                )}
              </button>

              {/* Research Tab */}
              <button
                onClick={() => { setCurrentView('research'); setIsGroupDropdownOpen(false); }}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg relative cursor-pointer ${
                  currentView === 'research' ? 'text-blue-600 bg-blue-550/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Research
                {currentView === 'research' && (
                  <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                )}
              </button>

              {/* Resources Tab */}
              <button
                onClick={() => { setCurrentView('resources'); setIsGroupDropdownOpen(false); }}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg relative cursor-pointer ${
                  currentView === 'resources' ? 'text-blue-600 bg-blue-550/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Resources
                {currentView === 'resources' && (
                  <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                )}
              </button>

              {/* Gallery Tab with Dropdown */}
              <div className="relative h-full flex items-center" ref={galleryDropdownRef}>
                <button
                  onClick={() => {
                    setIsGalleryDropdownOpen(!isGalleryDropdownOpen);
                    setIsGroupDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg flex items-center space-x-1 cursor-pointer ${
                    currentView === 'gallery' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <span>Gallery</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isGalleryDropdownOpen ? 'rotate-180' : ''}`} />
                  {currentView === 'gallery' && (
                    <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  )}
                </button>

                {/* Dropdown Menu (Slide down effect) */}
                <AnimatePresence>
                  {isGalleryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-16 left-0 w-56 bg-white border border-slate-200/80 rounded-xl shadow-xl p-2 z-50 flex flex-col space-y-1.5"
                    >
                      <button
                        onClick={() => {
                          setGalleryTab('laboratory');
                          setCurrentView('gallery');
                          setIsGalleryDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'gallery' && galleryTab === 'laboratory' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <FlaskConical className="h-3.5 w-3.5" />
                        <span>Laboratory Gallery</span>
                      </button>

                      <button
                        onClick={() => {
                          setGalleryTab('extra');
                          setCurrentView('gallery');
                          setIsGalleryDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono font-semibold tracking-wider rounded-lg text-left transition ${
                          currentView === 'gallery' && galleryTab === 'extra' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Extra Curriculum</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Back Button to ECE Intro */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onBackToIntro}
                className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 text-[10px] font-mono tracking-widest uppercase rounded-lg transition-all cursor-pointer shadow-sm"
              >
                ← Back To Main Portal
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SUBMENU DRAWER */}
        <div className="md:hidden bg-white border-t border-slate-200 flex flex-wrap justify-center py-2 gap-1.5 px-4">
          <button
            onClick={() => { setCurrentView('home'); setIsGroupDropdownOpen(false); }}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded ${
              currentView === 'home' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded flex items-center space-x-0.5 ${
              isGroupActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            <span>Our Group</span>
            <ChevronDown className="h-2.5 w-2.5" />
          </button>

          <button
            onClick={() => { setCurrentView('publications'); setIsGroupDropdownOpen(false); }}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded ${
              currentView === 'publications' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            Pubs
          </button>

          <button
            onClick={() => { setCurrentView('research'); setIsGroupDropdownOpen(false); }}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded ${
              currentView === 'research' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            Research
          </button>

          <button
            onClick={() => { setCurrentView('resources'); setIsGroupDropdownOpen(false); }}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded ${
              currentView === 'resources' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            Resources
          </button>

          <button
            onClick={() => {
              setIsGalleryDropdownOpen(!isGalleryDropdownOpen);
              setIsGroupDropdownOpen(false);
            }}
            className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded flex items-center space-x-0.5 ${
              currentView === 'gallery' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
            }`}
          >
            <span>Gallery</span>
            <ChevronDown className="h-2.5 w-2.5" />
          </button>

          {/* Expanded dropdown contents for mobile */}
          <AnimatePresence>
            {isGroupDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full flex justify-center gap-1 border-t border-slate-200 mt-1.5 pt-1.5 flex-wrap"
              >
                <button
                  onClick={() => handleGroupSubNav('group-leader')}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'group-leader' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Leader
                </button>
                <button
                  onClick={() => handleGroupSubNav('group-members')}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'group-members' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Members
                </button>
                <button
                  onClick={() => handleGroupSubNav('collaborators')}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'collaborators' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Collabs
                </button>
                <button
                  onClick={() => handleGroupSubNav('alumni')}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'alumni' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Alumni
                </button>
              </motion.div>
            )}
            {isGalleryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full flex justify-center gap-1 border-t border-slate-200 mt-1.5 pt-1.5 flex-wrap"
              >
                <button
                  onClick={() => {
                    setGalleryTab('laboratory');
                    setCurrentView('gallery');
                    setIsGalleryDropdownOpen(false);
                  }}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'gallery' && galleryTab === 'laboratory' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Lab Gallery
                </button>
                <button
                  onClick={() => {
                    setGalleryTab('extra');
                    setCurrentView('gallery');
                    setIsGalleryDropdownOpen(false);
                  }}
                  className={`px-2 py-0.5 text-[9px] font-mono tracking-tight uppercase rounded ${
                    currentView === 'gallery' && galleryTab === 'extra' ? 'bg-blue-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Extra Curriculum
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* CONTENT AREA WITH SMOOTH COMPONENT MOUNTING */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentView === 'home' && <NanotechHome onNavigate={setCurrentView} />}
            {currentView === 'group-leader' && <NanotechGroupLeader />}
            {currentView === 'group-members' && <NanotechGroupMembers />}
            {currentView === 'collaborators' && <NanotechCollaborators />}
            {currentView === 'alumni' && <NanotechAlumni />}
            {currentView === 'publications' && <NanotechPublications />}
            {currentView === 'research' && <NanotechResearch />}
            {currentView === 'resources' && <NanotechResources />}
            {currentView === 'gallery' && (
              <NanotechGallery 
                initialTab={galleryTab} 
                onTabChange={setGalleryTab} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* STICKY SCIENTIFIC FOOTER */}
      <footer className="relative bg-slate-100 border-t border-slate-200 pt-16 pb-8 z-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-200 pb-12 mb-12">
            
            {/* Lab Description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Atom className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="font-display font-black text-sm tracking-wider text-slate-900 uppercase font-mono">
                  NANOTECHNOLOGY LAB • NITN
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Operating within the Department of Electronics and Communication Engineering at NIT Nagaland, our laboratory specializes in the development of low-dimensional semiconductor compounds, thin film chemical vapor synthesis, and advanced biosensing architectures.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-3 space-y-4 font-mono">
              <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase">Quick Directory</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setCurrentView('home')} className="text-slate-600 hover:text-blue-600 transition cursor-pointer">
                    → Lab Home Deck
                  </button>
                </li>
                <li>
                  <button onClick={() => handleGroupSubNav('group-leader')} className="text-slate-600 hover:text-blue-600 transition cursor-pointer">
                    → Dr. Arpan Dey (PI)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('research')} className="text-slate-600 hover:text-blue-600 transition cursor-pointer">
                    → Projects & Publications
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('resources')} className="text-slate-600 hover:text-blue-600 transition cursor-pointer">
                    → Equipment & Materials
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Quick Details */}
            <div className="md:col-span-4 space-y-4 font-mono">
              <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase">Coordinates</h4>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Nano-Device Fabrication Lab, Block-B,<br />
                    National Institute of Technology Nagaland,<br />
                    Chumukedima, Nagaland - 797103
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                  <a href="mailto:arpan.dey@nitnagaland.ac.in" className="hover:text-blue-600 transition">
                    arpan.dey@nitnagaland.ac.in
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Trademark & Accreditations */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 font-mono gap-4">
            <p>
              &copy; {new Date().getFullYear()} NIT Nagaland - Department of ECE. All Rights Reserved.
            </p>
            <div className="flex space-x-3">
              <span className="px-2 py-0.5 bg-white border border-slate-200 text-[9px] rounded uppercase font-semibold text-slate-600 shadow-sm">
                NANO-DSD APPROVED
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 text-[9px] rounded uppercase font-semibold text-slate-600 shadow-sm">
                DST-FIST FACILITY
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
