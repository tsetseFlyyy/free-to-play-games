import { createLazyFileRoute } from "@tanstack/react-router";
import FavoritesPage from "@/pages/favorites";

export const Route = createLazyFileRoute("/favorites")({
  component: () => <FavoritesPage />,
});
