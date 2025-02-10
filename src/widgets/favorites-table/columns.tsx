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
        <span
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
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
       <span
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publisher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => {
      return (
       <span
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ getValue }) => {
      return formatDate(getValue() as string, true);
    },
  },
  {
    id: "removeFromFavorites",
    header: 'Action',
    cell: ({ row }) => {
      const { removeFavorite } = useStore();
      const { toast } = useToast();
      return (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            removeFavorite(row.original.id as number, toast);
          }}
        >
          Remove from fav
        </Button>
      );
    },
  },
];
