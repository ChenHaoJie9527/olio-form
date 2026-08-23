import type { RouteObject } from "react-router";
import { DocsLayout } from "@/site/layout";
import { HomePage } from "@/site/pages/home";
import { NotFoundPage } from "@/site/pages/not-found";
import { componentRoutes } from "@/site/pages/components/routes";
import { exampleRoutes } from "@/site/pages/examples/routes";

export const routes: RouteObject[] = [
  {
    Component: DocsLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "components", children: componentRoutes },
      { path: "examples", children: exampleRoutes },
      { path: "*", Component: NotFoundPage },
    ],
  },
];
