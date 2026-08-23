import type { RouteObject } from "react-router";
import { ExamplesCatalogPage } from "@/site/pages/examples/page";
import { LoginDocPage } from "@/site/pages/examples/login/page";
import { RegisterDocPage } from "@/site/pages/examples/register/page";

export const exampleRoutes: RouteObject[] = [
  { index: true, Component: ExamplesCatalogPage },
  { path: "login", Component: LoginDocPage },
  { path: "register", Component: RegisterDocPage },
];
