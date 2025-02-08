import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="flex fixed justify-around w-full bg-black z-10 border-b">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-black" }}
        >
          <h1>Free-To-Play Games</h1>
        </Link>
        <Link to="/favorites" activeProps={{ className: "text-black" }}>
          <h1>Favorites</h1>
        </Link>
      </header>
      <Outlet />
    </>
  ),
});
