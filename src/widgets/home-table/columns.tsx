/* eslint-disable react-hooks/rules-of-hooks */
import { useStore } from "@/entities/game/store/store";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/entities/game/model/types";
import { Button } from "@/shared/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/shared/lib/utils";

export const columns: ColumnDef<Game>[] = [
  {
    header: "Thumbnail",
    accessorKey: "thumbnail",
    cell: ({ getValue }) => <img src={getValue() as string} alt="thumbnail" />,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "release_date",
    header: "Release date",
    cell: ({ getValue }) => {
      return formatDate(getValue() as string, false);
    },
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    id: "addToFavorites",
    cell: ({ row }) => {
      const { addFavorite } = useStore();
      const { toast } = useToast();
      return (
        <Button
          className="h-8 w-8 p-0"
          onClick={(event) => {
            event.stopPropagation();
            addFavorite(row.original, toast);
          }}
        >
          Add
        </Button>
      );
    },
  },
];
