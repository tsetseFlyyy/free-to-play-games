import { useState } from "react";

import { columns } from "@/app/games/columns";
import { DataTable } from "@/app/games/data-table";

import { useGamesList } from "@/shared/api/games";

export function MainPage() {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] =
    useState<boolean>(false);

  const [platformValue, setPlatformValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string[] | string>("");
  const [sortingValue, setSortingValue] = useState<string>("");

  const { data, isFetching } = useGamesList({
    platform: platformValue,
    genre: genreValue,
    sortBy: sortingValue,
  });

  if (isFetching) return <h1>Loading...</h1>;

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
        isAdvancedFiltersOpen={isAdvancedFiltersOpen}
        setIsAdvancedFiltersOpen={setIsAdvancedFiltersOpen}
      />
    </div>
  );
}
