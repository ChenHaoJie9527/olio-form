import type { RouteObject } from "react-router";
import { ComponentsCatalogPage } from "@/site/pages/components/page";
import { ButtonDocPage } from "@/site/pages/components/button/page";
import { FormCatalogPage } from "@/site/pages/components/form/page";
import { LoginDocPage } from "@/site/pages/components/form/login/page";
import { RegisterDocPage } from "@/site/pages/components/form/register/page";

export const componentRoutes: RouteObject[] = [
  { index: true, Component: ComponentsCatalogPage },
  { path: "button", Component: ButtonDocPage },
  {
    path: "form",
    children: [
      { index: true, Component: FormCatalogPage },
      { path: "login", Component: LoginDocPage },
      { path: "register", Component: RegisterDocPage },
    ],
  },
];
