import "./App.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <>
      <h1 className="text-center text-red-600">LOADING....</h1>
      <h1 className="text-center text-red-600">LOADING....</h1>
      <h1 className="text-center text-red-600">LOADING....</h1>
      <h1 className="text-center text-red-600">LOADING....</h1>
    </>
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
