import { Game } from "@/shared/types/game";
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
];
