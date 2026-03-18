"use client";

import { useState } from "react";
import { periodicTable } from "@/lib/materials";
import { Atom } from "lucide-react";

const categoryColors: Record<string, string> = {
  "nonmetal": "#22c55e",
  "noble-gas": "#06b6d4",
  "alkali-metal": "#ef4444",
  "alkaline-earth": "#f59e0b",
  "metalloid": "#8b5cf6",
  "post-transition": "#3b82f6",
  "transition-metal": "#64748b",
  "halogen": "#ec4899",
};

export default function PeriodicTableView() {
  const [selected, setSelected] = useState<typeof periodicTable[0] | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState("");

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Atom size={22} className="text-cyan-400" /> Periodic Table
        </h2>
        <p className="text-sm text-slate-400">Interactive periodic table of elements</p>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <button
            key={cat}
            onMouseEnter={() => setHoveredCategory(cat)}
            onMouseLeave={() => setHoveredCategory("")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
              hoveredCategory === cat ? "bg-gray-700" : "bg-gray-800/50"
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-slate-400 capitalize">{cat.replace("-", " ")}</span>
          </button>
        ))}
      </div>

      {/* Table Grid */}
      <div className="glass-panel p-6">
        <div className="grid grid-cols-9 gap-2">
          {periodicTable.map((el) => {
            const isHighlighted = !hoveredCategory || el.category === hoveredCategory;
            return (
              <button
                key={el.symbol}
                onClick={() => setSelected(el)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selected?.symbol === el.symbol
                    ? "ring-2 ring-cyan-500 scale-105"
                    : "hover:scale-105"
                } ${isHighlighted ? "opacity-100" : "opacity-30"}`}
                style={{
                  backgroundColor: (categoryColors[el.category] || "#64748b") + "20",
                  borderColor: categoryColors[el.category] || "#64748b",
                  borderWidth: "1px",
                }}
              >
                <div className="text-[10px] text-slate-500">{el.number}</div>
                <div className="text-lg font-bold" style={{ color: categoryColors[el.category] }}>
                  {el.symbol}
                </div>
                <div className="text-[9px] text-slate-500 truncate">{el.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Element Detail */}
      {selected && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-xl flex flex-col items-center justify-center"
              style={{ backgroundColor: (categoryColors[selected.category] || "#64748b") + "30" }}
            >
              <span className="text-3xl font-bold" style={{ color: categoryColors[selected.category] }}>
                {selected.symbol}
              </span>
              <span className="text-xs text-slate-400">{selected.number}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
              <p className="text-sm text-slate-400 capitalize">{selected.category.replace("-", " ")}</p>
              <p className="text-xs text-slate-500 mt-1">Atomic Number: {selected.number}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
