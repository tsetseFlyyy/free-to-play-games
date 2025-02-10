import { create } from "zustand";

type FilteringStore = {
  platformValue: string;
  genreValue: string[] | string;
  sortingValue: string;
  currentPageType: "allGames" | "favorites";
  setPlatformValue: (value: string) => void;
  setGenreValue: (value: string[] | string) => void;
  setSortingValue: (value: string) => void;
  setPageType: (
    type: "allGames" | "favorites",
    setSelectedValues: (arg: []) => void
  ) => void;
};

export const useFiltering = create<FilteringStore>()((set) => ({
  platformValue: "",
  genreValue: "",
  sortingValue: "",
  currentPageType: "allGames",
  setPlatformValue: (value) => set({ platformValue: value }),
  setGenreValue: (value) => set({ genreValue: value }),
  setSortingValue: (value) => set({ sortingValue: value }),
  setPageType: (type, setSelectedValues) =>
    set((state) => {
      if (state.currentPageType !== type) {
        setSelectedValues([]);
        return {
          currentPageType: type,
          platformValue: "",
          genreValue: "",
          sortingValue: "",
        };
      }
      return state;
    }),
}));
