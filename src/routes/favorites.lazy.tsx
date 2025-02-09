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

export const Route = createLazyFileRoute("/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { favorites: data } = useStore();

  console.log("favorites", data);

  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <>
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
      <Filters />
      <DataTable columns={columns} data={data || []} />
    </>
  );
}

function Filters() {
  return (
    <div className="container mx-auto flex gap-5">
      <Select
        // value={platformValue}
        onValueChange={(value) => {
          console.log("select value 1", value);
          // setPlatformValue(value);
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
        options={genresOptions}
        // onValueChange={setGenreValue}
        // defaultValue={genreValue}
        placeholder="Select tags"
        variant="inverted"
        animation={2}
        maxCount={3}
      />

      <Select
        // value={sortingValue}
        onValueChange={(value) => {
          console.log("select value 3, value");
          // setSortingValue(value);
        }}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
              <SelectItem key="release_date" value="release_date">
                Release date
              </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
