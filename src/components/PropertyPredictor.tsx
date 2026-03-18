"use client";

import { useState, useMemo } from "react";
import { predictProperties, periodicTable } from "@/lib/materials";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Sparkles, Plus, X } from "lucide-react";

export default function PropertyPredictor() {
  const [selectedElements, setSelectedElements] = useState<string[]>(["Si", "O"]);

  const predictions = useMemo(
    () => (selectedElements.length > 0 ? predictProperties(selectedElements) : null),
    [selectedElements]
  );

  const toggleElement = (symbol: string) => {
    setSelectedElements((prev) =>
      prev.includes(symbol) ? prev.filter((e) => e !== symbol) : [...prev, symbol]
    );
  };

  const propData = predictions
    ? Object.entries(predictions).map(([key, value]) => ({ name: key, value: Number(value) }))
    : [];

  const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#ef4444", "#f59e0b", "#22c55e"];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles size={22} className="text-purple-400" /> Property Predictor
        </h2>
        <p className="text-sm text-slate-400">Select elements to predict material properties</p>
      </div>

      {/* Selected Elements */}
      <div className="glass-panel p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-400">Composition:</span>
          {selectedElements.map((el) => {
            const elem = periodicTable.find((e) => e.symbol === el);
            return (
              <span key={el} className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
                {el}
                <button onClick={() => toggleElement(el)} className="hover:text-white"><X size={12} /></button>
              </span>
            );
          })}
          {selectedElements.length === 0 && <span className="text-xs text-slate-500">Click elements below</span>}
        </div>
      </div>

      {/* Element Selector */}
      <div className="glass-panel p-4">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Select Elements</h3>
        <div className="grid grid-cols-9 gap-1.5">
          {periodicTable.map((el) => (
            <button
              key={el.symbol}
              onClick={() => toggleElement(el.symbol)}
              className={`p-2 rounded-lg text-center transition-all ${
                selectedElements.includes(el.symbol)
                  ? "ring-2 ring-purple-500 bg-purple-500/20"
                  : "bg-gray-800/50 hover:bg-gray-700/50"
              }`}
            >
              <div className="text-[10px] text-slate-500">{el.number}</div>
              <div className="text-sm font-bold" style={{ color: el.color }}>{el.symbol}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Predictions */}
      {predictions && (
        <>
          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Predicted Properties</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={propData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {propData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(predictions).map(([key, value]) => (
              <div key={key} className="glass-panel p-4">
                <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                <div className="text-lg font-bold text-white mt-1">{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
