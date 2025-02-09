import { columns } from '@/app/games/columns'
import { DataTable } from '@/app/games/data-table'
import { useStore } from '@/entities/game/lib'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  const { favorites: data } = useStore()

  return <DataTable columns={columns} data={data || []} />
}
