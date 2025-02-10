import { create } from "zustand";

type PaginationStore = {
  pageSize: number;
  currentPage: number;
  currentPageType: "allGames" | "favorites";
  setPageSize: (size: number, type: "allGames" | "favorites") => void;
  setCurrentPage: (currentNum: number, type: "allGames" | "favorites") => void;
  setPageType: (type: "allGames" | "favorites") => void;
};

export const usePaginationStore = create<PaginationStore>()((set) => ({
  pageSize: 10,
  currentPage: 1,
  currentPageType: "allGames",
  setPageSize: (size, type) =>
    set((state) => (state.currentPageType === type ? { pageSize: size } : {})),
  setCurrentPage: (currentNum, type) =>
    set((state) =>
      state.currentPageType === type ? { currentPage: currentNum } : {}
    ),
  setPageType: (type) => set({ currentPageType: type }),
}));
