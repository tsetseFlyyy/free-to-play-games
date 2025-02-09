import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Pagination } from "@/shared/ui/pagination";
import { useState } from "react";
import { MultiSelect } from "@/shared/ui/multi-select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const platformsOptions = [
  { value: "all", label: "All platforms" },
  { value: "pc", label: "PC" },
  { value: "browser", label: "Web Browser" },
];

const genresOptions = [
  // { value: "", label: "All genres" },
  { value: "mmorpg", label: "MMORPG" },
  { value: "shooter", label: "Shooter" },
  { value: "strategy", label: "Strategy" },
  { value: "moba", label: "MOBA" },
  { value: "racing", label: "Racing" },
  { value: "sports", label: "Sports" },
  { value: "social", label: "Social" },
  { value: "sandbox", label: "Sandbox" },
  { value: "open-world", label: "Open World" },
  { value: "survival", label: "Survival" },
  { value: "pvp", label: "PvP" },
  { value: "pve", label: "PvE" },
  { value: "pixel", label: "Pixel" },
  { value: "voxel", label: "Voxel" },
  { value: "zombie", label: "Zombie" },
  { value: "turn-based", label: "Turn-Based" },
  { value: "first-person", label: "First Person" },
  { value: "third-person", label: "Third Person" },
  { value: "top-down", label: "Top Down" },
  { value: "tank", label: "Tank" },
  { value: "space", label: "Space" },
  { value: "sailing", label: "Sailing" },
  { value: "side-scroller", label: "Side Scroller" },
  { value: "superhero", label: "Superhero" },
  { value: "permadeath", label: "Permadeath" },
  { value: "card", label: "Card" },
  { value: "battle-royale", label: "Battle Royale" },
  { value: "mmo", label: "MMO" },
  { value: "mmofps", label: "MMOFPS" },
  { value: "mmotps", label: "MMOTPS" },
  { value: "3d", label: "3D" },
  { value: "2d", label: "2D" },
  { value: "anime", label: "Anime" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "fighting", label: "Fighting" },
  { value: "action-rpg", label: "Action RPG" },
  { value: "action", label: "Action" },
  { value: "military", label: "Military" },
  { value: "martial-arts", label: "Martial Arts" },
  { value: "flight", label: "Flight" },
  { value: "low-spec", label: "Low Spec" },
  { value: "tower-defense", label: "Tower Defense" },
  { value: "horror", label: "Horror" },
  { value: "mmorts", label: "MMORTS" },
];

const sortingOptions = [
  { value: "release-date", label: "Release Date" },
  { value: "popularity", label: "Popularity" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "relevance", label: "Relevance" },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  platformValue,
  setPlatformValue,
  genreValue,
  setGenreValue,
  sortingValue,
  setSortingValue,
  isAdvancedFiltersOpen,
  setIsAdvancedFiltersOpen,
}: DataTableProps<TData, TValue>) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  const navigate = useNavigate();

  return (
    <div className="rounded-md pt-[100px]">
      <div className="flex my-10 justify-between">
        <div className="flex gap-5">
          <Select
            value={platformValue}
            onValueChange={(value) => {
              console.log("select value 1", value);
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
            options={genresOptions}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />

          <Select
            value={genreValue}
            onValueChange={(value) => {
              console.log("select value 2", value);
              setGenreValue(value);
            }}
            disabled={isAdvancedFiltersOpen}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a category</SelectLabel>
                {genresOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={sortingValue}
            onValueChange={(value) => {
              console.log("select value 3, value");
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
        <Button
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
        >
          Advanced Filters
        </Button>
        <h1>{isAdvancedFiltersOpen ? "true" : "false"}</h1>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() =>
                  navigate({ to: "/game/$id", params: { id: row.original.id } })
                }
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {cell.column.id === "thumbnail" ? (
                        <img
                          src={cell.getContext().getValue() as string}
                          alt=""
                        />
                      ) : (
                        <>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}
