import { create } from "zustand";

const useDashboardStore = create((set) => ({
    files: [],
    isGrid: true,
    setIsGrid: (value) => set({ isGrid: value }),
    setFiles: (files) => set({ files }),
}));

export default useDashboardStore;