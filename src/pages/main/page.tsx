import { columns } from "@/app/games/columns";
import { DataTable } from "@/app/games/data-table";
import { useGamesList } from "@/shared/api/games";

export function MainPage() {
  const { data, isFetching } = useGamesList();

  if (isFetching) return <>Loading...</>;
  return <DataTable columns={columns} data={data} />;
}
