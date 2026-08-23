import type { RouteObject } from "react-router";
import { ComponentsCatalogPage } from "@/site/pages/components/page";
import { ButtonDocPage } from "@/site/pages/components/button/page";
import { CheckboxDocPage } from "@/site/pages/components/checkbox/page";
import { FieldLayoutDocPage } from "@/site/pages/components/field-layout/page";
import { TextFieldDocPage } from "@/site/pages/components/text-field/page";

export const componentRoutes: RouteObject[] = [
  { index: true, Component: ComponentsCatalogPage },
  { path: "button", Component: ButtonDocPage },
  { path: "field-layout", Component: FieldLayoutDocPage },
  { path: "text-field", Component: TextFieldDocPage },
  { path: "checkbox", Component: CheckboxDocPage },
];
