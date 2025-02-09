import { DataTable } from "@/app/games/data-table";
import { useStore } from "@/entities/game/lib";
import {
  genresOptions,
  platformsOptions,
  tagsOptions,
} from "@/shared/constants/options";
import { MultiSelect } from "@/shared/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { columns } from "@/widgets/favorites-table/columns";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/favorites")({
  component: RouteComponent,
});

type FiltersProps = {
  platformValue: string;
  setPlatformValue: (value: string) => void;
  genreValue: string[] | string;
  setGenreValue: (value: string[] | string) => void;
  sortingValue: string;
  setSortingValue: (value: string) => void;
};

function RouteComponent() {
  const [platformValue, setPlatformValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string[] | string>("");
  const [sortingValue, setSortingValue] = useState<string>("");

  const { favorites } = useStore();

  favorites.map((item) => {
    console.log("item.genre", item.genre);
  });

  const filteredData = favorites
    ?.filter(
      (game) =>
        platformValue === "" ||
        platformValue === "All platforms" ||
        game.platform === platformValue
    )
    ?.filter((game) =>
      !genreValue.length ? true : genreValue.includes(game.genre)
    )
    ?.sort((a, b) => {
      if (sortingValue === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      if (sortingValue === "release_date") {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      }
      if (sortingValue === "addedAt") {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
      return 0;
    });

  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <>
      <div className="container mx-auto">
        <button onClick={onBack} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <span className="mb-[2px]">Return to the games list</span>
        </button>
      </div>
      <Filters
        {...{
          platformValue,
          setPlatformValue,
          genreValue,
          setGenreValue,
          sortingValue,
          setSortingValue,
        }}
      />
      <DataTable columns={columns} data={filteredData || []} />
    </>
  );
}

function Filters({
  platformValue,
  setPlatformValue,
  genreValue,
  setGenreValue,
  sortingValue,
  setSortingValue,
}: FiltersProps) {
  console.log("platformValue", platformValue);
  console.log("genreValue", genreValue);
  console.log("sortingValue", sortingValue);

  return (
    <div className="container mx-auto flex gap-5">
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
              <SelectItem key={item.value} value={item.label}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <MultiSelect
        options={genresOptions}
        onValueChange={setGenreValue}
        defaultValue={genreValue}
        placeholder="Select tags"
        variant="inverted"
        animation={2}
        maxCount={3}
      />

      {/* <Select
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
            <SelectItem key="alphabetical" value="alphabetical">
              Alphabetical
            </SelectItem>
            <SelectItem key="release_date" value="release_date">
              Release date
            </SelectItem>
            <SelectItem key="addedAt" value="addedAt">
              Added date
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </div>
  );
}
