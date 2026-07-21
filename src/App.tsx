import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LabDetails from './components/LabDetails';
import LabManuals from './components/LabManuals';
import OscilloscopeSimulator from './components/OscilloscopeSimulator';
import LogicGateSimulator from './components/LogicGateSimulator';
import LabBookingSystem from './components/LabBookingSystem';
import NanotechLayout from './components/nanotech/NanotechLayout';
import BlurText from './components/nanotech/BlurText';
<<<<<<< HEAD
import { ArrowDown, Mail, Phone, MapPin, Globe, Award, ShieldAlert, GraduationCap, Github, Send, Sparkles, Activity, Clock, Cpu, CheckCircle2, Sliders, Zap, RefreshCw, Layers, Atom, X, Calendar, ChevronRight } from 'lucide-react';
=======
import { ArrowDown, Mail, Phone, MapPin, Globe, Award, ShieldAlert, GraduationCap, Github, Send, Sparkles, Activity, Clock, Cpu, CheckCircle2, Sliders, Zap, RefreshCw, Layers, Atom } from 'lucide-react';
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b

type TabType = 'directory' | 'manuals' | 'oscilloscope' | 'logic-gates' | 'booking';

interface StudentQuery {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// Left-side and right-side visual components removed for cleaner layout as requested

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('directory');
  const [studentQueries, setStudentQueries] = useState<StudentQuery[]>([]);
  const [isExplored, setIsExplored] = useState(false);
  const [portalMode, setPortalMode] = useState<'nanotech' | 'ece'>('nanotech');
  const [showPortalSelector, setShowPortalSelector] = useState(false);
<<<<<<< HEAD
  const [showLatestUpdates, setShowLatestUpdates] = useState(false);
  const [selectedUpdateId, setSelectedUpdateId] = useState('admissions-2026');
=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b

  // Query Form State
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryMsg, setQueryMsg] = useState('');
  
  // Custom toast to avoid window.alert iframe warnings
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live clock simulation
  const [currentTime, setCurrentTime] = useState<string>('');

  const navRef = useRef<HTMLDivElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

<<<<<<< HEAD
  // Subscription to open latest updates modal from any layout banner
  useEffect(() => {
    const handleOpenUpdates = () => {
      setShowLatestUpdates(true);
    };
    window.addEventListener('open-latest-updates', handleOpenUpdates);
    return () => {
      window.removeEventListener('open-latest-updates', handleOpenUpdates);
    };
  }, []);

=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
  useEffect(() => {
    // Clock tick
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Gesture and wheel navigation listener to seamlessly enter the ECE lab directory on scroll down or touch swipe
  useEffect(() => {
    if (isExplored) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        setPortalMode('nanotech');
        setIsExplored(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveTouch = moveEvent.touches[0];
        const diffY = startY - moveTouch.clientY;
        if (diffY > 40) { // Swiped up enough
          setPortalMode('nanotech');
          setIsExplored(true);
          window.removeEventListener('touchmove', handleTouchMove);
        }
      };

      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', handleTouchMove);
      }, { once: true });
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isExplored]);

  // Ambient elegant light-themed wave canvas simulation with high-fidelity cursor interactions
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Interactive mouse state
    const mouse = { x: -1000, y: -1000, active: false };
    
    // Interactive click ripples
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    // Particle flow
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
      color: string;
    }
    const particles: Particle[] = [];

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Attach listeners to the landing-hero wrapper to capture events even if pointer-events-none is on canvas container
    const parent = canvas.parentElement?.parentElement;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      mouse.x = (e.clientX - rect.left) * ratio;
      mouse.y = (e.clientY - rect.top) * ratio;
      mouse.active = true;

      // Spawn a tiny trailing particle sometimes
      if (Math.random() < 0.35) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          alpha: 1.0,
          life: 40 + Math.random() * 20,
          color: Math.random() > 0.5 ? '#10b981' : '#3b82f6'
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const clickX = (e.clientX - rect.left) * ratio;
      const clickY = (e.clientY - rect.top) * ratio;

      // Spawn a ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.3,
        alpha: 0.9,
        speed: 6
      });

      // Spawn radial splash particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          life: 50 + Math.random() * 30,
          color: i % 2 === 0 ? '#10b981' : '#3b82f6'
        });
      }
    };

    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('click', handleClick);
    }

    const render = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Breadboard Grid dots with glow based on mouse proximity
      const spacing = 40;
      for (let gx = 0; gx < width; gx += spacing) {
        for (let gy = 0; gy < height; gy += spacing) {
          let dotRadius = 1.2;
          let alpha = 0.15;

          if (mouse.active) {
            const dx = gx - mouse.x;
            const dy = gy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const factor = 1 - dist / 180;
              dotRadius = 1.2 + factor * 2.2;
              alpha = 0.15 + factor * 0.6;
              
              // Draw a tiny subtle connection trace grid line
              ctx.strokeStyle = `rgba(16, 185, 129, ${factor * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(gx - spacing / 2, gy);
              ctx.lineTo(gx + spacing / 2, gy);
              ctx.moveTo(gx, gy - spacing / 2);
              ctx.lineTo(gx, gy + spacing / 2);
              ctx.stroke();
            }
          }

          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.beginPath();
          ctx.arc(gx, gy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Render ripples (click-based logical signals)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= r.speed / r.maxRadius;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha * 0.25})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(59, 130, 246, ${r.alpha * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Render glowing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = p.life / 60;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      // 4. Draw modulated green waveform
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.2)';
      ctx.shadowBlur = 8;

      let waveYAtMouseX = midY;

      for (let x = 0; x < width; x += 2) {
        // Frequency and amplitude shifts based on mouse proximity
        let mouseMod = 1.0;
        if (mouse.active) {
          const distToMouseX = Math.abs(x - mouse.x);
          if (distToMouseX < 250) {
            mouseMod += (1 - distToMouseX / 250) * 0.55;
          }
        }

        const carrier = x * 0.008 * mouseMod + time;
        const modulator = Math.sin(x * 0.0012 + time * 0.15);
        const yValue = Math.sin(carrier) * modulator;
        const y = midY + yValue * (height * 0.35);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        if (mouse.active && Math.abs(x - mouse.x) < 2) {
          waveYAtMouseX = y;
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 5. Draw secondary reference channel wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.18)';
      ctx.lineWidth = 1.2;

      for (let x = 0; x < width; x += 4) {
        const angle = x * 0.006 - time * 0.4;
        const yValue = Math.cos(angle) * 0.45;
        const y = midY + yValue * (height * 0.35);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 6. Oscilloscope Measurement Probe Tooltip (HUD display near cursor)
      if (mouse.active) {
        // Vertical grid helper tracking line
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Interactive probe intersection node
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(mouse.x, waveYAtMouseX, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Animated target ring around intersection
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mouse.x, waveYAtMouseX, 8 + Math.sin(time * 8) * 3, 0, Math.PI * 2);
        ctx.stroke();

        // Elegant floating HUD tooltip
        const tooltipW = 120;
        const tooltipH = 50;
        let tooltipX = mouse.x + 15;
        let tooltipY = waveYAtMouseX - 25;

        // Contain bounds
        if (tooltipX + tooltipW > width) tooltipX = mouse.x - tooltipW - 15;
        if (tooltipY + tooltipH > height) tooltipY = height - tooltipH - 10;
        if (tooltipY < 10) tooltipY = 10;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 1.5;
        
        // Draw round rectangle with fallback support
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 8);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.rect(tooltipX, tooltipY, tooltipW, tooltipH);
          ctx.fill();
          ctx.stroke();
        }

        // Write live telemetry data
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('PROBE CHANNEL A', tooltipX + 8, tooltipY + 15);

        // Fluctuate some mock values live
        const liveVolt = (Math.abs(waveYAtMouseX - midY) / (height * 0.35) * 5.0).toFixed(2);
        const liveFreq = (150 + Math.sin(time) * 15 + (mouse.x / width) * 200).toFixed(0);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '8px monospace';
        ctx.fillText(`VOLT: ${liveVolt} V`, tooltipX + 8, tooltipY + 28);
        ctx.fillText(`FREQ: ${liveFreq} Hz`, tooltipX + 8, tooltipY + 39);
      }

      time += 0.015;
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animId);
    };
  }, [isExplored]);

  const handleScrollToPortal = () => {
    if (navRef.current) {
      navRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchSimulation = (type: 'oscilloscope' | 'logic-gates') => {
    setActiveTab(type);
    setTimeout(() => {
      if (navRef.current) {
        navRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryName || !queryEmail || !queryMsg) {
      setToastMessage('Please fill out all contact form fields.');
      return;
    }

    const newQuery: StudentQuery = {
      id: `q-${Date.now()}`,
      name: queryName,
      email: queryEmail,
      message: queryMsg,
      createdAt: new Date().toLocaleTimeString('en-US', { hour12: true })
    };

    setStudentQueries([newQuery, ...studentQueries]);
    setQueryName('');
    setQueryEmail('');
    setQueryMsg('');
    setToastMessage('Query dispatched successfully to the NIT Nagaland ECE administrator desk.');

    setTimeout(() => setToastMessage(null), 5000);
  };

<<<<<<< HEAD
  const latestUpdates = [
    {
      id: 'admissions-2026',
      title: 'Ph.D. & M.Tech Admissions Open (2026-27)',
      category: 'Admissions',
      date: 'July 2026',
      description: 'The Department of Electronics and Communication Engineering at NIT Nagaland invites applications for its regular and sponsored Master of Technology (M.Tech) and Doctor of Philosophy (Ph.D.) programs. Selected candidates will have the opportunity to engage in cutting-edge research across diverse sessional domains.',
      highlights: [
        'Full-time and part-time tracks with sessional teaching assistant stipends.',
        'Core research areas: advanced nanomaterials, optoelectronic biomaterial sensors, RF and high-speed communications.',
        'Access to state-of-the-art semiconductor synthesis and packaging benches.'
      ],
      tag: 'Urgent',
      tagColor: 'bg-rose-500/10 text-rose-600 border border-rose-200'
    },
    {
      id: 'virtual-labs-live',
      title: 'Interactive Virtual Lab Simulators are Now Online',
      category: 'E-Learning',
      date: 'July 2026',
      description: 'Under our sessional digitalization initiative, students can now run real-time hardware simulations directly from any device. We have rolled out a fully interactive Dual-Channel Digital Storage Oscilloscope (DSO) simulator and a comprehensive breadboard-style Digital Logic Gate Trainer.',
      highlights: [
        'Fully responsive knob controls, waveform triggered offsets, and measurement overlays.',
        'Wirable breadboard layout with active logic probe testing and error checking.',
        'Provides step-by-step experiment modules approved by the NIT Nagaland curriculum committee.'
      ],
      tag: 'New Simulators',
      tagColor: 'bg-emerald-500/10 text-emerald-600 border border-emerald-200'
    },
    {
      id: 'chinnamuthu-pub',
      title: 'Research Paper Published by Dr. P. Chinnamuthu',
      category: 'Publications',
      date: 'June 2026',
      description: 'Dr. P. Chinnamuthu, Associate Professor and ECE Lab Head, has published a high-impact research paper in the prestigious IEEE Transactions on Electron Devices, focusing on next-generation solid-state sensor platforms.',
      highlights: [
        'Paper Title: "High-Sensitivity Biosensors Built over Ultra-Thin Al2O3/HfO2 Multi-Layer Oxide Systems".',
        'Demonstrates breakthrough limits in room-temperature biological and chemical analyte tracking.',
        'In collaboration with post-doctoral and sessional research teams of the department.'
      ],
      tag: 'Research',
      tagColor: 'bg-blue-500/10 text-blue-600 border border-blue-200'
    },
    {
      id: 'grants-refresh',
      title: 'Federal Research Grants Renewed (SERB / DST / ANRF)',
      category: 'Grants & Funding',
      date: 'June 2026',
      description: 'The department’s primary research lines have secured renewed external funding from federal science agencies. These sponsorships ensure state-of-the-art updates to our material characterization tools and support student fellowships.',
      highlights: [
        'Funded by the Science and Engineering Research Board (SERB) and DST.',
        'Stipend vacancies open for sessional research assistants and JRF candidates.',
        'Focused on developing non-invasive bio-sensing arrays for medical diagnostics.'
      ],
      tag: 'Opportunities',
      tagColor: 'bg-amber-500/10 text-amber-600 border border-amber-200'
    }
  ];

  const selectedUpdate = latestUpdates.find(u => u.id === selectedUpdateId) || latestUpdates[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLatestUpdates(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isExplored ? (
          <motion.div
            key="landing-hero"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
<<<<<<< HEAD
            className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 text-slate-900 px-6 pt-24 pb-16 overflow-hidden select-none"
          >
            {/* Top Latest Update Banner - Swiping from Middle Right to Left */}
            <div 
              onClick={() => window.dispatchEvent(new CustomEvent('open-latest-updates'))}
              className="absolute top-0 left-0 right-0 w-full bg-slate-900 hover:bg-slate-850 border-b border-slate-800 py-2.5 px-4 overflow-hidden z-30 select-none cursor-pointer transition-colors group/banner"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
                <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded font-black uppercase tracking-wider text-[9px] shrink-0 mr-3 animate-pulse">
                  Latest Update
                </span>
                <div className="flex-1 overflow-hidden relative flex items-center h-5">
                  <div className="animate-marquee-swipe absolute left-0 text-slate-200 font-medium tracking-wide text-[11px] group-hover/banner:text-white">
                    ✨ <span className="text-emerald-400 font-bold">NIT NAGALAND - DEPARTMENT OF ECE:</span> Admissions are open for Ph.D. and M.Tech programs 2026-27 • Virtual lab simulators now live for Analog DSO & Digital Logic Trainer kits • Dr. P. Chinnamuthu published a new research paper on advanced biomaterial sensors • Sponsored grants and collaborative research projects updated for the sessional semester!
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold ml-3 shrink-0 opacity-80 group-hover/banner:opacity-100 flex items-center space-x-1">
                  <span>View Details</span>
                  <span>↗</span>
                </span>
              </div>
            </div>

=======
            className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 text-slate-900 px-6 py-16 overflow-hidden select-none"
          >
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
            {/* Elegant light pattern overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent" />
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="light-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="1.2" fill="rgba(16, 185, 129, 0.15)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#light-grid-pattern)" />
              </svg>
            </div>

            {/* Glowing warm ambient circles */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-teal-100/20 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

            {/* Content Box */}
            <div className="relative z-20 max-w-3xl mx-auto space-y-6 flex flex-col items-center">
              
              {/* Institution Crest emblem */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-2 bg-white rounded-3xl border border-emerald-200/50 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/National_Institute_of_Technology,_Nagaland_Logo.png" 
                  alt="NIT Nagaland Logo" 
                  className="h-20 w-20 object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>

              {/* Institution Crest Banner */}
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/60 rounded-full px-4 py-2 text-xs text-emerald-700 font-mono tracking-wider uppercase shadow-sm">
                <Award className="h-4 w-4 animate-bounce text-emerald-600" />
                <BlurText
                  text="National Institute of Technology Nagaland"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="font-mono justify-center"
                />
              </div>

              {/* Department Main Branding */}
              <div className="space-y-3 flex flex-col items-center w-full">
                <BlurText
<<<<<<< HEAD
                  text="ECE Excellence Hub"
=======
                  text="ECE Lab Portal"
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none text-slate-900 uppercase text-center justify-center w-full"
                />
                <BlurText
                  text="Department of Electronics and Communication Engineering"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="text-emerald-700 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-center justify-center w-full"
                />
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full" />

              <BlurText
                text="Modern laboratories equipped with advanced instruments provide practical training, support innovative projects, and foster research across various fields of electronics and communication engineering."
                delay={60}
                animateBy="words"
                direction="bottom"
<<<<<<< HEAD
                className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans text-left md:text-justify font-medium justify-center w-full"
=======
                className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans text-center font-medium justify-center w-full"
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
              />



              {/* Interactive Swipe Indicator / Explore block */}
              <div className="pt-6 flex flex-col items-center space-y-4">
                <button
                  onClick={() => {
                    setPortalMode('nanotech');
                    setIsExplored(true);
                  }}
                  className="group inline-flex items-center space-x-2.5 px-8 py-4.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-600/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-emerald-100 animate-pulse" />
                  <span>Enter Portal</span>
                  <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform text-white animate-bounce" />
                </button>

                <div className="flex flex-col items-center space-y-1 text-[10px] text-slate-400 font-mono animate-pulse pt-2">
                  <span>Scroll down or swipe to open Nanotech directly</span>
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Live interactive waveform and ECE grid background canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
              <canvas ref={heroCanvasRef} className="w-full h-full block" />
            </div>
          </motion.div>
        ) : portalMode === 'nanotech' ? (
          <motion.div
            key="nanotech-main"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <NanotechLayout onBackToIntro={() => setIsExplored(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="portal-main"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-h-screen bg-slate-50"
          >
<<<<<<< HEAD
            {/* Top Latest Update Banner - Swiping from Middle Right to Left */}
            <div 
              onClick={() => window.dispatchEvent(new CustomEvent('open-latest-updates'))}
              className="w-full bg-slate-900 hover:bg-slate-850 border-b border-slate-800 py-2.5 px-4 overflow-hidden z-30 select-none cursor-pointer transition-colors group/banner"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
                <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded font-black uppercase tracking-wider text-[9px] shrink-0 mr-3 animate-pulse">
                  Latest Update
                </span>
                <div className="flex-1 overflow-hidden relative flex items-center h-5">
                  <div className="animate-marquee-swipe absolute left-0 text-slate-200 font-medium tracking-wide text-[11px] group-hover/banner:text-white">
                    ✨ <span className="text-emerald-400 font-bold">NIT NAGALAND - DEPARTMENT OF ECE:</span> Admissions are open for Ph.D. and M.Tech programs 2026-27 • Virtual lab simulators now live for Analog DSO & Digital Logic Trainer kits • Dr. P. Chinnamuthu published a new research paper on advanced biomaterial sensors • Sponsored grants and collaborative research projects updated for the sessional semester!
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold ml-3 shrink-0 opacity-80 group-hover/banner:opacity-100 flex items-center space-x-1">
                  <span>View Details</span>
                  <span>↗</span>
                </span>
              </div>
            </div>

=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
            {/* 2. Sticky Logo Navigation Panel */}
            <div ref={navRef} className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-0">
                  
                  {/* Left Hand: Branding label */}
                  <button 
                    onClick={() => setIsExplored(false)}
                    className="py-2.5 flex items-center space-x-2 text-left hover:opacity-80 transition group cursor-pointer"
                    title="Go back to the welcome intro"
                  >
                    <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
                    <span className="font-display font-extrabold text-sm tracking-widest uppercase text-slate-900 font-mono flex items-center space-x-2">
                      <span>NIT NAGALAND • ECE</span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 font-normal px-1.5 py-0.5 rounded lowercase tracking-normal group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">back to intro</span>
                    </span>
                  </button>

                  {/* Middle: Custom Navigation Tabs */}
                  <div className="flex flex-wrap justify-center">
                    {[
                      { id: 'directory', label: 'Lab Directory' },
                      { id: 'manuals', label: 'Lab Manuals' },
                      { id: 'oscilloscope', label: 'DSO Scope' },
                      { id: 'logic-gates', label: 'Logic Trainer' },
                      { id: 'booking', label: 'Booking & Fault Log' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as TabType);
                          setToastMessage(null);
                        }}
                        className={`px-3 sm:px-4.5 py-4 text-xs font-mono font-bold uppercase tracking-wider transition border-b-2 cursor-pointer ${
                          activeTab === tab.id
                            ? 'border-emerald-500 text-emerald-600 font-bold bg-slate-50/60'
                            : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/30'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Right Hand: Online telemetry indicators */}
                  <div className="hidden lg:flex items-center space-x-4 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      <span className="font-bold">LIVE TELEMETRY ACTIVE</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Success toasts on core app level */}
            {toastMessage && (
              <div className="max-w-6xl mx-auto mt-6 px-4">
                <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-mono flex items-center space-x-3 shadow-md">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <p className="font-semibold">{toastMessage}</p>
                </div>
              </div>
            )}

            {/* 4. Active Tab Content Mounting Area */}
            <div className="flex-grow py-6 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeTab === 'directory' && <LabDetails />}
                {activeTab === 'manuals' && <LabManuals onLaunchSimulation={handleLaunchSimulation} />}
                {activeTab === 'oscilloscope' && <OscilloscopeSimulator />}
                {activeTab === 'logic-gates' && <LogicGateSimulator />}
                {activeTab === 'booking' && <LabBookingSystem />}
              </div>
            </div>

            {/* 5. Contact Query Forms */}
            <footer className="bg-white border-t border-slate-200 grid grid-cols-1 md:grid-cols-12 overflow-hidden" id="footer">
              
              {/* Left Side: Student Query Form */}
              <section className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                <div className="max-w-md space-y-4 mb-6">
                  <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-wider flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Submit Sessional Query</span>
                  </h3>
<<<<<<< HEAD
                  <p className="text-xs text-slate-500 font-sans leading-relaxed text-left md:text-justify">
=======
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
                    Stuck on an RC circuit filter phase curve or assembly instruction setup? Log your question directly with our ECE laboratory supervisors.
                  </p>
                </div>

                <form onSubmit={handleQuerySubmit} className="space-y-4 text-xs text-slate-700 max-w-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-800 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Kikon"
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-800 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. samuel@gmail.com"
                        value={queryEmail}
                        onChange={(e) => setQueryEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">Message / Query Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your issue or theoretical questions regarding experiments..."
                      value={queryMsg}
                      onChange={(e) => setQueryMsg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Query</span>
                  </button>
                </form>

                {/* Student Query Outbox list */}
                {studentQueries.length > 0 && (
                  <div className="mt-8 border-t border-slate-100 pt-6 max-w-lg">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-3 font-mono">
                      Transmission Logs Outbox
                    </span>
                    <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                      {studentQueries.map((q) => (
                        <div key={q.id} className="bg-emerald-50 border border-emerald-150 rounded-xl p-3 text-[11px] text-emerald-950 font-mono">
                          <div className="flex justify-between items-center font-bold">
                            <span>To: ECE Lab Desk</span>
                            <span className="text-slate-400 font-normal text-[9px]">{q.createdAt}</span>
                          </div>
                          <p className="mt-1 font-sans italic text-slate-700">
                            &quot;{q.message}&quot;
                          </p>
                          <span className="block mt-1 text-[9px] text-emerald-700 font-bold">
                            Sender: {q.name} ({q.email})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Right Side: Campus coordinates detail panel */}
              <section className="md:col-span-5 p-8 md:p-12 bg-slate-50 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-slate-900 text-base uppercase tracking-wider">
                    Department Coordinates
                  </h3>

                  <div className="space-y-4 text-xs text-slate-600 font-mono leading-relaxed">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <p className="font-sans text-slate-600">
                        <strong>Address:</strong><br />
                        Department of ECE, Academic Block-B,<br />
                        National Institute of Technology Nagaland,<br />
                        Chumukedima, Nagaland - 797103, India.
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>
                        <strong>Phone:</strong> +91-3862-241801
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>
                        <strong>Email:</strong> ece.office@nitnagaland.ac.in
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-slate-400 shrink-0" />
                      <a
                        href="https://nitnagaland.ac.in"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="hover:text-emerald-600 transition"
                      >
                        <strong>Website:</strong> nitnagaland.ac.in
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 space-y-3">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block font-mono">
                    Accreditations & Compliance
                  </span>
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-mono text-[9px] rounded font-bold uppercase shadow-sm">
                      AICTE Approved
                    </div>
                    <div className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-mono text-[9px] rounded font-bold uppercase shadow-sm">
                      NBA Accredited
                    </div>
                  </div>
                </div>
              </section>

            </footer>

            {/* 6. Simple Copyright footer */}
            <div className="bg-slate-950 text-slate-500 text-center py-6 border-t border-slate-900 text-[11px] font-mono">
              <p>&copy; {new Date().getFullYear()} National Institute of Technology Nagaland. All Rights Reserved.</p>
              <p className="mt-1 text-slate-600">
                Built according to the ECE Departmental Laboratory Curriculum • Designed via Massively HTML5 UP.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
<<<<<<< HEAD

      {/* Interactive Latest Updates Modal Overlay */}
      <AnimatePresence>
        {showLatestUpdates && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLatestUpdates(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-[85vh] md:h-[75vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-bold text-slate-900 font-display leading-none">
                      Latest Departmental Announcements
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-wider">
                      NIT Nagaland • Department of ECE
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLatestUpdates(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Two-Pane Dashboard Layout */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Pane - List of Updates */}
                <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-slate-100 overflow-y-auto p-4 space-y-2.5 bg-slate-50/20 custom-scrollbar">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block font-mono text-left">
                    Notification Inbox
                  </span>
                  {latestUpdates.map((update) => {
                    const isSelected = update.id === selectedUpdateId;
                    return (
                      <button
                        key={update.id}
                        onClick={() => setSelectedUpdateId(update.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden block ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10'
                            : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-850 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                            isSelected 
                              ? 'bg-white/15 text-emerald-300' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {update.category}
                          </span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-450'}`}>
                            {update.date}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold leading-snug tracking-tight font-sans">
                          {update.title}
                        </h3>
                        <p className={`text-[11px] line-clamp-2 mt-1 leading-relaxed ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {update.description}
                        </p>
                        
                        {isSelected && (
                          <motion.div
                            layoutId="active-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Pane - Detail View */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col justify-between bg-white custom-scrollbar">
                  <div className="space-y-6">
                    {/* Header info */}
                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${selectedUpdate.tagColor}`}>
                          {selectedUpdate.tag}
                        </span>
                        <div className="flex items-center text-slate-400 text-xs font-mono">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{selectedUpdate.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 font-display leading-tight tracking-tight">
                        {selectedUpdate.title}
                      </h3>
                    </div>

                    {/* Rich description */}
                    <div className="space-y-4 font-sans text-slate-600 text-sm leading-relaxed text-left md:text-justify">
                      <p className="font-medium text-slate-800 text-[14.5px]">
                        {selectedUpdate.description}
                      </p>
                      
                      {selectedUpdate.highlights && (
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block text-left">
                            Key Highlights & Bulletins
                          </span>
                          <ul className="space-y-2.5">
                            {selectedUpdate.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start text-[13px] text-slate-600">
                                <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 mr-2" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Close block inside detail pane */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Press ESC or click outside to dismiss</span>
                    <button
                      onClick={() => setShowLatestUpdates(false)}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-md shadow-slate-900/10 cursor-pointer"
                    >
                      Acknowledge & Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
=======
>>>>>>> 7fb43f624509646fca7ed2a26e4b2d0bdc40884b
    </div>
  );
}
