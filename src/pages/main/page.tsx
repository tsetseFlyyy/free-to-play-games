import { useEffect, useState } from "react";

import { columns } from "@/app/games/columns";
import { DataTable } from "@/app/games/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { MultiSelect } from "@/shared/ui/multi-select";
import {
  tagsOptions,
  platformsOptions,
  sortingOptions,
} from "@/shared/constants/options";

import { useGamesList } from "@/shared/api/games";
import { usePaginationStore } from "@/shared/store/pagination";
import { useFiltering } from "@/shared/store/filters";

type FiltersProps = {
  platformValue: string;
  setPlatformValue: (value: string) => void;
  genreValue: string[] | string;
  setGenreValue: (value: string[] | string) => void;
  sortingValue: string;
  setSortingValue: (value: string) => void;
};

export function MainPage() {
  const {
    platformValue,
    genreValue,
    sortingValue,
    setPlatformValue,
    setGenreValue,
    setSortingValue,
    setPageType: setPageTypeFiltering,
  } = useFiltering();

  const [selectedValues, setSelectedValues] = useState<string[]>(genreValue);

  const { data, isFetching } = useGamesList({
    platform: platformValue,
    genre: genreValue,
    sortBy: sortingValue,
  });

  const { setPageType, currentPageType } = usePaginationStore();

  useEffect(() => {
    setPageTypeFiltering("allGames", setSelectedValues);
    setPageType("allGames");
  }, [currentPageType]);

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
      <Filters
        {...{
          platformValue,
          setPlatformValue,
          genreValue,
          setGenreValue,
          sortingValue,
          setSortingValue,
          selectedValues,
          setSelectedValues,
        }}
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

function Filters({
  platformValue,
  setPlatformValue,
  genreValue,
  setGenreValue,
  sortingValue,
  setSortingValue,
  selectedValues,
  setSelectedValues,
}: FiltersProps) {
  return (
    <div className="container mx-auto flex my-10 justify-between">
      <div className="flex gap-5">
        <Select
          value={platformValue}
          onValueChange={(value) => {
            setPlatformValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a platform</SelectLabel>
              {platformsOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <MultiSelect
          options={tagsOptions}
          onValueChange={setGenreValue}
          defaultValue={genreValue}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          placeholder="Select tags"
          variant="inverted"
          animation={2}
          maxCount={3}
        />

        <Select
          value={sortingValue}
          onValueChange={(value) => {
            setSortingValue(value);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              {sortingOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
