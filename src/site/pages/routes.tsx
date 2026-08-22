import type { RouteObject } from "react-router";
import { ButtonDemo, CheckboxDemo, FieldLayoutDemo, TextFieldDemo } from "@/site/demos";
import { CatalogPage } from "@/site/catalog";
import { DocPage } from "@/site/doc-page";
import { GetStartedPage } from "@/site/pages/get-started";
import { HomePage } from "@/site/pages/home";
import { LoginForm } from "@/components/examples/login/login-form";
import { RegisterForm } from "@/components/examples/register/register-form";
import { DocsLayout } from "@/site/layout";
import { componentCatalog, exampleCatalog } from "@/site/nav";
import { sources } from "@/site/sources";

function ComponentsCatalogPage() {
  return (
    <CatalogPage
      title="Components"
      description="Copy these primitives first. Examples are composed from them."
      items={componentCatalog}
    />
  );
}

function ExamplesCatalogPage() {
  return (
    <CatalogPage
      title="Examples"
      description="Full scenes with a Valibot schema and Formisch wiring."
      items={exampleCatalog}
    />
  );
}

function ButtonDocPage() {
  return (
    <DocPage
      title="Button"
      description="Submit and action button with loading and size variants."
      preview={<ButtonDemo />}
      files={sources.button}
    />
  );
}

function FieldLayoutDocPage() {
  return (
    <DocPage
      title="FieldLayout"
      description="Label, description, and error chrome shared by every field."
      preview={<FieldLayoutDemo />}
      files={sources.fieldLayout}
    />
  );
}

function TextFieldDocPage() {
  return (
    <DocPage
      title="TextField"
      description="Native input wired through Formisch Field. Password fields include a visibility toggle."
      preview={<TextFieldDemo />}
      files={sources.textField}
    >
      <p className="text-muted-foreground">
        Spread <code className="rounded bg-muted px-1.5 py-0.5">field.props</code> and pass{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">input</code> plus{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">errors</code>. Do not keep a second
        value in local state.
      </p>
    </DocPage>
  );
}

function CheckboxDocPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Native checkbox with custom chrome. Formisch reads element.checked."
      preview={<CheckboxDemo />}
      files={sources.checkbox}
    />
  );
}

function LoginDocPage() {
  return (
    <DocPage
      title="Login"
      description="Email, password, remember me, and a sample server error for blocked@example.com."
      preview={<LoginForm />}
      files={sources.login}
    />
  );
}

function RegisterDocPage() {
  return (
    <DocPage
      title="Register"
      description="Email, password, confirm password, and a required terms checkbox."
      preview={<RegisterForm />}
      files={sources.register}
    />
  );
}

function NotFoundPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-2 text-muted-foreground">That page is not part of the first slice.</p>
    </article>
  );
}

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
