import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGamesList({ platform, genre, sortBy }) {
  return useQuery({
    queryKey: ["games", platform, genre, sortBy],
    queryFn: async () => {
      const url = new URL(
        "https://free-to-play-games-database.p.rapidapi.com/api/games"
      );

      if (platform) url.searchParams.append("platform", platform);
      if (genre) url.searchParams.append("category", genre);
      if (sortBy) url.searchParams.append("sort-by", sortBy);

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }

      return response.json();
    },
    placeholderData: keepPreviousData,
  });
}

export function useGameById(id: number) {
  return useQuery({
    queryKey: ["GAMES", id],
    queryFn: async () => {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }

      return response.json();
    },
    placeholderData: keepPreviousData,
  });
}
