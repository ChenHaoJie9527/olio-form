import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LocaleProvider } from "@/site/i18n";
import { routes } from "@/site/routes";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  );
}
