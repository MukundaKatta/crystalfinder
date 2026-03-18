export interface Material {
  id: string;
  name: string;
  formula: string;
  crystalSystem: string;
  spaceGroup: string;
  bandgap: number;
  density: number;
  hardness: number;
  thermalConductivity: number;
  electricalConductivity: string;
  color: string;
  category: string;
  atoms: { element: string; x: number; y: number; z: number; radius: number; color: string }[];
  bonds: [number, number][];
  latticeParams: { a: number; b: number; c: number; alpha: number; beta: number; gamma: number };
}

export const materials: Material[] = [
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl",
    crystalSystem: "Cubic",
    spaceGroup: "Fm-3m",
    bandgap: 8.5,
    density: 2.165,
    hardness: 2.5,
    thermalConductivity: 6.5,
    electricalConductivity: "Insulator",
    color: "#a0d2db",
    category: "Ionic",
    atoms: [
      { element: "Na", x: 0, y: 0, z: 0, radius: 0.3, color: "#8b5cf6" },
      { element: "Cl", x: 1, y: 0, z: 0, radius: 0.4, color: "#22c55e" },
      { element: "Na", x: 1, y: 1, z: 0, radius: 0.3, color: "#8b5cf6" },
      { element: "Cl", x: 0, y: 1, z: 0, radius: 0.4, color: "#22c55e" },
      { element: "Na", x: 0, y: 0, z: 1, radius: 0.3, color: "#8b5cf6" },
      { element: "Cl", x: 1, y: 0, z: 1, radius: 0.4, color: "#22c55e" },
      { element: "Na", x: 1, y: 1, z: 1, radius: 0.3, color: "#8b5cf6" },
      { element: "Cl", x: 0, y: 1, z: 1, radius: 0.4, color: "#22c55e" },
    ],
    bonds: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
    latticeParams: { a: 5.64, b: 5.64, c: 5.64, alpha: 90, beta: 90, gamma: 90 },
  },
  {
    id: "diamond",
    name: "Diamond",
    formula: "C",
    crystalSystem: "Cubic",
    spaceGroup: "Fd-3m",
    bandgap: 5.47,
    density: 3.515,
    hardness: 10,
    thermalConductivity: 2200,
    electricalConductivity: "Insulator",
    color: "#e0f0ff",
    category: "Covalent",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, radius: 0.25, color: "#94a3b8" },
      { element: "C", x: 0.5, y: 0.5, z: 0, radius: 0.25, color: "#94a3b8" },
      { element: "C", x: 0.5, y: 0, z: 0.5, radius: 0.25, color: "#94a3b8" },
      { element: "C", x: 0, y: 0.5, z: 0.5, radius: 0.25, color: "#94a3b8" },
      { element: "C", x: 0.25, y: 0.25, z: 0.25, radius: 0.25, color: "#cbd5e1" },
      { element: "C", x: 0.75, y: 0.75, z: 0.25, radius: 0.25, color: "#cbd5e1" },
      { element: "C", x: 0.75, y: 0.25, z: 0.75, radius: 0.25, color: "#cbd5e1" },
      { element: "C", x: 0.25, y: 0.75, z: 0.75, radius: 0.25, color: "#cbd5e1" },
    ],
    bonds: [[0,4],[1,5],[2,6],[3,7],[4,1],[4,2],[4,3],[5,0],[5,2],[5,3],[6,0],[6,1]],
    latticeParams: { a: 3.57, b: 3.57, c: 3.57, alpha: 90, beta: 90, gamma: 90 },
  },
  {
    id: "si",
    name: "Silicon",
    formula: "Si",
    crystalSystem: "Cubic",
    spaceGroup: "Fd-3m",
    bandgap: 1.12,
    density: 2.329,
    hardness: 6.5,
    thermalConductivity: 149,
    electricalConductivity: "Semiconductor",
    color: "#6366f1",
    category: "Semiconductor",
    atoms: [
      { element: "Si", x: 0, y: 0, z: 0, radius: 0.35, color: "#6366f1" },
      { element: "Si", x: 0.5, y: 0.5, z: 0, radius: 0.35, color: "#6366f1" },
      { element: "Si", x: 0.5, y: 0, z: 0.5, radius: 0.35, color: "#818cf8" },
      { element: "Si", x: 0, y: 0.5, z: 0.5, radius: 0.35, color: "#818cf8" },
      { element: "Si", x: 0.25, y: 0.25, z: 0.25, radius: 0.35, color: "#a5b4fc" },
      { element: "Si", x: 0.75, y: 0.75, z: 0.25, radius: 0.35, color: "#a5b4fc" },
    ],
    bonds: [[0,4],[1,5],[2,4],[3,5],[4,1],[5,0]],
    latticeParams: { a: 5.43, b: 5.43, c: 5.43, alpha: 90, beta: 90, gamma: 90 },
  },
  {
    id: "gaas",
    name: "Gallium Arsenide",
    formula: "GaAs",
    crystalSystem: "Cubic",
    spaceGroup: "F-43m",
    bandgap: 1.42,
    density: 5.316,
    hardness: 4.5,
    thermalConductivity: 55,
    electricalConductivity: "Semiconductor",
    color: "#f59e0b",
    category: "Semiconductor",
    atoms: [
      { element: "Ga", x: 0, y: 0, z: 0, radius: 0.3, color: "#f59e0b" },
      { element: "As", x: 0.25, y: 0.25, z: 0.25, radius: 0.35, color: "#a855f7" },
      { element: "Ga", x: 0.5, y: 0.5, z: 0, radius: 0.3, color: "#f59e0b" },
      { element: "As", x: 0.75, y: 0.75, z: 0.25, radius: 0.35, color: "#a855f7" },
      { element: "Ga", x: 0.5, y: 0, z: 0.5, radius: 0.3, color: "#fbbf24" },
      { element: "As", x: 0.75, y: 0.25, z: 0.75, radius: 0.35, color: "#c084fc" },
    ],
    bonds: [[0,1],[2,3],[4,5],[1,2],[3,4]],
    latticeParams: { a: 5.65, b: 5.65, c: 5.65, alpha: 90, beta: 90, gamma: 90 },
  },
  {
    id: "tio2",
    name: "Titanium Dioxide",
    formula: "TiO2",
    crystalSystem: "Tetragonal",
    spaceGroup: "P42/mnm",
    bandgap: 3.0,
    density: 4.23,
    hardness: 6.5,
    thermalConductivity: 8.5,
    electricalConductivity: "Insulator",
    color: "#f0f0f0",
    category: "Oxide",
    atoms: [
      { element: "Ti", x: 0, y: 0, z: 0, radius: 0.35, color: "#64748b" },
      { element: "O", x: 0.3, y: 0.3, z: 0, radius: 0.25, color: "#ef4444" },
      { element: "O", x: -0.3, y: -0.3, z: 0, radius: 0.25, color: "#ef4444" },
      { element: "Ti", x: 0.5, y: 0.5, z: 0.5, radius: 0.35, color: "#64748b" },
      { element: "O", x: 0.8, y: 0.2, z: 0.5, radius: 0.25, color: "#ef4444" },
      { element: "O", x: 0.2, y: 0.8, z: 0.5, radius: 0.25, color: "#ef4444" },
    ],
    bonds: [[0,1],[0,2],[3,4],[3,5]],
    latticeParams: { a: 4.59, b: 4.59, c: 2.96, alpha: 90, beta: 90, gamma: 90 },
  },
];

export const periodicTable: { symbol: string; name: string; number: number; category: string; color: string }[] = [
  { symbol: "H", name: "Hydrogen", number: 1, category: "nonmetal", color: "#22c55e" },
  { symbol: "He", name: "Helium", number: 2, category: "noble-gas", color: "#06b6d4" },
  { symbol: "Li", name: "Lithium", number: 3, category: "alkali-metal", color: "#ef4444" },
  { symbol: "Be", name: "Beryllium", number: 4, category: "alkaline-earth", color: "#f59e0b" },
  { symbol: "B", name: "Boron", number: 5, category: "metalloid", color: "#8b5cf6" },
  { symbol: "C", name: "Carbon", number: 6, category: "nonmetal", color: "#22c55e" },
  { symbol: "N", name: "Nitrogen", number: 7, category: "nonmetal", color: "#22c55e" },
  { symbol: "O", name: "Oxygen", number: 8, category: "nonmetal", color: "#22c55e" },
  { symbol: "F", name: "Fluorine", number: 9, category: "halogen", color: "#ec4899" },
  { symbol: "Ne", name: "Neon", number: 10, category: "noble-gas", color: "#06b6d4" },
  { symbol: "Na", name: "Sodium", number: 11, category: "alkali-metal", color: "#ef4444" },
  { symbol: "Mg", name: "Magnesium", number: 12, category: "alkaline-earth", color: "#f59e0b" },
  { symbol: "Al", name: "Aluminium", number: 13, category: "post-transition", color: "#3b82f6" },
  { symbol: "Si", name: "Silicon", number: 14, category: "metalloid", color: "#8b5cf6" },
  { symbol: "P", name: "Phosphorus", number: 15, category: "nonmetal", color: "#22c55e" },
  { symbol: "S", name: "Sulfur", number: 16, category: "nonmetal", color: "#22c55e" },
  { symbol: "Cl", name: "Chlorine", number: 17, category: "halogen", color: "#ec4899" },
  { symbol: "Ar", name: "Argon", number: 18, category: "noble-gas", color: "#06b6d4" },
  { symbol: "K", name: "Potassium", number: 19, category: "alkali-metal", color: "#ef4444" },
  { symbol: "Ca", name: "Calcium", number: 20, category: "alkaline-earth", color: "#f59e0b" },
  { symbol: "Ti", name: "Titanium", number: 22, category: "transition-metal", color: "#64748b" },
  { symbol: "Fe", name: "Iron", number: 26, category: "transition-metal", color: "#64748b" },
  { symbol: "Cu", name: "Copper", number: 29, category: "transition-metal", color: "#64748b" },
  { symbol: "Zn", name: "Zinc", number: 30, category: "transition-metal", color: "#64748b" },
  { symbol: "Ga", name: "Gallium", number: 31, category: "post-transition", color: "#3b82f6" },
  { symbol: "Ge", name: "Germanium", number: 32, category: "metalloid", color: "#8b5cf6" },
  { symbol: "As", name: "Arsenic", number: 33, category: "metalloid", color: "#8b5cf6" },
  { symbol: "Au", name: "Gold", number: 79, category: "transition-metal", color: "#64748b" },
];

export function predictProperties(elements: string[]): Record<string, number> {
  const n = elements.length;
  return {
    bandgap: Math.round((1 + Math.random() * 5) * 100) / 100,
    density: Math.round((2 + n * 1.5 + Math.random() * 3) * 100) / 100,
    hardness: Math.round((1 + Math.random() * 9) * 10) / 10,
    thermalConductivity: Math.round(10 + Math.random() * 500),
    meltingPoint: Math.round(300 + Math.random() * 3000),
    bulkModulus: Math.round(20 + Math.random() * 400),
    formationEnergy: Math.round((-3 + Math.random() * 3) * 100) / 100,
  };
}
