import { create } from "zustand";

type FilteringStore = {
  platformValue: string;
  genreValue: string[] | string;
  sortingValue: string;
  setPlatformValue: (value: string) => void;
  setGenreValue: (value: string[] | string) => void;
  setSortingValue: (value: string) => void;
};

export const useFiltering = create<FilteringStore>()((set) => ({
  platformValue: "",
  genreValue: "",
  sortingValue: "",
  setPlatformValue: (value) => set({ platformValue: value }),
  setGenreValue: (value) => set({ genreValue: value }),
  setSortingValue: (value) => set({ sortingValue: value }),
}));
