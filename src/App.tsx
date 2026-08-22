import { DocsLayout } from "@/site/layout";
import { AppRoutes } from "@/site/pages/routes";
import { RouterProvider } from "@/site/router";

export default function App() {
  return (
    <RouterProvider>
      <DocsLayout>
        <AppRoutes />
      </DocsLayout>
    </RouterProvider>
  );
}
