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
