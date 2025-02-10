import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (game, toast) => {
        const state = get();

        if (game.platform === "Windows") game.platform = "PC (Windows)";
        if (game.platform === "Browser") game.platform = "Web Browser";

        if (state.favorites.some((fav) => fav.id === game.id)) {
          toast({
            title: "Ошибка",
            description: "Эта игра уже в избранном!",
            variant: "destructive",
          });
          return;
        }

        const newFavorite = {
          ...game,
          addedAt: new Date().toISOString(),
        };

        set({ favorites: [...state.favorites, newFavorite] });

        toast({
          title: "Добавлено в избранное",
          description: `"${game.title}" теперь в вашем списке избранного.`,
        });
      },
      removeFavorite: (id, toast) => {
        const state = get();
        const game = state.favorites.find((fav) => fav.id === id);

        if (!game) return;

        set({ favorites: state.favorites.filter((fav) => fav.id !== id) });

        toast({
          title: "Удалено из избранного",
          description: `"${game.title}" удалено из списка избранного.`,
        });
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
