import { DataTable } from "@/shared/ui/data-table";
import { useStore } from "@/entities/game/store/store";
import { genresOptions, platformsOptions } from "@/shared/constants/options";
import { useFiltering } from "@/shared/store/filters";
import { usePaginationStore } from "@/shared/store/pagination";
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
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type FiltersProps = {
  platformValue: string;
  setPlatformValue: (value: string) => void;
  genreValue: string[] | string;
  setGenreValue: (value: string[] | string) => void;
  selectedValues: string[] | string;
  setSelectedValues: (value: string[] | string) => void;
};

export function FavoritesPage() {
  const {
    platformValue,
    genreValue,
    setPlatformValue,
    setGenreValue,
    setPageType: setPageTypeFiltering,
  } = useFiltering();

  const [selectedValues, setSelectedValues] = useState<string[]>(genreValue);

  const { setPageType, currentPageType } = usePaginationStore();

  useEffect(() => {
    setPageTypeFiltering("favorites", setSelectedValues);
    setPageType("favorites");
  }, [currentPageType]);

  console.log("genreValue", genreValue);

  const { favorites } = useStore();

  const filteredData = favorites
    ?.filter(
      (game) =>
        platformValue === "" ||
        platformValue === "All platforms" ||
        game.platform === platformValue
    )
    ?.filter((game) =>
      !genreValue.length ? true : genreValue.includes(game.genre)
    );

  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <>
      <div className="container mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 py-6">
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
          selectedValues,
          setSelectedValues,
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
  selectedValues,
  setSelectedValues,
}: FiltersProps) {
  return (
    <div className="container mx-auto flex mb-5 justify-between">
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
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          placeholder="Select tags"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
    </div>
  );
}
