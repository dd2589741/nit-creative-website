import React, { useEffect, useRef } from 'react';

export default function EceBackgroundTraces() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight || window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // 1. Setup PCB nodes & traces
    // Generate a structured PCB circuit grid with microprocessors, capacitors, and conductive traces.
    interface PCBNode {
      x: number;
      y: number;
      type: 'ic' | 'capacitor' | 'resistor' | 'junction' | 'opamp' | 'diode' | 'inductor';
      label: string;
    }

    interface PCBTrace {
      path: Array<{ x: number; y: number }>;
      progress: number;
      speed: number;
      color: string;
    }

    const pcbNodes: PCBNode[] = [];
    const pcbTraces: PCBTrace[] = [];

    // Create custom nodes clustered in elegant coordinate bands
    const createCircuitLayout = () => {
      pcbNodes.length = 0;
      pcbTraces.length = 0;

      // Define some static virtual IC blocks or high-density component hubs
      const hubs = [
        { x: width * 0.15, y: height * 0.2, type: 'ic', label: 'GaAs_FET_v4' },
        { x: width * 0.85, y: height * 0.35, type: 'ic', label: 'UHV_SENS_v1' },
        { x: width * 0.25, y: height * 0.65, type: 'ic', label: 'RF_AMP_10G' },
        { x: width * 0.75, y: height * 0.8, type: 'ic', label: 'DAC_16BIT_XT' }
      ];

      hubs.forEach(hub => {
        if (hub.x < width && hub.y < height) {
          pcbNodes.push({
            x: hub.x,
            y: hub.y,
            type: hub.type as any,
            label: hub.label
          });

          // Add surrounding support components (capacitors, resistors)
          for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            const dist = 60 + Math.random() * 30;
            const cx = hub.x + Math.cos(angle) * dist;
            const cy = hub.y + Math.sin(angle) * dist;

            if (cx > 0 && cx < width && cy > 0 && cy < height) {
              const types: Array<'capacitor' | 'resistor' | 'opamp' | 'diode' | 'inductor'> = [
                'capacitor', 'resistor', 'opamp', 'diode', 'inductor'
              ];
              const randomType = types[Math.floor(Math.random() * types.length)];

              pcbNodes.push({
                x: cx,
                y: cy,
                type: randomType,
                label: ''
              });

              // Construct standard 90-degree orthogonal trace paths to follow standard PCB layouts
              const path = [
                { x: hub.x, y: hub.y },
                { x: hub.x, y: cy }, // Orthogonal bend
                { x: cx, y: cy }
              ];

              pcbTraces.push({
                path,
                progress: Math.random(),
                speed: 0.002 + Math.random() * 0.003,
                color: 'rgba(37, 99, 235, 0.4)' // blueprint blue
              });
            }
          }
        }
      });

      // Add long cross-page data-bus lines
      for (let j = 0; j < 5; j++) {
        const startY = height * (0.15 + j * 0.18);
        const path = [
          { x: 0, y: startY },
          { x: width * 0.35, y: startY },
          { x: width * 0.45, y: startY + 40 },
          { x: width * 0.7, y: startY + 40 },
          { x: width * 0.8, y: startY },
          { x: width, y: startY }
        ];

        pcbTraces.push({
          path,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          color: j % 2 === 0 ? 'rgba(37, 99, 235, 0.35)' : 'rgba(20, 184, 166, 0.3)'
        });
      }
    };

    createCircuitLayout();

    // Re-layout when dimensions scale
    const oldWidth = width;
    if (oldWidth !== width) {
      createCircuitLayout();
    }

    // Interactive mouse, sparks & particle systems
    const mouse = { x: 0, y: 0, active: false };
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
    }
    const sparks: Spark[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Spawn electrical static sparks on mouse motion
      if (Math.random() > 0.4) {
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1.0,
          size: 1.5 + Math.random() * 2.5,
          color: Math.random() > 0.55 ? '#3b82f6' : '#10b981'
        });
      }
    };

    const handleMouseEnter = () => {
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // 2. Draw Soft Oscilloscope/Spectrum Gridlines in the background
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines
      const gridSpacingY = 80;
      for (let y = gridSpacingY; y < height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Dotted ticks
        ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
        for (let x = 40; x < width; x += 40) {
          ctx.fillRect(x - 1, y - 4, 2, 8);
        }
      }

      // Vertical grid lines
      const gridSpacingX = 120;
      for (let x = gridSpacingX; x < width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Dotted ticks
        for (let y = 40; y < height; y += 40) {
          ctx.fillRect(x - 4, y - 1, 8, 2);
        }
      }

      // 3. Draw Oscilloscope Signal Waveforms
      // Channels: CH1 (Sine wave), CH2 (Analog Signal), CH3 (Phase modulated high-freq carrier)
      const channels = [
        {
          amplitude: 45,
          frequency: 0.0025,
          speed: 0.04,
          color: 'rgba(37, 99, 235, 0.09)', // Very subtle blue wave
          lineWidth: 1.5,
          yOffset: height * 0.3
        },
        {
          amplitude: 30,
          frequency: 0.006,
          speed: -0.06,
          color: 'rgba(16, 185, 129, 0.07)', // Soft emerald signal wave
          lineWidth: 1,
          yOffset: height * 0.5
        },
        {
          amplitude: 60,
          frequency: 0.0015,
          speed: 0.02,
          color: 'rgba(168, 85, 247, 0.06)', // Purple modulated signal wave
          lineWidth: 2,
          yOffset: height * 0.75
        }
      ];

      channels.forEach(ch => {
        ctx.beginPath();
        ctx.strokeStyle = ch.color;
        ctx.lineWidth = ch.lineWidth;
        
        for (let x = 0; x < width; x += 5) {
          const shift = frame * ch.speed;
          
          // Warp signal slightly if mouse is nearby (simulation of field induction interference)
          let warp = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = ch.yOffset - mouse.y;
            const mouseDist = Math.sqrt(dx * dx + dy * dy);
            if (mouseDist < 140) {
              const factor = (140 - mouseDist) / 140;
              // High frequency magnetic chatter
              warp = Math.sin(frame * 0.2 + x * 0.05) * 15 * factor;
            }
          }

          // Compound wave function
          const y = ch.yOffset + 
            Math.sin(x * ch.frequency + shift) * ch.amplitude +
            Math.cos(x * 0.008 - shift * 0.5) * (ch.amplitude * 0.3) + warp;
            
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // 4. Draw PCB Copper Traces and Pulsing Electrons
      pcbTraces.forEach(trace => {
        if (trace.path.length < 2) return;

        // Draw the trace copper path (dim baseline line)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.25)'; // slate-200 equivalent
        ctx.lineWidth = 1;
        ctx.moveTo(trace.path[0].x, trace.path[0].y);
        for (let i = 1; i < trace.path.length; i++) {
          ctx.lineTo(trace.path[i].x, trace.path[i].y);
        }
        ctx.stroke();

        // Calculate current position of the flowing electron signal
        trace.progress += trace.speed;
        if (trace.progress > 1) {
          trace.progress = 0;
        }

        // Linear interpolation along the multi-segmented path
        const totalSegments = trace.path.length - 1;
        const segmentIndex = Math.min(
          totalSegments - 1,
          Math.floor(trace.progress * totalSegments)
        );
        const segmentProgress = (trace.progress * totalSegments) - segmentIndex;

        const p1 = trace.path[segmentIndex];
        const p2 = trace.path[segmentIndex + 1];

        if (p1 && p2) {
          const signalX = p1.x + (p2.x - p1.x) * segmentProgress;
          const signalY = p1.y + (p2.y - p1.y) * segmentProgress;

          // Draw the pulsing electron node
          ctx.beginPath();
          ctx.arc(signalX, signalY, 3, 0, Math.PI * 2);
          ctx.fillStyle = trace.color.replace('0.35', '0.85').replace('0.3', '0.8').replace('0.4', '0.9');
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 5. Draw Component Nodes (ICs, Capacitors, Pins)
      pcbNodes.forEach(node => {
        ctx.beginPath();
        if (node.type === 'ic') {
          // Microchip block
          ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.fillRect(node.x - 24, node.y - 14, 48, 28);
          ctx.strokeRect(node.x - 24, node.y - 14, 48, 28);

          // Draw silicon pins
          ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
          for (let p = -18; p <= 18; p += 9) {
            ctx.fillRect(node.x + p - 2, node.y - 18, 4, 4); // top pins
            ctx.fillRect(node.x + p - 2, node.y + 14, 4, 4); // bottom pins
          }

          // Label
          ctx.fillStyle = 'rgba(100, 116, 139, 0.65)';
          ctx.font = '7px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + 3);
        } else if (node.type === 'capacitor') {
          // Circular capacitor pad
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.fill();
          ctx.stroke();

          // Core node point
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#2563eb';
          ctx.fill();
        } else if (node.type === 'resistor') {
          // Resistor outline box
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.lineWidth = 1.2;
          ctx.fillRect(node.x - 8, node.y - 3, 16, 6);
          ctx.strokeRect(node.x - 8, node.y - 3, 16, 6);

          // Draw color stripes
          ctx.fillStyle = '#ef4444'; // Red stripe
          ctx.fillRect(node.x - 4, node.y - 3, 1.5, 6);
          ctx.fillStyle = '#eab308'; // Yellow stripe
          ctx.fillRect(node.x, node.y - 3, 1.5, 6);
          ctx.fillStyle = '#3b82f6'; // Blue stripe
          ctx.fillRect(node.x + 3, node.y - 3, 1.5, 6);
        } else if (node.type === 'opamp') {
          // OP-AMP triangle pointing right
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.moveTo(node.x - 7, node.y - 7);
          ctx.lineTo(node.x - 7, node.y + 7);
          ctx.lineTo(node.x + 7, node.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Inputs pins lines
          ctx.beginPath();
          ctx.moveTo(node.x - 12, node.y - 3);
          ctx.lineTo(node.x - 7, node.y - 3);
          ctx.moveTo(node.x - 12, node.y + 3);
          ctx.lineTo(node.x - 7, node.y + 3);
          // Output pin line
          ctx.moveTo(node.x + 7, node.y);
          ctx.lineTo(node.x + 12, node.y);
          ctx.stroke();
        } else if (node.type === 'diode') {
          // Standard semiconductor diode
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.moveTo(node.x - 5, node.y - 5);
          ctx.lineTo(node.x - 5, node.y + 5);
          ctx.lineTo(node.x + 3, node.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Cathode bar
          ctx.beginPath();
          ctx.moveTo(node.x + 3, node.y - 5);
          ctx.lineTo(node.x + 3, node.y + 5);
          ctx.stroke();

          // Lead lines
          ctx.beginPath();
          ctx.moveTo(node.x - 10, node.y);
          ctx.lineTo(node.x - 5, node.y);
          ctx.moveTo(node.x + 3, node.y);
          ctx.lineTo(node.x + 8, node.y);
          ctx.stroke();
        } else if (node.type === 'inductor') {
          // Coil/inductor loops
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          for (let h = 0; h < 3; h++) {
            const startX = node.x - 8 + h * 5;
            ctx.arc(startX + 2.5, node.y, 2.5, Math.PI, 0, false);
          }
          ctx.stroke();

          // Lead lines
          ctx.beginPath();
          ctx.moveTo(node.x - 12, node.y);
          ctx.lineTo(node.x - 8, node.y);
          ctx.moveTo(node.x + 7, node.y);
          ctx.lineTo(node.x + 11, node.y);
          ctx.stroke();
        }
      });

      // Update and draw live interactive static sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.022;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw interactive CAD / Oscilloscope probe target overlay
      if (mouse.active) {
        // Orthogonal dashed coordinate crosshair
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.07)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Radiating field ring animations
        const radarRadius = 15 + (frame % 35) * 1.5;
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radarRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.09)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing node center point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
        ctx.fill();

        // Draw HUD tooltip
        ctx.fillStyle = 'rgba(15, 23, 42, 0.82)'; // Slate-900 background
        ctx.fillRect(mouse.x + 14, mouse.y - 32, 98, 42);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(mouse.x + 14, mouse.y - 32, 98, 42);

        // Simulated high-fidelity voltage probe readout
        const calcVolts = (1.5 + Math.abs(Math.sin((mouse.x + mouse.y) * 0.002 + frame * 0.02) * 3.3)).toFixed(3);

        ctx.fillStyle = '#10b981';
        ctx.font = '7.5px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`PROBE: ACTIVE`, mouse.x + 18, mouse.y - 22);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(`V_IND: ${calcVolts} V`, mouse.x + 18, mouse.y - 13);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.fillText(`RF_SIG: -48.4 dBm`, mouse.x + 18, mouse.y - 5);
        ctx.fillText(`COORD: ${Math.round(mouse.x)}, ${Math.round(mouse.y)}`, mouse.x + 18, mouse.y + 3);
      }

      // 6. Draw Laboratory Screen Overlay HUD (Technical Corner Readouts)
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      
      // Top Left Lab Info
      ctx.fillText(`ECE_SCANNER: LIVE`, 15, 20);
      ctx.fillText(`SWEEP_RATE: 2.00ms/Div`, 15, 32);
      ctx.fillText(`SAMPLING: 5.0 GS/s`, 15, 44);

      // Top Right System Status
      ctx.textAlign = 'right';
      ctx.fillText(`TRIGGER: READY (AUTO)`, width - 15, 20);
      ctx.fillText(`BANDWIDTH: 1.20 GHz`, width - 15, 32);
      ctx.fillText(`DST-FIST FACILITY LAB #3`, width - 15, 44);

      // Bottom Left Channels
      ctx.textAlign = 'left';
      ctx.fillText(`CH1: 200mV~  CH2: 500mV~  CH3: 100mV~`, 15, height - 15);

      // Bottom Right Coupling info
      ctx.textAlign = 'right';
      ctx.fillText(`COUPLING MODE: AC 50Ω`, width - 15, height - 15);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
