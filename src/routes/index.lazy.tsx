import MainPage from '@/pages/main'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: () => <MainPage />,
})
