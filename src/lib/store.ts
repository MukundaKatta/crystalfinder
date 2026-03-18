import { create } from "zustand";

export type TabMode = "viewer" | "database" | "predictor" | "phase" | "periodic";

interface CrystalStore {
  tab: TabMode;
  setTab: (t: TabMode) => void;
  selectedMaterial: string;
  setSelectedMaterial: (id: string) => void;
  rotationSpeed: number;
  setRotationSpeed: (v: number) => void;
}

export const useCrystalStore = create<CrystalStore>((set) => ({
  tab: "viewer",
  setTab: (t) => set({ tab: t }),
  selectedMaterial: "nacl",
  setSelectedMaterial: (id) => set({ selectedMaterial: id }),
  rotationSpeed: 0.5,
  setRotationSpeed: (v) => set({ rotationSpeed: v }),
}));
