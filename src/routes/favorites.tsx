import { columns } from "@/app/games/columns";
import { DataTable } from "@/app/games/data-table";
import { useStore } from "@/entities/game/lib";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { favorites: data } = useStore();

  return <DataTable columns={columns} data={data || []} />;
}
