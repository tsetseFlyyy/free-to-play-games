/* eslint-disable react-hooks/rules-of-hooks */
import { useStore } from "@/entities/game/store/store";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/entities/game/model/types";
import { Button } from "@/shared/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/shared/lib/utils";

export const columns: ColumnDef<Game>[] = [
  {
    header: "Thumbnail",
    accessorKey: "thumbnail",
    cell: ({ getValue }) => <img src={getValue() as string} alt="thumbnail" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return formatDate(getValue() as string, false);
    },
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publisher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return formatDate(getValue() as string, true);
    },
  },
  {
    id: "removeFromFavorites",
    cell: ({ row }) => {
      const { removeFavorite } = useStore();
      const { toast } = useToast();
      return (
        <Button
          className="h-8 w-8 p-0"
          onClick={(event) => {
            event.stopPropagation();
            removeFavorite(row.original.id as number, toast);
          }}
        >
          Remove
        </Button>
      );
    },
  },
];
