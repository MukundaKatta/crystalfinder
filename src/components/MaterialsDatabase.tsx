"use client";

import { useState } from "react";
import { materials } from "@/lib/materials";
import { useCrystalStore } from "@/lib/store";
import { Search, Database, ChevronRight } from "lucide-react";

export default function MaterialsDatabase() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { selectedMaterial, setSelectedMaterial, setTab } = useCrystalStore();

  const categories = [...new Set(materials.map((m) => m.category))];

  const filtered = materials.filter((m) => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.formula.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || m.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database size={22} className="text-cyan-400" /> Materials Database
        </h2>
        <p className="text-sm text-slate-400">{materials.length} materials available</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-900/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((mat) => (
          <button
            key={mat.id}
            onClick={() => { setSelectedMaterial(mat.id); setTab("viewer"); }}
            className={`w-full glass-panel p-4 text-left transition-all hover:scale-[1.01] ${
              selectedMaterial === mat.id ? "ring-2 ring-cyan-500/50" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold" style={{ backgroundColor: mat.color + "30", color: mat.color }}>
                {mat.formula.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{mat.name}</span>
                  <span className="text-xs text-slate-500 font-mono">{mat.formula}</span>
                </div>
                <div className="flex gap-3 mt-1 text-xs text-slate-500">
                  <span>{mat.crystalSystem}</span>
                  <span>Eg: {mat.bandgap} eV</span>
                  <span>{mat.density} g/cm3</span>
                  <span className="text-cyan-400">{mat.category}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
