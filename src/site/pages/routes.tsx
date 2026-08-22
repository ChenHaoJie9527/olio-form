import { ButtonDemo, CheckboxDemo, FieldLayoutDemo, TextFieldDemo } from "@/site/demos";
import { CatalogPage } from "@/site/catalog";
import { DocPage } from "@/site/doc-page";
import { GetStartedPage } from "@/site/pages/get-started";
import { HomePage } from "@/site/pages/home";
import { LoginForm } from "@/components/examples/login/login-form";
import { RegisterForm } from "@/components/examples/register/register-form";
import { componentCatalog, exampleCatalog } from "@/site/nav";
import { sources } from "@/site/sources";
import { useRouter } from "@/site/router-context";

export function AppRoutes() {
  const { path } = useRouter();

  switch (path) {
    case "/":
      return <HomePage />;
    case "/docs":
      return <GetStartedPage />;
    case "/components":
      return (
        <CatalogPage
          title="Components"
          description="Copy these primitives first. Examples are composed from them."
          items={componentCatalog}
        />
      );
    case "/examples":
      return (
        <CatalogPage
          title="Examples"
          description="Full scenes with a Valibot schema and Formisch wiring."
          items={exampleCatalog}
        />
      );
    case "/components/button":
      return (
        <DocPage
          title="Button"
          description="Submit and action button with loading and size variants."
          preview={<ButtonDemo />}
          files={sources.button}
        />
      );
    case "/components/field-layout":
      return (
        <DocPage
          title="FieldLayout"
          description="Label, description, and error chrome shared by every field."
          preview={<FieldLayoutDemo />}
          files={sources.fieldLayout}
        />
      );
    case "/components/text-field":
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
    case "/components/checkbox":
      return (
        <DocPage
          title="Checkbox"
          description="Native checkbox with custom chrome. Formisch reads element.checked."
          preview={<CheckboxDemo />}
          files={sources.checkbox}
        />
      );
    case "/examples/login":
      return (
        <DocPage
          title="Login"
          description="Email, password, remember me, and a sample server error for blocked@example.com."
          preview={<LoginForm />}
          files={sources.login}
        />
      );
    case "/examples/register":
      return (
        <DocPage
          title="Register"
          description="Email, password, confirm password, and a required terms checkbox."
          preview={<RegisterForm />}
          files={sources.register}
        />
      );
    default:
      return (
        <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
          <p className="mt-2 text-muted-foreground">That page is not part of the first slice.</p>
        </article>
      );
  }
}
