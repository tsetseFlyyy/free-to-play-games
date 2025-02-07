import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["games"],
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
  });

  return (
    <div>
      {data &&
        !isPending &&
        data.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
          </div>
        ))}
    </div>
  );
}

export default App;
