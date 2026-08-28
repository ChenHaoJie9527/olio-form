import type { RouteObject } from "react-router";
import { ComponentsCatalogPage } from "@/site/pages/components/page";
import { ButtonDocPage } from "@/site/pages/components/button/page";
import { TextFieldDocPage } from "@/site/pages/components/text-field/page";
import { FormDocPage } from "@/site/pages/components/form/page";

export const componentRoutes: RouteObject[] = [
  { index: true, Component: ComponentsCatalogPage },
  { path: "button", Component: ButtonDocPage },
  { path: "text-field", Component: TextFieldDocPage },
  { path: "form", Component: FormDocPage },
];
