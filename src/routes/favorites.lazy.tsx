import { DataTable } from "@/app/games/data-table";
import { useStore } from "@/entities/game/lib";
import { columns } from "@/widgets/favorites-table/columns";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { favorites: data } = useStore();

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
    <div>
      <h1>FILTERS</h1>
    </div>
  );
}
