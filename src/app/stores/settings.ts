import { create } from "zustand";

interface useSettingStore {
  languageState: string[];
  quantityState: number;
  setLanguage: (state: string[]) => void;
  setQuantity: (state: number) => void;
}

export const useSettingStore = create<useSettingStore>((set) => ({
  languageState: ["한국어"],
  quantityState: 10,
  setLanguage: (state) => set({ languageState: state }),
  setQuantity: (state) => set({ quantityState: state }),
}));
