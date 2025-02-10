import "./App.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Loader } from "lucide-react";

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  ),
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
});

declare module "@tanstack/react-router" {
  interface Something {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
