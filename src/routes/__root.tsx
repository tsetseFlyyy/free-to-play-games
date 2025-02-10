import Header from "@/widgets/header";
import { Toaster } from "@/shared/ui/toaster";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="sticky z-10 w-full bg-white border-b">
        <Header />
      </div>
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}
