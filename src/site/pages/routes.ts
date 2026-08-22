import type { RouteObject } from "react-router";
import { DocsLayout } from "@/site/layout";
import { HomePage } from "@/site/pages/home";
import { GetStartedPage } from "@/site/pages/get-started";
import { ComponentsCatalogPage } from "@/site/pages/components-catalog-page";
import { ExamplesCatalogPage } from "@/site/pages/examples-catalog-page";
import { ButtonDocPage } from "@/site/pages/button-doc-page";
import { FieldLayoutDocPage } from "@/site/pages/field-layout-doc-page";
import { TextFieldDocPage } from "@/site/pages/text-field-doc-page";
import { CheckboxDocPage } from "@/site/pages/checkbox-doc-page";
import { LoginDocPage } from "@/site/pages/login-doc-page";
import { RegisterDocPage } from "@/site/pages/register-doc-page";
import { NotFoundPage } from "@/site/pages/not-found-page";

export const routes: RouteObject[] = [
  {
    Component: DocsLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "docs", Component: GetStartedPage },
      { path: "components", Component: ComponentsCatalogPage },
      { path: "examples", Component: ExamplesCatalogPage },
      { path: "components/button", Component: ButtonDocPage },
      { path: "components/field-layout", Component: FieldLayoutDocPage },
      { path: "components/text-field", Component: TextFieldDocPage },
      { path: "components/checkbox", Component: CheckboxDocPage },
      { path: "examples/login", Component: LoginDocPage },
      { path: "examples/register", Component: RegisterDocPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
];
