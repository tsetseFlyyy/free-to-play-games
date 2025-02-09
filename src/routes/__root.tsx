import { Toaster } from "@/shared/ui/toaster";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sticky z-10 w-full bg-white border-b">
        <header className="container mx-auto flex items-center h-16">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-black" }}
          >
            <h1 className="text-2xl font-semibold">Free-To-Play Games</h1>
          </Link>
          <div className="ml-16">
            <Link to="/favorites" activeProps={{ className: "text-black underline" }}>
              <span className="text-base transition hover:text-gray-500">
                Favorites
              </span>
            </Link>
          </div>
        </header>
      </div>
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  ),
});
