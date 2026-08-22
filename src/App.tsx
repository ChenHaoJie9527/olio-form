import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "@/site/pages/routes";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
