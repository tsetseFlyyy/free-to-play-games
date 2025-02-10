/* eslint-disable react-hooks/rules-of-hooks */
import { useStore } from "@/entities/game/lib";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import { ColumnDef } from "@tanstack/react-table";

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
      const date = new Date(getValue() as string);
      return date.toLocaleDateString("ru-RU"); // Формат DD.MM.YYYY
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
