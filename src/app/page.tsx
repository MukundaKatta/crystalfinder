"use client";

import dynamic from "next/dynamic";
import { useCrystalStore, TabMode } from "@/lib/store";
import { materials } from "@/lib/materials";
import MaterialsDatabase from "@/components/MaterialsDatabase";
import PropertyPredictor from "@/components/PropertyPredictor";
import PhaseDiagram from "@/components/PhaseDiagram";
import PeriodicTableView from "@/components/PeriodicTableView";
import { Gem, Eye, Database, Sparkles, Thermometer, Atom } from "lucide-react";

const CrystalViewer = dynamic(() => import("@/components/CrystalViewer"), { ssr: false });

const tabs: { key: TabMode; label: string; icon: React.ReactNode }[] = [
  { key: "viewer", label: "3D Viewer", icon: <Eye size={18} /> },
  { key: "database", label: "Database", icon: <Database size={18} /> },
  { key: "predictor", label: "Predictor", icon: <Sparkles size={18} /> },
  { key: "phase", label: "Phase Diagrams", icon: <Thermometer size={18} /> },
  { key: "periodic", label: "Periodic Table", icon: <Atom size={18} /> },
];

export default function HomePage() {
  const { tab, setTab, selectedMaterial, setSelectedMaterial, rotationSpeed, setRotationSpeed } = useCrystalStore();

  const material = materials.find((m) => m.id === selectedMaterial) || materials[0];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <div className="w-72 h-full glass-panel flex flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Gem size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CrystalFinder</h1>
              <p className="text-xs text-slate-400">Materials Discovery</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                tab === t.key
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:bg-gray-800/50 hover:text-slate-200"
              }`}
            >
              {t.icon}
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Material Selector (for viewer) */}
        {tab === "viewer" && (
          <div className="flex-1 p-3 border-t border-gray-700/50 overflow-y-auto">
            <p className="text-xs text-slate-500 px-3 mb-2">Select Crystal</p>
            <div className="space-y-1">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    selectedMaterial === m.id
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-400 hover:bg-gray-800/50"
                  }`}
                >
                  <span className="font-mono text-xs mr-2">{m.formula}</span>
                  {m.name}
                </button>
              ))}
            </div>
            <div className="mt-4 px-3">
              <label className="text-xs text-slate-500">Rotation Speed</label>
              <input
                type="range" min={0} max={2} step={0.1} value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          </div>
        )}

        {/* Material Info */}
        {tab === "viewer" && (
          <div className="p-4 border-t border-gray-700/50">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-slate-500">System:</span> <span className="text-white">{material.crystalSystem}</span></div>
              <div><span className="text-slate-500">Group:</span> <span className="text-white">{material.spaceGroup}</span></div>
              <div><span className="text-slate-500">Bandgap:</span> <span className="text-white">{material.bandgap} eV</span></div>
              <div><span className="text-slate-500">Density:</span> <span className="text-white">{material.density}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-hidden">
        {tab === "viewer" && <CrystalViewer />}
        {tab === "database" && <MaterialsDatabase />}
        {tab === "predictor" && <PropertyPredictor />}
        {tab === "phase" && <PhaseDiagram />}
        {tab === "periodic" && <PeriodicTableView />}
      </div>
    </div>
  );
}
