import { useState } from "react";

import { columns } from "@/app/games/columns";
import { DataTable } from "@/app/games/data-table";

import { useGamesList } from "@/shared/api/games";

export function MainPage() {
  const [platformValue, setPlatformValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string[] | string>("");
  const [sortingValue, setSortingValue] = useState<string>("");

  const { data, isFetching } = useGamesList({
    platform: platformValue,
    genre: genreValue,
    sortBy: sortingValue,
  });

  if (isFetching) {
    return (
      <div className="container mx-auto flex flex-col gap-4 mt-16">
        <div className="w-full h-52 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-full h-52 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-full h-52 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-full h-52 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        platformValue={platformValue}
        setPlatformValue={setPlatformValue}
        genreValue={genreValue}
        setGenreValue={setGenreValue}
        sortingValue={sortingValue}
        setSortingValue={setSortingValue}
      />
    </div>
  );
}
