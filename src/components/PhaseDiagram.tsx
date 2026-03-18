"use client";

import { useState, useMemo, useCallback } from "react";
import { useRef, useEffect } from "react";
import { Thermometer } from "lucide-react";

interface PhaseRegion {
  name: string;
  color: string;
  points: [number, number][];
}

const systems = [
  {
    name: "Fe-C (Iron-Carbon)",
    xLabel: "Carbon %",
    yLabel: "Temperature (C)",
    regions: [
      { name: "Liquid", color: "#ef444480", points: [[0, 1538], [0.5, 1495], [2, 1148], [4.3, 1148], [6.67, 1148], [6.67, 1600], [0, 1600]] as [number, number][] },
      { name: "Austenite (γ)", color: "#3b82f680", points: [[0, 912], [0, 1394], [0.5, 1495], [2, 1148], [0.8, 727], [0, 727]] as [number, number][] },
      { name: "Ferrite (α)", color: "#22c55e80", points: [[0, 0], [0, 912], [0, 727], [0.02, 727], [0.02, 0]] as [number, number][] },
      { name: "Cementite + Pearlite", color: "#f59e0b80", points: [[0.02, 0], [0.02, 727], [0.8, 727], [6.67, 727], [6.67, 0]] as [number, number][] },
    ] as PhaseRegion[],
  },
  {
    name: "Cu-Ni (Copper-Nickel)",
    xLabel: "Nickel %",
    yLabel: "Temperature (C)",
    regions: [
      { name: "Liquid", color: "#ef444480", points: [[0, 1085], [20, 1200], [50, 1310], [80, 1400], [100, 1455], [100, 1600], [0, 1600]] as [number, number][] },
      { name: "Solid Solution (α)", color: "#3b82f680", points: [[0, 0], [0, 1085], [20, 1150], [50, 1250], [80, 1370], [100, 1455], [100, 0]] as [number, number][] },
    ] as PhaseRegion[],
  },
];

export default function PhaseDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number; phase: string } | null>(null);

  const system = systems[selectedSystem];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    const pad = { top: 30, right: 30, bottom: 50, left: 70 };
    const pw = w - pad.left - pad.right;
    const ph = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(100,116,139,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = pad.left + (pw * i) / 10;
      const y = pad.top + (ph * i) / 10;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, h - pad.bottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    }

    // Regions
    const xMax = system.name.includes("Fe-C") ? 6.67 : 100;
    const yMin = 0, yMax = 1600;
    const toX = (v: number) => pad.left + (v / xMax) * pw;
    const toY = (v: number) => pad.top + ((yMax - v) / (yMax - yMin)) * ph;

    system.regions.forEach((region) => {
      ctx.fillStyle = region.color;
      ctx.beginPath();
      region.points.forEach(([x, y], i) => {
        const px = toX(x);
        const py = toY(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();

      // Label
      const cx = region.points.reduce((s, p) => s + p[0], 0) / region.points.length;
      const cy = region.points.reduce((s, p) => s + p[1], 0) / region.points.length;
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(region.name, toX(cx), toY(cy));
    });

    // Axes
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, h - pad.bottom);
    ctx.lineTo(w - pad.right, h - pad.bottom);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    for (let i = 0; i <= 5; i++) {
      const xVal = (xMax * i) / 5;
      ctx.fillText(xVal.toFixed(1), toX(xVal), h - pad.bottom + 20);
    }
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const yVal = (yMax * i) / 4;
      ctx.fillText(`${yVal}`, pad.left - 10, toY(yVal) + 4);
    }

    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(system.xLabel, pad.left + pw / 2, h - 10);
    ctx.save();
    ctx.translate(15, pad.top + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(system.yLabel, 0, 0);
    ctx.restore();
  }, [selectedSystem]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Thermometer size={22} className="text-orange-400" /> Phase Diagram Viewer
        </h2>
        <p className="text-sm text-slate-400">Interactive binary phase diagrams</p>
      </div>

      <div className="flex gap-3">
        {systems.map((sys, i) => (
          <button
            key={i}
            onClick={() => setSelectedSystem(i)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedSystem === i ? "bg-orange-600 text-white" : "bg-gray-800 text-slate-400 hover:bg-gray-700"
            }`}
          >
            {sys.name}
          </button>
        ))}
      </div>

      <div className="flex-1 glass-panel p-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {system.regions.map((r) => (
          <div key={r.name} className="glass-panel p-3 flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: r.color.replace("80", "ff") }} />
            <span className="text-xs text-slate-300">{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
