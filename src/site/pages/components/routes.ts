import type { RouteObject } from "react-router";
import { ComponentsCatalogPage } from "@/site/pages/components/page";
import { ButtonDocPage } from "@/site/pages/components/button/page";
import { FormDocPage } from "@/site/pages/components/form/page";

export const componentRoutes: RouteObject[] = [
  { index: true, Component: ComponentsCatalogPage },
  { path: "button", Component: ButtonDocPage },
  { path: "form", Component: FormDocPage },
];
