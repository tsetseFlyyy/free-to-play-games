import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGamesList() {
  return useQuery({
    queryKey: ["GAMES"],
    queryFn: async () => {
      const response = await fetch(
        "https://free-to-play-games-database.p.rapidapi.com/api/games",
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
