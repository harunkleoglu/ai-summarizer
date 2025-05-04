import { create } from "zustand";

const useSearchBoxStore = create((set) => ({
    isVisible: false,
    searchQuery: "",
    toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
    setSearchQuery: (query) => set({ searchQuery: query }),
    clearSearchQuery: () => set({ searchQuery: "" }),
}));

export default useSearchBoxStore;