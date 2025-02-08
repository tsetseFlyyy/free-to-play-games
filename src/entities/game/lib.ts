import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (game) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === game.id)
            ? state.favorites
            : [...state.favorites, game],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
    }),
    {
      name: "favorites-storage", // Имя ключа в localStorage
    }
  )
);
