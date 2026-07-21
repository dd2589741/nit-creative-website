import React, { useState, useEffect } from 'react';
import { LabBooking, EquipmentIssue } from '../types';
import { Calendar, AlertTriangle, ShieldCheck, FileSpreadsheet, Plus, CheckCircle2, UserCheck, Wrench, X, Tag, Info, Clock, MapPin, Grid, Sparkles, Award } from 'lucide-react';

const INITIAL_BOOKINGS: LabBooking[] = [
  {
    id: 'b-1',
    studentName: 'Tiameren Longkumer',
    rollNo: '22ECE05',
    labId: 'analog',
    workbenchNo: 'Workbench #3',
    date: '2026-07-16',
    timeSlot: '10:00 AM - 12:00 PM',
    purpose: 'Testing V-I Diode curve parameters',
    status: 'Approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b-2',
    studentName: 'Nukshisangla Jamir',
    rollNo: '22ECE18',
    labId: 'vlsi',
    workbenchNo: 'FPGA Workstation #12',
    date: '2026-07-17',
    timeSlot: '02:00 PM - 04:00 PM',
    purpose: 'Verilog compilation on Basys3',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ISSUES: EquipmentIssue[] = [
  {
    id: 'is-1',
    reporterName: 'Imnayanger Ao',
    labId: 'analog',
    equipmentName: 'DSO Oscilloscope #4',
    workbenchNo: 'Workbench #4',
    issueDescription: 'Screen keeps flickering, calibration wave output showing high noise levels.',
    severity: 'Medium',
    status: 'Reported',
    createdAt: new Date().toISOString()
  },
  {
    id: 'is-2',
    reporterName: 'Keneisenuo',
    labId: 'digital',
    equipmentName: 'Digital Logic Gate IC Trainer Board',
    workbenchNo: 'Workbench #7',
    issueDescription: 'AND gate IC socket pins seem bent, not outputting logic level 1.',
    severity: 'High',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  }
];

export default function LabBookingSystem() {
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [issues, setIssues] = useState<EquipmentIssue[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'booking' | 'issues'>('booking');

  // Interactive feedback alerts to replace window.alert (avoids iframe constraints!)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Booking Form State
  const [bookName, setBookName] = useState('');
  const [bookRoll, setBookRoll] = useState('');
  const [bookLab, setBookLab] = useState('analog');
  const [bookBench, setBookBench] = useState('3'); // Bench number (1 to 15)
  const [bookDate, setBookDate] = useState('2026-07-18');
  const [bookSlot, setBookSlot] = useState('10:00 AM - 12:00 PM');
  const [bookPurpose, setBookPurpose] = useState('');

  // Issue Form State
  const [issueName, setIssueName] = useState('');
  const [issueLab, setIssueLab] = useState('analog');
  const [issueEq, setIssueEq] = useState('');
  const [issueBench, setIssueBench] = useState('4');
  const [issueDesc, setIssueDesc] = useState('');
  const [issueSeverity, setIssueSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');

  // Load state from localStorage on init
  useEffect(() => {
    const savedB = localStorage.getItem('nit_ece_bookings');
    const savedI = localStorage.getItem('nit_ece_issues');

    if (savedB) {
      setBookings(JSON.parse(savedB));
    } else {
      setBookings(INITIAL_BOOKINGS);
    }

    if (savedI) {
      setIssues(JSON.parse(savedI));
    } else {
      setIssues(INITIAL_ISSUES);
    }
  }, []);

  // Save to localStorage
  const saveBookings = (updated: LabBooking[]) => {
    setBookings(updated);
    localStorage.setItem('nit_ece_bookings', JSON.stringify(updated));
  };

  const saveIssues = (updated: EquipmentIssue[]) => {
    setIssues(updated);
    localStorage.setItem('nit_ece_issues', JSON.stringify(updated));
  };

  // Submit Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookRoll || !bookDate || !bookPurpose) {
      setErrorMessage('Please fill out all sessional reservation fields.');
      return;
    }

    const newBooking: LabBooking = {
      id: `b-${Date.now()}`,
      studentName: bookName,
      rollNo: bookRoll,
      labId: bookLab,
      workbenchNo: `Workbench #${bookBench}`,
      date: bookDate,
      timeSlot: bookSlot,
      purpose: bookPurpose,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    saveBookings([newBooking, ...bookings]);
    
    // Reset Form
    setBookName('');
    setBookRoll('');
    setBookPurpose('');
    setErrorMessage(null);
    setSuccessMessage(`Workbench Desk #${bookBench} requested successfully! Sessional ticket created below.`);

    // Clear alert automatically
    setTimeout(() => setSuccessMessage(null), 6000);
  };

  // Submit Issue
  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueName || !issueEq || !issueDesc) {
      setErrorMessage('Please fill out all equipment maintenance fields.');
      return;
    }

    const newIssue: EquipmentIssue = {
      id: `is-${Date.now()}`,
      reporterName: issueName,
      labId: issueLab,
      equipmentName: issueEq,
      workbenchNo: `Workbench #${issueBench}`,
      issueDescription: issueDesc,
      severity: issueSeverity,
      status: 'Reported',
      createdAt: new Date().toISOString()
    };

    saveIssues([newIssue, ...issues]);

    // Reset Form
    setIssueName('');
    setIssueEq('');
    setIssueDesc('');
    setErrorMessage(null);
    setSuccessMessage(`Defect ticket for ${issueEq} has been logged in ECE main server records.`);

    setTimeout(() => setSuccessMessage(null), 6000);
  };

  // Approve Booking
  const handleApproveBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'Approved' as const } : b));
    saveBookings(updated);
  };

  // Complete Booking
  const handleCompleteBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'Completed' as const } : b));
    saveBookings(updated);
  };

  // Cancel Booking
  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  // Advance Issue Status
  const handleAdvanceIssue = (id: string) => {
    const updated = issues.map((is) => {
      if (is.id === id) {
        if (is.status === 'Reported') return { ...is, status: 'In Progress' as const };
        if (is.status === 'In Progress') return { ...is, status: 'Resolved' as const };
      }
      return is;
    });
    saveIssues(updated);
  };

  // Delete Issue
  const handleDeleteIssue = (id: string) => {
    const updated = issues.filter((is) => is.id !== id);
    saveIssues(updated);
  };

  const getLabName = (id: string) => {
    const names: Record<string, string> = {
      analog: 'Analog Electronics Lab (ECE-102)',
      digital: 'Digital Circuits Lab (ECE-104)',
      embedded: 'Embedded Systems Lab (ECE-201)',
      comm: 'Communication Systems Lab (ECE-203)',
      vlsi: 'VLSI Computing Lab (ECE-301)'
    };
    return names[id] || id;
  };

  const activeReservationsCount = bookings.filter((b) => b.status === 'Approved').length;
  const pendingReservationsCount = bookings.filter((b) => b.status === 'Pending').length;
  const unresolvedIssuesCount = issues.filter((is) => is.status !== 'Resolved').length;

  return (
    <div className="max-w-6xl mx-auto my-6 px-4 font-sans" id="lab-booking-dashboard">
      
      {/* 1. Header Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 border border-indigo-850 p-4 rounded-2xl flex items-center space-x-4 text-white shadow-xl shadow-indigo-950/10">
          <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
            <Calendar className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 font-mono block uppercase tracking-widest">Active Booked Slots</span>
            <span className="text-2xl font-bold font-display text-white">{activeReservationsCount} Slots</span>
            <span className="text-[10px] text-amber-400 font-mono block">+{pendingReservationsCount} awaiting sessional check</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-950 to-slate-950 border border-rose-900/40 p-4 rounded-2xl flex items-center space-x-4 text-white shadow-xl">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300 font-mono block uppercase tracking-widest">Logged Defect Logs</span>
            <span className="text-2xl font-bold font-display text-white">{unresolvedIssuesCount} Defects</span>
            <span className="text-[10px] text-amber-500 font-mono block">Technician roster dispatched</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center space-x-4 text-white shadow-xl">
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <ShieldCheck className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-widest">Sessional Safety Compliance</span>
            <span className="text-2xl font-bold font-display text-white">99.2% Grounded</span>
            <span className="text-[10px] text-emerald-400 font-mono block">All DSO BNC probes calibrated</span>
          </div>
        </div>
      </div>

      {/* 2. Feedback Toasts (avoids alert limits!) */}
      {successMessage && (
        <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-mono mb-6 flex items-center space-x-3 shadow-md animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-rose-50 border-2 border-rose-200 text-rose-800 p-4 rounded-xl text-xs font-mono mb-6 flex items-center space-x-3 shadow-md animate-fadeIn">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
          <p className="font-semibold">{errorMessage}</p>
        </div>
      )}

      {/* 3. Sub-Tab Navigator */}
      <div className="flex border border-slate-250 p-1 bg-slate-50 rounded-xl max-w-sm mx-auto mb-10 shadow-inner">
        <button
          onClick={() => {
            setActiveSubTab('booking');
            setSuccessMessage(null);
          }}
          className={`flex-1 text-center py-2.5 text-xs font-mono tracking-wide rounded-lg transition-all duration-300 font-semibold ${
            activeSubTab === 'booking'
              ? 'bg-slate-900 text-white shadow'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Workbench Booker
        </button>
        <button
          onClick={() => {
            setActiveSubTab('issues');
            setSuccessMessage(null);
          }}
          className={`flex-1 text-center py-2.5 text-xs font-mono tracking-wide rounded-lg transition-all duration-300 font-semibold ${
            activeSubTab === 'issues'
              ? 'bg-slate-900 text-white shadow'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Fault Ticket logs
        </button>
      </div>

      {/* Tab Workspaces */}
      {activeSubTab === 'booking' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Reservation Form (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-lg flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
                <span>Reserve Workbench Desk</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Book an active digital training or storage oscilloscope desk in advance.</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs text-slate-700">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Jamir"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Roll Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 22ECE15"
                    value={bookRoll}
                    onChange={(e) => setBookRoll(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1.5">Laboratory Room</label>
                <select
                  value={bookLab}
                  onChange={(e) => setBookLab(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                >
                  <option value="analog">Analog Electronics (Room 102)</option>
                  <option value="digital">Digital Circuits (Room 104)</option>
                  <option value="embedded">Microprocessors (Room 201)</option>
                  <option value="comm">Communication Systems (Room 203)</option>
                  <option value="vlsi">VLSI & DSP Cluster (Room 301)</option>
                </select>
              </div>

              {/* Graphical Bench Selector (Replaces boring dropdown) */}
              <div>
                <label className="font-semibold text-slate-800 block mb-1.5 flex justify-between">
                  <span>Select Workbench Desk:</span>
                  <span className="text-indigo-600 font-bold font-mono">Desk #{bookBench}</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5 bg-slate-50 p-2 rounded-xl border">
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBookBench(num.toString())}
                      className={`p-2 text-center rounded border transition-all font-mono text-[10px] ${
                        bookBench === num.toString()
                          ? 'bg-slate-900 border-slate-900 text-white font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      #{num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Target Date</label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Timebase Slot</label>
                  <select
                    value={bookSlot}
                    onChange={(e) => setBookSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 - 01:00 PM</option>
                    <option value="02:00 PM - 03:30 PM">02:00 - 03:30 PM</option>
                    <option value="03:30 PM - 05:00 PM">03:30 - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1.5">Sessional Objective</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Assembling NAND gate inverter cascade on sessional breadboard"
                  value={bookPurpose}
                  onChange={(e) => setBookPurpose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-850 transition shadow-lg hover:-translate-y-0.5"
              >
                Request Sessional Pass
              </button>
            </form>
          </div>

          {/* Right panel: Sessional pass list representing ticket boards (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base">Active Pass Board Roster</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2.5 py-1 rounded border">
                  Sessional Gateways
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No active reservations currently. Use the form on the left to request a sessional pass.
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                  {bookings.map((b) => (
                    <div 
                      key={b.id} 
                      className="border border-slate-200 rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row relative bg-white group hover:border-slate-350 transition-all duration-300"
                    >
                      {/* Ticket Sidebar with sessional stamp design */}
                      <div className="bg-slate-950 p-4 flex md:flex-col items-center justify-between shrink-0 md:w-32 text-center text-white border-r-2 border-dashed border-slate-200">
                        <div className="space-y-1 md:my-auto">
                          <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block">PASS NO.</span>
                          <span className="text-xs font-mono font-bold block text-amber-400">NIT-{b.id.substring(b.id.length - 4).toUpperCase()}</span>
                        </div>
                        
                        {/* CSS Barcode graphic - extremely premium detail! */}
                        <div className="hidden md:flex flex-col items-center space-y-1.5 mt-4">
                          <div className="flex h-6 space-x-[1px] opacity-75">
                            {[1,3,1,2,3,1,2,1,3,2,1,1,3].map((w, idx) => (
                              <div key={idx} className="bg-white" style={{ width: `${w}px` }} />
                            ))}
                          </div>
                          <span className="text-[8px] font-mono text-slate-500">ECE DEPT</span>
                        </div>
                      </div>

                      {/* Ticket details body */}
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900 block">{b.studentName}</span>
                            <span
                              className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold border uppercase tracking-wider ${
                                b.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : b.status === 'Completed'
                                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block">Roll Reference: {b.rollNo}</span>
                          
                          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] font-mono text-slate-500">
                            <span className="flex items-center space-x-1.5">
                              <MapPin className="h-3.5 w-3.5 text-slate-400" />
                              <span>{getLabName(b.labId).split(' (')[0]}</span>
                            </span>
                            <span className="flex items-center space-x-1.5">
                              <Grid className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-indigo-600 font-bold">{b.workbenchNo}</span>
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 italic pt-1.5 leading-snug">
                            &quot;{b.purpose}&quot;
                          </p>
                        </div>

                        {/* Ticket Dates & Action block */}
                        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-slate-400 font-mono gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span>Date: <strong className="text-slate-600">{b.date}</strong></span>
                            </div>
                            <div>Slot: <strong className="text-slate-600">{b.timeSlot}</strong></div>
                          </div>

                          <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                            {b.status === 'Pending' && (
                              <button
                                onClick={() => handleApproveBooking(b.id)}
                                className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-mono text-[9px] font-bold shadow flex items-center space-x-1"
                              >
                                <UserCheck className="h-3 w-3" />
                                <span>APPROVE</span>
                              </button>
                            )}
                            {b.status === 'Approved' && (
                              <button
                                onClick={() => handleCompleteBooking(b.id)}
                                className="px-2.5 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded font-mono text-[9px] font-bold shadow flex items-center space-x-1"
                              >
                                <CheckCircle2 className="h-3 w-3" />
                                <span>MARK DONE</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="p-1 bg-slate-100 hover:bg-slate-200 hover:text-rose-600 text-slate-500 rounded transition"
                              title="Delete log"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-150 p-3 rounded-xl text-[10.5px] text-blue-900 mt-6 flex items-start space-x-2.5 leading-relaxed font-sans shadow-inner">
              <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <strong>Active Lab Guidelines:</strong> Confirm you have matching theory values configured before entering the physical workbench stations. Power down regulated power modules instantly upon sessional completion.
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Defective gear layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Defect Form (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-lg flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-rose-500 animate-spin-slow" />
                <span>Log Defective Apparatus</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">Report faulty logic ICs, blown power supplies, or screen defects.</p>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-4 text-xs text-slate-700">
              <div>
                <label className="font-semibold text-slate-800 block mb-1.5">Reporter Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Albert Naga"
                  value={issueName}
                  onChange={(e) => setIssueName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Laboratory</label>
                  <select
                    value={issueLab}
                    onChange={(e) => setIssueLab(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                  >
                    <option value="analog">Analog Electronics Lab</option>
                    <option value="digital">Digital Logic Lab</option>
                    <option value="embedded">Microprocessors Lab</option>
                    <option value="comm">Communication RF Lab</option>
                    <option value="vlsi">VLSI & DSP Computing</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Workbench Desk</label>
                  <select
                    value={issueBench}
                    onChange={(e) => setIssueBench(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                      <option key={num} value={num.toString()}>{`Workbench Desk #${num}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Defective Gear Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DSO probes model K-20"
                    value={issueEq}
                    onChange={(e) => setIssueEq(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1.5">Defect Severity</label>
                  <select
                    value={issueSeverity}
                    onChange={(e) => setIssueSeverity(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
                  >
                    <option value="Low">Low (Minor calibration drift)</option>
                    <option value="Medium">Medium (Partially functional channel)</option>
                    <option value="High">High (Dead device / Safety issue)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1.5">Detailed Issue Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Wave readout screen flickers continuously. High-frequency inputs generate extreme analog noise..."
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition shadow-lg hover:-translate-y-0.5"
              >
                Log Defect to Registry
              </button>
            </form>
          </div>

          {/* Right panel: Defect pass tickets (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base">Defect Registry logs</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2.5 py-1 rounded border">
                  Maintenance Tickets
                </span>
              </div>

              {issues.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No active equipment issues found. Outstanding lab maintenance!
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                  {issues.map((is) => (
                    <div 
                      key={is.id} 
                      className="border border-slate-200 rounded-2xl p-4.5 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 hover:border-slate-300 transition-all duration-300 shadow-inner relative"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs font-bold text-slate-900">{is.equipmentName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold border uppercase tracking-wider ${
                              is.severity === 'High'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : is.severity === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {is.severity} Severity
                          </span>
                        </div>
                        
                        <p className="text-[10px] text-slate-500 font-mono">
                          Location: {getLabName(is.labId).split(' (')[0]} • <strong className="text-indigo-600 font-semibold">Desk #{is.workbenchNo.split('#')[1]}</strong>
                        </p>
                        
                        <p className="text-xs text-slate-600 leading-snug font-sans">
                          {is.issueDescription}
                        </p>
                        
                        <p className="text-[9.5px] font-mono text-slate-400">
                          Logged by: <strong className="text-slate-500">{is.reporterName}</strong> | Status: <strong className="text-slate-600 uppercase">{is.status}</strong>
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2 shrink-0 self-stretch justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-150">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold border uppercase tracking-widest ${
                            is.status === 'Resolved'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : is.status === 'In Progress'
                              ? 'bg-amber-55/20 text-amber-700 border-amber-300 animate-pulse'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {is.status}
                        </span>

                        <div className="flex items-center space-x-1.5 pt-1">
                          {is.status !== 'Resolved' && (
                            <button
                              onClick={() => handleAdvanceIssue(is.id)}
                              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-[9px] font-bold rounded-lg transition-all shadow flex items-center space-x-1"
                            >
                              <Wrench className="h-3 w-3" />
                              <span>{is.status === 'Reported' ? 'FIX IN PROG' : 'RESOLVE'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteIssue(is.id)}
                            className="p-1.5 bg-slate-150 hover:bg-slate-250 hover:text-rose-600 text-slate-500 rounded transition"
                            title="Delete log entry"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-900 text-slate-400 border border-slate-800 p-3 rounded-xl text-[10px] mt-6 flex items-start space-x-2 leading-relaxed font-mono shadow-inner">
              <Tag className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Maintenance Log Policy:</strong> Sessional equipment faults must be registered immediately upon workshop conclusion to ensure technicians can restore bench kits for subsequent semester rotations.
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
